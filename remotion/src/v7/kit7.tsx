/* Baukasten für Video 7 (Minijobs, Langvideo 1920×1080, Stil Nachtblau).
   Baut auf src/v5/kit5.tsx auf; gemeinsame Figuren Lena, Toni, Klaus, Sandra, Du-Figur
   + Requisiten für Kapitel 0–7. Zeit-Helfer per Absatz-Key (v7_<c>_<n>). */
import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { noise2D } from "@remotion/noise";
import { C, FONT } from "../brand";
import { CL, IO, OUT, SPR, Timing, lerp, pop, tw } from "../kit/core";
import { Stripes } from "../kit/Stage";
import { ChapterShell, Sfx } from "../kit/Chapter";
import { ChapterLabel } from "../kit/Caption";
import { Figure, FigProps } from "../kit/Figure";
import { BarV, Cash, Check, Mag, Pop, Quote, StampT, Tx } from "../v5/kit5";

export { BarV, Cash, Check, Mag, Pop, Quote, StampT, Tx, Figure, C, FONT, CL, IO, OUT, SPR, lerp, pop, tw, interpolate };
export type { Sfx, FigProps };

/* ---------- Zeit ---------- */
export const norm = (s: string) => s.toLowerCase().replace(/[^a-zäöüß0-9]/g, "");
/** Zeit-Helfer pro Kapitel. wk(key, "wort", n): Frame des n-ten Wortes, das mit "wort" BEGINNT;
 *  "=wort" = exakter Treffer (Falle „zwei“ → „zweihundert…“). ps/pe = Absatz-Start/-Ende. */
export const mk7 = (T: Timing) => {
  const by: Record<string, Timing["paras"][number]> = {};
  for (const p of T.paras) by[p.key] = p;
  const fr = (s: number) => Math.round(s * 30);
  const wk = (k: string, word: string, nth = 0) => {
    const P = by[k];
    if (!P) { console.log("MISSING para", k); return 0; }
    const ex = word.startsWith("="), q = norm(word);
    let n = 0;
    for (const w of P.words) if (ex ? norm(w.text) === q : norm(w.text).startsWith(q)) { if (n === nth) return fr(P.start + w.start); n++; }
    console.log("MISSING", k, word);
    return fr(P.start);
  };
  const ps = (k: string) => fr(by[k].start);
  const pe = (k: string) => fr(by[k].start + by[k].dur);
  return { wk, ps, pe, DUR: Math.ceil(T.total * 30) };
};

/* ---------- Szenen ---------- */
export type Sc = { at: number; kind?: "fade" | "slide" | "zoom"; render: (f: number, lf: number) => React.ReactNode };
/** Szenenliste aus Startframes: Szene i läuft von at_i bis at_{i+1}; erste Szene ab Frame 0 ohne Einblendung. */
export const Scenes7: React.FC<{ f: number; list: Sc[]; end: number }> = ({ f, list, end }) => (
  <>
    {list.map((s, i) => {
      const a = i === 0 ? -40 : s.at - 4;
      const b = i === list.length - 1 ? end + 40 : list[i + 1].at - 8;
      if (f < a - 14 || f > b + 14) return null;
      const inn = interpolate(f, [a - 12, a + 6], [0, 1], { ...CL, easing: OUT });
      const out = interpolate(f, [b - 6, b + 12], [0, 1], { ...CL, easing: IO });
      const k = s.kind ?? "fade";
      const push = interpolate(f, [Math.max(0, a), b], [1, 1.04], CL);
      const nx = noise2D(`sx${i}`, f / 100, 0) * 5, ny = noise2D(`sy${i}`, 0, f / 100) * 4;
      let tx = nx, ty = ny, sc = push;
      if (k === "slide") tx += lerp(160, 0, inn) - lerp(0, 160, out);
      if (k === "zoom") sc *= lerp(0.88, 1, inn) * lerp(1, 1.1, out);
      return (
        <AbsoluteFill key={i} style={{ opacity: inn * (1 - out), transform: `translate(${tx}px, ${ty}px) scale(${sc})`, transformOrigin: "50% 55%" }}>
          <svg width={1920} height={1080} style={{ position: "absolute" }}>{s.render(f, f - Math.max(0, s.at))}</svg>
        </AbsoluteFill>
      );
    })}
  </>
);

/** Kapitel-Rahmen: Ton v7ch<n>.wav, Kapitel-Label (ab Kap. 1), feste Ebene `bg` unter den Szenen */
export const V7Shell: React.FC<{ n: number; title: string; sfx: Sfx[]; bg?: React.ReactNode; children: React.ReactNode }> = ({ n, title, sfx, bg, children }) => {
  const f = useCurrentFrame();
  return (
    <ChapterShell ch={n} blur={[]} sfx={sfx} src={`audio/v7ch${n}.wav`} overlay={n > 0 ? <ChapterLabel f={f} n={n} title={title} at={6} dur={105} /> : null}>
      <Stripes w={1920} h={1080} />
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <ellipse cx={960} cy={1010} rx={900} ry={90} fill="#0A111D" opacity={0.35} />
      </svg>
      {bg}
      {children}
    </ChapterShell>
  );
};

/* ---------- Text ---------- */
/** Schlagzeile (≤ 5 Wörter) oben mittig, springt rein */
export const Head: React.FC<{ f: number; at: number; y?: number; s?: number; c?: string; x?: number; children: React.ReactNode }> = ({ f, at, y = 175, s = 84, c = C.white, x = 960, children }) => {
  if (f < at) return null;
  const p = pop(f, at, 14);
  return <g transform={`translate(${x} ${y + lerp(30, 0, p)})`} opacity={Math.min(1, p * 1.6)}><Tx x={0} y={0} s={s} c={c}>{children}</Tx></g>;
};
/** Kleine Quellenzeile unten links (zählt nicht als Bildtext) */
export const Src: React.FC<{ f: number; at: number; children: React.ReactNode }> = ({ f, at, children }) => (
  <text x={56} y={1048} fontFamily={FONT} fontWeight={600} fontSize={22} fill={C.gray} opacity={0.8 * tw(f, at, 12)}>{children}</text>
);
/** Pille mit Text */
export const Pill: React.FC<{ x: number; y: number; text: string; col?: string; fg?: string; s?: number }> = ({ x, y, text, col = C.amber, fg = C.deep, s = 44 }) => {
  const w = text.length * s * 0.58 + s * 1.4;
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-w / 2} y={-s * 1.05} width={w} height={s * 1.6} rx={s * 0.8} fill={col} />
      <text y={s * 0.08} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={s} fill={fg}>{text}</text>
    </g>
  );
};
/** Bauchbinde „Name · Rolle“ + „Beispielfigur“ (beim ersten Auftritt), unten links */
export const LowerThird: React.FC<{ f: number; at: number; name: string; role?: string; dur?: number; x?: number; y?: number }> = ({ f, at, name, role, dur = 120, x = 80, y = 880 }) => {
  if (f < at || f > at + dur + 16) return null;
  const a = tw(f, at, 14), b = tw(f, at + dur, 14, IO);
  const w = Math.max(name.length + (role ? role.length + 3 : 0), 14) * 24 + 70;
  return (
    <g transform={`translate(${x + lerp(-40, 0, a)} ${y})`} opacity={a * (1 - b)}>
      <rect width={w} height={104} rx={18} fill={C.deep} opacity={0.94} />
      <rect width={10} height={104} rx={5} fill={C.green} />
      <text x={34} y={50} fontFamily={FONT} fontWeight={800} fontSize={40} fill={C.white}>{name}{role ? <tspan fill={C.gray} fontWeight={600}>{` · ${role}`}</tspan> : null}</text>
      <text x={34} y={86} fontFamily={FONT} fontWeight={600} fontSize={26} fill={C.green} letterSpacing={2}>BEISPIELFIGUR</text>
    </g>
  );
};

/* ---------- Figuren ---------- */
type P7 = FigProps;
const Acc: React.FC<{ p: P7; children: React.ReactNode }> = ({ p, children }) => {
  const s = p.s ?? 1;
  const breathe = Math.sin((p.f + (p.blinkSeed ?? 0) * 13) / 18) * 2;
  return <g transform={`translate(${p.x} ${p.y + breathe * s}) scale(${p.flip ? -s : s} ${s})`}>{children}</g>;
};
/** Lena: Studentin, kellnert – lange rotbraune Haare, weiße Bluse, dunkle Schürze */
export const Lena: React.FC<P7> = (p) => (
  <g>
    <Figure {...p} shirt="#EEF2F7" sleeve="#DDE4EE" hair="#B5552F" hairStyle={1} />
    <Acc p={p}>
      <path d="M -60 150 L 60 150 L 66 330 L -66 330 Z" fill="#2E3A55" />
      <rect x={-60} y={146} width={120} height={14} rx={6} fill="#2E3A55" />
      <rect x={-22} y={190} width={44} height={30} rx={6} fill="#43527A" />
    </Acc>
  </g>
);
/** Tablett mit zwei Gläsern – für Lena (an ihrer rechten Hand/Schulter platzieren) */
export const Tray: React.FC<{ x: number; y: number; s?: number; r?: number }> = ({ x, y, s = 1, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    {[-50, 10, 60].map((gx, i) => (
      <g key={i} transform={`translate(${gx} 0)`}>
        <path d={`M -20 -86 L 20 -86 L 16 0 L -16 0 Z`} fill={i === 1 ? "#E9C46A" : "#F2B544"} opacity={0.95} />
        <rect x={-22} y={-100} width={44} height={20} rx={10} fill="#FFF6E0" />
        <path d="M -20 -86 L 20 -86 L 16 0 L -16 0 Z" fill="none" stroke="#FFFFFF" strokeOpacity={0.5} strokeWidth={3} />
      </g>
    ))}
    <ellipse cx={0} cy={4} rx={120} ry={16} fill="#9AA8BF" />
    <ellipse cx={0} cy={0} rx={120} ry={14} fill="#C9D3E2" />
  </g>
);
/** Toni: Wirt – Schnurrbart, kurze dunkle Haare, Hemd + braune Weste */
export const Toni: React.FC<P7> = (p) => (
  <g>
    <Figure {...p} shirt="#7A4E36" sleeve="#C9D3E2" hair="#2B2140" hairStyle={2} />
    <Acc p={p}>
      <path d="M -16 34 L 0 66 L 16 34 Z" fill="#EEF2F7" />
      <path d="M -26 -16 Q -13 -26 0 -18 Q 13 -26 26 -16 Q 14 -8 0 -12 Q -14 -8 -26 -16 Z" fill="#2B2140" />
      <circle cx={-24} cy={130} r={5} fill="#E8D5B0" /><circle cx={-24} cy={170} r={5} fill="#E8D5B0" />
    </Acc>
  </g>
);
/** Klaus: Rentner – weiße Haare, Brille, lila Strickjacke */
export const Klaus: React.FC<P7> = (p) => (
  <g>
    <Figure {...p} shirt="#6B5B95" sleeve="#7E70A8" hair="#DDE2EA" hairStyle={2} />
    <Acc p={p}>
      {[-20, 20].map((ex, k) => <circle key={k} cx={ex} cy={-30} r={15} fill="none" stroke="#1A1A1A" strokeWidth={4} />)}
      <path d="M -5 -30 L 5 -30" stroke="#1A1A1A" strokeWidth={4} />
      <path d="M -36 -70 Q -20 -64 -10 -72" stroke="#B8BEC8" strokeWidth={4} fill="none" />
    </Acc>
  </g>
);
/** Sandra: Bäckerei – weiße Kappe, rosa Shirt, helle Schürze */
export const Sandra: React.FC<P7> = (p) => (
  <g>
    <Figure {...p} shirt="#D96C8A" sleeve="#E487A0" hair="#7A4A30" hairStyle={0} />
    <Acc p={p}>
      <path d="M -50 -62 Q 0 -110 50 -62 L 52 -52 L -52 -52 Z" fill="#F4EFE6" />
      <path d="M -56 140 L 56 140 L 64 330 L -64 330 Z" fill="#F4EFE6" />
      <rect x={-56} y={136} width={112} height={12} rx={6} fill="#E3D9C8" />
    </Acc>
  </g>
);
/** Neutrale Person mit Aktentasche (Hauptjob + Nebenjob, Kap. 5) */
export const Suit: React.FC<P7> = (p) => (
  <g>
    <Figure {...p} shirt="#3A4560" sleeve="#4A5675" hair="#4A3A30" hairStyle={0} />
    <Acc p={p}>
      <path d="M -8 38 L 0 66 L 8 38 Z" fill={C.blue} />
      <g transform="translate(70 230)"><rect x={-40} y={0} width={80} height={60} rx={8} fill="#5B3A29" /><rect x={-14} y={-14} width={28} height={16} rx={4} fill="none" stroke="#5B3A29" strokeWidth={5} /></g>
    </Acc>
  </g>
);
/** Stilisierte reale Person: Anzug, Brille, Namensschild – NIE realistisch (z. B. Zöllick in Kap. 5) */
export const NamedBust: React.FC<P7 & { name: string; role?: string; tagAt: number }> = (p) => (
  <g>
    <Figure {...p} shirt="#22304A" sleeve="#2C3C5C" hair="#9AA3B0" hairStyle={2} />
    <Acc p={p}>
      <path d="M -8 38 L 0 70 L 8 38 Z" fill={C.amber} />
      {[-20, 20].map((ex, k) => <rect key={k} x={ex - 15} y={-42} width={30} height={22} rx={6} fill="none" stroke="#1A1A1A" strokeWidth={4} />)}
    </Acc>
    <g transform={`translate(${p.x} ${p.y - 200 * (p.s ?? 1)})`} opacity={tw(p.f, p.tagAt, 12)}>
      <rect x={-210} y={-6} width={420} height={p.role ? 96 : 64} rx={14} fill={C.deep} />
      <text x={0} y={36} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={32} fill={C.white}>{p.name}</text>
      {p.role && <text x={0} y={74} textAnchor="middle" fontFamily={FONT} fontWeight={600} fontSize={24} fill={C.gray}>{p.role}</text>}
    </g>
  </g>
);
/** Du-Figur: neutrale Person in Rückenansicht (Zuschauer) */
export const Du: React.FC<{ f: number; x: number; y: number; s?: number; shrugAt?: number; col?: string; tag?: boolean }> = ({ f, x, y, s = 1, shrugAt, col = C.blue, tag = false }) => {
  const sh = shrugAt === undefined ? 0 : interpolate(f, [shrugAt, shrugAt + 8, shrugAt + 22, shrugAt + 32], [0, 1, 1, 0], CL);
  const br = Math.sin(f / 18) * 2;
  return (
    <g transform={`translate(${x} ${y + br * s}) scale(${s})`}>
      <path d="M -74 120 Q -76 40 0 34 Q 76 40 74 120 L 78 330 L -78 330 Z" fill={col} />
      {[-1, 1].map((d) => (
        <g key={d} transform={`translate(${d * 62} ${70 - 14 * sh}) rotate(${d * (-8 - 40 * sh)})`}>
          <rect x={-15} y={0} width={30} height={150} rx={15} fill="#6F8FE0" />
          <circle cx={0} cy={156} r={16} fill="#E8B98F" />
        </g>
      ))}
      <rect x={-14} y={6} width={28} height={30} fill="#D9A77B" />
      <circle cx={0} cy={-34} r={56} fill="#E8B98F" />
      <path d="M -57 -24 Q -62 -98 0 -96 Q 62 -98 57 -24 Q 50 10 30 18 L -30 18 Q -50 10 -57 -24 Z" fill="#3A2E4A" />
      <ellipse cx={-56} cy={-26} rx={9} ry={14} fill="#E8B98F" /><ellipse cx={56} cy={-26} rx={9} ry={14} fill="#E8B98F" />
      {tag && <g transform="translate(0 -150)"><rect x={-50} y={-34} width={100} height={52} rx={14} fill={C.deep} /><text y={4} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={32} fill={C.white}>DU</text></g>}
    </g>
  );
};
/** Mini-Piktogramm-Person (für Mengen/Statistik) */
export const Mini: React.FC<{ x: number; y: number; s?: number; col?: string; o?: number }> = ({ x, y, s = 1, col = C.blue, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle cx={0} cy={-46} r={18} fill={col} />
    <path d="M -24 -20 Q 0 -30 24 -20 L 26 30 L -26 30 Z" fill={col} />
  </g>
);
/** Schweißtropfen */
export const Sweat: React.FC<{ f: number; at: number; x: number; y: number; s?: number }> = ({ f, at, x, y, s = 1 }) => {
  if (f < at) return null;
  const t = ((f - at) % 40) / 40;
  return <g transform={`translate(${x} ${y + t * 40}) scale(${s})`} opacity={1 - t * 0.7}><path d="M 0 -26 Q 16 0 0 12 Q -16 0 0 -26 Z" fill="#86C8FF" /></g>;
};

/* ---------- Orte ---------- */
/** Kneipe bei Toni, Samstagabend: Rückwand, Fenster (Nacht), Lampen, Regal, Theke rechts */
export const Pub: React.FC<{ f: number; bar?: boolean; o?: number }> = ({ f, bar = true, o = 1 }) => (
  <svg width={1920} height={1080} style={{ position: "absolute", opacity: o }}>
    <rect x={0} y={0} width={1920} height={760} fill="#1C2A44" />
    <rect x={0} y={740} width={1920} height={340} fill="#152036" />
    <rect x={0} y={736} width={1920} height={10} fill="#2A3F63" />
    {/* Holzvertäfelung */}
    <rect x={0} y={560} width={1920} height={180} fill="#3B2A22" opacity={0.55} />
    {Array.from({ length: 16 }).map((_, i) => <rect key={i} x={i * 124} y={560} width={6} height={180} fill="#0A111D" opacity={0.25} />)}
    {/* Fenster links */}
    <g transform="translate(120 140)">
      <rect width={380} height={330} rx={14} fill="#0D1526" />
      <circle cx={300} cy={70} r={30} fill="#EEF2F7" opacity={0.7} />
      {[[40, 200, 90, 130], [150, 160, 80, 170], [250, 220, 100, 110]].map(([x, y, w, h], i) => (
        <g key={i}><rect x={x} y={y} width={w} height={h} fill="#16243B" />{[0, 1].map((k) => <rect key={k} x={x + 16 + k * 36} y={y + 24} width={22} height={26} fill={C.amber} opacity={0.6} />)}</g>
      ))}
      <rect width={380} height={330} rx={14} fill="none" stroke="#5B3A29" strokeWidth={16} />
      <line x1={190} y1={0} x2={190} y2={330} stroke="#5B3A29" strokeWidth={10} />
    </g>
    {/* Lampen */}
    {[760, 1160].map((lx, i) => (
      <g key={i}>
        <line x1={lx} y1={0} x2={lx} y2={150} stroke="#0A111D" strokeWidth={4} />
        <ellipse cx={lx} cy={300} rx={260} ry={210} fill={C.amber} opacity={0.06 + 0.01 * Math.sin(f / 20 + i)} />
        <path d={`M ${lx - 50} 190 Q ${lx} 140 ${lx + 50} 190 Z`} fill={C.amber} />
        <ellipse cx={lx} cy={192} rx={50} ry={10} fill="#FFE2A8" />
      </g>
    ))}
    {bar && (
      <g>
        {/* Regal mit neutralen Flaschen */}
        <rect x={1380} y={150} width={480} height={16} fill="#5B3A29" />
        <rect x={1380} y={290} width={480} height={16} fill="#5B3A29" />
        {Array.from({ length: 9 }).map((_, i) => <rect key={i} x={1400 + i * 52} y={i % 2 ? 80 : 70} width={26} height={i % 2 ? 70 : 80} rx={8} fill={["#2E9E6B", "#86A9FF", "#B5552F"][i % 3]} opacity={0.7} />)}
        {Array.from({ length: 7 }).map((_, i) => <rect key={i} x={1410 + i * 64} y={220} width={34} height={70} rx={10} fill={["#C9D3E2", "#E9C46A"][i % 2]} opacity={0.55} />)}
        {/* Theke */}
        <rect x={1240} y={600} width={680} height={36} rx={8} fill="#8A5A3C" />
        <rect x={1260} y={636} width={660} height={300} fill="#5B3A29" />
        {Array.from({ length: 5 }).map((_, i) => <rect key={i} x={1290 + i * 130} y={670} width={100} height={230} rx={10} fill="#4A2F22" />)}
      </g>
    )}
  </svg>
);
/** Tisch mit Stühlen */
export const Table: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-150} y={-12} width={300} height={24} rx={8} fill="#8A5A3C" />
    <rect x={-12} y={10} width={24} height={150} fill="#5B3A29" />
    <rect x={-70} y={156} width={140} height={14} rx={7} fill="#5B3A29" />
    {[-1, 1].map((d) => <g key={d} transform={`translate(${d * 200} 0)`}><rect x={-40} y={40} width={80} height={16} rx={6} fill="#6B4430" /><rect x={d * 32 - 6} y={-60} width={12} height={110} rx={6} fill="#6B4430" /><rect x={-34} y={56} width={10} height={110} fill="#6B4430" /><rect x={24} y={56} width={10} height={110} fill="#6B4430" /></g>)}
  </g>
);
/** Bäckerei-Theke mit Broten */
export const Bakery: React.FC<{ x?: number; y?: number; w?: number }> = ({ x = 960, y = 760, w = 1100 }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-w / 2} y={-560} width={w} height={80} rx={14} fill="#7A4E36" />
    <rect x={-w / 2} y={0} width={w} height={220} rx={18} fill="#7A4E36" />
    <rect x={-w / 2 + 20} y={-10} width={w - 40} height={60} rx={10} fill="#C9D3E2" opacity={0.25} />
    {Array.from({ length: 8 }).map((_, i) => <ellipse key={i} cx={-w / 2 + 90 + i * ((w - 180) / 7)} cy={-16} rx={52} ry={26} fill={i % 2 ? "#D9A15B" : "#C98A45"} />)}
    {Array.from({ length: 5 }).map((_, i) => <ellipse key={i} cx={-w / 2 + 130 + i * ((w - 260) / 4)} cy={-430} rx={60} ry={22} fill="#D9A15B" opacity={0.8} />)}
  </g>
);
/** Supermarktkasse mit Band */
export const Checkout: React.FC<{ x?: number; y?: number }> = ({ x = 960, y = 720 }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-520} y={0} width={1040} height={220} rx={16} fill="#3A4560" />
    <rect x={-500} y={-20} width={700} height={36} rx={18} fill="#1A2233" />
    {Array.from({ length: 12 }).map((_, i) => <rect key={i} x={-490 + i * 58} y={-14} width={6} height={24} fill="#5A6B88" />)}
    {[["#E9C46A", -420, 70], ["#86A9FF", -320, 50], ["#FF5A60", -230, 60], ["#3DDC97", -140, 46]].map(([c, cx, h], i) => <rect key={i} x={Number(cx)} y={-20 - Number(h)} width={64} height={Number(h)} rx={8} fill={String(c)} opacity={0.85} />)}
    <g transform="translate(330 -60)"><rect x={-90} y={-70} width={180} height={130} rx={14} fill="#1A2233" /><rect x={-74} y={-56} width={148} height={60} rx={6} fill="#2A3F63" /><text y={-14} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={32} fill={C.green}>12,49</text></g>
  </g>
);

/* ---------- Requisiten ---------- */
/** Wanduhr */
export const Clock: React.FC<{ x: number; y: number; r?: number; h: number; m: number }> = ({ x, y, r = 90, h, m }) => (
  <g transform={`translate(${x} ${y})`}>
    <circle r={r} fill="#EEF2F7" stroke="#5B3A29" strokeWidth={r * 0.12} />
    {Array.from({ length: 12 }).map((_, i) => <rect key={i} x={-3} y={-r * 0.86} width={6} height={r * 0.14} fill="#0A111D" transform={`rotate(${i * 30})`} />)}
    <rect x={-5} y={-r * 0.5} width={10} height={r * 0.55} rx={5} fill="#0A111D" transform={`rotate(${(h % 12) * 30 + m * 0.5})`} />
    <rect x={-3.5} y={-r * 0.74} width={7} height={r * 0.78} rx={4} fill="#0A111D" transform={`rotate(${m * 6})`} />
    <circle r={8} fill={C.red} />
  </g>
);
/** Papier (Lohnzettel/Formular/Vertrag): weiße Karte mit Kopf und Zeilen */
export const Paper: React.FC<{ x: number; y: number; w?: number; h?: number; title?: string; col?: string; r?: number; s?: number; children?: React.ReactNode; lines?: number }> = ({ x, y, w = 420, h = 520, title, col = C.blue, r = 0, s = 1, children, lines = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <rect x={-w / 2 + 10} y={-h / 2 + 14} width={w} height={h} rx={18} fill="#0A111D" opacity={0.35} />
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={18} fill="#F4F6FA" />
    {title && <><rect x={-w / 2} y={-h / 2} width={w} height={74} rx={18} fill={col} /><rect x={-w / 2} y={-h / 2 + 50} width={w} height={24} fill={col} />
      <text x={0} y={-h / 2 + 50} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={34} fill={C.deep}>{title}</text></>}
    {Array.from({ length: lines }).map((_, i) => <rect key={i} x={-w / 2 + 36} y={-h / 2 + 110 + i * 40} width={(w - 72) * (i % 3 === 2 ? 0.6 : 1)} height={12} rx={6} fill="#0A111D" opacity={0.18} />)}
    {children}
  </g>
);
/** Zeile auf einem Papier: Label links, Wert rechts */
export const Row: React.FC<{ w: number; y: number; label: string; val: string; col?: string; o?: number; big?: boolean }> = ({ w, y, label, val, col = C.deep, o = 1, big }) => (
  <g opacity={o}>
    <text x={-w / 2 + 36} y={y} fontFamily={FONT} fontWeight={700} fontSize={big ? 40 : 32} fill="#3A4560">{label}</text>
    <text x={w / 2 - 36} y={y} textAnchor="end" fontFamily={FONT} fontWeight={800} fontSize={big ? 52 : 36} fill={col}>{val}</text>
  </g>
);
/** Taschenrechner mit Display */
export const Calc: React.FC<{ x: number; y: number; s?: number; r?: number; disp: string; col?: string }> = ({ x, y, s = 1, r = 0, disp, col = C.amber }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <rect x={-150} y={-210} width={300} height={420} rx={30} fill="#1A2233" stroke="#5A6B88" strokeWidth={6} />
    <rect x={-120} y={-180} width={240} height={110} rx={12} fill="#0E1828" />
    <text x={104} y={-102} textAnchor="end" fontFamily={FONT} fontWeight={800} fontSize={disp.length > 6 ? 50 : 62} fill={col}>{disp}</text>
    {Array.from({ length: 12 }).map((_, i) => <rect key={i} x={-120 + (i % 3) * 84} y={-40 + Math.floor(i / 3) * 62} width={72} height={50} rx={10} fill={i === 11 ? C.amber : "#2A3F63"} />)}
  </g>
);
/** Topf mit Füllstand und Etikett */
export const Pot: React.FC<{ x: number; y: number; w?: number; h?: number; fill: number; col: string; label: string; val?: string; dashed?: boolean }> = ({ x, y, w = 200, h = 240, fill, col, label, val, dashed }) => (
  <g transform={`translate(${x} ${y})`}>
    <clipPath id={`pot${x}_${y}`}><path d={`M ${-w / 2} ${-h} L ${w / 2} ${-h} L ${w / 2 - 20} 0 L ${-w / 2 + 20} 0 Z`} /></clipPath>
    <path d={`M ${-w / 2} ${-h} L ${w / 2} ${-h} L ${w / 2 - 20} 0 L ${-w / 2 + 20} 0 Z`} fill="#0E1828" stroke="#5A6B88" strokeWidth={6} strokeDasharray={dashed ? "18 12" : undefined} />
    <rect x={-w / 2} y={-h * fill} width={w} height={h * fill + 2} fill={col} clipPath={`url(#pot${x}_${y})`} />
    <rect x={-w / 2 - 14} y={-h - 12} width={w + 28} height={22} rx={11} fill="#5A6B88" />
    {val && <Tx x={0} y={-h - 40} s={50} c={col}>{val}</Tx>}
    <Tx x={0} y={54} s={32} c={C.gray} w={700}>{label}</Tx>
  </g>
);
/** Karte Sicher/Geplant/Offen; `down` = verdeckt */
export const Card3: React.FC<{ x: number; y: number; title: string; col: string; r?: number; s?: number; down?: boolean; icon?: React.ReactNode; glow?: number }> = ({ x, y, title, col, r = 0, s = 1, down, icon, glow = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    {glow > 0 && <rect x={-170} y={-230} width={340} height={460} rx={34} fill={col} opacity={0.25 * glow} />}
    <rect x={-150} y={-210} width={300} height={420} rx={26} fill={down ? "#22304A" : C.deep} stroke={down ? "#5A6B88" : col} strokeWidth={8} />
    {down ? (
      <g>{Array.from({ length: 5 }).map((_, i) => <path key={i} d={`M -110 ${-150 + i * 70} L 110 ${-110 + i * 70}`} stroke="#2A3F63" strokeWidth={14} />)}<Tx x={0} y={40} s={130} c={C.gray}>?</Tx></g>
    ) : (
      <g><circle cy={-60} r={70} fill={col} opacity={0.18} />{icon}<Tx x={0} y={140} s={52} c={col}>{title}</Tx></g>
    )}
  </g>
);
/** Formular (z. B. „Befreiung“) mit Unterschrift; sign 0..1, cross 0..1 */
export const Form: React.FC<{ x: number; y: number; s?: number; r?: number; title: string; sign?: number; cross?: number; lock?: number }> = ({ x, y, s = 1, r = 0, title, sign = 0, cross = 0, lock = 0 }) => (
  <Paper x={x} y={y} s={s} r={r} w={380} h={480} title={title} col={C.blue} lines={5}>
    <path d="M -150 170 L 150 170" stroke="#0A111D" strokeOpacity={0.4} strokeWidth={3} />
    <path d="M -130 160 C -100 110 -80 190 -50 140 S 0 120 20 150 S 80 110 120 150" fill="none" stroke="#2E5BD8" strokeWidth={6} strokeLinecap="round" strokeDasharray={`${500 * sign} 600`} />
    {cross > 0 && <g stroke={C.red} strokeWidth={16} strokeLinecap="round"><line x1={-160} y1={-200} x2={-160 + 320 * cross} y2={-200 + 400 * cross} /><line x1={160} y1={-200} x2={160 - 320 * Math.max(0, cross * 2 - 1)} y2={-200 + 400 * Math.max(0, cross * 2 - 1)} /></g>}
    {lock > 0 && <g transform={`translate(0 20) scale(${lock})`}><rect x={-70} y={-20} width={140} height={110} rx={16} fill={C.amber} /><path d="M -44 -20 L -44 -60 Q -44 -100 0 -100 Q 44 -100 44 -60 L 44 -20" fill="none" stroke={C.amber} strokeWidth={18} /></g>}
  </Paper>
);
/** Dicker Bericht */
export const Report: React.FC<{ x: number; y: number; s?: number; r?: number; open?: number }> = ({ x, y, s = 1, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    {[3, 2, 1].map((i) => <rect key={i} x={-160 + i * 6} y={-210 + i * 8} width={320} height={420} rx={10} fill="#C9D3E2" />)}
    <rect x={-160} y={-210} width={320} height={420} rx={10} fill="#2E5BD8" />
    <rect x={-160} y={-210} width={36} height={420} fill="#1E3F9E" />
    <rect x={-90} y={-140} width={200} height={20} rx={10} fill="#EEF2F7" opacity={0.85} />
    <rect x={-90} y={-104} width={140} height={14} rx={7} fill="#EEF2F7" opacity={0.6} />
  </g>
);
/** Neutrales Amtsgebäude (Säulen, Dreiecksgiebel) – statt Logos von Bundestag/Bundesrat/Verbänden */
export const Building: React.FC<{ x: number; y: number; s?: number; dome?: boolean }> = ({ x, y, s = 1, dome }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {dome && <><path d="M -150 -300 Q 0 -460 150 -300 Z" fill="#C9D3E2" opacity={0.6} />{[-90, -30, 30, 90].map((dx) => <line key={dx} x1={dx} y1={-300} x2={dx * 0.4} y2={-410} stroke="#5A6B88" strokeWidth={6} />)}</>}
    <path d="M -340 -300 L 0 -400 L 340 -300 Z" fill="#9AA8BF" />
    <rect x={-340} y={-300} width={680} height={40} fill="#C9D3E2" />
    {Array.from({ length: 6 }).map((_, i) => <rect key={i} x={-300 + i * 116} y={-260} width={50} height={240} fill="#DDE4EE" />)}
    <rect x={-370} y={-20} width={740} height={40} fill="#9AA8BF" />
  </g>
);
/** Preisschild */
export const Tag: React.FC<{ x: number; y: number; text: string; col?: string; r?: number; s?: number }> = ({ x, y, text, col = C.amber, r = 0, s = 1 }) => {
  const w = text.length * 24 + 70;
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <path d={`M -30 -34 L ${w} -34 L ${w} 34 L -30 34 L -60 0 Z`} fill={col} />
      <circle cx={-26} cy={0} r={8} fill={C.deep} />
      <text x={w / 2 - 10} y={14} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={38} fill={C.deep}>{text}</text>
    </g>
  );
};
/** Balkenwaage; tilt in Grad (+ = rechts schwerer) */
export const Scale: React.FC<{ x: number; y: number; tilt: number; left?: React.ReactNode; right?: React.ReactNode; s?: number }> = ({ x, y, tilt, left, right, s = 1 }) => {
  const rad = (tilt * Math.PI) / 180, L = 360;
  const ly = -Math.sin(rad) * L, ry = Math.sin(rad) * L;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M -90 360 L 90 360 L 20 0 L -20 0 Z" fill="#5A6B88" />
      <g transform={`rotate(${tilt})`}><rect x={-L} y={-10} width={2 * L} height={20} rx={10} fill="#9AA8BF" /></g>
      <circle r={22} fill={C.amber} />
      {[[-L * Math.cos(rad), ly, left], [L * Math.cos(rad), ry, right]].map(([px, py, c], i) => (
        <g key={i} transform={`translate(${px} ${py})`}>
          <line x1={-90} y1={110} x2={0} y2={0} stroke="#9AA8BF" strokeWidth={4} /><line x1={90} y1={110} x2={0} y2={0} stroke="#9AA8BF" strokeWidth={4} />
          <path d="M -130 110 L 130 110 Q 100 160 0 160 Q -100 160 -130 110 Z" fill="#C9D3E2" />
          <g transform="translate(0 100)">{c as React.ReactNode}</g>
        </g>
      ))}
    </g>
  );
};
/** Sprechblase mit Text (+ optional Namensschild darunter) */
export const Bubble: React.FC<{ f: number; at: number; x: number; y: number; text: string; s?: number; col?: string; tail?: "left" | "right" }> = ({ f, at, x, y, text, s = 1, col = "#EEF2F7", tail = "left" }) => {
  if (f < at) return null;
  const p = pop(f, at, 14);
  const w = text.length * 34 + 110;
  const tx = tail === "left" ? -w / 4 : w / 4;
  return (
    <g transform={`translate(${x} ${y}) scale(${p * s})`}>
      <rect x={-w / 2} y={-70} width={w} height={140} rx={70} fill={col} />
      <path d={`M ${tx - 30} 60 L ${tx - (tail === "left" ? 70 : -70)} 140 L ${tx + 30} 60 Z`} fill={col} />
      <text y={22} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={58} fill="#0A111D">{text}</text>
    </g>
  );
};
/** Münzstapel als Kreise (amber) */
export const Coins: React.FC<{ x: number; y: number; n: number; col?: string }> = ({ x, y, n, col = C.amber }) => (
  <g transform={`translate(${x} ${y})`}>
    {Array.from({ length: n }).map((_, i) => <g key={i} transform={`translate(${(i % 2) * 4} ${-i * 16})`}><ellipse rx={56} ry={18} fill="#B07A22" /><ellipse cy={-6} rx={56} ry={18} fill={col} /></g>)}
  </g>
);
/** Treppe → Rampe (morph 0..1) mit Stufe bei `stepX` */
export const StepRamp: React.FC<{ x0: number; x1: number; base: number; stepX: number; lo: number; hi: number; morph: number; col?: string }> = ({ x0, x1, base, stepX, lo, hi, morph, col = C.amber }) => {
  const stepTop = base - hi;
  const d = `M ${x0} ${base} L ${x0} ${base - lo} L ${stepX} ${base - lo} L ${lerp(stepX, x1, morph)} ${stepTop} L ${x1} ${stepTop} L ${x1} ${base} Z`;
  return <path d={d} fill={col} opacity={0.9} />;
};
/** Kneipen-Rückwand als SVG-Gruppe (für Szenen an der Theke): Wand, Vertäfelung, Regal bei shelfX */
export const BarWall: React.FC<{ shelfX?: number; counterY?: number }> = ({ shelfX = 80, counterY = 640 }) => (
  <g>
    <rect x={0} y={0} width={1920} height={counterY} fill="#1C2A44" />
    <rect x={0} y={counterY - 200} width={1920} height={200} fill="#3B2A22" opacity={0.55} />
    <rect x={shelfX} y={170} width={420} height={14} fill="#5B3A29" />
    <rect x={shelfX} y={300} width={420} height={14} fill="#5B3A29" />
    {Array.from({ length: 8 }).map((_, i) => <rect key={i} x={shelfX + 18 + i * 50} y={i % 2 ? 100 : 90} width={26} height={i % 2 ? 70 : 80} rx={8} fill={["#2E9E6B", "#86A9FF", "#B5552F"][i % 3]} opacity={0.7} />)}
    {Array.from({ length: 6 }).map((_, i) => <rect key={i} x={shelfX + 26 + i * 64} y={230} width={34} height={70} rx={10} fill={["#C9D3E2", "#E9C46A"][i % 2]} opacity={0.55} />)}
    <rect x={0} y={counterY} width={1920} height={40} fill="#8A5A3C" />
    <rect x={0} y={counterY + 40} width={1920} height={1080 - counterY - 40} fill="#5B3A29" />
    {Array.from({ length: 8 }).map((_, i) => <rect key={i} x={40 + i * 240} y={counterY + 80} width={200} height={1080 - counterY - 140} rx={12} fill="#4A2F22" />)}
  </g>
);

/* ---------- Ergänzungen 30.10. (Kap. 3–5, wiederverwendbar in 6–7) ---------- */
/** Straßenschild „MINIJOB“ am Pfosten; tags = [Text, Startframe, Farbe?] werden schräg aufgeklebt */
export const MinijobSign: React.FC<{ f: number; x: number; y: number; s?: number; tags?: [string, number, string?][]; cross?: number }> = ({ f, x, y, s = 1, tags = [], cross = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-14} y={0} width={28} height={420} rx={8} fill="#5A6B88" />
    <rect x={-330} y={-170} width={660} height={190} rx={22} fill="#EEF2F7" stroke="#2A3F63" strokeWidth={10} />
    <text y={-40} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={120} fill="#0A111D" letterSpacing={4}>MINIJOB</text>
    {cross > 0 && <g stroke={C.red} strokeWidth={18} strokeLinecap="round" opacity={0.85}><line x1={-300} y1={-150} x2={-300 + 600 * Math.min(1, cross * 2)} y2={-150 + 160 * Math.min(1, cross * 2)} /><line x1={300} y1={-150} x2={300 - 600 * Math.max(0, cross * 2 - 1)} y2={-150 + 160 * Math.max(0, cross * 2 - 1)} /></g>}
    {tags.map(([t, at, col], i) => {
      if (f < at) return null;
      const k = interpolate(f, [at, at + 8], [0, 1], CL);
      const pos = [[-250, -175, -14], [150, -190, 10], [-60, 30, -6], [250, 20, 14]][i % 4];
      return <g key={i} opacity={k}><Tag x={pos[0]} y={pos[1]} r={pos[2]} s={lerp(1.8, 1, k)} text={t} col={col ?? C.amber} /></g>;
    })}
  </g>
);
/** Schüler/in mit Ranzen (Kind, kleiner) */
export const Kid: React.FC<P7> = (p) => (
  <g>
    <Acc p={p}>
      <rect x={-70} y={60} width={44} height={150} rx={14} fill="#E07A3F" />
      <rect x={-78} y={70} width={60} height={110} rx={16} fill="#F0A35E" />
    </Acc>
    <Figure {...p} shirt="#3DDC97" sleeve="#7FE8BC" hair="#5B3A29" hairStyle={0} />
    <Acc p={p}><path d="M -46 44 L -40 160" stroke="#B5552F" strokeWidth={12} strokeLinecap="round" /></Acc>
  </g>
);
/** Kreisdiagramm (Ring) mit Anteil p 0..1 und Wert in der Mitte */
export const Donut: React.FC<{ x: number; y: number; r?: number; p: number; col?: string; val?: string; label?: string }> = ({ x, y, r = 200, p, col = C.amber, val, label }) => {
  const c = 2 * Math.PI * r;
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r} fill="none" stroke="#22304A" strokeWidth={r * 0.32} />
      <circle r={r} fill="none" stroke={col} strokeWidth={r * 0.32} strokeDasharray={`${c * p} ${c}`} transform="rotate(-90)" />
      {val && <Tx x={0} y={r * 0.18} s={r * 0.42} c={C.white}>{val}</Tx>}
      {label && <Tx x={0} y={r + r * 0.5} s={40} c={C.gray} w={700}>{label}</Tx>}
    </g>
  );
};
/** Briefumschlag mit Blatt (open 0..1 zieht das Blatt heraus) */
export const Letter: React.FC<{ x: number; y: number; s?: number; r?: number; open?: number; title?: string }> = ({ x, y, s = 1, r = 0, open = 0, title }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <rect x={-180} y={-120 - 200 * open} width={360} height={260} rx={10} fill="#F4F6FA" />
    {title && <text x={0} y={-60 - 200 * open} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={30} fill="#0A111D">{title}</text>}
    {[0, 1, 2].map((i) => <rect key={i} x={-140} y={-30 - 200 * open + i * 34} width={i === 2 ? 160 : 280} height={10} rx={5} fill="#0A111D" opacity={0.18} />)}
    <rect x={-220} y={-10} width={440} height={260} rx={14} fill="#C9D3E2" />
    <path d="M -220 -6 L 0 130 L 220 -6" fill="none" stroke="#9AA8BF" strokeWidth={8} />
  </g>
);
/** Dunkle Hintertür, einen Spalt offen (open 0..1) */
export const Door: React.FC<{ x: number; y: number; s?: number; open?: number }> = ({ x, y, s = 1, open = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-200} y={-460} width={400} height={480} fill="#0A111D" />
    <path d={`M -200 -460 L ${-200 + 400 * (1 - 0.35 * open)} ${-460 + 30 * open} L ${-200 + 400 * (1 - 0.35 * open)} ${20 - 30 * open} L -200 20 Z`} fill="#22304A" stroke="#2A3F63" strokeWidth={8} />
    <circle cx={-200 + 400 * (1 - 0.35 * open) - 40} cy={-210} r={14} fill={C.amber} opacity={0.7} />
    <rect x={-230} y={-490} width={460} height={30} fill="#2A3F63" />
  </g>
);
