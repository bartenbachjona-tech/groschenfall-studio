/* V7 Kapitel 1 – Was ein Minijob ist – und wer ihn hat (Storyboard 1.1–1.11) */
import React from "react";
import { useCurrentFrame } from "remotion";
import T from "../data/v7ch1.json";
import { Timing } from "../kit/core";
import {
  Bakery, C, Checkout, Du, Form, Head, Klaus, Lena, LowerThird, Mini, Paper, Pill, Pop, Pot, Row, Sandra, Sc, Scenes7, Sfx, Src, Toni, Tx, V7Shell,
  CL, IO, OUT, interpolate, lerp, mk7, pop, tw,
} from "./kit7";

const TM = T as Timing;
const { wk, ps, DUR } = mk7(TM);
export const V7CH1_DUR = DUR;

// Wort-Anker (geprüft gegen v7ch1.json)
const fGrund = wk("v7_1_0", "Grundregel"), f603 = wk("v7_1_0", "sechshundertdrei"), fKeine = wk("v7_1_0", "Keine"), fBrutto = wk("v7_1_0", "Brutto");
const fBezahlt = wk("v7_1_1", "Bezahlt"), fToni = wk("v7_1_1", "Toni"), fGut = wk("v7_1_1", "gut"), fRente = wk("v7_1_1", "Rente"), fKK = wk("v7_1_1", "Krankenkasse"), fSteuer = wk("v7_1_1", "Steuer");
const fEig = wk("v7_1_2", "Eigentlich"), fDrei = wk("v7_1_2", "=drei"), fFormular = wk("v7_1_2", "Formular"), fBefreien = wk("v7_1_2", "befreien"), fSo = wk("v7_1_2", "=so"), fVier = wk("v7_1_2", "=vier"), fMerk = wk("v7_1_2", "Merk"), fEnde = wk("v7_1_2", "Ende");
const p13 = ps("v7_1_3"), fSieben = wk("v7_1_3", "=sieben"), fBA = wk("v7_1_3", "Bundesagentur"), fGutV = wk("v7_1_3", "Gut"), fDreiein = wk("v7_1_3", "Dreieinhalb"), fUeber = wk("v7_1_3", "=über"), fAelter = wk("v7_1_3", "älter");
const fKlaus = wk("v7_1_4", "Klaus"), fSandra = wk("v7_1_4", "Sandra"), fZwoelf = wk("v7_1_4", "=zwölf"), fKnapp = wk("v7_1_4", "knapp"), fZuerst = wk("v7_1_4", "zuerst"), fDich = wk("v7_1_4", "dich");

const fR = fGut + 20, fK = fGut + 40, fS = fGut + 60; // Töpfe füllen sich ab „gut dreißig Prozent“

const HOLD: [number, number, number, number] = [-100, -90, 99998, 99999];

const S: Sc[] = [
  { // 1.1 Brutto = Netto
    at: 0, render: (f) => (
      <g>
        <Lena f={f} x={470} y={480} s={1.0} smileAt={fBrutto} />
        <Paper x={1200} y={580} w={600} h={520} title="LOHNZETTEL" col={C.blue}>
          <Row w={600} y={-90} label="Brutto" val="603 €" big o={tw(f, fGrund, 10)} />
          <Row w={600} y={-10} label="Abzüge" val="0 €" col={C.red} o={tw(f, fKeine, 10)} />
          <rect x={-264} y={30} width={528} height={4} fill="#0A111D" opacity={0.25 * tw(f, fKeine, 10)} />
          <Row w={600} y={110} label="Netto" val="603 €" col="#1F9E6B" big o={tw(f, fBrutto - 6, 10)} />
        </Paper>
        <Head f={f} at={fBrutto - 4} y={210} c={C.green}>Brutto = Netto</Head>
      </g>
    ),
  },
  { // 1.2 Toni füllt Töpfe → ≈ 31 %
    at: fBezahlt - 6, kind: "slide", render: (f) => {
      const g = (a: number) => tw(f, a, 24);
      return (
        <g>
          <Toni f={f} x={250} y={470} s={0.95} reach={[fGut - 6, fGut + 6, fSteuer + 20, fSteuer + 30]} />
          <Pot x={640} y={850} fill={0.8 * g(fR)} col={C.blue} label="Rente" val={f > fR ? "15 %" : undefined} />
          <Pot x={920} y={850} fill={0.72 * g(fK)} col={C.blue} label="Krankenkasse" val={f > fK ? "13 %" : undefined} />
          <Pot x={1200} y={850} fill={0.2 * g(fS)} col={C.blue} label="Steuer" val={f > fS ? "2 %" : undefined} />
          <Pot x={1480} y={850} fill={0.12 * g(fS + 12)} col={C.blue} label="Umlagen" val={f > fS + 12 ? "1,17 %" : undefined} />
          <Pop f={f} at={fS + 30} x={1700} y={420}><Pill x={0} y={0} text="≈ 31 %" col={C.amber} s={56} /></Pop>
          <Head f={f} at={fGut} y={190} c={C.amber}>+ gut 30 %</Head>
          <Src f={f} at={fRente}>Quelle: Minijob-Zentrale, Beiträge 2026 (gewerblich: 15 + 13 + 2 + 1,17 = 31,17 %)</Src>
        </g>
      );
    },
  },
  { // 1.3 Formular „Befreiung“, Lena unterschreibt
    at: fEig - 6, kind: "slide", render: (f) => (
      <g>
        <Lena f={f} x={520} y={470} s={1.0} reach={[fBefreien - 10, fBefreien, 99998, 99999]} look={6} />
        <Pop f={f} at={fFormular - 4} x={1120} y={600}><Form x={0} y={0} title="BEFREIUNG" sign={tw(f, fBefreien, 20)} /></Pop>
        <Head f={f} at={fDrei} y={190} c={C.blue}>3,6 % Rente?</Head>
        <Src f={f} at={fDrei}>Quelle: Minijob-Zentrale · Deutsche Rentenversicherung (Eigenanteil 3,6 %)</Src>
      </g>
    ),
  },
  { // 1.4 Fünf Figuren, vier werden grau
    at: fSo - 4, kind: "zoom", render: (f) => (
      <g>
        {[0, 1, 2, 3, 4].map((i) => {
          const grey = i < 4 ? tw(f, fVier + 6 + i * 4, 10) : 0;
          const p = pop(f, fSo + i * 3, 12);
          return (
            <g key={i} transform={`translate(${520 + i * 220} 640) scale(${p * 2.4})`}>
              <Mini x={0} y={0} col={grey > 0.5 ? "#5A6B88" : C.blue} />
              {i < 4 && <g opacity={grey}><rect x={-26} y={-8} width={52} height={36} rx={4} fill="#F4F6FA" /><rect x={-18} y={0} width={36} height={4} fill="#0A111D" opacity={0.3} /><rect x={-18} y={10} width={26} height={4} fill="#0A111D" opacity={0.3} /></g>}
            </g>
          );
        })}
        <Head f={f} at={fVier} y={240} s={110}>4 von 5</Head>
        <Tx x={960} y={880} s={38} c={C.gray} w={700} o={tw(f, fVier + 20, 12)}>ohne eigenen Rentenbeitrag</Tx>
        <Src f={f} at={fVier}>Quelle: Minijob-Zentrale, Quartalsbericht II/2026 (gewerblich 79,1 % nicht rentenversicherungspflichtig)</Src>
      </g>
    ),
  },
  { // 1.5 Formular blinkt, rutscht in die Schublade „später“
    at: fMerk + 4, kind: "fade", render: (f) => {
      const slide = interpolate(f, [fEnde - 10, fEnde + 14], [0, 1], { ...CL, easing: IO });
      const blink = f < fEnde - 10 ? 0.5 + 0.5 * Math.sin((f - fMerk) / 3) : 0;
      return (
        <g>
          {/* Kommode */}
          <rect x={560} y={700} width={800} height={300} rx={20} fill="#5B3A29" />
          <rect x={600} y={730} width={720} height={110} rx={14} fill="#7A4E36" />
          <rect x={900} y={770} width={120} height={20} rx={10} fill="#C9A27A" />
          <rect x={600} y={860} width={720} height={110} rx={14} fill="#7A4E36" />
          <g transform={`translate(960 ${lerp(430, 760, slide)}) scale(${lerp(1, 0.6, slide)})`} opacity={1 - slide * 0.9}>
            <rect x={-210} y={-260} width={420} height={520} rx={26} fill={C.amber} opacity={0.35 * blink} />
            <Form x={0} y={0} title="BEFREIUNG" sign={1} />
          </g>
          <rect x={560} y={700} width={800} height={30} rx={10} fill="#8A5A3C" />
          <Head f={f} at={fMerk} y={170} c={C.amber}>Merk dir das!</Head>
        </g>
      );
    },
  },
  { // 1.6 Lena nicht allein → 7,61 Mio.
    at: p13 - 6, kind: "zoom", render: (f) => {
      const n = Math.floor(interpolate(f, [p13 + 20, fSieben + 20], [0, 140], { ...CL, easing: OUT }));
      return (
        <g>
          {Array.from({ length: n }).map((_, i) => {
            const cx = 160 + (i % 20) * 84, cy = 380 + Math.floor(i / 20) * 92;
            if (cx > 820 && cx < 1100 && cy > 500 && cy < 800) return null;
            return <Mini key={i} x={cx} y={cy + 40} s={0.9} col={C.blue} o={0.55} />;
          })}
          <Lena f={f} x={960} y={500} s={0.75} />
          <g opacity={tw(f, fSieben, 12)}>
            <rect x={600} y={110} width={720} height={170} rx={30} fill={C.deep} opacity={0.92} />
            <Tx x={960} y={240} s={140} c={C.white}>7,61 Mio.</Tx>
          </g>
          <Tx x={960} y={330} s={40} c={C.gray} w={700} o={tw(f, fSieben + 20, 12)}>Minijobber im Juli 2026</Tx>
          <Src f={f} at={fBA - 10}>Quelle: Bundesagentur für Arbeit, Presseinfo Nr. 37, 30.09.2026 (Stand Juli 2026)</Src>
        </g>
      );
    },
  },
  { // 1.7 Split 4,09 / 3,52 Mio.
    at: fGutV - 6, kind: "slide", render: (f) => {
      const a = tw(f, fGutV, 20), b = tw(f, fDreiein, 20);
      return (
        <g>
          <rect x={360} y={760 - 480 * a} width={460} height={480 * a} rx={22} fill={C.blue} />
          <rect x={1100} y={760 - 413 * b} width={460} height={413 * b} rx={22} fill="#5C7BD0" />
          <Tx x={590} y={760 - 480 * a - 30} s={84} o={a}>4,09 Mio.</Tx>
          <Tx x={1330} y={760 - 413 * b - 30} s={84} o={b}>3,52 Mio.</Tx>
          <Tx x={590} y={830} s={44} c={C.gray} w={700} o={a}>nur Minijob</Tx>
          <Tx x={1330} y={830} s={44} c={C.gray} w={700} o={b}>neben Hauptjob</Tx>
          <g opacity={b} transform="translate(1330 560)"><rect x={-60} y={-40} width={120} height={80} rx={10} fill="#5B3A29" opacity={0.9} /><rect x={-20} y={-58} width={40} height={22} rx={6} fill="none" stroke="#5B3A29" strokeWidth={8} /></g>
          <Src f={f} at={fGutV}>Quelle: Bundesagentur für Arbeit, 30.09.2026 (Juli 2026: 4,09 Mio. ausschließlich, 3,52 Mio. im Nebenjob)</Src>
        </g>
      );
    },
  },
  { // 1.8 über 65: 1,2 Mio.
    at: fUeber - 8, kind: "zoom", render: (f) => {
      const k = tw(f, fUeber, 24);
      return (
        <g>
          <rect x={260} y={520} width={1400} height={120} rx={60} fill="#22304A" />
          <rect x={260} y={520} width={1400 * 0.182 * k} height={120} rx={60} fill={C.amber} />
          {Array.from({ length: 6 }).map((_, i) => (
            <g key={i} opacity={tw(f, fUeber + 10 + i * 3, 10)} transform={`translate(${330 + i * 50} 470)`}>
              <Mini x={0} y={0} s={0.8} col="#DDE2EA" />
            </g>
          ))}
          <Head f={f} at={fUeber + 4} y={300} s={110} c={C.amber}>über 65: 1,2 Mio.</Head>
          <Tx x={960} y={760} s={38} c={C.gray} w={700} o={tw(f, fAelter, 12)}>18,2 % der gewerblichen Minijobber</Tx>
          <Src f={f} at={fUeber}>Quelle: Minijob-Zentrale, Quartalsbericht II/2026 (Stichtag 30.06.2026, gewerblich 1.217.142)</Src>
        </g>
      );
    },
  },
  { // 1.9 Klaus an der Kasse
    at: fKlaus - 10, kind: "slide", render: (f) => (
      <g>
        <rect x={0} y={0} width={1920} height={700} fill="#1A2A40" />
        {Array.from({ length: 5 }).map((_, i) => <rect key={i} x={1250 + (i % 2) * 300} y={120 + Math.floor(i / 2) * 170} width={260} height={18} fill="#5A6B88" />)}
        <Klaus f={f} x={1160} y={380} s={1.0} smileAt={fKlaus + 10} />
        <Checkout x={860} y={720} />
        <LowerThird f={f} at={fKlaus} name="Klaus" role="Rentner" dur={80} />
      </g>
    ),
  },
  { // 1.10 Sandra in der Bäckerei, Kalender 2014 → 2026
    at: fSandra - 8, kind: "slide", render: (f) => {
      const yr = Math.round(interpolate(f, [fZwoelf - 6, fKnapp], [2014, 2026], { ...CL, easing: IO }));
      return (
        <g>
          <Sandra f={f} x={680} y={400} s={1.0} />
          <Bakery x={760} y={760} w={1060} />
          <g transform="translate(1530 470)" opacity={tw(f, fZwoelf - 10, 12)}>
            <rect x={-170} y={-170} width={340} height={330} rx={26} fill="#EEF2F7" />
            <rect x={-170} y={-170} width={340} height={80} rx={26} fill={C.red} /><rect x={-170} y={-110} width={340} height={20} fill={C.red} />
            <text y={-116} textAnchor="middle" fontFamily="Sora" fontWeight={800} fontSize={36} fill="#FFFFFF">JAHR</text>
            <text y={70} textAnchor="middle" fontFamily="Sora" fontWeight={800} fontSize={100} fill="#0A111D">{yr}</text>
          </g>
          <Head f={f} at={fZwoelf} y={170}>12 Jahre Minijob</Head>
          <LowerThird f={f} at={fSandra} name="Sandra" role="Bäckerei" dur={110} />
        </g>
      );
    },
  },
  { // 1.11 Du-Figur, Fragezeichen
    at: fZuerst - 8, kind: "zoom", render: (f) => {
      const z = interpolate(f, [fZuerst, DUR], [1, 1.12], CL);
      return (
        <g transform={`translate(960 600) scale(${z}) translate(-960 -600)`}>
          <ellipse cx={960} cy={940} rx={300} ry={40} fill="#0A111D" opacity={0.4} />
          <Du f={f} x={960} y={560} s={1.15} tag />
          <Pop f={f} at={fDich - 14} x={1300} y={420}><Tx x={0} y={0} s={240} c={C.amber}>?</Tx></Pop>
          <Head f={f} at={fZuerst + 10} y={190}>Und für dich?</Head>
        </g>
      );
    },
  },
];

export const V7Ch1: React.FC = () => {
  const f = useCurrentFrame();
  const sfx: Sfx[] = [
    [fBrutto - 4, "ding", 0.4], [fBezahlt - 8, "whoosh", 0.5], [fGut + 20, "coins", 0.4], [fS + 30, "soft", 0.6],
    [fFormular - 4, "paper", 0.5], [fVier, "soft", 0.5], [fEnde - 6, "whoosh", 0.4],
    [p13 - 8, "whoosh", 0.5], [fSieben, "ding", 0.4], [fUeber, "soft", 0.5],
    [fKlaus - 12, "whoosh", 0.5], [fSandra - 10, "whoosh", 0.5], [fZuerst - 10, "marimba", 0.5],
  ];
  return (
    <V7Shell n={1} title="Was ein Minijob ist" sfx={sfx}>
      <Scenes7 f={f} list={S} end={DUR} />
    </V7Shell>
  );
};
