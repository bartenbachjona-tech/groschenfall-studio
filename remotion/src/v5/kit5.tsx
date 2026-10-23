import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { noise2D } from "@remotion/noise";
import { C, FONT } from "../brand";
import { CL, IO, OUT, SPR, Timing, lerp, pop, tw } from "../kit/core";
import { Stripes } from "../kit/Stage";
import { ChapterShell, Sfx } from "../kit/Chapter";
import { ChapterLabel } from "../kit/Caption";
import { Figure, FigProps } from "../kit/Figure";

export const norm = (s: string) => s.toLowerCase().replace(/[^a-zäöüß0-9]/g, "");
/** Frame eines Wortes (Wortanfang beginnt mit `word`) in Absatz p */
export const mkA = (T: Timing) => (p: number, word: string, nth = 0) => {
  const P = T.paras[p]; let c = 0;
  for (const w of P.words) if (norm(w.text).startsWith(norm(word))) { if (c === nth) return Math.round((P.start + w.start) * 30); c++; }
  console.log("MISSING", p, word); return Math.round(P.start * 30);
};
export const mkPS = (T: Timing) => (p: number) => Math.round(T.paras[p].start * 30);
export const mkPE = (T: Timing) => (p: number) => Math.round((T.paras[p].start + T.paras[p].dur) * 30);

/* ---------- Szenen ---------- */
export type SceneDef = { a: number; b: number; kind?: "fade" | "slide" | "zoom"; render: (f: number, lf: number) => React.ReactNode };
export const Scenes: React.FC<{ f: number; list: SceneDef[] }> = ({ f, list }) => (
  <>
    {list.map((s, i) => {
      if (f < s.a - 14 || f > s.b + 14) return null;
      const inn = interpolate(f, [s.a - 12, s.a + 6], [0, 1], { ...CL, easing: OUT });
      const out = interpolate(f, [s.b - 6, s.b + 12], [0, 1], { ...CL, easing: IO });
      const k = s.kind ?? "fade";
      const push = interpolate(f, [s.a, s.b], [1, 1.05], CL);
      const nx = noise2D(`sx${i}`, f / 100, 0) * 5, ny = noise2D(`sy${i}`, 0, f / 100) * 4;
      let tx = nx, ty = ny, sc = push;
      if (k === "slide") { tx += lerp(160, 0, inn) - lerp(0, 160, out); }
      if (k === "zoom") { sc *= lerp(0.88, 1, inn) * lerp(1, 1.12, out); }
      return (
        <AbsoluteFill key={i} style={{ opacity: inn * (1 - out), transform: `translate(${tx}px, ${ty}px) scale(${sc})`, transformOrigin: "50% 55%" }}>
          <svg width={1920} height={1080} style={{ position: "absolute" }}>{s.render(f, f - s.a)}</svg>
        </AbsoluteFill>
      );
    })}
  </>
);

export const V5Shell: React.FC<{ n: number; title: string; total: number; sfx: Sfx[]; children: React.ReactNode; label?: boolean }> = ({ n, title, sfx, children, label = true }) => {
  const f = useCurrentFrame();
  return (
    <ChapterShell ch={n} blur={[]} sfx={sfx} src={`audio/v5ch${n}.wav`} overlay={label && n > 0 ? <ChapterLabel f={f} n={n} title={title} at={6} dur={110} /> : null}>
      <Stripes w={1920} h={1080} />
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <ellipse cx={960} cy={1010} rx={900} ry={90} fill="#0A111D" opacity={0.35} />
      </svg>
      {children}
    </ChapterShell>
  );
};

/* ---------- Text ---------- */
export const Tx: React.FC<{ x: number; y: number; s: number; c?: string; a?: "start" | "middle" | "end"; o?: number; w?: number; children: React.ReactNode }> = ({ x, y, s, c = C.white, a = "middle", o = 1, w = 800, children }) => (
  <text x={x} y={y} fontSize={s} fontFamily={FONT} fontWeight={w} fill={c} textAnchor={a} opacity={o} stroke="#0A111D" strokeWidth={s * 0.08} paintOrder="stroke" letterSpacing={-0.5}>{children}</text>
);
/** Zahl/Label, die mit Feder reinspringt */
export const Pop: React.FC<{ f: number; at: number; x: number; y: number; children: React.ReactNode; s?: number }> = ({ f, at, x, y, children, s = 1 }) => {
  const p = pop(f, at, 14);
  if (f < at) return null;
  return <g transform={`translate(${x} ${y}) scale(${p * s})`} opacity={Math.min(1, p * 2)}>{children}</g>;
};
/** Zitat-Karte */
export const Quote: React.FC<{ f: number; at: number; x: number; y: number; w: number; lines: string[]; who?: string; col?: string }> = ({ f, at, x, y, w, lines, who, col = C.amber }) => {
  const p = interpolate(f, [at, at + 14], [0, 1], { ...CL, easing: SPR });
  if (f < at) return null;
  const H = 70 + lines.length * 58 + (who ? 50 : 0);
  return (
    <g transform={`translate(${x} ${y}) scale(${0.9 + 0.1 * p})`} opacity={p}>
      <rect width={w} height={H} rx={26} fill={C.deep} opacity={0.94} />
      <rect width={10} height={H} rx={5} fill={col} />
      <text x={34} y={70} fontFamily={FONT} fontWeight={800} fontSize={80} fill={col} opacity={0.5}>„</text>
      {lines.map((l, i) => <text key={i} x={80} y={78 + i * 58} fontFamily={FONT} fontWeight={700} fontSize={40} fill={C.white} opacity={tw(f, at + 6 + i * 6, 10)}>{l}</text>)}
      {who && <text x={80} y={H - 30} fontFamily={FONT} fontWeight={600} fontSize={30} fill={C.gray} opacity={tw(f, at + 14, 10)}>{who}</text>}
    </g>
  );
};

/* ---------- Figuren ---------- */
/** Stilisierte Kanzler-Figur: graue Haare, Brille, dunkler Anzug */
export const Merz: React.FC<FigProps & { tag?: number }> = (p) => {
  const s = p.s ?? 1;
  return (
    <g>
      <Figure {...p} shirt="#22304A" sleeve="#2C3C5C" hair="#B8BEC8" hairStyle={2} />
      <g transform={`translate(${p.x} ${p.y}) scale(${p.flip ? -s : s} ${s})`}>
        <path d="M -8 38 L 0 70 L 8 38 Z" fill={C.red} />
        {[-20, 20].map((ex, k) => <circle key={k} cx={ex} cy={-30} r={16} fill="none" stroke="#1A1A1A" strokeWidth={4} />)}
        <path d="M -4 -30 L 4 -30" stroke="#1A1A1A" strokeWidth={4} />
      </g>
      {p.tag !== undefined && (
        <g transform={`translate(${p.x} ${p.y - 190 * s})`} opacity={tw(p.f, p.tag, 12)}>
          <rect x={-170} y={0} width={340} height={64} rx={14} fill={C.deep} />
          <text x={0} y={42} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={30} fill={C.white}>Friedrich Merz</text>
        </g>
      )}
    </g>
  );
};
/** Hausärztin: weißer Kittel, Stethoskop */
export const Doc: React.FC<FigProps> = (p) => {
  const s = p.s ?? 1;
  return (
    <g>
      <Figure {...p} shirt="#EEF2F7" sleeve="#DDE4EE" hair="#5B3A29" hairStyle={1} />
      <g transform={`translate(${p.x} ${p.y}) scale(${p.flip ? -s : s} ${s})`}>
        <path d="M -24 40 Q -30 120 0 130 Q 30 120 24 40" fill="none" stroke="#3A4560" strokeWidth={6} />
        <circle cx={0} cy={134} r={12} fill="#9AA8BF" />
      </g>
    </g>
  );
};
/** Krank-Overlay: Schal + rote Nase */
export const Sick: React.FC<{ x: number; y: number; s?: number; col?: string }> = ({ x, y, s = 1, col = C.red }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-46} y={22} width={92} height={24} rx={12} fill={col} />
    <rect x={14} y={30} width={22} height={60} rx={8} fill={col} />
    <circle cx={0} cy={-18} r={9} fill="#E46B6B" opacity={0.9} />
  </g>
);

/* ---------- Requisiten ---------- */
export const Bed: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-330} y={-40} width={660} height={130} rx={24} fill="#3A5A9A" />
    <rect x={-330} y={-40} width={660} height={34} rx={17} fill="#4E70B4" />
    <rect x={-360} y={-180} width={40} height={300} rx={14} fill="#5B3A29" />
    <rect x={320} y={-110} width={40} height={230} rx={14} fill="#5B3A29" />
    <rect x={-310} y={-110} width={170} height={74} rx={30} fill={C.white} />
  </g>
);
export const Phone: React.FC<{ x: number; y: number; s?: number; r?: number; ring?: number }> = ({ x, y, s = 1, r = 0, ring = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r + Math.sin(ring * 1.2) * 6 * (ring > 0 ? 1 : 0)}) scale(${s})`}>
    <rect x={-50} y={-90} width={100} height={180} rx={18} fill="#1A2233" stroke="#5A6B88" strokeWidth={5} />
    <rect x={-40} y={-74} width={80} height={140} rx={8} fill="#2A3F63" />
    <circle cx={0} cy={0} r={22} fill={C.green} />
    <path d="M -9 -6 Q -10 8 6 10 L 10 6 L 4 0 L 0 4 Q -4 0 -4 -4 L 0 -8 Z" fill={C.deep} />
  </g>
);
export const Thermo: React.FC<{ x: number; y: number; s?: number; v: number; r?: number }> = ({ x, y, s = 1, v, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <rect x={-22} y={-200} width={44} height={240} rx={22} fill="#EEF2F7" />
    <circle cx={0} cy={60} r={40} fill="#EEF2F7" />
    <circle cx={0} cy={60} r={30} fill={C.red} />
    <rect x={-9} y={40 - 220 * v} width={18} height={220 * v + 20} rx={9} fill={C.red} />
  </g>
);
/** Kalender-Leiste Tag 1–n */
export const Days: React.FC<{ f: number; x: number; y: number; n: number; at: number; mark?: (i: number) => React.ReactNode; w?: number }> = ({ f, x, y, n, at, mark, w = 200 }) => (
  <g transform={`translate(${x} ${y})`}>
    {Array.from({ length: n }).map((_, i) => {
      const p = pop(f, at + i * 4, 12);
      return (
        <g key={i} transform={`translate(${i * (w + 24)} 0) scale(${p})`} opacity={Math.min(1, p * 2)}>
          <rect x={0} y={0} width={w} height={220} rx={22} fill="#EEF2F7" />
          <rect x={0} y={0} width={w} height={56} rx={22} fill={C.red} /><rect x={0} y={34} width={w} height={22} fill={C.red} />
          <text x={w / 2} y={40} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={28} fill="#FFFFFF">TAG</text>
          <text x={w / 2} y={170} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={100} fill="#0A111D">{i + 1}</text>
          {mark && mark(i)}
        </g>
      );
    })}
  </g>
);
/** Attest-Zettel (gelb) */
export const Slip: React.FC<{ s?: number; label?: string; col?: string }> = ({ s = 1, label = "ATTEST", col = "#FFD84D" }) => (
  <g transform={`scale(${s})`}>
    <rect x={-80} y={-100} width={160} height={200} rx={12} fill={col} />
    <rect x={-80} y={-100} width={160} height={200} rx={12} fill="none" stroke="#0A111D" strokeOpacity={0.15} strokeWidth={4} />
    <text x={0} y={-56} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={26} fill="#0A111D">{label}</text>
    {[-20, 10, 40, 70].map((y, i) => <rect key={i} x={-56} y={y} width={i === 3 ? 60 : 112} height={10} rx={5} fill="#0A111D" opacity={0.25} />)}
  </g>
);
/** Geldstapel */
export const Cash: React.FC<{ x: number; y: number; h: number; w?: number }> = ({ x, y, h, w = 160 }) => (
  <g transform={`translate(${x} ${y})`}>
    {Array.from({ length: Math.max(1, Math.round(h / 22)) }).map((_, i) => (
      <g key={i} transform={`translate(${(i % 2) * 6 - 3} ${-i * 22})`}>
        <rect x={-w / 2} y={-20} width={w} height={20} rx={4} fill={i % 2 ? "#2E9E6B" : "#3DDC97"} />
        <rect x={-w / 2 + 10} y={-15} width={w - 20} height={10} rx={3} fill="#0A111D" opacity={0.12} />
      </g>
    ))}
  </g>
);
/** Balken mit Wert */
export const BarV: React.FC<{ f: number; at: number; x: number; base: number; h: number; w?: number; col: string; label: string; val: string; d?: number }> = ({ f, at, x, base, h, w = 160, col, label, val, d = 26 }) => {
  const g = interpolate(f, [at, at + d], [0, 1], { ...CL, easing: OUT });
  return (
    <g opacity={f < at - 2 ? 0 : 1}>
      <rect x={x - w / 2} y={base - h * g} width={w} height={h * g} rx={14} fill={col} />
      <Tx x={x} y={base - h * g - 24} s={52} o={g > 0.05 ? 1 : 0}>{val}</Tx>
      <Tx x={x} y={base + 58} s={36} c={C.gray} w={700}>{label}</Tx>
    </g>
  );
};
export const Ring: React.FC<{ f: number; at: number; x: number; y: number; r: number; v: number; col: string; val: string; label: string[] }> = ({ f, at, x, y, r, v, col, val, label }) => {
  const g = interpolate(f, [at, at + 30], [0, v], { ...CL, easing: OUT });
  const L = 2 * Math.PI * r;
  if (f < at - 2) return null;
  return (
    <g transform={`translate(${x} ${y})`} opacity={tw(f, at - 2, 8)}>
      <circle r={r} fill="none" stroke="#2A3F63" strokeWidth={34} />
      <circle r={r} fill="none" stroke={col} strokeWidth={34} strokeDasharray={`${L * g} ${L}`} transform="rotate(-90)" strokeLinecap="round" />
      <Tx x={0} y={22} s={68}>{val}</Tx>
      {label.map((l, i) => <Tx key={i} x={0} y={r + 80 + i * 44} s={34} c={C.gray} w={700} o={tw(f, at + 10, 10)}>{l}</Tx>)}
    </g>
  );
};
export const Check: React.FC<{ p: number; ok?: boolean; r?: number }> = ({ p, ok = true, r = 34 }) => (
  <g transform={`scale(${p})`} opacity={Math.min(1, p * 2)}>
    <circle r={r} fill={ok ? C.green : C.red} />
    {ok ? <path d={`M${-r * .45} ${r * .05} L${-r * .1} ${r * .38} L${r * .5} ${-r * .3}`} fill="none" stroke="#0A111D" strokeWidth={r * .24} strokeLinecap="round" strokeLinejoin="round" />
      : <path d={`M${-r * .35} ${-r * .35} L${r * .35} ${r * .35} M${r * .35} ${-r * .35} L${-r * .35} ${r * .35}`} stroke="#0A111D" strokeWidth={r * .24} strokeLinecap="round" />}
  </g>
);
export const Virus: React.FC<{ x: number; y: number; r?: number; f: number; seed: number }> = ({ x, y, r = 26, f, seed }) => (
  <g transform={`translate(${x + noise2D(`vx${seed}`, f / 60, 0) * 60} ${y + noise2D(`vy${seed}`, 0, f / 60) * 50}) rotate(${f * 1.5 + seed * 40})`}>
    {Array.from({ length: 8 }).map((_, i) => <g key={i} transform={`rotate(${i * 45})`}><rect x={-3} y={-r - 14} width={6} height={16} fill="#3DDC97" /><circle cy={-r - 16} r={6} fill="#3DDC97" /></g>)}
    <circle r={r} fill="#2E9E6B" /><circle cx={-r * .3} cy={-r * .3} r={r * .25} fill="#3DDC97" />
  </g>
);
export const Mag: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle r={90} fill="#FFFFFF" opacity={0.12} /><circle r={90} fill="none" stroke="#EEF2F7" strokeWidth={18} />
    <rect x={60} y={60} width={110} height={34} rx={17} fill="#5B3A29" transform="rotate(45 60 60)" />
  </g>
);
export const StampT: React.FC<{ f: number; at: number; x: number; y: number; text: string; s?: number; col?: string; rot?: number }> = ({ f, at, x, y, text, s = 1, col = C.red, rot = -8 }) => {
  if (f < at) return null;
  const k = interpolate(f, [at, at + 8], [0, 1], CL);
  const w = text.length * 46 + 90;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s * lerp(2.4, 1, k)})`} opacity={k}>
      <rect x={-w / 2} y={-62} width={w} height={112} rx={16} fill="none" stroke={col} strokeWidth={9} />
      <text y={22} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={76} fill={col}>{text}</text>
    </g>
  );
};
export { C, FONT, Figure, tw, pop, lerp, IO, OUT, SPR, CL, interpolate };
