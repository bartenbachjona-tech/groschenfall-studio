/* V7 Kapitel 2 – Was passiert mit dir bei 633 €? (Storyboard 2.1–2.12) */
import React from "react";
import { useCurrentFrame } from "remotion";
import T from "../data/v7ch2.json";
import { Timing } from "../kit/core";
import {
  C, Card3, Check, Clock, Coins, Du, Form, Head, Mag, Paper, Pill, Pop, Pot, Row, Sc, Scenes7, Sfx, Src, StepRamp, Sweat, Toni, Tx, V7Shell,
  CL, IO, OUT, interpolate, lerp, mk7, pop, tw,
} from "./kit7";

const TM = T as Timing;
const { wk, ps, DUR } = mk7(TM);
export const V7CH2_DUR = DUR;

// Wort-Anker (geprüft gegen v7ch2.json)
const fMindest = wk("v7_2_0", "Mindestlohn"), fZehn = wk("v7_2_0", "=zehn"), fJan = wk("v7_2_0", "Januar"), f1390 = wk("v7_2_0", "dreizehn"), f1460 = wk("v7_2_0", "vierzehn"), fDarum = wk("v7_2_0", "Darum"), f633 = wk("v7_2_0", "sechshundertdreiunddreißig"), fSicher = wk("v7_2_0", "sicher");
const p21 = ps("v7_2_1"), fFall1 = wk("v7_2_1", "Fall"), fZehn1 = wk("v7_2_1", "=zehn"), fDieselben = wk("v7_2_1", "dieselben"), fDreissig = wk("v7_2_1", "dreißig"), fBleibst = wk("v7_2_1", "bleibst");
const fFall2 = wk("v7_2_2", "Fall"), f15 = wk("v7_2_2", "fünfzehn"), fNicht = wk("v7_2_2", "nicht"), fDarfst = wk("v7_2_2", "darfst"), fGrenze2 = wk("v7_2_2", "Grenze");
const fFall3 = wk("v7_2_3", "Fall"), fBefreien = wk("v7_2_3", "befreien"), f23 = wk("v7_2_3", "dreiundzwanzig"), fDafuer = wk("v7_2_3", "Dafür");
const fHaken = wk("v7_2_4", "Haken"), fPausch = wk("v7_2_4", "Pauschalsteuer"), fChef = wk("v7_2_4", "Chef"), fAbw = wk("v7_2_4", "abwälzen"), fSteigt = wk("v7_2_4", "Steigt"), f19 = wk("v7_2_4", "neunzehn"), fSchau = wk("v7_2_4", "Schau");
const fFall4 = wk("v7_2_5", "Fall"), fMidi = wk("v7_2_5", "Midijob"), fLangsam = wk("v7_2_5", "langsam"), f2000 = wk("v7_2_5", "zweitausend"), fPaar = wk("v7_2_5", "paar");
const p26 = ps("v7_2_6"), fWenig = wk("v7_2_6", "wenig"), fToni = wk("v7_2_6", "Toni"), fMenge = wk("v7_2_6", "Menge");

/** Kleiner Fall-Kopf links oben */
const FallTag: React.FC<{ f: number; at: number; n: number }> = ({ f, at, n }) => (
  <Pop f={f} at={at} x={210} y={230}><Pill x={0} y={0} text={`Fall ${n}`} col={C.blue} s={52} /></Pop>
);

const S: Sc[] = [
  { // 2.1 Treppe Mindestlohn 13,90 → 14,60
    at: 0, render: (f) => {
      const a = 1, b = tw(f, f1460, 18);
      return (
        <g>
          <rect x={460} y={820 - 300 * a} width={420} height={300 * a} rx={14} fill="#5C7BD0" />
          <rect x={1040} y={820 - 380 * b} width={420} height={380 * b} rx={14} fill={C.blue} />
          <Tx x={670} y={800 - 300 * a} s={84} o={tw(f, f1390, 12)}>13,90 €</Tx>
          <Tx x={1250} y={800 - 380 * b} s={84} o={b} c={C.white}>14,60 €</Tx>
          <Tx x={670} y={880} s={40} c={C.gray} w={700} o={a}>Mindestlohn 2026</Tx>
          <Tx x={1250} y={880} s={40} c={C.gray} w={700} o={b}>ab Januar 2027</Tx>
          <Pop f={f} at={fZehn} x={960} y={320}><Pill x={0} y={0} text="Grenze = 10 Std./Woche" col={C.deep} fg={C.white} s={40} /></Pop>
          <Head f={f} at={f1460} y={180}>14,60 € Mindestlohn</Head>
          <Src f={f} at={f1390}>Quelle: Mindestlohnverordnung (MiLoV5) § 1 · Minijob-Zentrale, 07.10.2026</Src>
        </g>
      );
    },
  },
  { // 2.2 Grenze 603 → 633 €, Karte „Sicher“
    at: fDarum - 6, kind: "slide", render: (f) => {
      const k = tw(f, f633, 20);
      return (
        <g>
          <line x1={300} y1={700} x2={1300} y2={700} stroke="#2A3F63" strokeWidth={6} />
          <rect x={360} y={700 - lerp(340, 357, k)} width={380} height={lerp(340, 357, k)} rx={14} fill={C.amber} />
          <Tx x={550} y={700 - lerp(340, 357, k) - 30} s={110} c={C.amber}>{k < 0.5 ? "603 €" : "633 €"}</Tx>
          <Tx x={550} y={770} s={38} c={C.gray} w={700}>Minijob-Grenze</Tx>
          <Tx x={1060} y={620} s={30} c={C.gray} w={600} o={tw(f, f633 + 20, 12)}>14,60 € × 130 ÷ 3 = 632,67 → 633 €</Tx>
          <g opacity={tw(f, fSicher - 6, 10)}>
            <Card3 x={1520} y={560} title="Sicher" col={C.green} r={6} s={lerp(0.8, 1, pop(f, fSicher - 6, 14))} glow={1} icon={<g transform="translate(0 -60)"><Check p={1} r={50} /></g>} />
          </g>
          <Head f={f} at={f633} y={180}>633 € · sicher</Head>
          <Src f={f} at={fDarum}>Quelle: § 8 Abs. 1a SGB IV · Minijob-Zentrale, 07.10.2026</Src>
        </g>
      );
    },
  },
  { // 2.3 Fall 1: Du-Figur mit Stundenzettel 10 h
    at: fFall1 - 10, kind: "slide", render: (f) => (
      <g>
        <Du f={f} x={620} y={520} s={1.1} tag />
        <Pop f={f} at={fZehn1 - 4} x={1250} y={560}>
          <Paper x={0} y={0} w={440} h={420} title="STUNDEN" col={C.blue}>
            <Tx x={0} y={60} s={110} c={C.deep} w={800}>10 h</Tx>
            <text x={0} y={130} textAnchor="middle" fontFamily="Sora" fontWeight={700} fontSize={34} fill="#3A4560">pro Woche</text>
          </Paper>
        </Pop>
        <FallTag f={f} at={fFall1} n={1} />
        <Head f={f} at={fZehn1} y={180}>10 Stunden, Mindestlohn</Head>
      </g>
    ),
  },
  { // 2.4 Lohnzettel 603 → 633, +30 €
    at: fDieselben - 6, kind: "slide", render: (f) => {
      const k = tw(f, fDieselben + 10, 16);
      return (
        <g>
          <Du f={f} x={420} y={540} s={0.95} />
          <Paper x={1150} y={580} w={560} h={440} title="LOHNZETTEL" col={C.blue}>
            <Row w={560} y={-60} label="Lohn" val={k < 0.5 ? "603 €" : "633 €"} col={k < 0.5 ? C.deep : "#1F9E6B"} big />
            <Row w={560} y={30} label="Stunden" val="gleich" />
            <Row w={560} y={110} label="Status" val="Minijob" col="#1F9E6B" o={tw(f, fBleibst, 10)} />
          </Paper>
          <Pop f={f} at={fDreissig} x={1580} y={360}><Pill x={0} y={0} text="+30 €" col={C.green} s={64} /></Pop>
          <FallTag f={f} at={-100} n={1} />
          <Head f={f} at={fDieselben} y={180} c={C.green}>+30 €, gleiche Stunden</Head>
          <Src f={f} at={fDreissig}>Eigene Rechnung: 13,90 € → 14,60 € × 130 ÷ 3 = 602,33 € → 632,67 € (+30,34 €)</Src>
        </g>
      );
    },
  },
  { // 2.5 Fall 2: 15 €/Std. bleibt
    at: fFall2 - 6, kind: "slide", render: (f) => (
      <g>
        <Du f={f} x={560} y={520} s={1.05} />
        <g transform={`translate(1250 560) rotate(${Math.sin(f / 20) * 2})`}>
          <line x1={0} y1={-300} x2={0} y2={-180} stroke="#9AA8BF" strokeWidth={6} />
          <rect x={-240} y={-180} width={480} height={260} rx={24} fill="#EEF2F7" />
          <text y={-30} textAnchor="middle" fontFamily="Sora" fontWeight={800} fontSize={120} fill="#0A111D">15 €</text>
          <text y={40} textAnchor="middle" fontFamily="Sora" fontWeight={700} fontSize={40} fill="#3A4560">pro Stunde</text>
        </g>
        <Pop f={f} at={fNicht} x={1250} y={760}><Pill x={0} y={0} text="bleibt gleich" col={C.blue} s={44} /></Pop>
        <FallTag f={f} at={fFall2} n={2} />
        <Head f={f} at={f15} y={180}>15 € pro Stunde</Head>
      </g>
    ),
  },
  { // 2.6 Uhr 40,2 h → 42,2 h im Monat
    at: fDarfst - 6, kind: "zoom", render: (f) => {
      const k = tw(f, fDarfst + 10, 30);
      return (
        <g>
          <Clock x={620} y={580} r={220} h={8 + k * 2} m={k * 120} />
          <Tx x={1300} y={500} s={90} c={C.gray}>40,2 h</Tx>
          <Tx x={1300} y={640} s={130} c={C.green} o={k}>42,2 h</Tx>
          <Tx x={1300} y={720} s={38} c={C.gray} w={700}>im Monat (603 € bzw. 633 € ÷ 15 €)</Tx>
          <FallTag f={f} at={-100} n={2} />
          <Head f={f} at={fDarfst + 6} y={180} c={C.green}>+2 Stunden erlaubt</Head>
          <Src f={f} at={fDarfst}>Eigene Rechnung: 603 € ÷ 15 € = 40,2 h · 633 € ÷ 15 € = 42,2 h</Src>
        </g>
      );
    },
  },
  { // 2.7 Fall 3: nicht befreit → 22,79 € in den Rententopf, Netto ≈ 610 €
    at: fFall3 - 6, kind: "slide", render: (f) => {
      const flow = tw(f, f23 - 6, 26);
      return (
        <g>
          <Form x={380} y={560} s={0.85} title="BEFREIUNG" cross={tw(f, fBefreien, 16)} />
          <Tx x={900} y={420} s={80}>633 €</Tx>
          {[0, 1, 2].map((i) => {
            const t = Math.max(0, Math.min(1, flow * 1.6 - i * 0.3));
            return <circle key={i} cx={lerp(900, 1400, t)} cy={lerp(470, 640, t) - Math.sin(t * Math.PI) * 120} r={26} fill={C.amber} opacity={t > 0 && t < 1 ? 1 : 0} />;
          })}
          <Pot x={1420} y={880} w={240} h={260} fill={0.5 * flow} col={C.blue} label="Rente" val={f > f23 ? "22,79 €" : undefined} />
          <g opacity={tw(f, f23 + 30, 12)}><Tx x={900} y={720} s={64} c={C.gray}>Netto ≈ 610 €</Tx></g>
          {/* Rentenbalken wächst */}
          <g opacity={tw(f, fDafuer, 12)}>
            <rect x={1640} y={480} width={60} height={400} rx={30} fill="#22304A" />
            <rect x={1640} y={880 - 400 * tw(f, fDafuer, 40)} width={60} height={400 * tw(f, fDafuer, 40)} rx={30} fill={C.green} />
            <Tx x={1670} y={940} s={30} c={C.green} w={700}>Rente</Tx>
          </g>
          <FallTag f={f} at={fFall3} n={3} />
          <Head f={f} at={f23} y={180} c={C.amber}>− 22,79 € Rente</Head>
          <Src f={f} at={f23}>Quelle: Minijob-Zentrale · DRV (Eigenanteil 3,6 %): 633 € × 3,6 % = 22,79 €</Src>
        </g>
      );
    },
  },
  { // 2.8 Der Haken: Vertrag, Lupe auf „Pauschalsteuer trägt …“
    at: fHaken - 8, kind: "zoom", render: (f) => {
      const m = interpolate(f, [fPausch - 6, fPausch + 20], [0, 1], { ...CL, easing: IO });
      return (
        <g>
          <Paper x={820} y={570} w={720} h={720} title="ARBEITSVERTRAG" col={C.gray} lines={10} r={-3}>
            <rect x={-330} y={110} width={660} height={56} rx={10} fill={C.amber} opacity={0.35 * tw(f, fAbw - 6, 12)} />
            <text x={-310} y={150} fontFamily="Sora" fontWeight={800} fontSize={32} fill="#0A111D" opacity={tw(f, fPausch, 10)}>§ 7 Pauschalsteuer trägt …</text>
          </Paper>
          <g transform={`translate(${lerp(1500, 0, m)} ${lerp(200, 0, m)})`}><Mag x={1000} y={720} s={1.5} /></g>
          <Toni f={f} x={1560} y={440} s={0.8} pointAt={fChef} />
          <Head f={f} at={fHaken} y={140} c={C.amber}>Der Haken</Head>
          <Src f={f} at={fPausch}>§ 40 Abs. 3 i. V. m. § 40a Abs. 5 EStG: Abwälzung per Vereinbarung möglich · Keine Rechtsberatung</Src>
        </g>
      );
    },
  },
  { // 2.9 Münzen wandern von Toni zur Du-Figur: − 19 €?
    at: f19 - 26, kind: "slide", render: (f) => {
      const mv = tw(f, f19 - 10, 30, IO);
      return (
        <g>
          <Toni f={f} x={1480} y={470} s={0.9} />
          <Du f={f} x={440} y={540} s={0.95} />
          <g transform={`translate(${lerp(1250, 700, mv)} ${880 - Math.sin(mv * Math.PI) * 200})`}><Coins x={0} y={0} n={5} /></g>
          <Head f={f} at={f19} y={200} c={C.amber}>− 19 €?</Head>
          <Tx x={960} y={290} s={38} c={C.gray} w={700} o={tw(f, f19 + 14, 12)}>pro Monat – falls abgewälzt und 5 % kommen</Tx>
          <Src f={f} at={f19}>Eigene Rechnung: 633 € × 3 % (Pauschalsteuer 2 → 5 %, Entwurf BT-Drs. 21/8235) = 18,99 €</Src>
        </g>
      );
    },
  },
  { // 2.10 Vertrag mit Häkchen-Lupe
    at: fSchau - 6, kind: "zoom", render: (f) => (
      <g>
        <Paper x={960} y={600} w={560} h={600} title="ARBEITSVERTRAG" col={C.gray} lines={9} />
        <g transform={`translate(1180 640) scale(${pop(f, fSchau, 14)})`}>
          <circle r={110} fill="#0A111D" opacity={0.3} /><circle r={110} fill="none" stroke="#EEF2F7" strokeWidth={20} />
          <rect x={70} y={70} width={120} height={36} rx={18} fill="#5B3A29" transform="rotate(45 70 70)" />
          <Check p={1} r={60} />
        </g>
        <Head f={f} at={fSchau + 4} y={180} c={C.green}>Check deinen Vertrag</Head>
      </g>
    ),
  },
  { // 2.11 Fall 4: Stufe bei 633 € wird Rampe bis 2.000 €
    at: fFall4 - 6, kind: "slide", render: (f) => {
      const morph = tw(f, fLangsam - 10, 30, IO);
      return (
        <g>
          <line x1={240} y1={860} x2={1700} y2={860} stroke="#2A3F63" strokeWidth={6} />
          <StepRamp x0={240} x1={1680} base={860} stepX={620} lo={60} hi={460} morph={morph} col={C.amber} />
          <rect x={240} y={800} width={380} height={60} fill={C.green} opacity={0.9} />
          <Tx x={620} y={930} s={40} c={C.gray} w={700}>633 €</Tx>
          <Tx x={1680} y={930} s={40} c={C.gray} w={700} o={tw(f, f2000 - 6, 10)}>2.000 €</Tx>
          <Tx x={430} y={780} s={40} c={C.green} w={800}>Minijob</Tx>
          <Pop f={f} at={fMidi} x={1150} y={520}><Pill x={0} y={0} text="Midijob" col={C.amber} s={56} /></Pop>
          <Tx x={1380} y={820} s={34} c={C.deep} w={800} o={tw(f, fLangsam, 12) * morph}>Abgaben steigen langsam</Tx>
          <Du f={f} x={lerp(500, 820, tw(f, fPaar, 30))} y={lerp(470, 420, tw(f, fPaar, 30))} s={0.75} />
          <FallTag f={f} at={fFall4} n={4} />
          <Head f={f} at={f2000} y={180}>Midijob bis 2.000 €</Head>
          <Src f={f} at={fMidi}>Quelle: Minijob-Zentrale (Übergangsbereich über 633 € bis 2.000 €)</Src>
        </g>
      );
    },
  },
  { // 2.12a Du-Figur erleichtert
    at: p26 - 6, kind: "fade", render: (f) => (
      <g>
        <Du f={f} x={960} y={500} s={1.1} shrugAt={fWenig - 6} />
        <Head f={f} at={p26 + 6} y={190} c={C.green}>Für dich: wenig</Head>
      </g>
    ),
  },
  { // 2.12b Harter Schnitt: Toni mit Schweißtropfen
    at: fToni - 2, kind: "zoom", render: (f) => (
      <g>
        <Toni f={f} x={900} y={420} s={1.25} shockAt={fToni + 4} />
        <Sweat f={f} at={fToni + 8} x={980} y={300} s={1.4} />
        <Sweat f={f} at={fToni + 24} x={830} y={320} s={1.1} />
        <g transform="translate(1380 560) rotate(-8)">
          <rect x={-140} y={-200} width={280} height={400} rx={28} fill="#1A2233" stroke="#5A6B88" strokeWidth={6} />
          <rect x={-110} y={-170} width={220} height={100} rx={12} fill="#0E1828" />
          <text x={96} y={-100} textAnchor="end" fontFamily="Sora" fontWeight={800} fontSize={60} fill={C.red}>???</text>
        </g>
        <Head f={f} at={fToni + 6} y={170} c={C.amber}>Und Toni?</Head>
      </g>
    ),
  },
];

export const V7Ch2: React.FC = () => {
  const f = useCurrentFrame();
  const sfx: Sfx[] = [
    [f1460, "soft", 0.5], [fDarum - 8, "whoosh", 0.5], [fSicher - 6, "stamp", 0.5],
    [fFall1 - 12, "whoosh", 0.5], [fDreissig, "coins", 0.4], [fFall2 - 8, "whoosh", 0.5], [fDarfst + 6, "ding", 0.4],
    [fFall3 - 8, "whoosh", 0.5], [fBefreien, "paper", 0.4], [f23 - 6, "coins", 0.4],
    [fHaken - 10, "soft", 0.6], [f19 - 10, "coins", 0.5], [fSchau, "ding", 0.4],
    [fFall4 - 8, "whoosh", 0.5], [fMidi, "soft", 0.5], [fToni - 2, "whoosh", 0.6],
  ];
  return (
    <V7Shell n={2} title="Was passiert mit dir bei 633 €?" sfx={sfx}>
      <Scenes7 f={f} list={S} end={DUR} />
    </V7Shell>
  );
};
