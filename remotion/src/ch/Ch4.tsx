import React, { useMemo } from "react";
import { Easing, interpolate, random, useCurrentFrame } from "remotion";
import { C, FONT } from "../brand";
import T4 from "../data/ch4.json";
import { CL, IO, SPR, Timing, lerp, mkW, pop, tw } from "../kit/core";
import { camAt, K, Layer, WHIP } from "../kit/Camera";
import { Stripes } from "../kit/Stage";
import { ChapterShell, Sfx } from "../kit/Chapter";
import { Caption, ChapterLabel } from "../kit/Caption";
import { Figure } from "../kit/Figure";
import { Coin, Defs, Stamp, T } from "../kit/Props";

const TM = T4 as Timing;
export const CH4_DUR = Math.ceil(TM.total * 30);
const W = mkW(TM);
const WW = 7680, WH = 1080;

const fGeld = W(0, "geld?"), fEuro = W(0, "euro,"), fKrise = W(0, "krise"), f44 = W(0, "vierundvierzig"), f35 = W(0, "fünfunddreißig"), f8 = W(0, "acht"), f6 = W(0, "sechs"), f7 = W(0, "sieben"), fBauern = W(0, "kakaobauern.");
const fSofort = W(1, "sofort"), fCiv = W(1, "elfenbeinküste"), fFest = W(1, "festen"), f57 = W(1, "siebenundfünfzig"), fNacht = W(1, "nacht.");
const fSuper = W(2, "supermarkt"), fVier = W(2, "vier"), f85 = W(2, "fünfundachtzig"), fEdeka = W(2, "edeka,"), fRewe = W(2, "rewe,"), fSchwarz = W(2, "schwarzgruppe"), fAldi = W(2, "aldi."), fMono = W(2, "monopolkommission"), fMargen = W(2, "margen"), fZehn = W(2, "zehn");
const fHandel = W(3, "handel"), fEin = W(3, "ein"), fRewe2 = W(3, "rewechef"), fIrre = W(3, "irre!"), fHerst = W(3, "hersteller"), fKosten = W(3, "kosten."), fJeder = W(3, "jeder"), fNur = W(3, "nur"), fDu = W(3, "du.");

const X = { pie: 960, farm: 2880, mkt: 4800, blame: 6720 };
const KEYS: K[] = [
  { f: 0, x: X.pie, y: 540, z: 1.1 },
  { f: f44, x: X.pie, y: 540, z: 1.0 },
  { f: fSofort - 6, x: X.pie + 40, y: 540, z: 1.02 },
  { f: fSofort + 16, x: X.farm, y: 540, z: 1.0, e: WHIP },
  { f: fSuper - 10, x: X.farm, y: 540, z: 1.06 },
  { f: fSuper + 14, x: X.mkt, y: 540, z: 1.0, e: WHIP },
  { f: fHandel - 10, x: X.mkt, y: 540, z: 1.05 },
  { f: fHandel + 14, x: X.blame, y: 540, z: 1.0, e: WHIP },
  { f: fNur, x: X.blame, y: 560, z: 1.0 },
  { f: CH4_DUR, x: X.blame, y: 600, z: 1.18 },
];
const BLUR: [number, number][] = [[fSofort - 8, fSofort + 18], [fSuper - 10, fSuper + 16], [fHandel - 10, fHandel + 16]];

const arc = (cx: number, cy: number, r0: number, r1: number, a0: number, a1: number) => {
  const p = (r: number, a: number) => [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  const large = a1 - a0 > Math.PI ? 1 : 0;
  const [x0, y0] = p(r1, a0), [x1, y1] = p(r1, a1), [x2, y2] = p(r0, a1), [x3, y3] = p(r0, a0);
  return `M ${x0} ${y0} A ${r1} ${r1} 0 ${large} 1 ${x1} ${y1} L ${x2} ${y2} A ${r0} ${r0} 0 ${large} 0 ${x3} ${y3} Z`;
};

const Main: React.FC<{ f: number }> = ({ f }) => {
  /* Euro-Torte */
  const SL: [string, number, number, string][] = [["Handel", 44, f44, C.blue], ["Hersteller", 35, f35, C.amber], ["Verarbeitung", 8, f8, C.mute], ["Transport", 6, f6, "#B48CFF"], ["Kakaobauern", 7, f7, C.red]];
  const morph = tw(f, f44 - 8, 14, IO);
  let acc = -Math.PI / 2;
  /* Markt-Donut */
  const SH: [string, number, number][] = [["Edeka", 61.4, fEdeka], ["Rewe", 40.1, fRewe], ["Schwarz-Gruppe", 55.2, fSchwarz], ["Aldi", 35.8, fAldi]];
  const sum = SH.reduce((a, s) => a + s[1], 0);
  const d85 = tw(f, f85 - 8, 30, IO);
  let a2 = -Math.PI / 2;
  const night = tw(f, fNacht - 10, 20);
  const wallet = tw(f, fDu - 10, 12);
  return (
    <svg width={WW} height={WH} style={{ overflow: "visible" }}>
      <Defs />
      {/* ---- 1 Euro ---- */}
      <g>
        <T x={X.pie} y={130} s={52} a="middle" o={tw(f, fEuro - 8, 12)}>Von 1 € für Schokolade bekommen …</T>
        <T x={X.pie} y={180} s={30} a="middle" c={C.gray} w={700} o={tw(f, fKrise - 4, 12)}>Anteile schon vor der Krise (Cocoa Barometer / FAO)</T>
        <g transform={`translate(${X.pie - 300} 590) scale(${pop(f, fEuro - 6) * (1 - morph)})`} opacity={1 - morph}><Coin r={230} label="1 €" /></g>
        {SL.map(([l, v, fa, col], i) => {
          const a0 = acc, a1 = acc + (v / 100) * Math.PI * 2; acc = a1;
          const show = tw(f, fa - 6, 12, SPR);
          const mid = (a0 + a1) / 2, off = 26 * show;
          const lx = X.pie - 300 + Math.cos(mid) * 300, ly = 590 + Math.sin(mid) * 300;
          return (
            <g key={i} opacity={morph}>
              <path d={arc(X.pie - 300 + Math.cos(mid) * off, 590 + Math.sin(mid) * off, 0, 230, a0, a1)} fill={col} opacity={0.25 + 0.75 * show} stroke="#0E1828" strokeWidth={4} />
              <g opacity={show} transform={`translate(${X.pie + 120} ${300 + i * 120})`}>
                <circle cx={0} cy={-14} r={18} fill={col} />
                <T x={40} y={0} s={44}>{l}</T>
                <T x={560} y={0} s={56} a="end" c={col}>{v} ct</T>
              </g>
              {i === 4 && show > 0.5 && <circle cx={lx} cy={ly} r={30 + 10 * Math.sin(f / 4)} fill="none" stroke={C.red} strokeWidth={5} />}
            </g>
          );
        })}
      </g>
      {/* ---- Bauer ---- */}
      <g>
        <rect x={X.farm - 960} y={0} width={1920} height={1080} fill="#06090F" opacity={0.55 * night} />
        <g opacity={night}>{Array.from({ length: 30 }).map((_, i) => <circle key={i} cx={X.farm - 900 + random(`st${i}`) * 1800} cy={40 + random(`sy${i}`) * 300} r={2 + random(`sr${i}`) * 3} fill={C.white} opacity={0.6} />)}
          <g transform={`translate(${X.farm + 700} 160)`}><circle r={70} fill="#F2E6B8" /><circle cx={30} cy={-20} r={62} fill="#0E1828" /></g></g>
        <T x={X.farm} y={130} s={52} a="middle" o={tw(f, fCiv - 6, 12)}>Elfenbeinküste · fester Erzeugerpreis</T>
        <rect x={X.farm - 960} y={880} width={1920} height={200} fill="#1F3150" />
        <Figure f={f} x={X.farm - 420} y={560} s={1.0} shirt={C.green} sleeve="#2FB37F" skin="#8A5A3C" hair="#1A1420" hairStyle={2} shockAt={f57 + 4} />
        <g transform={`translate(${X.farm - 200} 800)`}><path d="M -80 80 Q -90 -40 -60 -60 L 60 -60 Q 90 -40 80 80 Z" fill="#B48A5A" /><T x={0} y={20} s={26} a="middle" c={C.deep}>KAKAO</T></g>
        <g transform={`translate(${X.farm + 280} 520)`} opacity={tw(f, fFest - 10, 12)}>
          <rect x={-300} y={-200} width={600} height={360} rx={26} fill={C.deep} opacity={0.94} />
          <T x={0} y={-120} s={34} a="middle" c={C.gray}>CFA-Franc pro kg</T>
          <T x={0} y={40} s={150} a="middle" c={f < f57 ? C.white : C.red}>{Math.round(interpolate(f, [f57 - 6, f57 + 16], [2800, 1200], { ...CL, easing: Easing.bezier(0.3, 0.2, 0.3, 1) })).toLocaleString("de-DE")}</T>
          <T x={0} y={120} s={30} a="middle" c={C.gray} w={700}>März 2026</T>
        </g>
        <Stamp f={f} at={f57 + 10} x={X.farm + 280} y={820} text="−57 %" s={1.1} />
        <T x={X.farm + 280} y={260} s={60} a="middle" c={C.amber} o={tw(f, fNacht - 6, 10)}>über Nacht</T>
      </g>
      {/* ---- Markt ---- */}
      <g>
        <T x={X.mkt} y={130} s={52} a="middle" o={tw(f, fSuper - 6, 12)}>Lebensmittel-Einzelhandel in Deutschland</T>
        <path d={arc(X.mkt - 380, 580, 200, 330, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * 0.9999)} fill="#24324A" />
        {SH.map(([l, v, fa], i) => {
          const share = (v / sum) * 0.85;
          const a0 = a2, a1 = a2 + share * Math.PI * 2 * d85; a2 = a0 + share * Math.PI * 2 * d85;
          const col = [C.amber, C.red, C.blue, C.green][i];
          const show = tw(f, fa - 6, 12);
          return (
            <g key={i}>
              {a1 > a0 + 0.001 && <path d={arc(X.mkt - 380, 580, 200, 330 + 14 * show, a0, a1)} fill={col} stroke="#0E1828" strokeWidth={4} />}
              <g opacity={show} transform={`translate(${X.mkt + 60} ${360 + i * 110})`}><circle cx={0} cy={-14} r={18} fill={col} /><T x={40} y={0} s={48}>{l}</T></g>
            </g>
          );
        })}
        <T x={X.mkt + 100} y={790} s={30} a="start" c={C.gray} w={700} o={tw(f, fSchwarz, 12)}>(Schwarz-Gruppe = Lidl & Kaufland)</T>
        <g transform={`translate(${X.mkt - 380} 580) scale(${pop(f, f85 + 10)})`}><T x={0} y={20} s={110} a="middle" c={C.white}>85 %</T><T x={0} y={70} s={30} a="middle" c={C.gray} w={700}>4 Konzerne</T></g>
        <g opacity={tw(f, fMono - 6, 12)} transform={`translate(${X.mkt + 60} 860)`}>
          <rect x={-20} y={-60} width={780} height={150} rx={22} fill={C.deep} opacity={0.94} />
          <T x={10} y={-12} s={32} c={C.amber}>Monopolkommission (11/2025):</T>
          <T x={10} y={40} s={36}>Margen steigen seit über 10 Jahren</T>
          <path d={`M 640 30 L 680 10 L 700 20 L 740 -30`} stroke={C.red} strokeWidth={6} fill="none" strokeDasharray={`${130 * tw(f, fMargen, 30)} 999`} />
        </g>
      </g>
      {/* ---- Schuldzuweisung ---- */}
      <g>
        <rect x={X.blame - 960} y={880} width={1920} height={200} fill="#1F3150" />
        <Figure f={f} x={X.blame - 560} y={540} s={0.95} shirt={C.red} sleeve="#E0484F" hairStyle={0} angryAt={fRewe2} pointAt={fJeder} />
        <T x={X.blame - 560} y={940} s={40} a="middle" c={C.gray}>Handel</T>
        <Figure f={f} x={X.blame + 560} y={540} s={0.95} shirt={C.amber} sleeve="#E09A30" hair="#5A3A22" hairStyle={2} flip angryAt={fKosten} pointAt={fJeder} />
        <T x={X.blame + 560} y={940} s={40} a="middle" c={C.gray}>Hersteller</T>
        {/* Sprechblasen */}
        {([[fHandel, X.blame - 760, 180, "„Unsere Marge:", "nur 1–3 %“", C.white], [fRewe2, X.blame - 760, 340, "Rewe-Chef:", "„Das ist irre!“", C.amber], [fHerst, X.blame + 300, 220, "„Das sind", "unsere Kosten!“", C.white]] as const).map(([fa, x, y, a, b, col], i) => (
          <g key={i} transform={`translate(${x} ${y}) scale(${pop(f, fa - 4)})`} opacity={1 - tw(f, fNur - 8, 10)}>
            <rect x={0} y={0} width={480} height={130} rx={24} fill={C.white} />
            <path d={i === 2 ? "M 380 130 L 420 180 L 340 130 Z" : "M 100 130 L 60 180 L 160 130 Z"} fill={C.white} />
            <T x={240} y={54} s={34} a="middle" c={C.deep}>{a}</T><T x={240} y={102} s={38} a="middle" c={col === C.amber ? C.red : C.deep}>{b}</T>
          </g>
        ))}
        {/* Du mit leerem Geldbeutel */}
        <g opacity={tw(f, fNur - 6, 12)}>
          <Figure f={f} x={X.blame} y={560 + 40 * (1 - tw(f, fNur - 6, 14))} s={1.0} shirt={C.blue} shockAt={fDu - 2} />
          <g transform={`translate(${X.blame + 120} 820)`}>
            <rect x={-60} y={-40} width={120} height={80} rx={12} fill="#7A5A2E" /><rect x={-60} y={-40} width={120} height={26} rx={10} fill="#5A3B2A" />
            {Array.from({ length: 5 }).map((_, i) => { const k = tw(f, fDu - 8 + i * 3, 20, Easing.out(Easing.quad)); return <g key={i} transform={`translate(${lerp(0, (i - 2) * 140, k)} ${lerp(-20, -260 + Math.pow(k - 0.6, 2) * 600, k)})`} opacity={(1 - tw(f, fDu + 18 + i * 3, 10)) * wallet}><Coin r={22} /></g>; })}
          </g>
        </g>
      </g>
    </svg>
  );
};

export const Ch4: React.FC = () => {
  const f = useCurrentFrame();
  const c = camAt(KEYS, f);
  const sfx: Sfx[] = [[fEuro - 6, "coin", 0.6], [f44 - 6, "pop", 0.5], [f35 - 6, "pop", 0.4], [f8 - 6, "pop", 0.3], [f6 - 6, "pop", 0.3], [f7 - 6, "ding", 0.4],
    [fSofort - 6, "whoosh", 0.6], [f57 - 4, "whoosh", 0.4], [f57 + 10, "stamp", 0.8], [fNacht - 8, "marimba", 0.4], [fSuper - 8, "whoosh", 0.6], [f85 + 10, "pop", 0.5], [fEdeka - 6, "pop", 0.3], [fRewe - 6, "pop", 0.3], [fSchwarz - 6, "pop", 0.3], [fAldi - 6, "pop", 0.3], [fMono - 6, "paper", 0.4],
    [fHandel - 8, "whoosh", 0.6], [fHandel - 4, "pop", 0.4], [fRewe2 - 4, "pop", 0.4], [fHerst - 4, "pop", 0.4], [fDu - 8, "coins", 0.7]];
  return (
    <ChapterShell ch={4} sfx={sfx} blur={BLUR} overlay={<>
      <ChapterLabel f={f} n={4} title="Wer kassiert?" at={4} dur={26} />
      <Caption f={f} from={fNur} to={CH4_DUR} y={70} size={80} parts={[["Nur"], ["einer"], ["zahlt"], ["sicher:"], ["du.", C.amber]]} />
    </>}>
      <Layer cam={c} p={0.3} w={WW} h={WH}><Stripes w={WW} h={WH} /></Layer>
      <Layer cam={c} p={1} w={WW} h={WH}><Main f={f} /></Layer>
    </ChapterShell>
  );
};
