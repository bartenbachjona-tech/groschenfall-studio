import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { C, FONT } from "../brand";
import T6 from "../data/ch6.json";
import { CL, IO, SPR, Timing, lerp, mkW, pop, tw } from "../kit/core";
import { camAt, K, Layer, WHIP } from "../kit/Camera";
import { Stripes } from "../kit/Stage";
import { ChapterShell, Sfx } from "../kit/Chapter";
import { Caption, ChapterLabel } from "../kit/Caption";
import { Figure } from "../kit/Figure";
import { Bar, Coin, Defs, Feather, PriceTag, Rocket, Stamp, T } from "../kit/Props";

const TM = T6 as Timing;
export const CH6_DUR = Math.ceil(TM.total * 30);
const W = mkW(TM);
const WW = 9600, WH = 1080;

const fGrund = W(0, "grundpreis,"), fKilo = W(0, "kilo"), fVerraet = W(0, "verrät"), fMogel = W(0, "mogelpackung.");
const fGreif = W(1, "greif"), fHM = W(1, "handelsmarke."), fAldi = W(1, "aldi"), fGesenkt = W(1, "gesenkt.");
const fKauf = W(2, "kauf"), fBanal = W(2, "banal,"), fWirkt = W(2, "wirkt"), fSechs = W(2, "sechs"), fLindt = W(2, "lindt"), fSenk = W(2, "preissenkungen"), fNach = W(2, "nachfrage");
const fFeder = W(3, "feder"), fAllein = W(3, "allein."), fPusten = W(3, "pusten.");
const fAlso = W(4, "also:"), fAbzocke = W(4, "abzocke,"), fMarkt = W(4, "marktwirtschaft?"), fSchreib = W(4, "schreibs");

const X = { gp: 960, hm: 2880, buy: 4800, blow: 6720, end: 8640 };
const KEYS: K[] = [
  { f: 0, x: X.gp, y: 540, z: 1.0 },
  { f: fGrund + 10, x: X.gp + 180, y: 600, z: 1.35 },
  { f: fGreif - 8, x: X.gp + 200, y: 600, z: 1.35 },
  { f: fGreif + 14, x: X.hm, y: 540, z: 1.0, e: WHIP },
  { f: fKauf - 8, x: X.hm, y: 540, z: 1.04 },
  { f: fKauf + 14, x: X.buy, y: 540, z: 1.0, e: WHIP },
  { f: fFeder - 10, x: X.buy, y: 540, z: 1.04 },
  { f: fFeder + 14, x: X.blow, y: 540, z: 1.0, e: WHIP },
  { f: fAlso - 6, x: X.blow, y: 560, z: 1.06 },
  { f: fAlso + 18, x: X.end, y: 540, z: 1.0, e: WHIP },
  { f: CH6_DUR, x: X.end, y: 540, z: 1.04 },
];
const BLUR: [number, number][] = [[fGreif - 8, fGreif + 16], [fKauf - 8, fKauf + 16], [fFeder - 10, fFeder + 16], [fAlso - 6, fAlso + 20]];

const Main: React.FC<{ f: number }> = ({ f }) => {
  const lens = tw(f, fGrund - 10, 16, SPR);
  const pushF = tw(f, fPusten - 4, 30, Easing.in(Easing.quad));
  const fy = lerp(380, 860, pushF) + Math.sin(f / 14) * (1 - pushF) * 20;
  const fx = X.blow + 160 + Math.sin(f / 16) * 40 * (1 - pushF) + 120 * pushF;
  return (
    <svg width={WW} height={WH} style={{ overflow: "visible" }}>
      <Defs />
      {/* ---- Grundpreis ---- */}
      <g>
        <T x={X.gp} y={150} s={56} a="middle" o={tw(f, 34, 12)}>Tipp 1 · Grundpreis lesen</T>
        <g transform={`translate(${X.gp - 120} 330)`}>
          <rect x={-300} y={0} width={600} height={340} rx={20} fill={C.white} />
          <T x={-260} y={70} s={36} c={C.deep}>Vollmilch-Schokolade</T>
          <T x={-260} y={110} s={28} c={C.mute} w={700}>90 g</T>
          <T x={260} y={230} s={120} a="end" c={C.deep}>1,99 €</T>
          <rect x={-300} y={270} width={600} height={70} rx={0} fill="#E6EAF0" />
          <T x={-260} y={318} s={34} c={C.deep}>1 kg = 22,11 €</T>
        </g>
        {/* Lupe */}
        <g transform={`translate(${X.gp + lerp(400, -220, lens)} ${lerp(800, 640, lens)}) scale(${0.6 + 0.4 * lens})`} opacity={lens}>
          <circle r={130} fill="#FFFFFF" fillOpacity={0.12} stroke={C.amber} strokeWidth={18} />
          <rect x={90} y={90} width={40} height={180} rx={20} fill={C.amber} transform="rotate(-45)" />
          <T x={0} y={14} s={44} a="middle" c={C.red}>22,11 €</T>
        </g>
        <g opacity={tw(f, fKilo, 12)} transform={`translate(${X.gp + 260} 380)`}>
          <T x={0} y={0} s={34} c={C.gray}>vorher (100 g / 1,49 €):</T>
          <T x={0} y={50} s={48} c={C.white}>14,90 €/kg</T>
        </g>
        <Stamp f={f} at={fVerraet} x={X.gp + 420} y={560} text="+48 %" s={0.9} />
      </g>
      {/* ---- Handelsmarke ---- */}
      <g>
        <T x={X.hm} y={150} s={56} a="middle" o={tw(f, fGreif - 4, 12)}>Tipp 2 · Handelsmarke</T>
        <rect x={X.hm - 760} y={620} width={1520} height={26} fill={C.line} />
        <Bar f={f} x={X.hm - 620} y={430} wrap="#6B2438" label="MARKE" sub="90 g" />
        <PriceTag f={f} x={X.hm - 410} y={646} a="1,99 €" />
        <Bar f={f} x={X.hm + 200} y={430} wrap="#5A6B88" label="MILCH" sub="Handelsmarke, 100 g" accent={C.white} />
        <PriceTag f={f} x={X.hm + 410} y={646} a="0,89 €" b="0,79 €" bColor={C.green} flipAt={fGesenkt - 6} />
        <T x={X.hm + 410} y={420} s={40} a="middle" c={C.gray} o={tw(f, fAldi - 4, 12)}>Aldi & Lidl: mehrfach gesenkt ↓</T>
      </g>
      {/* ---- weniger kaufen ---- */}
      <g>
        <T x={X.buy} y={150} s={56} a="middle" o={tw(f, fKauf - 4, 12)}>Tipp 3 · Weniger kaufen</T>
        <g transform={`translate(${X.buy - 420} 640)`}>
          {Array.from({ length: 8 }).map((_, i) => { const k = tw(f, fKauf + 6 + i * 4, 16); return <rect key={i} x={-130 + (i % 4) * 66} y={-150 - Math.floor(i / 4) * 40 - k * 300} width={58} height={34} rx={6} fill="#6B2438" opacity={1 - k} />; })}
          <path d="M -170 -110 L 170 -110 L 140 60 L -140 60 Z" fill="none" stroke={C.white} strokeWidth={12} />
          <path d="M -170 -110 L -230 -180" stroke={C.white} strokeWidth={12} />
          <circle cx={-100} cy={100} r={22} fill={C.white} /><circle cx={100} cy={100} r={22} fill={C.white} />
        </g>
        <g opacity={tw(f, fSechs - 6, 12)} transform={`translate(${X.buy + 60} 420)`}>
          <T x={0} y={0} s={34} c={C.gray}>Schokoladen-Absatz 2025</T>
          <T x={0} y={90} s={110} c={C.red}>−{(5.8 * tw(f, fSechs - 6, 24)).toFixed(1).replace(".", ",")} %</T>
        </g>
        <g opacity={tw(f, fLindt - 4, 12)} transform={`translate(${X.buy + 60} 640)`}>
          <rect x={-20} y={-50} width={720} height={200} rx={22} fill={C.deep} opacity={0.92} />
          <T x={10} y={0} s={36} c={C.amber}>Lindt (29.09.2026):</T>
          <T x={10} y={56} s={40}>breite Preissenkungen</T>
          <T x={10} y={110} s={30} c={C.gray} w={700} o={tw(f, fNach - 4, 10)}>weil die Nachfrage einbricht</T>
        </g>
      </g>
      {/* ---- Pusten ---- */}
      <g>
        <T x={X.blow} y={150} s={60} a="middle" o={tw(f, fFeder - 6, 12)}>Die Feder fällt nicht von allein …</T>
        <g transform={`translate(${fx} ${fy}) rotate(${Math.sin(f / 16 + 1) * 24 + 40 * pushF}) scale(2.2)`} opacity={tw(f, fFeder - 10, 12)}><Feather /></g>
        <Figure f={f} x={X.blow - 380} y={520} s={1.1} blowAt={fPusten - 8} look={6} />
        {pushF > 0 && pushF < 1 && Array.from({ length: 5 }).map((_, i) => <path key={i} d={`M ${X.blow - 300 + i * 10} ${470 + i * 14} q 60 -10 ${120 + 120 * pushF} ${-20 + 40 * pushF}`} stroke={C.gray} strokeWidth={5} fill="none" opacity={0.5 * (1 - pushF)} strokeLinecap="round" />)}
        <T x={X.blow + 480} y={940} s={60} a="middle" c={C.amber} o={tw(f, fPusten, 12)}>… man muss pusten.</T>
      </g>
      {/* ---- Schluss ---- */}
      <g>
        <g transform={`translate(${X.end - 560} 600) rotate(${115 + Math.sin(f / 10) * 4})`}><Rocket f={f} flame={0} /></g>
        <circle cx={X.end - 600} cy={700} r={60} fill="#3A4560" opacity={0.5} />
        <T x={X.end - 560} y={860} s={44} a="middle" c={C.red}>Kakao −56 %</T>
        <g transform={`translate(${X.end + 560} ${520 + Math.sin(f / 14) * 16}) rotate(${Math.sin(f / 16) * 20}) scale(2)`}><Feather /></g>
        <T x={X.end + 560} y={860} s={44} a="middle" c={C.amber}>Tafel +75 %</T>
        <g transform={`translate(${X.end} 470)`}>
          <T x={0} y={0} s={86} a="middle" c={C.red} o={tw(f, fAbzocke - 4, 12)}>Abzocke?</T>
          <T x={0} y={80} s={44} a="middle" c={C.gray} o={tw(f, fAbzocke + 6, 12)}>oder</T>
          <T x={0} y={170} s={70} a="middle" c={C.white} o={tw(f, fMarkt - 6, 12)}>Marktwirtschaft?</T>
        </g>
        <g transform={`translate(${X.end} 820) scale(${pop(f, fSchreib - 4)})`}>
          <rect x={-330} y={-50} width={660} height={100} rx={50} fill={C.white} />
          <T x={0} y={16} s={42} a="middle" c={C.deep}>Schreib's in die Kommentare</T>
        </g>
      </g>
    </svg>
  );
};

export const Ch6: React.FC = () => {
  const f = useCurrentFrame();
  const c = camAt(KEYS, f);
  const sfx: Sfx[] = [[fGrund - 10, "whoosh", 0.4], [fKilo, "pop", 0.4], [fVerraet, "stamp", 0.7], [fGreif - 6, "whoosh", 0.6], [fGesenkt - 6, "coin", 0.6],
    [fKauf - 6, "whoosh", 0.6], [fKauf + 6, "paper", 0.4], [fSechs - 6, "pop", 0.5], [fLindt - 4, "pop", 0.4], [fFeder - 8, "whoosh", 0.6], [fPusten - 4, "whoosh", 0.7],
    [fAlso - 4, "whoosh", 0.6], [fAbzocke - 4, "stamp", 0.5], [fMarkt - 6, "ding", 0.3], [fSchreib - 4, "pop", 0.5]];
  return (
    <ChapterShell ch={6} sfx={sfx} blur={BLUR} overlay={<ChapterLabel f={f} n={6} title="Was hilft?" at={2} dur={20} />}>
      <Layer cam={c} p={0.3} w={WW} h={WH}><Stripes w={WW} h={WH} /></Layer>
      <Layer cam={c} p={1} w={WW} h={WH}><Main f={f} /></Layer>
    </ChapterShell>
  );
};
