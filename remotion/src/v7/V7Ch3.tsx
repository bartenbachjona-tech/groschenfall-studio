/* V7 Kapitel 3 – Toni zahlt mehr: der leise Umbau (Storyboard 3.1–3.11) */
import React from "react";
import { useCurrentFrame } from "remotion";
import T from "../data/v7ch3.json";
import { Timing } from "../kit/core";
import {
  BarWall, Building, C, Head, Lena, MinijobSign, Paper, Pill, Pop, Pot, Quote, Report, Sc, Scenes7, Sfx, Src, StampT, Toni, Tx, V7Shell,
  CL, IO, OUT, interpolate, lerp, mk7, pop, tw,
} from "./kit7";

const TM = T as Timing;
const { wk, ps, DUR } = mk7(TM);
export const V7CH3_DUR = DUR;

// Wort-Anker (geprüft gegen v7ch3.json)
const f190 = wk("v7_3_0", "hundertneunzig"), fAb = wk("v7_3_0", "=ab"), fJanuar = wk("v7_3_0", "Januar"), fKK = wk("v7_3_0", "Krankenkasse"), f13 = wk("v7_3_0", "dreizehn"), f175 = wk("v7_3_0", "siebzehneinhalb");
const fDer = wk("v7_3_0", "=der", 1), fZusatz = wk("v7_3_0", "Zusatzbeitrag"), fGesetz = wk("v7_3_0", "Gesetz"), fJuli = wk("v7_3_0", "Juli");
const p31 = ps("v7_3_1"), fPausch = wk("v7_3_1", "Pauschalsteuer"), fZwei = wk("v7_3_1", "=zwei"), fFuenf = wk("v7_3_1", "fünf"), fEntwurf = wk("v7_3_1", "Entwurf"), fBT = wk("v7_3_1", "Bundestag"), fBeschl = wk("v7_3_1", "Beschlossen");
const p32 = ps("v7_3_2"), f633 = wk("v7_3_2", "sechshundertdreiunddreißig"), f245 = wk("v7_3_2", "zweihundertfünfundvierzig"), f57 = wk("v7_3_2", "siebenundfünfzig"), fEin = wk("v7_3_2", "=ein"), fLena = wk("v7_3_2", "Lena"), fGross = wk("v7_3_2", "große"), fHoeher = wk("v7_3_2", "höheren");
const fUnd = wk("v7_3_2", "=und"), fWeiteren = wk("v7_3_2", "weiteren"), fEntwurf2 = wk("v7_3_2", "Entwurf"), f2028 = wk("v7_3_2", "zweitausendachtundzwanzig"), fPflege = wk("v7_3_2", "Pflegeversicherung");
const p33 = ps("v7_3_3"), fBR = wk("v7_3_3", "Bundesrat"), fWA = wk("v7_3_3", "Wirtschaftsausschuss"), fStreichen = wk("v7_3_3", "streichen"), fZitat = wk("v7_3_3", "Zitat"), fMinijobs = wk("v7_3_3", "Minijobs");
const p34 = ps("v7_3_4"), fWendung = wk("v7_3_4", "Wendung"), fAbsch = wk("v7_3_4", "Abschaffung"), fUmgebaut = wk("v7_3_4", "umgebaut"), fVerbot = wk("v7_3_4", "Verbot"), fPreis = wk("v7_3_4", "Preis"), fDoch = wk("v7_3_4", "Doch"), fWeiter = wk("v7_3_4", "weiter");

const EUR = 1.6; // px pro Euro für die Abgaben-Säulen
/** Säule „Abgaben pro Monat“ */
const Col: React.FC<{ x: number; base: number; v: number; k: number; col: string; val: string; label: string; o?: number }> = ({ x, base, v, k, col, val, label, o = 1 }) => (
  <g opacity={o}>
    <rect x={x - 150} y={base - v * EUR * k} width={300} height={v * EUR * k} rx={16} fill={col} />
    <Tx x={x} y={base - v * EUR * k - 28} s={78} o={Math.min(1, k * 2)}>{val}</Tx>
    <Tx x={x} y={base + 60} s={40} c={C.gray} w={700}>{label}</Tx>
  </g>
);
/** kleiner Kalender */
const Cal: React.FC<{ x: number; y: number; top: string; big: string; col?: string; s?: number }> = ({ x, y, top, big, col = C.red, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-150} y={-150} width={300} height={290} rx={24} fill="#EEF2F7" />
    <rect x={-150} y={-150} width={300} height={74} rx={24} fill={col} /><rect x={-150} y={-96} width={300} height={20} fill={col} />
    <text y={-100} textAnchor="middle" fontFamily="Sora" fontWeight={800} fontSize={32} fill="#FFFFFF">{top}</text>
    <text y={60} textAnchor="middle" fontFamily="Sora" fontWeight={800} fontSize={84} fill="#0A111D">{big}</text>
  </g>
);

const S: Sc[] = [
  { // 3.1 Toni + Säule „heute ≈ 188 €“
    at: 0, render: (f) => (
      <g>
        <BarWall shelfX={1560} counterY={720} />
        <Toni f={f} x={520} y={420} s={1.0} look={6} />
        <rect x={1000} y={300} width={560} height={520} rx={26} fill={C.deep} opacity={0.9} />
        <Col x={1280} base={740} v={188} k={tw(f, f190 - 10, 24)} col={C.blue} val="≈ 188 €" label="" />
        <Tx x={1280} y={790} s={36} c={C.gray} w={700}>Abgaben pro Monat, heute</Tx>
        <Head f={f} at={f190} y={235} x={1280} c={C.amber}>knapp 190 €</Head>
        <Src f={f} at={f190}>Quelle: Minijob-Zentrale, Beiträge 2026 · eigene Rechnung: 603 € × 31,17 % = 187,96 €</Src>
      </g>
    ),
  },
  { // 3.2 Topf Krankenkasse 13 → 17,5 %
    at: fAb - 6, kind: "slide", render: (f) => {
      const k = tw(f, f175 - 4, 26, IO);
      return (
        <g>
          <Pot x={760} y={860} w={340} h={420} fill={lerp(13, 17.5, k) / 22} col={C.blue} label="Krankenkasse (Arbeitgeber)" />
          <Tx x={760} y={360} s={110} c={k > 0.5 ? C.amber : C.white} o={tw(f, f13 - 4, 10)}>{k < 0.5 ? "13 %" : "≈ 17,5 %"}</Tx>
          <Pop f={f} at={fJanuar - 2} x={1380} y={560}><Cal x={0} y={0} top="AB JANUAR" big="2027" /></Pop>
          <Head f={f} at={f175} y={175} c={C.amber}>KV: 13 → 17,5 %</Head>
          <Src f={f} at={fKK}>Quelle: Minijob-Zentrale 01.10.2026 · § 249b SGB V n. F. (GKV-BStabG, BGBl. 2026 I Nr. 228): 14,6 % + Ø-Zusatzbeitrag</Src>
        </g>
      );
    },
  },
  { // 3.2b Gesetzblatt: genauer Wert offen, Stempel „Gesetz“
    at: fDer - 6, kind: "zoom", render: (f) => (
      <g>
        <Paper x={760} y={600} w={560} h={640} title="GESETZBLATT" col={C.green} lines={9} r={-2}>
          <text x={0} y={250} textAnchor="middle" fontFamily="Sora" fontWeight={800} fontSize={34} fill="#0A111D" opacity={tw(f, fJuli, 10)}>verkündet Juli 2026</text>
        </Paper>
        <Pop f={f} at={fZusatz} x={1400} y={440}><Pill x={0} y={0} text="Zusatzbeitrag 2027?" col={C.blue} fg={C.white} s={44} /></Pop>
        <Tx x={1400} y={540} s={34} c={C.gray} w={700} o={tw(f, fZusatz + 20, 12)}>noch nicht festgelegt</Tx>
        <StampT f={f} at={fGesetz - 2} x={780} y={560} text="Gesetz" col={C.green} rot={-10} s={1.1} />
        <Head f={f} at={fDer + 4} y={175}>rund 17,5 %</Head>
        <Src f={f} at={fZusatz}>Ø-Zusatzbeitrag 2027: BMG-Festlegung steht aus (Stand 29.10.2026; Schätzerkreis BAS 14.10.: 2,9 %)</Src>
      </g>
    ),
  },
  { // 3.3 Topf Steuer 2 → 5 %, Stempel „Entwurf“
    at: p31 - 6, kind: "slide", render: (f) => {
      const k = tw(f, fFuenf - 4, 22, IO);
      return (
        <g>
          <g opacity={0.45}><Pot x={560} y={860} w={260} h={330} fill={17.5 / 22} col={C.blue} label="Krankenkasse" val="17,5 %" /></g>
          <Pot x={1080} y={860} w={340} h={420} fill={lerp(2, 5, k) / 22 + 0.02} col={C.amber} label="Pauschalsteuer" />
          <Tx x={1080} y={360} s={110} c={k > 0.5 ? C.amber : C.white} o={tw(f, fZwei - 4, 10)}>{k < 0.5 ? "2 %" : "5 %"}</Tx>
          <StampT f={f} at={fEntwurf - 2} x={1560} y={560} text="Entwurf" col={C.amber} rot={8} s={1} />
          <Head f={f} at={fFuenf} y={175} c={C.amber}>Steuer: 2 → 5 %</Head>
          <Src f={f} at={fPausch}>Quelle: Entwurf Einkommensteuerreformgesetz 2027, BT-Drs. 21/8235</Src>
        </g>
      );
    },
  },
  { // 3.4 Bundestag (neutral) – noch nicht beschlossen
    at: fBT - 8, kind: "zoom", render: (f) => (
      <g>
        <Building x={960} y={800} s={1.25} dome />
        <Tx x={960} y={900} s={44} c={C.gray} w={700}>Bundestag berät</Tx>
        <Pop f={f} at={fBeschl} x={960} y={600}><Pill x={0} y={0} text="noch nicht beschlossen" col={C.amber} s={60} /></Pop>
        <Head f={f} at={fBT + 4} y={175}>Steuer: nur Entwurf</Head>
        <Src f={f} at={fBT}>Stand 29.10.2026: Anhörung Finanzausschuss 04.11.2026, keine 2./3. Lesung terminiert</Src>
      </g>
    ),
  },
  { // 3.5 Säule wächst auf ≈ 245 €, +57 € leuchtet
    at: p32 - 6, kind: "slide", render: (f) => {
      const b = tw(f, f245 - 6, 26, IO);
      const g = tw(f, f57, 14);
      return (
        <g>
          <Toni f={f} x={300} y={460} s={0.85} shockAt={f57 + 2} />
          <Col x={820} base={820} v={188} k={1} col={C.blue} val="188 €" label="heute" />
          <Col x={1340} base={820} v={lerp(188, 245, b)} k={1} col={C.amber} val={b < 0.5 ? "188 €" : "≈ 245 €"} label="2027, wenn beides kommt" />
          <rect x={1190} y={820 - 245 * EUR} width={300} height={57 * EUR * b} rx={16} fill="#FFE2A8" opacity={0.75 * g * (0.75 + 0.25 * Math.sin(f / 5))} />
          <Pop f={f} at={f57} x={1680} y={480}><Pill x={0} y={0} text="+57 €" col={C.amber} s={70} /></Pop>
          <Tx x={1080} y={300} s={40} c={C.gray} w={700} o={tw(f, f633, 12)}>Lohn: 633 € im Monat</Tx>
          <Head f={f} at={f245} y={175} c={C.amber}>≈ 245 € Abgaben</Head>
          <Src f={f} at={f245}>Eigene Rechnung (Umlagen wie 2026, Ø-Zusatzbeitrag 2,9 %): 633 € × 38,67 % = 244,78 € (+56,82 €)</Src>
        </g>
      );
    },
  },
  { // 3.6 +57 € teilt sich: Lohn ≈ 9 € / Sätze ≈ 47 €
    at: fEin - 6, kind: "zoom", render: (f) => {
      const sp = tw(f, fLena - 10, 22, IO);
      const W = 1300, x0 = 310, w9 = (9.35 / 56.83) * W;
      return (
        <g>
          <Tx x={960} y={360} s={90} c={C.amber}>+57 €</Tx>
          <g transform={`translate(${-30 * sp} 0)`}><rect x={x0} y={460} width={w9} height={170} rx={20} fill={C.blue} /></g>
          <g transform={`translate(${30 * sp} 0)`}><rect x={x0 + w9} y={460} width={W - w9} height={170} rx={20} fill={C.amber} opacity={0.6 + 0.4 * tw(f, fHoeher, 12)} /></g>
          <g opacity={sp}>
            <Tx x={x0 + w9 / 2 - 30} y={720} s={52} c={C.blue}>≈ 9 €</Tx>
            <Tx x={x0 + w9 / 2 - 30} y={775} s={32} c={C.gray} w={700}>mehr Lohn</Tx>
          </g>
          <g opacity={tw(f, fGross, 12)}>
            <Tx x={x0 + w9 + (W - w9) / 2 + 30} y={720} s={64} c={C.amber}>≈ 47 €</Tx>
            <Tx x={x0 + w9 + (W - w9) / 2 + 30} y={775} s={32} c={C.gray} w={700}>höhere Sätze</Tx>
          </g>
          <g opacity={tw(f, fLena - 6, 12)}><Lena f={f} x={x0 + w9 / 2 - 30} y={940} s={0.45} smileAt={fLena} /></g>
          <Head f={f} at={fHoeher} y={175} c={C.amber}>Vor allem höhere Sätze</Head>
          <Src f={f} at={fLena}>Eigene Rechnung: Lohneffekt 30 € × 31,17 % = 9,35 € · Satzeffekt 633 € × 7,5 Prozentpunkte = 47,48 €</Src>
        </g>
      );
    },
  },
  { // 3.7 Gestrichelter Topf „Pflege“ ab 2028 (Entwurf)
    at: fUnd - 6, kind: "slide", render: (f) => (
      <g>
        <g opacity={0.5}>
          <Pot x={460} y={860} w={240} h={300} fill={17.5 / 22} col={C.blue} label="Krankenkasse" />
          <Pot x={800} y={860} w={240} h={300} fill={5 / 22 + 0.02} col={C.amber} label="Steuer" />
        </g>
        <g opacity={tw(f, fWeiteren - 6, 14)}>
          <Pot x={1260} y={860} w={320} h={400} fill={0.18 * tw(f, fPflege, 30)} col={C.amber} label="Pflegeversicherung" dashed />
        </g>
        <Pop f={f} at={f2028} x={1260} y={360}><Pill x={0} y={0} text="ab 2028?" col={C.blue} fg={C.white} s={60} /></Pop>
        <StampT f={f} at={fEntwurf2} x={1650} y={600} text="Entwurf" col={C.amber} rot={10} s={0.8} />
        <Head f={f} at={fWeiteren} y={175}>Pflege ab 2028?</Head>
        <Src f={f} at={fWeiteren}>Quelle: Kabinettsentwurf Pflegeneuordnungsgesetz, 30.09.2026 (Pauschalbeitrag Pflege ab 01.01.2028)</Src>
      </g>
    ),
  },
  { // 3.8 Bundesrat (neutral): Ausschuss empfiehlt Streichung
    at: p33 - 6, kind: "zoom", render: (f) => {
      const st = tw(f, fStreichen, 14);
      return (
        <g>
          <Building x={520} y={820} s={0.95} />
          <Tx x={520} y={900} s={40} c={C.gray} w={700} o={tw(f, fBR, 12)}>Bundesrat</Tx>
          <Pop f={f} at={fWA - 6} x={1300} y={590}>
            <Paper x={0} y={0} w={620} h={500} title="EMPFEHLUNG" col={C.blue}>
              <text x={0} y={-90} textAnchor="middle" fontFamily="Sora" fontWeight={700} fontSize={32} fill="#3A4560">Wirtschaftsausschuss</text>
              <text x={0} y={30} textAnchor="middle" fontFamily="Sora" fontWeight={800} fontSize={60} fill="#0A111D">Pauschalsteuer 5 %</text>
              <line x1={-250} y1={10} x2={-250 + 500 * st} y2={10} stroke={C.red} strokeWidth={14} strokeLinecap="round" />
              <text x={0} y={130} textAnchor="middle" fontFamily="Sora" fontWeight={800} fontSize={48} fill={C.red} opacity={st}>streichen</text>
              <text x={0} y={200} textAnchor="middle" fontFamily="Sora" fontWeight={600} fontSize={26} fill="#3A4560" opacity={st}>„Artikel 1 Nummer 7 ist zu streichen.“</text>
            </Paper>
          </Pop>
          <Head f={f} at={fWA} y={175} c={C.green}>Ausschuss: streichen!</Head>
          <Src f={f} at={fWA}>Quelle: Empfehlungen der Ausschüsse, BR-Drs. 507/1/26 (05.10.2026, Ziff. 5) – Empfehlung, kein Plenumsbeschluss</Src>
        </g>
      );
    },
  },
  { // 3.9 Zitat-Tafel
    at: fZitat - 10, kind: "fade", render: (f) => (
      <g>
        <g opacity={0.35}><Building x={960} y={940} s={0.7} /></g>
        <Pill x={960} y={260} text="ZITAT" col={C.amber} s={40} />
        <g transform="translate(300 360) scale(1.32)"><Quote f={f} at={fZitat} x={0} y={0} w={1000} lines={["Minijobs stellen für viele Branchen", "ein wichtiges Instrument dar."]} who="Wirtschaftsausschuss des Bundesrats" /></g>
        <Src f={f} at={fZitat}>Wörtlich aus der Begründung der Empfehlung, BR-Drs. 507/1/26</Src>
      </g>
    ),
  },
  { // 3.10 Schild MINIJOB: nicht abgerissen, sondern mit Preisschildern beklebt
    at: p34 - 6, kind: "slide", render: (f) => {
      const ghost = interpolate(f, [fAbsch - 4, fAbsch + 10, fUmgebaut - 10, fUmgebaut], [0, 1, 1, 0], CL);
      return (
        <g>
          <MinijobSign f={f} x={960} y={560} s={1.05} cross={ghost * 0.999}
            tags={[["+ KV", fUmgebaut], ["+ Steuer?", fUmgebaut + 12], ["+ Pflege?", fUmgebaut + 24, C.blue]]} />
          {f < fPreis - 2 ? <Head f={f} at={fWendung} y={175}>Die eigentliche Wendung</Head> : <Head f={f} at={fPreis} y={175} c={C.amber}>Umbau über den Preis</Head>}
          <Tx x={960} y={300} s={40} c={C.gray} w={700} o={tw(f, fVerbot, 10) * (1 - tw(f, fPreis - 4, 6))}>nicht per Verbot …</Tx>
        </g>
      );
    },
  },
  { // 3.11 Dicker Bericht fällt ins Bild – Re-Hook
    at: fDoch - 6, kind: "zoom", render: (f) => {
      const drop = interpolate(f, [fDoch, fDoch + 18], [-700, 0], { ...CL, easing: OUT });
      const sq = interpolate(f, [fDoch + 18, fDoch + 22, fDoch + 30], [1, 0.92, 1], CL);
      return (
        <g>
          <ellipse cx={960} cy={880} rx={360 * (drop > -50 ? 1 : 0.6)} ry={40} fill="#0A111D" opacity={0.5} />
          <g transform={`translate(0 ${drop})`}><g transform={`translate(960 680) scale(1 ${sq}) translate(-960 -680)`}><Report x={960} y={660} s={1.05} r={-4} /></g></g>
          <Pop f={f} at={fWeiter - 30} x={1360} y={420}><Tx x={0} y={0} s={200} c={C.amber}>?</Tx></Pop>
          <Head f={f} at={fDoch + 12} y={175} c={C.red}>Es geht noch weiter …</Head>
        </g>
      );
    },
  },
];

export const V7Ch3: React.FC = () => {
  const f = useCurrentFrame();
  const sfx: Sfx[] = [
    [f190 - 6, "soft", 0.5], [fAb - 8, "whoosh", 0.5], [f175, "ding", 0.4], [fDer - 8, "paper", 0.4], [fGesetz - 2, "stamp", 0.5],
    [p31 - 8, "whoosh", 0.5], [fEntwurf - 2, "stamp", 0.5], [fBT - 10, "whoosh", 0.5], [fBeschl, "soft", 0.5],
    [p32 - 8, "whoosh", 0.5], [f57, "coins", 0.5], [fEin - 8, "soft", 0.5], [fUnd - 8, "whoosh", 0.4], [fEntwurf2, "stamp", 0.4],
    [p33 - 8, "whoosh", 0.5], [fStreichen, "paper", 0.4], [fZitat - 10, "soft", 0.5],
    [p34 - 8, "whoosh", 0.5], [fUmgebaut, "paper", 0.4], [fPreis, "ding", 0.4], [fDoch + 16, "stamp", 0.6],
  ];
  return (
    <V7Shell n={3} title="Toni zahlt mehr" sfx={sfx}>
      <Scenes7 f={f} list={S} end={DUR} />
    </V7Shell>
  );
};
