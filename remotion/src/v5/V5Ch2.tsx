import React from "react";
import { useCurrentFrame } from "remotion";
import T from "../data/v5ch2.json";
import { Timing } from "../kit/core";
import { Sfx } from "../kit/Chapter";
import { BarV, C, Cash, FONT, Figure, Mag, Pop, Scenes, SceneDef, Sick, Tx, V5Shell, interpolate, CL, OUT, IO, lerp, mkA, mkPS, pop, tw } from "./kit5";

const TM = T as Timing;
export const V5CH2_DUR = Math.ceil(TM.total * 30);
const A = mkA(TM), PS = mkPS(TM);
const fPunkt = A(0, "punkt"), fBund = A(0, "bundesamt"), f148 = A(0, "vierzehn"), f36 = A(0, "drei");
const fKost = A(1, "kostet"), f86 = A(1, "sechsundachtzig"), fDopp = A(1, "doppelt"), fKlein = A(1, "kleinen");
const fBaeck = A(2, "bäckerei"), fFaellt = A(2, "fällt"), fLohn = A(2, "lohn"), fJemand = A(2, "jemanden"), fFrage = A(2, "frage"), fUeber = A(2, "überprüfen");
const fSprung = A(3, "sprung"), fPloetz = A(3, "plötzlich"), f2022 = A(3, "zweitausendzweiundzwanzig"), fGeaend = A(3, "geändert");

const Bubble: React.FC<{ f: number; at: number; x: number; y: number; text: string; cross?: number }> = ({ f, at, x, y, text, cross }) => {
  const p = pop(f, at, 14);
  if (f < at) return null;
  const w = text.length * 26 + 80;
  return (
    <g transform={`translate(${x} ${y}) scale(${p})`}>
      <rect x={-w / 2} y={-55} width={w} height={110} rx={55} fill="#EEF2F7" />
      <circle cx={-w / 4} cy={80} r={16} fill="#EEF2F7" /><circle cx={-w / 4 - 30} cy={112} r={9} fill="#EEF2F7" />
      <text y={16} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={44} fill="#0A111D">{text}</text>
      {cross !== undefined && <line x1={-w / 2 + 30} y1={0} x2={-w / 2 + 30 + (w - 60) * tw(f, cross, 10)} y2={0} stroke={C.red} strokeWidth={10} strokeLinecap="round" />}
    </g>
  );
};

const S: SceneDef[] = [
  {
    a: 0, b: PS(1) - 8, render: (f) => (
      <g>
        <Tx x={960} y={170} s={46} c={C.gray} w={700} o={tw(f, fBund - 6, 12)}>Krankheitstage pro Beschäftigtem · Statistisches Bundesamt</Tx>
        <line x1={420} y1={860} x2={1500} y2={860} stroke="#2A3F63" strokeWidth={6} />
        <BarV f={f} at={fBund} x={700} base={860} h={420} w={240} col="#86A9FF" label="2021" val="11,2" />
        <BarV f={f} at={f148} x={1220} base={860} h={555} w={240} col={C.red} label="2024" val="14,8" />
        <Pop f={f} at={f36} x={960} y={420}><rect x={-130} y={-56} width={260} height={92} rx={46} fill={C.amber} /><text y={12} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={50} fill={C.deep}>+3,6 Tage</text></Pop>
      </g>
    ),
  },
  {
    a: PS(1) - 6, b: PS(2) - 8, kind: "slide", render: (f) => {
      const g = interpolate(f, [fKost, f86 + 10], [0, 1], { ...CL, easing: OUT });
      return (
        <g>
          {[0, 1, 2, 3, 4].map((i) => <Cash key={i} x={620 + i * 170} y={900} h={(240 + (i % 3) * 90) * g} w={150} />)}
          <Pop f={f} at={f86} x={960} y={300}><Tx x={0} y={0} s={150} c={C.green}>85,6 Mrd. €</Tx><Tx x={0} y={70} s={40} c={C.gray} w={700}>Lohnfortzahlung 2025 (IW)</Tx></Pop>
          <g opacity={tw(f, fDopp - 4, 12)}>
            <g transform="translate(1600 900)"><Cash x={0} y={0} h={180} w={120} /><Tx x={0} y={60} s={30} c={C.gray} w={700}>vor 15 Jahren</Tx></g>
            <Tx x={1600} y={640} s={44} c={C.amber}>×2</Tx>
          </g>
          <g opacity={tw(f, fKlein - 6, 12)}>
            <Figure f={f} x={300} y={570} s={0.75} shirt="#3A4560" hair="#4A3A30" shockAt={fKlein} />
          </g>
        </g>
      );
    },
  },
  {
    a: PS(2) - 6, b: PS(3) - 8, kind: "slide", render: (f) => {
      const leave = interpolate(f, [fFaellt + 8, fFaellt + 40], [0, 1], { ...CL, easing: IO });
      return (
        <g>
          {/* Bäckerei-Theke */}
          <rect x={300} y={160} width={1320} height={90} rx={16} fill="#7A4E36" />
          <Tx x={960} y={225} s={56} c="#FFE7C2">BÄCKEREI</Tx>
          {[0, 1].map((i) => <Figure key={i} f={f} x={640 + i * 320} y={470} s={0.8} shirt="#EEF2F7" sleeve="#DDE4EE" shockAt={fJemand + i * 4} blinkSeed={i} />)}
          <g transform={`translate(${lerp(0, 700, leave)} 0)`} opacity={1 - leave * 0.6}>
            <Figure f={f} x={1280} y={470} s={0.8} shirt="#EEF2F7" sleeve="#DDE4EE" blinkSeed={3} />
            <g opacity={tw(f, fFaellt, 8)}><Sick x={1280} y={470} s={0.8} /></g>
          </g>
          <rect x={360} y={760} width={1200} height={220} rx={20} fill="#5B3A29" />
          <rect x={360} y={760} width={1200} height={40} rx={20} fill="#7A4E36" />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => <ellipse key={i} cx={460 + i * 165} cy={740} rx={60} ry={30} fill="#D9A15B" />)}
          <Pop f={f} at={fLohn} x={1700} y={560}><circle r={50} fill={C.amber} /><text y={18} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={50} fill={C.deep}>€</text></Pop>
          <Bubble f={f} at={fFrage + 4} x={620} y={330} text="Ist jemand krank?" cross={fUeber - 4} />
          <Bubble f={f} at={fUeber - 4} x={1250} y={330} text="Kann ich das überprüfen?" />
        </g>
      );
    },
  },
  {
    a: PS(3) - 6, b: V5CH2_DUR + 20, kind: "zoom", render: (f) => {
      const xs = [2018, 2019, 2020, 2021, 2022, 2023, 2024];
      const px = (i: number) => 420 + i * 180, py = (i: number) => (i < 4 ? 760 - i * 6 : 470 - (i - 4) * 8);
      const d = xs.map((_, i) => `${i ? "L" : "M"}${px(i)} ${py(i)}`).join(" ");
      const g = interpolate(f, [PS(3), PS(3) + 30], [0, 1], { ...CL, easing: OUT });
      const hi = tw(f, fSprung, 12);
      return (
        <g>
          <Tx x={960} y={170} s={44} c={C.gray} w={700}>Krankheitstage (vereinfacht)</Tx>
          <line x1={360} y1={860} x2={1560} y2={860} stroke="#2A3F63" strokeWidth={6} />
          {xs.map((y, i) => <Tx key={y} x={px(i)} y={920} s={34} c={i === 4 ? C.amber : C.gray} w={700}>{y}</Tx>)}
          <path d={d} fill="none" stroke={C.red} strokeWidth={14} strokeLinejoin="round" strokeLinecap="round" strokeDasharray={`${3000 * g} 3000`} />
          <rect x={px(3) + 20} y={440} width={140} height={340} rx={20} fill={C.amber} opacity={0.18 * hi} />
          <Pop f={f} at={f2022 - 4} x={px(4) - 80} y={560}><Mag x={0} y={0} s={1.2} /></Pop>
          <Pop f={f} at={fGeaend} x={1450} y={330}><Tx x={0} y={0} s={140} c={C.amber}>?</Tx></Pop>
        </g>
      );
    },
  },
];

export const V5Ch2: React.FC = () => {
  const f = useCurrentFrame();
  const sfx: Sfx[] = [
    [fBund, "soft", 0.5], [f148, "soft", 0.5], [f36, "ding", 0.5],
    [PS(1) - 10, "whoosh", 0.7], [fKost, "coins", 0.6], [f86, "soft", 0.6],
    [PS(2) - 10, "whoosh", 0.7], [fFaellt + 8, "whoosh", 0.4], [fLohn, "coin", 0.6], [fFrage + 4, "soft", 0.5], [fUeber - 4, "soft", 0.5],
    [PS(3) - 10, "whoosh", 0.7], [f2022 - 4, "soft", 0.6], [fGeaend, "marimba", 0.5],
  ];
  return <V5Shell n={2} title="Die Zahl hinter dem Vorwurf" total={TM.total} sfx={sfx}><Scenes f={f} list={S} /></V5Shell>;
};
