/* V7 Kapitel 0 – Cold Open: Samstagabend bei Toni (Storyboard 0.1–0.8) */
import React from "react";
import { useCurrentFrame } from "remotion";
import T from "../data/v7ch0.json";
import { Timing } from "../kit/core";
import {
  BarWall, Bubble, C, Calc, Card3, Clock, Head, LowerThird, Paper, Pill, Pop, Pub, Report, Row, Sc, Scenes7, Sfx, Src, StampT, Table, Toni, Tray, Tx, V7Shell,
  CL, OUT, interpolate, lerp, tw, Lena, Check, mk7,
} from "./kit7";

const TM = T as Timing;
const { wk, DUR } = mk7(TM);
export const V7CH0_DUR = DUR;

// Wort-Anker (geprüft gegen v7ch0.json)
const fJanuar = wk("v7_0_0", "Januar"), fSamstag = wk("v7_0_0", "Samstagabend"), fLena = wk("v7_0_0", "Lena"), fNeue = wk("v7_0_0", "neue"), fDreissig = wk("v7_0_0", "dreißig");
const fToni = wk("v7_0_1", "Toni"), fGeplant = wk("v7_0_1", "geplant"), f57 = wk("v7_0_1", "siebenundfünfzig"), fGesetz = wk("v7_0_1", "Gesetz");
const fHinter = wk("v7_0_2", "Hintergrund"), fAbsch = wk("v7_0_2", "abschaffen"), fGastro = wk("v7_0_2", "Gastronomie"), fKata = wk("v7_0_2", "Katastrophe");
const fDrei = wk("v7_0_3", "Drei"), fSicher = wk("v7_0_3", "sicher"), fProfit = wk("v7_0_3", "profitiert"), fEnt = wk("v7_0_3", "Entscheidung");

const HOLD: [number, number, number, number] = [-100, -90, 99998, 99999];

const S: Sc[] = [
  { // 0.1 Frame 0: Lena mit Tablett, riesiges „633 €“
    at: 0, render: (f) => (
      <g>
        <Table x={1500} y={850} s={0.9} />
        <Lena f={f} x={640} y={520} s={1.25} reach={HOLD} smileAt={20} />
        <Tray x={640 - 295} y={520 + 88} s={1.2} r={-4 + Math.sin(f / 14) * 2} />
        <g transform={`translate(1260 ${560}) scale(${interpolate(f, [0, 20], [1.06, 1], { ...CL, easing: OUT })})`}>
          <Tx x={0} y={0} s={260} c={C.amber}>633 €</Tx>
        </g>
        <Pop f={f} at={fJanuar} x={1260} y={690}><Pill x={0} y={0} text="ab Januar" col={C.blue} s={46} /></Pop>
      </g>
    ),
  },
  { // 0.2 Samstag 22:30, Lena läuft zwischen Tischen
    at: fSamstag - 6, kind: "slide", render: (f) => {
      const t = interpolate(f, [fSamstag, fNeue], [0, 1], CL);
      return (
        <g>
          <Clock x={960} y={330} r={100} h={22} m={30 + t * 4} />
          <Table x={420} y={860} s={0.8} />
          <Table x={1520} y={860} s={0.8} />
          <Lena f={f} x={lerp(700, 1150, t)} y={560} s={0.95} reach={HOLD} look={4} />
          <Tray x={lerp(700, 1150, t) - 224} y={560 + 66} s={0.95} r={Math.sin(f / 7) * 3} />
          <Head f={f} at={fSamstag} y={150}>Samstag, 22:30</Head>
          <LowerThird f={f} at={fLena - 4} name="Lena" role="Studentin" dur={140} />
        </g>
      );
    },
  },
  { // 0.3 Lohnzettel 603 → 633, +30 €
    at: fNeue - 6, kind: "slide", render: (f) => {
      const k = tw(f, fNeue + 6, 18);
      return (
        <g>
          <Lena f={f} x={520} y={520} s={0.95} smileAt={fDreissig} />
          <Paper x={1180} y={560} w={520} h={460} title="LOHNZETTEL" col={C.blue}>
            <Row w={520} y={-80} label="Lohn" val={k < 0.5 ? "603 €" : "633 €"} col={k < 0.5 ? C.deep : "#1F9E6B"} big />
            <Row w={520} y={10} label="Stunden" val="gleich" />
            <rect x={-224} y={60} width={448} height={4} fill="#0A111D" opacity={0.2} />
          </Paper>
          <Pop f={f} at={fDreissig} x={1180} y={720}><Pill x={0} y={0} text="+30 €" col={C.green} s={64} /></Pop>
          <Head f={f} at={fDreissig} y={170} c={C.green}>+30 € im Monat</Head>
          <Src f={f} at={fNeue}>Quelle: § 8 Abs. 1a SGB IV · MiLoV5 · eigene Rechnung (10 Std./Woche, Mindestlohn)</Src>
        </g>
      );
    },
  },
  { // 0.4 Theke: Toni mit Taschenrechner
    at: fToni - 6, kind: "slide", render: (f) => (
      <g>
        <BarWall shelfX={1380} counterY={640} />
        <Toni f={f} x={760} y={300} s={1.15} look={6} />
        <Calc x={1180} y={540} s={0.9} r={-6} disp={f < fGeplant ? "0" : "?"} />
        <LowerThird f={f} at={fToni} name="Toni" role="Wirt" dur={150} />
      </g>
    ),
  },
  { // 0.5 Display +57 €, Stempel Gesetz/Entwurf
    at: f57 - 10, kind: "zoom", render: (f) => (
      <g>
        <BarWall shelfX={60} counterY={780} />
        <Toni f={f} x={380} y={470} s={0.95} shockAt={f57 + 4} />
        <Calc x={900} y={560} s={1.25} disp="+57 €" />
        <Head f={f} at={f57} y={160} x={1000} c={C.amber}>rund +57 € Abgaben</Head>
        <Tx x={1000} y={225} s={36} c={C.gray} w={700} o={tw(f, f57 + 10, 12)}>pro Monat, für Lena</Tx>
        <StampT f={f} at={f57 + 40} x={1500} y={650} text="Entwurf" col={C.amber} rot={6} s={0.9} />
        <StampT f={f} at={fGesetz - 2} x={1480} y={470} text="Gesetz" col={C.green} rot={-10} s={0.9} />
        <Src f={f} at={f57}>Eigene Rechnung (Umlagen wie 2026): Minijob-Zentrale · GKV-BStabG, BGBl. 2026 I Nr. 228 · Entwurf BT-Drs. 21/8235</Src>
      </g>
    ),
  },
  { // 0.6 Durchs Fenster: Bericht fällt, Nachbarfenster gehen aus
    at: fHinter - 6, kind: "fade", render: (f) => {
      const drop = interpolate(f, [fHinter + 4, fHinter + 22], [-500, 0], { ...CL, easing: OUT });
      const dark = (i: number) => 1 - tw(f, fAbsch - 20 + i * 8, 8);
      return (
        <g>
          {/* Fensterrahmen */}
          <rect x={260} y={120} width={1400} height={760} rx={20} fill="#0D1526" />
          {[[340, 360, 220, 520], [620, 280, 260, 600], [940, 400, 200, 480], [1200, 320, 380, 560]].map(([x, y, w, h], i) => (
            <g key={i}><rect x={x} y={y} width={w} height={h} fill="#16243B" />
              {Array.from({ length: 6 }).map((_, k) => <rect key={k} x={x + 26 + (k % 2) * (w / 2 - 10)} y={y + 30 + Math.floor(k / 2) * 110} width={w / 2 - 50} height={60} fill={C.amber} opacity={0.65 * dark(i * 2 + (k % 3))} />)}
            </g>
          ))}
          <rect x={260} y={120} width={1400} height={760} rx={20} fill="none" stroke="#5B3A29" strokeWidth={26} />
          <line x1={960} y1={120} x2={960} y2={880} stroke="#5B3A29" strokeWidth={16} />
          <rect x={200} y={860} width={1520} height={60} rx={10} fill="#8A5A3C" />
          <g transform={`translate(0 ${drop})`}><Report x={1380} y={760} s={0.55} r={-8} /></g>
          <Head f={f} at={fHinter + 24} y={110} c={C.red}>Minijob abschaffen?</Head>
          <Src f={f} at={fHinter + 10}>Vorschlag: Alterssicherungskommission, Bericht Juni 2026 (Empfehlung 26) · BMAS 23.06.2026</Src>
        </g>
      );
    },
  },
  { // 0.7 Sprechblase „Katastrophe“ – stilisiert, nur Namensschild
    at: fGastro - 6, kind: "slide", render: (f) => (
      <g>
        {/* neutrales Gasthaus von außen */}
        <g transform="translate(560 560)">
          <path d="M -300 -120 L 0 -300 L 300 -120 Z" fill="#7A4E36" />
          <rect x={-270} y={-120} width={540} height={420} fill="#3B2A22" />
          <rect x={-60} y={100} width={120} height={200} rx={10} fill="#1A2233" />
          {[-180, 120].map((x) => <rect key={x} x={x} y={-60} width={110} height={110} rx={8} fill={C.amber} opacity={0.7} />)}
        </g>
        <Bubble f={f} at={fGastro + 6} x={1280} y={420} text="„… eine Katastrophe“" s={1} />
        <g opacity={tw(f, fKata - 4, 12)}>
          <rect x={1000} y={600} width={560} height={96} rx={16} fill={C.deep} />
          <text x={1280} y={640} textAnchor="middle" fontFamily="Sora" fontWeight={800} fontSize={32} fill={C.white}>Guido Zöllick</text>
          <text x={1280} y={678} textAnchor="middle" fontFamily="Sora" fontWeight={600} fontSize={24} fill={C.gray}>Präsident, Hotel- und Gaststättenverband</text>
        </g>
        <Src f={f} at={fGastro + 6}>Zitat zitiert nach Tageskarte/dpa 22.06.2026 · hogapage 23.06.2026</Src>
      </g>
    ),
  },
  { // 0.8 Drei Karten + verdeckte vierte
    at: fDrei - 6, kind: "zoom", render: (f) => {
      const c = (i: number) => interpolate(f, [fDrei + i * 6, fDrei + i * 6 + 18], [0, 1], { ...CL, easing: OUT });
      const four = tw(f, fEnt - 4, 14);
      return (
        <g>
          {[["Sicher", C.green, -18], ["Geplant", C.amber, -6], ["Offen", C.blue, 6]].map(([t, col, r], i) => (
            <g key={i} opacity={c(i)}>
              <Card3 x={lerp(960, 420 + i * 360, c(i))} y={560 + Math.abs(i - 1) * 16} r={Number(r) * c(i)} title={String(t)} col={String(col)}
                glow={i === 0 ? tw(f, fSicher, 10) * (1 - tw(f, fProfit - 6, 10)) : 0}
                icon={i === 0 ? <g transform="translate(0 -60)"><Check p={1} r={50} /></g> : i === 1 ? <g transform="translate(0 -60)"><circle r={50} fill="none" stroke={C.amber} strokeWidth={10} /><path d="M 0 -30 L 0 0 L 22 14" stroke={C.amber} strokeWidth={10} fill="none" strokeLinecap="round" /></g> : <Tx x={0} y={-30} s={110} c={C.blue}>?</Tx>} />
            </g>
          ))}
          <g opacity={four}>
            <Card3 x={1500} y={lerp(640, 580, four)} r={12} title="" col={C.gray} down s={0.95} glow={tw(f, fEnt, 10)} />
          </g>
          <Head f={f} at={fDrei} y={170} s={64}>Sicher · Geplant · Offen</Head>
        </g>
      );
    },
  },
];

export const V7Ch0: React.FC = () => {
  const f = useCurrentFrame();
  const pubO = 1 - tw(f, fToni - 14, 12);
  const sfx: Sfx[] = [
    [0, "soft", 0.8], [fSamstag - 8, "whoosh", 0.5], [fDreissig, "coins", 0.5],
    [fToni - 8, "whoosh", 0.5], [f57, "ding", 0.5], [f57 + 40, "stamp", 0.4], [fGesetz - 2, "stamp", 0.5],
    [fHinter + 18, "paper", 0.6], [fGastro - 8, "whoosh", 0.5], [fDrei, "paper", 0.5], [fEnt, "marimba", 0.5],
  ];
  return (
    <V7Shell n={0} title="" sfx={sfx} bg={pubO > 0 ? <Pub f={f} o={pubO} /> : null}>
      <Scenes7 f={f} list={S} end={DUR} />
    </V7Shell>
  );
};
