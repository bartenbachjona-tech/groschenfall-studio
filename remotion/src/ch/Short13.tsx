/* Short 13 – Frühstart-Rente: Ein Geburtsjahr trennt Geschwister (Jahrgang 2019 | 2020) */
import React from "react";
import { AbsoluteFill, staticFile, useCurrentFrame } from "remotion";
import { Audio } from "@remotion/media";
import { noise2D } from "@remotion/noise";
import { Backdrop, Stripes } from "../kit/Stage";
import { Coin, Stamp } from "../kit/Props";
import { C, CL, EndTT, EndYT, FONT, Grain, H, IO, OUT, Pill, Scenes, Src, SfxTrack, Sub, Txt, W, chunks, interpolate, lerp, mk, pop, tw } from "./shortkit";
import D from "../data/s13.json";

const { wk, ps, pe, DUR } = mk(D as any);
export const S13_DUR = DUR;
const SIS = C.green, BRO = C.amber;

/* ---------- Hilfskomponenten ---------- */

/** Stilisiertes Kind, Füße bei (0,0), ca. 430 hoch */
const Kid: React.FC<{ f: number; girl?: boolean; shirt: string; mood?: number; seed?: number }> = ({ f, girl, shirt, mood = 1, seed = 0 }) => {
  const bt = (f + seed * 41) % 100;
  const blink = bt > 2 && bt < 7 ? 0.15 : 1;
  const br = Math.sin((f + seed * 17) / 16) * 3;
  const hair = girl ? "#6B3A2A" : "#2B2140";
  // mood: 1 = Lächeln, 0 = neutral, -1 = traurig
  const my = mood * 10;
  return (
    <g transform={`translate(0 ${br})`}>
      <ellipse cx={0} cy={4} rx={90} ry={16} fill="#0A111D" opacity={0.35} />
      <rect x={-38} y={-130} width={30} height={128} rx={14} fill="#2A3F63" />
      <rect x={8} y={-130} width={30} height={128} rx={14} fill="#2A3F63" />
      <rect x={-46} y={-14} width={42} height={18} rx={9} fill="#0A111D" />
      <rect x={4} y={-14} width={42} height={18} rx={9} fill="#0A111D" />
      {girl
        ? <path d="M -56 -270 Q 0 -290 56 -270 L 80 -110 L -80 -110 Z" fill={shirt} />
        : <path d="M -58 -270 Q 0 -290 58 -270 L 62 -120 L -62 -120 Z" fill={shirt} />}
      <rect x={-84} y={-262} width={26} height={120} rx={13} fill={shirt} transform="rotate(8 -71 -262)" />
      <rect x={58} y={-262} width={26} height={120} rx={13} fill={shirt} transform="rotate(-8 71 -262)" />
      <circle cx={-80} cy={-140} r={14} fill="#E8B98F" />
      <circle cx={80} cy={-140} r={14} fill="#E8B98F" />
      <rect x={-14} y={-300} width={28} height={30} fill="#E8B98F" />
      {girl && <>
        <circle cx={-78} cy={-350} r={28} fill={hair} />
        <circle cx={78} cy={-350} r={28} fill={hair} />
      </>}
      <circle cx={0} cy={-360} r={72} fill="#E8B98F" />
      {girl
        ? <path d="M -74 -360 Q -76 -440 0 -440 Q 76 -440 74 -360 Q 40 -410 -10 -396 Q -50 -386 -74 -360 Z" fill={hair} />
        : <path d="M -72 -366 Q -70 -438 0 -436 Q 74 -436 72 -370 Q 50 -398 0 -400 Q -46 -398 -72 -366 Z" fill={hair} />}
      <ellipse cx={-26} cy={-362} rx={8} ry={10 * blink} fill="#0A111D" />
      <ellipse cx={26} cy={-362} rx={8} ry={10 * blink} fill="#0A111D" />
      <circle cx={-44} cy={-336} r={10} fill="#FF8A8E" opacity={0.35} />
      <circle cx={44} cy={-336} r={10} fill="#FF8A8E" opacity={0.35} />
      <path d={`M -20 -328 Q 0 ${-328 + my} 20 -328`} stroke="#8A4B3A" strokeWidth={6} fill="none" strokeLinecap="round" />
    </g>
  );
};

/** Sparglas, Boden bei (0,0); fill 0..1 */
const Jar: React.FC<{ fill: number; col: string; label?: string; sub?: string; lc?: string; w?: number; h?: number }> = ({ fill, col, label, sub, lc = C.white, w = 220, h = 280 }) => {
  const rows = Math.round(fill * 11);
  return (
    <g>
      <ellipse cx={0} cy={6} rx={w * 0.55} ry={16} fill="#0A111D" opacity={0.35} />
      <rect x={-w / 2} y={-h} width={w} height={h} rx={36} fill="#86A9FF" opacity={0.12} />
      {Array.from({ length: rows }).map((_, i) => (
        <g key={i} transform={`translate(${((i * 37) % 30) - 15} ${-22 - i * (h - 50) / 11})`}>
          <ellipse rx={w * 0.38} ry={14} fill="#B9822F" transform="translate(0 6)" />
          <ellipse rx={w * 0.38} ry={14} fill={col} />
        </g>
      ))}
      <rect x={-w / 2} y={-h} width={w} height={h} rx={36} fill="none" stroke="#C9D3E2" strokeWidth={8} opacity={0.85} />
      <rect x={-w / 2 + 18} y={-h + 30} width={16} height={h * 0.55} rx={8} fill="#FFFFFF" opacity={0.25} />
      <rect x={-w / 2 + 14} y={-h - 34} width={w - 28} height={40} rx={12} fill="#5A6B88" />
      <rect x={-34} y={-h - 30} width={68} height={10} rx={5} fill="#0A111D" />
      {label && (
        <g transform={`translate(0 ${-h * 0.42})`}>
          <rect x={-w / 2 + 6} y={-50} width={w - 12} height={sub ? 112 : 92} rx={16} fill="#0A111D" opacity={0.82} />
          {sub && <text y={-14} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={30} fill={C.gray}>{sub}</text>}
          <text y={sub ? 40 : 14} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={label.length > 5 ? 44 : 58} fill={lc}>{label}</text>
        </g>
      )}
    </g>
  );
};

/** fallende Münzen in ein Glas (Glasöffnung bei y=top) */
const CoinRain: React.FC<{ f: number; top: number; col?: string; label?: string; n?: number; on?: number; drop?: number }> = ({ f, top, col = C.green, label = "", n = 3, on = 1, drop = 260 }) => (
  <g opacity={on}>
    {Array.from({ length: n }).map((_, i) => {
      const t = ((f + i * (30 / n)) % 30) / 30;
      const y = lerp(top - drop, top - 10, t * t);
      return <g key={i} transform={`translate(${noise2D(`c${i}`, f / 50, 0) * 14} ${y}) rotate(${f * 6 + i * 50})`} opacity={t < 0.92 ? 1 : 0}><Coin r={30} col={col} label={label} /></g>;
    })}
  </g>
);

/** Stichtag-Linie (rot, gestrichelt) */
const Cut: React.FC<{ x: number; y1: number; y2: number; p: number; f: number; label?: string }> = ({ x, y1, y2, p, f, label }) => (
  <g>
    <line opacity={p > 0.03 ? 1 : 0} x1={x} y1={y2} x2={x} y2={lerp(y2, y1, p)} stroke={C.red} strokeWidth={10} strokeDasharray="26 16" strokeDashoffset={f * 2} strokeLinecap="round" />
    {label && <g opacity={p} transform={`translate(${x} ${y1 - 40})`}><Pill w={label.length * 30 + 70} text={label} col={C.red} fg={C.white} s={40} h={74} /></g>}
  </g>
);

/** Haken / Sanduhr als Pfad (Sora hat kein ✓ / ⏳) */
const Check: React.FC<{ s?: number; col?: string }> = ({ s = 1, col = C.green }) => (
  <g transform={`scale(${s})`}><circle r={44} fill={col} /><path d="M -20 2 L -6 18 L 22 -14" stroke="#0A111D" strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>
);
const Glass: React.FC<{ f: number; s?: number; col?: string }> = ({ f, s = 1, col = C.amber }) => (
  <g transform={`scale(${s})`}>
    <circle r={44} fill={col} />
    <g transform={`rotate(${Math.floor(f / 45) % 2 ? 180 : 0})`}>
      <path d="M -18 -24 L 18 -24 L 0 0 L 18 24 L -18 24 L 0 0 Z" fill="none" stroke="#0A111D" strokeWidth={6} strokeLinejoin="round" />
      <path d="M -10 20 L 10 20 L 0 8 Z" fill="#0A111D" />
    </g>
  </g>
);

/** Parlamentsgebäude, stilisiert */
const Dome: React.FC = () => (
  <g>
    <rect x={-190} y={-150} width={380} height={150} fill="#C9D3E2" />
    <path d="M -130 -150 Q 0 -300 130 -150 Z" fill="#86A9FF" opacity={0.85} />
    {[-140, -70, 0, 70, 140].map((x) => <rect key={x} x={x - 14} y={-130} width={28} height={130} fill="#9AA8BF" />)}
    <rect x={-210} y={-170} width={420} height={24} fill="#5A6B88" />
    <rect x={-210} y={0} width={420} height={20} fill="#5A6B88" />
  </g>
);
const Hall: React.FC = () => (
  <g>
    <path d="M -200 -170 L 0 -260 L 200 -170 Z" fill="#9AA8BF" />
    <rect x={-190} y={-170} width={380} height={170} fill="#C9D3E2" />
    {[-150, -90, -30, 30, 90, 150].map((x) => <rect key={x} x={x - 12} y={-150} width={24} height={150} fill="#9AA8BF" />)}
    <rect x={-210} y={0} width={420} height={20} fill="#5A6B88" />
  </g>
);

/** Geburtstagstorte mit „6“ */
const Cake: React.FC<{ col: string; gray?: boolean; s?: number }> = ({ col, gray, s = 1 }) => (
  <g transform={`scale(${s})`}>
    <rect x={-80} y={-70} width={160} height={70} rx={14} fill={gray ? "#5A6B88" : "#F2C9D2"} />
    <rect x={-80} y={-70} width={160} height={18} rx={9} fill={gray ? "#9AA8BF" : "#FFFFFF"} />
    <rect x={-6} y={-130} width={12} height={58} rx={6} fill={gray ? "#9AA8BF" : C.white} />
    {!gray && <ellipse cx={0} cy={-142} rx={9} ry={15} fill={C.amber} />}
    <text y={-14} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={48} fill={gray ? C.gray : "#0A111D"}>6</text>
    <circle cx={0} cy={0} r={0} fill={col} />
  </g>
);

/** Kalenderblatt */
const Cal: React.FC<{ year: string; col: string; dim?: number }> = ({ year, col, dim = 0 }) => (
  <g opacity={1 - dim * 0.5}>
    <rect x={-150} y={-170} width={300} height={320} rx={24} fill="#EEF2F7" />
    <rect x={-150} y={-170} width={300} height={90} rx={24} fill={col} />
    <rect x={-150} y={-110} width={300} height={30} fill={col} />
    {[-90, 90].map((x) => <rect key={x} x={x - 9} y={-196} width={18} height={50} rx={9} fill="#5A6B88" />)}
    <text y={50} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={96} fill="#0A111D">{year}</text>
  </g>
);

/** Vorsorgedepot (Tresor-Box, ohne Marke) */
const Depot: React.FC = () => (
  <g>
    <rect x={-230} y={-200} width={460} height={340} rx={36} fill="#2A3F63" stroke="#86A9FF" strokeWidth={8} />
    <rect x={-70} y={-218} width={140} height={22} rx={11} fill="#0A111D" />
    <circle cx={0} cy={-40} r={70} fill="none" stroke="#86A9FF" strokeWidth={10} />
    {[0, 90, 180, 270].map((a) => <rect key={a} x={-5} y={-130} width={10} height={30} fill="#86A9FF" transform={`rotate(${a} 0 -40)`} />)}
    <text y={100} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={46} fill={C.white}>Vorsorgedepot</text>
  </g>
);

/** Schloss mit 65 */
const Lock: React.FC<{ s?: number }> = ({ s = 1 }) => (
  <g transform={`scale(${s})`}>
    <path d="M -90 -60 L -90 -130 Q -90 -220 0 -220 Q 90 -220 90 -130 L 90 -60" stroke="#C9D3E2" strokeWidth={34} fill="none" />
    <rect x={-150} y={-70} width={300} height={250} rx={36} fill={C.amber} />
    <text y={95} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={130} fill="#0A111D">65</text>
  </g>
);

/* ---------- Short ---------- */
export const Short13: React.FC<{ end: "yt" | "tt" }> = ({ end }) => {
  const f = useCurrentFrame();
  const TOT = DUR[end];
  const h1 = wk("hook", "eins") - 4;
  const b1 = ps("b1") - 4, b1b = wk("b1", "für") - 4, b1c = wk("b1", "bundestag") - 6;
  const b2 = ps("b2") - 4, b2b = wk("b2", "=ihr") - 4;
  const b3 = ps("b3") - 4, b3b = wk("b3", "also") - 4, b3c = wk("b3", "eigenes") - 4;
  const b4 = ps("b4") - 4, b4b = wk("b4", "ausgezahlt") - 4, b4c = wk("b4", "=so") - 4, fE = ps(end) - 8;

  /** Titelbild: zwei Geschwister mit Sparglas (auch Loop-Ende) */
  const twoKids = (f: number, a: number, cutAt: number, fillFrom: number, title = true) => {
    const fill = interpolate(f, [a, a + 150], [fillFrom, 0.85], CL);
    const cut = tw(f, cutAt, 18);
    return (
      <g>
        {title && <>
          <Txt x={540} y={330} s={104}>Geschwister:</Txt>
          <Txt x={540} y={450} s={96} c={C.amber}>0 € oder 1.440 €?</Txt>
        </>}
        <g transform="translate(215 1240)"><Kid f={f} shirt={BRO} mood={-0.6} seed={1} /></g>
        <g transform="translate(405 1250)"><Jar fill={0} col={BRO} label="0 €" lc={BRO} w={190} h={250} /></g>
        <g transform="translate(870 1240)"><Kid f={f} girl shirt={SIS} mood={1} seed={2} /></g>
        <g transform="translate(680 1250)">
          <Jar fill={fill} col={SIS} label="1.440 €" sub="bis zu" lc={SIS} w={190} h={250} />
          <CoinRain f={f} top={-250} />
        </g>
        <Cut x={540} y1={640} y2={1300} p={cut} f={f} />
        <Txt x={215} y={1340} s={52} c={BRO}>2019</Txt>
        <Txt x={870} y={1340} s={52} c={SIS}>2020</Txt>
      </g>
    );
  };

  const scenes = [
    { a: 0, b: h1, render: (f: number) => twoKids(f, 0, 30, 0.35) },
    {
      a: h1, b: b1, kind: "zoom" as const, render: (f: number) => {
        const cut = tw(f, h1 + 6, 22);
        const fill = interpolate(f, [h1, wk("hook", "euro")], [0.2, 0.9], CL);
        const z = pop(f, wk("hook", "null") - 2, 14);
        return (
          <g>
            <Txt x={540} y={340} s={88}>Ein Jahr Unterschied</Txt>
            <g transform="translate(290 1180)"><Jar fill={0} col={BRO} w={300} h={420} /></g>
            <g transform="translate(790 1180)">
              <Jar fill={fill} col={SIS} w={300} h={420} />
              <CoinRain f={f} top={-420} n={3} drop={140} />
            </g>
            <g transform={`translate(790 520) scale(${pop(f, wk("hook", "bis") - 2, 14)})`}><Pill w={400} text="bis zu 1.440 €" col={SIS} s={50} h={100} /></g>
            <g transform={`translate(290 520) scale(${z})`}><Pill w={240} text="0 €" col={BRO} s={64} h={110} /></g>
            <Cut x={540} y1={640} y2={1260} p={cut} f={f} label="Stichtag" />
            <Txt x={290} y={1300} s={52} c={BRO}>Bruder · 2019</Txt>
            <Txt x={790} y={1300} s={52} c={SIS}>Schwester · 2020</Txt>
            <Src o={tw(f, h1 + 10, 10)}>bis zu: 144 Monate × 10 € (eigene Rechnung, § 2 Entwurf)</Src>
          </g>
        );
      },
    },
    {
      a: b1, b: b1b, render: (f: number) => {
        const z = wk("b1", "zehn") - 2;
        const t = Math.max(0, f - z) % 34 / 34;
        const on = f >= z ? 1 : 0;
        return (
          <g>
            <g transform="translate(540 380)"><Pill w={700} text="Frühstart-Rente" col={C.blue} s={70} h={130} /></g>
            <g transform={`translate(540 520) rotate(-4) scale(${pop(f, wk("b1", "geplant") - 2, 12)})`}><Pill w={230} text="geplant" col={C.amber} s={40} h={70} /></g>
            <g transform="translate(540 1050)"><Depot /></g>
            <g opacity={on * (t < 0.9 ? 1 : 0)} transform={`translate(540 ${lerp(640, 860, t * t)})`}><Coin r={80} label="10 €" col={C.green} /></g>
            <g transform={`translate(540 1300) scale(${pop(f, wk("b1", "monat") - 2, 14)})`}><Pill w={480} text="10 € / Monat" col={C.green} s={58} h={110} /></g>
            <Src o={tw(f, b1 + 8, 10)}>Entwurf BT-Drs. 21/7864, § 2 Abs. 1</Src>
            <Src y={245} o={tw(f, wk("b1", "vorsorgedepot"), 10)}>Ohne Depot legt der Staat das Geld gesammelt an</Src>
          </g>
        );
      },
    },
    {
      a: b1b, b: b1c, render: (f: number) => {
        const g = interpolate(f, [wk("b1", "sechs") - 4, wk("b1", "achtzehn") + 6], [0, 1], { ...CL, easing: IO });
        const x0 = 170, x1 = 910, xs = (a: number) => lerp(x0, x1, (a - 6) / 12);
        return (
          <g>
            <Txt x={540} y={380} s={110}>6 bis 18 Jahre</Txt>
            <rect x={x0} y={1010} width={x1 - x0} height={40} rx={20} fill="#2A3F63" />
            <rect x={x0} y={1010} width={(x1 - x0) * g} height={40} rx={20} fill={C.green} />
            {[6, 8, 10, 12, 14, 16, 18].map((a) => (
              <g key={a}>
                <rect x={xs(a) - 3} y={1060} width={6} height={30} fill="#5A6B88" />
                <Txt x={xs(a)} y={1140} s={a === 6 || a === 18 ? 56 : 40} c={a === 6 || a === 18 ? C.white : C.gray}>{a}</Txt>
              </g>
            ))}
            <g transform={`translate(${lerp(x0, x1, g)} 990) scale(${lerp(0.6, 1, g)})`}><Kid f={f} girl shirt={SIS} seed={3} /></g>
            <Txt x={540} y={1280} s={46} c={C.gray} w={700}>monatlich 10 € pro Kind</Txt>
            <Src o={tw(f, b1b + 6, 10)}>§ 1 Abs. 2 Entwurf · ab 6., bis vor dem 18. Geburtstag</Src>
          </g>
        );
      },
    },
    {
      a: b1c, b: b2, render: (f: number) => {
        const t1 = pop(f, wk("b1", "beschlossen") - 2, 14), t2 = pop(f, wk("b1", "zustimmen") - 2, 14);
        return (
          <g>
            <Txt x={540} y={360} s={96}>Wo steht das Gesetz?</Txt>
            <g transform="translate(290 900) scale(1.05)"><Dome /></g>
            <g transform="translate(790 900) scale(1.05)"><Hall /></g>
            <Txt x={290} y={990} s={50}>Bundestag</Txt>
            <Txt x={790} y={990} s={50}>Bundesrat</Txt>
            <g transform={`translate(290 560) scale(${t1})`}><Check s={1.6} /></g>
            <g transform={`translate(790 560) scale(${t2})`}><Glass f={f} s={1.6} /></g>
            <g opacity={tw(f, wk("b1", "zustimmen") + 4, 12)} transform="translate(540 1200)">
              <rect x={-470} y={-60} width={940} height={120} rx={60} fill="#0A111D" opacity={0.6} />
              <rect x={-460} y={-50} width={440} height={100} rx={50} fill={C.green} />
              <text x={-280} y={18} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={44} fill="#0A111D">Bundestag</text>
              <g transform="translate(-80 0) scale(0.7)"><Check col="#0A111D" /></g>
              <g transform="translate(-80 0) scale(0.7)"><path d="M -20 2 L -6 18 L 22 -14" stroke={C.green} strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>
              <rect x={20} y={-50} width={440} height={100} rx={50} fill={C.amber} />
              <text x={240} y={18} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={44} fill="#0A111D">Bundesrat offen</text>
            </g>
            <Src o={tw(f, b1c + 6, 10)}>Bundestag beschlossen 16.10.2026 (Drs. 21/8606)</Src>
            <Src y={245} o={tw(f, b1c + 6, 10)}>Zustimmung des Bundesrats steht aus</Src>
          </g>
        );
      },
    },
    {
      a: b2, b: b2b, render: (f: number) => {
        const yrs = [2018, 2019, 2020, 2021, 2022], x = (i: number) => 140 + i * 200;
        const hl = tw(f, wk("b2", "zweitausendzwanzig") - 4, 14);
        const ck = pop(f, wk("b2", "sechs") - 2, 14);
        return (
          <g>
            <Txt x={540} y={340} s={88}>Start: Jahrgang</Txt>
            <Txt x={540} y={460} s={110} c={C.green}>2020</Txt>
            <line x1={80} y1={1000} x2={1000} y2={1000} stroke="#2A3F63" strokeWidth={10} strokeLinecap="round" />
            {yrs.map((y, i) => (
              <g key={y}>
                <circle cx={x(i)} cy={1000} r={y === 2020 ? lerp(18, 34, hl) : 16} fill={y === 2020 ? C.green : "#5A6B88"} />
                <Txt x={x(i)} y={1100} s={y === 2020 ? 64 : 44} c={y === 2020 ? C.green : C.gray} o={y === 2020 ? 1 : 0.7}>{y}</Txt>
              </g>
            ))}
            <Cut x={440} y1={760} y2={1060} p={hl} f={f} />
            <g transform={`translate(${x(2)} 930) scale(${ck})`}><Cake col={C.green} s={1.3} /></g>
            <g transform={`translate(${x(2)} 640) scale(${ck})`}><Pill w={400} text="wird 2026 6" col={C.green} s={48} h={92} /></g>
            <Txt x={540} y={1260} s={44} c={C.gray} w={700} o={ck}>danach jedes Jahr ein Jahrgang mehr</Txt>
            <Src o={tw(f, b2 + 6, 10)}>§ 30 Abs. 1 Entwurf · Begründung, Allg. Teil</Src>
          </g>
        );
      },
    },
    {
      a: b2b, b: b3, render: (f: number) => {
        const c27 = pop(f, wk("b2", "zweitausendsieben") - 2, 14);
        const back = tw(f, wk("b2", "nachgezahlt") - 6, 18);
        const fill = interpolate(f, [wk("b2", "nachgezahlt") - 6, wk("b2", "nachgezahlt") + 30], [0.15, 0.45], CL);
        return (
          <g>
            <Txt x={540} y={340} s={88}>Geld kommt 2027</Txt>
            <g transform="translate(290 820)"><Cal year="2026" col="#5A6B88" /></g>
            <g transform={`translate(790 820) scale(${c27})`}><Cal year="2027" col={C.green} /></g>
            <g opacity={back}>
              <path d="M 700 1030 Q 540 1150 380 1030" stroke={C.green} strokeWidth={12} fill="none" strokeDasharray="22 14" strokeDashoffset={f * 2} />
              <path d="M 380 1030 l 40 -6 l -20 36 Z" fill={C.green} stroke={C.green} strokeWidth={10} strokeLinejoin="round" />
              <g transform="translate(540 1180)"><Pill w={560} text="2026 nachgezahlt" col={C.green} s={52} h={100} /></g>
            </g>
            <g transform="translate(540 590) scale(0.55)" opacity={back}><Jar fill={fill} col={SIS} /></g>
            <Src o={tw(f, b2b + 6, 10)}>§ 30 Abs. 1 · Haushaltsbegründung BR-Drs. 445/26</Src>
            <Src y={245} o={tw(f, b2b + 6, 10)}>DRV, 19.10.2026 · Überweisung vierteljährlich</Src>
          </g>
        );
      },
    },
    {
      a: b3, b: b3b, render: (f: number) => {
        const yrs = [2024, 2025, 2026, 2027], x = (i: number) => 180 + i * 240;
        const bro = pop(f, wk("b3", "zweitausendneunzehn") - 2, 14);
        const sx = pop(f, wk("b3", "sechs") - 2, 14);
        return (
          <g>
            <Txt x={540} y={340} s={88}>Wann wurden sie 6?</Txt>
            <line x1={80} y1={1000} x2={1000} y2={1000} stroke="#2A3F63" strokeWidth={10} strokeLinecap="round" />
            {yrs.map((y, i) => (
              <g key={y}>
                <circle cx={x(i)} cy={1000} r={16} fill="#5A6B88" />
                <Txt x={x(i)} y={1090} s={48} c={C.gray}>{y}</Txt>
              </g>
            ))}
            <Cut x={540} y1={620} y2={1060} p={1} f={f} label="Start 2026" />
            <g transform={`translate(${x(1)} 930) scale(${bro})`}><Cake col={BRO} gray s={1.2} /></g>
            <g transform={`translate(${x(1) - 50} 760) scale(${bro})`}><Pill w={300} text="Bruder 2019" col={BRO} s={40} h={80} /></g>
            <g transform={`translate(${x(2)} 930) scale(${sx})`}><Cake col={SIS} s={1.2} /></g>
            <g transform={`translate(${x(2) + 95} 760) scale(${sx})`}><Pill w={390} text="Schwester 2020" col={SIS} s={40} h={80} /></g>
            <g transform={`translate(${x(1)} 1240) scale(${sx})`}><Pill w={360} text="schon vorher 6" col="#5A6B88" fg={C.white} s={44} h={90} /></g>
            <Src o={tw(f, b3 + 6, 10)}>§ 30 Abs. 1 Entwurf: erster Jahrgang 2020</Src>
          </g>
        );
      },
    },
    {
      a: b3b, b: b3c, render: (f: number) => (
        <g>
          <Txt x={540} y={340} s={96}>Jahrgang 2019:</Txt>
          <Txt x={540} y={460} s={96} c={BRO}>0 € vom Staat</Txt>
          <g transform="translate(330 1250) scale(1.15)"><Kid f={f} shirt={BRO} mood={-1} seed={4} /></g>
          <g transform="translate(720 1250)"><Jar fill={0} col={BRO} label="0 €" lc={BRO} w={280} h={400} /></g>
          <Stamp f={f} at={wk("b3", "anteilig") - 4} x={560} y={700} text="auch nicht anteilig" s={0.62} col={C.red} rot={-7} />
          <Src o={tw(f, b3b + 6, 10)}>§ 30 Abs. 1 Entwurf</Src>
        </g>
      ),
    },
    {
      a: b3c, b: b4, render: (f: number) => {
        const fill = interpolate(f, [b3c + 6, b4], [0, 0.35], CL);
        return (
          <g>
            <Txt x={540} y={340} s={96}>Eigenes Geld</Txt>
            <Txt x={540} y={450} s={70} c={C.blue}>geht trotzdem</Txt>
            <g transform="translate(330 1250) scale(1.15)"><Kid f={f} shirt={BRO} mood={0} seed={4} /></g>
            <g transform="translate(720 1250)">
              <Jar fill={fill} col={C.blue} w={280} h={400} />
              <CoinRain f={f} top={-400} col={C.blue} />
            </g>
            <g transform={`translate(720 640) scale(${pop(f, wk("b3", "einzahlen") - 2, 14)})`}><Pill w={460} text="nur eigenes Geld" col={C.blue} s={48} h={96} /></g>
            <Src o={tw(f, b3c + 4, 10)}>§ 3 Abs. 4 Entwurf: Vertrag ohne staatliche Zuwendungen</Src>
          </g>
        );
      },
    },
    {
      a: b4, b: b4b, render: (f: number) => {
        const l1 = pop(f, wk("b4", "zwölf") - 2, 14), l2 = pop(f, wk("b4", "hundertzwanzig") - 2, 14);
        const l3 = pop(f, wk("b4", "euro") + 2, 14), hs = pop(f, wk("b4", "höchstens") - 2, 14);
        return (
          <g>
            <Txt x={540} y={340} s={88}>Die Rechnung</Txt>
            <g transform="translate(540 640)">
              <g transform={`scale(${l1})`} opacity={Math.min(1, l1 * 2)}><Txt x={0} y={0} s={120}>12 Jahre</Txt></g>
            </g>
            <g transform="translate(540 820)">
              <g transform={`scale(${l2})`} opacity={Math.min(1, l2 * 2)}><Txt x={0} y={0} s={120}>× 120 €</Txt></g>
            </g>
            <rect x={200} y={880} width={680 * l3} height={10} rx={5} fill={C.gray} />
            <g transform="translate(540 1050)">
              <g transform={`scale(${l3})`} opacity={Math.min(1, l3 * 2)}><Txt x={0} y={0} s={140} c={C.green}>= 1.440 €</Txt></g>
            </g>
            <g transform={`translate(540 1230) rotate(-4) scale(${hs})`}><Pill w={420} text="höchstens" col={C.amber} s={62} h={116} /></g>
            <Src o={tw(f, b4 + 6, 10)}>144 Monate × 10 € bei durchgehender Berechtigung</Src>
            <Src y={245} o={tw(f, b4 + 6, 10)}>eigene Rechnung aus § 1 Abs. 2, § 2 Entwurf</Src>
          </g>
        );
      },
    },
    {
      a: b4b, b: b4c, render: (f: number) => (
        <g>
          <Txt x={540} y={340} s={88}>Auszahlung</Txt>
          <Txt x={540} y={450} s={80} c={C.amber}>frühestens mit 65</Txt>
          <g transform={`translate(540 960) scale(${pop(f, b4b + 4, 16)})`}><Lock s={1.3} /></g>
          <Txt x={540} y={1290} s={44} c={C.gray} w={700} o={tw(f, wk("b4", "grundsätzlich"), 12)}>grundsätzlich nicht vorher</Txt>
          <Src o={tw(f, b4b + 4, 10)}>Begründung RegE · Keine Garantie, Verluste möglich (§ 27)</Src>
          <Src y={245} o={tw(f, b4b + 4, 10)}>Keine Anlageberatung</Src>
        </g>
      ),
    },
    {
      a: b4c, b: fE, render: (f: number) => (
        <g>
          {twoKids(f, b4c, b4c - 30, 0.6, false)}
          <Txt x={540} y={330} s={96}>Ein Geburtsjahr</Txt>
          <Txt x={540} y={450} s={96} c={C.amber}>trennt Geschwister</Txt>
          <Src o={tw(f, b4c + 4, 10)}>Stand 25.10.2026 · Gesetz noch nicht in Kraft</Src>
          <Src y={245} o={tw(f, b4c + 4, 10)}>Keine Anlage- oder Steuerberatung</Src>
        </g>
      ),
    },
  ];

  const hi = ["geschwister", "null", "frühstart", "bundesrat", "zustimmen", "nachgezahlt", "anteilig", "eigenes", "höchstens", "einziges", "geburtsjahr", "fair"];
  const cs = chunks(D.paras as any, ["hook", "b1", "b2", "b3", "b4", ...(end === "tt" ? ["tt"] : [])], [
    ["zwei geschwister", "2 Geschwister"], ["eintausendvierhundertvierzig euro", "1.440 €"], ["null", "0 €"],
    ["zehn euro", "10 €"], ["sechs bis achtzehn", "6 bis 18"], ["sechs", "6"],
    ["zweitausendzwanzig", "2020"], ["zweitausendsiebenundzwanzig", "2027"], ["zweitausendneunzehn", "2019"],
    ["zwölf jahre", "12 Jahre"], ["hundertzwanzig euro", "120 €"], ["fünfundsechzig", "65"],
  ]);
  const subEnd = end === "tt" ? TOT - 6 : pe("b4") + 8;
  const endIn = tw(f, fE, 16);

  const sfx: [number, string, number?][] = [
    [2, "coins", 0.5], [30, "soft", 0.6], [h1, "whoosh", 0.6], [wk("hook", "bis") - 2, "ding", 0.5], [wk("hook", "null") - 2, "soft", 0.8],
    [b1 - 4, "whoosh", 0.7], [wk("b1", "zehn") - 2, "coins", 0.6], [b1b - 4, "whoosh", 0.6],
    [b1c - 4, "whoosh", 0.6], [wk("b1", "beschlossen") - 2, "ding", 0.5], [wk("b1", "zustimmen") - 2, "soft", 0.7],
    [b2 - 4, "whoosh", 0.7], [wk("b2", "sechs") - 2, "marimba", 0.5], [b2b - 4, "paper", 0.6], [wk("b2", "nachgezahlt") - 6, "coins", 0.5],
    [b3 - 4, "whoosh", 0.7], [b3b - 4, "whoosh", 0.6], [wk("b3", "anteilig") - 4, "stamp", 0.6], [b3c - 4, "coins", 0.5],
    [b4 - 4, "whoosh", 0.7], [wk("b4", "euro") + 2, "ding", 0.6], [wk("b4", "höchstens") - 2, "soft", 0.7],
    [b4b, "soft", 0.7], [b4c - 4, "whoosh", 0.6], [fE - 6, "whoosh", 0.8],
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
              ? <EndYT f={f} at={fE} line="Wir lesen das Kleingedruckte." />
              : <EndTT f={f} at={fE} q={["Ein Stichtag:", "Fair oder nicht?"]} opts={[["Fair", C.green], ["Unfair", C.red], ["Weiß nicht", C.blue]]} />}
          </g>
        )}
      </svg>
      <Sub f={f} cs={cs} end={subEnd} hi={hi} />
      <Grain f={f} />
      <Audio src={staticFile(`audio/s13_${end}.wav`)} />
      <SfxTrack list={sfx} />
    </AbsoluteFill>
  );
};
export const Short13YT: React.FC = () => <Short13 end="yt" />;
export const Short13TT: React.FC = () => <Short13 end="tt" />;
