import React from "react";
import { interpolate } from "remotion";
import { C } from "../brand";
import { CL, IO, SPR, lerp } from "./core";
export type FigProps = {
  f: number; x: number; y: number; s?: number; flip?: boolean;
  shirt?: string; sleeve?: string; skin?: string; hair?: string; hairStyle?: 0 | 1 | 2;
  shockAt?: number; reach?: [number, number, number, number]; look?: number; blinkSeed?: number;
  smileAt?: number; blowAt?: number; angryAt?: number; pointAt?: number;
};
/** Flache Groschenfall-Figur mit Gelenken, Blinzeln und Mimik */
export const Figure: React.FC<FigProps> = (p) => {
  const { f, x, y, s = 1, flip, shirt = C.blue, sleeve = "#7C9BEA", skin = "#E8B98F", hair = "#2B2140", hairStyle = 0, look = -5, blinkSeed = 0 } = p;
  const sp = (a?: number) => (a === undefined ? 0 : interpolate(f, [a, a + 10], [0, 1], { ...CL, easing: SPR }));
  const shock = sp(p.shockAt), smile = sp(p.smileAt), blow = sp(p.blowAt), angry = sp(p.angryAt), point = sp(p.pointAt);
  const jump = p.shockAt !== undefined && f > p.shockAt ? -18 * Math.sin(Math.min(1, (f - p.shockAt) / 12) * Math.PI) : 0;
  const bt = (f + blinkSeed * 37) % 110;
  const blink = bt > 2 && bt < 7 ? 0.12 : 1;
  const r = p.reach ? interpolate(f, p.reach, [0, 1, 1, 0], { ...CL, easing: IO }) : 0;
  const breathe = Math.sin((f + blinkSeed * 13) / 18) * 2;
  const eyeS = 1 + 0.45 * shock;
  const mouth = blow > 0.5
    ? <ellipse cx={0} cy={-4} rx={5} ry={6} fill="#5A2A24" />
    : shock > 0.5 ? <ellipse cx={0} cy={-2} rx={9 * shock} ry={13 * shock} fill="#5A2A24" />
    : angry > 0.5 ? <path d="M -14 0 Q 0 -8 14 0" stroke="#8A4B3A" strokeWidth={5} fill="none" strokeLinecap="round" />
    : <path d={`M -14 -6 Q 0 ${2 + 8 * smile} 14 -6`} stroke="#8A4B3A" strokeWidth={5} fill="none" strokeLinecap="round" />;
  const cheek = 1 + 0.5 * blow;
  return (
    <g transform={`translate(${x} ${y + (jump + breathe) * s}) scale(${flip ? -s : s} ${s})`}>
      <path d="M -70 120 Q -72 40 0 34 Q 72 40 70 120 L 74 330 L -74 330 Z" fill={shirt} />
      <path d="M -16 34 L 0 66 L 16 34 Z" fill={C.white} opacity={0.9} />
      <g transform={`translate(-58 70) rotate(${lerp(14, 62, r) - 40 * shock + 95 * point})`}>
        <rect x={-14} y={0} width={28} height={92} rx={14} fill={shirt} />
        <g transform={`translate(0 84) rotate(${lerp(10, 40, r) + 60 * shock - 10 * point})`}>
          <rect x={-12} y={0} width={24} height={84} rx={12} fill={sleeve} />
          <circle cx={0} cy={90} r={16} fill={skin} />
        </g>
      </g>
      <g transform={`translate(60 70) rotate(${-10 + 20 * angry})`}>
        <rect x={-14} y={0} width={28} height={150} rx={14} fill={sleeve} />
      </g>
      <g transform={`rotate(${-4 * shock + Math.sin(f / 30) * 1.5})`}>
        <rect x={-14} y={8} width={28} height={30} fill="#D9A77B" />
        <circle cx={0} cy={-34} r={54} fill={skin} />
        {hairStyle === 0 && <path d="M -54 -40 Q -50 -98 4 -94 Q 58 -92 54 -36 Q 30 -70 -54 -40 Z" fill={hair} />}
        {hairStyle === 1 && <path d="M -58 -20 Q -66 -100 0 -96 Q 66 -100 58 -20 Q 60 30 44 60 L 40 -30 Q 0 -70 -40 -30 L -44 60 Q -60 30 -58 -20 Z" fill={hair} />}
        {hairStyle === 2 && <path d="M -50 -54 Q -20 -92 30 -84 Q 56 -70 52 -48 Q 10 -66 -50 -54 Z" fill={hair} />}
        {[-20, 20].map((ex, k) => (
          <g key={k} transform={`translate(${ex} -30) scale(${eyeS} ${eyeS * blink})`}>
            <ellipse rx={10} ry={12} fill={C.white} />
            <circle cx={look} cy={1} r={5.5} fill={C.deep} />
          </g>
        ))}
        {[-20, 20].map((ex, k) => {
          const a = angry * (k ? -1 : 1) * 6;
          return <path key={k} d={`M ${ex - 12} ${-50 - 9 * shock + a} Q ${ex} ${-58 - 12 * shock} ${ex + 12} ${-50 - 9 * shock - a}`} stroke={hair} strokeWidth={5} fill="none" strokeLinecap="round" />;
        })}
        {mouth}
        <ellipse cx={-34} cy={-12} rx={9 * cheek} ry={5 * cheek} fill={C.red} opacity={0.18 + 0.2 * shock + 0.2 * blow} />
        <ellipse cx={34} cy={-12} rx={9 * cheek} ry={5 * cheek} fill={C.red} opacity={0.18 + 0.2 * shock + 0.2 * blow} />
      </g>
    </g>
  );
};
