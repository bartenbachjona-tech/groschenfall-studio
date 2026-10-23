import React from "react";
import { useCurrentFrame } from "remotion";
import T from "../data/v5ch0.json";
import { Timing } from "../kit/core";
import { Sfx } from "../kit/Chapter";
import { Bed, C, Check, Days, FONT, Figure, Merz, Phone, Pop, Quote, Scenes, SceneDef, Sick, Slip, StampT, Thermo, Tx, V5Shell, interpolate, CL, OUT, lerp, mkA, mkPE, mkPS, pop, tw } from "./kit5";

const TM = T as Timing;
export const V5CH0_DUR = Math.ceil(TM.total * 30);
const A = mkA(TM), PS = mkPS(TM), PE = mkPE(TM);

const fFieber = A(0, "fieber"), fHals = A(0, "halsschmerzen"), fRuf = A(0, "rufst"), fKrank = A(0, "krankgeschrieben");
const fMerz = A(1, "friedrich"), fSchluss = A(1, "schluss"), fExo = A(1, "exorbitant"), fWett = A(1, "wettbewerbsnachteil");
const fDrei = A(2, "drei"), fWirk = A(2, "wirklich"), fZahl = A(2, "zahl"), fSchau = A(2, "schauen");

const S: SceneDef[] = [
  {
    a: 0, b: PS(1) - 8, render: (f) => {
      const ring = f >= fRuf - 4 && f < fKrank ? f : 0;
      return (
        <g>
          {/* Fenster mit Morgendämmerung */}
          <rect x={1260} y={120} width={420} height={300} rx={18} fill="#24406B" />
          <rect x={1260} y={120} width={420} height={300} rx={18} fill="none" stroke="#2A3F63" strokeWidth={14} />
          <circle cx={1560} cy={380} r={70} fill={C.amber} opacity={0.5 * tw(f, 0, 90)} />
          <line x1={1470} y1={120} x2={1470} y2={420} stroke="#2A3F63" strokeWidth={10} />
          {/* Wecker */}
          <g transform="translate(330 560)">
            <rect x={-90} y={-60} width={180} height={110} rx={20} fill="#1A2233" stroke="#5A6B88" strokeWidth={5} />
            <text x={0} y={18} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={56} fill={C.red}>6:30</text>
          </g>
          <Figure f={f} x={900} y={520} s={0.95} shirt="#86A9FF" look={4} shockAt={fFieber - 10} />
          <Sick x={900} y={520} s={0.95} />
          <Bed x={960} y={760} s={1.05} />
          <Pop f={f} at={fFieber} x={1180} y={470}><Thermo x={0} y={0} s={1.0} v={tw(f, fFieber, 30)} r={20} /><Tx x={110} y={-120} s={60} c={C.red}>38,6</Tx></Pop>
          {/* Taschentücher */}
          {[0, 1, 2].map((i) => <Pop key={i} f={f} at={fHals + i * 5} x={640 + i * 70} y={700 - i * 18}><path d="M-34 -20 Q0 -46 34 -20 Q40 20 0 30 Q-40 20 -34 -20Z" fill="#EEF2F7" /></Pop>)}
          <Phone x={1120} y={650} s={0.9} r={-10} ring={ring} />
          <Pop f={f} at={fKrank} x={1340} y={600}><Slip s={1} label="KRANK" /><g transform="translate(70 -90)"><Check p={pop(f, fKrank + 6, 12)} /></g></Pop>
        </g>
      );
    },
  },
  {
    a: PS(1) - 6, b: PS(2) - 8, kind: "slide", render: (f) => (
      <g>
        {/* Rednerpult */}
        <Merz f={f} x={470} y={430} s={1.05} tag={fMerz} pointAt={fExo} />
        <path d="M 330 700 L 610 700 L 580 980 L 360 980 Z" fill="#2A3F63" />
        <rect x={310} y={680} width={320} height={34} rx={8} fill="#3A5A9A" />
        <circle cx={470} cy={800} r={46} fill={C.amber} opacity={0.6} />
        <Pop f={f} at={fSchluss} x={1500} y={230}><Phone x={0} y={0} s={0.9} /><g><circle r={110} fill="none" stroke={C.red} strokeWidth={18} /><path d="M-78 -78 L78 78" stroke={C.red} strokeWidth={18} strokeLinecap="round" /></g></Pop>
        <Quote f={f} at={fExo - 4} x={820} y={400} w={1000} lines={["… exorbitant gestiegene", "Krankenstände …"]} />
        <Quote f={f} at={fWett - 6} x={760} y={640} w={1080} lines={["Wir können uns diesen Wettbewerbsnachteil", "durch lange Abwesenheiten in den", "Unternehmen nicht mehr leisten."]} who="Friedrich Merz, 2. Juli 2026" col={C.red} />
      </g>
    ),
  },
  {
    a: PS(2) - 6, b: V5CH0_DUR + 20, kind: "zoom", render: (f) => {
      const filled = Math.floor(interpolate(f, [fDrei, fDrei + 40], [0, 15], { ...CL, easing: OUT }));
      return (
        <g>
          <g transform="translate(260 170)">
            <rect width={900} height={780} rx={30} fill="#EEF2F7" />
            <rect width={900} height={110} rx={30} fill={C.red} /><rect y={80} width={900} height={30} fill={C.red} />
            <text x={450} y={74} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={52} fill="#FFFFFF">EIN JAHR</text>
            {Array.from({ length: 35 }).map((_, i) => {
              const cx = 70 + (i % 7) * 127, cy = 190 + Math.floor(i / 7) * 120;
              const on = i < filled;
              return <g key={i}><rect x={cx - 48} y={cy - 46} width={96} height={92} rx={14} fill={on ? (i === 14 ? "#F19A9C" : C.red) : "#DDE4EE"} /></g>;
            })}
          </g>
          <Pop f={f} at={fDrei + 20} x={1510} y={430}><Tx x={0} y={0} s={190} c={C.red}>14,8</Tx><Tx x={0} y={90} s={64}>Krankheitstage</Tx><Tx x={0} y={150} s={38} c={C.gray} w={700}>pro Jahr (2024)</Tx></Pop>
          <Pop f={f} at={fWirk} x={1510} y={790}><Tx x={0} y={60} s={230} c={C.amber}>?</Tx></Pop>
          <Pop f={f} at={fZahl} x={1510} y={1000}><Tx x={0} y={0} s={46} c={C.gray} w={700}>Stimmt die Zahl?</Tx></Pop>
        </g>
      );
    },
  },
];

export const V5Ch0: React.FC = () => {
  const f = useCurrentFrame();
  const sfx: Sfx[] = [
    [fFieber - 2, "soft", 0.7], [fRuf - 2, "marimba", 0.6], [fKrank, "ding", 0.6],
    [PS(1) - 10, "whoosh", 0.7], [fSchluss, "soft", 0.7], [fExo - 4, "paper", 0.6], [fWett - 6, "paper", 0.6],
    [PS(2) - 10, "whoosh", 0.7], [fDrei, "pipe", 0.5], [fDrei + 20, "soft", 0.7], [fWirk, "soft", 0.6],
  ];
  return <V5Shell n={0} title="" total={TM.total} sfx={sfx}><Scenes f={f} list={S} /></V5Shell>;
};
