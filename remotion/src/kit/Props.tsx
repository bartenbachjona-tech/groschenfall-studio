import React from "react";
import { Easing, interpolate } from "remotion";
import { noise2D } from "@remotion/noise";
import { C, FONT } from "../brand";
import { CL, SPR, IO, tw } from "./core";

export const Defs: React.FC = () => (
  <defs>
    <linearGradient id="shine" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#FFFFFF" stopOpacity={0.16} /><stop offset="0.45" stopColor="#FFFFFF" stopOpacity={0} /><stop offset="1" stopColor="#000000" stopOpacity={0.2} />
    </linearGradient>
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="10" /></filter>
    <filter id="soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4" /></filter>
  </defs>
);

export const T: React.FC<{ x: number; y: number; s: number; c?: string; w?: number; a?: "start" | "middle" | "end"; o?: number; children: React.ReactNode }> = ({ x, y, s, c = C.white, w = 800, a = "start", o = 1, children }) => (
  <text x={x} y={y} fontSize={s} fontFamily={FONT} fontWeight={w} fill={c} textAnchor={a} opacity={o}>{children}</text>
);

/** Rakete (Nase nach +x) */
export const Rocket: React.FC<{ f: number; flame: number }> = ({ f, flame }) => {
  const fl = 0.75 + 0.25 * noise2D("fl", f / 2.5, 0);
  return (
    <g>
      {flame > 0.01 && (
        <g opacity={flame} transform={`translate(-66 0) scale(${fl * (0.8 + 0.6 * flame)} ${0.85 + 0.15 * fl})`}>
          <ellipse cx={-38} cy={0} rx={48} ry={17} fill={C.red} opacity={0.85} />
          <ellipse cx={-26} cy={0} rx={32} ry={11} fill={C.amber} />
          <ellipse cx={-14} cy={0} rx={16} ry={6} fill="#FFF3D6" />
        </g>
      )}
      <path d="M -60 -22 L 30 -22 Q 72 -20 86 0 Q 72 20 30 22 L -60 22 Z" fill={C.white} />
      <path d="M 30 -22 Q 72 -20 86 0 Q 72 20 30 22 Z" fill={C.red} />
      <path d="M -60 -22 L -40 -22 L -70 -50 L -84 -50 Z" fill={C.red} />
      <path d="M -60 22 L -40 22 L -70 50 L -84 50 Z" fill={C.red} />
      <rect x={-66} y={-14} width={10} height={28} rx={3} fill={C.mute} />
      <circle cx={6} cy={0} r={11} fill={C.blue} stroke={C.deep} strokeOpacity={0.35} strokeWidth={4} />
      <path d="M -60 -22 L 30 -22 Q 50 -21 62 -14 L -60 -14 Z" fill="#FFFFFF" opacity={0.35} />
    </g>
  );
};

export const Feather: React.FC = () => (
  <g>
    <path d="M 0 90 Q 4 0 -2 -110" stroke={C.gray} strokeWidth={4} fill="none" strokeLinecap="round" />
    <path d="M -2 -110 C -60 -70 -66 10 -6 70 C -30 20 -26 -50 -2 -110 Z" fill={C.white} opacity={0.95} />
    <path d="M -2 -110 C 54 -64 58 6 4 66 C 24 16 22 -54 -2 -110 Z" fill={C.gray} />
    {[-70, -40, -10, 20].map((y, i) => <path key={i} d={`M -2 ${y} L -38 ${y + 26}`} stroke={C.mute} strokeOpacity={0.35} strokeWidth={2} />)}
  </g>
);

/** Generische Tafel. wrap=Verpackungsfarbe, label=Sortentext (KEINE echten Markenzeichen). */
export const Bar: React.FC<{ f: number; x: number; y: number; w?: number; h?: number; wrap: string; accent?: string; label?: string; sub?: string;
  grams?: [string, string]; shrinkAt?: number; shrinkTo?: number; xrayAt?: number; cols?: number }> = (p) => {
  const { f, x, y, w = 420, h = 190, wrap, accent = C.amber, label = "SCHOKOLADE", sub = "Vollmilch", cols = 6 } = p;
  const xr = p.xrayAt === undefined ? 0 : tw(f, p.xrayAt, 22, IO);
  const sh = p.shrinkAt === undefined ? 1 : interpolate(f, [p.shrinkAt, p.shrinkAt + 24], [1, p.shrinkTo ?? 0.9], { ...CL, easing: SPR });
  const g2 = p.shrinkAt === undefined ? 0 : tw(f, p.shrinkAt + 8, 10);
  const iw0 = w - 24, iw = iw0 * sh;
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-10} y={h - 4} width={w + 20} height={16} rx={8} fill={C.deep} opacity={0.35} />
      <g opacity={0.15 + 0.85 * xr}>
        <rect x={12} y={12} width={iw0} height={h - 24} rx={10} fill="none" stroke={C.red} strokeWidth={3} strokeDasharray="10 8" opacity={g2 * xr} />
        <rect x={12} y={12} width={iw} height={h - 24} rx={10} fill={C.choco} />
        {Array.from({ length: cols * 3 }).map((_, k) => {
          const c = k % cols, r = Math.floor(k / cols), cw = (iw - 14) / cols, rh = (h - 38) / 3;
          return <rect key={k} x={19 + c * cw} y={19 + r * rh} width={cw - 7} height={rh - 7} rx={7} fill={C.choco2} />;
        })}
      </g>
      <g opacity={1 - 0.8 * xr}>
        <rect x={0} y={0} width={w} height={h} rx={14} fill={wrap} />
        <rect x={0} y={0} width={w} height={h} rx={14} fill="url(#shine)" />
        <rect x={0} y={0} width={46} height={h} rx={14} fill={accent} />
        <rect x={30} y={0} width={16} height={h} fill={accent} />
        <text x={74} y={h * 0.44} fontFamily={FONT} fontWeight={800} fontSize={w * 0.105} fill={C.white} letterSpacing={1}>{label}</text>
        <text x={76} y={h * 0.64} fontFamily={FONT} fontWeight={600} fontSize={w * 0.057} fill={C.gray}>{sub}</text>
      </g>
      {p.grams && (
        <g transform={`translate(${w - 60} ${h * 0.7})`}>
          <circle r={40} fill={accent} />
          <text y={10} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={27} fill={C.deep} opacity={1 - g2}>{p.grams[0]}</text>
          <text y={10} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={30} fill={C.red} opacity={g2}>{p.grams[1]}</text>
        </g>
      )}
    </g>
  );
};

/** Preisschild, hängt an (x,y). Klappt bei flipAt von a auf b um. */
export const PriceTag: React.FC<{ f: number; x: number; y: number; a: string; b?: string; flipAt?: number; bColor?: string; sticker?: string; stickerAt?: number; s?: number; hang?: boolean }> = (p) => {
  const { f, x, y, a, b, flipAt = 1e9, bColor = C.red, s = 1, hang = true } = p;
  const fA = interpolate(f, [flipAt - 10, flipAt], [1, 0], { ...CL, easing: Easing.in(Easing.quad) });
  const fB = interpolate(f, [flipAt, flipAt + 12], [0, 1], { ...CL, easing: Easing.out(Easing.back(2)) });
  const after = b !== undefined && f >= flipAt;
  const sy = b === undefined ? 1 : f < flipAt ? fA : fB;
  const swing = f > flipAt ? Math.sin((f - flipAt) / 4.2) * 16 * Math.exp(-(f - flipAt) / 22) : Math.sin(f / 20) * 1.5;
  const st = p.stickerAt === undefined ? 0 : interpolate(f, [p.stickerAt, p.stickerAt + 12], [0, 1], { ...CL, easing: SPR });
  return (
    <g transform={`translate(${x} ${y}) scale(${s}) rotate(${hang ? swing : 0})`}>
      {hang && <line x1={0} y1={0} x2={0} y2={18} stroke={C.mute} strokeWidth={4} />}
      <g transform={`translate(0 18) scale(1 ${Math.max(0.02, sy)})`}>
        <rect x={-104} y={0} width={208} height={104} rx={12} fill={C.white} />
        <circle cx={0} cy={14} r={6} fill={C.deep} opacity={0.5} />
        <text x={0} y={80} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={52} fill={after ? bColor : C.deep}>{after ? b : a}</text>
      </g>
      {p.sticker && (
        <g transform={`translate(98 22) scale(${st}) rotate(-12)`}>
          <circle r={38} fill={C.red} />
          <text y={9} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={24} fill={C.white}>{p.sticker}</text>
        </g>
      )}
    </g>
  );
};

/** Datenkarte mit Markenname (nur Text) und Zeilen */
export const DataCard: React.FC<{ f: number; x: number; y: number; at: number; title: string; lines: [string, string?][]; w?: number; color?: string; out?: number }> = ({ f, x, y, at, title, lines, w = 520, color = C.amber, out }) => {
  const p = interpolate(f, [at, at + 14], [0, 1], { ...CL, easing: SPR });
  const o = out === undefined ? 1 : 1 - tw(f, out, 12, IO);
  const H = 96 + lines.length * 62;
  return (
    <g transform={`translate(${x} ${y}) scale(${0.85 + 0.15 * p})`} opacity={p * o}>
      <rect x={0} y={0} width={w} height={H} rx={24} fill={C.deep} opacity={0.92} />
      <rect x={0} y={0} width={10} height={H} rx={5} fill={color} />
      <text x={36} y={62} fontFamily={FONT} fontWeight={800} fontSize={46} fill={color}>{title}</text>
      {lines.map(([t, c], i) => {
        const q = tw(f, at + 10 + i * 8, 12);
        return <text key={i} x={36} y={124 + i * 62} fontFamily={FONT} fontWeight={700} fontSize={36} fill={c ?? C.white} opacity={q}>{t}</text>;
      })}
    </g>
  );
};

/** Münze (Euro-Optik, generisch) */
export const Coin: React.FC<{ r: number; label?: string; col?: string }> = ({ r, label, col = C.amber }) => (
  <g>
    <circle r={r} fill="#B9822F" transform={`translate(0 ${r * 0.08})`} />
    <circle r={r} fill={col} />
    <circle r={r * 0.72} fill="none" stroke={C.deep} strokeOpacity={0.25} strokeWidth={Math.max(2, r * 0.08)} />
    {label && <text y={r * 0.22} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={r * 0.62} fill={C.deep}>{label}</text>}
  </g>
);

/** Stempel */
export const Stamp: React.FC<{ f: number; at: number; x: number; y: number; text: string; s?: number; col?: string; rot?: number }> = ({ f, at, x, y, text, s = 1, col = C.red, rot = -8 }) => {
  const k = interpolate(f, [at, at + 9], [0, 1], CL);
  if (f < at) return null;
  const w = text.length * 52 * s + 80;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s * (3 - 2 * Easing.out(Easing.cubic)(k))})`} opacity={k}>
      <rect x={-w / 2 / s} y={-70} width={w / s} height={124} rx={18} fill="none" stroke={col} strokeWidth={10} />
      <text y={22} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={86} fill={col}>{text}</text>
    </g>
  );
};
