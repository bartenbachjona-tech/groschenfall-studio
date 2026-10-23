import React, { useMemo } from "react";
import { Easing, interpolate, random, useCurrentFrame } from "remotion";
import { C, FONT } from "../brand";
import T2 from "../data/ch2.json";
import { CL, IO, SPR, Timing, lerp, mkW, pop, tw } from "../kit/core";
import { camAt, K, Layer, WHIP } from "../kit/Camera";
import { Stripes } from "../kit/Stage";
import { ChapterShell, Sfx } from "../kit/Chapter";
import { ChapterLabel } from "../kit/Caption";
import { Figure } from "../kit/Figure";
import { Bar, DataCard, Defs, PriceTag, Stamp, T } from "../kit/Props";

const TM = T2 as Timing;
export const CH2_DUR = Math.ceil(TM.total * 30);
const W = mkW(TM);
const WW = 11200, WH = 1080;

const fSuper = W(0, "supermarkt?");
const fMilka = W(1, "milka:"), fKlein = W(1, "kleiner,"), fTeurer = W(1, "teurer,"), fRegulaer = W(1, "regulär"), fVZ = W(1, "verbraucherzentrale"), fMogel = W(1, "mogelpackung"), fHoechst = W(1, "höchsten"),
  fLG = W(1, "landgericht"), fIrre = W(1, "irreführend."), fMond = W(1, "mondelez,"), fBerufung = W(1, "berufung.");
const fRitter = W(2, "ritter"), fViertel = W(2, "viertel"), fMai = W(2, "mai"), f75 = W(2, "fünfundsiebzig"), fSelben = W(2, "selben"), f33 = W(2, "dreiunddreißig"), fSagt = W(2, "sagt:"), fLinie = W(2, "produktlinie.");
const fLindt = W(3, "lindt"), fGesenkt = W(3, "gesenkt:"), f269 = W(3, "neunundsechzig"), f219 = W(3, "neunzehn."), fWelt = W(3, "weltweit"), f12 = W(3, "zwölf");
const fDisc = W(4, "discounter?"), fAldi = W(4, "aldi"), f49 = W(4, "neunundvierzig"), f99 = W(4, "neunundneunzig"), f79 = W(4, "neunundsiebzig.");
const fStrich = W(5, "unterm"), f75p = W(5, "fünfundsiebzig"), fLM = W(5, "lebensmittel"), f37 = W(5, "siebenunddreißig");

/* Buchten: Eingang 960 · Milka 2900 · Ritter 5000 · Lindt 7000 · Discount 8900 · Fazit 10600 */
const X = { in: 960, mi: 2900, ri: 5000, li: 7000, di: 8900, fz: 10500 };
const KEYS: K[] = [
  { f: 0, x: X.in, y: 560, z: 0.92 },
  { f: fSuper + 20, x: X.in + 200, y: 540, z: 1.0 },
  { f: fMilka + 8, x: X.mi, y: 540, z: 1.0, e: WHIP },
  { f: fVZ - 6, x: X.mi - 60, y: 560, z: 1.06 },
  { f: fLG, x: X.mi + 160, y: 540, z: 1.0 },
  { f: fRitter - 10, x: X.mi + 220, y: 540, z: 1.0 },
  { f: fRitter + 12, x: X.ri, y: 540, z: 1.0, e: WHIP },
  { f: fLindt - 10, x: X.ri + 60, y: 540, z: 1.04 },
  { f: fLindt + 12, x: X.li, y: 540, z: 1.0, e: WHIP },
  { f: fDisc - 10, x: X.li + 60, y: 540, z: 1.04 },
  { f: fDisc + 12, x: X.di, y: 540, z: 1.0, e: WHIP },
  { f: fStrich - 10, x: X.di + 60, y: 540, z: 1.04 },
  { f: fStrich + 14, x: X.fz, y: 540, z: 1.0, e: WHIP },
  { f: CH2_DUR, x: X.fz, y: 520, z: 1.05 },
];
const BLUR: [number, number][] = [[fMilka - 6, fMilka + 10], [fRitter - 12, fRitter + 14], [fLindt - 12, fLindt + 14], [fDisc - 12, fDisc + 14], [fStrich - 12, fStrich + 16]];

/* Regal-Hintergrund mit vielen generischen Produkten */
const Shelves: React.FC = () => {
  const items = useMemo(() => Array.from({ length: 260 }).map((_, i) => ({ x: (i % 130) * 86 + random(`sx${i}`) * 10, row: Math.floor(i / 130), h: 70 + random(`sh${i}`) * 70, c: ["#3A5A9A", "#6B2438", "#2E5E4E", "#7A5A2E", "#5A6B88", "#4B3A6B"][Math.floor(random(`sc${i}`) * 6)] })), []);
  return (
    <svg width={WW} height={WH}>
      {[300, 560].map((y, r) => (
        <g key={r}>
          {items.filter((it) => it.row === r).map((it, i) => <rect key={i} x={it.x} y={y - it.h} width={70} height={it.h} rx={8} fill={it.c} opacity={0.5} />)}
          <rect x={0} y={y} width={WW} height={16} fill={C.line} />
        </g>
      ))}
    </svg>
  );
};

const Bay: React.FC<{ x: number; title: string }> = ({ x, title }) => (
  <g>
    <rect x={x - 760} y={620} width={1520} height={26} fill={C.line} /><rect x={x - 760} y={620} width={1520} height={5} fill="#3A5A9A" />
    <rect x={x - 760} y={646} width={1520} height={40} fill="#1F3150" />
    <rect x={x - 180} y={70} width={360} height={70} rx={35} fill={C.deep} opacity={0.85} />
    <T x={x} y={118} s={36} a="middle" c={C.gray}>{title}</T>
  </g>
);

const Main: React.FC<{ f: number }> = ({ f }) => {
  const walkX = lerp(X.in - 380, X.in + 380, tw(f, 0, fMilka, (t) => t));
  const bob = Math.abs(Math.sin(f / 5)) * 8;
  /* Ritter */
  const rDual = tw(f, fMai - 4, 16);
  /* Lindt */
  const lindtUp = tw(f, fWelt, 30);
  /* Discount-Balken */
  const dv = [[f49, 0.49, "2022"], [f99, 0.99, "2025"], [f79, 0.79, "2026"]] as const;
  /* Fazit */
  const g75 = tw(f, f75p - 4, 26, Easing.bezier(0.2, 0.8, 0.2, 1)), g37 = tw(f, f37 - 4, 26, Easing.bezier(0.2, 0.8, 0.2, 1));
  return (
    <svg width={WW} height={WH} style={{ overflow: "visible" }}>
      <Defs />
      {/* Eingang */}
      <g>
        <rect x={X.in - 370} y={150} width={1040} height={150} rx={30} fill={C.deep} opacity={0.9} />
        <T x={X.in + 150} y={252} s={88} a="middle" c={C.amber}>SUPERMARKT</T>
        <rect x={0} y={880} width={WW} height={200} fill="#1B2D49" /><rect x={0} y={880} width={WW} height={6} fill={C.line} />
        {f < fMilka + 20 && (
          <g transform={`translate(${walkX} ${520 - bob})`}>
            <Figure f={f} x={0} y={0} s={0.95} />
            <g transform="translate(150 230)"><path d="M -10 -60 L 220 -60 L 190 70 L 20 70 Z" fill="none" stroke={C.white} strokeWidth={10} /><path d="M -10 -60 L -60 -110" stroke={C.white} strokeWidth={10} /><circle cx={40} cy={110} r={18} fill={C.white} /><circle cx={170} cy={110} r={18} fill={C.white} /></g>
          </g>
        )}
      </g>

      {/* Milka */}
      <Bay x={X.mi} title="Tafelschokolade" />
      <Bar f={f} x={X.mi - 560} y={430} wrap="#6B2438" label="SCHOKOLADE" sub="Vollmilch" grams={["100 g", "90 g"]} xrayAt={fKlein - 12} shrinkAt={fKlein} />
      <PriceTag f={f} x={X.mi - 350} y={646} a="1,49 €" b="1,99 €" flipAt={fTeurer} />
      <DataCard f={f} x={X.mi - 700} y={140} at={fMilka - 2} title="Milka" w={460} lines={[["100 g → 90 g"], ["1,49 € → 1,99 €", C.red], ["regulär bis heute 1,99 €", C.gray]]} />
      {/* Auszeichnung */}
      <g transform={`translate(${X.mi + 300} ${lerp(-300, 330, interpolate(f, [fMogel - 6, fMogel + 10], [0, 1], { ...CL, easing: Easing.bezier(0.3, 1.4, 0.6, 1) }))})`}>
        <path d="M -40 0 L -70 150 L -20 120 L 0 170 L 20 120 L 70 150 L 40 0 Z" fill={C.red} />
        <circle r={110} fill={C.amber} /><circle r={88} fill="none" stroke={C.deep} strokeOpacity={0.3} strokeWidth={6} />
        <T x={0} y={-18} s={26} a="middle" c={C.deep}>MOGELPACKUNG</T><T x={0} y={18} s={26} a="middle" c={C.deep}>DES JAHRES</T><T x={0} y={56} s={34} a="middle" c={C.deep}>2025</T>
      </g>
      <g opacity={tw(f, fHoechst - 4, 12)} transform={`translate(${X.mi + 470} 300)`}>
        <T x={0} y={0} s={80} c={C.amber}>66,7 %</T><T x={0} y={44} s={32} c={C.gray} w={700}>der Stimmen · Rekord</T>
      </g>
      {/* Gericht */}
      <g opacity={tw(f, fLG - 6, 12)} transform={`translate(${X.mi + 430} 590)`}>
        <rect x={-30} y={-40} width={420} height={210} rx={20} fill={C.deep} opacity={0.92} />
        <T x={20} y={10} s={34} c={C.gray}>Landgericht Bremen</T><T x={20} y={52} s={30} c={C.gray} w={700}>22.04.2026</T>
        <g transform={`translate(330 ${30 - 30 * Math.max(0, Math.sin(Math.min(1, Math.max(0, (f - fIrre + 8) / 8)) * Math.PI))}) rotate(-30)`}>
          <rect x={-60} y={-18} width={120} height={36} rx={10} fill="#8A6A3A" /><rect x={-6} y={18} width={12} height={70} fill="#8A6A3A" />
        </g>
        <g opacity={tw(f, fMond - 4, 12)}><T x={20} y={120} s={30} c={C.amber}>→ Berufung (OLG)</T><T x={20} y={156} s={24} c={C.gray} w={700}>noch nicht rechtskräftig</T></g>
      </g>
      <Stamp f={f} at={fIrre - 2} x={X.mi + 60} y={560} text="IRREFÜHREND" s={0.75} />
      <Figure f={f} x={X.mi + 900} y={500} s={0.8} shockAt={fTeurer + 6} angryAt={fIrre} flip />

      {/* Ritter Sport */}
      <Bay x={X.ri} title="Tafelschokolade" />
      <DataCard f={f} x={X.ri - 700} y={170} at={fRitter - 2} title="Ritter Sport" w={500} lines={[["2024: rund +27 %", C.red], ["Mai 2026: neue Sorte", C.gray]]} />
      <g opacity={1 - rDual} transform={`translate(${X.ri - 150} 430)`}>
        <Bar f={f} x={0} y={0} w={300} h={190} wrap="#2E5E4E" label="NUSS" sub="100 g" />
        <PriceTag f={f} x={150} y={216} a="1,49 €" b="1,89 €" flipAt={fViertel} s={0.8} sticker="+27 %" stickerAt={fViertel + 6} />
      </g>
      <g opacity={rDual}>
        <g transform={`translate(${X.ri - 260} ${430 + 60 * (1 - rDual)})`}>
          <Bar f={f} x={0} y={0} w={300} h={190} wrap="#4B3A6B" label="EDEL" sub="100 g" />
          <PriceTag f={f} x={150} y={216} a="2,29 €" s={0.8} />
        </g>
        <g transform={`translate(${X.ri + 160} ${430 + 60 * (1 - rDual)})`} opacity={tw(f, f75 - 6, 12)}>
          <Bar f={f} x={0} y={0} w={225} h={190} wrap="#4B3A6B" label="EDEL" sub="75 g" />
          <PriceTag f={f} x={112} y={216} a="2,29 €" s={0.8} />
        </g>
        <g opacity={tw(f, f75 - 4, 12)}><T x={X.ri + 272} y={410} s={44} a="middle" c={C.amber}>75 g</T><T x={X.ri - 110} y={410} s={44} a="middle" c={C.gray}>100 g</T></g>
        <g opacity={tw(f, fSelben - 4, 12)}><path d={`M ${X.ri - 110} 790 Q ${X.ri + 80} 870 ${X.ri + 272} 790`} stroke={C.amber} strokeWidth={6} fill="none" strokeDasharray="12 10" /><T x={X.ri + 81} y={880} s={34} a="middle" c={C.amber}>gleicher Preis</T></g>
      </g>
      <g transform={`translate(${X.ri + 560} 300) scale(${pop(f, f33 - 4)})`}><circle r={100} fill={C.red} /><T x={0} y={4} s={50} a="middle">+33 %</T><T x={0} y={44} s={26} a="middle" w={700}>versteckt</T></g>
      <g opacity={tw(f, fSagt - 4, 12)} transform={`translate(${X.ri - 620} 560)`}>
        <path d="M 0 0 L 420 0 Q 440 0 440 20 L 440 110 Q 440 130 420 130 L 80 130 L 40 170 L 50 130 L 0 130 Q -20 130 -20 110 L -20 20 Q -20 0 0 0 Z" fill={C.white} />
        <T x={210} y={56} s={30} a="middle" c={C.deep}>„Eine ganz neue</T><T x={210} y={98} s={30} a="middle" c={C.deep}>Produktlinie.“</T>
      </g>

      {/* Lindt */}
      <Bay x={X.li} title="Tafelschokolade" />
      <DataCard f={f} x={X.li - 700} y={170} at={fLindt - 2} title="Lindt" w={460} lines={[["Classics-Tafel, UVP", C.gray]]} />
      <Bar f={f} x={X.li - 210} y={430} w={420} h={190} wrap="#3A5A9A" label="CLASSIC" sub="100 g" accent={C.gray} />
      <PriceTag f={f} x={X.li} y={646} a="2,69 €" b="2,19 €" bColor={C.green} flipAt={f219 - 4} sticker="−19 %" stickerAt={f219 + 4} />
      <g opacity={lindtUp} transform={`translate(${X.li + 380} 230)`}>
        <rect x={0} y={0} width={380} height={300} rx={24} fill={C.deep} opacity={0.92} />
        <T x={30} y={60} s={32} c={C.gray}>Konzern weltweit</T><T x={30} y={98} s={28} c={C.gray} w={700}>1. Halbjahr 2026</T>
        <T x={30} y={200} s={84} c={C.red}>+{(11.8 * tw(f, f12 - 20, 30)).toFixed(1).replace(".", ",")} %</T>
        <T x={30} y={256} s={28} c={C.gray} w={700}>Preise</T>
      </g>

      {/* Discounter */}
      <Bay x={X.di} title="Handelsmarke" />
      <DataCard f={f} x={X.di - 720} y={170} at={fAldi - 6} title="Aldi & Lidl" w={460} lines={[["Vollmilch, 100 g", C.gray]]} />
      <Bar f={f} x={X.di - 640} y={430} w={360} h={190} wrap="#5A6B88" label="MILCH" sub="Handelsmarke" accent={C.white} />
      {dv.map(([fa, v, y], i) => {
        const g = tw(f, fa - 4, 20, Easing.bezier(0.2, 0.8, 0.2, 1));
        const h = v * 380 * g;
        return (
          <g key={i} opacity={tw(f, fa - 6, 8)}>
            <rect x={X.di + 40 + i * 190} y={600 - h} width={140} height={h} rx={12} fill={i === 1 ? C.red : i === 2 ? C.amber : C.mute} />
            <T x={X.di + 110 + i * 190} y={580 - h} s={44} a="middle">{v.toFixed(2).replace(".", ",")}</T>
            <T x={X.di + 110 + i * 190} y={650} s={34} a="middle" c={C.gray} w={700}>{y}</T>
          </g>
        );
      })}

      {/* Fazit */}
      <g opacity={tw(f, fStrich, 14)}>
        <T x={X.fz} y={170} s={56} a="middle">Preis ggü. 2020 (April 2026)</T>
        <rect x={X.fz - 640} y={330} width={1100 * 0.75 * g75} height={150} rx={20} fill={C.red} />
        <T x={X.fz - 640} y={310} s={44} c={C.gray}>Tafelschokolade</T>
        <T x={X.fz - 620 + 1100 * 0.75 * g75} y={430} s={80} c={C.red} o={g75 > 0.03 ? 1 : 0}>+{Math.round(75 * g75)} %</T>
        <g opacity={tw(f, fLM - 4, 12)}>
          <rect x={X.fz - 640} y={600} width={1100 * 0.37 * g37} height={150} rx={20} fill={C.mute} />
          <T x={X.fz - 640} y={580} s={44} c={C.gray}>Lebensmittel insgesamt</T>
          <T x={X.fz - 620 + 1100 * 0.37 * g37} y={700} s={80} c={C.white} o={g37 > 0.03 ? 1 : 0}>+{Math.round(37 * g37)} %</T>
        </g>
      </g>
    </svg>
  );
};

export const Ch2: React.FC = () => {
  const f = useCurrentFrame();
  const c = camAt(KEYS, f);
  const sfx: Sfx[] = [[fMilka - 6, "whoosh", 0.6], [fKlein - 12, "paper", 0.5], [fTeurer, "pop", 0.6], [fMogel - 6, "ding", 0.4], [fHoechst - 4, "pop", 0.4], [fIrre - 6, "stamp", 0.8], [fMond, "paper", 0.4],
    [fRitter - 12, "whoosh", 0.6], [fViertel, "pop", 0.5], [fMai - 4, "pop", 0.4], [f33 - 4, "stamp", 0.6], [fSagt - 4, "pop", 0.4],
    [fLindt - 12, "whoosh", 0.6], [f219 - 4, "coin", 0.6], [fWelt, "pop", 0.4], [fDisc - 12, "whoosh", 0.6], [f49 - 4, "pop", 0.4], [f99 - 4, "pop", 0.5], [f79 - 4, "pop", 0.4],
    [fStrich - 12, "whoosh", 0.6], [f75p - 4, "stamp", 0.5], [f37 - 4, "pop", 0.4]];
  return (
    <ChapterShell ch={2} sfx={sfx} blur={BLUR} overlay={<ChapterLabel f={f} n={2} title="Die Feder" at={4} dur={70} />}>
      <Layer cam={c} p={0.3} w={WW} h={WH}><Stripes w={WW} h={WH} /></Layer>
      <Layer cam={c} p={0.65} blur={4} w={WW} h={WH}><Shelves /></Layer>
      <Layer cam={c} p={1} w={WW} h={WH}><Main f={f} /></Layer>
    </ChapterShell>
  );
};
