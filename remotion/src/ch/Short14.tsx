/* Short 14 – Lebensmittelpreise Sept. 2026: Butter −29,5 %, trotzdem gleicht sich der Einkaufswagen aus (+0,4 %) */
import React from "react";
import { AbsoluteFill, staticFile, useCurrentFrame } from "remotion";
import { Audio } from "@remotion/media";
import { noise2D } from "@remotion/noise";
import { Backdrop, Stripes } from "../kit/Stage";
import { Arrow, C, CL, EndTT, EndYT, FONT, Grain, H, IO, OUT, Pill, Scenes, Src, SfxTrack, Sub, Txt, W, chunks, interpolate, lerp, mk, pop, tw } from "./shortkit";
import D from "../data/s14.json";

const { wk, ps, pe, DUR } = mk(D as any);
export const S14_DUR = DUR;
const BUT = "#F4D35E", BUT2 = "#E2B93B", STEEL = "#9AA8BF", INK = "#0A111D";
const SRC364 = "Quelle: Destatis, PM 364 vom 13.10.2026";

/* ---------- Requisiten (generisch, ohne Marken) ---------- */
/** Butterstück, Ursprung = Unterkante Mitte */
const Butter: React.FC<{ s?: number; glow?: number }> = ({ s = 1, glow = 0 }) => (
  <g transform={`scale(${s})`}>
    {glow > 0 && <rect x={-130} y={-120} width={260} height={140} rx={30} fill={C.green} opacity={0.35 * glow} filter="url(#gl14)" />}
    <rect x={-104} y={-92} width={208} height={92} rx={12} fill={BUT2} />
    <path d="M-104 -60 L-104 -80 Q-104 -92 -92 -92 L92 -92 Q104 -92 104 -80 L104 -60 Z" fill={BUT} />
    <rect x={-104} y={-92} width={208} height={92} rx={12} fill="none" stroke={INK} strokeOpacity={0.25} strokeWidth={4} />
    <rect x={-70} y={-52} width={140} height={34} rx={8} fill="#FFF3C4" />
    <text y={-26} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={26} fill="#7A5A10">BUTTER</text>
  </g>
);
const Egg: React.FC<{ x: number; y: number; r?: number }> = ({ x, y, r = 34 }) => (
  <g transform={`translate(${x} ${y})`}>
    <ellipse rx={r} ry={r * 1.22} fill="#F6EBD9" />
    <ellipse cx={-r * 0.3} cy={-r * 0.45} rx={r * 0.25} ry={r * 0.35} fill="#FFFFFF" opacity={0.6} />
  </g>
);
/** offener Eierkarton, Ursprung Mitte unten */
const EggBox: React.FC<{ s?: number }> = ({ s = 1 }) => (
  <g transform={`scale(${s})`}>
    <path d="M-250 -150 L250 -150 L270 -260 L-270 -260 Z" fill="#B8AA90" />
    <rect x={-260} y={-120} width={520} height={120} rx={18} fill="#D9CBB0" />
    {Array.from({ length: 5 }).map((_, i) => <Egg key={`a${i}`} x={-200 + i * 100} y={-150} />)}
    {Array.from({ length: 5 }).map((_, i) => <Egg key={`b${i}`} x={-200 + i * 100} y={-110} r={36} />)}
    <rect x={-260} y={-90} width={520} height={90} rx={18} fill="#CDBD9F" />
    {Array.from({ length: 5 }).map((_, i) => <path key={i} d={`M${-240 + i * 100} -90 Q${-200 + i * 100} -60 ${-160 + i * 100} -90`} stroke="#B8AA90" strokeWidth={5} fill="none" />)}
  </g>
);
const Carrot: React.FC<{ x: number; y: number; r?: number }> = ({ x, y, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r})`}>
    <path d="M-10 -150 Q-24 -190 -6 -210 M0 -150 Q4 -200 22 -214 M8 -150 Q26 -180 44 -186" stroke={C.green} strokeWidth={12} fill="none" strokeLinecap="round" />
    <path d="M-26 -150 L26 -150 L4 20 Q0 28 -4 20 Z" fill="#F08A2C" />
  </g>
);
const Broccoli: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-16} y={-60} width={32} height={80} rx={10} fill="#5FA35A" />
    {[[-40, -90], [0, -115], [40, -90], [-22, -70], [22, -70]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={40} fill={i % 2 ? "#2F8F4E" : "#3BA55C"} />)}
  </g>
);
const Pepper: React.FC<{ x: number; y: number; col?: string }> = ({ x, y, col = C.red }) => (
  <g transform={`translate(${x} ${y})`}>
    <path d="M-50 -90 Q-70 -10 -30 20 Q0 34 30 20 Q70 -10 50 -90 Q0 -110 -50 -90 Z" fill={col} />
    <rect x={-8} y={-124} width={16} height={36} rx={6} fill="#3BA55C" />
    <ellipse cx={-22} cy={-50} rx={10} ry={26} fill="#FFFFFF" opacity={0.3} />
  </g>
);
/** Gemüsekiste, Ursprung Mitte unten */
const Crate: React.FC = () => (
  <g>
    <Carrot x={-170} y={-140} r={-12} /><Carrot x={-110} y={-130} r={6} />
    <Broccoli x={150} y={-150} />
    <Pepper x={-10} y={-150} /><Pepper x={70} y={-140} col="#F2C230" />
    <rect x={-280} y={-180} width={560} height={180} rx={16} fill="#A9683A" />
    {[0, 1, 2].map((i) => <rect key={i} x={-280} y={-170 + i * 58} width={560} height={40} rx={8} fill="#C27F48" />)}
    <rect x={-280} y={-180} width={30} height={180} fill="#8C5530" /><rect x={250} y={-180} width={30} height={180} fill="#8C5530" />
  </g>
);
const Potato: React.FC<{ x: number; y: number; r?: number; rot?: number }> = ({ x, y, r = 40, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <ellipse rx={r * 1.25} ry={r} fill="#C9A061" />
    <ellipse cx={-r * 0.3} cy={-r * 0.35} rx={r * 0.5} ry={r * 0.3} fill="#E0BF85" opacity={0.6} />
    <circle cx={r * 0.5} cy={r * 0.1} r={r * 0.09} fill="#8A6A35" /><circle cx={-r * 0.2} cy={r * 0.4} r={r * 0.07} fill="#8A6A35" />
  </g>
);
/** Kartoffelhaufen, Ursprung Mitte unten */
const Heap: React.FC<{ rows?: number; r?: number }> = ({ rows = 5, r = 34 }) => (
  <g>
    {Array.from({ length: rows }).flatMap((_, row) => {
      const n = rows - row;
      return Array.from({ length: n }).map((__, i) => (
        <Potato key={`${row}-${i}`} x={(i - (n - 1) / 2) * r * 2.3} y={-r - row * r * 1.55} r={r} rot={((row * 7 + i * 13) % 5 - 2) * 8} />
      ));
    })}
  </g>
);
const Sack: React.FC = () => (
  <g>
    <path d="M-170 0 Q-210 -150 -150 -300 L150 -300 Q210 -150 170 0 Z" fill="#A9875A" />
    <path d="M-150 -300 Q0 -340 150 -300 L130 -360 Q0 -390 -130 -360 Z" fill="#8E7048" />
    <rect x={-140} y={-320} width={280} height={22} rx={10} fill="#6B5330" />
    {[-90, -30, 30, 90].map((x) => <line key={x} x1={x} y1={-280} x2={x * 1.15} y2={-20} stroke="#8E7048" strokeWidth={4} opacity={0.6} />)}
    <Potato x={-80} y={-350} r={36} rot={-10} /><Potato x={20} y={-365} r={40} rot={8} /><Potato x={100} y={-345} r={32} />
    <Potato x={-210} y={-30} r={36} rot={12} /><Potato x={220} y={-28} r={34} rot={-6} />
  </g>
);
const Bottle: React.FC<{ s?: number }> = ({ s = 1 }) => (
  <g transform={`scale(${s})`}>
    <path d="M-60 0 L-60 -200 Q-60 -240 -30 -260 L-30 -300 L30 -300 L30 -260 Q60 -240 60 -200 L60 0 Z" fill="#F3F6FA" />
    <rect x={-34} y={-330} width={68} height={36} rx={8} fill={C.blue} />
    <rect x={-60} y={-160} width={120} height={80} fill={C.blue} opacity={0.85} />
    <text y={-108} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={28} fill={INK}>MILCH</text>
    <rect x={-46} y={-230} width={14} height={200} rx={7} fill="#FFFFFF" opacity={0.7} />
  </g>
);
const Cheese: React.FC<{ s?: number }> = ({ s = 1 }) => (
  <g transform={`scale(${s})`}>
    <path d="M-120 0 L120 0 L120 -110 L-120 -40 Z" fill="#F2C230" />
    <path d="M-120 -40 L120 -110 L80 -130 Z" fill="#FFDA5E" />
    {[[-60, -30, 14], [20, -50, 18], [80, -30, 12], [50, -85, 10]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} fill="#D9A21E" />)}
  </g>
);
const Fruit: React.FC<{ s?: number }> = ({ s = 1 }) => (
  <g transform={`scale(${s})`}>
    <circle cx={-60} cy={-80} r={52} fill={C.red} /><rect x={-64} y={-140} width={8} height={24} rx={4} fill="#6B4A2A" />
    <circle cx={50} cy={-84} r={50} fill="#F39A2C" />
    <circle cx={-4} cy={-120} r={46} fill="#7BC85A" />
    <path d="M-140 -60 Q0 30 140 -60 Z" fill="#5A6B88" />
    <path d="M-140 -60 L140 -60" stroke="#86A9FF" strokeWidth={8} strokeLinecap="round" />
  </g>
);
/** Einkaufswagen ohne Marke, Ursprung = Boden Mitte */
const Cart: React.FC<{ s?: number; full?: boolean }> = ({ s = 1, full = true }) => (
  <g transform={`scale(${s})`}>
    {full && (
      <g>
        <Carrot x={-110} y={-240} r={-20} />
        <g transform="translate(-20 -250) scale(0.6)"><Bottle /></g>
        <g transform="translate(60 -255) scale(0.45)"><Broccoli x={0} y={0} /></g>
        <Potato x={110} y={-275} r={30} rot={10} /><Potato x={-50} y={-270} r={28} />
        <g transform="translate(40 -250) scale(0.32)"><EggBox /></g>
      </g>
    )}
    <path d="M-180 -270 L180 -270 L140 -90 L-140 -90 Z" fill="#2A3F63" opacity={0.75} />
    {[-120, -60, 0, 60, 120].map((x) => <line key={x} x1={x} y1={-270} x2={x * 0.78} y2={-90} stroke={STEEL} strokeWidth={5} />)}
    <line x1={-160} y1={-180} x2={160} y2={-180} stroke={STEEL} strokeWidth={5} />
    <path d="M-180 -270 L180 -270 L140 -90 L-140 -90 Z" fill="none" stroke={C.gray} strokeWidth={10} strokeLinejoin="round" />
    <path d="M180 -270 L240 -320 L290 -320" stroke={C.gray} strokeWidth={12} fill="none" strokeLinecap="round" />
    <rect x={262} y={-334} width={50} height={28} rx={10} fill={C.red} />
    <path d="M-140 -90 L-120 -44 L150 -44 M140 -90 L130 -44" stroke={C.gray} strokeWidth={10} fill="none" strokeLinecap="round" />
    <circle cx={-100} cy={-20} r={20} fill="#3A4560" stroke={C.gray} strokeWidth={6} />
    <circle cx={120} cy={-20} r={20} fill="#3A4560" stroke={C.gray} strokeWidth={6} />
  </g>
);
/** Balkenwaage; tilt in Grad, > 0 → links hoch, rechts tief. Ursprung = Drehpunkt */
const Balance: React.FC<{ tilt: number; left: React.ReactNode; right: React.ReactNode }> = ({ tilt, left, right }) => {
  const a = (tilt * Math.PI) / 180, L = 300;
  const ends: [number, number, React.ReactNode][] = [[-L * Math.cos(a), -L * Math.sin(a), left], [L * Math.cos(a), L * Math.sin(a), right]];
  return (
    <g>
      <path d="M-170 560 L170 560 L70 490 L-70 490 Z" fill="#3A5A9A" />
      <rect x={-18} y={0} width={36} height={500} rx={12} fill="#4E70B4" />
      <g transform={`rotate(${tilt})`}><rect x={-330} y={-14} width={660} height={28} rx={14} fill={C.blue} /></g>
      <circle r={34} fill={C.amber} />
      {ends.map(([x, y, n], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <path d="M0 0 L-150 240 M0 0 L150 240" stroke={STEEL} strokeWidth={5} />
          <circle r={10} fill={C.gray} />
          <g transform="translate(0 236)">{n}</g>
          <path d="M-175 236 Q0 300 175 236 Z" fill={C.gray} />
        </g>
      ))}
    </g>
  );
};
/** Preis-Schild mit Prozent */
const Tag: React.FC<{ text: string; col: string; w?: number; s?: number; fg?: string }> = ({ text, col, w = 300, s = 62, fg = INK }) => (
  <g>
    <rect x={-w / 2 + 6} y={-50} width={w} height={108} rx={22} fill={INK} opacity={0.4} />
    <rect x={-w / 2} y={-58} width={w} height={108} rx={22} fill={col} />
    <circle cx={-w / 2 + 26} cy={-4} r={9} fill={INK} opacity={0.45} />
    <text x={12} y={-4 + s * 0.36} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={s} fill={fg}>{text}</text>
  </g>
);
const Sun: React.FC<{ f: number }> = ({ f }) => (
  <g transform={`rotate(${f * 0.6})`}>
    {Array.from({ length: 12 }).map((_, i) => <rect key={i} x={-10} y={-150} width={20} height={44} rx={10} fill={C.amber} transform={`rotate(${i * 30})`} />)}
    <circle r={90} fill={C.amber} /><circle r={66} fill="#FFD27A" />
  </g>
);
const Thermo: React.FC<{ t: number }> = ({ t }) => (
  <g>
    <rect x={-30} y={-260} width={60} height={290} rx={30} fill="#EEF2F7" />
    <rect x={-14} y={-240 + (1 - t) * 200} width={28} height={30 + 200 * t + 10} rx={14} fill={C.red} />
    <circle cy={40} r={50} fill="#EEF2F7" /><circle cy={40} r={36} fill={C.red} />
    {[0, 1, 2, 3].map((i) => <rect key={i} x={30} y={-220 + i * 50} width={24} height={6} rx={3} fill="#EEF2F7" />)}
  </g>
);
const Tank: React.FC = () => (
  <g>
    <rect x={-150} y={-30} width={20} height={110} fill="#5A6B88" /><rect x={130} y={-30} width={20} height={110} fill="#5A6B88" />
    <rect x={-220} y={-200} width={440} height={190} rx={95} fill="#C9D3E2" />
    <rect x={-220} y={-160} width={440} height={26} fill="#FFFFFF" opacity={0.35} />
    <rect x={-40} y={-232} width={80} height={36} rx={8} fill="#9AA8BF" />
    <text y={-88} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={44} fill={INK}>MILCH</text>
  </g>
);
const Barn: React.FC = () => (
  <g>
    <path d="M-200 -220 L0 -360 L200 -220 Z" fill="#7A3A36" />
    <rect x={-180} y={-220} width={360} height={220} fill="#A14A44" />
    <rect x={-60} y={-140} width={120} height={140} fill="#5C2A27" />
    <path d="M-60 -140 L60 0 M60 -140 L-60 0" stroke="#EEF2F7" strokeWidth={8} />
    <rect x={-40} y={-290} width={80} height={50} fill="#EEF2F7" opacity={0.8} />
  </g>
);
/** Kühlregal 3×3, Fach (1,1) = Butter. glow 0..1 */
const Fridge: React.FC<{ glow: number; dim: number }> = ({ glow, dim }) => {
  const items: React.ReactNode[] = [
    <g transform="translate(0 0) scale(0.5)"><Bottle /></g>, <g transform="scale(0.7)"><Cheese /></g>, <g transform="translate(0 0) scale(0.5)"><Bottle /></g>,
    <g transform="scale(0.65)"><Cheese /></g>, <Butter s={0.95} glow={glow} />, <g transform="scale(0.5)"><Bottle /></g>,
    <g transform="scale(0.6)"><Fruit /></g>, <g transform="scale(0.7)"><Cheese /></g>, <g transform="scale(0.6)"><Fruit /></g>,
  ];
  return (
    <g>
      <rect x={-420} y={-450} width={840} height={900} rx={30} fill="#1E3150" stroke={STEEL} strokeWidth={10} />
      <rect x={-420} y={-450} width={840} height={60} rx={20} fill="#2A3F63" />
      <rect x={-300} y={-438} width={600} height={36} rx={10} fill={C.blue} opacity={0.35} />
      {items.map((n, i) => {
        const c = i % 3, r = Math.floor(i / 3), x = -270 + c * 270, y = -130 + r * 270, isB = i === 4;
        return (
          <g key={i}>
            {isB && <rect x={x - 130} y={y - 220} width={260} height={250} rx={18} fill={C.green} opacity={0.25 * glow} />}
            {isB && <rect x={x - 130} y={y - 220} width={260} height={250} rx={18} fill="none" stroke={C.green} strokeWidth={8} opacity={glow} />}
            <g transform={`translate(${x} ${y})`} opacity={isB ? 1 : 1 - dim * 0.6}>{n}</g>
          </g>
        );
      })}
      {[0, 1, 2].map((r) => <rect key={r} x={-410} y={-120 + r * 270} width={820} height={16} rx={6} fill={STEEL} />)}
      <rect x={-420} y={-450} width={840} height={900} rx={30} fill="#FFFFFF" opacity={0.04} />
    </g>
  );
};

export const Short14: React.FC<{ end: "yt" | "tt" }> = ({ end }) => {
  const f = useCurrentFrame();
  const TOT = DUR[end];
  const b1 = ps("b1"), b1b = wk("b1", "eier") - 6, b1c = wk("b1", "frisches") - 6, b1d = wk("b1", "sagt") - 6;
  const b2 = ps("b2") - 4, b2b = wk("b2", "=die") - 4, b2c = wk("b2", "wegen") - 6;
  const b3 = ps("b3") - 4, b3b = wk("b3", "gleichzeitig") - 6, b3c = wk("b3", "knapp") - 6;
  const b4 = ps("b4") - 4, b4b = wk("b4", "=der") - 4, b4c = wk("b4", "=nur", 1) - 4, fE = ps(end) - 8;

  const scenes = [
    {
      // Titelbild: Waage Butter vs. voller Wagen
      a: 0, b: b1, render: (f: number) => {
        const drop = interpolate(f, [wk("hook", "neunundzwanzig") - 2, wk("hook", "neunundzwanzig") + 22], [0, 1], { ...CL, easing: OUT });
        const back = interpolate(f, [wk("hook", "aber") - 4, wk("hook", "aber") + 30], [0, 1], { ...CL, easing: OUT });
        const wob = Math.sin((f - wk("hook", "aber")) / 4) * 3 * Math.exp(-Math.max(0, f - wk("hook", "aber")) / 14) * back;
        const tilt = lerp(2, 13, drop) * (1 - back) + 1.5 * back + wob;
        const tagY = lerp(-150, -170, drop);
        const q = pop(f, wk("hook", "aber") + 2, 14);
        return (
          <g>
            <Txt x={540} y={330} s={94}>Butter billiger –</Txt>
            <Txt x={540} y={450} s={94} c={C.amber}>Einkauf nicht?</Txt>
            <g transform="translate(540 700)">
              <Balance tilt={tilt}
                left={<g><Butter s={1.1} /><g transform={`translate(0 ${tagY}) scale(${lerp(0.9, 1, drop)})`}><Tag text="−29,5 %" col={C.green} w={290} /></g></g>}
                right={<g transform="translate(-40 0)"><Cart s={0.8} /></g>} />
            </g>
            <g transform={`translate(540 640) scale(${q})`} opacity={Math.min(1, q * 2)}>
              <circle r={70} fill={C.deep} stroke={C.amber} strokeWidth={8} />
              <text y={34} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={100} fill={C.amber}>?</text>
            </g>
            <Src o={tw(f, 8, 12)}>{SRC364}</Src>
            <Src o={tw(f, 8, 12)} y={245}>Sept. 2026 ggü. Sept. 2025</Src>
          </g>
        );
      },
    },
    {
      a: b1, b: b1b, kind: "zoom" as const, render: (f: number) => (
        <g>
          <Txt x={540} y={360} s={90}>Der Rest im Wagen</Txt>
          <g transform="translate(540 1250)"><Cart s={1.8} /></g>
        </g>
      ),
    },
    {
      a: b1b, b: b1c, render: (f: number) => {
        const t = pop(f, wk("b1", "fünfzehn") - 2, 14);
        return (
          <g>
            <Txt x={540} y={360} s={110}>Eier</Txt>
            <g transform="translate(540 1080) scale(1.3)"><EggBox /></g>
            <g transform={`translate(540 1250) scale(${t})`} opacity={Math.min(1, t * 2)}><Tag text="+15,2 %" col={C.amber} w={400} s={80} /></g>
            <g transform={`translate(860 640) scale(${t})`}><Arrow up col={C.amber} s={0.9} /></g>
            <Src o={tw(f, b1b + 6, 10)}>{SRC364}</Src>
          </g>
        );
      },
    },
    {
      a: b1c, b: b1d, render: (f: number) => {
        const t = pop(f, wk("b1", "zwölf") - 2, 14);
        return (
          <g>
            <Txt x={540} y={350} s={100}>Frisches Gemüse</Txt>
            <Txt x={540} y={425} s={48} c={C.gray} w={700}>ohne Kartoffeln</Txt>
            <g transform="translate(540 1050) scale(1.35)"><Crate /></g>
            <g transform={`translate(540 1230) scale(${t})`} opacity={Math.min(1, t * 2)}><Tag text="+12,0 %" col={C.amber} w={400} s={80} /></g>
            <g transform={`translate(880 620) scale(${t})`}><Arrow up col={C.amber} s={0.9} /></g>
            <Src o={tw(f, b1c + 6, 10)}>Quelle: Destatis, PM 364; Top-20-Tabelle</Src>
          </g>
        );
      },
    },
    {
      a: b1d, b: b2, render: (f: number) => {
        const g = interpolate(f, [b1d + 4, b1d + 26], [0, 1], { ...CL, easing: OUT });
        const z = 800, k = 12;
        const bars: [string, number, string, string][] = [["Butter", -29.5, "−29,5 %", C.green], ["Eier", 15.2, "+15,2 %", C.amber], ["Gemüse", 12.0, "+12,0 %", C.amber]];
        return (
          <g>
            <Txt x={540} y={350} s={84}>Statistisches</Txt>
            <Txt x={540} y={445} s={84}>Bundesamt</Txt>
            {bars.map(([l, v, t, c], i) => {
              const x = 250 + i * 290, h = Math.abs(v) * k * g, up = v > 0;
              return (
                <g key={i}>
                  <rect x={x - 100} y={up ? z - h : z} width={200} height={h} rx={14} fill={c} />
                  <Txt x={x} y={up ? z - h - 30 : z + h + 70} s={54} o={g}>{t}</Txt>
                  <Txt x={x} y={up ? z + 70 : z - 30} s={46} c={C.gray} w={700}>{l}</Txt>
                </g>
              );
            })}
            <line x1={110} y1={z} x2={970} y2={z} stroke="#86A9FF" strokeWidth={6} strokeLinecap="round" />
            <Txt x={540} y={1360} s={38} c={C.gray} w={600}>Sept. 2026 ggü. Vorjahr</Txt>
            <Src o={tw(f, b1d + 6, 10)}>{SRC364}</Src>
          </g>
        );
      },
    },
    {
      a: b2, b: b2b, render: (f: number) => {
        const t = pop(f, wk("b2", "elf") - 2, 14);
        return (
          <g>
            <Txt x={540} y={360} s={110}>Kartoffeln</Txt>
            <g transform="translate(540 1180) scale(1.25)"><Sack /></g>
            <g transform={`translate(540 1260) scale(${t})`} opacity={Math.min(1, t * 2)}><Tag text="+11,3 %" col={C.amber} w={400} s={80} /></g>
            <g transform={`translate(880 640) scale(${t})`}><Arrow up col={C.amber} s={0.9} /></g>
            <Src o={tw(f, b2 + 6, 10)}>Quelle: Destatis, PM N070 vom 15.10.2026</Src>
          </g>
        );
      },
    },
    {
      a: b2b, b: b2c, render: (f: number) => {
        const sh = interpolate(f, [wk("b2", "viertel") - 8, wk("b2", "viertel") + 14], [1, 0.74], { ...CL, easing: IO });
        const t = pop(f, wk("b2", "viertel") - 2, 14);
        return (
          <g>
            <Txt x={540} y={360} s={96}>Kartoffelernte</Txt>
            <g transform="translate(290 1080)"><Heap rows={5} r={32} /></g>
            <g transform={`translate(790 1080) scale(${sh})`}><Heap rows={5} r={32} /></g>
            <rect x={80} y={1080} width={920} height={14} rx={7} fill="#5A6B88" />
            <Txt x={290} y={1160} s={52} c={C.gray} w={700}>2025</Txt>
            <Txt x={290} y={1225} s={50}>13,9 Mio. t</Txt>
            <Txt x={790} y={1160} s={52} c={C.gray} w={700}>2026</Txt>
            <Txt x={790} y={1225} s={50}>10,4 Mio. t</Txt>
            <g transform={`translate(540 560) scale(${t})`} opacity={Math.min(1, t * 2)}><Pill w={520} text="Ernte −24,8 %" col={C.red} fg={C.white} s={60} h={110} /></g>
            <Txt x={540} y={1330} s={36} c={C.gray} w={600}>2026 vorläufig</Txt>
            <Src o={tw(f, b2b + 6, 10)}>Quelle: Destatis, PM N070 vom 15.10.2026</Src>
          </g>
        );
      },
    },
    {
      a: b2c, b: b3, render: (f: number) => {
        const th = interpolate(f, [wk("b2", "hitze") - 6, wk("b2", "hitze") + 20], [0.2, 0.95], { ...CL, easing: OUT });
        const p = pop(f, wk("b2", "trockenheit") - 2, 14);
        return (
          <g>
            <Txt x={540} y={360} s={84} c={C.amber}>Hitze & Trockenheit</Txt>
            <Txt x={540} y={430} s={44} c={C.gray} w={700}>laut Destatis vermutlich</Txt>
            <g transform="translate(300 680)"><Sun f={f} /></g>
            <g transform="translate(800 760)"><Thermo t={th} /></g>
            <path d="M80 1000 L1000 1000 L1000 1260 L80 1260 Z" fill="#8C6A44" />
            <g opacity={p} stroke="#5C4128" strokeWidth={6} fill="none" strokeLinecap="round">
              <path d="M180 1030 L240 1110 L210 1180 L280 1240" /><path d="M420 1020 L470 1090 L540 1120 L560 1230" />
              <path d="M700 1040 L660 1120 L740 1170 L720 1250" /><path d="M880 1020 L930 1110 L900 1200" />
              <path d="M240 1110 L330 1140 M540 1120 L640 1100 M740 1170 L850 1160" />
            </g>
            <g transform="translate(540 1010) scale(0.7)"><Heap rows={3} r={32} /></g>
            <Src o={tw(f, b2c + 6, 10)}>Quelle: Destatis, PM N070 („dürften“)</Src>
          </g>
        );
      },
    },
    {
      a: b3, b: b3b, render: (f: number) => {
        const t1 = pop(f, wk("b3", "milch") - 2, 14), t2 = pop(f, wk("b3", "käse") - 2, 14), t3 = pop(f, wk("b3", "obst") - 2, 14);
        const it: [React.ReactNode, string, string, number][] = [
          [<Bottle s={0.9} />, "−8,2 %", "Vollmilch", t1], [<Cheese s={1} />, "−6,1 %", "Käse, Quark", t2], [<Fruit s={1} />, "−4,9 %", "frisches Obst", t3],
        ];
        return (
          <g>
            <Txt x={540} y={360} s={110} c={C.green}>Billiger</Txt>
            {it.map(([n, v, l, t], i) => {
              const x = 200 + i * 340;
              return (
                <g key={i}>
                  <g transform={`translate(${x} 960)`} opacity={lerp(0.35, 1, t)}>{n}</g>
                  <Txt x={x} y={1050} s={42} c={C.gray} w={700}>{l}</Txt>
                  <g transform={`translate(${x} 1170) scale(${t}) rotate(${lerp(-20, -6, t)})`} opacity={Math.min(1, t * 2)}><Tag text={v} col={C.green} w={280} s={58} /></g>
                </g>
              );
            })}
            <rect x={60} y={960} width={960} height={14} rx={7} fill="#5A6B88" />
            <Src o={tw(f, b3 + 6, 10)}>Quelle: Destatis, Top-20-Tabelle; PM 364</Src>
          </g>
        );
      },
    },
    {
      a: b3b, b: b3c, render: (f: number) => (
        <g>
          <Txt x={540} y={360} s={100} c={C.blue}>Gleichzeitig</Txt>
          <Txt x={540} y={440} s={50} c={C.gray} w={700}>beim Landwirt</Txt>
          <g transform="translate(300 1100)"><Barn /></g>
          <g transform="translate(720 1110) scale(0.95)"><Tank /></g>
          <rect x={60} y={1190} width={960} height={14} rx={7} fill="#3A5A3A" />
        </g>
      ),
    },
    {
      a: b3c, b: b4, render: (f: number) => {
        const p = pop(f, wk("b3", "vierundzwanzig") - 2, 14);
        return (
          <g>
            <Txt x={540} y={360} s={84} c={C.blue}>Erzeugerpreis Milch</Txt>
            <Txt x={540} y={440} s={50} c={C.gray} w={700}>August 2026 ggü. Vorjahr</Txt>
            <g transform="translate(540 1030) scale(0.8)"><Tank /></g>
            <g transform={`translate(540 760) scale(${p})`} opacity={Math.min(1, p * 2)}>
              <rect x={-310} y={-110} width={620} height={220} rx={30} fill={C.deep} stroke={C.blue} strokeWidth={8} />
              <text y={42} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={130} fill={C.blue}>−23,9 %</text>
            </g>
            <Txt x={540} y={1240} s={40} c={C.gray} w={600}>Preis ab Hof, nicht im Laden</Txt>
            <Src o={tw(f, b3c + 6, 10)}>Quelle: Destatis, PM 367 vom 14.10.2026</Src>
          </g>
        );
      },
    },
    {
      a: b4, b: b4b, render: (f: number) => {
        const p = pop(f, wk("b4", "null") - 2, 14);
        const sink = interpolate(f, [wk("b4", "nahrungsmittel") - 4, wk("b4", "nahrungsmittel") + 16], [-60, 0], { ...CL, easing: OUT });
        return (
          <g>
            <Txt x={540} y={350} s={96}>Nahrungsmittel</Txt>
            <Txt x={540} y={450} s={96}>insgesamt</Txt>
            <g transform={`translate(520 ${1000 + sink})`}><Cart s={1.0} /></g>
            <rect x={240} y={1000} width={600} height={60} rx={20} fill="#4E70B4" />
            <rect x={300} y={1075} width={480} height={170} rx={24} fill={C.deep} stroke={C.blue} strokeWidth={6} />
            <text x={540} y={1197} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={110} fill={C.amber} opacity={p}>+0,4 %</text>
            <Txt x={540} y={1320} s={40} c={C.gray} w={600}>Sept. 2026 ggü. Vorjahr</Txt>
            <Src o={tw(f, b4 + 6, 10)}>{SRC364}</Src>
            <Src o={tw(f, b4 + 6, 10)} y={245}>Inflation gesamt: +3,3 %</Src>
          </g>
        );
      },
    },
    {
      a: b4b, b: b4c, render: (f: number) => {
        const k = f - b4b;
        const tilt = 1.5 + Math.sin(k / 5) * 6 * Math.exp(-k / 14);
        const p = pop(f, wk("b4", "gleicht") - 2, 14);
        return (
          <g>
            <Txt x={540} y={360} s={96}>Gleicht sich aus</Txt>
            <g transform="translate(540 700)">
              <Balance tilt={tilt} left={<Butter s={1.1} />} right={<g transform="translate(-40 0)"><Cart s={0.8} /></g>} />
            </g>
            <g transform={`translate(540 560) scale(${p})`} opacity={Math.min(1, p * 2)}><Pill w={380} text="+0,4 %" col={C.amber} s={64} h={110} /></g>
          </g>
        );
      },
    },
    {
      a: b4c, b: fE - 10, render: (f: number) => {
        const g = tw(f, wk("b4", "kühlregal") - 4, 14);
        const pulse = 0.8 + 0.2 * Math.sin(f / 5);
        return (
          <g>
            <Txt x={540} y={340} s={88}>Ein Fach</Txt>
            <Txt x={540} y={440} s={88} c={C.green}>fällt aus der Reihe</Txt>
            <g transform="translate(540 960) scale(0.92)"><Fridge glow={g * pulse} dim={g} /></g>
          </g>
        );
      },
    },
  ];

  const hi = ["butter", "dein", "einkauf", "nicht", "eier", "gemüse", "kartoffeln", "viertel", "kleiner", "hitze", "trockenheit", "milch", "käse", "obst", "gleicht", "kühlregal", "teurer"];
  const cs = chunks(D.paras as any, ["hook", "b1", "b2", "b3", "b4", ...(end === "tt" ? ["tt"] : [])], [
    ["neunundzwanzig komma fünf prozent", "29,5 %"], ["fünfzehn komma zwei prozent", "15,2 %"], ["zwölf", "12"],
    ["elf komma drei prozent", "11,3 %"], ["vierundzwanzig prozent", "24 %"], ["null komma vier prozent", "0,4 %"],
  ]);
  const subEnd = end === "tt" ? TOT - 6 : pe("b4") + 8;
  const endIn = tw(f, fE, 16);

  const sfx: [number, string, number?][] = [
    [2, "soft", 0.6], [wk("hook", "neunundzwanzig") - 2, "ding", 0.5], [wk("hook", "aber") - 2, "marimba", 0.5],
    [b1 - 4, "whoosh", 0.7], [b1b - 2, "soft", 0.6], [wk("b1", "fünfzehn") - 2, "ding", 0.5],
    [b1c - 4, "whoosh", 0.6], [wk("b1", "zwölf") - 2, "ding", 0.5], [b1d - 4, "paper", 0.6],
    [b2 - 4, "whoosh", 0.7], [wk("b2", "elf") - 2, "ding", 0.5], [b2b - 4, "whoosh", 0.6], [wk("b2", "viertel") - 2, "stamp", 0.5],
    [b2c - 4, "soft", 0.7],
    [b3 - 4, "whoosh", 0.7], [wk("b3", "milch") - 2, "soft", 0.6], [wk("b3", "käse") - 2, "soft", 0.6], [wk("b3", "obst") - 2, "soft", 0.6],
    [b3b - 4, "whoosh", 0.6], [wk("b3", "vierundzwanzig") - 2, "paper", 0.5],
    [b4 - 4, "whoosh", 0.7], [wk("b4", "null") - 2, "coins", 0.6], [b4b - 4, "marimba", 0.5], [b4c - 4, "whoosh", 0.6], [wk("b4", "kühlregal") - 4, "ding", 0.5],
    [fE - 6, "whoosh", 0.8],
  ];

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Backdrop />
      <Stripes w={W} h={H} />
      <svg width={W} height={H} style={{ position: "absolute" }}>
        <defs><filter id="gl14" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="16" /></filter></defs>
        <ellipse cx={540} cy={900} rx={560} ry={520} fill="#4A6AAA" opacity={0.12} />
        <Scenes f={f} list={scenes} />
        {f >= fE && (
          <g opacity={endIn} transform={`translate(0 ${lerp(60, 0, endIn)})`}>
            {end === "yt"
              ? <EndYT f={f} at={fE} line="Wir rechnen nach." />
              : <EndTT f={f} at={fE} q={["Was ist bei dir", "teurer geworden?"]} opts={[["Eier", C.amber], ["Gemüse", C.green], ["Kartoffeln", C.blue]]} />}
          </g>
        )}
      </svg>
      <Sub f={f} cs={cs} end={subEnd} hi={hi} />
      <Grain f={f} />
      <Audio src={staticFile(`audio/s14_${end}.wav`)} />
      <SfxTrack list={sfx} />
    </AbsoluteFill>
  );
};
export const Short14YT: React.FC = () => <Short14 end="yt" />;
export const Short14TT: React.FC = () => <Short14 end="tt" />;
