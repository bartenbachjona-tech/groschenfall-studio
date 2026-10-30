/* V7 Kapitel 5 – Wer profitiert wirklich? (Storyboard 5.1–5.12, Fairness-Block) */
import React from "react";
import { useCurrentFrame } from "remotion";
import T from "../data/v7ch5.json";
import { Timing } from "../kit/core";
import {
  BarWall, C, Clock, Donut, Door, Head, Klaus, Lena, Letter, LowerThird, Mag, Mini, NamedBust, Paper, Pill, Pop, Pub, Quote, Row, Sandra, Sc, Scale, Scenes7, Sfx, Src, Suit, Tag, Toni, Tx, V7Shell,
  CL, IO, OUT, interpolate, lerp, mk7, pop, tw,
} from "./kit7";

const TM = T as Timing;
const { wk, ps, DUR } = mk7(TM);
export const V7CH5_DUR = DUR;

// Wort-Anker (geprüft gegen v7ch5.json)
const fAG = wk("v7_5_0", "Arbeitgeber"), fSamstags = wk("v7_5_0", "samstags"), fVier = wk("v7_5_0", "=vier"), fPaar = wk("v7_5_0", "paar"), fGuido = wk("v7_5_0", "Guido"), fPraes = wk("v7_5_0", "Präsident"), fDpa = wk("v7_5_0", "dpa"), fDie2 = wk("v7_5_0", "=die", 2), fKata = wk("v7_5_0", "Katastrophe");
const p51 = ps("v7_5_1"), fSteuerv = wk("v7_5_1", "Steuervorteil"), fSandra = wk("v7_5_1", "Sandra"), f7000 = wk("v7_5_1", "siebentausend"), fAllein = wk("v7_5_1", "alleinstehend"), fGFB = wk("v7_5_1", "Grundfreibetrag"), fESt = wk("v7_5_1", "Einkommensteuer");
const p52 = ps("v7_5_2"), fAnderes = wk("v7_5_2", "anderes"), f35 = wk("v7_5_2", "dreieinhalb"), fIhr = wk("v7_5_2", "=ihr"), fAbgfrei = wk("v7_5_2", "abgabenfrei"), fBelastet = wk("v7_5_2", "belastet"), fEhe = wk("v7_5_2", "Ehepartnern"), fGehalt = wk("v7_5_2", "Gehalt");
const p53 = ps("v7_5_3"), fLena = wk("v7_5_3", "Lena"), fStud = wk("v7_5_3", "studieren"), fKlaus = wk("v7_5_3", "Klaus"), fAufb = wk("v7_5_3", "Aufbesserung"), fSorge = wk("v7_5_3", "Sorge"), fTeuer = wk("v7_5_3", "teuer"), fGemacht = wk("v7_5_3", "gemacht"), fSchwarz = wk("v7_5_3", "schwarz");
const p53b = ps("v7_5_3b"), fAllianz = wk("v7_5_3b", "Allianz"), fJuli = wk("v7_5_3b", "Juli"), fBrief = wk("v7_5_3b", "Brief"), fMin = wk("v7_5_3b", "Ministerinnen"), fOhne = wk("v7_5_3b", "Ohne"), fStKl = wk("v7_5_3b", "Steuerklasse"), f130 = wk("v7_5_3b", "hundertdreißig"), fUm = wk("v7_5_3b", "=um"), f13 = wk("v7_5_3b", "dreizehn");
const p54 = ps("v7_5_4"), fBMAS = wk("v7_5_4", "Arbeitsministerium"), fEuro = wk("v7_5_4", "Euro"), fRente = wk("v7_5_4", "Rente"), fWoertl = wk("v7_5_4", "Wörtlich"), fMehr = wk("v7_5_4", "Mehr"), fHaelfte = wk("v7_5_4", "Hälfte");
const p55 = ps("v7_5_5"), fBeide = wk("v7_5_5", "Beide"), fToniL = wk("v7_5_5", "Toni"), fHeute = wk("v7_5_5", "heute"), fSandraA = wk("v7_5_5", "Sandra");

const VB = "Rechnung der Verbände";

const S: Sc[] = [
  { // 5.1 Toni, volle Kneipe, vier Aushilfen kommen rein
    at: 0, render: (f) => (
      <g>
        <BarWall shelfX={1420} counterY={830} />
        <Toni f={f} x={420} y={430} s={0.95} pointAt={fVier} />
        {[0, 1, 2, 3].map((i) => {
          const k = tw(f, fVier - 4 + i * 6, 22, IO);
          return <g key={i} opacity={k}><Mini x={lerp(2000, 900 + i * 170, k)} y={760} s={2.6} col={[C.green, C.blue, C.amber, "#86A9FF"][i]} /></g>;
        })}
        <Pop f={f} at={fSamstags} x={1460} y={400}><Pill x={0} y={0} text="Samstag, 22:30" col={C.deep} fg={C.white} s={40} /></Pop>
        <Head f={f} at={fVier + 4} y={240} x={1260} c={C.green}>+4 Leute, samstags</Head>
        <Tx x={1260} y={900} s={38} c={C.gray} w={700} o={tw(f, fPaar, 10)}>nur für ein paar Stunden</Tx>
      </g>
    ),
  },
  { // 5.2a Stilisierte Figur mit Namensschild
    at: fGuido - 6, kind: "slide", render: (f) => (
      <g>
        <NamedBust f={f} x={720} y={520} s={1.0} name="Guido Zöllick" role="Präsident, Hotel- und Gaststättenverband" tagAt={fGuido} />
        <Pop f={f} at={fDpa - 10} x={1360} y={520}><Pill x={0} y={0} text="Juni 2026 · zitiert nach dpa" col={C.blue} fg={C.white} s={40} /></Pop>
        <Tx x={1360} y={640} s={30} c={C.gray} w={600} o={tw(f, fDpa, 10)}>stilisierte Darstellung</Tx>
        <Src f={f} at={fGuido}>Zitat zitiert nach Tageskarte/dpa 22.06.2026 · hogapage 23.06.2026</Src>
      </g>
    ),
  },
  { // 5.2b Zitat-Tafel „Katastrophe“
    at: fDie2 - 8, kind: "fade", render: (f) => (
      <g>
        <NamedBust f={f} x={260} y={560} s={0.7} name="Guido Zöllick" role="Hotel- und Gaststättenverband" tagAt={-100} />
        <g transform="translate(520 330) scale(1.25)">
          <Quote f={f} at={fDie2} x={0} y={0} w={1000} lines={["Die Vorschläge der Rentenkommission", "gehen an der betrieblichen Realität", "vorbei und wären für das Gastgewerbe", "eine Katastrophe."]} who="Guido Zöllick, zitiert nach dpa" />
        </g>
        <Head f={f} at={fKata} y={175} c={C.amber}>„eine Katastrophe“</Head>
        <Src f={f} at={fDie2}>Zitat zitiert nach Tageskarte/dpa 22.06.2026 · hogapage 23.06.2026</Src>
      </g>
    ),
  },
  { // 5.3a Lupe auf „Steuervorteil“
    at: p51 - 6, kind: "zoom", render: (f) => {
      const m = tw(f, fSteuerv - 10, 20, IO);
      return (
        <g>
          <rect x={560} y={440} width={800} height={200} rx={30} fill={C.deep} />
          <text x={960} y={570} textAnchor="middle" fontFamily="Sora" fontWeight={800} fontSize={90} fill={C.amber}>Steuervorteil</text>
          <g transform={`translate(${lerp(500, 0, m)} ${lerp(260, 0, m)})`}><Mag x={1100} y={560} s={1.6} /></g>
          <Head f={f} at={fSteuerv} y={190}>Wer hat den Vorteil?</Head>
        </g>
      );
    },
  },
  { // 5.3b Sandra: 7.236 € unter Grundfreibetrag 12.348 €
    at: fSandra - 6, kind: "slide", render: (f) => {
      const a = tw(f, f7000 - 6, 24), b = tw(f, fGFB - 10, 24);
      const SC = 0.04;
      return (
        <g>
          <Sandra f={f} x={380} y={440} s={0.9} smileAt={fESt + 10} />
          <line x1={700} y1={880} x2={1760} y2={880} stroke="#2A3F63" strokeWidth={6} />
          <rect x={820} y={880 - 7236 * SC * a} width={260} height={7236 * SC * a} rx={14} fill={C.blue} />
          <Tx x={950} y={880 - 7236 * SC * a - 24} s={64} o={a}>7.236 €</Tx>
          <Tx x={950} y={940} s={34} c={C.gray} w={700}>Jahreslohn</Tx>
          <g opacity={b}>
            <line x1={720} y1={880 - 12348 * SC} x2={1740} y2={880 - 12348 * SC} stroke={C.green} strokeWidth={8} strokeDasharray="22 14" />
            <Tx x={1420} y={880 - 12348 * SC - 24} s={50} c={C.green}>12.348 €</Tx>
            <Tx x={1420} y={880 - 12348 * SC + 50} s={32} c={C.gray} w={700}>Grundfreibetrag 2026</Tx>
          </g>
          <Pop f={f} at={fESt + 6} x={1420} y={760}><Pill x={0} y={0} text="Einkommensteuer: 0 €" col={C.green} s={42} /></Pop>
          <Head f={f} at={fGFB} y={175} c={C.green}>unter Grundfreibetrag</Head>
          <Src f={f} at={f7000}>Quelle: § 32a Abs. 1 EStG (Grundfreibetrag 2026: 12.348 €) · 603 € × 12 = 7.236 € · vereinfacht: alleinstehend, keine anderen Einkünfte</Src>
        </g>
      );
    },
  },
  { // 5.4a Wer schon ein Einkommen hat: 3,5 Mio. mit Hauptjob
    at: p52 - 6, kind: "slide", render: (f) => (
      <g>
        <Suit f={f} x={560} y={460} s={1.0} smileAt={f35} />
        <Pop f={f} at={f35} x={1300} y={520}>
          <g>
            <rect x={-380} y={-150} width={760} height={300} rx={30} fill={C.deep} />
            <Tx x={0} y={20} s={120} c={C.white}>3,5 Mio.</Tx>
            <Tx x={0} y={100} s={40} c={C.gray} w={700}>Minijob neben Hauptjob</Tx>
          </g>
        </Pop>
        <Head f={f} at={fAnderes} y={175}>Wer schon verdient</Head>
        <Src f={f} at={f35}>Quelle: Bundesagentur für Arbeit, 30.09.2026 (Juli 2026: 3,52 Mio. im Nebenjob)</Src>
      </g>
    ),
  },
  { // 5.4b Hauptjob-Zettel mit Abzügen vs. Minijob-Zettel ohne
    at: fIhr - 6, kind: "zoom", render: (f) => (
      <g>
        <Paper x={620} y={600} w={560} h={480} title="HAUPTJOB" col={C.gray}>
          <Row w={560} y={-70} label="jeder Euro mehr" val="" />
          <Row w={560} y={20} label="Steuer" val="−" col={C.red} o={tw(f, fBelastet - 20, 10)} />
          <Row w={560} y={90} label="Abgaben" val="−" col={C.red} o={tw(f, fBelastet - 10, 10)} />
          <Row w={560} y={180} label="netto" val="weniger" col={C.red} big o={tw(f, fBelastet, 10)} />
        </Paper>
        <Paper x={1320} y={600} w={560} h={480} title="MINIJOB" col={C.green}>
          <Row w={560} y={-70} label="jeder Euro mehr" val="" />
          <Row w={560} y={20} label="Steuer" val="0" col="#1F9E6B" o={tw(f, fAbgfrei, 10)} />
          <Row w={560} y={90} label="Abgaben" val="0" col="#1F9E6B" o={tw(f, fAbgfrei + 6, 10)} />
          <Row w={560} y={180} label="netto" val="= brutto" col="#1F9E6B" big o={tw(f, fAbgfrei + 12, 10)} />
        </Paper>
        <Head f={f} at={fAbgfrei} y={175} c={C.green}>Nebenjob: brutto = netto</Head>
        <Src f={f} at={fAbgfrei}>Vereinfachte Darstellung · Quelle: Minijob-Zentrale (ein Minijob neben Hauptjob bleibt abgabenfrei für Beschäftigte)</Src>
      </g>
    ),
  },
  { // 5.5 Paar am Küchentisch
    at: fEhe - 6, kind: "slide", render: (f) => (
      <g>
        <Suit f={f} x={620} y={430} s={0.85} />
        <Sandra f={f} x={1300} y={430} s={0.85} flip blinkSeed={5} />
        <rect x={560} y={760} width={800} height={30} rx={10} fill="#8A5A3C" />
        <rect x={600} y={790} width={20} height={160} fill="#5B3A29" /><rect x={1300} y={790} width={20} height={160} fill="#5B3A29" />
        <Pop f={f} at={fGehalt - 4} x={820} y={730}><Paper x={0} y={0} w={200} h={110} title="GEHALT" col={C.blue} /></Pop>
        <Pop f={f} at={fGehalt + 10} x={1100} y={730}><Paper x={0} y={0} w={200} h={110} title="+ MINIJOB" col={C.green} /></Pop>
        <Head f={f} at={fEhe + 4} y={175}>Zuverdienst zum Partner</Head>
        <Src f={f} at={fEhe}>Beispielfiguren · Einordnung: Steuervorteil wirkt v. a. bei weiterem Einkommen im Haushalt</Src>
      </g>
    ),
  },
  { // 5.6 Lena mit Büchern, Klaus mit Einkaufswagen
    at: p53 - 6, kind: "slide", render: (f) => (
      <g>
        <g opacity={tw(f, fLena - 8, 12)}>
          <Lena f={f} x={560} y={440} s={0.9} smileAt={fStud} />
          {[0, 1, 2].map((i) => <rect key={i} x={680} y={760 - i * 36} width={150 - i * 16} height={32} rx={6} fill={[C.blue, C.amber, C.green][i]} />)}
          <Tx x={560} y={930} s={40} c={C.gray} w={700}>Studium</Tx>
        </g>
        <g opacity={tw(f, fKlaus - 8, 12)}>
          <Klaus f={f} x={1300} y={440} s={0.9} smileAt={fAufb} />
          <g transform="translate(1520 700)">
            <path d="M -110 -60 L 110 -60 L 90 60 L -90 60 Z" fill="none" stroke="#9AA8BF" strokeWidth={10} />
            <line x1={-110} y1={-60} x2={-150} y2={-110} stroke="#9AA8BF" strokeWidth={10} />
            <circle cx={-60} cy={90} r={16} fill="#9AA8BF" /><circle cx={60} cy={90} r={16} fill="#9AA8BF" />
          </g>
          <Tx x={1300} y={930} s={40} c={C.gray} w={700}>Rente aufbessern</Tx>
        </g>
        <Head f={f} at={p53 + 4} y={175}>Und die Beschäftigten?</Head>
      </g>
    ),
  },
  { // 5.7 Zu teuer? Dunkle Tür – oder schwarz?
    at: fSorge - 6, kind: "zoom", render: (f) => {
      const op = tw(f, fSchwarz - 10, 20, IO);
      return (
        <g>
          <Tag x={540} y={420} text="Job zu teuer?" col={C.amber} r={-8} s={tw(f, fTeuer - 6, 10) > 0 ? 1.1 : 0} />
          <g opacity={1 - 0.6 * tw(f, fGemacht, 12)}><Mini x={600} y={760} s={3} col={C.blue} /></g>
          <Door x={1300} y={880} s={1.05} open={op} />
          <g opacity={op}><Tx x={1300} y={300} s={42} c={C.gray} w={700}>bar auf die Hand</Tx></g>
          {f < fSchwarz - 2 ? <Head f={f} at={fSorge + 4} y={175}>Zu teuer = weg?</Head> : <Head f={f} at={fSchwarz} y={175} c={C.red}>Oder schwarz?</Head>}
          <Src f={f} at={fSorge}>Sorge aus der Debatte, u. a. Begründung BR-Drs. 507/1/26 (Eindämmung von Schwarzarbeit)</Src>
        </g>
      );
    },
  },
  { // 5.8 Brief der Verbände an zwei Ministerinnen
    at: p53b - 6, kind: "slide", render: (f) => (
      <g>
        <Letter x={760} y={600} s={1.2} r={-4} open={tw(f, fBrief, 20, IO)} title="Verbändeallianz" />
        <Pop f={f} at={fJuli} x={760} y={300}><Pill x={0} y={0} text="09.07.2026" col={C.blue} fg={C.white} s={40} /></Pop>
        <g opacity={tw(f, fMin - 4, 12)}>
          {[0, 1].map((i) => (
            <g key={i} transform={`translate(${1360 + i * 260} 600)`}>
              <circle cx={0} cy={-60} r={56} fill="#C9D3E2" />
              <path d="M -80 120 Q -80 10 0 4 Q 80 10 80 120 Z" fill="#C9D3E2" />
              <rect x={-90} y={150} width={180} height={50} rx={12} fill={C.deep} />
              <text y={186} textAnchor="middle" fontFamily="Sora" fontWeight={800} fontSize={26} fill={C.white}>Ministerin</text>
            </g>
          ))}
        </g>
        <Head f={f} at={fAllianz + 4} y={175}>Brief der Verbände</Head>
        <Src f={f} at={fAllianz}>Quelle: Verbändebrief vom 09.07.2026 an die Bundesministerinnen für Gesundheit und Arbeit ({VB})</Src>
      </g>
    ),
  },
  { // 5.9a Lohnzettel StKl 1: − 130 € netto
    at: fOhne - 6, kind: "zoom", render: (f) => (
      <g>
        <Paper x={960} y={600} w={760} h={520} title="LOHNZETTEL · STEUERKLASSE 1" col={C.gray}>
          <Row w={760} y={-60} label="ohne Minijob-Status" val="" />
          <Row w={760} y={60} label="netto pro Monat" val="− 130 €" col={C.red} big o={tw(f, f130, 10)} />
        </Paper>
        <Pill x={960} y={930} text={VB} col="#2A3F63" fg={C.white} s={34} />
        <Head f={f} at={f130} y={175} c={C.red}>− 130 € netto</Head>
        <Src f={f} at={fOhne}>Quelle: Verbändebrief 09.07.2026 (Annahme: 13,90 €/Std., Steuerklasse 1) – Rechnung der Verbände</Src>
      </g>
    ),
  },
  { // 5.9b Uhr: + 13 Stunden
    at: fUm - 6, kind: "slide", render: (f) => {
      const k = tw(f, f13 - 6, 30, IO);
      return (
        <g>
          <Clock x={720} y={580} r={230} h={8 + k * 13} m={k * 780} />
          <Tx x={1360} y={600} s={150} c={C.amber} o={tw(f, f13, 10)}>+13 Std.</Tx>
          <Tx x={1360} y={680} s={38} c={C.gray} w={700} o={tw(f, f13 + 10, 10)}>mehr arbeiten im Monat</Tx>
          <Pill x={1360} y={930} text={VB} col="#2A3F63" fg={C.white} s={34} />
          <Head f={f} at={f13} y={175}>13 Stunden mehr</Head>
          <Src f={f} at={fUm}>Quelle: Verbändebrief 09.07.2026 – Rechnung der Verbände</Src>
        </g>
      );
    },
  },
  { // 5.10a Befürworter: jeder Euro erhöht die Rente (Waage)
    at: p54 - 6, kind: "slide", render: (f) => {
      const g = tw(f, fEuro - 6, 40);
      return (
        <g>
          <Scale x={960} y={500} tilt={lerp(0, -10, g)} s={1}
            left={<g><rect x={-40} y={-200 * g} width={80} height={200 * g} rx={20} fill={C.green} /><Tx x={0} y={-200 * g - 20} s={36} c={C.green} o={g}>Rente</Tx></g>}
            right={<Tx x={0} y={-20} s={40} c={C.gray}>Minijob</Tx>} />
          <Pop f={f} at={fBMAS} x={1560} y={300}><Pill x={0} y={0} text="Arbeitsministerium" col={C.blue} fg={C.white} s={40} /></Pop>
          <Head f={f} at={fEuro} y={175} c={C.green}>Jeder Euro zählt</Head>
          <Src f={f} at={fBMAS}>Quelle: BMAS-Faktenpapier zur Alterssicherungskommission, 23.06.2026</Src>
        </g>
      );
    },
  },
  { // 5.10b Zitat BMAS
    at: fWoertl - 6, kind: "fade", render: (f) => (
      <g>
        <Pill x={960} y={260} text="WÖRTLICH" col={C.green} s={40} />
        <g transform="translate(330 360) scale(1.25)">
          <Quote f={f} at={fWoertl + 6} x={0} y={0} w={1010} col={C.green} lines={["Das verhindert Altersarmut und schafft", "vor allem für Frauen Anreize,", "die Arbeitszeit auszuweiten."]} who="BMAS-Faktenpapier, 23.06.2026" />
        </g>
        <Src f={f} at={fWoertl}>Quelle: BMAS-Faktenpapier 23.06.2026 (Abschnitt „Abschaffung Minijobs“)</Src>
      </g>
    ),
  },
  { // 5.11 Ring 55,9 % Frauen
    at: fMehr - 6, kind: "zoom", render: (f) => (
      <g>
        <Donut x={960} y={560} r={230} p={0.559 * tw(f, fHaelfte - 6, 24)} col={C.amber} val="55,9 %" label="der gewerblichen Minijobber" />
        <Head f={f} at={fHaelfte} y={175} c={C.amber}>56 % Frauen</Head>
        <Src f={f} at={fMehr}>Quelle: Minijob-Zentrale, Quartalsbericht II/2026 (gewerblich, Stichtag 30.06.2026)</Src>
      </g>
    ),
  },
  { // 5.12 Waage pendelt sich ein: heute vs. im Alter
    at: p55 - 6, kind: "slide", render: (f) => {
      const t = interpolate(f, [p55, fBeide + 30], [-12, 0], { ...CL, easing: OUT }) + Math.sin(f / 12) * 1.5 * tw(f, fBeide + 30, 20);
      return (
        <g>
          <Scale x={960} y={560} tilt={t} s={1}
            left={<g opacity={tw(f, p55 + 4, 12)}><Toni f={f} x={-55} y={-250} s={0.55} /><Lena f={f} x={60} y={-250} s={0.55} /></g>}
            right={<g opacity={tw(f, p55 + 10, 12)}><Sandra f={f} x={0} y={-250} s={0.55} smileAt={fSandraA} /></g>} />
          <Tx x={600} y={980} s={40} c={C.green} o={tw(f, fHeute, 10)}>heute</Tx>
          <Tx x={1320} y={980} s={40} c={C.amber} o={tw(f, fSandraA + 10, 10)}>im Alter</Tx>
          <Head f={f} at={fBeide} y={175}>Beide haben einen Punkt</Head>
        </g>
      );
    },
  },
];

export const V7Ch5: React.FC = () => {
  const f = useCurrentFrame();
  const sfx: Sfx[] = [
    [fVier - 4, "whoosh", 0.4], [fGuido - 8, "whoosh", 0.5], [fDie2 - 8, "soft", 0.5],
    [p51 - 8, "whoosh", 0.5], [fSandra - 8, "whoosh", 0.4], [fGFB, "ding", 0.4],
    [p52 - 8, "whoosh", 0.5], [fIhr - 8, "paper", 0.4], [fEhe - 8, "whoosh", 0.4],
    [p53 - 8, "whoosh", 0.5], [fSorge - 8, "soft", 0.5], [fSchwarz - 6, "soft", 0.6],
    [p53b - 8, "paper", 0.5], [f130, "coins", 0.4], [fUm - 8, "whoosh", 0.4], [f13, "ding", 0.4],
    [p54 - 8, "whoosh", 0.5], [fWoertl - 6, "soft", 0.5], [fMehr - 8, "whoosh", 0.4], [p55 - 8, "marimba", 0.5],
  ];
  return (
    <V7Shell n={5} title="Wer profitiert wirklich?" sfx={sfx}>
      <Scenes7 f={f} list={S} end={DUR} />
    </V7Shell>
  );
};
