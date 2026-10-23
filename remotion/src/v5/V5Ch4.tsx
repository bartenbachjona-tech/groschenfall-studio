import React from "react";
import { useCurrentFrame } from "remotion";
import T from "../data/v5ch4.json";
import { Timing } from "../kit/core";
import { Sfx } from "../kit/Chapter";
import { C, Check, FONT, Figure, Pop, Ring, Scenes, SceneDef, Sick, Tx, V5Shell, Virus, interpolate, CL, OUT, IO, lerp, mkA, mkPS, pop, tw } from "./kit5";

const TM = T as Timing;
export const V5CH4_DUR = Math.ceil(TM.total * 30);
const A = mkA(TM), PS = mkPS(TM);
const fDIW = A(0, "deutsche"), fAtem = A(0, "atemwegsinfekte"), fCorona = A(0, "corona"), fHause = A(0, "hause");
const fPsych = A(1, "psychische"), f5 = A(1, "fünf"), f13 = A(1, "dreizehn"), fDAK = A(1, "dak");
const fAelter = A(2, "älter"), fLaenger = A(2, "länger"), fRuecken = A(2, "rücken"), fBlau = A(2, "blaumacht");
const fTeil = A(3, "teil"), fZaehl = A(3, "zähleffekt");

const S: SceneDef[] = [
  {
    a: 0, b: PS(1) - 8, render: (f) => {
      const home = interpolate(f, [fHause - 6, fHause + 24], [0, 1], { ...CL, easing: IO });
      return (
        <g>
          <Tx x={960} y={180} s={48} c={C.gray} w={700} o={tw(f, fDIW, 12)}>DIW: Es gibt auch echte Gründe</Tx>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <Figure f={f} x={420 + i * 420} y={460} s={0.72} shirt={["#86A9FF", "#3DDC97", "#FFB547"][i]} blinkSeed={i} shockAt={fAtem + 10 + i * 8} />
              <rect x={260 + i * 420} y={700} width={320} height={30} rx={10} fill="#5A6B88" />
              <rect x={290 + i * 420} y={730} width={20} height={170} fill="#3A4560" /><rect x={530 + i * 420} y={730} width={20} height={170} fill="#3A4560" />
            </g>
          ))}
          {/* der Kranke geht heim */}
          <g transform={`translate(${lerp(0, 120, home)} ${lerp(0, -40, home)})`} opacity={1 - home}>
            <Figure f={f} x={1600} y={460} s={0.72} shirt="#C9D3E2" blinkSeed={7} />
            <Sick x={1600} y={460} s={0.72} />
          </g>
          <g opacity={tw(f, fHause - 6, 12)} transform="translate(1720 560)">
            <path d="M -90 0 L 0 -80 L 90 0 Z" fill={C.amber} /><rect x={-70} y={0} width={140} height={110} fill="#2A3F63" />
            <Tx x={0} y={170} s={34}>lieber zu Hause</Tx>
          </g>
          {Array.from({ length: 7 }).map((_, i) => f > fAtem - 4 ? <g key={i} opacity={tw(f, fAtem - 4 + i * 3, 10)}><Virus f={f} seed={i} x={300 + i * 210} y={300 + (i % 3) * 70} r={22} /></g> : null)}
        </g>
      );
    },
  },
  {
    a: PS(1) - 6, b: PS(2) - 8, kind: "slide", render: (f) => (
      <g>
        <g transform="translate(330 0)">
          <Figure f={f} x={0} y={500} s={0.85} shirt="#86A9FF" look={0} />
          <g transform={`translate(0 260) scale(${pop(f, fPsych, 14)})`}>
            <ellipse cx={-40} cy={0} rx={90} ry={55} fill="#5A6B88" /><ellipse cx={40} cy={-15} rx={90} ry={65} fill="#5A6B88" /><ellipse cx={0} cy={20} rx={110} ry={50} fill="#4A5B78" />
            <path d="M 10 50 L -15 110 L 15 105 L -5 160" fill="none" stroke={C.amber} strokeWidth={10} strokeLinejoin="round" />
          </g>
        </g>
        <Ring f={f} at={f5} x={900} y={520} r={150} v={0.05} col={C.amber} val="< 5 %" label={["der Krankheitsfälle"]} />
        <Ring f={f} at={f13} x={1400} y={520} r={150} v={0.13} col={C.red} val="13 %" label={["aller Fehltage"]} />
        <Pop f={f} at={fDAK} x={1150} y={930}><rect x={-370} y={-46} width={740} height={86} rx={43} fill={C.deep} /><text y={14} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={36} fill={C.white}>DAK: Ursache <tspan fill={C.amber}>Nr. 2</tspan> für Fehltage</text></Pop>
      </g>
    ),
  },
  {
    a: PS(2) - 6, b: PS(3) - 8, kind: "slide", render: (f) => (
      <g>
        <Figure f={f} x={620} y={470} s={0.95} shirt="#7A8BA8" hair="#C9D3E2" hairStyle={2} shockAt={fRuecken} />
        <Pop f={f} at={fRuecken} x={690} y={620}><path d="M -20 -60 L 20 -10 L -10 0 L 25 60" fill="none" stroke={C.red} strokeWidth={12} strokeLinejoin="round" /></Pop>
        <g transform="translate(1050 380)" opacity={tw(f, fLaenger - 4, 12)}>
          <Tx x={0} y={-40} s={40} c={C.gray} w={700} a="start">Krankheitsdauer</Tx>
          <rect x={0} y={0} width={interpolate(f, [fLaenger, fLaenger + 24], [0, 300], { ...CL, easing: OUT })} height={70} rx={14} fill="#86A9FF" />
          <Tx x={0} y={130} s={34} c={C.gray} w={700} a="start">jung</Tx>
          <rect x={0} y={170} width={interpolate(f, [fLaenger + 8, fLaenger + 36], [0, 620], { ...CL, easing: OUT })} height={70} rx={14} fill={C.red} />
          <Tx x={0} y={300} s={34} c={C.gray} w={700} a="start">älter</Tx>
        </g>
        <Pop f={f} at={fBlau} x={1300} y={880}><Check p={1} /><Tx x={180} y={14} s={40} w={700}>kein Blaumachen</Tx></Pop>
      </g>
    ),
  },
  {
    a: PS(3) - 6, b: V5CH4_DUR + 20, kind: "zoom", render: (f) => {
      const tilt = Math.sin(f / 9) * 6 * Math.exp(-Math.max(0, f - PS(3)) / 40);
      return (
        <g>
          <rect x={940} y={400} width={40} height={460} rx={14} fill="#5A6B88" />
          <path d="M 860 880 L 1060 880 L 1000 820 L 920 820 Z" fill="#5A6B88" />
          <g transform={`translate(960 410) rotate(${tilt})`}>
            <rect x={-520} y={-14} width={1040} height={28} rx={14} fill="#9AA8BF" />
            <g transform="translate(-460 0)"><line x1={0} y1={0} x2={0} y2={120} stroke="#9AA8BF" strokeWidth={6} /><rect x={-190} y={120} width={380} height={140} rx={24} fill="#86A9FF" /><Tx x={0} y={210} s={40} c={C.deep}>bessere Zählung</Tx></g>
            <g transform="translate(460 0)"><line x1={0} y1={0} x2={0} y2={120} stroke="#9AA8BF" strokeWidth={6} /><rect x={-190} y={120} width={380} height={140} rx={24} fill={C.red} /><Tx x={0} y={210} s={40} c={C.deep}>mehr krank</Tx></g>
          </g>
          <Tx x={960} y={220} s={60} o={tw(f, fTeil, 12)}>Ein Teil echt.</Tx>
          <Tx x={960} y={300} s={60} c={C.amber} o={tw(f, fZaehl, 12)}>Ein großer Teil: Zähleffekt.</Tx>
        </g>
      );
    },
  },
];

export const V5Ch4: React.FC = () => {
  const f = useCurrentFrame();
  const sfx: Sfx[] = [
    [fAtem - 4, "soft", 0.5], [fHause - 6, "whoosh", 0.4],
    [PS(1) - 10, "whoosh", 0.7], [fPsych, "soft", 0.5], [f5, "soft", 0.5], [f13, "soft", 0.5], [fDAK, "ding", 0.4],
    [PS(2) - 10, "whoosh", 0.7], [fRuecken, "soft", 0.6], [fBlau, "ding", 0.5],
    [PS(3) - 10, "whoosh", 0.7], [fZaehl, "marimba", 0.5],
  ];
  return <V5Shell n={4} title="Alles nur Statistik?" total={TM.total} sfx={sfx}><Scenes f={f} list={S} /></V5Shell>;
};
