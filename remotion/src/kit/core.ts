import { Easing, interpolate } from "remotion";
export const CL = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
export const IO = Easing.bezier(0.65, 0, 0.35, 1);
export const OUT = Easing.bezier(0.16, 1, 0.3, 1);
export const SPR = Easing.spring({ damping: 12 });
export const SOFT = Easing.spring({ damping: 200 });
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
/** 0→1 von Frame a über d Frames */
export const tw = (f: number, a: number, d: number, e: (t: number) => number = OUT) =>
  interpolate(f, [a, a + d], [0, 1], { ...CL, easing: e });
/** rein/raus-Fenster */
export const win = (f: number, a: number, b: number, d = 12) => tw(f, a, d) * (1 - tw(f, b, d, IO));
export const pop = (f: number, a: number, d = 12) => interpolate(f, [a, a + d], [0, 1], { ...CL, easing: SPR });

export type Word = { text: string; start: number; end: number };
export type Para = { key: string; start: number; dur: number; words: Word[] };
export type Timing = { fps: number; total: number; paras: Para[] };
const norm = (s: string) => s.toLowerCase().replace(/[^a-zäöüß0-9]/g, "");
/** Frame des n-ten Vorkommens eines Wortes in Absatz p (absolute Kapitelzeit) */
export const mkW = (T: Timing) => (p: number, word: string, nth = 0, end = false) => {
  const P = T.paras[p]; if (!P) { console.log("MISSING para", p); return 0; }
  let c = 0;
  for (const w of P.words) if (norm(w.text) === norm(word)) { if (c === nth) return Math.round((P.start + (end ? w.end : w.start)) * T.fps); c++; }
  console.log("MISSING", p, word); return Math.round(P.start * T.fps);
};
export const mkP = (T: Timing) => (p: number, end = false) => Math.round((T.paras[p].start + (end ? T.paras[p].dur : 0)) * T.fps);
