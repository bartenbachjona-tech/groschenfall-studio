/* V7 Kapitel 7 – Fazit + Nächstes Video (Storyboard 7.1–7.6) */
import React from "react";
import { Easing, useCurrentFrame } from "remotion";
import T from "../data/v7ch7.json";
import { Timing } from "../kit/core";
import { Coin } from "../kit/Props";
import {
  C, Card3, Check, Head, Klaus, Lena, MinijobSign, Pop, Sandra, Sc, Scenes7, Sfx, Toni, Tx, V7Shell,
  CL, interpolate, lerp, mk7, pop, tw,
} from "./kit7";

const TM = T as Timing;
const { wk, ps, DUR } = mk7(TM);
export const V7CH7_DUR = DUR;

// Wort-Anker (geprüft gegen v7ch7.json)
const fLena = wk("v7_7_0", "Lena"), fKlaus = wk("v7_7_0", "Klaus"), fToni = wk("v7_7_0", "Toni"), fSandra = wk("v7_7_0", "Sandra"), fFalle = wk("v7_7_0", "Falle"), fModell = wk("v7_7_0", "Modell"), fDarum = wk("v7_7_0", "Darum");
const p71 = ps("v7_7_1"), fSicher = wk("v7_7_1", "Sicher"), fGeplant = wk("v7_7_1", "Geplant"), fOffen = wk("v7_7_1", "Offen"), fWaehrend = wk("v7_7_1", "während"), fTeurer = wk("v7_7_1", "teurer"), fChef = wk("v7_7_1", "Chef"), fAbsch = wk("v7_7_1", "Abschaffen"), fSchreib = wk("v7_7_1", "Schreib");
const p72 = ps("v7_7_2"), fHier = wk("v7_7_2", "hier");
const p73 = ps("v7_7_3"), fGeld = wk("v7_7_3", "Geld");

const People: [string, number, number, string][] = [["Lena", 330, fLena, "guter Deal"], ["Klaus", 750, fKlaus, "Aufbesserung"], ["Toni", 1170, fToni, "Samstagabend"], ["Sandra", 1590, fSandra, "Falle im Alter?"]];

/** Platzhalter-Kachel fürs nächste Video (YouTube-Endscreen-Element liegt darüber) */
const NextCard: React.FC<{ f: number; at: number }> = ({ f, at }) => {
  const k = tw(f, at, 16);
  return (
    <g transform={`translate(560 600) scale(${lerp(0.92, 1, k)})`} opacity={k}>
      <rect x={-430} y={-242} width={860} height={484} rx={24} fill="#0A111D" opacity={0.4} transform="translate(12 16)" />
      <rect x={-430} y={-242} width={860} height={484} rx={24} fill="#16243B" stroke={C.amber} strokeWidth={6} />
      <path d="M -430 120 L 430 200 L 430 218 Q 430 242 406 242 L -406 242 Q -430 242 -430 218 Z" fill="#2A3D63" />
      {/* Figur mit leerer Geldbörse */}
      <g transform="translate(320 40) scale(0.85)">
        <circle cy={-70} r={46} fill="#E8B98F" />
        <path d="M -70 120 Q -70 -10 0 -16 Q 70 -10 70 120 Z" fill={C.blue} />
        <rect x={-60} y={40} width={120} height={80} rx={14} fill="#5B3A29" />
        <circle cx={0} cy={80} r={10} fill={C.amber} />
      </g>
      <text x={-390} y={-150} fontFamily="Sora" fontWeight={800} fontSize={30} fill={C.amber} letterSpacing={3}>NÄCHSTES VIDEO</text>
      <text x={-390} y={-70} fontFamily="Sora" fontWeight={800} fontSize={52} fill={C.white}>Warum sich Arbeiten</text>
      <text x={-390} y={0} fontFamily="Sora" fontWeight={800} fontSize={52} fill={C.white}>in Deutschland</text>
      <text x={-390} y={70} fontFamily="Sora" fontWeight={800} fontSize={52} fill={C.amber}>nicht lohnt</text>
    </g>
  );
};

const S: Sc[] = [
  { // 7.1 Bühne: Lichtkegel wandert Lena → Klaus → Toni → Sandra
    at: 0, render: (f) => {
      const idx = f < fKlaus - 4 ? 0 : f < fToni - 4 ? 1 : f < fSandra - 4 ? 2 : 3;
      const all = tw(f, fModell - 6, 16);
      const lx = interpolate(f, [fLena, fKlaus - 4, fKlaus + 4, fToni - 4, fToni + 4, fSandra - 4, fSandra + 4], [330, 330, 750, 750, 1170, 1170, 1590], CL);
      return (
        <g>
          <rect x={0} y={820} width={1920} height={260} fill="#1C2A44" />
          <rect x={0} y={816} width={1920} height={8} fill="#2A3F63" />
          <path d={`M ${lx - 60} 0 L ${lx + 60} 0 L ${lx + 230} 900 L ${lx - 230} 900 Z`} fill="#FFE2A8" opacity={0.13 * (1 - all) * tw(f, fLena - 6, 10)} />
          <ellipse cx={lx} cy={870} rx={230} ry={40} fill="#FFE2A8" opacity={0.18 * (1 - all) * tw(f, fLena - 6, 10)} />
          <rect x={0} y={0} width={1920} height={1080} fill="#FFE2A8" opacity={0.05 * all} />
          {People.map(([n, x, at, lab], i) => {
            const lit = all > 0 ? 1 : i === idx ? 1 : 0.35;
            const P = { f, x, y: 460, s: 0.82, blinkSeed: i * 3 };
            return (
              <g key={n} opacity={f < at - 6 && all === 0 ? 0.35 : lit}>
                {n === "Lena" ? <Lena {...P} smileAt={fLena + 6} /> : n === "Klaus" ? <Klaus {...P} smileAt={fKlaus + 6} /> : n === "Toni" ? <Toni {...P} /> : <Sandra {...P} shockAt={fFalle} />}
                <Tx x={x} y={950} s={36} c={i === 3 ? C.amber : C.white} w={800} o={tw(f, at + 4, 12)}>{lab}</Tx>
              </g>
            );
          })}
          {f < fDarum - 2 ? <Head f={f} at={fModell} y={175}>Ein Modell, vier Leben</Head> : <Head f={f} at={fDarum} y={175} c={C.amber}>Darum der Streit</Head>}
        </g>
      );
    },
  },
  { // 7.2 drei Karten nebeneinander
    at: p71 - 6, kind: "slide", render: (f) => (
      <g>
        {([["Sicher", C.green, fSicher, "neue Grenze"], ["Geplant", C.amber, fGeplant, "Steuer für Arbeitgeber"], ["Offen", C.blue, fOffen, "Minijob in ein paar Jahren?"]] as [string, string, number, string][]).map(([t, col, at, sub], i) => (
          <g key={t} opacity={tw(f, at - 8, 10)}>
            <Card3 x={480 + i * 480} y={lerp(640, 580, pop(f, at - 6, 14))} title={t} col={col} s={1.0} glow={tw(f, at, 10) * (f < at + 50 ? 1 : 0.4)}
              icon={i === 0 ? <g transform="translate(0 -60)"><Check p={1} r={50} /></g> : i === 1 ? <g transform="translate(0 -60)"><circle r={50} fill="none" stroke={C.amber} strokeWidth={10} /><path d="M 0 -30 L 0 0 L 22 14" stroke={C.amber} strokeWidth={10} fill="none" strokeLinecap="round" /></g> : <Tx x={0} y={-30} s={110} c={C.blue}>?</Tx>} />
            <Tx x={480 + i * 480} y={880} s={36} c={C.gray} w={700} o={tw(f, at + 6, 12)}>{sub}</Tx>
          </g>
        ))}
        <Head f={f} at={fSicher} y={175}>Sicher · Geplant · Offen</Head>
      </g>
    ),
  },
  { // 7.3 Preisschilder kleben schon am Schild MINIJOB
    at: fWaehrend - 6, kind: "zoom", render: (f) => (
      <g>
        <MinijobSign f={f} x={760} y={560} s={1.05} tags={[["+ KV", fWaehrend + 6], ["teurer", fTeurer, C.red], ["Chef zahlt", fChef - 4]]} />
        <Toni f={f} x={1550} y={480} s={0.9} shockAt={fChef} flip />
        <Tx x={1550} y={950} s={40} c={C.gray} w={700} o={tw(f, fChef, 10)}>vor allem dein Chef</Tx>
        <Head f={f} at={fTeurer} y={175} c={C.amber}>Schon teurer</Head>
      </g>
    ),
  },
  { // 7.4 Abschaffen oder behalten?
    at: fAbsch - 6, kind: "zoom", render: (f) => (
      <g>
        {([["Abschaffen", C.red, 620], ["Behalten", C.green, 1300]] as [string, string, number][]).map(([t, c, x], i) => {
          const p = pop(f, fAbsch + 4 + i * 12, 14);
          return (
            <g key={t} transform={`translate(${x} 560) scale(${p})`}>
              <rect x={-280} y={-80} width={560} height={160} rx={40} fill="#0A111D" opacity={0.4} transform="translate(8 10)" />
              <rect x={-280} y={-80} width={560} height={160} rx={40} fill={c} />
              <text y={22} textAnchor="middle" fontFamily="Sora" fontWeight={800} fontSize={62} fill="#0A111D">{t}</text>
            </g>
          );
        })}
        <Tx x={960} y={600} s={110} c={C.white} o={tw(f, fAbsch + 10, 10)}>?</Tx>
        <Tx x={960} y={820} s={58} c={C.amber} o={tw(f, fSchreib - 4, 12)}>Schreib's in die Kommentare!</Tx>
        <Head f={f} at={fAbsch} y={175}>Abschaffen oder behalten?</Head>
      </g>
    ),
  },
  { // 7.5 + 7.6 Endkarte: nächstes Video links, Abo rechts, Abschlusszeile mit Groschen
    at: p72 - 6, kind: "fade", render: (f) => {
      const drop = interpolate(f, [p73 - 4, p73 + 18], [-200, 228], { ...CL, easing: Easing.bounce });
      return (
        <g>
          <NextCard f={f} at={p72 + 6} />
          <Sandra f={f} x={1180} y={560} s={0.62} look={-6} blinkSeed={4} />
          <g opacity={tw(f, fHier, 14)}>
            <circle cx={1530} cy={620} r={170} fill="#FFFFFF" opacity={0.05} stroke="#FFFFFF" strokeOpacity={0.25} strokeWidth={4} />
            <text x={1530} y={410} textAnchor="middle" fontFamily="Sora" fontWeight={700} fontSize={34} fill={C.amber}>Abonnieren</text>
          </g>
          {f < p73 - 4 ? (
            <Pop f={f} at={p72 + 4} x={560} y={280}><Tx x={0} y={0} s={60} c={C.white}>Nächstes Video →</Tx></Pop>
          ) : (
            <g>
              <g transform={`translate(200 ${drop}) rotate(${interpolate(f, [p73 - 4, p73 + 18], [-200, 0], CL)})`}><Coin r={52} label="G" /></g>
              <text x={560} y={250} textAnchor="middle" fontFamily="Sora" fontWeight={800} fontSize={72} fill={C.white} opacity={tw(f, p73, 12)}>Groschenfall.</text>
              <text x={560} y={318} textAnchor="middle" fontFamily="Sora" fontWeight={700} fontSize={44} fill={C.green} opacity={tw(f, fGeld, 12)}>Geld, endlich klar.</text>
            </g>
          )}
        </g>
      );
    },
  },
];

export const V7Ch7: React.FC = () => {
  const f = useCurrentFrame();
  const sfx: Sfx[] = [
    [fLena - 4, "soft", 0.4], [fKlaus - 4, "soft", 0.3], [fToni - 4, "soft", 0.3], [fSandra - 4, "soft", 0.3], [fModell - 6, "marimba", 0.4],
    [p71 - 8, "whoosh", 0.5], [fSicher, "ding", 0.3], [fGeplant, "ding", 0.3], [fOffen, "ding", 0.3],
    [fWaehrend - 8, "whoosh", 0.4], [fTeurer, "coins", 0.4], [fAbsch - 8, "whoosh", 0.5], [fAbsch + 4, "soft", 0.4], [fAbsch + 16, "soft", 0.4],
    [p72 - 8, "whoosh", 0.5], [p73 + 6, "coins", 0.5],
  ];
  return (
    <V7Shell n={7} title="Fazit" sfx={sfx}>
      <Scenes7 f={f} list={S} end={DUR} />
    </V7Shell>
  );
};
