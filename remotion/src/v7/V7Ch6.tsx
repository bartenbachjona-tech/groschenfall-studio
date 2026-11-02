/* V7 Kapitel 6 – Was wirklich entschieden ist (Storyboard 6.1–6.8) */
import React from "react";
import { useCurrentFrame } from "remotion";
import T from "../data/v7ch6.json";
import { Timing } from "../kit/core";
import {
  C, Card3, Check, Form, Head, Klaus, Paper, Pill, Pop, Sc, Scenes7, Sfx, Src, StampT, Tag, Toni, Tx, V7Shell,
  IO, lerp, mk7, pop, tw,
} from "./kit7";

const TM = T as Timing;
const { wk, ps, DUR } = mk7(TM);
export const V7CH6_DUR = DUR;

// Wort-Anker (geprüft gegen v7ch6.json)
const p60 = ps("v7_6_0"), fSicher = wk("v7_6_0", "Sicher"), fGrenze = wk("v7_6_0", "Grenze"), f633 = wk("v7_6_0", "sechshundert"), fToni = wk("v7_6_0", "Toni"), fKK = wk("v7_6_0", "Krankenkasse");
const fGeplant = wk("v7_6_1", "Geplant"), fPausch = wk("v7_6_1", "Pauschalsteuer"), fEntw = wk("v7_6_1", "Gesetzentwurf"), fAnfang = wk("v7_6_1", "Anfang"), fSachv = wk("v7_6_1", "Sachverständige"), fBeschl = wk("v7_6_1", "Beschlossen");
const fOffen = wk("v7_6_2", "Offen"), fDie3 = wk("v7_6_2", "CSU") - 6, fKomm = wk("v7_6_2", "Kommission"), fKeinen = wk("v7_6_2", "keinen"), fBReg = wk("v7_6_2", "Bundesregierung"), fPaket = wk("v7_6_2", "Gesamtpaket"), fCSU = wk("v7_6_2", "CSU"), fMedien = wk("v7_6_2", "Medienberichten"), fBleiben = wk("v7_6_2", "bleiben"), fWie = wk("v7_6_2", "Wie");
const p62b = ps("v7_6_2b"), fRentner = wk("v7_6_2b", "Rentner"), fAusgen = wk("v7_6_2b", "ausgenommen"), fAmtl = wk("v7_6_2b", "amtliche"), fZusage = wk("v7_6_2b", "Zusage"), fAuch = wk("v7_6_2b", "Auch");
const p63 = ps("v7_6_3"), fFormular = wk("v7_6_3", "Formular"), fBefr = wk("v7_6_3", "Befreiung"), fEinmal = wk("v7_6_3", "einmal"), fDanach = wk("v7_6_3", "Danach"), fHeute = wk("v7_6_3", "Heute"), f22 = wk("v7_6_3", "zweiundzwanzig"), f23 = wk("v7_6_3", "dreiundzwanzig"), fDafuer = wk("v7_6_3", "Dafür"), fRente = wk("v7_6_3", "Rente"), fOb = wk("v7_6_3", "=ob"), fAntrag = wk("v7_6_3", "Antrag"), fAG = wk("v7_6_3", "Arbeitgeber");

/** kleiner Kalender (wie V7Ch3) */
const Cal: React.FC<{ x: number; y: number; top: string; big: string; sub?: string; col?: string; s?: number }> = ({ x, y, top, big, sub, col = C.red, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-150} y={-150} width={300} height={290} rx={24} fill="#EEF2F7" />
    <rect x={-150} y={-150} width={300} height={74} rx={24} fill={col} /><rect x={-150} y={-96} width={300} height={20} fill={col} />
    <text y={-100} textAnchor="middle" fontFamily="Sora" fontWeight={800} fontSize={32} fill="#FFFFFF">{top}</text>
    <text y={sub ? 30 : 60} textAnchor="middle" fontFamily="Sora" fontWeight={800} fontSize={84} fill="#0A111D">{big}</text>
    {sub && <text y={96} textAnchor="middle" fontFamily="Sora" fontWeight={700} fontSize={34} fill="#3A4560">{sub}</text>}
  </g>
);
/** Info-Zeile rechts neben der Karte */
const Item: React.FC<{ f: number; at: number; x?: number; y: number; text: string; col?: string; w?: number }> = ({ f, at, x = 860, y, text, col = C.green, w = 900 }) => {
  if (f < at - 2) return null;
  const k = tw(f, at - 2, 12);
  return (
    <g transform={`translate(${x + lerp(40, 0, k)} ${y})`} opacity={k}>
      <rect x={0} y={-62} width={w} height={124} rx={26} fill={C.deep} />
      <rect x={0} y={-62} width={12} height={124} rx={6} fill={col} />
      <text x={50} y={20} fontFamily="Sora" fontWeight={800} fontSize={56} fill={C.white}>{text}</text>
    </g>
  );
};
const iconOk = <g transform="translate(0 -60)"><Check p={1} r={50} /></g>;
const iconClock = <g transform="translate(0 -60)"><circle r={50} fill="none" stroke={C.amber} strokeWidth={10} /><path d="M 0 -30 L 0 0 L 22 14" stroke={C.amber} strokeWidth={10} fill="none" strokeLinecap="round" /></g>;
const iconQ = <Tx x={0} y={-30} s={110} c={C.blue}>?</Tx>;

/** Paket ohne Absender */
const Parcel: React.FC<{ x: number; y: number; s?: number; label?: string }> = ({ x, y, s = 1, label = "Gesamtpaket" }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-210} y={-150} width={440} height={300} rx={16} fill="#0A111D" opacity={0.35} transform="translate(12 14)" />
    <rect x={-220} y={-160} width={440} height={300} rx={16} fill="#B98A5A" />
    <path d="M -220 -160 L -170 -220 L 270 -220 L 220 -160 Z" fill="#D2A673" />
    <path d="M 220 -160 L 270 -220 L 270 80 L 220 140 Z" fill="#9C7146" />
    <rect x={-30} y={-160} width={60} height={300} fill="#E9D3B0" opacity={0.7} />
    <rect x={-150} y={-60} width={300} height={90} rx={10} fill="#F4F6FA" />
    <text y={0} textAnchor="middle" fontFamily="Sora" fontWeight={800} fontSize={40} fill="#0A111D">{label}</text>
    <text y={90} textAnchor="middle" fontFamily="Sora" fontWeight={700} fontSize={26} fill="#3A2A1A" opacity={0.8}>Absender: ?</text>
  </g>
);

const S: Sc[] = [
  { // 6.0 drei verdeckte Karten – „Wo stehen wir?“
    at: 0, render: (f) => (
      <g>
        {[0, 1, 2].map((i) => (
          <Card3 key={i} x={560 + i * 400} y={lerp(640, 600, pop(f, 4 + i * 4, 14))} r={[-6, 0, 6][i]} title="" col={C.gray} down s={0.95} />
        ))}
        <Head f={f} at={p60 + 2} y={290}>Wo stehen wir?</Head>
      </g>
    ),
  },
  { // 6.1 Karte „Sicher“: 633 € + KV
    at: fSicher - 6, kind: "zoom", render: (f) => (
      <g>
        <Card3 x={430} y={600} title="Sicher" col={C.green} r={-4} s={lerp(0.8, 1.1, pop(f, fSicher - 6, 16))} glow={1} icon={iconOk} />
        <Item f={f} at={f633} y={500} text="Grenze: 633 € ab Januar" />
        <Item f={f} at={fToni} y={670} text="Toni: mehr für die KV" />
        <Tx x={1310} y={810} s={36} c={C.gray} w={700} o={tw(f, fKK, 12)}>Pauschale Krankenversicherung 13 → ≈ 17,5 %</Tx>
        <StampT f={f} at={fKK + 10} x={1560} y={920} text="GESETZ" col={C.green} s={0.8} />
        <Head f={f} at={fSicher} y={290} c={C.green}>Sicher: 633 € · KV</Head>
        <Src f={f} at={fGrenze}>Quellen: Minijob-Zentrale (Grenze 2027: 633 €) · GKV-BStabG, BGBl. 2026 I Nr. 228 (KV-Pauschale ab 2027)</Src>
      </g>
    ),
  },
  { // 6.2 Karte „Geplant“: Steuer 2 → 5 %, Anhörung 4. Nov.
    at: fGeplant - 6, kind: "slide", render: (f) => (
      <g>
        <Card3 x={430} y={600} title="Geplant" col={C.amber} r={4} s={1.1} glow={1} icon={iconClock} />
        <g opacity={tw(f, fPausch - 4, 12)}>
          <Tx x={1060} y={520} s={130} c={C.white}>2 %</Tx>
          <path d="M 1190 480 L 1330 480" stroke={C.amber} strokeWidth={14} strokeLinecap="round" />
          <path d="M 1310 452 L 1346 480 L 1310 508" stroke={C.amber} strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <Tx x={1480} y={520} s={130} c={C.amber}>5 %</Tx>
          <Tx x={1270} y={600} s={38} c={C.gray} w={700}>Pauschalsteuer (Arbeitgeber)</Tx>
        </g>
        <Pop f={f} at={fEntw - 2} x={1050} y={760}><Paper x={0} y={0} w={300} h={220} title="ENTWURF" col={C.amber} lines={3} /></Pop>
        <Pop f={f} at={fAnfang} x={1500} y={770}><Cal x={0} y={0} top="NOVEMBER" big="4." sub="Anhörung" col={C.amber} s={0.85} /></Pop>
        <StampT f={f} at={fBeschl} x={1270} y={950} text="NICHT BESCHLOSSEN" col={C.red} s={0.7} rot={-3} />
        <Head f={f} at={fGeplant} y={200} c={C.amber}>Geplant: 5 % Steuer</Head>
        <Src f={f} at={fPausch}>Quelle: Entwurf BT-Drs. 21/8235 · Anhörung Finanzausschuss 04.11.2026 (Stand 02.11.2026)</Src>
      </g>
    ),
  },
  { // 6.3 Karte „Offen“: Kommissionspläne, kein Gesetzentwurf, Gesamtpaket
    at: fOffen - 6, kind: "slide", render: (f) => (
      <g>
        <Card3 x={430} y={600} title="Offen" col={C.blue} r={-4} s={1.1} glow={1} icon={iconQ} />
        <Item f={f} at={fKomm} y={420} text="Pläne der Kommission" col={C.blue} />
        <Pop f={f} at={fKeinen} x={1310} y={570}><Pill x={0} y={0} text="noch kein Gesetzentwurf" col={C.blue} fg={C.white} s={44} /></Pop>
        <g opacity={tw(f, fBReg - 4, 14)}>
          <Parcel x={1310} y={830} s={lerp(0.6, 0.75, pop(f, fPaket - 6, 14))} />
        </g>
        <Head f={f} at={fOffen} y={200} c={C.blue}>Offen: Kommissionspläne</Head>
        <Src f={f} at={fKeinen}>Quelle: hib 715/2026 (Bundestag, 16.09.2026): Umsetzung als Gesamtpaket, Details „noch erarbeitet“</Src>
      </g>
    ),
  },
  { // 6.4 CSU: „Minijobs bleiben“ (laut Medienberichten) – passt das zusammen?
    at: fDie3 - 6, kind: "zoom", render: (f) => {
      const q = pop(f, fWie, 14);
      return (
        <g>
          <Parcel x={480} y={620} s={0.85} />
          <Tx x={480} y={880} s={38} c={C.gray} w={700}>Bundesregierung</Tx>
          <g transform="translate(1420 560)">
            <g opacity={tw(f, fCSU - 4, 12)}>
              <rect x={-330} y={-130} width={660} height={220} rx={110} fill="#EEF2F7" />
              <path d="M -120 80 L -200 190 L -40 86 Z" fill="#EEF2F7" />
              <text y={6} textAnchor="middle" fontFamily="Sora" fontWeight={800} fontSize={64} fill="#0A111D">„Minijobs bleiben“</text>
            </g>
            <Pop f={f} at={fMedien} x={0} y={300}><Pill x={0} y={0} text="CSU · laut Medienberichten" col={C.deep} fg={C.white} s={38} /></Pop>
          </g>
          {f >= fWie && <g transform={`translate(950 620) scale(${q})`}><Tx x={0} y={60} s={240} c={C.amber}>?</Tx></g>}
          {f < fWie - 2 ? <Head f={f} at={fCSU} y={200}>CSU: bleiben</Head> : <Head f={f} at={fWie} y={200} c={C.amber}>Wie passt das zusammen?</Head>}
          <Src f={f} at={fCSU}>Position laut Medienberichten (u. a. Tageskarte 16.07.2026) · kein Zitat · Bundesregierung: hib 715/2026</Src>
        </g>
      );
    },
  },
  { // 6.5 Klaus: Rentner ausgenommen? Häkchen → Fragezeichen, keine amtliche Zusage
    at: p62b - 6, kind: "slide", render: (f) => {
      const m = tw(f, fAmtl - 4, 14, IO);
      return (
        <g>
          <Klaus f={f} x={480} y={470} s={1.0} look={6} />
          <Paper x={1260} y={560} w={640} h={400} title="BERICHTE, SOMMER 2026" col={C.gray}>
            <text x={0} y={-30} textAnchor="middle" fontFamily="Sora" fontWeight={800} fontSize={50} fill="#0A111D">„Rentner</text>
            <text x={0} y={36} textAnchor="middle" fontFamily="Sora" fontWeight={800} fontSize={50} fill="#0A111D">ausgenommen“</text>
            <g transform="translate(0 130)">
              <g opacity={1 - m}><Check p={pop(f, fAusgen, 12)} r={46} /></g>
              <g opacity={m}><circle r={46} fill={C.blue} /><text y={22} textAnchor="middle" fontFamily="Sora" fontWeight={800} fontSize={64} fill="#0A111D">?</text></g>
            </g>
          </Paper>
          <StampT f={f} at={fZusage} x={1260} y={880} text="KEINE AMTLICHE ZUSAGE" col={C.red} s={0.75} rot={-5} />
          {f < fAuch - 2 ? <Head f={f} at={fRentner} y={200}>Rentner ausgenommen?</Head> : <Head f={f} at={fAuch} y={200} c={C.blue}>Rentner? Unklar.</Head>}
          <Src f={f} at={fRentner}>Medienberichte Aug. 2026 · eigene Recherche bis 29.10.2026: keine amtliche Zusage gefunden</Src>
        </g>
      );
    },
  },
  { // 6.6 vierte Karte dreht sich: Formular „Widerruf“ – nur einmal
    at: p63 - 6, kind: "zoom", render: (f) => {
      const flip = tw(f, fFormular - 6, 16, IO);
      const sx = Math.abs(Math.cos(flip * Math.PI));
      return (
        <g>
          <g transform={`translate(560 600) scale(${sx * 1.1} 1.1)`}>
            {flip < 0.5 ? <Card3 x={0} y={0} title="" col={C.gray} down /> : <Form x={0} y={0} s={1.25} title="WIDERRUF" sign={tw(f, fEinmal - 10, 30)} />}
          </g>
          <Item f={f} at={fBefr} x={980} y={430} w={820} text="Befreiung widerrufen" col={C.green} />
          <Pop f={f} at={fEinmal} x={1390} y={620}><Pill x={0} y={0} text="nur einmal möglich" col={C.amber} s={52} /></Pop>
          <g opacity={tw(f, fDanach, 12)}>
            <path d="M 1180 810 Q 1120 760 1180 720" stroke={C.red} strokeWidth={12} fill="none" strokeLinecap="round" />
            <Tx x={1420} y={800} s={52} c={C.red}>kein Zurück</Tx>
          </g>
          <Head f={f} at={fFormular} y={200} c={C.green}>Widerruf: nur einmal</Head>
          <Src f={f} at={fBefr}>Quelle: Deutsche Rentenversicherung, 05.06.2026 · keine Rechtsberatung</Src>
        </g>
      );
    },
  },
  { // 6.7 Preisschilder: heute knapp 22 € → ab Januar knapp 23 €
    at: fHeute - 6, kind: "slide", render: (f) => (
      <g>
        <g opacity={tw(f, f22 - 4, 12)}>
          <Tx x={560} y={420} s={48} c={C.gray} w={700}>heute</Tx>
          <Tag x={330} y={560} text="21,71 €" col={C.blue} s={2.0} r={-6} />
        </g>
        <g opacity={tw(f, f23 - 6, 12)}>
          <path d="M 940 560 L 1080 560" stroke={C.amber} strokeWidth={14} strokeLinecap="round" />
          <path d="M 1060 532 L 1096 560 L 1060 588" stroke={C.amber} strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <Tx x={1440} y={420} s={48} c={C.gray} w={700}>ab Januar</Tx>
          <Tag x={1200} y={560} text="22,79 €" col={C.amber} s={2.0} r={6} />
        </g>
        <Tx x={960} y={800} s={40} c={C.gray} w={700} o={tw(f, f22, 12)}>Dein Eigenanteil zur Rente, pro Monat (3,6 %)</Tx>
        <Head f={f} at={f22} y={200}>knapp 22 € → 23 €</Head>
        <Src f={f} at={f22}>Eigene Rechnung: 603 € × 3,6 % = 21,71 € · 633 € × 3,6 % = 22,79 € (Minijob-Zentrale, DRV 05.06.2026)</Src>
      </g>
    ),
  },
  { // 6.8 Rentenbalken wächst voll; Antrag → Arbeitgeber
    at: fDafuer - 6, kind: "slide", render: (f) => {
      const g = tw(f, fRente - 14, 34);
      const fly = tw(f, fAntrag, 24, IO);
      return (
        <g>
          <rect x={300} y={360} width={120} height={540} rx={60} fill="#22304A" />
          <rect x={300} y={900 - 540 * g} width={120} height={540 * g} rx={60} fill={C.green} />
          <Tx x={360} y={960} s={40} c={C.green} w={700}>Rente</Tx>
          <Tx x={360} y={330} s={52} c={C.green} o={g}>voll</Tx>
          <Pop f={f} at={fOb} x={960} y={330}><Pill x={0} y={0} text="hängt von deiner Lage ab" col={C.blue} fg={C.white} s={40} /></Pop>
          <g opacity={tw(f, fAntrag - 6, 10)} transform={`translate(${lerp(760, 1180, fly)} ${lerp(680, 600, fly) - Math.sin(fly * Math.PI) * 80}) rotate(${lerp(-8, 4, fly)})`}>
            <Paper x={0} y={0} w={240} h={300} title="ANTRAG" col={C.green} lines={4} />
          </g>
          <g opacity={tw(f, fAntrag - 10, 12)}>
            <Toni f={f} x={1560} y={470} s={0.95} smileAt={fAG + 4} flip />
            <Pill x={1560} y={940} text="Arbeitgeber" col={C.deep} fg={C.white} s={38} />
          </g>
          <Tx x={800} y={980} s={30} c={C.gray} w={600} o={tw(f, fOb, 12)}>Keine Rechtsberatung</Tx>
          {f < fAntrag - 2 ? <Head f={f} at={fDafuer} y={200} c={C.green}>Zählt voll für die Rente</Head> : <Head f={f} at={fAntrag} y={200} c={C.green}>Antrag beim Arbeitgeber</Head>}
        </g>
      );
    },
  },
];

export const V7Ch6: React.FC = () => {
  const f = useCurrentFrame();
  const sfx: Sfx[] = [
    [4, "soft", 0.4], [fSicher - 8, "whoosh", 0.5], [fKK + 10, "stamp", 0.4],
    [fGeplant - 8, "whoosh", 0.5], [fAnfang, "paper", 0.4], [fBeschl, "stamp", 0.5],
    [fOffen - 8, "whoosh", 0.5], [fPaket - 4, "soft", 0.4], [fDie3 - 8, "whoosh", 0.4], [fWie, "soft", 0.5],
    [p62b - 8, "whoosh", 0.5], [fZusage, "stamp", 0.5],
    [p63 - 8, "whoosh", 0.5], [fFormular - 4, "paper", 0.5], [fEinmal, "ding", 0.4],
    [fHeute - 8, "whoosh", 0.4], [f23, "coins", 0.4], [fDafuer - 8, "whoosh", 0.4], [fAntrag, "paper", 0.4], [fAG, "marimba", 0.4],
  ];
  return (
    <V7Shell n={6} title="Was wirklich entschieden ist" sfx={sfx}>
      <Scenes7 f={f} list={S} end={DUR} />
    </V7Shell>
  );
};
