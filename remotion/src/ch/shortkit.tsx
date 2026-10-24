/* Gemeinsamer Baukasten für Shorts ab Short 9 (1080×1920). Muster: Short8.tsx */
import React from "react";
import { AbsoluteFill, Easing, Img, Sequence, interpolate, random, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { noise2D } from "@remotion/noise";
import { C, FONT } from "../brand";
import { CL, IO, OUT, SPR, lerp, pop, tw } from "../kit/core";
import { Coin } from "../kit/Props";

export const W = 1080, H = 1920, FPS = 30;
export const fr = (s: number) => Math.round(s * FPS);
export type P = { start: number; dur: number; words: { text: string; start: number; end?: number }[] };
export type SD = { paras: Record<string, P>; tot_yt: number; tot_tt: number };
export const norm = (s: string) => s.toLowerCase().replace(/[^a-zäöüß0-9']/g, "");

/** Zeit-Helfer für eine Short-Datei */
export const mk = (D: SD) => {
  const PA = D.paras;
  /** Wortanfang; mit "=" vorne exakter Treffer (z. B. "=zwei") */
  const wk = (k: string, word: string, nth = 0) => {
    const p = PA[k]; let n = 0; const ex = word.startsWith("="); const q = norm(word);
    for (const w of p.words) if (ex ? norm(w.text) === q : norm(w.text).startsWith(q)) { if (n === nth) return fr(p.start + w.start); n++; }
    console.log("MISSING", k, word);
    return fr(p.start);
  };
  const ps = (k: string) => fr(PA[k].start);
  const pe = (k: string) => fr(PA[k].start + PA[k].dur);
  return { PA, wk, ps, pe, DUR: { yt: fr(D.tot_yt), tt: fr(D.tot_tt) } };
};

export const SFX_GAIN: Record<string, number> = { soft: 0.5, whoosh: 0.4, stamp: 0.55, ding: 0.4, paper: 0.5, marimba: 0.45, coins: 0.4 };

export const Txt: React.FC<{ x: number; y: number; s: number; c?: string; a?: "start" | "middle" | "end"; o?: number; w?: number; children: React.ReactNode }> = ({ x, y, s, c = C.white, a = "middle", o = 1, w = 800, children }) => (
  <text x={x} y={y} fontSize={s} fontFamily={FONT} fontWeight={w} fill={c} textAnchor={a} opacity={o} stroke="#0A111D" strokeWidth={s * 0.1} paintOrder="stroke" letterSpacing={-1}>{children}</text>
);

/** kleine Quellenzeile oben */
export const Src: React.FC<{ o: number; children: React.ReactNode; y?: number }> = ({ o, children, y = 205 }) => (
  <text x={540} y={y} textAnchor="middle" fontFamily={FONT} fontWeight={600} fontSize={30} fill={C.gray} opacity={o * 0.85}>{children}</text>
);

/* ---------- Szenen (Ein-/Ausblenden mit leichtem Schub) ---------- */
export type Scene = { a: number; b: number; render: (f: number) => React.ReactNode; kind?: "up" | "zoom" };
export const Scenes: React.FC<{ f: number; list: Scene[] }> = ({ f, list }) => (
  <>
    {list.map((s, i) => {
      if (f < s.a - 14 || f > s.b + 14) return null;
      const inn = i === 0 && s.a <= 0 ? 1 : interpolate(f, [s.a - 2, s.a + 12], [0, 1], { ...CL, easing: OUT });
      const out = interpolate(f, [s.b - 4, s.b + 10], [0, 1], { ...CL, easing: IO });
      const nx = noise2D(`sx${i}`, f / 110, 0) * 4, ny = noise2D(`sy${i}`, 0, f / 110) * 4;
      const push = interpolate(f, [s.a, s.b], [1, 1.04], CL);
      const zk = s.kind === "zoom";
      const ty = zk ? 0 : lerp(70, 0, inn) - lerp(0, 50, out);
      const sc = push * (zk ? lerp(0.9, 1, inn) * lerp(1, 1.1, out) : 1);
      return (
        <g key={i} opacity={inn * (1 - out)} transform={`translate(${540 + nx} ${960 + ny + ty}) scale(${sc}) translate(-540 -960)`}>
          {s.render(f)}
        </g>
      );
    })}
  </>
);

/* ---------- Untertitel mit Zahlen-Ersetzung ---------- */
type Tok = { at: number; text: string; num: boolean };
export type Phrase = [string, string]; // ["vierundsiebzig komma neun prozent", "74,9 %"]
const tokens = (PA: Record<string, P>, k: string, phrases: Phrase[]): Tok[] => {
  const ws = PA[k].words; const out: Tok[] = [];
  const ph = phrases.map(([a, b]) => [a.split(" ").map(norm), b] as [string[], string]).sort((x, y) => y[0].length - x[0].length);
  let i = 0;
  while (i < ws.length) {
    let hit: [string[], string] | undefined;
    for (const p of ph) if (p[0].every((n, j) => ws[i + j] && norm(ws[i + j].text) === n)) { hit = p; break; }
    const at = fr(PA[k].start + ws[i].start);
    if (hit) {
      const last = ws[i + hit[0].length - 1].text; const punct = (last.match(/[,.:?!]+$/) || [""])[0];
      out.push({ at, text: hit[1] + punct, num: /\d/.test(hit[1]) }); i += hit[0].length;
    } else { out.push({ at, text: ws[i].text, num: false }); i++; }
  }
  return out;
};
export type Chunk = { at: number; toks: Tok[] };
export const chunks = (PA: Record<string, P>, keys: string[], phrases: Phrase[]): Chunk[] => {
  const out: Chunk[] = [];
  for (const k of keys) {
    const ts = tokens(PA, k, phrases); let cur: Tok[] = [];
    ts.forEach((t, i) => {
      cur.push(t);
      const len = cur.map((c) => c.text).join(" ").length;
      if (/[,.:?!]$/.test(t.text) || cur.length >= 3 || len > 20 || i === ts.length - 1) { out.push({ at: cur[0].at, toks: cur }); cur = []; }
    });
  }
  return out;
};
export const Sub: React.FC<{ f: number; cs: Chunk[]; end: number; hi: string[]; top?: number }> = ({ f, cs, end, hi, top = 1430 }) => {
  const i = cs.findIndex((c, j) => f >= c.at - 1 && f < (cs[j + 1]?.at ?? end) - 1);
  if (i < 0 || f >= end) return null;
  const c = cs[i];
  const p = interpolate(f, [c.at - 1, c.at + 6], [0, 1], { ...CL, easing: SPR });
  return (
    <div style={{ position: "absolute", top, left: 60, right: 60, textAlign: "center", fontFamily: FONT, fontWeight: 800, fontSize: 66, lineHeight: 1.15, color: C.white, letterSpacing: -1, opacity: p, transform: `translateY(${lerp(14, 0, p)}px)` }}>
      {c.toks.map((t, k) => {
        const h = t.num || hi.some((x) => norm(t.text).startsWith(x));
        return <span key={k} style={{ color: h ? C.amber : C.white, textShadow: "0 6px 0 #0A111D, 0 0 30px rgba(10,17,29,.9)" }}>{t.text} </span>;
      })}
    </div>
  );
};

export const Grain: React.FC<{ f: number }> = ({ f }) => (
  <>
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 42%, rgba(0,0,0,0) 50%, rgba(4,8,16,.6) 100%)" }} />
    <AbsoluteFill style={{ opacity: 0.07, mixBlendMode: "overlay", overflow: "hidden" }}>
      <Img src={staticFile("grain.png")} style={{ position: "absolute", width: 3700, height: 2120, left: -(random(`g${Math.floor(f / 2)}`) * 300), top: -(random(`h${Math.floor(f / 2)}`) * 200) }} />
    </AbsoluteFill>
  </>
);

export const SfxTrack: React.FC<{ list: [number, string, number?][] }> = ({ list }) => (
  <>
    {list.map(([t, n, v], i) => (
      <Sequence key={i} from={Math.max(0, t)} durationInFrames={90}><Audio src={staticFile(`sfx/n_sfx_${n}.wav`)} volume={(v ?? 0.6) * (SFX_GAIN[n] ?? 0.5)} /></Sequence>
    ))}
  </>
);

/** Pfeil hoch/runter in Farbe */
export const Arrow: React.FC<{ up: boolean; col: string; s?: number }> = ({ up, col, s = 1 }) => (
  <g transform={`scale(${s}) rotate(${up ? 0 : 180})`}>
    <path d="M0 -70 L56 0 L22 0 L22 70 L-22 70 L-22 0 L-56 0 Z" fill={col} stroke="#0A111D" strokeWidth={6} strokeLinejoin="round" />
  </g>
);

/** Pille mit Text */
export const Pill: React.FC<{ w: number; text: string; col: string; fg?: string; s?: number; h?: number }> = ({ w, text, col, fg = "#0A111D", s = 54, h = 120 }) => (
  <g>
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={h / 2} fill="#0A111D" opacity={0.4} transform="translate(6 10)" />
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={h / 2} fill={col} />
    <text y={s * 0.36} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={s} fill={fg}>{text}</text>
  </g>
);

/** Ende YouTube: Folg Groschenfall */
export const EndYT: React.FC<{ f: number; at: number; line: string }> = ({ f, at, line }) => {
  const k = f - at;
  const drop = interpolate(k, [0, 24], [-260, 700], { ...CL, easing: Easing.bounce });
  const btn = pop(f, at + 20, 16);
  return (
    <g>
      <g transform={`translate(540 ${drop}) rotate(${interpolate(k, [0, 24], [-200, 0], CL)})`}><Coin r={130} label="G" /></g>
      <Txt x={540} y={1000} s={96} o={tw(f, at + 12, 12)}>Groschenfall</Txt>
      <Txt x={540} y={1080} s={46} c={C.gray} w={700} o={tw(f, at + 18, 12)}>{line}</Txt>
      <g transform={`translate(540 1250) scale(${btn})`} opacity={Math.min(1, btn * 2)}><Pill w={420} text="Folgen" col={C.amber} s={62} h={130} /></g>
    </g>
  );
};

/** Ende TikTok: Frage + Antwort-Buttons */
export const EndTT: React.FC<{ f: number; at: number; q: [string, string]; opts: [string, string][] }> = ({ f, at, q, opts }) => (
  <g>
    <Txt x={540} y={430} s={90} o={tw(f, at, 12)}>{q[0]}</Txt>
    <Txt x={540} y={545} s={90} c={C.amber} o={tw(f, at + 4, 12)}>{q[1]}</Txt>
    {opts.map(([t, c], i) => {
      const p = pop(f, at + 12 + i * 6, 14);
      return <g key={i} transform={`translate(540 ${760 + i * 170}) scale(${p})`} opacity={Math.min(1, p * 2)}><Pill w={680} text={t} col={c} s={62} h={128} /></g>;
    })}
    <Txt x={540} y={760 + opts.length * 170 + 30} s={46} c={C.gray} w={700} o={tw(f, at + 30, 12)}>Schreib's in die Kommentare</Txt>
  </g>
);

export { C, FONT, CL, IO, OUT, SPR, lerp, pop, tw, interpolate };
