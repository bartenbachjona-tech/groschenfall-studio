/* V7 Kapitel 4 – Was die Kommission will – und Sandras Rechnung (Storyboard 4.1–4.12) */
import React from "react";
import { useCurrentFrame } from "remotion";
import T from "../data/v7ch4.json";
import { Timing } from "../kit/core";
import {
  Building, C, Coins, Form, Head, Kid, Klaus, Lena, Mini, Paper, Pill, Pop, Report, Row, Sandra, Sc, Scenes7, Sfx, Src, StepRamp, Suit, Toni, Tx, V7Shell,
  CL, IO, OUT, interpolate, lerp, mk7, pop, tw,
} from "./kit7";

const TM = T as Timing;
const { wk, ps, DUR } = mk7(TM);
export const V7CH4_DUR = DUR;

// Wort-Anker (geprüft gegen v7ch4.json)
const fJuni = wk("v7_4_0", "Juni"), fASK = wk("v7_4_0", "Alterssicherungskommission"), fBericht = wk("v7_4_0", "Bericht"), f33 = wk("v7_4_0", "Dreiunddreißig"), f26 = wk("v7_4_0", "sechsundzwanzig"), fUeber = wk("v7_4_0", "Überschrift"), fMJ = wk("v7_4_0", "Minijobs"), fRV = wk("v7_4_0", "Rentenversicherung");
const p41 = ps("v7_4_1"), fBefr = wk("v7_4_1", "Befreiung"), fSonder = wk("v7_4_1", "Sonderregeln"), fSteuer = wk("v7_4_1", "Steuer"), fSV = wk("v7_4_1", "Sozialversicherung"), fBrutto = wk("v7_4_1", "Brutto"), fVorbei = wk("v7_4_1", "vorbei");
const fAusn = wk("v7_4_1", "Ausnahmen"), fSchueler = wk("v7_4_1", "Schülerinnen"), fStud = wk("v7_4_1", "Studierenden"), fLena = wk("v7_4_1", "Lena"), fNichts = wk("v7_4_1", "nichts");
const p42 = ps("v7_4_2"), fSandra = wk("v7_4_2", "Sandra"), fJahr = wk("v7_4_2", "Jahr"), f603 = wk("v7_4_2", "sechshundertdrei"), fSechs = wk("v7_4_2", "=sechs"), fNach = wk("v7_4_2", "=nach", 1), fZwoelf = wk("v7_4_2", "=zwölf"), f71 = wk("v7_4_2", "einundsiebzig");
const p43 = ps("v7_4_3"), f20 = wk("v7_4_3", "zwanzig"), fDoppelt = wk("v7_4_3", "doppelt"), fWarum = wk("v7_4_3", "Warum"), fGrenze = wk("v7_4_3", "Grenze"), fAbg = wk("v7_4_3", "Abgaben"), fLangsam = wk("v7_4_3", "langsam"), fTrotz = wk("v7_4_3", "Trotzdem");
const fSelbst = wk("v7_4_3", "Selbst"), fBReg = wk("v7_4_3", "Bundesregierung"), fLaenger = wk("v7_4_3", "länger"), fLohnen = wk("v7_4_3", "lohnen");
const p44 = ps("v7_4_4"), fStudie = wk("v7_4_4", "Studie"), f2021 = wk("v7_4_4", "zweitausendeinundzwanzig"), fIn = wk("v7_4_4", "=in"), f500 = wk("v7_4_4", "fünfhunderttausend"), fVerdr = wk("v7_4_4", "verdrängt"), fAber = wk("v7_4_4", "Aber"), fProf = wk("v7_4_4", "profitiert");

const SrcFAQ = "Quelle: Bundesregierung, FAQ Rentenreform 02.07.2026 (Vorschlag der Kommission, noch kein Gesetzentwurf)";

const S: Sc[] = [
  { // 4.1 Bericht der Kommission, Juni 2026
    at: 0, render: (f) => {
      const drop = interpolate(f, [fJuni - 6, fJuni + 12], [-600, 0], { ...CL, easing: OUT });
      return (
        <g>
          <ellipse cx={960} cy={860} rx={300} ry={36} fill="#0A111D" opacity={0.5} />
          <g transform={`translate(0 ${drop})`}><Report x={960} y={620} s={1.0} r={-3} /></g>
          <Pop f={f} at={fJuni + 4} x={1460} y={480}><Pill x={0} y={0} text="Juni 2026" col={C.blue} fg={C.white} s={48} /></Pop>
          <Pop f={f} at={fASK} x={960} y={960}><Pill x={0} y={0} text="Alterssicherungskommission" col={C.deep} fg={C.white} s={44} /></Pop>
          <Head f={f} at={fBericht} y={175}>Bericht der Rentenkommission</Head>
          <Src f={f} at={fJuni}>Quelle: BMAS, Bericht der Alterssicherungskommission, übergeben 23.06.2026</Src>
        </g>
      );
    },
  },
  { // 4.2a 33 Empfehlungen, Nr. 26 leuchtet
    at: f33 - 6, kind: "zoom", render: (f) => (
      <g>
        {Array.from({ length: 33 }).map((_, i) => {
          const cx = 330 + (i % 11) * 126, cy = 440 + Math.floor(i / 11) * 170;
          const hot = i === 25 ? tw(f, f26, 10) : 0;
          const p = pop(f, f33 - 4 + i * 0.7, 10);
          return (
            <g key={i} transform={`translate(${cx} ${cy}) scale(${p * (1 + 0.25 * hot)})`}>
              <rect x={-50} y={-66} width={100} height={132} rx={12} fill={hot > 0.5 ? C.amber : "#EEF2F7"} opacity={hot > 0 ? 1 : lerp(1, 0.35, tw(f, f26, 10))} />
              <text y={18} textAnchor="middle" fontFamily="Sora" fontWeight={800} fontSize={44} fill="#0A111D">{i + 1}</text>
            </g>
          );
        })}
        <Head f={f} at={f33} y={200}>33 Empfehlungen</Head>
        <Src f={f} at={f33}>Quelle: BMAS, 23.06.2026 · Bericht der Alterssicherungskommission</Src>
      </g>
    ),
  },
  { // 4.2b Empfehlung 26 – Überschrift
    at: fUeber - 6, kind: "slide", render: (f) => (
      <g>
        <Paper x={960} y={620} w={1280} h={560} title="EMPFEHLUNG 26" col={C.amber}>
          <text x={0} y={-60} textAnchor="middle" fontFamily="Sora" fontWeight={800} fontSize={60} fill="#0A111D" opacity={tw(f, fMJ, 10)}>Minijobs künftig wie normale Jobs</text>
          <text x={0} y={30} textAnchor="middle" fontFamily="Sora" fontWeight={800} fontSize={60} fill="#0A111D" opacity={tw(f, fRV - 10, 10)}>in die Rentenversicherung</text>
          <text x={0} y={120} textAnchor="middle" fontFamily="Sora" fontWeight={800} fontSize={60} fill="#0A111D" opacity={tw(f, fRV + 14, 10)}>einbeziehen</text>
          <rect x={-560} y={160} width={1120 * tw(f, fRV + 20, 16)} height={10} rx={5} fill={C.amber} />
        </Paper>
        <Head f={f} at={fUeber} y={190} c={C.amber}>Empfehlung 26</Head>
        <Src f={f} at={fUeber}>Überschrift der Empfehlung 26 laut BMAS-Seite zur Alterssicherungskommission</Src>
      </g>
    ),
  },
  { // 4.3 Befreiung mit Schloss, Sonderregeln weg, Brutto = Netto zerbricht
    at: p41 - 6, kind: "slide", render: (f) => {
      const crack = tw(f, fVorbei - 6, 12, IO);
      return (
        <g>
          <Form x={400} y={580} s={0.9} title="BEFREIUNG" sign={1} lock={pop(f, fBefr + 6, 14)} />
          {[["Steuer", fSteuer], ["Sozialversicherung", fSV]].map(([t, at], i) => {
            const k = tw(f, Number(at) + 6, 12);
            return (
              <g key={i} opacity={tw(f, fSonder - 4 + i * 6, 10)}>
                <Pill x={960} y={460 + i * 150} text={String(t)} col="#2A3F63" fg={C.white} s={44} />
                <line x1={760} y1={444 + i * 150} x2={760 + 400 * k} y2={444 + i * 150} stroke={C.red} strokeWidth={10} strokeLinecap="round" />
              </g>
            );
          })}
          <Tx x={960} y={330} s={34} c={C.gray} w={700} o={tw(f, fSonder, 10)}>Sonderregeln</Tx>
          <g opacity={tw(f, fBrutto - 6, 10)} transform="translate(1500 560)">
            <g transform={`translate(${-14 * crack} ${30 * crack}) rotate(${-8 * crack})`}>
              <path d="M -230 -90 L 0 -90 L -20 -10 L 10 30 L -10 90 L -230 90 Z" fill="#EEF2F7" />
              <text x={-120} y={20} textAnchor="middle" fontFamily="Sora" fontWeight={800} fontSize={48} fill="#0A111D">Brutto</text>
            </g>
            <g transform={`translate(${14 * crack} ${50 * crack}) rotate(${10 * crack})`}>
              <path d="M 0 -90 L 230 -90 L 230 90 L -10 90 L 10 30 L -20 -10 Z" fill="#EEF2F7" />
              <text x={120} y={20} textAnchor="middle" fontFamily="Sora" fontWeight={800} fontSize={48} fill="#0A111D">Netto</text>
            </g>
            <text x={0} y={20} textAnchor="middle" fontFamily="Sora" fontWeight={800} fontSize={48} fill="#0A111D" opacity={1 - crack}>=</text>
          </g>
          {f < fBrutto - 2 ? <Head f={f} at={fBefr} y={175} c={C.red}>Befreiung weg</Head> : <Head f={f} at={fBrutto} y={175} c={C.red}>Brutto = Netto vorbei</Head>}
          <Src f={f} at={fBefr}>{SrcFAQ}</Src>
        </g>
      );
    },
  },
  { // 4.4 Ausnahme nur Schüler, Lena ohne
    at: fAusn - 6, kind: "slide", render: (f) => (
      <g>
        <Kid f={f} x={620} y={560} s={0.75} smileAt={fSchueler + 4} />
        <Pop f={f} at={fSchueler} x={620} y={330}><Pill x={0} y={0} text="Ausnahme" col={C.green} s={48} /></Pop>
        <Tx x={620} y={900} s={38} c={C.gray} w={700} o={tw(f, fSchueler, 10)}>Schülerinnen und Schüler</Tx>
        <g opacity={tw(f, fStud - 10, 12)}>
          <Lena f={f} x={1320} y={470} s={0.95} look={-6} />
          <Tx x={1320} y={900} s={38} c={C.gray} w={700}>Studierende</Tx>
        </g>
        <Pop f={f} at={fLena + 6} x={1520} y={330}><Tx x={0} y={0} s={160} c={C.amber}>?</Tx></Pop>
        <Head f={f} at={fAusn} y={175}>Nur Schüler ausgenommen</Head>
        <Src f={f} at={fAusn}>{SrcFAQ}</Src>
      </g>
    ),
  },
  { // 4.5 Sandra: 1 Jahr Minijob → knapp 6 € Rente
    at: p42 - 6, kind: "slide", render: (f) => (
      <g>
        <Sandra f={f} x={500} y={460} s={1.0} look={6} />
        <Pop f={f} at={fJahr - 4} x={1240} y={600}>
          <Paper x={0} y={0} w={680} h={460} title="RENTE (SCHÄTZUNG)" col={C.blue}>
            <Row w={680} y={-70} label="Minijob" val="1 Jahr" />
            <Row w={680} y={10} label="Lohn" val="603 €" o={tw(f, f603, 10)} />
            <rect x={-304} y={50} width={608} height={4} fill="#0A111D" opacity={0.2} />
            <Row w={680} y={140} label="Rente / Monat" val="≈ 5,92 €" col="#B07A22" big o={tw(f, fSechs - 4, 10)} />
          </Paper>
        </Pop>
        <Head f={f} at={fSechs} y={175} c={C.amber}>knapp 6 € Rente</Head>
        <Src f={f} at={fSechs}>Eigene Rechnung: 7.236 € ÷ 51.944 € × 42,52 € = 5,92 € (Rentenwert 2026, voll versichert)</Src>
      </g>
    ),
  },
  { // 4.6 Münztürme 12 Jahre → ≈ 71 €
    at: fNach - 6, kind: "zoom", render: (f) => {
      const n = Math.floor(interpolate(f, [fZwoelf - 4, f71 - 6], [0, 12], { ...CL, easing: IO }));
      return (
        <g>
          {Array.from({ length: 12 }).map((_, i) => (
            <g key={i} opacity={i < n ? 1 : 0.12}><Coins x={360 + i * 108} y={840} n={i + 1} /></g>
          ))}
          <Tx x={960} y={930} s={38} c={C.gray} w={700}>Jahre Minijob, voll versichert</Tx>
          <Tx x={1640} y={400} s={120} c={C.amber} o={tw(f, f71, 10)}>≈ 71 €</Tx>
          <Head f={f} at={fZwoelf} y={175}>12 Jahre = 71 €</Head>
          <Src f={f} at={fZwoelf}>Eigene Rechnung: 12 × 5,92 € ≈ 71 € Rente im Monat (heutiger Rentenwert, ohne Anpassungen)</Src>
        </g>
      );
    },
  },
  { // 4.7 Zwei Sandras: Minijob vs. 20 Std. regulär
    at: p43 - 6, kind: "slide", render: (f) => {
      const a = tw(f, p43 + 10, 30), b = tw(f, fDoppelt - 10, 30);
      return (
        <g>
          <Sandra f={f} x={380} y={440} s={0.8} />
          <Sandra f={f} x={1180} y={440} s={0.8} smileAt={fDoppelt} blinkSeed={3} />
          <rect x={560} y={820 - 180 * a} width={160} height={180 * a} rx={14} fill={C.amber} />
          <rect x={1360} y={820 - 360 * b} width={160} height={360 * b} rx={14} fill={C.green} />
          <Tx x={640} y={900} s={36} c={C.gray} w={700}>Minijob</Tx>
          <Tx x={1440} y={900} s={36} c={C.gray} w={700} o={tw(f, f20, 10)}>20 Std. regulär</Tx>
          <Tx x={1440} y={820 - 360 * b - 24} s={60} c={C.green} o={b}>× 2</Tx>
          <Head f={f} at={fDoppelt} y={175} c={C.green}>doppelt so viel</Head>
          <Src f={f} at={f20}>Eigene Rechnung: 20 Std./Woche regulär ≈ 1.205 €/Monat → etwa doppelt so viele Rentenpunkte</Src>
        </g>
      );
    },
  },
  { // 4.8 Treppe: Sandra bleibt vor der Grenze stehen → Teilzeitfalle
    at: fWarum - 6, kind: "zoom", render: (f) => {
      const morph = tw(f, fLangsam - 10, 26, IO);
      const walk = tw(f, fWarum, 40, IO);
      return (
        <g>
          <line x1={240} y1={860} x2={1700} y2={860} stroke="#2A3F63" strokeWidth={6} />
          <StepRamp x0={240} x1={1680} base={860} stepX={900} lo={60} hi={420} morph={morph} col={C.amber} />
          <rect x={240} y={800} width={660} height={60} fill={C.green} opacity={0.9} />
          <Tx x={900} y={930} s={40} c={C.gray} w={700} o={tw(f, fGrenze, 10)}>Grenze 633 €</Tx>
          <Pop f={f} at={fAbg} x={1300} y={340}><Pill x={0} y={0} text="plötzlich Abgaben" col={C.red} fg={C.white} s={48} /></Pop>
          <Tx x={1400} y={760} s={36} c={C.deep} w={800} o={tw(f, fLangsam, 12) * morph}>steigen nur langsam</Tx>
          <Sandra f={f} x={lerp(420, 790, walk)} y={460} s={0.62} />
          {f < fTrotz - 2 ? <Head f={f} at={fGrenze} y={175}>Die Grenze</Head> : <Head f={f} at={fTrotz} y={175} c={C.amber}>Teilzeitfalle</Head>}
          <Src f={f} at={fGrenze}>Übergangsbereich (Midijob) über 633 € bis 2.000 € · Quelle: Minijob-Zentrale</Src>
        </g>
      );
    },
  },
  { // 4.9 Bundesregierung: viele würden gern länger arbeiten
    at: fSelbst - 6, kind: "slide", render: (f) => (
      <g>
        <Building x={420} y={800} s={0.8} />
        <Tx x={420} y={880} s={36} c={C.gray} w={700} o={tw(f, fBReg, 10)}>Bundesregierung</Tx>
        <g opacity={tw(f, fBReg + 10, 12)}>
          <rect x={800} y={380} width={940} height={330} rx={26} fill={C.deep} opacity={0.94} />
          <rect x={800} y={380} width={10} height={330} rx={5} fill={C.blue} />
          <text x={850} y={460} fontFamily="Sora" fontWeight={700} fontSize={44} fill={C.white}>Viele würden gern</text>
          <text x={850} y={520} fontFamily="Sora" fontWeight={800} fontSize={44} fill={C.amber} opacity={tw(f, fLaenger, 8)}>länger arbeiten,</text>
          <text x={850} y={580} fontFamily="Sora" fontWeight={700} fontSize={44} fill={C.white} opacity={tw(f, fLohnen - 20, 8)}>wenn sich das Überschreiten</text>
          <text x={850} y={640} fontFamily="Sora" fontWeight={700} fontSize={44} fill={C.white} opacity={tw(f, fLohnen - 8, 8)}>der Grenze lohnen würde.</text>
          <text x={850} y={690} fontFamily="Sora" fontWeight={600} fontSize={26} fill={C.gray}>sinngemäß</text>
        </g>
        <Head f={f} at={fLaenger} y={175}>Gern länger arbeiten</Head>
        <Src f={f} at={fBReg}>Quelle: Antwort der Bundesregierung, BT-Drs. 21/7990, laut hib 715/2026 (16.09.2026), indirekte Wiedergabe</Src>
      </g>
    ),
  },
  { // 4.10a IAB-Studie 2021
    at: p44 - 6, kind: "zoom", render: (f) => (
      <g>
        <Paper x={960} y={600} w={620} h={600} title="STUDIE" col={C.blue} lines={8} r={-3}>
          <text x={0} y={240} textAnchor="middle" fontFamily="Sora" fontWeight={700} fontSize={30} fill="#3A4560">Institut für Arbeitsmarkt-</text>
          <text x={0} y={276} textAnchor="middle" fontFamily="Sora" fontWeight={700} fontSize={30} fill="#3A4560">und Berufsforschung</text>
        </Paper>
        <Pop f={f} at={f2021} x={1460} y={420}><Pill x={0} y={0} text="2021" col={C.amber} s={70} /></Pop>
        <Head f={f} at={fStudie + 4} y={175}>Eine Studie von 2021</Head>
        <Src f={f} at={fStudie}>Quelle: IAB, Pressemitteilung 20.10.2021</Src>
      </g>
    ),
  },
  { // 4.10b Regulärer Job zerfällt in zwei Minijobs – bis 500.000 Stellen
    at: fIn - 6, kind: "slide", render: (f) => {
      const sp = tw(f, fVerdr - 6, 20, IO);
      return (
        <g>
          {/* kleiner Laden */}
          <rect x={520} y={360} width={880} height={500} rx={20} fill="#22304A" />
          <path d="M 500 360 L 1420 360 L 1380 290 L 540 290 Z" fill={C.blue} opacity={0.8} />
          {Array.from({ length: 8 }).map((_, i) => <rect key={i} x={540 + i * 110} y={290} width={55} height={70} fill="#EEF2F7" opacity={0.25} />)}
          <g opacity={1 - sp}><Mini x={960} y={720} s={3} col={C.green} /></g>
          <g opacity={sp}>
            <Mini x={lerp(960, 820, sp)} y={720} s={2.4} col={C.amber} />
            <Mini x={lerp(960, 1100, sp)} y={720} s={2.4} col={C.amber} />
          </g>
          <Tx x={960} y={940} s={36} c={C.gray} w={700}>{sp < 0.5 ? "sozialversichert" : "2 Minijobs"}</Tx>
          <Head f={f} at={f500} y={175} c={C.amber}>bis 500.000 Stellen?</Head>
          <Src f={f} at={f500}>Quelle: IAB 2021 – Schätzung für kleine Betriebe: bis zu 500.000 SV-Stellen verdrängt</Src>
        </g>
      );
    },
  },
  { // 4.11 Wer profitiert? – Re-Hook
    at: fAber - 6, kind: "zoom", render: (f) => (
      <g>
        <Toni f={f} x={380} y={520} s={0.75} />
        <Lena f={f} x={760} y={520} s={0.75} blinkSeed={2} />
        <Klaus f={f} x={1140} y={520} s={0.75} blinkSeed={4} />
        <Suit f={f} x={1520} y={520} s={0.75} blinkSeed={6} />
        <Pop f={f} at={fProf - 4} x={960} y={400}><Tx x={0} y={0} s={170} c={C.amber}>?</Tx></Pop>
        <Head f={f} at={fProf} y={175}>Wer profitiert?</Head>
      </g>
    ),
  },
];

export const V7Ch4: React.FC = () => {
  const f = useCurrentFrame();
  const sfx: Sfx[] = [
    [fJuni + 10, "stamp", 0.5], [f33 - 8, "whoosh", 0.5], [f26, "ding", 0.4], [fUeber - 8, "paper", 0.4],
    [p41 - 8, "whoosh", 0.5], [fBefr + 6, "stamp", 0.4], [fVorbei - 6, "soft", 0.5], [fAusn - 8, "whoosh", 0.5],
    [p42 - 8, "whoosh", 0.5], [fSechs, "coins", 0.4], [fNach - 8, "whoosh", 0.4], [f71, "ding", 0.4],
    [p43 - 8, "whoosh", 0.5], [fDoppelt, "soft", 0.5], [fWarum - 8, "whoosh", 0.4], [fAbg, "soft", 0.5],
    [fSelbst - 8, "whoosh", 0.5], [p44 - 8, "paper", 0.5], [fIn - 8, "whoosh", 0.5], [fVerdr, "soft", 0.4], [fAber - 8, "marimba", 0.5],
  ];
  return (
    <V7Shell n={4} title="Was die Kommission will" sfx={sfx}>
      <Scenes7 f={f} list={S} end={DUR} />
    </V7Shell>
  );
};
