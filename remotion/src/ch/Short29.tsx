/* Short 29 – Zwangsverrentung: Jobcenter kann Grundsicherungsgeld-Beziehende auffordern, vorzeitige Altersrente zu beantragen
   (§ 12a SGB II, Unbilligkeitsverordnung); Pflicht ausgesetzt bis 31.12.2026, Verlängerung nicht beschlossen (Stand 04.11.2026);
   Abschlag 0,3 % je Monat, höchstens 14,4 % (§ 77 SGB VI, 48 Monate, Jahrgang ab 1964). Ohne Signet (Groschen noch nicht abgenommen). */
import React from "react";
import { AbsoluteFill, staticFile, useCurrentFrame } from "remotion";
import { Audio } from "@remotion/media";
import { Backdrop, Stripes } from "../kit/Stage";
import { C, CL, CLOSING, EndShare, EndYT, FONT, Grain, Scenes, Src, SfxTrack, Sub, Txt, W, H, chunks, interpolate, lerp, mk, pop, tw } from "./shortkit";
import D from "../data/s29.json";

const { wk, ps, pe, DUR } = mk(D as any);
export const S29_DUR = DUR;
const INK = "#0A111D";
const SKIN = "#D8B391";
const GRAY_HAIR = "#D3D8E2";
const SRC = "§ 12a SGB II, § 77 SGB VI, UnbilligkeitsV · Stand 04.11.2026";
const DISC = "Keine Rechtsberatung";

/* ---------- Bausteine ---------- */

/** stilisierte Person, Ursprung = Füße; glasses = Brille, lean = Neigung in Grad (um die Füße) */
const Person: React.FC<{ shirt: string; f: number; s?: number; q?: number; hair?: string; glasses?: boolean; lean?: number; tie?: boolean }> = ({ shirt, f, s = 1, q = 0, hair = "#3B2A22", glasses, lean = 0, tie }) => {
  const br = Math.sin(f / 18) * 2;
  const bt = (f + 37) % 110, blink = bt < 5 ? 0.15 : 1;
  return (
    <g transform={`scale(${s}) rotate(${lean}) translate(0 ${br})`}>
      <ellipse cx={0} cy={4 - br} rx={80} ry={14} fill={INK} opacity={0.4} />
      <rect x={-46} y={-170} width={38} height={172} rx={14} fill="#22385C" />
      <rect x={8} y={-170} width={38} height={172} rx={14} fill="#22385C" />
      <path d="M -72 -160 L -72 -268 Q -72 -312 -28 -312 L 28 -312 Q 72 -312 72 -268 L 72 -160 Z" fill={shirt} stroke={INK} strokeWidth={5} />
      {tie && <path d="M 0 -306 L -12 -280 L 0 -200 L 12 -280 Z" fill={C.blue} stroke={INK} strokeWidth={3} />}
      <rect x={-14} y={-334} width={28} height={30} fill={SKIN} />
      <g transform={`rotate(${Math.sin(f / 30) * 1.5 + 3 * q} 0 -334)`}>
        <circle cx={0} cy={-378} r={52} fill={SKIN} stroke={INK} strokeWidth={5} />
        <path d="M -52 -390 Q -48 -440 0 -440 Q 50 -440 54 -392 Q 30 -410 -52 -390 Z" fill={hair} />
        <g transform={`translate(18 -382) scale(1 ${blink})`}><circle r={5} fill={INK} /></g>
        <g transform={`translate(-14 -382) scale(1 ${blink})`}><circle r={5} fill={INK} /></g>
        {glasses && (
          <g fill="none" stroke={INK} strokeWidth={4}>
            <circle cx={18} cy={-382} r={15} />
            <circle cx={-14} cy={-382} r={15} />
            <path d="M 3 -384 L -1 -384 M -29 -384 L -50 -390" />
          </g>
        )}
        {/* Brauen: q = besorgt */}
        <path d={`M 8 ${-404 - 4 * q} L 30 ${-406 + 3 * q}`} stroke={INK} strokeWidth={4} strokeLinecap="round" />
        <path d={`M -24 ${-406 + 3 * q} L -4 ${-404 - 4 * q}`} stroke={INK} strokeWidth={4} strokeLinecap="round" />
        <path d={q > 0.5 ? "M -6 -348 Q 8 -358 22 -348" : "M -4 -352 Q 8 -344 22 -352"} stroke={INK} strokeWidth={4} fill="none" strokeLinecap="round" />
      </g>
      <path d="M -60 -290 L -84 -190" stroke={shirt} strokeWidth={30} strokeLinecap="round" />
      <circle cx={-84} cy={-186} r={15} fill={SKIN} />
      <path d="M 56 -290 L 96 -250" stroke={shirt} strokeWidth={30} strokeLinecap="round" />
      <circle cx={100} cy={-246} r={15} fill={SKIN} />
    </g>
  );
};

/** Stempel (Ursprung Mitte) */
const Stamp3: React.FC<{ k: number; text: string; col: string; w?: number; rot?: number; s?: number }> = ({ k, text, col, w = 300, rot = -8, s = 54 }) => {
  if (k <= 0) return null;
  return (
    <g transform={`rotate(${rot}) scale(${3 - 2 * (1 - Math.pow(1 - k, 3))})`} opacity={k}>
      <rect x={-w / 2} y={-s} width={w} height={s * 2} rx={16} fill={INK} opacity={0.6} />
      <rect x={-w / 2} y={-s} width={w} height={s * 2} rx={16} fill="none" stroke={col} strokeWidth={9} />
      <text y={s * 0.36} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={s} fill={col}>{text}</text>
    </g>
  );
};

/** neutrales Amtsgebäude ohne Logo */
const Office: React.FC<{ col?: string; label: string }> = ({ col = "#5C7299", label }) => (
  <g>
    <rect x={-150} y={-200} width={300} height={400} fill={INK} opacity={0.35} transform="translate(8 12)" />
    <rect x={-150} y={-200} width={300} height={400} rx={6} fill={col} stroke={INK} strokeWidth={6} />
    <rect x={-170} y={-224} width={340} height={30} rx={6} fill="#3C4F72" stroke={INK} strokeWidth={5} />
    {[0, 1, 2, 3].map((r) => [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={-118 + c * 86} y={-170 + r * 72} width={64} height={48} rx={4} fill="#F0C987" opacity={(r + c) % 3 === 0 ? 0.85 : 0.45} />))}
    <rect x={-44} y={118} width={88} height={82} rx={4} fill="#22385C" stroke={INK} strokeWidth={5} />
    <text y={262} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={48} fill={C.white} stroke={INK} strokeWidth={5} paintOrder="stroke">{label}</text>
  </g>
);

const Check: React.FC<{ s?: number; col?: string }> = ({ s = 1, col = C.green }) => (
  <g transform={`scale(${s})`}>
    <circle r={60} fill={col} stroke={INK} strokeWidth={6} />
    <path d="M -28 2 L -8 24 L 30 -22" stroke={INK} strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </g>
);

/** Rentenbescheid-Blatt mit großem roten Abschlag (Ursprung Mitte) */
const Bescheid: React.FC<{ w?: number; h?: number }> = ({ w = 360, h = 400 }) => (
  <g>
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={14} fill={INK} opacity={0.35} transform="translate(8 12)" />
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={14} fill={C.white} />
    <text x={-w / 2 + 24} y={-h / 2 + 52} fontFamily={FONT} fontWeight={800} fontSize={32} fill={INK}>Rentenbescheid</text>
    {[0, 1].map((i) => <rect key={i} x={-w / 2 + 24} y={-h / 2 + 84 + i * 34} width={w * (0.72 - i * 0.2)} height={14} rx={7} fill="#D5DCE7" />)}
    <rect x={-w / 2 + 16} y={-30} width={w - 32} height={120} rx={14} fill={C.red} opacity={0.12} />
    <text y={62} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={84} fill={C.red} letterSpacing={-2}>−14,4 %</text>
    {[0, 1].map((i) => <rect key={i} x={-w / 2 + 24} y={h / 2 - 76 + i * 32} width={w * (0.6 - i * 0.18)} height={14} rx={7} fill="#D5DCE7" />)}
  </g>
);

/** große Pfeil-Hand (zeigt nach rechts, Ursprung = Handfläche) */
const PushHand: React.FC<{ len?: number }> = ({ len = 420 }) => (
  <g>
    {/* Schaft mit Pfeil-Optik */}
    <rect x={-len} y={-48} width={len - 30} height={96} rx={20} fill={C.red} stroke={INK} strokeWidth={6} />
    {[0.25, 0.5, 0.75].map((t, i) => <path key={i} d={`M ${-len * t - 20} -30 L ${-len * t + 10} 0 L ${-len * t - 20} 30`} stroke={INK} strokeWidth={8} fill="none" strokeLinecap="round" opacity={0.45} />)}
    {/* Handfläche, Finger nach oben */}
    <rect x={-50} y={-95} width={90} height={190} rx={40} fill="#E8C3A0" stroke={INK} strokeWidth={6} />
    {[-70, -78, -74, -62].map((y, i) => <rect key={i} x={-46 + i * 21} y={-95 + y} width={20} height={-y + 20} rx={10} fill="#E8C3A0" stroke={INK} strokeWidth={5} />)}
    <rect x={-80} y={-10} width={50} height={30} rx={15} fill="#E8C3A0" stroke={INK} strokeWidth={5} transform="rotate(-30 -55 5)" />
  </g>
);

/** Wegweiser „RENTE“ (Ursprung = Fuß des Pfostens) */
const RenteSign: React.FC<{ text?: string }> = ({ text = "RENTE" }) => (
  <g>
    <rect x={-12} y={-430} width={24} height={430} fill="#5A6B88" stroke={INK} strokeWidth={5} />
    <path d="M -150 -560 L 120 -560 L 170 -500 L 120 -440 L -150 -440 Z" fill={INK} opacity={0.35} transform="translate(8 12)" />
    <path d="M -150 -560 L 120 -560 L 170 -500 L 120 -440 L -150 -440 Z" fill={C.amber} stroke={INK} strokeWidth={6} />
    <text x={-5} y={-480} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={60} fill={INK}>{text}</text>
  </g>
);

/** Frame 0 / Loop: Du-Figur wird von der Pfeil-Hand zum Schild RENTE geschoben, stemmt sich dagegen */
const Hero: React.FC<{ f: number }> = ({ f }) => {
  const push = Math.sin(f / 7) * 8;
  return (
    <g>
      <line x1={-40} y1={1330} x2={1120} y2={1330} stroke={C.line} strokeWidth={6} />
      <g transform="translate(860 1330)"><RenteSign /></g>
      <g transform="translate(240 780) rotate(-6)"><Bescheid /></g>
      {/* Figur lehnt sich gegen die Hand (nach hinten = links) */}
      <g transform="translate(620 1330) scale(1.22)"><Person shirt="#3E6E8E" f={f} q={1} hair={GRAY_HAIR} glasses lean={-9} /></g>
      {/* Bremsspuren an den Füßen */}
      <path d="M 700 1322 L 790 1322 M 712 1308 L 770 1308" stroke={C.gray} strokeWidth={6} strokeLinecap="round" opacity={0.5} />
      <g transform={`translate(${470 + push} 1085)`}><PushHand /></g>
    </g>
  );
};

/** Hero mit Überschrift (Frame 0 und Loop) */
const HeroHead: React.FC<{ f: number }> = ({ f }) => (
  <g>
    <Txt x={540} y={272} s={60} c={C.amber}>Grundsicherungsgeld?</Txt>
    <Txt x={540} y={385} s={104}>Mit 63 raus –</Txt>
    <Txt x={540} y={500} s={112} c={C.red}>Pflicht?</Txt>
    <Hero f={f} />
  </g>
);

/** Geburtstagstorte mit Kerzen „63“ (Ursprung = Teller-Mitte) */
const Cake: React.FC<{ f: number; lit: number }> = ({ f, lit }) => {
  const fl = 1 + Math.sin(f / 3) * 0.08;
  return (
    <g>
      <ellipse cx={0} cy={10} rx={330} ry={44} fill={C.gray} stroke={INK} strokeWidth={6} />
      <rect x={-260} y={-230} width={520} height={230} rx={24} fill={C.choco2} stroke={INK} strokeWidth={6} />
      <rect x={-260} y={-120} width={520} height={20} fill={C.choco} />
      <path d="M -260 -200 L -260 -230 L 260 -230 L 260 -200 Q 230 -160 200 -200 Q 170 -150 130 -200 Q 100 -165 60 -200 Q 30 -150 -10 -200 Q -40 -160 -80 -200 Q -110 -150 -150 -200 Q -180 -165 -220 -200 Q -240 -170 -260 -200 Z" fill={C.white} stroke={INK} strokeWidth={5} />
      {/* Kerzen-Ziffern */}
      <text y={-250} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={300} fill={C.amber} stroke={INK} strokeWidth={10} paintOrder="stroke" letterSpacing={10}>63</text>
      {[-95, 95].map((x, i) => (
        <g key={i} transform={`translate(${x} -545) scale(${lit * fl})`} opacity={lit}>
          <path d="M 0 -50 Q 26 -10 0 16 Q -26 -10 0 -50 Z" fill={C.amber} stroke={INK} strokeWidth={4} />
          <path d="M 0 -26 Q 10 -6 0 8 Q -10 -6 0 -26 Z" fill={C.white} />
        </g>
      ))}
    </g>
  );
};

/** Brief: zu (Umschlag mit Absender) oder offen mit markierter Zeile; hl 0..1 */
const Envelope: React.FC = () => (
  <g>
    <rect x={-220} y={-140} width={440} height={280} rx={16} fill={INK} opacity={0.35} transform="translate(8 12)" />
    <rect x={-220} y={-140} width={440} height={280} rx={16} fill={C.white} stroke={INK} strokeWidth={5} />
    <path d="M -220 -130 L 0 20 L 220 -130" stroke="#B9C3D3" strokeWidth={6} fill="none" />
    <rect x={-190} y={60} width={200} height={44} rx={8} fill="#E3E8F0" />
    <text x={-178} y={92} fontFamily={FONT} fontWeight={800} fontSize={28} fill={INK}>Jobcenter</text>
    <rect x={130} y={-115} width={66} height={78} rx={6} fill={C.blue} opacity={0.7} />
  </g>
);
const Letter: React.FC<{ hl?: number; w?: number; h?: number; sign?: boolean; text?: string }> = ({ hl = 0, w = 640, h = 760, sign, text = "Rente früher beantragen" }) => (
  <g>
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={16} fill={INK} opacity={0.35} transform="translate(10 14)" />
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={16} fill={C.white} />
    <text x={-w / 2 + 36} y={-h / 2 + 68} fontFamily={FONT} fontWeight={800} fontSize={42} fill={INK}>Jobcenter</text>
    <text x={w / 2 - 36} y={-h / 2 + 68} textAnchor="end" fontFamily={FONT} fontWeight={700} fontSize={26} fill={C.mute}>Aufforderung</text>
    {[0, 1, 2].map((i) => <rect key={i} x={-w / 2 + 36} y={-h / 2 + 120 + i * 40} width={(w - 72) * (0.95 - i * 0.12)} height={16} rx={8} fill="#D5DCE7" />)}
    {/* markierte Zeile */}
    <rect x={-w / 2 + 24} y={-h / 2 + 252} width={(w - 48) * hl} height={74} rx={10} fill={C.amber} opacity={0.9} />
    <text x={-w / 2 + 40} y={-h / 2 + 302} fontFamily={FONT} fontWeight={800} fontSize={w * 0.06} fill={INK}>{text}</text>
    {[0, 1, 2].map((i) => <rect key={i} x={-w / 2 + 36} y={-h / 2 + 370 + i * 40} width={(w - 72) * (0.85 - i * 0.15)} height={16} rx={8} fill="#D5DCE7" />)}
    {sign && (
      <g>
        <line x1={-w / 2 + 36} y1={h / 2 - 70} x2={w / 2 - 160} y2={h / 2 - 70} stroke={INK} strokeWidth={4} />
        <text x={-w / 2 + 36} y={h / 2 - 34} fontFamily={FONT} fontWeight={700} fontSize={24} fill={C.mute}>Unterschrift</text>
      </g>
    )}
  </g>
);

/** Küchentisch (Ursprung = Mitte der Tischplatte oben) */
const Table: React.FC<{ w?: number }> = ({ w = 760 }) => (
  <g>
    <rect x={-w / 2 + 40} y={30} width={26} height={150} fill="#6E4A33" stroke={INK} strokeWidth={4} />
    <rect x={w / 2 - 66} y={30} width={26} height={150} fill="#6E4A33" stroke={INK} strokeWidth={4} />
    <rect x={-w / 2} y={0} width={w} height={36} rx={10} fill="#9A6B48" stroke={INK} strokeWidth={5} />
  </g>
);
const Mug: React.FC = () => (
  <g>
    <rect x={-34} y={-80} width={68} height={80} rx={10} fill={C.blue} stroke={INK} strokeWidth={5} />
    <path d="M 34 -60 Q 62 -60 62 -40 Q 62 -20 34 -20" stroke={INK} strokeWidth={6} fill="none" />
  </g>
);

/** Pause-Symbol (Minze) */
const PauseBadge: React.FC<{ r?: number }> = ({ r = 150 }) => (
  <g>
    <circle r={r} fill={INK} opacity={0.35} transform="translate(8 12)" />
    <circle r={r} fill={C.green} stroke={INK} strokeWidth={8} />
    <rect x={-r * 0.36} y={-r * 0.45} width={r * 0.24} height={r * 0.9} rx={r * 0.06} fill={INK} />
    <rect x={r * 0.12} y={-r * 0.45} width={r * 0.24} height={r * 0.9} rx={r * 0.06} fill={INK} />
  </g>
);

/** Monatsblatt Dezember 2026 (Mo zuerst, 1. = Dienstag), Ursprung oben Mitte */
const DezPage: React.FC<{ w?: number; h?: number; due?: number; head?: string; name?: string; days?: number; off?: number }> = ({ w = 560, h = 560, due = 0, head = C.amber, name = "Dezember", days = 31, off = 1 }) => {
  const top = 140, rh = (h - top - 20) / 6, cw = (w - 40) / 7;
  return (
    <g>
      <rect x={-w / 2} y={0} width={w} height={h} rx={18} fill={INK} opacity={0.4} transform="translate(10 14)" />
      <rect x={-w / 2} y={0} width={w} height={h} rx={18} fill={C.white} />
      <rect x={-w / 2} y={0} width={w} height={96} rx={18} fill={head} />
      <rect x={-w / 2} y={56} width={w} height={40} fill={head} />
      <text y={68} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={54} fill={INK}>{name}</text>
      {["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"].map((d, i) => (
        <text key={d} x={-w / 2 + 20 + cw * (i + 0.5)} y={128} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={22} fill={C.mute}>{d}</text>
      ))}
      {Array.from({ length: days }, (_, k) => {
        const p = k + off, cx = -w / 2 + 20 + cw * (p % 7) + cw / 2, cy = top + rh * Math.floor(p / 7) + rh / 2;
        const last = k === days - 1 && due > 0;
        return (
          <g key={k}>
            {last && <circle cx={cx} cy={cy} r={34} fill={C.amber} opacity={due} stroke={INK} strokeWidth={4} />}
            <text x={cx} y={cy + 10} textAnchor="middle" fontFamily={FONT} fontWeight={last ? 800 : 600} fontSize={30} fill={last ? INK : C.mute}>{k + 1}</text>
          </g>
        );
      })}
      {[-w / 4, w / 4].map((x, k) => <rect key={k} x={x - 10} y={-22} width={20} height={48} rx={10} fill={C.gray} stroke={INK} strokeWidth={4} />)}
    </g>
  );
};

/** Sanduhr, sand = Anteil oben 0..1 (Ursprung Mitte) */
const Hourglass: React.FC<{ sand: number; f: number }> = ({ sand, f }) => {
  const top = Math.max(0.04, sand);
  return (
    <g>
      <rect x={-110} y={-200} width={220} height={26} rx={10} fill="#9A6B48" stroke={INK} strokeWidth={5} />
      <rect x={-110} y={174} width={220} height={26} rx={10} fill="#9A6B48" stroke={INK} strokeWidth={5} />
      <path d="M -85 -174 L 85 -174 L 10 0 L 85 174 L -85 174 L -10 0 Z" fill="#CFE0FF" fillOpacity={0.25} stroke={C.gray} strokeWidth={6} />
      {/* Sand oben (Rest) */}
      <path d={`M ${-10 - 75 * top} ${-174 * top} L ${10 + 75 * top} ${-174 * top} L 10 0 L -10 0 Z`} fill={C.amber} transform="translate(0 -4)" />
      {/* Sand unten */}
      <path d={`M -85 174 L 85 174 L ${85 - 60 * (1 - top)} ${174 - 140 * (1 - top)} L ${-85 + 60 * (1 - top)} ${174 - 140 * (1 - top)} Z`} fill={C.amber} />
      <line x1={0} y1={0} x2={0} y2={170 - 140 * (1 - top)} stroke={C.amber} strokeWidth={5} strokeDasharray="10 8" strokeDashoffset={-f * 2} />
    </g>
  );
};

/** Tür (Ursprung = Mitte unten), op = 0..1 geöffnet */
const Door: React.FC<{ op: number; col?: string }> = ({ op, col = C.green }) => (
  <g>
    <rect x={-150} y={-460} width={300} height={460} rx={10} fill="#F4F7FB" opacity={0.9} />
    <rect x={-166} y={-476} width={332} height={476} rx={14} fill="none" stroke={INK} strokeWidth={10} />
    <g transform={`translate(-150 0) scale(${lerp(1, 0.25, op)} 1)`}>
      <rect x={0} y={-460} width={300} height={460} rx={8} fill={col} stroke={INK} strokeWidth={6} />
      <rect x={40} y={-410} width={220} height={150} rx={8} fill="none" stroke={INK} strokeWidth={5} opacity={0.4} />
      <rect x={40} y={-220} width={220} height={170} rx={8} fill="none" stroke={INK} strokeWidth={5} opacity={0.4} />
      <circle cx={262} cy={-230} r={14} fill={INK} />
    </g>
  </g>
);

/** Hand mit Stift (Spitze am Ursprung) */
const PenHand: React.FC = () => (
  <g>
    <path d="M 0 0 L 14 -40 L 190 -260 L 220 -236 L 44 -16 Z" fill={C.blue} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    <path d="M 0 0 L 14 -40 L 30 -28 Z" fill={INK} />
    <ellipse cx={170} cy={-200} rx={70} ry={52} fill={SKIN} stroke={INK} strokeWidth={6} transform="rotate(-38 170 -200)" />
    <rect x={190} y={-290} width={160} height={110} rx={40} fill="#3E6E8E" stroke={INK} strokeWidth={6} transform="rotate(-38 190 -290)" />
  </g>
);

/* ---------- Komposition ---------- */
export const Short29: React.FC<{ end: "yt" | "tt" }> = ({ end }) => {
  const f = useCurrentFrame();
  const h2 = wk("hook", "ob") - 4;
  const b1 = ps("b1") - 4, b1b = wk("b1", "kann") - 4;
  const b2 = ps("b2") - 4, b2b = wk("b2", "aber") - 4, b2c = wk("b2", "eine") - 4;
  const b3 = wk("b3", "früher") - 6, b3b = wk("b3", "weniger") - 4;
  const b4 = ps("b4") - 4, b4b = wk("b4", "kommt") - 4, b4c = wk("b4", "lass") - 8, loop = wk("b4", "bevor") - 4;
  const closeAt = wk(end, "groschenfall") - 4;
  const fE = end === "yt" ? closeAt - 4 : ps(end) - 8;

  const scenes = [
    /* Frame 0: Schlüsselbild */
    { a: 0, b: h2, render: (f: number) => <HeroHead f={f} /> },
    /* hook Rest: Torte 63 */
    {
      a: h2, b: b1, kind: "zoom" as const, render: (f: number) => (
        <g>
          <Txt x={540} y={340} s={100}>Ob du willst</Txt>
          <Txt x={540} y={455} s={100} c={C.red}>oder nicht?</Txt>
          <g transform="translate(540 1270)"><Cake f={f} lit={tw(f, h2 + 4, 10)} /></g>
        </g>
      ),
    },
    /* b1a: Brief landet auf dem Küchentisch */
    {
      a: b1, b: b1b, render: (f: number) => {
        const land = interpolate(f, [b1 + 6, wk("b1", "anspruch")], [0, 1], { ...CL, easing: (t) => 1 - Math.pow(1 - t, 3) });
        return (
          <g>
            <Txt x={540} y={340} s={76} c={C.amber}>Grundsicherungsgeld</Txt>
            <Txt x={540} y={445} s={76}>+ Anspruch auf Rente?</Txt>
            <g transform="translate(200 770) scale(0.62)"><Office label="Jobcenter" /></g>
            <g transform="translate(800 1330) scale(1.1)"><Person shirt="#3E6E8E" f={f} q={0.4} hair={GRAY_HAIR} glasses /></g>
            <g transform="translate(560 1130)"><Table /></g>
            <g transform="translate(330 1130)"><Mug /></g>
            <g transform={`translate(${lerp(240, 600, land)} ${lerp(700, 1080, land)}) rotate(${lerp(-25, 4, land)}) scale(${lerp(0.4, 0.6, land)})`}><Envelope /></g>
          </g>
        );
      },
    },
    /* b1b: Brief offen, Zeile markiert */
    {
      a: b1b, b: b2, kind: "zoom" as const, render: (f: number) => {
        const hl = interpolate(f, [wk("b1", "auffordern") - 4, wk("b1", "beantragen") + 4], [0, 1], CL);
        return (
          <g>
            <Txt x={540} y={340} s={96} c={C.amber}>Aufforderung</Txt>
            <Txt x={540} y={455} s={96}>möglich</Txt>
            <g transform="translate(540 900) rotate(-2)"><Letter hl={hl} /></g>
          </g>
        );
      },
    },
    /* b2a: Pflicht ausgesetzt */
    {
      a: b2, b: b2b, render: (f: number) => {
        const pb = pop(f, wk("b2", "ausgesetzt") - 6, 14);
        return (
          <g>
            <Txt x={540} y={340} s={100}>Pflicht</Txt>
            <Txt x={540} y={455} s={100} c={C.green}>ausgesetzt</Txt>
            <g transform="translate(470 920) rotate(-4) scale(0.8)" opacity={lerp(1, 0.55, pb)}><Letter hl={1} /></g>
            <g transform={`translate(720 1060) scale(${pb})`} opacity={Math.min(1, pb * 2)}><PauseBadge /></g>
          </g>
        );
      },
    },
    /* b2b: Kalender blättert zum 31. Dezember, Sanduhr fast leer */
    {
      a: b2b, b: b2c, render: (f: number) => {
        const flip = interpolate(f, [b2b + 2, b2b + 14], [0, 1], { ...CL, easing: (t) => t * t });
        const due = tw(f, wk("b2", "ende") - 2, 10);
        const sand = interpolate(f, [b2b, b2c], [0.3, 0.06], CL);
        return (
          <g>
            <Txt x={540} y={340} s={96}>nur bis</Txt>
            <Txt x={540} y={455} s={96} c={C.amber} o={0.35 + 0.65 * due}>31.12.2026</Txt>
            <g transform="translate(370 600)">
              <DezPage due={due} />
              {flip < 1 && (
                <g transform={`translate(0 ${-flip * 300}) rotate(${-flip * 30})`} opacity={1 - flip}>
                  <DezPage name="November" days={30} off={6} head={C.blue} />
                </g>
              )}
            </g>
            <g transform="translate(870 880) scale(0.95)"><Hourglass sand={sand} f={f} /></g>
          </g>
        );
      },
    },
    /* b2c: Verlängerung nicht beschlossen */
    {
      a: b2c, b: b3, render: (f: number) => {
        const st = interpolate(f, [wk("b2", "nicht") - 4, wk("b2", "nicht") + 6], [0, 1], CL);
        return (
          <g>
            <Txt x={540} y={340} s={96}>Verlängerung?</Txt>
            <Txt x={540} y={455} s={88} c={C.red} o={st}>nicht beschlossen</Txt>
            <g transform="translate(540 900) rotate(3) scale(0.85)">
              <rect x={-300} y={-360} width={600} height={720} rx={16} fill={INK} opacity={0.35} transform="translate(10 14)" />
              <rect x={-300} y={-360} width={600} height={720} rx={16} fill={C.white} />
              <text x={-264} y={-290} fontFamily={FONT} fontWeight={800} fontSize={46} fill={INK}>Verlängerung</text>
              <text x={-264} y={-240} fontFamily={FONT} fontWeight={700} fontSize={30} fill={C.mute}>ab 01.01.2027?</text>
              {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={-264} y={-180 + i * 48} width={528 * (0.95 - (i % 3) * 0.15)} height={18} rx={9} fill="#D5DCE7" />)}
              <rect x={-264} y={150} width={240} height={110} rx={10} fill="none" stroke="#B9C3D3" strokeWidth={4} strokeDasharray="12 10" />
            </g>
            <g transform="translate(540 1020)"><Stamp3 k={st} text="nicht beschlossen" col={C.red} w={660} s={62} rot={-10} /></g>
          </g>
        );
      },
    },
    /* b3a: Abschlag – Säule verliert rotes Stück, bis zu −14,4 % */
    {
      a: b3, b: b3b, render: (f: number) => {
        const cut = interpolate(f, [wk("b3", "abschlag") - 2, wk("b3", "abschlag") + 14], [0, 1], { ...CL, easing: (t) => t * t });
        const big = pop(f, wk("b3", "vierzehn") - 4, 14);
        const top = 680, bot = 1300, hh = bot - top, ch = hh * 0.144;
        return (
          <g>
            <Txt x={540} y={340} s={96}>Früher heißt</Txt>
            <Txt x={540} y={455} s={100} c={C.red}>Abschlag</Txt>
            <line x1={-40} y1={bot} x2={1120} y2={bot} stroke={C.line} strokeWidth={6} />
            {/* Säule */}
            <rect x={160} y={top} width={240} height={hh} rx={10} fill="none" stroke={C.gray} strokeWidth={4} strokeDasharray="14 10" opacity={cut} />
            <rect x={160} y={top + ch} width={240} height={hh - ch} rx={10} fill={C.blue} stroke={INK} strokeWidth={6} />
            <text x={280} y={1000} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={48} fill={INK}>Rente</text>
            {/* abfallendes rotes Stück */}
            <g transform={`translate(${280 + cut * 230} ${top + ch / 2 + cut * (hh - ch - 10)}) rotate(${cut * 18})`}>
              <rect x={-120} y={-ch / 2} width={240} height={ch} rx={10} fill={C.red} stroke={INK} strokeWidth={6} />
            </g>
            <g transform={`translate(760 900) scale(${big})`} opacity={Math.min(1, big * 2)}>
              <text y={-110} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={64} fill={C.white} stroke={INK} strokeWidth={6} paintOrder="stroke">bis zu</text>
              <text y={30} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={124} fill={C.red} stroke={INK} strokeWidth={10} paintOrder="stroke" letterSpacing={-3}>14,4 %</text>
              <text y={130} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={76} fill={C.red} stroke={INK} strokeWidth={7} paintOrder="stroke">weniger</text>
            </g>
          </g>
        );
      },
    },
    /* b3b: Zeitstrahl 63 → 67 → 80, Abschlag bleibt dauerhaft */
    {
      a: b3b, b: b4, render: (f: number) => {
        const gr = interpolate(f, [b3b + 2, wk("b3", "dauerhaft") + 6], [0, 1], { ...CL, easing: (t) => 1 - Math.pow(1 - t, 2) });
        const dh = pop(f, wk("b3", "dauerhaft") - 4, 14);
        const x0 = 130, x1 = 980, by = 1060, bh = 300, rh = bh * 0.144;
        const xe = lerp(x0, x1, gr);
        const tick = (x: number, t: string) => (
          <g key={t}>
            <line x1={x} y1={by - 10} x2={x} y2={by + 28} stroke={C.white} strokeWidth={6} />
            <Txt x={x} y={by + 92} s={58}>{t}</Txt>
          </g>
        );
        return (
          <g>
            <Txt x={540} y={340} s={92}>weniger Rente</Txt>
            <g transform={`translate(540 470) scale(${lerp(0.6, 1, dh)})`} opacity={Math.min(1, dh * 2)}><Txt x={0} y={0} s={112} c={C.red}>dauerhaft</Txt></g>
            {/* Band: Rente blau, abgeschnittener Teil rot */}
            <rect x={x0} y={by - bh} width={xe - x0} height={rh} fill={C.red} stroke={INK} strokeWidth={5} />
            <rect x={x0} y={by - bh + rh} width={xe - x0} height={bh - rh} fill={C.blue} stroke={INK} strokeWidth={5} />
            {gr > 0.25 && <text x={x0 + 24} y={by - 40} fontFamily={FONT} fontWeight={800} fontSize={44} fill={INK}>Rente</text>}
            {gr > 0.55 && <text x={xe - 20} y={by - bh - 20} textAnchor="end" fontFamily={FONT} fontWeight={800} fontSize={40} fill={C.red}>−14,4 % jeden Monat</text>}
            <line x1={x0 - 20} y1={by} x2={1030} y2={by} stroke={C.white} strokeWidth={6} />
            <path d="M 1030 -22 L 1062 0 L 1030 22 Z" transform={`translate(0 ${by})`} fill={C.white} />
            {tick(170, "63")}
            {tick(450, "67")}
            {tick(880, "80")}
            <Txt x={540} y={1285} s={44} c={C.gray} w={700}>Höchstwert, Jahrgang ab 1964</Txt>
          </g>
        );
      },
    },
    /* b4a: Ausnahmen – zwei Türen */
    {
      a: b4, b: b4b, render: (f: number) => {
        const d1 = pop(f, b4 + 2, 14), d2 = pop(f, b4 + 8, 14);
        const l1 = tw(f, wk("b4", "bald") - 4, 10), l2 = tw(f, wk("b4", "überwiegend") - 4, 10);
        const o1 = tw(f, wk("b4", "abschlag"), 14), o2 = tw(f, wk("b4", "arbeitest"), 14);
        const door = (x: number, k: number, op: number, lo: number, l1: string, l2: string) => (
          <g transform={`translate(${x} 1110) scale(${k})`} opacity={Math.min(1, k * 2)}>
            <Door op={op} />
            <Txt x={0} y={90} s={50} c={C.green} o={lo}>{l1}</Txt>
            <Txt x={0} y={150} s={50} c={C.green} o={lo}>{l2}</Txt>
          </g>
        );
        return (
          <g>
            <Txt x={540} y={340} s={88}>Es gibt</Txt>
            <Txt x={540} y={455} s={110} c={C.green}>Ausnahmen</Txt>
            {door(290, d1, o1, l1, "bald ohne", "Abschlag")}
            {door(790, d2, o2, l2, "überwiegend", "arbeiten")}
          </g>
        );
      },
    },
    /* b4b: Stift stoppt über dem Brief */
    {
      a: b4b, b: b4c, render: (f: number) => {
        const dn = interpolate(f, [b4b + 2, wk("b4", "unterschreiben")], [0, 1], { ...CL, easing: (t) => 1 - Math.pow(1 - t, 3) });
        const stop = pop(f, wk("b4", "unterschreiben") - 2, 12);
        const jit = stop > 0.5 ? Math.sin(f * 1.7) * 3 : 0;
        const oOut = 1 - tw(f, b4c - 9, 6); // altes Overlay weg, bevor das neue kommt
        return (
          <g>
            <Txt x={540} y={340} s={88} o={oOut}>Nichts ungeprüft</Txt>
            <Txt x={540} y={455} s={96} c={C.red} o={oOut}>unterschreiben</Txt>
            <g transform="translate(470 880) rotate(-3) scale(0.82)"><Letter hl={1} sign /></g>
            <g transform={`translate(${lerp(1000, 560, dn) + jit} ${lerp(1300, 1140, dn)})`}><PenHand /></g>
            <g transform={`translate(860 1100) scale(${stop})`} opacity={Math.min(1, stop * 2)}>
              <circle r={92} fill={C.red} stroke={INK} strokeWidth={7} />
              <rect x={-58} y={-16} width={116} height={32} rx={10} fill={C.white} />
            </g>
          </g>
        );
      },
    },
    /* b4c: Beratungstisch */
    {
      a: b4c, b: loop, render: (f: number) => {
        const ck = pop(f, wk("b4", "beraten") - 2, 14);
        const oIn = tw(f, b4c - 2, 8);
        return (
          <g>
            <Txt x={540} y={340} s={92} o={oIn}>Erst</Txt>
            <Txt x={540} y={455} s={96} c={C.green} o={oIn}>beraten lassen</Txt>
            <g transform="translate(260 1330) scale(1.05)"><Person shirt="#3E6E8E" f={f} q={0.2} hair={GRAY_HAIR} glasses /></g>
            <g transform="translate(830 1330) scale(1.05)"><Person shirt="#2E8C66" f={f + 20} q={0} hair="#4A3426" tie /></g>
            <g transform="translate(545 1150)"><Table w={620} /></g>
            <g transform="translate(560 1138) rotate(-4) scale(0.32)"><Letter hl={1} /></g>
            <g transform={`translate(545 790) scale(${ck})`} opacity={Math.min(1, ck * 2)}><Check s={1.3} /></g>
          </g>
        );
      },
    },
    /* Loop: zurück zum Schlüsselbild (YT: mit Schlusssatz) */
    {
      a: loop, b: end === "yt" ? fE + 10 : fE - 6, render: (f: number) => {
        const yt = end === "yt" && f >= ps("yt") - 4;
        const k = tw(f, ps("yt") - 4, 10) * (1 - tw(f, fE - 6, 6)); // Text weg, bevor die Münze fällt
        return yt ? (
          <g>
            <g opacity={k}>
              <Txt x={540} y={340} s={96}>Aufforderung da?</Txt>
              <Txt x={540} y={455} s={88} c={C.green}>Erst beraten lassen.</Txt>
            </g>
            <Hero f={f} />
          </g>
        ) : <HeroHead f={f} />;
      },
    },
  ];

  const hi = ["rente", "jobcenter", "auffordern", "aufforderung", "ausgesetzt", "ende", "nichtbeschlossen", "abschlag", "dauerhaft", "ausnahmen", "unterschreiben", "beraten", "grundsicherungsgeld"];
  const cs = chunks(D.paras as any, ["hook", "b1", "b2", "b3", "b4"], [["dreiundsechzig", "63"], ["vierzehn komma vier prozent", "14,4 %"], ["nicht beschlossen", "nicht beschlossen"]]);
  const subEnd = pe("b4") + 8;
  const endIn = tw(f, fE, 16);
  const info = f >= b1 && f < fE ? tw(f, b1 + 6, 10) * (1 - tw(f, loop - 6, 6)) : 0; // im Loop-Schlüsselbild ohne Quellenzeile (Kicker)

  const sfx: [number, string, number?][] = [
    [0, "soft", 0.7], [h2 - 2, "whoosh", 0.6], [h2 + 4, "ding", 0.35],
    [b1 - 4, "whoosh", 0.7], [wk("b1", "anspruch") - 2, "paper", 0.5],
    [b1b - 2, "paper", 0.5], [wk("b1", "auffordern") - 2, "ding", 0.35],
    [b2 - 4, "whoosh", 0.7], [wk("b2", "ausgesetzt") - 6, "soft", 0.5],
    [b2b - 2, "paper", 0.5], [wk("b2", "ende") - 2, "ding", 0.4],
    [b2c - 2, "whoosh", 0.6], [wk("b2", "nicht") - 4, "stamp", 0.55],
    [b3 - 2, "whoosh", 0.7], [wk("b3", "abschlag") + 8, "coins", 0.45], [wk("b3", "vierzehn") - 4, "stamp", 0.45],
    [b3b - 2, "whoosh", 0.6], [wk("b3", "dauerhaft") - 4, "soft", 0.5],
    [b4 - 4, "whoosh", 0.7], [wk("b4", "bald") - 6, "marimba", 0.35], [wk("b4", "überwiegend") - 6, "marimba", 0.35],
    [b4b - 2, "paper", 0.5], [wk("b4", "unterschreiben") - 2, "stamp", 0.45],
    [b4c - 2, "whoosh", 0.6], [wk("b4", "beraten") - 2, "ding", 0.4],
    [loop, "whoosh", 0.6],
    [fE - 6, "whoosh", 0.8], [closeAt, "coins", 0.4],
  ];

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Backdrop />
      <Stripes w={W} h={H} />
      <svg width={W} height={H} style={{ position: "absolute" }}>
        <ellipse cx={540} cy={900} rx={560} ry={520} fill="#4A6AAA" opacity={0.12} />
        <Scenes f={f} list={scenes} />
        {info > 0 && (
          <g>
            <Src o={info}>{SRC}</Src>
            <Txt x={540} y={1388} s={32} c={C.gray} w={700} o={info}>{DISC}</Txt>
          </g>
        )}
        {f >= fE && (
          <g opacity={endIn} transform={`translate(0 ${lerp(60, 0, endIn)})`}>
            {end === "yt"
              ? <EndYT f={f} at={fE} line="Aufforderung da? Erst beraten lassen." />
              : (
                <g>
                  <EndShare f={f} at={fE} who={["Grundsicherungsgeld", "bekommt und bald"]} closeAt={closeAt} />
                  <Txt x={540} y={960} s={74} c={C.amber} o={tw(f, fE + 12, 12)}>63 wird.</Txt>
                </g>
              )}
            <Txt x={540} y={1560} s={34} c={C.gray} w={700}>{DISC}</Txt>
          </g>
        )}
      </svg>
      <Sub f={f} cs={cs} end={subEnd} hi={hi} />
      <Grain f={f} />
      <Audio src={staticFile(`audio/s29_${end}.wav`)} />
      <SfxTrack list={sfx} />
    </AbsoluteFill>
  );
};
export const Short29YT: React.FC = () => <Short29 end="yt" />;
export const Short29TT: React.FC = () => <Short29 end="tt" />;
