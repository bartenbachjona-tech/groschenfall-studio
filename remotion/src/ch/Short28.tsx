/* Short 28 – Nebenkostennachzahlung: Jobcenter kann sie übernehmen, auch ohne laufendes Grundsicherungsgeld (§ 22 Abs. 1 SGB II, BSG B 14 AS 40/14 R);
   Antrag im Fälligkeitsmonat, wirkt auf den Monatsersten zurück (§ 37 Abs. 2 S. 2 SGB II); Rente/volle Erwerbsminderung → Sozialamt (SGB XII) */
import React from "react";
import { AbsoluteFill, staticFile, useCurrentFrame } from "remotion";
import { Audio } from "@remotion/media";
import { Backdrop, Stripes } from "../kit/Stage";
import { C, CL, CLOSING, EndShare, EndYT, FONT, Grain, Scenes, Src, SfxTrack, Sub, Txt, W, H, chunks, interpolate, lerp, mk, pop, tw } from "./shortkit";
import D from "../data/s28.json";

const { wk, ps, pe, DUR } = mk(D as any);
export const S28_DUR = DUR;
const INK = "#0A111D";
const SKIN = "#D8B391";
const SRC1 = "§ 22 Abs. 1, § 37 Abs. 2 SGB II; BSG B 14 AS 121/10 R";
const SRC4 = "§ 12 SGB II; Rente/Erwerbsminderung: Sozialamt (SGB XII)";
const DISC = "Einzelfall – keine Rechtsberatung";

/* ---------- Bausteine ---------- */

/** stilisierte Person, Ursprung = Füße; hold = Hand vorn auf Brusthöhe */
const Person: React.FC<{ shirt: string; f: number; s?: number; q?: number; cane?: boolean; hair?: string }> = ({ shirt, f, s = 1, q = 0, cane, hair = "#3B2A22" }) => {
  const br = Math.sin(f / 18) * 2;
  const bt = (f + 37) % 110, blink = bt < 5 ? 0.15 : 1;
  return (
    <g transform={`scale(${s}) translate(0 ${br})`}>
      <ellipse cx={0} cy={4 - br} rx={80} ry={14} fill={INK} opacity={0.4} />
      <rect x={-46} y={-170} width={38} height={172} rx={14} fill="#22385C" />
      <rect x={8} y={-170} width={38} height={172} rx={14} fill="#22385C" />
      <path d="M -72 -160 L -72 -268 Q -72 -312 -28 -312 L 28 -312 Q 72 -312 72 -268 L 72 -160 Z" fill={shirt} stroke={INK} strokeWidth={5} />
      <rect x={-14} y={-334} width={28} height={30} fill={SKIN} />
      <g transform={`rotate(${Math.sin(f / 30) * 1.5 + 3 * q} 0 -334)`}>
        <circle cx={0} cy={-378} r={52} fill={SKIN} stroke={INK} strokeWidth={5} />
        <path d="M -52 -390 Q -48 -440 0 -440 Q 50 -440 54 -392 Q 30 -410 -52 -390 Z" fill={hair} />
        <g transform={`translate(18 -382) scale(1 ${blink})`}><circle r={5} fill={INK} /></g>
        <g transform={`translate(-14 -382) scale(1 ${blink})`}><circle r={5} fill={INK} /></g>
        {/* Brauen: q = besorgt */}
        <path d={`M 8 ${-398 - 4 * q} L 30 ${-400 + 3 * q}`} stroke={INK} strokeWidth={4} strokeLinecap="round" />
        <path d={`M -24 ${-400 + 3 * q} L -4 ${-398 - 4 * q}`} stroke={INK} strokeWidth={4} strokeLinecap="round" />
        <path d={q > 0.5 ? "M -6 -350 Q 8 -360 22 -350" : "M -4 -354 Q 8 -346 22 -354"} stroke={INK} strokeWidth={4} fill="none" strokeLinecap="round" />
      </g>
      <path d="M -60 -290 L -84 -190" stroke={shirt} strokeWidth={30} strokeLinecap="round" />
      <circle cx={-84} cy={-186} r={15} fill={SKIN} />
      <path d="M 56 -290 L 96 -250" stroke={shirt} strokeWidth={30} strokeLinecap="round" />
      <circle cx={100} cy={-246} r={15} fill={SKIN} />
      {cane && (
        <g>
          <path d="M -84 -186 L -96 2" stroke="#A0784E" strokeWidth={10} strokeLinecap="round" />
          <path d="M -84 -186 Q -84 -206 -66 -204" stroke="#A0784E" strokeWidth={10} fill="none" strokeLinecap="round" />
        </g>
      )}
    </g>
  );
};

/** Nebenkostenabrechnung (Ursprung Mitte); st = Stempel 0..1, col = Stempelfarbe */
const Bill: React.FC<{ f: number; st: number; text?: string; col?: string; w?: number; h?: number }> = ({ st, text = "NACHZAHLUNG", col = C.red, w = 300, h = 390 }) => (
  <g>
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={14} fill={INK} opacity={0.35} transform="translate(8 12)" />
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={14} fill={C.white} />
    <text x={-w / 2 + 24} y={-h / 2 + 52} fontFamily={FONT} fontWeight={800} fontSize={30} fill={INK}>Nebenkosten</text>
    <text x={-w / 2 + 24} y={-h / 2 + 86} fontFamily={FONT} fontWeight={700} fontSize={24} fill={C.mute}>Abrechnung</text>
    {[0, 1, 2, 3, 4].map((i) => (
      <g key={i}>
        <rect x={-w / 2 + 24} y={-h / 2 + 120 + i * 40} width={w * 0.42} height={16} rx={8} fill="#D5DCE7" />
        <rect x={w / 2 - 24 - w * 0.22} y={-h / 2 + 120 + i * 40} width={w * 0.22} height={16} rx={8} fill="#D5DCE7" />
      </g>
    ))}
    <line x1={-w / 2 + 24} y1={h / 2 - 70} x2={w / 2 - 24} y2={h / 2 - 70} stroke={INK} strokeWidth={4} />
    <rect x={w / 2 - 24 - w * 0.3} y={h / 2 - 52} width={w * 0.3} height={22} rx={10} fill={col} opacity={0.85} />
    {st > 0 && (
      <g transform={`translate(0 ${h * 0.05}) rotate(-12) scale(${3 - 2 * (1 - Math.pow(1 - st, 3))})`} opacity={st}>
        <rect x={-210} y={-50} width={420} height={100} rx={14} fill={INK} opacity={0.6} />
        <rect x={-210} y={-50} width={420} height={100} rx={14} fill="none" stroke={col} strokeWidth={9} />
        <text y={20} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={text.length > 11 ? 46 : 54} fill={col}>{text}</text>
      </g>
    )}
  </g>
);

/** Handy mit kleinem Kontostand */
const Konto: React.FC<{ f: number; low?: number }> = ({ low = 1 }) => (
  <g>
    <rect x={-100} y={-170} width={200} height={340} rx={30} fill={INK} opacity={0.4} transform="translate(6 10)" />
    <rect x={-100} y={-170} width={200} height={340} rx={30} fill="#22385C" stroke={INK} strokeWidth={6} />
    <rect x={-84} y={-146} width={168} height={292} rx={18} fill={C.white} />
    <text y={-100} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={30} fill={INK}>Konto</text>
    <rect x={-60} y={-60} width={120} height={150} rx={10} fill="#E3E8F0" />
    <rect x={-60} y={90 - lerp(150, 26, low)} width={120} height={lerp(150, 26, low)} rx={10} fill={low > 0.5 ? C.amber : C.green} />
    <text y={128} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={26} fill={low > 0.5 ? "#B5741A" : C.mute}>{low > 0.5 ? "knapp" : ""}</text>
  </g>
);

const MN = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
/** Wandkalender Jahr: 12 Kacheln, hl = hervorgehobener Monat (Index), hp = 0..1, ok = Minze-Haken */
const YearCal: React.FC<{ hl: number; hp: number; w?: number; ok?: number; tag?: string }> = ({ hl, hp, w = 360, ok = 0, tag }) => {
  const tw_ = (w - 40) / 4, th = tw_ * 0.72, h = 96 + th * 3 + 30;
  return (
    <g>
      <rect x={-w / 2} y={0} width={w} height={h} rx={14} fill={INK} opacity={0.4} transform="translate(8 12)" />
      <rect x={-w / 2} y={0} width={w} height={h} rx={14} fill="#26395A" stroke={INK} strokeWidth={5} />
      <rect x={-w / 2} y={0} width={w} height={70} rx={14} fill={C.blue} />
      <rect x={-w / 2} y={40} width={w} height={30} fill={C.blue} />
      <text y={50} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={w * 0.1} fill={INK}>2026</text>
      {MN.map((m, i) => {
        const x = -w / 2 + 20 + (i % 4) * tw_, y = 86 + Math.floor(i / 4) * th;
        const on = i === hl;
        return (
          <g key={m}>
            <rect x={x + 4} y={y + 4} width={tw_ - 8} height={th - 8} rx={8} fill={on ? (ok > 0.5 ? C.green : C.amber) : "#4A5B78"} opacity={on ? lerp(0.5, 1, hp) : 0.55} />
            <text x={x + tw_ / 2} y={y + th / 2 + w * 0.026} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={w * 0.07} fill={on ? INK : "#9AA8BE"}>{m}</text>
            {on && hp > 0 && <rect x={x - 2} y={y - 2} width={tw_ + 4} height={th + 4} rx={12} fill="none" stroke={ok > 0.5 ? C.green : C.amber} strokeWidth={6} opacity={hp} />}
            {on && tag && hp > 0.3 && (
              <g transform={`translate(${x + tw_ / 2} ${y + th + 34})`} opacity={hp}>
                <rect x={-80} y={-26} width={160} height={52} rx={26} fill={C.amber} stroke={INK} strokeWidth={4} />
                <text y={12} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={32} fill={INK}>{tag}</text>
              </g>
            )}
          </g>
        );
      })}
      {[-w / 4, w / 4].map((x, k) => <rect key={k} x={x - 8} y={-18} width={16} height={40} rx={8} fill={C.gray} stroke={INK} strokeWidth={4} />)}
    </g>
  );
};

/** Monatsblatt (Ursprung oben Mitte). Montag zuerst. */
const MONTH = { nov: { n: "November", d: 30, o: 6 }, dez: { n: "Dezember", d: 31, o: 1 } };
const dayPos = (m: { o: number }, day: number, w: number, top: number, rh: number) => {
  const cw = (w - 40) / 7, p = day - 1 + m.o;
  return [-w / 2 + 20 + cw * (p % 7) + cw / 2, top + rh * Math.floor(p / 7) + rh / 2];
};
const MonthPage: React.FC<{ m: "nov" | "dez"; w?: number; h?: number; head?: string; dim?: number; first?: number; due?: number; hp?: number }> = ({ m, w = 640, h = 620, head = C.amber, dim = 0, first = 0, due = 0 }) => {
  const M = MONTH[m], top = 150, rh = (h - top - 20) / 6;
  return (
    <g opacity={1 - 0.45 * dim}>
      <rect x={-w / 2} y={0} width={w} height={h} rx={18} fill={INK} opacity={0.4} transform="translate(10 14)" />
      <rect x={-w / 2} y={0} width={w} height={h} rx={18} fill={C.white} />
      <rect x={-w / 2} y={0} width={w} height={100} rx={18} fill={dim > 0.5 ? C.mute : head} />
      <rect x={-w / 2} y={60} width={w} height={40} fill={dim > 0.5 ? C.mute : head} />
      <text y={72} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={60} fill={INK}>{M.n}</text>
      {["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"].map((d, i) => (
        <text key={d} x={-w / 2 + 20 + ((w - 40) / 7) * (i + 0.5)} y={136} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={24} fill={C.mute}>{d}</text>
      ))}
      {Array.from({ length: M.d }, (_, k) => {
        const [cx, cy] = dayPos(M, k + 1, w, top, rh);
        const isFirst = k === 0 && first > 0;
        const isDue = k + 1 === 12 && due > 0;
        return (
          <g key={k}>
            {isFirst && <circle cx={cx} cy={cy} r={34 * first} fill={C.green} />}
            {isDue && <circle cx={cx} cy={cy} r={34} fill="none" stroke={C.amber} strokeWidth={7} opacity={due} />}
            <text x={cx} y={cy + 11} textAnchor="middle" fontFamily={FONT} fontWeight={isFirst || isDue ? 800 : 600} fontSize={32} fill={isFirst ? INK : isDue ? "#B5741A" : C.mute}>{k + 1}</text>
          </g>
        );
      })}
      {[-w / 4, w / 4].map((x, k) => <rect key={k} x={x - 10} y={-22} width={20} height={48} rx={10} fill={C.gray} stroke={INK} strokeWidth={4} />)}
    </g>
  );
};
const NOV_W = 640, NOV_H = 620, NOV_TOP = 150, NOV_RH = (NOV_H - NOV_TOP - 20) / 6;
const novPos = (day: number) => dayPos(MONTH.nov, day, NOV_W, NOV_TOP, NOV_RH);

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
const Office: React.FC<{ col?: string; label: string; dim?: number }> = ({ col = "#5C7299", label, dim = 0 }) => (
  <g opacity={1 - 0.6 * dim}>
    <rect x={-150} y={-200} width={300} height={400} fill={INK} opacity={0.35} transform="translate(8 12)" />
    <rect x={-150} y={-200} width={300} height={400} rx={6} fill={col} stroke={INK} strokeWidth={6} />
    <rect x={-170} y={-224} width={340} height={30} rx={6} fill="#3C4F72" stroke={INK} strokeWidth={5} />
    {[0, 1, 2, 3].map((r) => [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={-118 + c * 86} y={-170 + r * 72} width={64} height={48} rx={4} fill="#F0C987" opacity={(r + c) % 3 === 0 ? 0.85 : 0.45} />))}
    <rect x={-44} y={118} width={88} height={82} rx={4} fill="#22385C" stroke={INK} strokeWidth={5} />
    <text y={262} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={48} fill={C.white} stroke={INK} strokeWidth={5} paintOrder="stroke">{label}</text>
  </g>
);

const Arrow2: React.FC<{ x1: number; y1: number; x2: number; y2: number; p: number; col: string; sw?: number }> = ({ x1, y1, x2, y2, p, col, sw = 16 }) => {
  if (p <= 0) return null;
  const x = lerp(x1, x2, p), y = lerp(y1, y2, p), a = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x} y2={y} stroke={col} strokeWidth={sw} strokeLinecap="round" />
      <path d="M -4 -28 L 36 0 L -4 28 Z" fill={col} transform={`translate(${x} ${y}) rotate(${a})`} />
    </g>
  );
};

const Check: React.FC<{ s?: number; col?: string }> = ({ s = 1, col = C.green }) => (
  <g transform={`scale(${s})`}>
    <circle r={60} fill={col} stroke={INK} strokeWidth={6} />
    <path d="M -28 2 L -8 24 L 30 -22" stroke={INK} strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </g>
);

/** Frame 0 / Loop: Du-Figur mit Abrechnung, Konto, Wandkalender */
const Hero: React.FC<{ f: number; st: number; hp: number; ok?: number; q?: number }> = ({ f, st, hp, ok = 0, q = 1 }) => (
  <g>
    <line x1={-40} y1={1330} x2={1120} y2={1330} stroke={C.line} strokeWidth={6} />
    <g transform="translate(790 525)"><YearCal hl={10} hp={hp} ok={ok} /></g>
    <g transform="translate(250 1330) scale(1.25)"><Person shirt="#3E6E8E" f={f} q={q} /></g>
    <g transform="translate(500 1010) rotate(-5)">
      <Bill f={f} st={st} text={ok > 0.5 ? "ANTRAG" : "NACHZAHLUNG"} col={ok > 0.5 ? C.green : C.red} />
    </g>
    <circle cx={375} cy={1022} r={19} fill={SKIN} stroke={INK} strokeWidth={4} />
    <g transform="translate(870 1130) rotate(6)"><Konto f={f} low={ok > 0.5 ? 0.4 : 1} /></g>
  </g>
);

export const Short28: React.FC<{ end: "yt" | "tt" }> = ({ end }) => {
  const f = useCurrentFrame();
  const h2 = wk("hook", "dann") - 4;
  const b1 = ps("b1") - 4, b1b = wk("b1", "auch") - 4;
  const b2 = ps("b2") - 4, b2b = wk("b2", "reicht") - 4;
  const b3 = ps("b3") - 4, b3b = wk("b3", "dann") - 4, b3c = wk("b3", "folgemonat") - 4;
  const b4 = ps("b4") - 4, b4b = wk("b4", "altersrente") - 4;
  const closeAt = wk(end, "groschenfall") - 4;
  const loop = ps("yt") - 6;
  const fE = end === "yt" ? closeAt - 4 : ps(end) - 8;

  const scenes = [
    /* Frame 0: Konflikt */
    {
      a: 0, b: h2, render: (f: number) => (
        <g>
          <Txt x={540} y={330} s={104} c={C.red}>Nachzahlung?</Txt>
          <Txt x={540} y={440} s={90} c={C.amber}>Ein Monat zählt.</Txt>
          <Hero f={f} st={1} hp={interpolate(f, [0, 6, wk("hook", "monat") - 4, wk("hook", "monat") + 4], [1, 1, 1, 1], CL)} />
          <Src o={tw(f, 20, 10)}>{SRC1}</Src>
        </g>
      ),
    },
    /* genau ein Monat */
    {
      a: h2, b: b1, kind: "zoom" as const, render: (f: number) => {
        const hp = tw(f, wk("hook", "=ein") - 4, 10);
        return (
          <g>
            <Txt x={540} y={330} s={96}>Genau</Txt>
            <Txt x={540} y={440} s={96} c={C.amber}>ein Monat</Txt>
            <g transform="translate(540 560)"><YearCal hl={10} hp={hp} w={760} tag="fällig" /></g>
            <Src o={tw(f, h2 + 6, 10)}>{SRC1}</Src>
          </g>
        );
      },
    },
    /* b1a: Jobcenter kann übernehmen */
    {
      a: b1, b: b1b, render: (f: number) => {
        const ar = interpolate(f, [wk("b1", "nachzahlung") - 4, wk("b1", "übernehmen") + 2], [0, 1], CL);
        const ck = pop(f, wk("b1", "übernehmen") - 2, 14);
        return (
          <g>
            <Txt x={540} y={330} s={88}>Das Jobcenter</Txt>
            <Txt x={540} y={430} s={88} c={C.green}>kann übernehmen</Txt>
            <g transform="translate(260 840)"><Office label="Jobcenter" /></g>
            <g transform="translate(790 860) rotate(4)"><Bill f={f} st={1} /></g>
            <Arrow2 x1={420} y1={760} x2={600} y2={760} p={ar} col={C.green} />
            <g transform={`translate(880 1080) scale(${ck})`} opacity={Math.min(1, ck * 2)}><Check s={1.1} /></g>
            <Src o={tw(f, b1 + 6, 10)}>{SRC1}</Src>
          </g>
        );
      },
    },
    /* b1b: auch ohne Grundsicherungsgeld */
    {
      a: b1b, b: b2, render: (f: number) => {
        const sg = pop(f, wk("b1", "kein") - 4, 14);
        return (
          <g>
            <Txt x={540} y={330} s={84}>Auch ohne</Txt>
            <Txt x={540} y={430} s={76} c={C.amber}>Grundsicherungsgeld</Txt>
            <line x1={-40} y1={1230} x2={1120} y2={1230} stroke={C.line} strokeWidth={6} />
            <g transform="translate(360 1230) scale(1.2)"><Person shirt="#7C8BA6" f={f} q={0.3} /></g>
            <g transform={`translate(720 780) scale(${sg}) rotate(4)`} opacity={Math.min(1, sg * 2)}>
              <rect x={-240} y={-110} width={480} height={220} rx={20} fill={INK} opacity={0.35} transform="translate(8 12)" />
              <rect x={-240} y={-110} width={480} height={220} rx={20} fill={C.blue} stroke={INK} strokeWidth={6} />
              <text y={-24} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={44} fill={INK}>bekommt sonst</text>
              <text y={40} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={44} fill={INK}>keine Leistung</text>
            </g>
            <g transform="translate(760 1060) rotate(-4) scale(0.7)"><Bill f={f} st={1} /></g>
            <Txt x={540} y={1330} s={36} c={C.gray} w={700} o={tw(f, b1b + 14, 10)}>Nur Nebenkosten/Heizung – Strom zählt nicht</Txt>
            <Src o={tw(f, b1b + 6, 10)}>{SRC1}</Src>
          </g>
        );
      },
    },
    /* b2a: Monat der Fälligkeit */
    {
      a: b2, b: b2b, render: (f: number) => {
        const due = tw(f, wk("b2", "fällig") - 4, 10);
        const [dx, dy] = novPos(12);
        return (
          <g>
            <Txt x={540} y={330} s={84}>Entscheidend:</Txt>
            <Txt x={540} y={430} s={84} c={C.amber}>der Fällig-Monat</Txt>
            <g transform="translate(540 540)">
              <MonthPage m="nov" due={due} />
              <g transform={`translate(${dx} ${dy - 66})`} opacity={due}>
                <rect x={-80} y={-28} width={160} height={56} rx={28} fill={C.amber} stroke={INK} strokeWidth={4} />
                <text y={12} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={34} fill={INK}>fällig</text>
              </g>
            </g>
            <Txt x={540} y={1260} s={34} c={C.gray} w={700} o={tw(f, b2 + 20, 10)}>Im Zweifel: Monat, in dem die Abrechnung kommt</Txt>
            <Src o={tw(f, b2 + 6, 10)}>{SRC1}</Src>
          </g>
        );
      },
    },
    /* b2b: Monatswaage */
    {
      a: b2b, b: b3, render: (f: number) => {
        const nz = tw(f, wk("b2", "nachzahlung") - 4, 12);
        const tilt = lerp(-7, 9, nz);
        const hb = pop(f, wk("b2", "hilfebedürftig") - 4, 14);
        const pan = (x: number, children: React.ReactNode) => {
          const yy = Math.sin((tilt * Math.PI) / 180) * x;
          return (
            <g transform={`translate(${540 + x} ${760 + yy})`}>
              <line x1={-120} y1={160} x2={0} y2={0} stroke={C.gray} strokeWidth={5} />
              <line x1={120} y1={160} x2={0} y2={0} stroke={C.gray} strokeWidth={5} />
              <path d="M -160 160 L 160 160 Q 140 200 0 200 Q -140 200 -160 160 Z" fill={C.gray} stroke={INK} strokeWidth={5} />
              {children}
            </g>
          );
        };
        const blk = (y: number, t: string, col: string, o = 1, w = 260) => (
          <g opacity={o}>
            <rect x={-w / 2} y={y} width={w} height={70} rx={12} fill={col} stroke={INK} strokeWidth={5} />
            <text y={y + 47} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={34} fill={INK}>{t}</text>
          </g>
        );
        return (
          <g>
            <Txt x={540} y={330} s={84}>Reicht dein</Txt>
            <Txt x={540} y={430} s={84}>Einkommen?</Txt>
            <path d="M 500 1200 L 540 770 L 580 1200 Z" fill="#5A6B88" stroke={INK} strokeWidth={6} />
            <rect x={420} y={1190} width={240} height={30} rx={10} fill="#5A6B88" stroke={INK} strokeWidth={5} />
            <g transform={`translate(540 760) rotate(${tilt})`}>
              <rect x={-300} y={-10} width={600} height={20} rx={10} fill={C.gray} stroke={INK} strokeWidth={5} />
            </g>
            <circle cx={540} cy={760} r={18} fill={C.amber} stroke={INK} strokeWidth={5} />
            {pan(-300, <g>{blk(80, "Einkommen", C.green)}</g>)}
            {pan(300, <g>
              {blk(-60 - 0, "Nachzahlung", C.red, nz, 280)}
              <g transform={`translate(0 ${lerp(-200, 0, nz)})`} opacity={nz} />
              {blk(10, "Leben", C.blue)}
              {blk(80, "Miete", C.blue)}
            </g>)}
            <g transform={`translate(540 1320) scale(${hb})`} opacity={Math.min(1, hb * 2)}>
              <rect x={-460} y={-56} width={920} height={112} rx={56} fill={C.amber} stroke={INK} strokeWidth={5} />
              <text y={18} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={44} fill={INK}>in diesem Monat hilfebedürftig?</text>
            </g>
            <Src o={tw(f, b2b + 6, 10)}>{SRC1}</Src>
          </g>
        );
      },
    },
    /* b3a: Antrag im selben Monat */
    {
      a: b3, b: b3b, render: (f: number) => {
        const st = interpolate(f, [wk("b3", "antrag") - 2, wk("b3", "antrag") + 8], [0, 1], CL);
        const fly = tw(f, b3 + 2, 14);
        const [sx, sy] = novPos(19);
        return (
          <g>
            <Txt x={540} y={330} s={84}>Antrag noch im</Txt>
            <Txt x={540} y={430} s={84} c={C.green}>selben Monat</Txt>
            <g transform="translate(540 540)">
              <MonthPage m="nov" due={1} />
              <g transform={`translate(${sx} ${sy})`}><Stamp3 k={st} text="Antrag" col={C.green} w={230} s={44} rot={-10} /></g>
            </g>
            <g transform={`translate(${lerp(1200, 900, fly)} ${lerp(1500, 1260, fly)}) rotate(${lerp(30, 8, fly)}) scale(0.55)`} opacity={(1 - st) * fly}>
              <Bill f={f} st={0} />
            </g>
            <Src o={tw(f, b3 + 6, 10)}>{SRC1}</Src>
          </g>
        );
      },
    },
    /* b3b: rückwirkend ab dem 1. */
    {
      a: b3b, b: b3c, render: (f: number) => {
        const ar = interpolate(f, [wk("b3", "rückwirkend") - 6, wk("b3", "rückwirkend") + 14], [0, 1], CL);
        const fi = tw(f, wk("b3", "ganzen") - 4, 10);
        const [sx, sy] = novPos(19), [ox, oy] = novPos(1);
        const path = `M ${sx - 60} ${sy - 40} Q ${(sx + ox) / 2} ${oy - 230} ${ox + 10} ${oy - 40}`;
        return (
          <g>
            <Txt x={540} y={330} s={84} c={C.green}>Gilt rückwirkend</Txt>
            <Txt x={540} y={430} s={84}>ab dem 1.</Txt>
            <g transform="translate(540 540)">
              <MonthPage m="nov" due={1} first={tw(f, wk("b3", "rückwirkend") + 6, 10)} />
              {/* ganzer Monat leicht minze hinterlegt */}
              <rect x={-300} y={150} width={600} height={450} rx={12} fill={C.green} opacity={0.14 * fi} />
              <g transform={`translate(${sx} ${sy})`}><Stamp3 k={1} text="Antrag" col={C.green} w={230} s={44} rot={-10} /></g>
              <path d={path} stroke={C.green} strokeWidth={14} fill="none" strokeLinecap="round" strokeDasharray={1000} strokeDashoffset={1000 * (1 - ar)} />
              {ar > 0.97 && <path d="M -26 -18 L 0 22 L 26 -18 Z" fill={C.green} transform={`translate(${ox + 10} ${oy - 34}) rotate(10)`} />}
              <g transform={`translate(${ox - 60} ${oy - 210})`} opacity={tw(f, wk("b3", "rückwirkend") + 8, 10)}>
                <rect x={-150} y={-34} width={300} height={68} rx={34} fill={C.green} stroke={INK} strokeWidth={5} />
                <text y={14} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={38} fill={INK}>gilt ab dem 1.</text>
              </g>
            </g>
            <Src o={tw(f, b3b + 6, 10)}>{SRC1}</Src>
          </g>
        );
      },
    },
    /* b3c: Folgemonat oft zu spät */
    {
      a: b3c, b: b4, render: (f: number) => {
        const flip = tw(f, b3c + 2, 14);
        const st = interpolate(f, [wk("b3", "spät") - 6, wk("b3", "spät") + 4], [0, 1], CL);
        return (
          <g>
            <Txt x={540} y={330} s={84}>Im Folgemonat?</Txt>
            <Txt x={540} y={430} s={84} c={C.red} o={st}>Oft zu spät.</Txt>
            <g transform={`translate(${lerp(540, 300, flip)} 560) scale(${lerp(1, 0.66, flip)})`}>
              <MonthPage m="nov" due={1} />
              <g transform={`translate(${novPos(19)[0]} ${novPos(19)[1]})`}><Stamp3 k={1} text="Antrag" col={C.green} w={230} s={44} rot={-10} /></g>
              <g transform="translate(0 700)" opacity={flip}><Check s={1.1} /></g>
            </g>
            <g transform={`translate(${lerp(1300, 790, flip)} 600) scale(0.66) rotate(${lerp(10, 0, flip)})`}>
              <MonthPage m="dez" dim={1} />
              <g transform="translate(0 330)"><Stamp3 k={st} text="oft zu spät" col={C.red} w={480} s={58} rot={-12} /></g>
            </g>
            <Src o={tw(f, b3c + 6, 10)}>{SRC1}</Src>
          </g>
        );
      },
    },
    /* b4a: Prüfung */
    {
      a: b4, b: b4b, render: (f: number) => {
        const r1 = pop(f, b4 + 4, 14), r2 = pop(f, wk("b4", "miete") - 4, 14);
        const lx = interpolate(f, [b4 + 6, wk("b4", "miete"), wk("b4", "angemessen") + 10], [0, 0, 1], CL);
        const row = (k: number, y: number, t: string) => (
          <g transform={`translate(540 ${y}) scale(${k})`} opacity={Math.min(1, k * 2)}>
            <rect x={-420} y={-70} width={840} height={140} rx={22} fill={C.white} />
            <rect x={-390} y={-34} width={68} height={68} rx={12} fill="none" stroke={C.blue} strokeWidth={7} />
            <text x={-290} y={18} fontFamily={FONT} fontWeight={800} fontSize={50} fill={INK}>{t}</text>
          </g>
        );
        return (
          <g>
            <Txt x={540} y={330} s={88} c={C.blue}>Geprüft wird</Txt>
            {row(r1, 660, "Vermögen?")}
            {row(r2, 880, "Miete + Heizung")}
            <g opacity={r2}><Txt x={600} y={1050} s={50} c={C.gray} w={700}>angemessen?</Txt></g>
            <g transform={`translate(${lerp(820, 860, lx)} ${lerp(640, 900, lx)}) rotate(-20)`} opacity={r1}>
              <circle r={72} fill="#CFE0FF" fillOpacity={0.25} stroke={C.blue} strokeWidth={14} />
              <rect x={-12} y={72} width={24} height={110} rx={10} fill={C.blue} stroke={INK} strokeWidth={4} />
            </g>
            <Txt x={540} y={1330} s={34} c={C.gray} w={700} o={tw(f, b4 + 14, 10)}>{DISC}</Txt>
            <Src o={tw(f, b4 + 6, 10)}>{SRC4}</Src>
          </g>
        );
      },
    },
    /* b4b: Weiche Sozialamt */
    {
      a: b4b, b: end === "yt" ? loop : fE - 6, render: (f: number) => {
        const ar = interpolate(f, [wk("b4", "sozialamt") - 8, wk("b4", "sozialamt") + 8], [0, 1], CL);
        const pr = pop(f, b4b + 4, 14);
        return (
          <g>
            <Txt x={540} y={330} s={80}>Rente oder voll</Txt>
            <Txt x={540} y={430} s={80}>erwerbsgemindert?</Txt>
            <line x1={-40} y1={1230} x2={1120} y2={1230} stroke={C.line} strokeWidth={6} />
            <g transform="translate(220 1230) scale(1.05)"><Person shirt="#8C7BC4" f={f} q={0.2} cane hair="#D3D8E2" /></g>
            <g transform={`translate(330 960) scale(${pr}) rotate(-6)`} opacity={Math.min(1, pr * 2)}>
              <rect x={-90} y={-60} width={180} height={120} rx={12} fill={C.white} stroke={INK} strokeWidth={4} />
              <text y={14} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={36} fill={INK}>Rente</text>
            </g>
            <g transform="translate(790 640) scale(0.62)"><Office label="Jobcenter" dim={ar} /></g>
            <g transform="translate(790 1000) scale(0.62)"><Office col="#2E8C66" label="Sozialamt" /></g>
            <Arrow2 x1={440} y1={1000} x2={640} y2={1000} p={ar} col={C.green} />
            <path d="M 700 600 L 880 720 M 880 600 L 700 720" stroke={C.red} strokeWidth={14} strokeLinecap="round" opacity={ar} />
            <Txt x={540} y={1330} s={34} c={C.gray} w={700} o={tw(f, b4b + 10, 10)}>{DISC}</Txt>
            <Src o={tw(f, b4b + 6, 10)}>{SRC4}</Src>
          </g>
        );
      },
    },
    ...(end === "tt" ? [] : [{
      a: loop, b: fE - 6, render: (f: number) => {
        const st = interpolate(f, [wk("yt", "antrag") - 2, wk("yt", "antrag") + 8], [0, 1], CL);
        return (
          <g>
            <Txt x={540} y={330} s={100} c={C.amber}>Abrechnung da?</Txt>
            <Txt x={540} y={440} s={88} c={C.green}>Selber Monat.</Txt>
            <Hero f={f} st={st} hp={1} ok={st > 0 ? 1 : 0} q={0} />
            <Src o={1}>{SRC1}</Src>
          </g>
        );
      },
    }]),
  ];

  const hi = ["nachzahlung", "monat", "jobcenter", "übernehmen", "grundsicherungsgeld", "fällig", "hilfebedürftig", "antrag", "selben", "rückwirkend", "folgemonat", "spät", "vermögen", "angemessen", "sozialamt"];
  const cs = chunks(D.paras as any, ["hook", "b1", "b2", "b3", "b4"], []);
  const subEnd = pe("b4") + 8;
  const endIn = tw(f, fE, 16);

  const sfx: [number, string, number?][] = [
    [0, "soft", 0.7], [wk("hook", "=ein") - 4, "ding", 0.4], [h2 - 2, "whoosh", 0.6],
    [b1 - 4, "whoosh", 0.7], [wk("b1", "übernehmen") - 2, "ding", 0.4],
    [b1b - 2, "whoosh", 0.6], [wk("b1", "kein") - 4, "soft", 0.5],
    [b2 - 4, "whoosh", 0.7], [wk("b2", "fällig") - 4, "paper", 0.5],
    [b2b - 2, "whoosh", 0.6], [wk("b2", "nachzahlung") - 4, "coins", 0.4], [wk("b2", "hilfebedürftig") - 4, "soft", 0.5],
    [b3 - 4, "whoosh", 0.7], [wk("b3", "antrag") - 2, "stamp", 0.55],
    [b3b - 2, "whoosh", 0.6], [wk("b3", "rückwirkend") + 6, "marimba", 0.4],
    [b3c - 2, "paper", 0.5], [wk("b3", "spät") - 6, "stamp", 0.5],
    [b4 - 4, "whoosh", 0.7], [wk("b4", "miete") - 4, "soft", 0.4],
    [b4b - 2, "whoosh", 0.6], [wk("b4", "sozialamt") - 4, "ding", 0.4],
    ...(end === "yt" ? [[loop, "whoosh", 0.6], [wk("yt", "antrag") - 2, "stamp", 0.5]] as [number, string, number][] : []),
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
                  <EndShare f={f} at={fE} who={["gerade eine hohe", "Nebenkosten-"]} closeAt={closeAt} />
                  <Txt x={540} y={960} s={74} c={C.amber} o={tw(f, fE + 12, 12)}>abrechnung hat.</Txt>
                </g>
              )}
            <Txt x={540} y={1560} s={34} c={C.gray} w={700}>{DISC}</Txt>
          </g>
        )}
      </svg>
      <Sub f={f} cs={cs} end={subEnd} hi={hi} />
      <Grain f={f} />
      <Audio src={staticFile(`audio/s28_${end}.wav`)} />
      <SfxTrack list={sfx} />
    </AbsoluteFill>
  );
};
export const Short28YT: React.FC = () => <Short28 end="yt" />;
export const Short28TT: React.FC = () => <Short28 end="tt" />;
