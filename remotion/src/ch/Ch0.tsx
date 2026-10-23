import React, { useMemo } from "react";
import { AbsoluteFill, Easing, random, useCurrentFrame } from "remotion";
import { noise2D } from "@remotion/noise";
import { getLength, getPointAtLength } from "@remotion/paths";
import { C, FONT } from "../brand";
import T0 from "../data/ch0.json";
import { Timing, mkW, tw, pop, lerp, win, IO } from "../kit/core";
import { camAt, K, Layer, WHIP } from "../kit/Camera";
import { Stripes } from "../kit/Stage";
import { ChapterShell, Sfx } from "../kit/Chapter";
import { Caption } from "../kit/Caption";
import { Figure } from "../kit/Figure";
import { Bar, DataCard, Defs, Feather, PriceTag, Stamp } from "../kit/Props";
import { ChartAxes, CHOC_D, CocoaLine, IY, MX, Plan, PY, RocketOnCurve, cocoaLen, rocketS, pt } from "../kit/Cocoa";

const TM = T0 as Timing;
export const CH0_DUR = Math.ceil(TM.total * 30);
const W = mkW(TM);
const WW = 1920, WH = 3240;

/* ---- Zeitanker ---- */
const fMilka = W(0, "milkatafel"), fKlein = W(0, "kleiner."), fNeunzig = W(0, "neunzig"), fTeurer = W(0, "teurer:"), f199 = W(0, "neunundneunzig");
const fFuenfzig = W(0, "fünfzig");
const fBegr = W(1, "begründung:"), fKakaoNie = W(1, "nie.");
const fStimmt = W(2, "stimmt."), f13k = W(2, "dreizehntausend"), fFuenfmal = W(2, "fünfmal");
const fStuerzt = W(3, "stürzt"), fAchtzig = W(3, "achtzig"), fHeute = W(3, "heute"), fHalb = W(3, "halb");
const fDeine = W(4, "schokolade?"), fViertel = W(4, "viertel");
const fGeld = W(5, "geld"), fBohne = W(5, "bohne"), fKasse = W(5, "kasse.");

const PLAN: Plan = [
  { f: fStimmt, m: 0 },
  { f: f13k + 8, m: 23 },
  { f: fStuerzt, m: 23 },
  { f: fAchtzig + 6, m: 39, e: Easing.bezier(0.55, 0, 0.95, 0.75) },
  { f: fHalb + 6, m: 45, e: Easing.bezier(0.4, 0, 0.6, 1) },
];
const climbEnd = f13k + 8, fallAt = fStuerzt + 4, fallEnd = fAchtzig + 6;

const follow = (f: number) => {
  let x = 0, y = 0;
  for (let k = 0; k < 9; k++) { const p = pt(rocketS(f - k * 2, PLAN)); x += p.x; y += p.y; }
  return { x: x / 9 + 120, y: y / 9 - 40, z: 1.2 };
};
const KEYS: K[] = [
  { f: 0, x: 1000, y: 2705, z: 2.0 },
  { f: fBegr, x: 985, y: 2712, z: 2.12, e: Easing.bezier(0.3, 0, 0.7, 1) },
  { f: fKakaoNie + 10, x: 900, y: 1820, z: 1.15, e: WHIP },
  { f: climbEnd + 30, x: 1010, y: 1610, z: 0.74 },
  { f: fGeld, x: 1030, y: 1615, z: 0.72 },
  { f: fGeld + 50, x: 980, y: 1500, z: 0.62 },
  { f: CH0_DUR, x: 980, y: 1480, z: 0.6 },
];
const cam = (f: number) => {
  const b = camAt(KEYS, f);
  const w = Math.min(tw(f, fStimmt - 10, 25, IO), 1 - tw(f, climbEnd - 10, 40, IO));
  if (w <= 0) return b;
  const t = follow(f);
  return { x: lerp(b.x, t.x, w), y: lerp(b.y, t.y, w), z: lerp(b.z, t.z, w) };
};

const Far: React.FC = () => {
  const pods = useMemo(() => Array.from({ length: 14 }).map((_, i) => ({ x: random(`px${i}`) * 1920, y: 150 + random(`py${i}`) * 1800, s: 0.6 + random(`ps${i}`) * 1.2, r: random(`pr${i}`) * 360, coin: random(`pc${i}`) > 0.55 })), []);
  const boxes = useMemo(() => Array.from({ length: 34 }).map((_, i) => ({ x: (i % 17) * 118 - 10, row: Math.floor(i / 17), h: 120 + random(`bh${i}`) * 90, c: [C.mute, "#3A5A9A", "#6B2438", "#2E5E4E", "#7A5A2E"][Math.floor(random(`bc${i}`) * 5)] })), []);
  return (
    <svg width={WW} height={WH}>
      {pods.map((p, i) => p.coin ? <circle key={i} cx={p.x} cy={p.y} r={46 * p.s} fill={C.amber} opacity={0.07} />
        : <g key={i} transform={`translate(${p.x} ${p.y}) rotate(${p.r}) scale(${p.s})`} opacity={0.07}><ellipse rx={36} ry={80} fill={C.choco2} />{[-18, 0, 18].map((x) => <path key={x} d={`M ${x} -70 Q ${x * 1.4} 0 ${x} 70`} stroke={C.deep} strokeWidth={4} fill="none" />)}</g>)}
      <rect x={0} y={2160} width={1920} height={1080} fill="#101B2D" />
      {boxes.map((b, i) => <rect key={i} x={b.x} y={(b.row === 0 ? 2470 : 3150) - b.h} width={100} height={b.h} rx={8} fill={b.c} opacity={0.55} />)}
      <rect x={0} y={2470} width={1920} height={20} fill={C.line} /><rect x={0} y={3150} width={1920} height={20} fill={C.line} />
    </svg>
  );
};
const Near: React.FC<{ f: number }> = ({ f }) => {
  const d = useMemo(() => Array.from({ length: 26 }).map((_, i) => ({ x: random(`nx${i}`) * 2200 - 140, y: random(`ny${i}`) * 3240, r: 6 + random(`nr${i}`) * 18, a: random(`na${i}`) > 0.5 })), []);
  return <svg width={WW} height={WH}>{d.map((q, i) => <circle key={i} cx={q.x + noise2D(`dx${i}`, f / 120, 0) * 40} cy={q.y + noise2D(`dy${i}`, 0, f / 120) * 40 - f * 0.15} r={q.r} fill={q.a ? C.amber : C.white} opacity={0.08 + 0.06 * Math.sin(f / 25 + i)} />)}</svg>;
};

const Main: React.FC<{ f: number }> = ({ f }) => {
  const { at } = cocoaLen();
  const s = rocketS(f, PLAN);
  const grid = tw(f, fKakaoNie, 40);
  const chocL = getLength(CHOC_D);
  const choc = tw(f, fStimmt + 20, fDeine - fStimmt, Easing.bezier(0.4, 0, 0.6, 1));
  const cp = getPointAtLength(CHOC_D, Math.max(0.01, chocL * choc));
  const fea = tw(f, fDeine, 25);
  const feaY = lerp(-150, -100, tw(f, fDeine, 300, (t) => t));
  const hp = pop(f, f13k + 4);
  const low = pt(at(39)), now = pt(at(45));
  return (
    <svg width={WW} height={WH} style={{ overflow: "visible" }}>
      <Defs />
      <ChartAxes o={grid} />
      <path d={CHOC_D} stroke={C.amber} strokeWidth={10} fill="none" strokeLinecap="round" strokeDasharray={`${chocL * choc} 99999`} />
      {choc > 0.02 && <circle cx={cp.x} cy={cp.y} r={14} fill={C.amber} />}
      <CocoaLine s={s} />
      <RocketOnCurve f={f} plan={PLAN} startF={fStimmt} climbEnd={climbEnd} fallAt={fallAt} fallEnd={fallEnd} hideAt={fHeute} />
      {/* Peak */}
      <g transform={`translate(${MX(23) + 270} ${PY(12900) + 20}) scale(${hp})`}>
        <rect x={-160} y={-56} width={320} height={92} rx={20} fill={C.red} />
        <text y={10} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={52} fill={C.white}>12.900 $</text>
      </g>
      <g transform={`translate(${MX(23) + 270} ${PY(12900) + 130}) scale(${pop(f, fFuenfmal)})`}>
        <text textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={60} fill={C.amber}>×4,8</text>
        <text y={44} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={30} fill={C.gray}>seit Anfang 2023</text>
      </g>
      {/* Tief & heute */}
      <Stamp f={f} at={fAchtzig} x={low.x - 120} y={low.y + 110} text="−78 %" s={1.1} />
      <g opacity={tw(f, fHalb - 6, 14)} transform={`translate(${now.x} ${now.y})`}>
        <circle r={16} fill={C.red} />
        <circle r={16 + 20 * ((f % 40) / 40)} fill="none" stroke={C.red} strokeWidth={4} opacity={1 - (f % 40) / 40} />
        <rect x={30} y={-90} width={330} height={120} rx={20} fill={C.deep} opacity={0.9} />
        <text x={52} y={-40} fontFamily={FONT} fontWeight={800} fontSize={44} fill={C.white}>heute 5.650 $</text>
        <text x={52} y={10} fontFamily={FONT} fontWeight={800} fontSize={40} fill={C.red}>−56 % vom Rekord</text>
      </g>
      {/* Feder über der Schokolade */}
      <g transform={`translate(${MX(45) + 60 + Math.sin(f / 16) * 34} ${IY(175) + feaY}) rotate(${Math.sin(f / 16 + 1) * 20 + 30}) scale(1.6)`} opacity={fea * (1 - tw(f, fGeld - 10, 15))}><Feather /></g>
      <g transform={`translate(${MX(45) + 80} ${IY(175) + 80})`} opacity={tw(f, fDeine + 10, 20)}>
        <text fontFamily={FONT} fontWeight={800} fontSize={60} fill={C.amber}>Schokolade</text>
        <text y={70} fontFamily={FONT} fontWeight={800} fontSize={72} fill={C.amber} opacity={tw(f, fViertel - 4, 12)}>+75 %</text>
        <text y={116} fontFamily={FONT} fontWeight={700} fontSize={34} fill={C.gray} opacity={tw(f, fViertel, 12)}>Tafel ggü. 2020</text>
      </g>

      {/* Regal */}
      <rect x={0} y={2810} width={1920} height={30} fill={C.line} />
      <rect x={0} y={2810} width={1920} height={5} fill="#3A5A9A" />
      <rect x={0} y={2840} width={1920} height={40} fill="#1F3150" />
      <g transform="translate(330 2620)"><rect width={300} height={190} rx={14} fill="#2E5E4E" /><rect width={300} height={190} rx={14} fill="url(#shine)" /></g>
      <g transform="translate(1250 2650)"><rect width={240} height={160} rx={14} fill="#3A5A9A" /><rect width={240} height={160} rx={14} fill="url(#shine)" /></g>
      <Bar f={f} x={750} y={2620} wrap="#6B2438" label="SCHOKOLADE" sub="Vollmilch · zart" grams={["100 g", "90 g"]} xrayAt={fKlein - 14} shrinkAt={fNeunzig - 4} />
      <DataCard f={f} x={560} y={2482} at={fMilka - 4} title="Milka" lines={[["Anfang 2025", C.gray]]} w={360} />
      <PriceTag f={f} x={960} y={2836} a="1,49 €" b="1,99 €" flipAt={f199 - 4} sticker="+48 %" stickerAt={fFuenfzig} />
      <Figure f={f} x={1345} y={2640} shockAt={f199} reach={[12, 52, 120, 150]} />
    </svg>
  );
};

/** Titelkarte „Von der Bohne bis zur Kasse“ */
const Journey: React.FC<{ f: number }> = ({ f }) => {
  const o = win(f, fBohne - 10, CH0_DUR - 10, 12);
  if (o <= 0) return null;
  const p = tw(f, fBohne, fKasse - fBohne + 10, IO);
  return (
    <AbsoluteFill style={{ opacity: o, background: `rgba(10,17,29,${0.6 * o})` }}>
      <svg width={1920} height={1080}>
        <path d="M 420 600 C 760 420, 1160 780, 1500 600" stroke={C.amber} strokeWidth={8} strokeDasharray="18 16" fill="none" strokeDashoffset={-f * 2} opacity={0.8} />
        <g transform={`translate(${lerp(420, 1500, p)} ${600 + Math.sin(p * Math.PI * 2) * -110})`}><circle r={30} fill={C.amber} /><text y={11} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={30} fill={C.deep}>€</text></g>
        <g transform="translate(420 600)"><ellipse rx={56} ry={86} fill={C.choco2} transform="rotate(-20)" /><path d="M -10 -70 Q 14 0 -10 70" stroke={C.choco} strokeWidth={8} fill="none" transform="rotate(-20)" /></g>
        <text x={420} y={760} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={48} fill={C.white}>Bohne</text>
        <g transform={`translate(1500 600) scale(${pop(f, fKasse - 6)})`}>
          <rect x={-90} y={-60} width={180} height={120} rx={14} fill={C.blue} /><rect x={-70} y={-110} width={140} height={60} rx={10} fill={C.deep} />
          <text x={0} y={-68} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={40} fill={C.green}>1,99</text>
          <rect x={-110} y={60} width={220} height={30} rx={8} fill={C.mute} />
        </g>
        <text x={1500} y={760} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={48} fill={C.white}>Kasse</text>
      </svg>
    </AbsoluteFill>
  );
};

export const Ch0: React.FC = () => {
  const f = useCurrentFrame();
  const c = cam(f);
  const sfx: Sfx[] = [[fMilka - 4, "pop", 0.5], [fKlein - 14, "paper", 0.5], [fNeunzig - 4, "pop", 0.5], [f199 - 10, "pop", 0.6], [f199, "ding", 0.35], [fFuenfzig, "stamp", 0.5],
    [fBegr + 2, "whoosh", 0.7], [f13k + 4, "pop", 0.5], [fFuenfmal, "ding", 0.3], [fStuerzt, "whoosh", 0.5], [fAchtzig, "stamp", 0.9], [fHalb - 6, "pop", 0.4], [fDeine, "marimba", 0.5], [fViertel - 4, "ding", 0.35], [fBohne - 10, "whoosh", 0.6], [fKasse - 6, "coins", 0.6]];
  return (
    <ChapterShell ch={0} sfx={sfx} blur={[[fBegr - 5, fKakaoNie + 14]]}
      overlay={<>
        <Caption f={f} from={fStuerzt - 2} to={fDeine - 10} y={930} parts={[["Kakao:"], ["steigt", C.red], ["wie"], ["eine"], ["Rakete,"], ["fällt"], ["wie"], ["ein"], ["Stein", C.red]]} />
        <Caption f={f} from={fDeine} to={fGeld - 6} y={930} parts={[["Schokolade:"], ["fällt", C.amber], ["wie"], ["eine"], ["Feder", C.amber]]} />
        <Caption f={f} from={fGeld} to={CH0_DUR} y={110} size={78} parts={[["Wo"], ["ist"], ["das"], ["Geld", C.amber], ["geblieben?"]]} />
        <Journey f={f} />
      </>}>
      <Layer cam={c} p={0.35} w={WW} h={WH}><Stripes w={WW} h={WH} /></Layer>
      <Layer cam={c} p={0.6} blur={3} w={WW} h={WH}><Far /></Layer>
      <Layer cam={c} p={1} w={WW} h={WH}><Main f={f} /></Layer>
      <Layer cam={c} p={1.45} blur={5} w={WW} h={WH}><Near f={f} /></Layer>
    </ChapterShell>
  );
};
