#!/usr/bin/env python3
"""Forced alignment light: known text + energy envelope -> word start times.
usage: align.py <wav> <key> [out.json]   (key into all_texts.json)
"""
import sys, json, re, subprocess, numpy as np

HOP = 0.01

def load(wav):
    raw = subprocess.run(['ffmpeg','-loglevel','error','-i',wav,'-ac','1','-ar','16000','-f','s16le','-'],
                         capture_output=True).stdout
    return np.frombuffer(raw, np.int16).astype(np.float32)/32768, 16000

def envelope(x, sr):
    n = int(sr*HOP); w = int(sr*0.025)
    frames = len(x)//n
    e = np.array([np.sqrt(np.mean(x[i*n:i*n+w]**2)+1e-10) for i in range(frames)])
    db = 20*np.log10(e)
    return db

def silences(db, minlen=0.11):
    peak = np.percentile(db, 95)
    floor = np.percentile(db, 5)
    thr = max(floor+12, peak-38)
    sil = db < thr
    # smooth: fill tiny speech blips (<30ms) inside silence
    out = []; i = 0; N = len(sil)
    while i < N:
        if sil[i]:
            j = i
            while j < N and sil[j]: j += 1
            out.append([i*HOP, j*HOP]); i = j
        else: i += 1
    # merge silences separated by <40ms of "speech"
    m = []
    for s in out:
        if m and s[0]-m[-1][1] < 0.04: m[-1][1] = s[1]
        else: m.append(s)
    lead = m[0][1] if m and m[0][0] == 0 else 0.0
    tail = m[-1][0] if m and m[-1][1] >= (N-1)*HOP else N*HOP
    inner = [s for s in m if s[0] > lead and s[1] < tail and s[1]-s[0] >= minlen]
    return lead, tail, inner

DIG = ['sch','tsch','ch','ck','ng','ei','ie','au','eu','äu','ai','ph','th','qu','ss','ß']
def weight(word):
    w = word.lower()
    w = re.sub(r'[^a-zäöüß]', '', w)
    if not w: return 0.5
    ph = len(w)
    for d in DIG: ph -= w.count(d)*(len(d)-1) if len(d) > 1 else 0
    vow = len(re.findall(r'[aeiouäöüy]+', w))
    return ph + 1.2*vow

def brk(word):
    if re.search(r'[.!?]["“”]?$', word): return 3
    if re.search(r'[:;]$', word) or word.endswith('–'): return 2
    if re.search(r'[,]$', word): return 2
    return 0

def align(wav, text):
    x, sr = load(wav)
    db = envelope(x, sr)
    lead, tail, sils = silences(db)
    words = [w for w in text.split() if re.search(r'\w', w)]
    # attach dashes as break on previous word
    toks = text.split(); words = []; brks = []
    for t in toks:
        if not re.search(r'\w', t):
            if brks: brks[-1] = max(brks[-1], 2)
            continue
        words.append(t); brks.append(brk(t))
    W = np.array([weight(w) for w in words]); cum = np.concatenate([[0], np.cumsum(W)])
    nW = len(words)
    speech_total = (tail-lead) - sum(s[1]-s[0] for s in sils)
    rate = speech_total / cum[-1]
    S = len(sils)
    # DP: assign each silence to a boundary b in 1..nW-1 (after word b-1) or skip it
    INF = 1e18
    # state: dp[i][b] = cost having processed silences 0..i-1, last assigned boundary b (0 = start)
    # positions: start time of each segment
    def segcost(b0, t0, b1, t1):
        pred = (cum[b1]-cum[b0])*rate
        act = max(t1-t0, 0.02)
        return 6*np.log(act/pred)**2
    def bcost(b, dur):
        k = brks[b-1]
        if k == 3: return -1.5 - min(dur, .6)
        if k == 2: return -1.0 - min(dur, .4)
        return 0.6 + max(0, 0.25-dur)*4
    # missed strong breaks penalty
    def missed(b0, b1):
        return sum(0.8 if brks[k-1] == 3 else 0.3 if brks[k-1] == 2 else 0 for k in range(b0+1, b1))
    # explicit DP with arrays
    best = [dict() for _ in range(S+1)]  # best[i][b] = (cost, prev_b, prev_i, endtime)
    best[0][0] = (0.0, None, None, lead)
    for i in range(S):
        s0, s1 = sils[i]
        for b, (c, pb, pi, tend) in list(best[i].items()):
            # skip silence i
            cur = best[i+1].get(b)
            cc = c + 0.5 + (s1-s0)*2
            if cur is None or cc < cur[0]: best[i+1][b] = (cc, b, i, tend)
            # assign silence i to boundary nb > b
            for nb in range(b+1, nW):
                pred = (cum[nb]-cum[b])*rate
                if pred > 3*(s0-tend)+0.6: break
                cc = c + segcost(b, tend, nb, s0) + bcost(nb, s1-s0) + missed(b, nb)
                cur = best[i+1].get(nb)
                if cur is None or cc < cur[0]: best[i+1][nb] = (cc, b, i, s1)
    # finish: last segment to tail
    fin = None
    for b, (c, pb, pi, tend) in best[S].items():
        cc = c + segcost(b, tend, nW, tail) + missed(b, nW+1 if False else nW)
        if fin is None or cc < fin[0]: fin = (cc, b)
    # backtrack: list of (boundary, silence)
    bounds = []; i = S; b = fin[1]
    while i > 0:
        c, pb, pi, tend = best[i][b]
        if pb != b: bounds.append((b, sils[i-1]))
        b = pb; i -= 1
    bounds.reverse()
    # segments: (b0,t0)-(b1,t1)
    segs = []; b0 = 0; t0 = lead
    for b, (s0, s1) in bounds:
        segs.append((b0, t0, b, s0)); b0 = b; t0 = s1
    segs.append((b0, t0, nW, tail))
    starts = [0.0]*nW; ends = [0.0]*nW
    for (a, ta, z, tz) in segs:
        tot = cum[z]-cum[a]
        for k in range(a, z):
            starts[k] = ta + (tz-ta)*(cum[k]-cum[a])/tot
            ends[k] = ta + (tz-ta)*(cum[k+1]-cum[a])/tot
    # refine starts inside segments: snap to nearest energy valley within ±60ms
    for k in range(nW):
        if any(k == a for (a, _, _, _) in segs): continue
        c = int(starts[k]/HOP); lo, hi = max(c-6, 0), min(c+7, len(db))
        if hi > lo:
            j = lo + int(np.argmin(db[lo:hi]))
            starts[k] = j*HOP
    return [{'text': w, 'start': round(s, 3), 'end': round(e, 3)} for w, s, e in zip(words, starts, ends)], len(x)/sr

if __name__ == '__main__':
    texts = json.load(open('all_texts.json'))
    wav, key = sys.argv[1], sys.argv[2]
    res, dur = align(wav, texts[key])
    out = {'dur': round(dur, 3), 'words': res}
    if len(sys.argv) > 3: json.dump(out, open(sys.argv[3], 'w'), ensure_ascii=False)
    else:
        for w in res: print(f"{w['start']:7.2f} {w['text']}")
