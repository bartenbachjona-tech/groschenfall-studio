import React, { useMemo } from "react";
import { Easing, interpolate, random, useCurrentFrame } from "remotion";
import { noise2D } from "@remotion/noise";
import { getLength } from "@remotion/paths";
import { C, FONT } from "../brand";
import T1 from "../data/ch1.json";
import { CL, IO, SPR, Timing, lerp, mkW, pop, tw, win } from "../kit/core";
import { camAt, K, Layer, WHIP } from "../kit/Camera";
import { Stripes } from "../kit/Stage";
import { ChapterShell, Sfx } from "../kit/Chapter";
import { ChapterLabel } from "../kit/Caption";
import { Figure } from "../kit/Figure";
import { Bar, Defs, T } from "../kit/Props";
import { Globe, ISO, globeProj } from "../kit/Globe";
import { COCOA, smooth } from "../kit/Cocoa";

const TM = T1 as Timing;
export const CH1_DUR = Math.ceil(TM.total * 30);
const W = mkW(TM);
const WW = 7680, WH = 1080;

const fGuertel = W(0, "gürtel"), fZwei = W(0, "ländern:"), fCiv = W(0, "elfenbeinküste"), fGha = W(0, "ghana.");
const fP1 = W(1, "zweitausenddreiundzwanzig"), fSchlecht = W(1, "schlecht"), fWenig = W(1, "wenig"), fFans = W(1, "schokoladenfans."), fBoerse = W(1, "börse");
const f2700 = W(1, "zweitausendsiebenhundert"), f13k = W(1, "dreizehntausend"), fDez = W(1, "dezember");
const fHerst = W(2, "hersteller"), fRauf = W(2, "rauf,"), fKleiner = W(2, "kleiner.");
const fErholen = W(3, "erholen"), fKaufen = W(3, "kaufen"), fWeniger = W(3, "weniger"), fFaellt = W(3, "kakaopreis"), fUnter = W(3, "unter"), f3000 = W(3, "dreitausend");
const fSommer = W(4, "sommer"), f5600 = W(4, "fünftausendsechshundert"), fHaelfte = W(4, "hälfte");

/* Stationen: A Globus 960, B Farm 2880, C Börse 4800, D Fabrik 6720 */
const KEYS: K[] = [
  { f: 0, x: 960, y: 560, z: 1.06 },
  { f: fGha + 20, x: 960, y: 540, z: 1.0 },
  { f: fP1 + 26, x: 2880, y: 540, z: 1.0, e: WHIP },
  { f: fBoerse - 6, x: 2900, y: 560, z: 1.08 },
  { f: fBoerse + 22, x: 4800, y: 540, z: 1.0, e: WHIP },
  { f: fDez + 30, x: 4800, y: 520, z: 1.04 },
  { f: fHerst + 16, x: 6720, y: 540, z: 1.0, e: WHIP },
  { f: fErholen - 4, x: 6740, y: 540, z: 1.05 },
  { f: fErholen + 18, x: 2880, y: 540, z: 1.0, e: WHIP },
  { f: fKaufen - 8, x: 2880, y: 540, z: 1.0 },
  { f: fKaufen + 12, x: 6900, y: 560, z: 1.1, e: WHIP },
  { f: fFaellt - 10, x: 6900, y: 560, z: 1.12 },
  { f: fFaellt + 12, x: 4800, y: 540, z: 1.0, e: WHIP },
  { f: CH1_DUR, x: 4800, y: 520, z: 1.06 },
];
const BLUR: [number, number][] = [[fP1 + 2, fP1 + 30], [fBoerse - 4, fBoerse + 26], [fHerst - 6, fHerst + 20], [fErholen - 6, fErholen + 22], [fKaufen - 10, fKaufen + 16], [fFaellt - 12, fFaellt + 16]];

/* ---------- A: Globus ---------- */
const StationGlobe: React.FC<{ f: number }> = ({ f }) => {
  const r = tw(f, 0, fZwei, IO);
  const lon = lerp(40, -3, r), lat = lerp(28, 6, r);
  const hi = { [ISO.CIV]: tw(f, fCiv - 4, 12), [ISO.GHA]: tw(f, fGha - 4, 12) };
  const P = globeProj(960, 560, 430, lon, lat);
  const civ = P([-5.5, 7.6]) ?? [0, 0], gha = P([-1.0, 7.9]) ?? [0, 0];
  return (
    <g>
      <Globe cx={960} cy={560} r={430} lon={lon} lat={lat} highlight={hi} belt={tw(f, fGuertel - 6, 18)} />
      <g opacity={tw(f, fGuertel, 16)}><T x={1440} y={560} s={40} c={C.amber}>Kakao-Gürtel</T><T x={1440} y={604} s={28} c={C.gray} w={700}>rund um den Äquator</T></g>
      <g opacity={tw(f, fCiv, 12)}>
        <line x1={civ[0]} y1={civ[1]} x2={civ[0] - 230} y2={civ[1] - 170} stroke={C.white} strokeWidth={3} />
        <T x={civ[0] - 240} y={civ[1] - 182} s={42} a="end">Elfenbeinküste</T>
      </g>
      <g opacity={tw(f, fGha, 12)}>
        <line x1={gha[0]} y1={gha[1]} x2={gha[0] + 210} y2={gha[1] - 200} stroke={C.white} strokeWidth={3} />
        <T x={gha[0] + 220} y={gha[1] - 212} s={42}>Ghana</T>
      </g>
    </g>
  );
};

/* ---------- B: Farm ---------- */
const Tree: React.FC<{ f: number; x: number; bad: number; seed: number }> = ({ f, x, bad, seed }) => {
  const leaf = (a: string, b: string) => {
    const pa = [parseInt(a.slice(1, 3), 16), parseInt(a.slice(3, 5), 16), parseInt(a.slice(5, 7), 16)];
    const pb = [parseInt(b.slice(1, 3), 16), parseInt(b.slice(3, 5), 16), parseInt(b.slice(5, 7), 16)];
    return `rgb(${pa.map((v, i) => Math.round(lerp(v, pb[i], bad))).join(",")})`;
  };
  const sway = Math.sin((f + seed * 40) / 30) * 3;
  const pods = [[-40, 500, 0], [36, 550, 1], [-30, 620, 2], [44, 660, 3], [-48, 720, 4]];
  return (
    <g transform={`translate(${x} 0)`}>
      <path d="M -26 880 L -18 400 Q 0 370 18 400 L 26 880 Z" fill="#5A3B2A" />
      <g transform={`translate(0 110) rotate(${sway} 0 360)`}>
        {[[-120, 330, 150], [90, 300, 160], [0, 220, 170], [-170, 220, 110], [170, 220, 120], [-60, 140, 120], [80, 130, 110]].map(([cx, cy, rr], i) => (
          <circle key={i} cx={cx} cy={cy} r={rr} fill={leaf(["#2E7D5B", "#2A6E52", "#358A64"][i % 3], ["#6B6A3A", "#5E5A35", "#77703F"][i % 3])} />
        ))}
      </g>
      {pods.map(([px, py, k]) => {
        const drop = bad > 0.5 && k % 2 === 0 ? Math.min(1, (bad - 0.5) * 2) : 0;
        const fy = py + drop * drop * (860 - py);
        return (
          <g key={k} transform={`translate(${px} ${fy}) rotate(${drop * 70 * (k ? 1 : -1)})`}>
            <ellipse rx={22} ry={44} fill={leaf(k % 2 ? "#E0A33A" : "#D98A2E", "#5C4630")} />
            <path d="M 0 -40 Q 6 0 0 40" stroke={C.deep} strokeOpacity={0.25} strokeWidth={4} fill="none" />
          </g>
        );
      })}
    </g>
  );
};
const StationFarm: React.FC<{ f: number }> = ({ f }) => {
  const bad = tw(f, fSchlecht - 8, 30) * (1 - tw(f, fErholen, 30));
  const sun = tw(f, fP1 + 10, 30) * (1 - tw(f, fErholen, 20));
  const fans = tw(f, fFans - 14, 16);
  const beans = Math.round(lerp(12, 3, tw(f, fWenig - 6, 20)) * (1 - tw(f, fErholen + 10, 20)) + 12 * tw(f, fErholen + 10, 20));
  const crowd = useMemo(() => Array.from({ length: 11 }).map((_, i) => ({ x: 3180 + (i % 6) * 95 + (i > 5 ? 48 : 0), y: i > 5 ? 760 : 700, c: [C.blue, C.green, "#B48CFF", "#FF8FB1", C.amber][i % 5], h: (["#2B2140", "#6B4A2E", "#C9A15A"] as const)[i % 3] })), []);
  return (
    <g>
      <rect x={1920} y={880} width={1920} height={200} fill="#1F3150" />
      <rect x={1920} y={880} width={1920} height={8} fill="#2A3F63" />
      <g opacity={sun} transform={`translate(2230 200)`}>
        <circle r={90 + 6 * Math.sin(f / 6)} fill={C.amber} opacity={0.25} /><circle r={70} fill={C.amber} />
        {Array.from({ length: 10 }).map((_, i) => <rect key={i} x={-6} y={-140} width={12} height={36} rx={6} fill={C.amber} transform={`rotate(${i * 36 + f})`} />)}
      </g>
      <T x={2230} y={360} s={34} a="middle" c={C.amber} o={sun * tw(f, fSchlecht - 6, 12)}>Dürre · Krankheiten</T>
      <Tree f={f} x={2380} bad={bad} seed={1} />
      <Tree f={f} x={2860} bad={bad * 0.9} seed={2} />
      {/* Korb */}
      <g transform="translate(2620 800)">
        {Array.from({ length: beans }).map((_, i) => <ellipse key={i} cx={-60 + (i % 6) * 24} cy={-8 - Math.floor(i / 6) * 18} rx={14} ry={9} fill={C.choco2} />)}
        <path d="M -90 -10 L 90 -10 L 70 70 L -70 70 Z" fill="#8A6A3A" /><path d="M -90 -10 L 90 -10" stroke="#B9822F" strokeWidth={8} />
      </g>
      {/* Schokoladenfans */}
      <g opacity={fans}>
        {crowd.map((p, i) => <Figure key={i} f={f + i * 7} x={p.x} y={p.y - 30 * (1 - fans)} s={0.42} shirt={p.c} sleeve={p.c} hair={p.h} hairStyle={(i % 3) as 0 | 1 | 2} blinkSeed={i} smileAt={fFans} />)}
        <T x={3420} y={540} s={40} a="middle" c={C.white}>zu viele Fans</T>
      </g>
      <g opacity={tw(f, fWenig - 6, 12) * (1 - tw(f, fErholen, 12))}><T x={2620} y={980} s={40} a="middle" c={C.red}>zu wenig Bohnen</T></g>
      <g opacity={tw(f, fErholen + 6, 14)}><T x={2620} y={980} s={40} a="middle" c={C.green}>Ernte erholt sich</T></g>
    </g>
  );
};

/* ---------- C: Börse ---------- */
const SPARK = smooth(COCOA.map(([m, p]) => [3990 + (m / 45) * 600, 960 - (p / 13000) * 260]));
const priceAt = (f: number) => {
  if (f < f2700) return 2700;
  if (f < fFaellt) return interpolate(f, [f2700 + 10, f13k + 10], [2700, 12900], { ...CL, easing: Easing.bezier(0.5, 0, 0.9, 0.6) });
  if (f < fSommer) return interpolate(f, [fFaellt, f3000 + 6], [12900, 2850], { ...CL, easing: Easing.bezier(0.3, 0.2, 0.3, 1) });
  return interpolate(f, [fSommer, f5600 + 6], [2850, 5650], { ...CL, easing: IO });
};
const sparkM = (f: number) => (f < f2700 ? 0 : f < fFaellt ? interpolate(f, [f2700 + 10, f13k + 10], [0, 23], CL) : f < fSommer ? interpolate(f, [fFaellt, f3000 + 6], [23, 39], CL) : interpolate(f, [fSommer, f5600 + 6], [39, 45], CL));
const StationExchange: React.FC<{ f: number }> = ({ f }) => {
  const p = priceAt(f);
  const up = f < fFaellt || f >= fSommer;
  const col = f < f2700 ? C.white : up ? C.green : C.red;
  const L = useMemo(() => getLength(SPARK), []);
  const m = sparkM(f);
  const half = tw(f, fHaelfte - 10, 20);
  const shake = f > f13k && f < f13k + 14 ? Math.sin(f * 3) * 6 : 0;
  return (
    <g>
      <rect x={3940} y={110} width={1720} height={900} rx={30} fill="#0A111D" />
      <rect x={3940} y={110} width={1720} height={900} rx={30} fill="none" stroke="#2A3F63" strokeWidth={6} />
      {Array.from({ length: 44 }).map((_, i) => <circle key={i} cx={3980 + i * 38} cy={150} r={5} fill={C.amber} opacity={0.15 + 0.6 * ((Math.floor(f / 4) + i) % 7 === 0 ? 1 : 0)} />)}
      <T x={4000} y={240} s={46} c={C.gray}>KAKAO · BÖRSE NEW YORK · $ pro Tonne</T>
      <g transform={`translate(${4800 + shake} 520)`}>
        <text textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={250} fill={col} style={{ fontVariantNumeric: "tabular-nums" }}>{Math.round(p).toLocaleString("de-DE")}</text>
        {f >= f2700 && <g transform={`translate(${Math.round(p) >= 10000 ? 640 : 540} -90) rotate(${up ? 0 : 180})`}><path d="M 0 -70 L 60 20 L 22 20 L 22 70 L -22 70 L -22 20 L -60 20 Z" fill={col} /></g>}
      </g>
      <path d={SPARK} stroke={C.red} strokeWidth={8} fill="none" strokeDasharray={`${L * (m / 45)} 9999`} strokeLinecap="round" />
      {[["2023", 0], ["2024", 12], ["2025", 24], ["2026", 36]].map(([l, mm]) => <T key={l as string} x={3990 + ((mm as number) / 45) * 600} y={1000} s={26} c={C.mute} w={700} a="middle">{l}</T>)}
      {/* Hälfte-Vergleich */}
      <g opacity={half}>
        <rect x={4760} y={960 - 300} width={150} height={300} rx={12} fill={C.red} opacity={0.35} />
        <rect x={4760} y={960 - 300 * (5650 / 12900) * half} width={150} height={300 * (5650 / 12900) * half} rx={12} fill={C.red} />
        <T x={4835} y={640} s={34} a="middle" c={C.gray}>Rekord</T>
        <T x={4835} y={940} s={40} a="middle">5.650</T>
        <g transform={`translate(5100 820) scale(${pop(f, fHaelfte)})`}><T x={0} y={0} s={90} c={C.green}>&lt; ½</T><T x={0} y={50} s={32} c={C.gray} w={700}>vom Rekord</T></g>
      </g>
      {/* Laufband */}
      <rect x={3940} y={1030} width={1720} height={50} fill="#121C2E" />
      <clipPath id="tick"><rect x={3940} y={1030} width={1720} height={50} /></clipPath>
      <g clipPath="url(#tick)">
        {Array.from({ length: 10 }).map((_, i) => <T key={i} x={3940 + ((i * 360 - f * 4) % 3600 + 3600) % 3600} y={1066} s={28} c={i % 2 ? C.green : C.red} w={700}>{i % 2 ? "COCOA ▲" : "SUGAR ▼"}</T>)}
      </g>
    </g>
  );
};

/* ---------- D: Fabrik + Laden ---------- */
const StationFactory: React.FC<{ f: number }> = ({ f }) => {
  const press = (t0: number) => Math.max(0, Math.sin(Math.min(1, Math.max(0, (f - t0) / 10)) * Math.PI));
  const shopEmpty = tw(f, fWeniger - 8, 20);
  return (
    <g>
      <path d="M 5800 880 L 5800 420 L 5980 330 L 5980 420 L 6160 330 L 6160 420 L 6340 330 L 6340 880 Z" fill="#16243B" />
      <rect x={6020} y={210} width={70} height={140} fill="#16243B" />
      {Array.from({ length: 6 }).map((_, i) => <circle key={i} cx={6055 + noise2D(`sm${i}`, f / 60, i) * 20} cy={190 - ((f * 1.2 + i * 30) % 180)} r={20 + ((f * 1.2 + i * 30) % 180) / 6} fill={C.gray} opacity={0.12 * (1 - ((f * 1.2 + i * 30) % 180) / 180)} />)}
      <T x={6070} y={560} s={40} a="middle" c={C.gray}>Hersteller</T>
      {/* Förderband */}
      <rect x={5900} y={800} width={1300} height={26} rx={13} fill={C.mute} />
      {Array.from({ length: 13 }).map((_, i) => <circle key={i} cx={5920 + i * 100} cy={813} r={9} fill="#3A4560" />)}
      {Array.from({ length: 5 }).map((_, i) => {
        const x = 5940 + ((i * 260 + f * 3) % 1300);
        const cut = x > 6700 && f >= fKleiner - 4 ? 0.72 : 1;
        const tag = x > 6420 && f >= fRauf - 6;
        return (
          <g key={i}>
            <g transform={`translate(${x} 700) scale(0.45)`}><Bar f={f} x={0} y={0} w={300 * cut} h={200} wrap={["#6B2438", "#2E5E4E", "#3A5A9A"][i % 3]} label="" sub="" /></g>
            {tag && <g transform={`translate(${x + 60 * cut} 690)`}><circle r={24} fill={C.red} /><T x={0} y={10} s={30} a="middle">+</T></g>}
          </g>
        );
      })}
      {/* Stempel & Schneider */}
      <g transform={`translate(6440 ${560 + 120 * press(fRauf - 6)})`}><rect x={-12} y={-300} width={24} height={300} fill={C.mute} /><rect x={-70} y={0} width={140} height={60} rx={10} fill={C.red} /><T x={0} y={44} s={34} a="middle">€ ↑</T></g>
      <g transform={`translate(6740 ${580 + 110 * press(fKleiner - 6)})`}><rect x={-10} y={-300} width={20} height={300} fill={C.mute} /><path d="M -60 0 L 60 0 L 0 70 Z" fill={C.gray} /></g>
      <g opacity={tw(f, fRauf - 4, 10)}><T x={6440} y={950} s={48} a="middle" c={C.red}>Preise rauf</T></g>
      <g opacity={tw(f, fKleiner - 4, 10)}><T x={6800} y={950} s={48} a="middle" c={C.amber}>Tafeln kleiner</T></g>
      {/* Laden-Ecke */}
      <g transform="translate(7330 0)">
        <rect x={-120} y={520} width={240} height={360} rx={18} fill="#1B2D49" />
        <T x={0} y={580} s={34} a="middle" c={C.gray}>Absatz</T>
        <T x={0} y={650} s={56} a="middle" c={C.red} o={shopEmpty}>−5,8 %</T>
        <T x={0} y={690} s={26} a="middle" c={C.gray} o={shopEmpty} w={700}>2025</T>
        <g transform={`translate(0 ${810})`}>
          {Array.from({ length: 6 }).map((_, i) => <rect key={i} x={-80 + (i % 3) * 55} y={-70 - Math.floor(i / 3) * 34 - shopEmpty * (40 + i * 30)} width={46} height={30} rx={6} fill="#6B2438" opacity={1 - shopEmpty} />)}
          <path d="M -100 -40 L 100 -40 L 80 40 L -80 40 Z" fill="none" stroke={C.white} strokeWidth={8} />
          <circle cx={-60} cy={60} r={14} fill={C.white} /><circle cx={60} cy={60} r={14} fill={C.white} />
        </g>
      </g>
    </g>
  );
};

const Back: React.FC = () => {
  const d = useMemo(() => Array.from({ length: 50 }).map((_, i) => ({ x: random(`bx${i}`) * WW, y: random(`by${i}`) * 900, r: 20 + random(`br${i}`) * 60 })), []);
  return <svg width={WW} height={WH}>{d.map((q, i) => <circle key={i} cx={q.x} cy={q.y} r={q.r} fill={i % 3 ? C.white : C.amber} opacity={0.035} />)}</svg>;
};

export const Ch1: React.FC = () => {
  const f = useCurrentFrame();
  const c = camAt(KEYS, f);
  const sfx: Sfx[] = [[fGuertel - 6, "marimba", 0.4], [fCiv - 4, "pop", 0.5], [fGha - 4, "pop", 0.5], [fP1, "whoosh", 0.6], [fSchlecht - 8, "paper", 0.4], [fFans - 14, "pop", 0.4], [fBoerse - 2, "whoosh", 0.6], [f13k + 8, "stamp", 0.7],
    [fHerst - 4, "whoosh", 0.6], [fRauf - 2, "stamp", 0.6], [fKleiner - 2, "paper", 0.6], [fErholen - 4, "whoosh", 0.5], [fKaufen - 8, "whoosh", 0.5], [fWeniger - 6, "coins", 0.4], [fFaellt - 10, "whoosh", 0.6], [f3000, "stamp", 0.6], [f5600, "ding", 0.3], [fHaelfte - 6, "pop", 0.5]];
  return (
    <ChapterShell ch={1} sfx={sfx} blur={BLUR} overlay={<ChapterLabel f={f} n={1} title="Die Rakete" at={6} dur={110} />}>
      <Layer cam={c} p={0.3} w={WW} h={WH}><Stripes w={WW} h={WH} /></Layer>
      <Layer cam={c} p={0.55} blur={4} w={WW} h={WH}><Back /></Layer>
      <Layer cam={c} p={1} w={WW} h={WH}>
        <svg width={WW} height={WH} style={{ overflow: "visible" }}>
          <Defs />
          <StationGlobe f={f} />
          <StationFarm f={f} />
          <StationExchange f={f} />
          <StationFactory f={f} />
        </svg>
      </Layer>
    </ChapterShell>
  );
};
