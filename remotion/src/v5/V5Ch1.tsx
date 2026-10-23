import React from "react";
import { useCurrentFrame } from "remotion";
import T from "../data/v5ch1.json";
import { Timing } from "../kit/core";
import { Sfx } from "../kit/Chapter";
import { C, Check, Days, FONT, Figure, Phone, Pop, Scenes, SceneDef, Slip, StampT, Tx, V5Shell, interpolate, CL, OUT, SPR, lerp, mkA, mkPS, pop, tw } from "./kit5";

const TM = T as Timing;
export const V5CH1_DUR = Math.ceil(TM.total * 30);
const A = mkA(TM), PS = mkPS(TM);
const fDrei = A(0, "drei"), fVier = A(0, "vier"), fArb = A(0, "arbeitgeber"), fJetzt = A(0, "jetzt");
const fJuli = A(1, "juli"), f1 = A(1, "erstens"), f2 = A(1, "zweitens"), f3 = A(1, "drittens");
const fPlan = A(2, "plan"), fGes = A(2, "gesetz");

const Card: React.FC<{ f: number; at: number; x: number; n: number; title: string[]; icon: React.ReactNode }> = ({ f, at, x, n, title, icon }) => {
  const p = interpolate(f, [at, at + 16], [0, 1], { ...CL, easing: SPR });
  if (f < at) return null;
  return (
    <g transform={`translate(${x} ${lerp(620, 560, p)})`} opacity={Math.min(1, p * 1.5)}>
      <rect x={-250} y={-260} width={500} height={520} rx={30} fill={C.deep} opacity={0.95} />
      <circle cx={-190} cy={-200} r={40} fill={C.amber} />
      <text x={-190} y={-184} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={46} fill={C.deep}>{n}</text>
      <g transform="translate(0 -40)">{icon}</g>
      {title.map((t, i) => <Tx key={i} x={0} y={160 + i * 56} s={46}>{t}</Tx>)}
    </g>
  );
};

const S: SceneDef[] = [
  {
    a: 0, b: PS(1) - 8, render: (f) => (
      <g>
        <Tx x={960} y={180} s={56} c={C.gray} w={700} o={tw(f, 4, 14)}>Heute gilt</Tx>
        <Days f={f} x={490} y={300} n={4} at={4} w={200} mark={(i) => {
          if (i < 3) return <g transform="translate(100 260)" opacity={tw(f, fDrei + i * 5, 10)}><Phone x={0} y={60} s={0.55} /></g>;
          return <g transform="translate(100 330)" opacity={tw(f, fVier, 10)}><g transform={`scale(${pop(f, fVier, 14)})`}><Slip s={0.9} /></g><Tx x={0} y={170} s={30} c={C.amber}>Attest nötig</Tx></g>;
        }} />
        <g opacity={tw(f, fDrei + 6, 12)}><path d="M 500 690 L 500 710 L 1150 710 L 1150 690" fill="none" stroke={C.gray} strokeWidth={5} /><Tx x={825} y={770} s={36} c={C.gray} w={700}>Tag 1–3: beim Chef melden reicht</Tx></g>
        {/* Chef darf früher */}
        <g opacity={tw(f, fArb - 4, 12)}>
          <Figure f={f} x={240} y={600} s={0.62} shirt="#3A4560" hair="#4A3A30" pointAt={fArb + 4} flip />
          <g transform="translate(590 520)" opacity={0.85 * tw(f, fArb + 8, 10)}><Slip s={0.55} /></g>
          <path d="M 330 560 Q 450 470 560 500" fill="none" stroke={C.amber} strokeWidth={6} strokeDasharray="14 12" opacity={tw(f, fArb + 6, 10)} />
        </g>
        <Pop f={f} at={fJetzt} x={760} y={930}><Check p={1} /><Tx x={210} y={14} s={38} w={700}>schon heute erlaubt</Tx></Pop>
      </g>
    ),
  },
  {
    a: PS(1) - 6, b: V5CH1_DUR + 20, kind: "slide", render: (f) => (
      <g>
        <g opacity={tw(f, fJuli - 6, 12)}>
          <rect x={660} y={110} width={600} height={84} rx={42} fill={C.deep} />
          <Tx x={960} y={166} s={40} c={C.amber}>2. Juli 2026 · Koalition</Tx>
        </g>
        <Card f={f} at={f1} x={420} n={1} title={["Attest", "ab Tag 1"]} icon={<g><Slip s={1.1} /><g transform="translate(70 -90)"><text fontFamily={FONT} fontWeight={800} fontSize={60} fill={C.red} textAnchor="middle">1</text></g></g>} />
        <Card f={f} at={f2} x={960} n={2} title={["Keine Krank-", "meldung per Telefon"]} icon={<g><Phone x={0} y={0} s={1.0} /><circle r={110} fill="none" stroke={C.red} strokeWidth={16} /><path d="M-78 -78 L78 78" stroke={C.red} strokeWidth={16} strokeLinecap="round" /></g>} />
        <Card f={f} at={f3} x={1500} n={3} title={["Härtere Strafen", "für falsche Atteste"]} icon={<g><text y={50} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={190} fill={C.amber}>§</text></g>} />
        <g opacity={tw(f, fPlan - 4, 12)}><Tx x={960} y={960} s={44} c={C.gray} w={700}>bisher nur ein Plan der Regierung</Tx></g>
        <StampT f={f} at={fGes - 2} x={960} y={560} text="NOCH KEIN GESETZ" s={1.2} rot={-8} />
      </g>
    ),
  },
];

export const V5Ch1: React.FC = () => {
  const f = useCurrentFrame();
  const sfx: Sfx[] = [
    [4, "soft", 0.5], [fVier, "paper", 0.6], [fArb + 4, "soft", 0.5], [fJetzt, "ding", 0.5],
    [PS(1) - 10, "whoosh", 0.7], [f1, "soft", 0.6], [f2, "soft", 0.6], [f3, "soft", 0.6], [fGes - 2, "stamp", 0.8],
  ];
  return <V5Shell n={1} title="Was Merz plant" total={TM.total} sfx={sfx}><Scenes f={f} list={S} /></V5Shell>;
};
