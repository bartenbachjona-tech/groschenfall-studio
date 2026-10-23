import React from "react";
import { useCurrentFrame } from "remotion";
import T from "../data/v5ch3.json";
import { Timing } from "../kit/core";
import { Sfx } from "../kit/Chapter";
import { BarV, C, FONT, Pop, Scenes, SceneDef, Slip, Tx, V5Shell, interpolate, CL, OUT, IO, SPR, lerp, mkA, mkPS, pop, tw } from "./kit5";

const TM = T as Timing;
export const V5CH3_DUR = Math.ceil(TM.total * 30);
const A = mkA(TM), PS = mkPS(TM);
const fGelb = A(0, "gelben"), fTeil = A(0, "teil"), fNicht = A(0, "nicht"), fSchub = A(0, "schublade"), fStat = A(0, "statistik");
const fElek = A(1, "elektronisch"), fJeder = A(1, "jeder");
const fAOK = A(2, "aok"), f65 = A(2, "fünfundsechzig"), f86 = A(2, "sechsundachtzig"), fSchwere = A(2, "schwere"), fGez = A(2, "gezählt");
const fZwei = A(3, "zweieinhalb"), fVoll = A(3, "vollständiger");

const House: React.FC<{ label: string; col: string }> = ({ label, col }) => (
  <g>
    <path d="M -150 -40 L 0 -150 L 150 -40 Z" fill={col} />
    <rect x={-130} y={-40} width={260} height={210} fill="#2A3F63" />
    {[-80, -20, 40].map((x) => <rect key={x} x={x} y={0} width={40} height={130} rx={6} fill="#16243B" />)}
    <Tx x={0} y={230} s={36}>{label}</Tx>
  </g>
);

const S: SceneDef[] = [
  {
    a: 0, b: PS(1) - 8, render: (f) => {
      const split = interpolate(f, [fTeil, fTeil + 20], [0, 1], { ...CL, easing: IO });
      const drop = interpolate(f, [fNicht + 6, fSchub + 6], [0, 1], { ...CL, easing: IO });
      return (
        <g>
          <g transform="translate(330 560)" opacity={tw(f, fTeil, 12)}><House label="Arbeitgeber" col="#3A5A9A" /></g>
          <g transform="translate(1590 560)" opacity={tw(f, fTeil, 12)}><House label="Krankenkasse" col={C.green} /></g>
          {/* Schublade */}
          <g transform="translate(960 900)" opacity={tw(f, fNicht, 12)}>
            <rect x={-200} y={-60} width={400} height={130} rx={14} fill="#7A4E36" />
            <rect x={-60} y={-10} width={120} height={20} rx={10} fill="#5B3A29" />
            <Tx x={0} y={120} s={32} c={C.gray} w={700}>Schublade</Tx>
          </g>
          {/* Zettel-Teile */}
          <g transform={`translate(${lerp(960, 420, split)} ${lerp(450, 470, split)}) rotate(${lerp(0, -8, split)})`}><Slip s={0.9} label="AU" /></g>
          <g transform={`translate(${lerp(960, lerp(1500, 960, drop), split)} ${lerp(450, lerp(470, 860, drop), split)}) rotate(${lerp(0, 25, drop)})`}><Slip s={0.9} label="AU" /></g>
          <g transform="translate(960 450)" opacity={1 - split}><Slip s={1.1} label="AU" /></g>
          <Tx x={960} y={200} s={64} c="#FFD84D" o={tw(f, fGelb, 12)}>Der gelbe Zettel</Tx>
          <Pop f={f} at={fStat} x={1560} y={900}><rect x={-230} y={-60} width={460} height={110} rx={20} fill={C.deep} /><text y={18} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={44} fill={C.white}>Statistik: <tspan fill={C.green}>0 Tage krank</tspan></text></Pop>
        </g>
      );
    },
  },
  {
    a: PS(1) - 6, b: PS(2) - 8, kind: "slide", render: (f) => {
      const n = Math.floor(interpolate(f, [fJeder, fJeder + 60], [0, 9], CL));
      return (
        <g>
          {/* Praxis-PC */}
          <g transform="translate(380 520)">
            <rect x={-170} y={-130} width={340} height={230} rx={20} fill="#1A2233" stroke="#5A6B88" strokeWidth={6} />
            <rect x={-150} y={-110} width={300} height={190} rx={10} fill="#2A3F63" />
            <g transform="translate(0 -10)"><Slip s={0.6} label="eAU" col="#EEF2F7" /></g>
            <rect x={-30} y={100} width={60} height={60} fill="#5A6B88" /><rect x={-100} y={160} width={200} height={20} rx={10} fill="#5A6B88" />
            <Tx x={0} y={250} s={36}>Arztpraxis</Tx>
          </g>
          <g transform="translate(1540 540)"><House label="Krankenkasse" col={C.green} /></g>
          {Array.from({ length: 6 }).map((_, i) => {
            const t = ((f - fElek + i * 12) % 72) / 72;
            if (f < fElek) return null;
            return <g key={i} transform={`translate(${lerp(560, 1380, t)} ${500 - Math.sin(t * Math.PI) * 90})`} opacity={Math.sin(t * Math.PI)}><rect x={-30} y={-20} width={60} height={40} rx={6} fill="#EEF2F7" /></g>;
          })}
          <Tx x={960} y={230} s={60} o={tw(f, fElek - 6, 12)}>Seit 2022: automatisch an die Kasse</Tx>
          <Pop f={f} at={fJeder} x={960} y={860}><rect x={-240} y={-60} width={480} height={110} rx={20} fill={C.deep} /><text y={18} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={44} fill={C.white}>gezählt: <tspan fill={C.red}>{n} Fälle</tspan></text></Pop>
        </g>
      );
    },
  },
  {
    a: PS(2) - 6, b: PS(3) - 8, kind: "slide", render: (f) => (
      <g>
        <Tx x={960} y={160} s={44} c={C.gray} w={700} o={tw(f, fAOK - 6, 12)}>Arztbesuch wegen Atemwegsinfekt –</Tx>
        <Tx x={960} y={215} s={44} c={C.gray} w={700} o={tw(f, fAOK - 6, 12)}>Krankmeldung kommt bei der Kasse an (AOK)</Tx>
        <line x1={460} y1={860} x2={1460} y2={860} stroke="#2A3F63" strokeWidth={6} />
        <BarV f={f} at={f65} x={720} base={860} h={65 * 5.5} w={260} col="#86A9FF" label="2019" val="65 %" />
        <BarV f={f} at={f86} x={1200} base={860} h={86 * 5.5} w={260} col={C.red} label="2024" val="86 %" />
        <Pop f={f} at={fSchwere} x={960} y={330}><rect x={-330} y={-50} width={660} height={96} rx={48} fill={C.deep} /><text y={14} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={40} fill={C.white}>Schwere der Krankheiten: <tspan fill={C.green}>kaum verändert</tspan></text></Pop>
        <Pop f={f} at={fGez} x={1640} y={520}><Tx x={0} y={0} s={60} c={C.amber}>mehr</Tx><Tx x={0} y={66} s={60} c={C.amber}>gezählt</Tx></Pop>
      </g>
    ),
  },
  {
    a: PS(3) - 6, b: V5CH3_DUR + 20, kind: "zoom", render: (f) => {
      const g = interpolate(f, [PS(3), PS(3) + 30], [0, 1], { ...CL, easing: OUT });
      const hatch = tw(f, fZwei - 4, 16);
      const H = 620, base = 900, top = base - H * g, cut = base - H * (20.8 / 23.3) * g;
      return (
        <g>
          <defs><pattern id="hatch" width="22" height="22" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="22" height="22" fill="#5A6B88" /><rect width="9" height="22" fill="#9AA8BF" /></pattern></defs>
          <rect x={720} y={top} width={300} height={H * g} rx={18} fill={C.red} />
          <rect x={720} y={top} width={300} height={(cut - top)} rx={18} fill="url(#hatch)" opacity={hatch} />
          <Tx x={870} y={top - 30} s={64}>23,3 Tage</Tx>
          <Tx x={870} y={base + 56} s={34} c={C.gray} w={700}>AOK-Versicherte 2025</Tx>
          <g opacity={hatch}>
            <path d={`M 1040 ${top + 10} L 1120 ${top + 10} L 1120 ${cut - 10} L 1040 ${cut - 10}`} fill="none" stroke={C.amber} strokeWidth={6} />
            <Tx x={1150} y={(top + cut) / 2 + 4} s={58} c={C.amber} a="start">2,5 Tage</Tx>
            <Tx x={1150} y={(top + cut) / 2 + 58} s={38} c={C.gray} a="start" w={700}>nur durch bessere Zählung</Tx>
          </g>
          <Tx x={600} y={(cut + base) / 2} s={44} a="end" o={tw(f, fVoll, 12)}>20,8 ohne Effekt</Tx>
        </g>
      );
    },
  },
];

export const V5Ch3: React.FC = () => {
  const f = useCurrentFrame();
  const sfx: Sfx[] = [
    [fGelb, "paper", 0.6], [fTeil, "whoosh", 0.4], [fSchub + 4, "soft", 0.6], [fStat, "ding", 0.5],
    [PS(1) - 10, "whoosh", 0.7], [fElek, "marimba", 0.5], [fJeder, "soft", 0.5],
    [PS(2) - 10, "whoosh", 0.7], [f65, "soft", 0.5], [f86, "soft", 0.5], [fSchwere, "soft", 0.5],
    [PS(3) - 10, "whoosh", 0.7], [fZwei - 4, "ding", 0.6],
  ];
  return <V5Shell n={3} title="Der gelbe Zettel" total={TM.total} sfx={sfx}><Scenes f={f} list={S} /></V5Shell>;
};
