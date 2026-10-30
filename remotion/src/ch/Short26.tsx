/* Short 26 – Krankenkasse Rentner: Zusatzbeitrag steigt im Januar, Rente zeigt es erst ab März (§ 247 S. 3 SGB V); Wechsel wirksam erst 2 volle Monate später (§ 175 Abs. 4 SGB V) */
import React from "react";
import { AbsoluteFill, staticFile, useCurrentFrame } from "remotion";
import { Audio } from "@remotion/media";
import { Backdrop, Stripes } from "../kit/Stage";
import { C, CL, CLOSING, EndShare, EndYT, FONT, Grain, Pill, Arrow, Scenes, Src, SfxTrack, Sub, Txt, W, H, chunks, interpolate, lerp, mk, pop, tw } from "./shortkit";
import D from "../data/s26.json";

const { wk, ps, pe, DUR } = mk(D as any);
export const S26_DUR = DUR;
const INK = "#0A111D";
const SKIN = "#E8B98F";
const HAIR = "#D3D8E2";

/* ---------- Wandkalender ---------- */
const MONTHS = [
  { n: "Januar", d: 31, o: 4 },
  { n: "Februar", d: 28, o: 0 },
  { n: "März", d: 31, o: 0 },
  { n: "April", d: 30, o: 3 },
];
type Mark = "strike" | "check" | "none";
const CalPage: React.FC<{ i: number; w: number; h: number; mark: Mark; mk: number }> = ({ i, w, h, mark, mk: mp }) => {
  const M = MONTHS[i];
  const cw = (w - 40) / 7, top = 120;
  const rh = (h - top - 20) / 6;
  return (
    <g>
      <rect x={-w / 2} y={0} width={w} height={h} rx={14} fill={C.white} />
      <rect x={-w / 2} y={0} width={w} height={96} rx={14} fill={C.blue} />
      <rect x={-w / 2} y={60} width={w} height={36} fill={C.blue} />
      <text y={66} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={54} fill={INK}>{M.n}</text>
      {Array.from({ length: M.d }, (_, k) => {
        const p = k + M.o, cx = -w / 2 + 20 + cw * (p % 7) + cw / 2, cy = top + rh * Math.floor(p / 7) + rh / 2;
        const last = k === M.d - 1 && i === 0;
        return (
          <g key={k}>
            <text x={cx} y={cy + 10} textAnchor="middle" fontFamily={FONT} fontWeight={last ? 800 : 600} fontSize={28} fill={last ? INK : C.mute}>{k + 1}</text>
            {last && mark !== "none" && (
              <g transform={`translate(${cx} ${cy})`} opacity={mp}>
                <circle r={34} fill="none" stroke={mark === "strike" ? C.red : C.green} strokeWidth={7} />
                {mark === "strike"
                  ? <line x1={-38} y1={30} x2={38} y2={-30} stroke={C.red} strokeWidth={8} strokeLinecap="round" />
                  : <path d="M -22 4 L -6 20 L 26 -18" stroke={C.green} strokeWidth={9} fill="none" strokeLinecap="round" strokeLinejoin="round" />}
              </g>
            )}
          </g>
        );
      })}
    </g>
  );
};
/** m: Monat als Zahl (0 = Januar …), Zwischenwerte = Blättern */
const Calendar: React.FC<{ m: number; w?: number; h?: number; mark?: Mark; mp?: number }> = ({ m, w = 360, h = 420, mark = "strike", mp = 1 }) => {
  const base = Math.floor(m + 1e-6), p = m - base;
  return (
    <g>
      <rect x={-w / 2} y={0} width={w} height={h} rx={14} fill={INK} opacity={0.4} transform="translate(8 12)" />
      {p > 0.001 && <CalPage i={Math.min(3, base + 1)} w={w} h={h} mark={mark} mk={mp} />}
      <g transform={`scale(1 ${1 - p})`} opacity={1 - 0.3 * p}><CalPage i={base} w={w} h={h} mark={mark} mk={mp} /></g>
      {[-w / 4, w / 4].map((x, k) => <rect key={k} x={x - 8} y={-18} width={16} height={40} rx={8} fill={C.gray} stroke={INK} strokeWidth={4} />)}
    </g>
  );
};

/* ---------- Rentnerin (stilisiert) ---------- */
const Granny: React.FC<{ f: number; q?: number; look?: number }> = ({ f, q = 0, look = 4 }) => {
  const br = Math.sin(f / 18) * 2;
  const bt = f % 100, blink = bt > 2 && bt < 7 ? 0.15 : 1;
  return (
    <g transform={`translate(0 ${br})`}>
      <path d="M -110 -20 Q -112 -100 0 -106 Q 112 -100 110 -20 L 120 230 L -120 230 Z" fill="#8C7BC4" />
      <path d="M -26 -104 L 0 -60 L 26 -104 Z" fill={C.white} />
      <line x1={0} y1={-60} x2={0} y2={200} stroke="#6F5FA8" strokeWidth={6} />
      {[-20, 30, 80].map((y) => <circle key={y} cx={14} cy={y} r={6} fill={C.white} opacity={0.8} />)}
      <rect x={-20} y={-130} width={40} height={30} fill="#D9A77B" />
      <g transform={`rotate(${Math.sin(f / 30) * 1.5 + 4 * q})`} >
        <circle cx={0} cy={-190} r={74} fill={SKIN} />
        <circle cx={0} cy={-286} r={34} fill={HAIR} stroke="#AEB6C4" strokeWidth={4} />
        <path d="M -76 -186 Q -86 -276 0 -272 Q 86 -276 76 -186 Q 64 -238 0 -240 Q -64 -238 -76 -186 Z" fill={HAIR} />
        <path d="M -76 -186 Q -86 -150 -70 -130 Q -66 -170 -70 -190 Z" fill={HAIR} />
        <path d="M 76 -186 Q 86 -150 70 -130 Q 66 -170 70 -190 Z" fill={HAIR} />
        {[-28, 28].map((ex, k) => (
          <g key={k}>
            <g transform={`translate(${ex} -192) scale(1 ${blink})`}><circle cx={look} cy={0} r={7} fill={C.deep} /></g>
            <circle cx={ex} cy={-192} r={24} fill="#FFFFFF" fillOpacity={0.12} stroke={INK} strokeWidth={6} />
            <path d={`M ${ex - 16} ${-228 - (k ? 10 * q : 0)} Q ${ex} ${-238 - (k ? 12 * q : 0)} ${ex + 16} ${-228 - (k ? 6 * q : 0)}`} stroke="#9AA3B2" strokeWidth={6} fill="none" strokeLinecap="round" />
          </g>
        ))}
        <line x1={-4} y1={-192} x2={4} y2={-192} stroke={INK} strokeWidth={6} />
        <line x1={-52} y1={-196} x2={-72} y2={-204} stroke={INK} strokeWidth={5} />
        <line x1={52} y1={-196} x2={72} y2={-204} stroke={INK} strokeWidth={5} />
        <path d={`M -16 ${-150 + 2 * q} Q 0 ${-146 - 4 * q} 16 ${-152 - 4 * q}`} stroke="#8A4B3A" strokeWidth={5} fill="none" strokeLinecap="round" />
        <ellipse cx={-46} cy={-160} rx={11} ry={6} fill={C.red} opacity={0.2} />
        <ellipse cx={46} cy={-160} rx={11} ry={6} fill={C.red} opacity={0.2} />
      </g>
    </g>
  );
};

/** Kontoauszug Rente: 3 Zeilen; minus = 0..1 (rotes Minus in der März-Zeile) */
const Statement: React.FC<{ minus: number; rows?: number }> = ({ minus, rows = 3 }) => (
  <g>
    <rect x={-230} y={-150} width={460} height={300} rx={14} fill={INK} opacity={0.35} transform="translate(6 10)" />
    <rect x={-230} y={-150} width={460} height={300} rx={14} fill={C.white} />
    <text x={-196} y={-92} fontFamily={FONT} fontWeight={800} fontSize={40} fill={INK}>Rente</text>
    <line x1={-196} y1={-70} x2={196} y2={-70} stroke={C.gray} strokeWidth={4} strokeDasharray="10 8" />
    {Array.from({ length: rows }, (_, i) => {
      const y = -30 + i * 60, last = i === 2;
      return (
        <g key={i}>
          <rect x={-196} y={y - 12} width={150} height={20} rx={10} fill={C.gray} />
          <rect x={lerp(56, 76, last ? minus : 0)} y={y - 16} width={lerp(140, 120, last ? minus : 0)} height={28} rx={10} fill={last && minus > 0.5 ? C.red : C.mute} />
          {last && <text x={44} y={y + 22} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={90} fill={C.red} opacity={minus}>–</text>}
        </g>
      );
    })}
  </g>
);

const Table: React.FC<{ y: number }> = ({ y }) => (
  <g>
    <rect x={-40} y={y} width={1160} height={44} rx={10} fill={C.choco2} />
    <rect x={-40} y={y + 44} width={1160} height={300} fill={C.choco} />
  </g>
);

/** Küchenszene Frame 0 / Loop */
const Kitchen: React.FC<{ f: number; m: number; mark: Mark; minus: number; q: number; cy?: number; arrow?: boolean }> = ({ f, m, mark, minus, q, cy = 520, arrow }) => (
  <g>
    <rect x={0} y={480} width={1080} height={4} fill={C.line} opacity={0.6} />
    <g transform={`translate(730 ${cy})`}><Calendar m={m} mark={mark} /></g>
    <g transform="translate(320 1000) scale(1.15)"><Granny f={f} q={q} /></g>
    <Table y={1150} />
    <g transform="translate(330 1090) rotate(-4)"><Statement minus={minus} /></g>
    <circle cx={130} cy={1110} r={26} fill={SKIN} />
    <circle cx={540} cy={1080} r={26} fill={SKIN} />
    {arrow && <g transform={`translate(610 ${1035 + Math.sin(f / 6) * 4})`}><Arrow up={false} col={C.red} s={0.6} /></g>}
  </g>
);

/* ---------- Kleinteile ---------- */
const Stamp2: React.FC<{ f: number; at: number; x: number; y: number; lines: string[]; col: string; rot?: number; s?: number; w: number }> = ({ f, at, x, y, lines, col, rot = -6, s = 1, w }) => {
  if (f < at) return null;
  const k = interpolate(f, [at, at + 9], [0, 1], CL);
  const h = lines.length * 76 + 40;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s * (3 - 2 * (1 - Math.pow(1 - k, 3)))})`} opacity={k}>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={18} fill={INK} opacity={0.55} />
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={18} fill="none" stroke={col} strokeWidth={10} />
      {lines.map((t, i) => <text key={i} y={-h / 2 + 20 + 76 * i + 58} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={60} fill={col}>{t}</text>)}
    </g>
  );
};

const Building: React.FC<{ col: string; label: string; sub?: string; cross?: boolean }> = ({ col, label, sub, cross = true }) => (
  <g>
    <rect x={-120} y={-90} width={240} height={180} rx={14} fill={INK} opacity={0.35} transform="translate(6 10)" />
    <path d="M -140 -60 L 0 -140 L 140 -60 Z" fill={col} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    <rect x={-120} y={-60} width={240} height={150} fill={col} stroke={INK} strokeWidth={6} />
    {cross && <path d="M -14 -44 h 28 v 28 h 28 v 28 h -28 v 28 h -28 v -28 h -28 v -28 h 28 Z" fill={C.white} stroke={INK} strokeWidth={4} />}
    {!cross && [-70, 0, 70].map((x) => <rect key={x} x={x - 18} y={-40} width={36} height={60} rx={4} fill={C.white} opacity={0.8} />)}
    <text y={140} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={42} fill={C.white} stroke={INK} strokeWidth={4} paintOrder="stroke">{label}</text>
    {sub && <text y={186} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={34} fill={C.gray}>{sub}</text>}
  </g>
);

const Arrow2: React.FC<{ x1: number; y1: number; x2: number; y2: number; p: number; col: string }> = ({ x1, y1, x2, y2, p, col }) => {
  const x = lerp(x1, x2, p), y = lerp(y1, y2, p), a = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
  if (p <= 0) return null;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x} y2={y} stroke={col} strokeWidth={16} strokeLinecap="round" />
      <path d="M 0 -26 L 34 0 L 0 26 Z" fill={col} transform={`translate(${x} ${y}) rotate(${a})`} />
    </g>
  );
};

const Phone: React.FC<{ f: number; at: number }> = ({ f, at }) => {
  const q = tw(f, at, 12);
  return (
    <g>
      <rect x={-200} y={-330} width={400} height={660} rx={50} fill={INK} opacity={0.4} transform="translate(8 12)" />
      <rect x={-200} y={-330} width={400} height={660} rx={50} fill="#22385C" stroke={INK} strokeWidth={8} />
      <rect x={-174} y={-290} width={348} height={580} rx={30} fill={C.white} />
      <rect x={-174} y={-290} width={348} height={100} rx={30} fill={C.blue} />
      <rect x={-174} y={-220} width={348} height={30} fill={C.blue} />
      <text y={-226} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={34} fill={INK}>Deine Kasse</text>
      <text x={-140} y={-120} fontFamily={FONT} fontWeight={700} fontSize={30} fill={C.mute}>Zusatzbeitrag</text>
      <text x={-140} y={-80} fontFamily={FONT} fontWeight={700} fontSize={30} fill={C.mute}>ab Januar</text>
      <g opacity={q} transform={`translate(0 ${lerp(20, 0, q)})`}>
        <circle cx={0} cy={30} r={70} fill={C.amber} />
        <text y={62} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={96} fill={INK}>?</text>
      </g>
      {[150, 196, 242].map((y) => <rect key={y} x={-140} y={y} width={280 - (y % 3) * 40} height={20} rx={10} fill={C.gray} />)}
    </g>
  );
};
/** Hand, die das Handy hält (Finger vorn) */
const Hand: React.FC = () => (
  <g>
    <path d="M -230 360 Q -260 160 -200 60 L -150 70 L -160 380 Z" fill={SKIN} stroke={INK} strokeWidth={5} />
    {[0, 1, 2, 3].map((i) => <rect key={i} x={170} y={-40 + i * 74} width={70} height={56} rx={28} fill={SKIN} stroke={INK} strokeWidth={5} />)}
    <path d="M -200 330 Q -60 420 200 330 L 220 520 L -230 520 Z" fill={SKIN} stroke={INK} strokeWidth={5} />
    <path d="M -230 470 L 230 470 L 260 640 L -260 640 Z" fill="#8C7BC4" />
  </g>
);

const Mailbox: React.FC<{ open: number }> = ({ open }) => (
  <g>
    <rect x={-20} y={60} width={40} height={360} fill="#5A6B88" />
    <path d="M -200 -120 L 200 -120 L 200 100 L -200 100 Z" fill={C.blue} stroke={INK} strokeWidth={8} />
    <path d="M -200 -120 Q -200 -230 0 -230 Q 200 -230 200 -120 Z" fill={C.blue} stroke={INK} strokeWidth={8} />
    <rect x={-150} y={-120} width={300} height={190} rx={10} fill={INK} />
    <g transform={`translate(-150 70) rotate(${-lerp(0, 75, open)})`}>
      <rect x={0} y={-190} width={300} height={190} rx={10} fill="#6E86B8" stroke={INK} strokeWidth={6} transform="scale(1 1)" opacity={1 - 0.3 * open} />
    </g>
    <rect x={200} y={-160} width={24} height={150} fill={C.red} />
    <rect x={200} y={-160} width={80} height={50} fill={C.red} />
  </g>
);

const Tile: React.FC<{ x: number; y: number; w: number; h: number; t: string; fill?: string; fg?: string; s?: number }> = ({ x, y, w, h, t, fill = C.white, fg = INK, s = 40 }) => (
  <g>
    <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={14} fill={fill} />
    <text x={x} y={y + s * 0.36} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={s} fill={fg}>{t}</text>
  </g>
);

export const Short26: React.FC<{ end: "yt" | "tt" }> = ({ end }) => {
  const f = useCurrentFrame();
  const b1 = ps("b1") - 4, b1b = wk("b1", "um") - 4, b2 = ps("b2") - 4, b2b = wk("b2", "merkst") - 4;
  const b3 = ps("b3") - 4, b3b = wk("b3", "also") - 4, b4 = ps("b4") - 4, b4b = wk("b4", "bei") - 4, b4c = wk("b4", "die") - 4;
  const loop = wk("b4", "rentenversicherung") - 2;
  const closeAt = wk(end, "groschenfall") - 4;
  const fE = end === "yt" ? closeAt - 4 : ps(end) - 8;

  const hz = wk("hook", "=zwei");
  const scenes = [
    {
      a: 0, b: b1, render: (f: number) => {
        const m = interpolate(f, [hz - 2, hz + 8, hz + 12, hz + 22], [0, 1, 1, 2], CL);
        const minus = 1;
        return (
          <g>
            <Txt x={540} y={300} s={96} c={C.amber}>Januar teurer,</Txt>
            <Txt x={540} y={410} s={96} c={C.red}>März sichtbar</Txt>
            <Kitchen f={f} m={m} mark="strike" minus={minus} q={tw(f, hz + 18, 12)} arrow />
            <Src o={tw(f, 20, 10)}>Quelle: § 247 S. 3 SGB V; DRV</Src>
          </g>
        );
      },
    },
    {
      a: b1, b: b1b, render: (f: number) => {
        const zb = pop(f, wk("b1", "zusatz") - 2, 14);
        const ln = interpolate(f, [wk("b1", "januar"), wk("b1", "märz")], [0, 1], CL);
        const mz = tw(f, wk("b1", "märz") - 2, 10);
        const xs = [220, 540, 860];
        return (
          <g>
            <Txt x={540} y={330} s={84}>Rente zeigt's spät</Txt>
            <g transform={`translate(220 620) scale(${zb})`} opacity={Math.min(1, zb * 2)}>
              <rect x={-190} y={-70} width={380} height={140} rx={20} fill={C.amber} />
              <text y={-8} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={40} fill={INK}>Zusatzbeitrag</text>
              <text y={48} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={48} fill={INK}>↑</text>
            </g>
            <line x1={220} y1={800} x2={220 + 640 * ln} y2={800} stroke={C.gray} strokeWidth={10} strokeLinecap="round" />
            {["Jan", "Feb", "März"].map((t, i) => (
              <g key={t}>
                <circle cx={xs[i]} cy={800} r={26} fill={i === 2 ? (mz > 0.5 ? C.red : C.gray) : i === 0 ? C.amber : C.gray} stroke={INK} strokeWidth={5} />
                <text x={xs[i]} y={880} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={48} fill={C.white}>{t}</text>
                <g transform={`translate(${xs[i]} 1010)`}>
                  <rect x={-120} y={-50} width={240} height={100} rx={16} fill={i === 2 ? (mz > 0.5 ? C.red : C.blue) : C.blue} />
                  <text y={14} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={40} fill={INK}>Rente</text>
                </g>
              </g>
            ))}
            <g opacity={mz} transform={`translate(860 ${lerp(1140, 1110, mz)})`}>
              <rect x={-60} y={-16} width={120} height={32} rx={10} fill={C.red} stroke={INK} strokeWidth={5} />
            </g>
            <Txt x={540} y={1300} s={32} c={C.gray} w={600} o={tw(f, b1 + 20, 10)}>gesetzliche Rente, KVdR</Txt>
            <Src o={tw(f, b1 + 6, 10)}>Quelle: § 247 S. 3 SGB V; DRV</Src>
          </g>
        );
      },
    },
    {
      a: b1b, b: b2, render: (f: number) => {
        const sp = interpolate(f, [wk("b1", "hälfte") - 4, wk("b1", "hälfte") + 10], [0, 1], CL);
        return (
          <g>
            <Txt x={540} y={330} s={84}>Die Erhöhung</Txt>
            <g transform="translate(540 760)">
              <rect x={-420 - 20 * sp} y={-90} width={420} height={180} rx={20} fill={C.amber} />
              <rect x={20 * sp} y={-90} width={420} height={180} rx={20} fill={C.blue} opacity={lerp(0.5, 1, sp)} />
              <text x={-210 - 20 * sp} y={20} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={58} fill={INK}>½</text>
              <text x={210 + 20 * sp} y={20} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={58} fill={INK}>½</text>
            </g>
            <g opacity={sp}>
              <Txt x={310} y={960} s={60} c={C.amber}>deine Hälfte</Txt>
              <Txt x={770} y={960} s={60} c={C.white}>trägt die</Txt>
              <Txt x={770} y={1030} s={60} c={C.white}>Renten-</Txt>
              <Txt x={770} y={1100} s={60} c={C.white}>versicherung</Txt>
            </g>
            <Src o={tw(f, b1b + 6, 10)}>Quelle: § 249a SGB V</Src>
          </g>
        );
      },
    },
    {
      a: b2, b: b2b, render: (f: number) => {
        const zw = wk("b2", "zwei");
        const arc = interpolate(f, [zw - 4, zw + 14], [0, 1], CL);
        const xs = [165, 415, 665, 915];
        const nm = ["Jan", "Feb", "März", "April"];
        const path = `M 210 720 Q 540 ${720 - 260} 870 720`;
        return (
          <g>
            <Txt x={540} y={330} s={80}>Wechseln: meist</Txt>
            <Txt x={540} y={430} s={80} c={C.green} o={tw(f, wk("b2", "jederzeit") - 4, 10)}>jederzeit</Txt>
            {nm.map((t, i) => (
              <Tile key={t} x={xs[i]} y={820} w={220} h={170} t={t} s={46}
                fill={i === 0 ? C.amber : i === 3 && arc > 0.95 ? C.green : C.white} />
            ))}
            <path d={path} stroke={C.amber} strokeWidth={12} fill="none" strokeLinecap="round" strokeDasharray={900} strokeDashoffset={900 * (1 - arc)} />
            {arc > 0.95 && <path d="M 0 -24 L 34 0 L 0 24 Z" fill={C.amber} transform="translate(872 722) rotate(50)" />}
            <g opacity={arc}><Txt x={540} y={545} s={54} c={C.amber}>2 volle Monate</Txt></g>
            <Txt x={165} y={960} s={34} c={C.gray} w={700} o={tw(f, wk("b2", "wechseln") + 6, 10)}>gekündigt</Txt>
            <Txt x={915} y={960} s={34} c={C.green} w={700} o={arc}>neue Kasse</Txt>
            <Stamp2 f={f} at={wk("b2", "später") - 2} x={540} y={1130} lines={["Im Januar gekündigt", "= ab April weg"]} col={C.amber} w={860} s={0.9} rot={-5} />
            <Src o={tw(f, b2 + 6, 10)}>Quelle: § 175 Abs. 4 SGB V</Src>
          </g>
        );
      },
    },
    {
      a: b2b, b: b3, render: (f: number) => {
        const xs = [150, 284, 418, 552, 686, 820];
        const nm = ["Jan", "Feb", "März", "Apr", "Mai", "Juni"];
        const r1 = tw(f, b2b + 4, 12), r2 = tw(f, wk("b2", "märz") - 2, 12), red = tw(f, wk("b2", "zahlst") - 2, 10);
        const row = (y: number, upto: number, p: number) => (
          <g opacity={p}>
            {xs.map((x, i) => (
              <rect key={i} x={x - 62} y={y - 34} width={124} height={68} rx={12}
                fill={i <= 2 ? C.amber : i <= upto ? (red > 0.5 ? C.red : C.amber) : C.green} opacity={i > 2 && i <= upto ? lerp(0.7, 1, red) : 1} />
            ))}
            <text x={xs[upto + 1] ?? 820} y={y + 14} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={36} fill={INK}>neu</text>
          </g>
        );
        return (
          <g>
            <Txt x={540} y={330} s={80}>Erst im März</Txt>
            <Txt x={540} y={430} s={80}>gemerkt?</Txt>
            {nm.map((t, i) => <Txt key={t} x={xs[i]} y={560} s={40} c={C.gray} w={700}>{t}</Txt>)}
            <Txt x={90} y={650} s={40} c={C.green} a="start" o={r1}>Im Januar gemerkt</Txt>
            {row(710, 2, r1)}
            <Txt x={90} y={850} s={40} c={C.red} a="start" o={r2}>Im März gemerkt</Txt>
            {row(910, 4, r2)}
            <g opacity={red}>
              <path d="M 490 970 L 490 1000 L 748 1000 L 748 970" stroke={C.red} strokeWidth={8} fill="none" />
              <Txt x={560} y={1080} s={64} c={C.red}>+2 Monate drauf</Txt>
            </g>
            <Txt x={488} y={1215} s={42} c="#CFE0FF" w={700} o={tw(f, b2b + 20, 12)}>Noch keine 12 Monate in der Kasse?</Txt>
            <Txt x={488} y={1275} s={42} c="#CFE0FF" w={700} o={tw(f, b2b + 20, 12)}>Sonderkündigung bis Ende Januar</Txt>
            <Src o={tw(f, b2b + 6, 10)}>Quelle: § 175 Abs. 4 SGB V</Src>
          </g>
        );
      },
    },
    {
      a: b3, b: b3b, render: (f: number) => {
        const op = tw(f, b3 + 6, 14), sign = pop(f, wk("b3", "keine") - 2, 14), ex = pop(f, wk("b3", "pflicht") + 4, 14);
        return (
          <g>
            <Txt x={540} y={330} s={84}>Brief der Kasse?</Txt>
            <g transform="translate(540 720)"><Mailbox open={op} /></g>
            <g transform={`translate(540 1120) scale(${sign}) rotate(-3)`} opacity={Math.min(1, sign * 2)}>
              <rect x={-400} y={-70} width={800} height={140} rx={20} fill={C.blue} />
              <text y={20} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={54} fill={INK}>Brief: aktuell keine Pflicht</text>
            </g>
            <g transform={`translate(880 850) scale(${ex})`} opacity={Math.min(1, ex * 2)}>
              <circle r={64} fill={C.amber} stroke={INK} strokeWidth={6} />
              <text y={34} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={96} fill={INK}>!</text>
              <Txt x={0} y={116} s={42} c={C.amber} w={700}>nicht darauf</Txt>
              <Txt x={0} y={166} s={42} c={C.amber} w={700}>verlassen</Txt>
            </g>
            <Src o={tw(f, b3 + 6, 10)}>Quelle: § 175 SGB V (Stand 30.10.2026)</Src>
          </g>
        );
      },
    },
    {
      a: b3b, b: b4b, render: (f: number) => {
        const up = tw(f, b3b, 14);
        const jan = pop(f, wk("b4", "januar") - 2, 14);
        return (
          <g>
            <Txt x={540} y={330} s={84} c={C.green}>Selbst nachschauen</Txt>
            <g transform={`translate(500 ${lerp(960, 780, up)}) rotate(-6)`}>
              <Phone f={f} at={b3b + 10} />
              <Hand />
            </g>
            <g transform={`translate(870 560) rotate(8) scale(${0.45 * jan})`} opacity={Math.min(1, jan * 2)}>
              <Calendar m={0} mark="none" />
            </g>
          </g>
        );
      },
    },
    {
      a: b4b, b: b4c, render: (f: number) => {
        const k1 = pop(f, wk("b4", "kasse") - 4, 14), k2 = pop(f, wk("b4", "gkv") - 4, 14);
        return (
          <g>
            <Txt x={540} y={330} s={84}>Wo nachschauen?</Txt>
            {[[k1, 660, "Website deiner Kasse", "Zusatzbeitrag"], [k2, 1010, "GKV-Spitzenverband", "Krankenkassenliste"]].map(([k, y, t, s], i) => (
              <g key={i} transform={`translate(540 ${y}) scale(${k})`} opacity={Math.min(1, (k as number) * 2)}>
                <rect x={-430} y={-140} width={860} height={280} rx={24} fill={INK} opacity={0.35} transform="translate(8 12)" />
                <rect x={-430} y={-140} width={860} height={280} rx={24} fill={C.white} />
                <rect x={-430} y={-140} width={860} height={60} rx={24} fill={C.gray} />
                {[-390, -360, -330].map((x) => <circle key={x} cx={x} cy={-110} r={9} fill={C.mute} />)}
                <text y={0} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={56} fill={INK}>{t as string}</text>
                <rect x={-260} y={40} width={520} height={70} rx={35} fill={C.green} />
                <text y={88} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={38} fill={INK}>{s as string}</text>
              </g>
            ))}
            <Src o={tw(f, b4b + 6, 10)}>Quelle: GKV-Spitzenverband, Krankenkassenliste</Src>
          </g>
        );
      },
    },
    {
      a: b4c, b: end === "yt" ? loop : fE - 6, render: (f: number) => {
        const kp = interpolate(f, [wk("b4", "kündigt") - 4, wk("b4", "kündigt") + 12], [0, 1], CL);
        const mp = interpolate(f, [wk("b4", "meldet") - 4, wk("b4", "meldet") + 12], [0, 1], CL);
        return (
          <g>
            <Txt x={540} y={330} s={80}>Die neue Kasse</Txt>
            <Txt x={540} y={430} s={80} c={C.green}>macht das</Txt>
            <g transform={`translate(200 860) scale(${pop(f, wk("b4", "neue") - 2, 14)})`}><Building col={C.green} label="neue Kasse" /></g>
            <g transform="translate(700 640)" opacity={lerp(0.35, 1, kp)}><Building col={C.mute} label="alte Kasse" /></g>
            <g transform="translate(700 1090)" opacity={lerp(0.35, 1, mp)}><Building col={C.blue} label="Renten-" sub="versicherung" cross={false} /></g>
            <Arrow2 x1={350} y1={790} x2={545} y2={690} p={kp} col={C.green} />
            <Arrow2 x1={350} y1={930} x2={545} y2={1050} p={mp} col={C.green} />
            <Txt x={455} y={705} s={36} c={C.green} o={kp} a="end">kündigt</Txt>
            <Txt x={440} y={1060} s={36} c={C.green} o={mp} a="end">meldet</Txt>
            <Txt x={540} y={1330} s={34} c={C.gray} w={600} o={tw(f, b4c + 16, 10)}>neue Kasse frühestens ab 1. April</Txt>
            <Src o={tw(f, b4c + 6, 10)}>Quelle: § 175 Abs. 4, § 201 Abs. 2 SGB V</Src>
          </g>
        );
      },
    },
    ...(end === "tt" ? [] : [{
      a: loop, b: fE - 6, render: (f: number) => {
        const m = 0;
        const ck = tw(f, loop + 10, 8);
        return (
          <g>
            <Txt x={540} y={300} s={96} c={C.green}>Im Januar</Txt>
            <Txt x={540} y={410} s={96} c={C.green}>nachschauen</Txt>
            <Kitchen f={f} m={m} mark={ck > 0 ? "check" : "none"} minus={0} q={0} cy={580} />
          </g>
        );
      },
    }]),
  ];

  const hi = ["teurer", "monate", "januar", "märz", "hälfte", "jederzeit", "später", "drauf", "pflicht", "selbst", "gkv", "kündigt", "meldet"];
  const cs = chunks(D.paras as any, ["hook", "b1", "b2", "b3", "b4"], [
    ["zwei monate", "2 Monate"], ["zwei volle monate", "2 volle Monate"],
  ]);
  const subEnd = pe("b4") + 8;
  const endIn = tw(f, fE, 16);

  const sfx: [number, string, number?][] = [
    [0, "soft", 0.7], [hz + 2, "paper", 0.5], [hz + 20, "ding", 0.4],
    [b1 - 4, "whoosh", 0.7], [wk("b1", "zusatz") - 2, "soft", 0.5], [wk("b1", "märz") - 2, "ding", 0.4],
    [b1b - 2, "whoosh", 0.6],
    [b2 - 4, "whoosh", 0.7], [wk("b2", "zwei") - 4, "marimba", 0.4], [wk("b2", "später") - 2, "stamp", 0.5],
    [b2b - 2, "whoosh", 0.6], [wk("b2", "zahlst") - 2, "coins", 0.4],
    [b3 - 4, "whoosh", 0.7], [wk("b3", "keine") - 2, "soft", 0.5],
    [b3b - 2, "whoosh", 0.6],
    [b4b - 2, "whoosh", 0.6], [wk("b4", "gkv") - 4, "ding", 0.4],
    [b4c - 2, "whoosh", 0.6], [wk("b4", "kündigt") - 2, "paper", 0.5],
    ...(end === "yt" ? [[loop, "paper", 0.5], [loop + 10, "marimba", 0.4]] as [number, string, number][] : []),
    [fE - 6, "whoosh", 0.8], [closeAt, "coins", 0.4],
  ];

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Backdrop />
      <Stripes w={W} h={H} />
      <svg width={W} height={H} style={{ position: "absolute" }}>
        <ellipse cx={540} cy={900} rx={560} ry={520} fill="#4A6AAA" opacity={0.12} />
        <Scenes f={f} list={scenes} />
        {f >= fE && (
          <g opacity={endIn} transform={`translate(0 ${lerp(60, 0, endIn)})`}>
            {end === "yt"
              ? <EndYT f={f} at={fE} line={CLOSING} />
              : (
                <g>
                  <EndShare f={f} at={fE} who={["in Rente ist und", "Kontoauszüge nur"]} closeAt={closeAt} />
                  <Txt x={540} y={960} s={74} c={C.amber} o={tw(f, fE + 12, 12)}>überfliegt.</Txt>
                </g>
              )}
          </g>
        )}
      </svg>
      <Sub f={f} cs={cs} end={subEnd} hi={hi} />
      <Grain f={f} />
      <Audio src={staticFile(`audio/s26_${end}.wav`)} />
      <SfxTrack list={sfx} />
    </AbsoluteFill>
  );
};
export const Short26YT: React.FC = () => <Short26 end="yt" />;
export const Short26TT: React.FC = () => <Short26 end="tt" />;
