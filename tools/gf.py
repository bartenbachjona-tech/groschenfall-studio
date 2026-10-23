#!/usr/bin/env python3
"""Groschenfall-Werkzeugkasten (pfadunabhängig).

Projektordner work/<id>/ enthält:
  texts.json          {key: text}  – Reihenfolge = Sprechreihenfolge
  raw/<key>.mp3       ElevenLabs-Rohaufnahmen (eine Datei pro Absatz ODER ein Sammel-mp3, siehe 'split')

Befehle:
  gf.py split  <proj> <sammel.mp3> key1,key2,...   Sammelaufnahme an Pausen >=1.0 s in raw/<key>.mp3 teilen
  gf.py voice  <proj> [--tempo 1.10] [--gap 0.28]  Tonhöhe -1.2 HT, Tempo, Wort-Alignment, Pausen kürzen -> wav/<key>.wav, words.json
  gf.py short  <proj> <remo> <name> body1,body2,... [--gaps 0.35,0.4,...]
                                                   baut public/audio/<name>_yt.wav, _tt.wav + src/data/<name>.json (Enden: keys 'yt','tt')
  gf.py long   <proj> <remo> <name> "k1,k2|k3,k4|..."  pro Kapitel (|) Audio + Timing: public/audio/<name>ch<i>.wav, src/data/<name>ch<i>.json
  gf.py mixshort <in.mp4> <out.mp4> [--music <mp3>]   Musik leise (-27/-21 dB, Lowpass 6 kHz) + Loudnorm -14
  gf.py mixlong  <out.mp4> <music_plan.json> part1.mp4 part2.mp4 ...   verkettet + Musik nach Plan
         music_plan.json: [["music_hook.mp3", startSek], ["music_k23.mp3", startSek], ...]
  gf.py srt    <proj> <remo> <name> <nChapters> <out.srt>   Untertitel aus Timing-JSONs (Langvideo)
  gf.py compress <in.mp4> <out.mp4>                  x265 CRF27 (für Upload über die Brücke)
"""
import sys, os, json, math, re, subprocess, argparse
import numpy as np
from scipy.io import wavfile
from scipy.ndimage import uniform_filter1d

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)
MUSIC = os.path.join(REPO, 'assets', 'music')
sys.path.insert(0, HERE)
from align import align  # noqa: E402

SR = 44100


def sh(*a):
    subprocess.run(list(a), check=True)


def readwav(fn):
    sr, x = wavfile.read(fn)
    x = x.astype(np.float64)
    if x.ndim > 1:
        x = x.mean(1)
    return sr, x


# ---------------------------------------------------------------- split
def cmd_split(a):
    raw = os.path.join(a.proj, 'raw'); os.makedirs(raw, exist_ok=True)
    keys = a.keys.split(',')
    tmp = os.path.join(a.proj, '_all.wav')
    sh('ffmpeg', '-loglevel', 'error', '-y', '-i', a.src, '-ac', '1', '-ar', str(SR), tmp)
    out = subprocess.run(['ffmpeg', '-i', tmp, '-af', 'silencedetect=n=-40dB:d=1.0', '-f', 'null', '-'],
                         capture_output=True, text=True).stderr
    st = [float(v) for v in re.findall(r'silence_start: ([\d.]+)', out)]
    en = [float(v) for v in re.findall(r'silence_end: ([\d.]+)', out)]
    dur = len(readwav(tmp)[1]) / SR
    cuts = [0.0]; segs = []
    bounds = list(zip(st, en))
    t0 = 0.0
    for s, e in bounds:
        segs.append((t0, s)); t0 = e
    segs.append((t0, dur))
    segs = [(s, e) for s, e in segs if e - s > 0.4]
    if len(segs) != len(keys):
        sys.exit(f'FEHLER: {len(segs)} Segmente gefunden, {len(keys)} Keys erwartet: {[(round(s,1),round(e,1)) for s,e in segs]}')
    for k, (s, e) in zip(keys, segs):
        sh('ffmpeg', '-loglevel', 'error', '-y', '-ss', f'{max(0,s-0.15):.3f}', '-to', f'{e+0.2:.3f}', '-i', tmp, os.path.join(raw, f'{k}.wav'))
    os.remove(tmp)
    print('split ok', [(k, round(e - s, 2)) for k, (s, e) in zip(keys, segs)])


# ---------------------------------------------------------------- voice
def trim_pauses(x, sr, words, maxgap):
    hop = int(sr * 0.01)
    e = np.array([np.sqrt(np.mean(x[i:i + hop] ** 2) + 1e-9) for i in range(0, len(x), hop)])
    db = 20 * np.log10(e / (np.abs(x).max() + 1e-9))
    sil = db < -38
    cuts = []
    for w0, w1 in zip(words, words[1:]):
        s0, s1 = int(w0['start'] * 100) + 5, int(w1['start'] * 100)
        best = (0, 0); i = s0
        while i < s1 and i < len(sil):
            if sil[i]:
                j = i
                while j < s1 and j < len(sil) and sil[j]:
                    j += 1
                if j - i > best[1] - best[0]:
                    best = (i, j)
                i = j
            else:
                i += 1
        L = (best[1] - best[0]) / 100
        if L > maxgap:
            c0 = best[0] / 100 + 0.06; c1 = best[1] / 100 - (maxgap - 0.06)
            if c1 > c0:
                cuts.append((c0, c1))
    segs = []; last = 0
    for c0, c1 in cuts:
        segs.append((last, c0)); last = c1
    segs.append((last, len(x) / sr))
    f = int(0.008 * sr); out = []
    for s, t in segs:
        y = x[int(s * sr):int(t * sr)].copy()
        if len(y) > 2 * f:
            y[:f] *= np.linspace(0, 1, f); y[-f:] *= np.linspace(1, 0, f)
        out.append(y)
    y = np.concatenate(out)

    def mp(t):
        sh_ = 0
        for c0, c1 in cuts:
            if t >= c1: sh_ += c1 - c0
            elif t > c0: sh_ += t - c0
        return round(t - sh_, 3)
    nw = [dict(w, start=mp(w['start']), end=mp(w.get('end', w['start'] + .3))) for w in words]
    return y, nw


def cmd_voice(a):
    texts = json.load(open(os.path.join(a.proj, 'texts.json')))
    wd = os.path.join(a.proj, 'wav'); os.makedirs(wd, exist_ok=True)
    R = 2 ** (-1.2 / 12); T = a.tempo / R
    words = {}
    for k, txt in texts.items():
        src = next((os.path.join(a.proj, 'raw', f'{k}.{e}') for e in ('wav', 'mp3') if os.path.exists(os.path.join(a.proj, 'raw', f'{k}.{e}'))), None)
        if not src:
            print('fehlt:', k); continue
        tmp = os.path.join(wd, f'{k}_p.wav')
        sh('ffmpeg', '-loglevel', 'error', '-y', '-i', src, '-af',
           f'silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse,asetrate={SR}*{R},aresample={SR},atempo={T}',
           '-ac', '1', '-ar', str(SR), '-c:a', 'pcm_s16le', tmp)
        res, dur = align(tmp, txt)
        sr, x = readwav(tmp)
        y, nw = trim_pauses(x, sr, res, a.gap)
        wavfile.write(os.path.join(wd, f'{k}.wav'), sr, y.astype(np.int16))
        os.remove(tmp)
        words[k] = {'dur': round(len(y) / sr, 3), 'words': nw}
        print(f'{k}: {dur:.2f}s -> {len(y)/sr:.2f}s')
    json.dump(words, open(os.path.join(a.proj, 'words.json'), 'w'), ensure_ascii=False)


# ---------------------------------------------------------------- short / long timing
def _para(proj, W, k, t):
    sr, x = readwav(os.path.join(proj, 'wav', f'{k}.wav'))
    d = len(x) / sr
    p = {'start': round(t, 3), 'dur': round(d, 3), 'words': [{'text': w['text'], 'start': w['start'], 'end': w.get('end', w['start'] + .3)} for w in W[k]['words']]}
    return sr, x, d, p


def _write(fn, sr, segs, total):
    y = np.zeros(int(total * sr) + 1)
    for t0, x in segs:
        s = int(t0 * sr); y[s:s + len(x)] += x[:len(y) - s]
    wavfile.write(fn, sr, (y / (np.abs(y).max() + 1e-9) * 0.89 * 32767).astype(np.int16))


def cmd_short(a):
    W = json.load(open(os.path.join(a.proj, 'words.json')))
    body = a.body.split(',')
    gaps = [float(g) for g in a.gaps.split(',')] if a.gaps else [0.38] * len(body)
    paras = {}; segs = []; t = 0.1
    for i, k in enumerate(body):
        sr, x, d, p = _para(a.proj, W, k, t); paras[k] = p; segs.append((t, x)); t += d + gaps[min(i, len(gaps) - 1)]
    tE = t; tot = {}
    os.makedirs(os.path.join(a.remo, 'public', 'audio'), exist_ok=True)
    for e in ('yt', 'tt'):
        if e not in W:
            continue
        sr, x, d, p = _para(a.proj, W, e, tE); paras[e] = p
        T = tE + d + (2.2 if e == 'yt' else 1.6); tot[e] = round(T, 3)
        _write(os.path.join(a.remo, 'public', 'audio', f'{a.name}_{e}.wav'), sr, segs + [(tE, x)], T)
    json.dump({'paras': paras, 'tot_yt': tot.get('yt', 0), 'tot_tt': tot.get('tt', 0)},
              open(os.path.join(a.remo, 'src', 'data', f'{a.name}.json'), 'w'), ensure_ascii=False)
    print({k: (v['start'], v['dur']) for k, v in paras.items()}, tot)


def cmd_long(a):
    W = json.load(open(os.path.join(a.proj, 'words.json')))
    chapters = [c.split(',') for c in a.chapters.split('|')]
    os.makedirs(os.path.join(a.remo, 'public', 'audio'), exist_ok=True)
    for c, keys in enumerate(chapters):
        t = 0.15 if c == 0 else 0.4; paras = []; segs = []
        for k in keys:
            sr, x, d, p = _para(a.proj, W, k, t); p['key'] = k; paras.append(p); segs.append((t, x)); t += d + 0.5
        total = t - 0.5 + (4.0 if c == len(chapters) - 1 else 1.2)
        _write(os.path.join(a.remo, 'public', 'audio', f'{a.name}ch{c}.wav'), sr, segs, total)
        json.dump({'fps': 30, 'total': round(total, 3), 'paras': paras},
                  open(os.path.join(a.remo, 'src', 'data', f'{a.name}ch{c}.json'), 'w'), ensure_ascii=False)
        print('Kapitel', c, round(total, 1), 's', len(paras), 'Absätze')


# ---------------------------------------------------------------- mixing
def _load_music(fn, sr):
    tmp = '/tmp/_gf_m.wav'
    sh('ffmpeg', '-loglevel', 'error', '-y', '-i', fn, '-ac', '1', '-ar', str(sr), '-af', 'lowpass=f=6000,loudnorm=I=-16:TP=-2', tmp)
    return wavfile.read(tmp)[1].astype(np.float64) / 32768


def _duck(a, m, sr):
    env = np.sqrt(uniform_filter1d(a ** 2, int(.05 * sr)))
    act = uniform_filter1d((20 * np.log10(env + 1e-9) > -42).astype(float), int(.3 * sr)) > .02
    g = uniform_filter1d(np.where(act, -27.0, -21.0), int(.7 * sr))
    mix = a + m * 10 ** (g / 20)
    return mix / (np.abs(mix).max() / 0.95)


def cmd_mixshort(a):
    sr = 48000
    sh('ffmpeg', '-loglevel', 'error', '-y', '-i', a.inp, '-vn', '-ac', '1', '-ar', str(sr), '/tmp/_gf_a.wav')
    x = wavfile.read('/tmp/_gf_a.wav')[1] / 32768.
    m = _load_music(a.music or os.path.join(MUSIC, 'music_k67.mp3'), sr)
    N = len(x); m = np.tile(m, N // len(m) + 1)[:N]
    fi = int(.4 * sr); fo = int(1.5 * sr); m[:fi] *= np.linspace(0, 1, fi); m[-fo:] *= np.linspace(1, 0, fo)
    wavfile.write('/tmp/_gf_mix.wav', sr, (_duck(x, m, sr) * 32767).astype(np.int16))
    sh('ffmpeg', '-loglevel', 'error', '-y', '-i', a.inp, '-i', '/tmp/_gf_mix.wav', '-map', '0:v', '-map', '1:a', '-c:v', 'libx264', '-crf', '20',
       '-preset', 'medium', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '192k', '-af', 'loudnorm=I=-14:TP=-1.5', '-movflags', '+faststart', a.out)
    print('ok', a.out)


def cmd_mixlong(a):
    sr = 48000
    lst = '/tmp/_gf_list.txt'
    open(lst, 'w').write(''.join(f"file '{os.path.abspath(p)}'\n" for p in a.parts))
    sh('ffmpeg', '-loglevel', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', lst, '-c', 'copy', '/tmp/_gf_cat.mp4')
    sh('ffmpeg', '-loglevel', 'error', '-y', '-i', '/tmp/_gf_cat.mp4', '-vn', '-ac', '1', '-ar', str(sr), '/tmp/_gf_a.wav')
    x = wavfile.read('/tmp/_gf_a.wav')[1].astype(np.float64) / 32768; N = len(x)
    plan = json.load(open(a.plan)); m = np.zeros(N); xf = int(1.5 * sr)
    for i, (fn, t0) in enumerate(plan):
        s = int(t0 * sr); e = N if i == len(plan) - 1 else int(plan[i + 1][1] * sr)
        y0 = _load_music(fn if os.path.isabs(fn) else os.path.join(MUSIC, fn), sr)
        L = e - s + xf; y = np.tile(y0, int(np.ceil(L / len(y0))) + 1)[:L]
        r = np.ones(L); r[:xf] = np.linspace(0, 1, xf); r[-xf:] = np.linspace(1, 0, xf)
        if i == len(plan) - 1:
            r[-xf:] = 1; fo = int(3 * sr); r[-fo:] = np.linspace(1, 0, fo)
        s2 = max(0, s - xf // 2); y = (y * r)[:N - s2]; m[s2:s2 + len(y)] += y
    wavfile.write('/tmp/_gf_mix.wav', sr, (_duck(x, m, sr) * 32767).astype(np.int16))
    sh('ffmpeg', '-loglevel', 'error', '-y', '-i', '/tmp/_gf_cat.mp4', '-i', '/tmp/_gf_mix.wav', '-map', '0:v', '-map', '1:a', '-c:v', 'copy',
       '-c:a', 'aac', '-b:a', '192k', '-af', 'loudnorm=I=-14:TP=-1.5:LRA=11', '-movflags', '+faststart', a.out)
    print('ok', a.out)


def cmd_compress(a):
    sh('ffmpeg', '-loglevel', 'error', '-y', '-i', a.inp, '-c:v', 'libx265', '-crf', '27', '-x265-params', 'vbv-maxrate=900:vbv-bufsize=1800',
       '-tag:v', 'hvc1', '-c:a', 'aac', '-b:a', '96k', a.out)
    print('ok', a.out, round(os.path.getsize(a.out) / 1e6, 1), 'MB')


def cmd_srt(a):
    texts = json.load(open(os.path.join(a.proj, 'texts.json')))
    off = 0; subs = []
    for c in range(a.n):
        d = json.load(open(os.path.join(a.remo, 'src', 'data', f'{a.name}ch{c}.json')))
        for p in d['paras']:
            dw = re.sub(r'<[^>]+>', '', texts[p['key']]).split(); ws = p['words']
            chunks = []; cur = []
            for w in dw:
                if cur and len(' '.join(cur + [w])) > 46: chunks.append(cur); cur = []
                cur.append(w)
                if re.search(r'[.?!:]$', w) and len(' '.join(cur)) > 18: chunks.append(cur); cur = []
            if cur: chunks.append(cur)
            i = 0; n = len(dw); m = len(ws)
            for ch in chunks:
                s = i; e = i + len(ch); i = e
                ta = ws[min(m - 1, math.floor(s / n * m))]['start']
                tb = ws[min(m - 1, max(0, math.ceil(e / n * m) - 1))].get('end', ws[-1]['start'] + .3)
                subs.append((off + p['start'] + ta, off + p['start'] + tb + 0.15, ' '.join(ch)))
        off += math.ceil(d['total'] * 30) / 30

    def ts(x):
        h = int(x // 3600); mi = int(x % 3600 // 60); s = x % 60
        return f"{h:02}:{mi:02}:{int(s):02},{int(round((s - int(s)) * 1000)):03}"
    out = []
    for j, (s, e, tx) in enumerate(subs):
        nb = subs[j + 1][0] - 0.02 if j + 1 < len(subs) else e
        out.append(f"{j+1}\n{ts(s)} --> {ts(min(e, nb) if min(e, nb) > s + 0.4 else s + 0.8)}\n{tx}\n")
    open(a.out, 'w').write('\n'.join(out))
    print(len(subs), 'Untertitel, Gesamt', round(off, 2), 's')


if __name__ == '__main__':
    P = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    S = P.add_subparsers(dest='cmd', required=True)
    p = S.add_parser('split'); p.add_argument('proj'); p.add_argument('src'); p.add_argument('keys'); p.set_defaults(f=cmd_split)
    p = S.add_parser('voice'); p.add_argument('proj'); p.add_argument('--tempo', type=float, default=1.10); p.add_argument('--gap', type=float, default=0.28); p.set_defaults(f=cmd_voice)
    p = S.add_parser('short'); p.add_argument('proj'); p.add_argument('remo'); p.add_argument('name'); p.add_argument('body'); p.add_argument('--gaps'); p.set_defaults(f=cmd_short)
    p = S.add_parser('long'); p.add_argument('proj'); p.add_argument('remo'); p.add_argument('name'); p.add_argument('chapters'); p.set_defaults(f=cmd_long)
    p = S.add_parser('mixshort'); p.add_argument('inp'); p.add_argument('out'); p.add_argument('--music'); p.set_defaults(f=cmd_mixshort)
    p = S.add_parser('mixlong'); p.add_argument('out'); p.add_argument('plan'); p.add_argument('parts', nargs='+'); p.set_defaults(f=cmd_mixlong)
    p = S.add_parser('srt'); p.add_argument('proj'); p.add_argument('remo'); p.add_argument('name'); p.add_argument('n', type=int); p.add_argument('out'); p.set_defaults(f=cmd_srt)
    p = S.add_parser('compress'); p.add_argument('inp'); p.add_argument('out'); p.set_defaults(f=cmd_compress)
    a = P.parse_args(); a.f(a)
