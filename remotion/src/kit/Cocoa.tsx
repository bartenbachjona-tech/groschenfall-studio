import React from "react";
import { Easing, interpolate } from "remotion";
import { getLength, getPointAtLength, getTangentAtLength } from "@remotion/paths";
import { noise2D } from "@remotion/noise";
import { C, FONT } from "../brand";
import { CL, tw } from "./core";
import { Rocket } from "./Props";

/* Kakao NY $/t, Monatsindex ab Jan 2023 (vereinfacht nach ICE-Verlauf) */
export const COCOA: [number, number][] = [[0, 2700], [6, 3400], [12, 4300], [15, 10200], [16, 8200], [18, 7400], [20, 8300], [23, 12900], [26, 8600], [29, 8900], [32, 6900], [34, 6000], [36, 3900], [37, 3400], [39, 2850], [41, 3300], [43, 4300], [44, 5650], [45, 5650]];
/* Tafelschokolade, Preisniveau 2020 = 100 (Destatis-Eckwerte, geglättet) */
export const CHOC: [number, number][] = [[0, 122], [8, 126], [14, 132], [19, 142], [24, 158], [28, 168], [32, 175], [36, 176], [39, 175], [45, 175]];
export const MX = (m: number) => 230 + (m / 45) * 1450;
export const PY = (p: number) => 2000 - (p / 13000) * 1000;
export const IY = (i: number) => 1880 - (i - 100) * 10;
export const smooth = (pts: [number, number][]) => {
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${c1[0]} ${c1[1]} ${c2[0]} ${c2[1]} ${p2[0]} ${p2[1]}`;
  }
  return d;
};
export const COCOA_D = smooth(COCOA.map(([m, p]) => [MX(m), PY(p)]));
export const CHOC_D = smooth(CHOC.map(([m, i]) => [MX(m), IY(i)]));
let _L: { L: number; at: (m: number) => number } | null = null;
/** Länge entlang der Kakaokurve bis Monat m */
export const cocoaLen = () => {
  if (_L) return _L;
  const L = getLength(COCOA_D);
  const at = (m: number) => {
    const x = MX(m); let lo = 0, hi = L;
    for (let k = 0; k < 40; k++) { const mid = (lo + hi) / 2; if (getPointAtLength(COCOA_D, mid).x < x) lo = mid; else hi = mid; }
    return lo;
  };
  _L = { L, at }; return _L;
};
export const pt = (s: number) => getPointAtLength(COCOA_D, Math.max(0.01, s));
export const tg = (s: number) => getTangentAtLength(COCOA_D, Math.max(0.01, s));

/** Raketen-Fahrplan: [Frame, Monat]-Stützpunkte; zwischen Paaren wird interpoliert */
export type Plan = { f: number; m: number; e?: (t: number) => number }[];
export const rocketS = (f: number, plan: Plan) => {
  const { at } = cocoaLen();
  if (f <= plan[0].f) return at(plan[0].m);
  for (let i = 0; i < plan.length - 1; i++) {
    const a = plan[i], b = plan[i + 1];
    if (f <= b.f) return interpolate(f, [a.f, b.f], [at(a.m), at(b.m)], { ...CL, easing: b.e ?? Easing.bezier(0.45, 0, 0.8, 0.9) });
  }
  return at(plan[plan.length - 1].m);
};

export const ChartAxes: React.FC<{ o: number; rightLabel?: boolean }> = ({ o, rightLabel = true }) => (
  <g opacity={o}>
    {[0, 4000, 8000, 12000].map((p) => (
      <g key={p}>
        <line x1={MX(0)} x2={MX(45)} y1={PY(p)} y2={PY(p)} stroke={C.line} strokeWidth={3} strokeDasharray={p ? "4 14" : undefined} />
        <text x={MX(0) - 24} y={PY(p) + 14} textAnchor="end" fontFamily={FONT} fontWeight={700} fontSize={44} fill={C.mute}>{p ? `${p / 1000}k` : "0"}</text>
      </g>
    ))}
    {[["2023", 0], ["2024", 12], ["2025", 24], ["2026", 36]].map(([l, m]) => (
      <text key={l as string} x={MX(m as number)} y={2075} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={44} fill={C.mute}>{l}</text>
    ))}
    <text x={MX(0) + 40} y={PY(12000) - 30} fontFamily={FONT} fontWeight={700} fontSize={44} fill={C.mute}>Kakao, $ pro Tonne</text>
  </g>
);

/** Kakao-Linie bis s, mit Glow */
export const CocoaLine: React.FC<{ s: number; dashedFrom?: number }> = ({ s }) => (
  <>
    <path d={COCOA_D} stroke={C.red} strokeWidth={22} fill="none" strokeLinecap="round" strokeDasharray={`${s} 99999`} filter="url(#glow)" opacity={0.5} />
    <path d={COCOA_D} stroke={C.red} strokeWidth={10} fill="none" strokeLinecap="round" strokeDasharray={`${s} 99999`} />
  </>
);

/** Rakete auf der Kurve inkl. Rauch. climbEnd: Frame, ab dem der Antrieb stottert; fallAt: Absturzbeginn */
export const RocketOnCurve: React.FC<{ f: number; plan: Plan; startF: number; climbEnd: number; fallAt: number; fallEnd: number; label?: string; hideAt?: number }> = ({ f, plan, startF, climbEnd, fallAt, fallEnd, label = "Kakao", hideAt = 1e9 }) => {
  if (f < startF) return null;
  const s = rocketS(f, plan); const p = pt(s); const t = tg(s);
  let ang = (Math.atan2(t.y, t.x) * 180) / Math.PI;
  if (f >= climbEnd && f < fallAt) ang += 6 * Math.sin(f * 1.7);
  if (f >= fallAt) ang += 25 * Math.sin((f - fallAt) / 6) * Math.exp(-(f - fallAt) / 90);
  const flame = f < climbEnd ? tw(f, startF, 10) : f < fallAt ? (noise2D("sp", f / 1.5, 0) > 0 ? 0.8 : 0.05) : interpolate(f, [fallAt, fallAt + 8], [0.6, 0], CL);
  const hide = 1 - tw(f, hideAt, 15);
  const puffs: JSX.Element[] = [];
  for (let sf = startF + 1; sf <= Math.min(f, fallAt - 5); sf += 3) {
    const age = f - sf; if (age > 46) continue;
    const ps = rocketS(sf, plan); const q = pt(ps); const tq = tg(ps); const k = age / 46;
    puffs.push(<circle key={sf} cx={q.x - tq.x * 80 + noise2D(`sx${sf}`, k, 0) * 18} cy={q.y - tq.y * 80 - k * 30} r={8 + 30 * k} fill={C.gray} opacity={0.42 * (1 - k)} />);
  }
  for (let sf = fallAt + 2; sf <= Math.min(f, fallEnd); sf += 4) {
    const age = f - sf; if (age > 60) continue;
    const q = pt(rocketS(sf, plan)); const k = age / 60;
    puffs.push(<circle key={`d${sf}`} cx={q.x + noise2D(`dx${sf}`, k, 0) * 20} cy={q.y - 20 - k * 70} r={10 + 26 * k} fill="#3A4560" opacity={0.6 * (1 - k)} />);
  }
  return (
    <g opacity={hide}>
      {puffs}
      <g transform={`translate(${p.x} ${p.y}) rotate(${ang})`}><Rocket f={f} flame={flame} /></g>
      <g transform={`translate(${p.x} ${p.y - 92})`} opacity={tw(f, startF + 10, 15) * (1 - tw(f, fallEnd, 20))}>
        <rect x={-70} y={-34} width={140} height={52} rx={26} fill={C.deep} opacity={0.85} />
        <text y={2} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={30} fill={C.white}>{label}</text>
      </g>
    </g>
  );
};
