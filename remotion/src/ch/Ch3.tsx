import React, { useMemo } from "react";
import { Easing, interpolate, random, useCurrentFrame } from "remotion";
import { noise2D } from "@remotion/noise";
import { C, FONT } from "../brand";
import T3 from "../data/ch3.json";
import { CL, IO, SPR, Timing, lerp, mkW, pop, tw } from "../kit/core";
import { camAt, K, Layer, WHIP } from "../kit/Camera";
import { Stripes } from "../kit/Stage";
import { ChapterShell, Sfx } from "../kit/Chapter";
import { ChapterLabel } from "../kit/Caption";
import { Bar, Coin, Defs, Feather, Rocket, Stamp, T } from "../kit/Props";

const TM = T3 as Timing;
export const CH3_DUR = Math.ceil(TM.total * 30);
const W = mkW(TM);
const WW = 13440, WH = 1080;

const fRockets = W(0, "rockets"), fRakete = W(0, "rakete,"), fFeder = W(0, "feder.");
const fForscher = W(1, "forscher"), f12k = W(1, "zwölftausend"), fErgebnis = W(1, "ergebnis:"), fRegel = W(1, "regel.");
const fAber = W(2, "aber"), fButter = W(2, "butter"), fMilch = W(2, "milchpreis"), fDrittel = W(2, "drittel"), fSchnell = W(2, "schnell.");
const fOel = W(3, "olivenöl"), fErz = W(3, "erzeuger"), fHaelfte = W(3, "hälfte"), fSuper = W(3, "supermarkt"), f13 = W(3, "dreizehn");
const fWarum = W(4, "warum"), fErstens = W(4, "erstens:"), fMonate = W(4, "monate"), fFest = W(4, "festen"), fLindt = W(4, "lindt"), fKaum = W(4, "kaum");
const fZweit = W(5, "zweitens:"), fTeil = W(5, "teil"), fZucker = W(5, "zucker,"), fMilch2 = W(5, "milch,"), fVerp = W(5, "verpackung,"), fEnergie = W(5, "energie,"), fLoehne = W(5, "löhne."), fTeurer = W(5, "teurer");
const fFaust = W(6, "faustregel."), fVerd = W(6, "verdoppelt"), fZehn = W(6, "zehn"), fFuenf = W(6, "verfünffacht."), fVierzig = W(6, "vierzig"), fHalb = W(6, "halb"), fFuenfzig = W(6, "fünfzig"), fGeblieben = W(6, "geblieben."), fGramm = W(6, "gramm");

const X = { rf: 960, ts: 2880, bu: 4800, ol: 6720, he: 8640, ko: 10560, fr: 12480 };
const KEYS: K[] = [
  { f: 0, x: X.rf, y: 540, z: 1.08 },
  { f: fFeder + 20, x: X.rf, y: 540, z: 1.0 },
  { f: fForscher + 14, x: X.ts, y: 540, z: 1.0, e: WHIP },
  { f: fAber - 6, x: X.ts, y: 540, z: 1.05 },
  { f: fAber + 16, x: X.bu, y: 540, z: 1.0, e: WHIP },
  { f: fOel - 8, x: X.bu, y: 540, z: 1.05 },
  { f: fOel + 14, x: X.ol, y: 540, z: 1.0, e: WHIP },
  { f: fWarum - 8, x: X.ol, y: 540, z: 1.05 },
  { f: fWarum + 14, x: X.he, y: 540, z: 1.0, e: WHIP },
  { f: fZweit - 8, x: X.he, y: 540, z: 1.05 },
  { f: fZweit + 14, x: X.ko, y: 540, z: 1.0, e: WHIP },
  { f: fFaust - 14, x: X.ko, y: 540, z: 1.05 },
  { f: fFaust + 8, x: X.fr, y: 540, z: 1.0, e: WHIP },
  { f: CH3_DUR, x: X.fr, y: 530, z: 1.05 },
];
const BLUR: [number, number][] = [[fForscher - 6, fForscher + 16], [fAber - 6, fAber + 18], [fOel - 8, fOel + 16], [fWarum - 8, fWarum + 16], [fZweit - 8, fZweit + 16], [fFaust - 14, fFaust + 10]];

const Pump: React.FC<{ on: number }> = ({ on }) => (
  <g>
    <rect x={-18} y={-50} width={36} height={60} rx={6} fill={on > 0.5 ? C.amber : "#2E4A75"} />
    <rect x={-12} y={-42} width={24} height={14} rx={3} fill={C.deep} opacity={0.6} />
    <path d="M 18 -30 Q 32 -30 32 -10 L 32 10" stroke={on > 0.5 ? C.amber : "#2E4A75"} strokeWidth={5} fill="none" />
  </g>
);

const Main: React.FC<{ f: number }> = ({ f }) => {
  /* R&F Titel */
  const rk = tw(f, fRakete - 30, 40, Easing.in(Easing.quad));
  const feaY = lerp(520, 680, tw(f, fFeder - 20, 200, (t) => t));
  /* Tankstellen */
  const pumps = useMemo(() => Array.from({ length: 16 * 7 }).map((_, i) => ({ c: i % 16, r: Math.floor(i / 16), d: random(`pd${i}`) })), []);
  const wave = interpolate(f, [f12k - 10, f12k + 30], [0, 1], CL);
  /* Butter */
  const bDrop = interpolate(f, [fDrittel - 10, fDrittel + 6], [0, 1], { ...CL, easing: Easing.in(Easing.quad) });
  /* Olivenöl */
  const oA = tw(f, fHaelfte - 6, 24, Easing.bezier(0.2, 0.8, 0.2, 1)), oB = tw(f, f13 - 6, 24, Easing.bezier(0.2, 0.8, 0.2, 1));
  /* Kosten-Stücke */
  const parts: [string, number, string][] = [["Kakao", fTeil, C.choco2], ["Zucker", fZucker, C.white], ["Milch", fMilch2, C.blue], ["Verpackung", fVerp, C.mute], ["Energie", fEnergie, C.amber], ["Löhne", fLoehne, C.green]];
  return (
    <svg width={WW} height={WH} style={{ overflow: "visible" }}>
      <Defs />
      {/* ---- Rockets & Feathers ---- */}
      <g>
        <T x={X.rf} y={170} s={96} a="middle" o={tw(f, fRockets - 6, 14)}>Rockets <tspan fill={C.amber}>&amp;</tspan> Feathers</T>
        <T x={X.rf} y={232} s={36} a="middle" c={C.gray} o={tw(f, fRockets + 6, 14)} w={700}>Raketen und Federn</T>
        <g transform={`translate(${X.rf - 420} ${lerp(860, -200, rk)}) rotate(-90)`}><Rocket f={f} flame={tw(f, fRakete - 34, 8)} /></g>
        {Array.from({ length: 14 }).map((_, i) => { const k = ((f - fRakete + 30) / 3 - i); if (k < 0 || k > 14) return null; const y = lerp(860, -200, Math.max(0, rk - i * 0.05)); return <circle key={i} cx={X.rf - 420 + noise2D(`r${i}`, k / 10, 0) * 20} cy={y + 120 + i * 18} r={10 + i * 2} fill={C.gray} opacity={0.3 * (1 - i / 14)} />; })}
        <T x={X.rf - 420} y={960} s={44} a="middle" c={C.red} o={tw(f, fRakete - 10, 12)}>Preis steigt</T>
        <g transform={`translate(${X.rf + 420 + Math.sin(f / 16) * 50} ${feaY}) rotate(${Math.sin(f / 16 + 1) * 24}) scale(1.9)`} opacity={tw(f, fFeder - 24, 14)}><Feather /></g>
        <T x={X.rf + 420} y={960} s={44} a="middle" c={C.amber} o={tw(f, fFeder - 10, 12)}>Preis fällt</T>
      </g>
      {/* ---- Tankstellen ---- */}
      <g>
        <T x={X.ts} y={150} s={52} a="middle" o={tw(f, fForscher, 12)}>Studie: über 12.000 deutsche Tankstellen</T>
        {pumps.map((p, i) => {
          const on = wave > (p.c / 16) * 0.8 + p.d * 0.2 ? 1 : 0;
          return <g key={i} transform={`translate(${X.ts - 700 + p.c * 93} ${300 + p.r * 80}) scale(0.9)`} opacity={tw(f, fForscher + p.r * 2, 10)}><Pump on={on} /></g>;
        })}
        <Stamp f={f} at={fRegel - 4} x={X.ts} y={930} text="DIE REGEL" s={0.9} />
        <T x={X.ts} y={930} s={40} a="middle" c={C.gray} o={tw(f, fErgebnis, 10) * (1 - tw(f, fRegel - 6, 6))}>nicht die Ausnahme …</T>
      </g>
      {/* ---- Butter ---- */}
      <g>
        <T x={X.bu} y={150} s={56} a="middle" o={tw(f, fButter - 6, 12)}>Butter</T>
        <g transform={`translate(${X.bu - 360} 520)`} opacity={tw(f, fButter - 6, 14)}>
          <path d="M -170 40 L 120 40 L 190 -20 L -100 -20 Z" fill="#FFE08A" /><rect x={-170} y={40} width={290} height={120} fill="#F5CF63" /><path d="M 120 40 L 190 -20 L 190 100 L 120 160 Z" fill="#E0B84E" />
          <T x={-25} y={115} s={34} a="middle" c={C.deep}>BUTTER</T>
        </g>
        {/* Preisbalken fällt schnell */}
        <g opacity={tw(f, fMilch - 6, 12)}>
          <T x={X.bu + 120} y={300} s={34} c={C.gray}>Ladenpreis</T>
          <rect x={X.bu + 120} y={330} width={160} height={460} rx={14} fill="#24324A" />
          <rect x={X.bu + 120} y={330 + 460 * 0.31 * bDrop} width={160} height={460 * (1 - 0.31 * bDrop)} rx={14} fill={C.green} />
          <g transform={`translate(${X.bu + 420} ${560}) scale(${pop(f, fDrittel)})`}><T x={0} y={0} s={96} c={C.green}>−30 %</T><T x={0} y={50} s={30} c={C.gray} w={700}>ggü. Vorjahr</T></g>
          <T x={X.bu + 420} y={760} s={44} c={C.green} o={tw(f, fSchnell - 6, 12)}>fällt schnell ↓</T>
        </g>
      </g>
      {/* ---- Olivenöl ---- */}
      <g>
        <T x={X.ol} y={150} s={56} a="middle" o={tw(f, fOel - 6, 12)}>Olivenöl</T>
        <g transform={`translate(${X.ol - 560} 300)`} opacity={tw(f, fOel - 6, 14)}>
          <rect x={-22} y={0} width={44} height={60} rx={6} fill={C.mute} /><path d="M -60 70 Q -60 60 -40 60 L 40 60 Q 60 60 60 70 L 70 420 Q 70 450 40 450 L -40 450 Q -70 450 -70 420 Z" fill="#7A8A2E" opacity={0.9} />
          <rect x={-50} y={220} width={100} height={110} rx={10} fill={C.white} /><circle cx={0} cy={275} r={26} fill="#5E7A2E" />
        </g>
        {[["Erzeuger (Spanien)", 0.54, oA, "−54 %", C.green], ["Supermarkt (DE)", 0.10, oB, "−6 bis −13 %", C.red]].map(([l, d, g, txt, col], i) => (
          <g key={i} opacity={tw(f, (i ? fSuper : fErz) - 6, 12)}>
            <T x={X.ol - 280 + i * 420} y={300} s={34} c={C.gray}>{l as string}</T>
            <rect x={X.ol - 280 + i * 420} y={330} width={180} height={460} rx={14} fill="#24324A" />
            <rect x={X.ol - 280 + i * 420} y={330 + 460 * (d as number) * (g as number)} width={180} height={460 * (1 - (d as number) * (g as number))} rx={14} fill={col as string} />
            <T x={X.ol - 190 + i * 420} y={860} s={48} a="middle" c={col as string} o={g as number}>{txt as string}</T>
          </g>
        ))}
      </g>
      {/* ---- Hedging ---- */}
      <g>
        <T x={X.he} y={150} s={56} a="middle" o={tw(f, fErstens - 6, 12)}>1 · Im Voraus gekauft</T>
        {/* Kalender */}
        <g transform={`translate(${X.he - 520} 330)`} opacity={tw(f, fMonate - 8, 12)}>
          <rect x={-160} y={-40} width={320} height={300} rx={20} fill={C.white} /><rect x={-160} y={-40} width={320} height={70} rx={20} fill={C.red} />
          {Array.from({ length: 3 }).map((_, i) => { const flip = tw(f, fMonate + i * 8, 8); return <rect key={i} x={-160} y={30} width={320} height={230 * (1 - flip)} fill="#E6EAF0" stroke="#C9D3E2" />; })}
          <T x={0} y={180} s={64} a="middle" c={C.deep}>2025</T>
          <T x={0} y={330} s={34} a="middle" c={C.gray}>Monate im Voraus</T>
        </g>
        {/* Lager mit Säcken */}
        <g transform={`translate(${X.he + 100} 420)`} opacity={tw(f, fFest - 8, 12)}>
          {[[0, 0], [170, 0], [85, -120], [340, 0], [255, -120]].map(([x, y], i) => (
            <g key={i} transform={`translate(${x} ${y + 30 * (1 - tw(f, fFest - 8 + i * 3, 10, SPR))})`}>
              <path d="M -70 120 Q -80 0 -50 -20 L 50 -20 Q 80 0 70 120 Z" fill="#B48A5A" /><path d="M -50 -20 Q 0 -50 50 -20" stroke="#8A6A3A" strokeWidth={8} fill="none" />
              <T x={0} y={60} s={24} a="middle" c={C.deep}>KAKAO</T>
            </g>
          ))}
          <g transform="translate(170 230)"><rect x={-190} y={-34} width={380} height={68} rx={34} fill={C.red} /><T x={0} y={12} s={32} a="middle">fester Preis: hoch</T></g>
        </g>
        <g opacity={tw(f, fLindt - 6, 12)} transform={`translate(${X.he - 300} 760)`}>
          <rect x={0} y={0} width={900} height={150} rx={24} fill={C.deep} opacity={0.92} />
          <T x={40} y={60} s={36} c={C.amber}>Lindt-Chef (sinngemäß):</T>
          <T x={40} y={112} s={40}>„Vom Preissturz kaum profitiert.“</T>
        </g>
      </g>
      {/* ---- Kosten ---- */}
      <g>
        <T x={X.ko} y={150} s={56} a="middle" o={tw(f, fZweit - 6, 12)}>2 · Kakao ist nur ein Teil</T>
        {parts.map(([l, fa, col], i) => {
          const p = tw(f, fa - 6, 14, SPR);
          const x = X.ko - 700 + i * 240;
          const hot = l === "Energie" ? tw(f, fTeurer - 6, 12) : 0;
          return (
            <g key={i} transform={`translate(${x} ${lerp(620, 470, p)})`} opacity={p}>
              <rect x={0} y={0} width={210} height={200} rx={18} fill={l === "Kakao" ? C.choco : "#1B2D49"} stroke={hot > 0.5 ? C.red : col} strokeWidth={6} />
              <circle cx={105} cy={80} r={44} fill={col} opacity={0.85} />
              <T x={105} y={170} s={30} a="middle">{l}</T>
              {hot > 0 && <g opacity={hot}><T x={105} y={-24} s={44} a="middle" c={C.red}>+15 %</T></g>}
            </g>
          );
        })}
        <T x={X.ko} y={820} s={40} a="middle" c={C.gray} o={tw(f, fTeurer - 6, 12)}>Energie im Sept. 2026: +14,9 % ggü. Vorjahr</T>
      </g>
      {/* ---- Faustregel ---- */}
      <g>
        <T x={X.fr} y={150} s={56} a="middle" o={tw(f, fFaust - 10, 12)}>Faustregel der Verbraucherzentrale</T>
        <g opacity={tw(f, fVerd - 6, 12)}>
          <rect x={X.fr - 760} y={230} width={1520} height={120} rx={24} fill={C.deep} opacity={0.9} />
          <T x={X.fr - 720} y={310} s={52}>Kakao <tspan fill={C.red}>×2</tspan>  →  Tafel <tspan fill={C.amber}>+10 Cent</tspan></T>
        </g>
        {/* Münzsäulen */}
        {([["×2", 1, fZehn, C.amber, "+10 ct"], ["×4,8", 4, fVierzig, C.amber, "≈ +40 ct"], ["heute ½", 5, fFuenfzig, C.red, "+50 ct"]] as const).map(([l, n, fa, col, txt], i) => {
          const x = X.fr - 600 + i * 450;
          return (
            <g key={i} opacity={tw(f, fa - 8, 12)}>
              {Array.from({ length: n }).map((_, k) => {
                const d = tw(f, fa - 8 + k * 4, 10, Easing.bezier(0.3, 1.4, 0.6, 1));
                return <g key={k} transform={`translate(${x} ${lerp(200, 860 - k * 70, d)})`}><Coin r={56} label="10" col={col} /></g>;
              })}
              <T x={x} y={960} s={40} a="middle" c={col}>{txt}</T>
              <T x={x} y={1010} s={30} a="middle" c={C.gray} w={700}>Kakao {l}</T>
            </g>
          );
        })}
        <g opacity={tw(f, fGeblieben - 6, 12)} transform={`translate(${X.fr + 690} 560)`}>
          <rect x={-150} y={-120} width={300} height={260} rx={20} fill={C.deep} opacity={0.92} />
          <T x={0} y={-60} s={36} a="middle" c={C.amber}>Milka</T>
          <T x={0} y={0} s={40} a="middle" c={C.red}>+50 ct</T>
          <T x={0} y={60} s={40} a="middle" c={C.red} o={tw(f, fGramm - 6, 10)}>−10 g</T>
          <T x={0} y={110} s={28} a="middle" c={C.gray} w={700} o={tw(f, fGramm, 10)}>beides geblieben</T>
        </g>
      </g>
    </svg>
  );
};

export const Ch3: React.FC = () => {
  const f = useCurrentFrame();
  const c = camAt(KEYS, f);
  const sfx: Sfx[] = [[fRockets - 6, "pop", 0.5], [fRakete - 34, "whoosh", 0.7], [fFeder - 20, "marimba", 0.4], [fForscher - 4, "whoosh", 0.6], [f12k - 10, "coins", 0.4], [fRegel - 4, "stamp", 0.8],
    [fAber - 4, "whoosh", 0.6], [fDrittel - 10, "whoosh", 0.5], [fDrittel, "pop", 0.5], [fOel - 6, "whoosh", 0.6], [fHaelfte - 6, "pop", 0.4], [f13 - 6, "pop", 0.4],
    [fWarum - 6, "whoosh", 0.6], [fMonate - 8, "paper", 0.5], [fFest - 8, "coins", 0.3], [fLindt - 6, "pop", 0.4], [fZweit - 6, "whoosh", 0.6], [fTeil - 6, "pop", 0.4], [fZucker - 6, "pop", 0.3], [fMilch2 - 6, "pop", 0.3], [fVerp - 6, "pop", 0.3], [fEnergie - 6, "pop", 0.3], [fLoehne - 6, "pop", 0.3], [fTeurer - 6, "ding", 0.3],
    [fFaust - 12, "whoosh", 0.6], [fZehn - 8, "coin", 0.6], [fVierzig - 8, "coins", 0.6], [fFuenfzig - 8, "coins", 0.6], [fGramm - 6, "stamp", 0.5]];
  return (
    <ChapterShell ch={3} sfx={sfx} blur={BLUR} overlay={<ChapterLabel f={f} n={3} title="Rakete und Feder" at={4} dur={60} />}>
      <Layer cam={c} p={0.3} w={WW} h={WH}><Stripes w={WW} h={WH} /></Layer>
      <Layer cam={c} p={1} w={WW} h={WH}><Main f={f} /></Layer>
    </ChapterShell>
  );
};
