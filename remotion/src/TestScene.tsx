import React, { useMemo } from "react";
import {
  AbsoluteFill, Easing, Img, interpolate, random, Sequence, staticFile,
  useCurrentFrame, useVideoConfig,
} from "remotion";
import { Audio } from "@remotion/media";
import { CameraMotionBlur } from "@remotion/motion-blur";
import { getLength, getPointAtLength, getTangentAtLength } from "@remotion/paths";
import { noise2D } from "@remotion/noise";
import { C, FONT } from "./brand";

/* ---------- helpers ---------- */
const CL = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const IO = Easing.bezier(0.65, 0, 0.35, 1);
const OUT = Easing.bezier(0.16, 1, 0.3, 1);
const SPR = Easing.spring({ damping: 12 });
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const tw = (f: number, a: number, d: number, e = OUT) => interpolate(f, [a, a + d], [0, 1], { ...CL, easing: e });

/* ---------- Daten: Kakao $/t (vereinfacht), Schokoladen-Index ---------- */
const COCOA: [number, number][] = [[0, 2600], [6, 3400], [12, 4300], [15, 9800], [16, 8200], [18, 7400], [20, 8300], [23, 12500], [26, 8600], [29, 8900], [32, 6900], [34, 6000], [36, 4900], [37, 3400]];
const CHOC: [number, number][] = [[0, 100], [8, 102], [14, 106], [19, 113], [24, 124], [28, 133], [32, 141], [34, 145], [37, 144]];
const MX = (m: number) => 230 + (m / 37) * 1450;
const PY = (p: number) => 2000 - (p / 13000) * 1000;
const IY = (i: number) => 1880 - (i - 100) * 13;
const smooth = (pts: [number, number][]) => {
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${c1[0]} ${c1[1]} ${c2[0]} ${c2[1]} ${p2[0]} ${p2[1]}`;
  }
  return d;
};
const COCOA_D = smooth(COCOA.map(([m, p]) => [MX(m), PY(p)]));
const CHOC_D = smooth(CHOC.map(([m, i]) => [MX(m), IY(i)]));

/* Rakete: Fortschritt entlang der Kakao-Kurve */

const rocketS = (f: number, L: number, LP: number) => {
  if (f < 205) return 0;
  if (f < 380) return interpolate(f, [205, 380], [0, LP], { ...CL, easing: Easing.bezier(0.45, 0, 0.8, 0.9) });
  if (f < 410) return LP;
  return interpolate(f, [410, 565], [LP, L], { ...CL, easing: Easing.bezier(0.55, 0, 0.95, 0.75) });
};

/* Kamera-Keyframes: Weltpunkt (x,y), Zoom z, Easing ins Segment */
type K = { f: number; x: number; y: number; z: number; e?: (t: number) => number };
const CAM: K[] = [
  { f: 0, x: 1000, y: 2690, z: 2.05 },
  { f: 140, x: 975, y: 2700, z: 2.3, e: Easing.bezier(0.3, 0, 0.7, 1) },
  { f: 182, x: 960, y: 1450, z: 1.05, e: Easing.bezier(0.7, 0, 0.2, 1) },
  { f: 400, x: 1010, y: 1610, z: 0.74, e: IO },
  { f: 600, x: 1030, y: 1615, z: 0.72, e: IO },
  { f: 640, x: 960, y: 2735, z: 2.0, e: Easing.bezier(0.7, 0, 0.25, 1) },
  { f: 750, x: 960, y: 2740, z: 2.12, e: IO },
];
let _LL: { L: number; LP: number } | null = null;
const cocoaLen = () => {
  if (_LL) return _LL;
  const L = getLength(COCOA_D); const peakX = MX(23); let lo = 0, hi = L;
  for (let k = 0; k < 40; k++) { const m = (lo + hi) / 2; if (getPointAtLength(COCOA_D, m).x < peakX) lo = m; else hi = m; }
  _LL = { L, LP: lo }; return _LL;
};
const camBase = (f: number) => {
  let i = 0;
  while (i < CAM.length - 2 && f > CAM[i + 1].f) i++;
  const a = CAM[i], b = CAM[i + 1];
  const t = interpolate(f, [a.f, b.f], [0, 1], { ...CL, easing: b.e ?? IO });
  // kleines Kamera-"Atmen" für Lebendigkeit
  const bx = noise2D("cx", f / 90, 0) * 6, by = noise2D("cy", 0, f / 90) * 5;
  return { x: lerp(a.x, b.x, t) + bx, y: lerp(a.y, b.y, t) + by, z: lerp(a.z, b.z, t) };
};
/* Verfolgungskamera: hängt der Rakete mit Verzögerung hinterher */
const follow = (f: number) => {
  const { L, LP } = cocoaLen();
  const lag = 9; let x = 0, y = 0;
  for (let k = 0; k < lag; k++) { const p = getPointAtLength(COCOA_D, Math.max(0.01, rocketS(f - k * 2, L, LP))); x += p.x; y += p.y; }
  return { x: x / lag + 120, y: y / lag - 40, z: 1.2 };
};
const cam = (f: number) => {
  const b = camBase(f);
  const w = interpolate(f, [176, 200, 360, 400], [0, 1, 1, 0], { ...CL, easing: IO });
  if (w <= 0) return b;
  const t = follow(f);
  return { x: lerp(b.x, t.x, w), y: lerp(b.y, t.y, w), z: lerp(b.z, t.z, w) };
};
const layerStyle = (f: number, p: number, blur = 0): React.CSSProperties => {
  const c = cam(f);
  const z = 1 + (c.z - 1) * p, x = 960 + (c.x - 960) * p, y = 1620 + (c.y - 1620) * p;
  return {
    position: "absolute", left: 0, top: 0, width: 1920, height: 3240, transformOrigin: "0 0",
    transform: `translate(${960 - x * z}px, ${540 - y * z}px) scale(${z})`,
    filter: blur ? `blur(${blur}px)` : undefined,
  };
};

/* ---------- Bausteine ---------- */
const Rocket: React.FC<{ f: number; flame: number }> = ({ f, flame }) => {
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

const Feather: React.FC = () => (
  <g>
    <path d="M 0 90 Q 4 0 -2 -110" stroke={C.gray} strokeWidth={4} fill="none" strokeLinecap="round" />
    <path d="M -2 -110 C -60 -70 -66 10 -6 70 C -30 20 -26 -50 -2 -110 Z" fill={C.white} opacity={0.95} />
    <path d="M -2 -110 C 54 -64 58 6 4 66 C 24 16 22 -54 -2 -110 Z" fill={C.gray} />
    {[-70, -40, -10, 20].map((y, i) => (
      <path key={i} d={`M -2 ${y} L -38 ${y + 26}`} stroke={C.mute} strokeOpacity={0.35} strokeWidth={2} />
    ))}
  </g>
);

const ChocoBar: React.FC<{ f: number }> = ({ f }) => {
  // Röntgen ab 640, Schrumpfen ab 676
  const xr = tw(f, 640, 22, IO);
  const sh = interpolate(f, [676, 700], [1, 0.9], { ...CL, easing: SPR });
  const g90 = tw(f, 684, 10);
  const W = 420, H = 190, iw = 396 * sh;
  return (
    <g transform="translate(750 2620)">
      <rect x={-10} y={H - 4} width={W + 20} height={16} rx={8} fill={C.deep} opacity={0.35} />
      {/* echte Tafel innen */}
      <g opacity={0.15 + 0.85 * xr}>
        <rect x={12} y={12} width={396} height={H - 24} rx={10} fill="none" stroke={C.red} strokeWidth={3} strokeDasharray="10 8" opacity={g90} />
        <g>
          <rect x={12} y={12} width={iw} height={H - 24} rx={10} fill={C.choco} />
          {Array.from({ length: 18 }).map((_, k) => {
            const c = k % 6, r = Math.floor(k / 6), cw = (iw - 14) / 6;
            return <rect key={k} x={19 + c * cw} y={19 + r * 52} width={cw - 7} height={45} rx={7} fill={C.choco2} />;
          })}
        </g>
        
      </g>
      {/* Verpackung */}
      <g opacity={1 - 0.8 * xr}>
        <rect x={0} y={0} width={W} height={H} rx={14} fill="#6B2438" />
        <rect x={0} y={0} width={W} height={H} rx={14} fill="url(#wrapShine)" />
        <rect x={0} y={0} width={46} height={H} rx={14} fill={C.amber} />
        <rect x={30} y={0} width={16} height={H} fill={C.amber} />
        <text x={74} y={84} fontFamily={FONT} fontWeight={800} fontSize={44} fill={C.white} letterSpacing={1}>SCHOKOLADE</text>
        <text x={76} y={122} fontFamily={FONT} fontWeight={600} fontSize={24} fill={C.gray}>Vollmilch · zart</text>
        {[0, 1, 2].map((k) => <rect key={k} x={78 + k * 40} y={140} width={32} height={26} rx={6} fill={C.choco2} />)}
      </g>
      {/* Gewichts-Badge */}
      <g transform={`translate(360 132)`}>
        <circle r={40} fill={C.amber} />
        <text y={10} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={27} fill={C.deep} opacity={1 - g90}>100 g</text>
        <text y={10} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={30} fill={C.red} opacity={g90}>90 g</text>
      </g>
    </g>
  );
};

const PriceTag: React.FC<{ f: number }> = ({ f }) => {
  const flipA = interpolate(f, [62, 72], [1, 0], { ...CL, easing: Easing.in(Easing.quad) });
  const flipB = interpolate(f, [72, 84], [0, 1], { ...CL, easing: Easing.out(Easing.back(2)) });
  const sy = f < 72 ? flipA : flipB;
  const after = f >= 72;
  const swing = f > 72 ? Math.sin((f - 72) / 4.2) * 16 * Math.exp(-(f - 72) / 22) : Math.sin(f / 20) * 1.5;
  const st = interpolate(f, [88, 100], [0, 1], { ...CL, easing: SPR });
  return (
    <g transform={`translate(960 2836) rotate(${swing})`}>
      <line x1={0} y1={0} x2={0} y2={18} stroke={C.mute} strokeWidth={4} />
      <g transform={`translate(0 18) scale(1 ${Math.max(0.02, sy)})`}>
        <rect x={-104} y={0} width={208} height={104} rx={12} fill={C.white} />
        <circle cx={0} cy={14} r={6} fill={C.deep} opacity={0.5} />
        {!after && <text x={0} y={80} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={52} fill={C.deep}>1,49 €</text>}
        {after && <text x={0} y={80} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={52} fill={C.red}>1,99 €</text>}
      </g>
      <g transform={`translate(98 22) scale(${st}) rotate(-12)`}>
        <circle r={36} fill={C.red} />
        <text y={9} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={24} fill={C.white}>+33 %</text>
      </g>
    </g>
  );
};

/* Figur mit Gelenken, Blinzeln, Schreck-Reaktion */
const Shopper: React.FC<{ f: number }> = ({ f }) => {
  const shock = interpolate(f, [80, 90], [0, 1], { ...CL, easing: SPR });
  const jump = f > 80 ? -18 * Math.sin(Math.min(1, (f - 80) / 12) * Math.PI) : 0;
  const blink = (f > 38 && f < 44) || (f > 128 && f < 133) ? 0.12 : 1;
  const reach = interpolate(f, [12, 52, 82, 96], [0, 1, 1, 0], { ...CL, easing: IO });
  const breathe = Math.sin(f / 18) * 2;
  const eyeS = 1 + 0.45 * shock;
  const look = interpolate(f, [0, 30], [0, -6], CL);
  return (
    <g transform={`translate(1345 ${2640 + jump + breathe})`}>
      {/* Körper */}
      <path d="M -70 120 Q -72 40 0 34 Q 72 40 70 120 L 74 330 L -74 330 Z" fill={C.blue} />
      <path d="M -16 34 L 0 66 L 16 34 Z" fill={C.white} opacity={0.9} />
      {/* Arm: Schulter -> Ellbogen -> Hand */}
      <g transform={`translate(-58 70) rotate(${lerp(14, 62, reach) - 40 * shock})`}>
        <rect x={-14} y={0} width={28} height={92} rx={14} fill={C.blue} />
        <g transform={`translate(0 84) rotate(${lerp(10, 40, reach) + 60 * shock})`}>
          <rect x={-12} y={0} width={24} height={84} rx={12} fill="#7C9BEA" />
          <circle cx={0} cy={90} r={16} fill="#E8B98F" />
        </g>
      </g>
      <g transform="translate(60 70) rotate(-10)">
        <rect x={-14} y={0} width={28} height={150} rx={14} fill="#7C9BEA" />
      </g>
      {/* Kopf */}
      <g transform={`rotate(${-4 * shock + Math.sin(f / 30) * 1.5})`}>
        <rect x={-14} y={8} width={28} height={30} fill="#D9A77B" />
        <circle cx={0} cy={-34} r={54} fill="#E8B98F" />
        <path d="M -54 -40 Q -50 -98 4 -94 Q 58 -92 54 -36 Q 30 -70 -54 -40 Z" fill="#2B2140" />
        {[-20, 20].map((x, k) => (
          <g key={k} transform={`translate(${x} -30) scale(${eyeS} ${eyeS * blink})`}>
            <ellipse rx={10} ry={12} fill={C.white} />
            <circle cx={look} cy={1} r={5.5} fill={C.deep} />
          </g>
        ))}
        {[-20, 20].map((x, k) => (
          <path key={k} d={`M ${x - 12} ${-50 - 9 * shock + (k ? 2 : -2) * (1 - shock)} Q ${x} ${-58 - 12 * shock} ${x + 12} ${-50 - 9 * shock}`} stroke="#2B2140" strokeWidth={5} fill="none" strokeLinecap="round" />
        ))}
        {shock < 0.5
          ? <path d="M -14 -6 Q 0 2 14 -6" stroke="#8A4B3A" strokeWidth={5} fill="none" strokeLinecap="round" />
          : <ellipse cx={0} cy={-2} rx={9 * shock} ry={13 * shock} fill="#5A2A24" />}
        <ellipse cx={-34} cy={-12} rx={9} ry={5} fill={C.red} opacity={0.18 + 0.2 * shock} />
        <ellipse cx={34} cy={-12} rx={9} ry={5} fill={C.red} opacity={0.18 + 0.2 * shock} />
      </g>
    </g>
  );
};

/* ---------- Welt-Ebenen ---------- */
const FarLayer: React.FC = () => {
  const pods = useMemo(() => Array.from({ length: 14 }).map((_, i) => ({
    x: random(`px${i}`) * 1920, y: 150 + random(`py${i}`) * 1800, s: 0.6 + random(`ps${i}`) * 1.2, r: random(`pr${i}`) * 360, coin: random(`pc${i}`) > 0.55,
  })), []);
  const boxes = useMemo(() => Array.from({ length: 34 }).map((_, i) => ({
    x: (i % 17) * 118 - 10, row: Math.floor(i / 17), h: 120 + random(`bh${i}`) * 90, c: [C.mute, "#3A5A9A", "#6B2438", "#2E5E4E", "#7A5A2E"][Math.floor(random(`bc${i}`) * 5)],
  })), []);
  return (
    <svg width={1920} height={3240} viewBox="0 0 1920 3240">
      {pods.map((p, i) => p.coin
        ? <circle key={i} cx={p.x} cy={p.y} r={46 * p.s} fill={C.amber} opacity={0.07} />
        : <g key={i} transform={`translate(${p.x} ${p.y}) rotate(${p.r}) scale(${p.s})`} opacity={0.07}>
            <ellipse rx={36} ry={80} fill={C.choco2} />
            {[-18, 0, 18].map((x) => <path key={x} d={`M ${x} -70 Q ${x * 1.4} 0 ${x} 70`} stroke={C.deep} strokeWidth={4} fill="none" />)}
          </g>)}
      {/* hintere Regale */}
      <rect x={0} y={2160} width={1920} height={1080} fill="#101B2D" />
      {boxes.map((b, i) => {
        const base = b.row === 0 ? 2470 : 3150;
        return <rect key={i} x={b.x} y={base - b.h} width={100} height={b.h} rx={8} fill={b.c} opacity={0.55} />;
      })}
      <rect x={0} y={2470} width={1920} height={20} fill={C.line} />
      <rect x={0} y={3150} width={1920} height={20} fill={C.line} />
    </svg>
  );
};

const NearLayer: React.FC<{ f: number }> = ({ f }) => {
  const dots = useMemo(() => Array.from({ length: 26 }).map((_, i) => ({
    x: random(`nx${i}`) * 2200 - 140, y: random(`ny${i}`) * 3240, r: 6 + random(`nr${i}`) * 18, a: random(`na${i}`) > 0.5,
  })), []);
  return (
    <svg width={1920} height={3240} viewBox="0 0 1920 3240">
      {dots.map((d, i) => (
        <circle key={i} cx={d.x + noise2D(`dx${i}`, f / 120, 0) * 40} cy={d.y + noise2D(`dy${i}`, 0, f / 120) * 40 - f * 0.15}
          r={d.r} fill={d.a ? C.amber : C.white} opacity={0.08 + 0.06 * Math.sin(f / 25 + i)} />
      ))}
    </svg>
  );
};

const MainWorld: React.FC<{ f: number; L: number; LP: number }> = ({ f, L, LP }) => {
  const s = rocketS(f, L, LP);
  const pt = getPointAtLength(COCOA_D, Math.max(0.01, s));
  const tg = getTangentAtLength(COCOA_D, Math.max(0.01, s));
  let ang = (Math.atan2(tg.y, tg.x) * 180) / Math.PI;
  const falling = f >= 410;
  if (f >= 380 && f < 410) ang = lerp(ang, ang + 6 * Math.sin(f * 1.7), 1);
  if (falling) ang += 25 * Math.sin((f - 410) / 6) * Math.exp(-(f - 410) / 90);
  const flame = f < 380 ? tw(f, 205, 10) : f < 410 ? (noise2D("sp", f / 1.5, 0) > 0 ? 0.8 : 0.05) : interpolate(f, [410, 418], [0.6, 0], CL);
  const grid = tw(f, 175, 40);
  const choc = interpolate(f, [240, 470], [0, 1], { ...CL, easing: Easing.bezier(0.4, 0, 0.6, 1) });
  const chocL = getLength(CHOC_D);
  const chocPt = getPointAtLength(CHOC_D, Math.max(0.01, chocL * choc));
  const peakPop = interpolate(f, [372, 384], [0, 1], { ...CL, easing: SPR });
  const stamp = interpolate(f, [562, 572], [0, 1], CL);
  const fea = tw(f, 470, 25);
  const feaY = interpolate(f, [470, 640], [-200, -120], CL);
  // Rauchpartikel
  const puffs: JSX.Element[] = [];
  for (let sf = 206; sf <= Math.min(f, 405); sf += 3) {
    const age = f - sf; if (age > 46) continue;
    const ps = rocketS(sf, L, LP);
    const p = getPointAtLength(COCOA_D, Math.max(0.01, ps));
    const t = getTangentAtLength(COCOA_D, Math.max(0.01, ps));
    const k = age / 46;
    puffs.push(<circle key={sf} cx={p.x - t.x * 80 + noise2D(`sx${sf}`, k, 0) * 18} cy={p.y - t.y * 80 - k * 30}
      r={8 + 30 * k} fill={C.gray} opacity={0.42 * (1 - k)} />);
  }
  // Absturz-Rauch
  for (let sf = 412; sf <= Math.min(f, 565); sf += 4) {
    const age = f - sf; if (age > 60) continue;
    const ps = rocketS(sf, L, LP);
    const p = getPointAtLength(COCOA_D, Math.max(0.01, ps));
    const k = age / 60;
    puffs.push(<circle key={`d${sf}`} cx={p.x + noise2D(`dx${sf}`, k, 0) * 20} cy={p.y - 20 - k * 70} r={10 + 26 * k} fill="#3A4560" opacity={0.6 * (1 - k)} />);
  }
  return (
    <svg width={1920} height={3240} viewBox="0 0 1920 3240" style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="wrapShine" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity={0.16} /><stop offset="0.45" stopColor="#FFFFFF" stopOpacity={0} /><stop offset="1" stopColor="#000000" stopOpacity={0.2} />
        </linearGradient>
        <linearGradient id="cocoaFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.red} stopOpacity={0.25} /><stop offset="1" stopColor={C.red} stopOpacity={0} />
        </linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="10" /></filter>
      </defs>
      {/* Diagramm */}
      <g opacity={grid}>
        {[0, 4000, 8000, 12000].map((p) => (
          <g key={p}>
            <line x1={MX(0)} x2={MX(37)} y1={PY(p)} y2={PY(p)} stroke={C.line} strokeWidth={3} strokeDasharray={p ? "4 14" : undefined} />
            <text x={MX(0) - 24} y={PY(p) + 12} textAnchor="end" fontFamily={FONT} fontWeight={700} fontSize={44} fill={C.mute}>{p ? `${p / 1000}k` : "0"}</text>
          </g>
        ))}
        {[["2023", 0], ["2024", 12], ["2025", 24], ["2026", 36]].map(([l, m]) => (
          <text key={l as string} x={MX(m as number)} y={2075} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={44} fill={C.mute}>{l}</text>
        ))}
        <text x={MX(0) + 40} y={PY(12000) - 30} fontFamily={FONT} fontWeight={700} fontSize={44} fill={C.mute}>Kakao, $ pro Tonne</text>
      </g>
      {/* Schokoladen-Linie (Index) */}
      <path d={CHOC_D} stroke={C.amber} strokeWidth={10} fill="none" strokeLinecap="round" strokeDasharray={`${chocL * choc} 99999`} />
      {choc > 0.02 && <circle cx={chocPt.x} cy={chocPt.y} r={14} fill={C.amber} />}
      {/* Kakao-Linie bis zur Rakete */}
      <path d={COCOA_D} stroke={C.red} strokeWidth={22} fill="none" strokeLinecap="round" strokeDasharray={`${s} 99999`} filter="url(#glow)" opacity={0.5} />
      <path d={COCOA_D} stroke={C.red} strokeWidth={10} fill="none" strokeLinecap="round" strokeDasharray={`${s} 99999`} />
      {puffs}
      {f >= 200 && (
        <g transform={`translate(${pt.x} ${pt.y}) rotate(${ang})`}>
          <Rocket f={f} flame={flame} />
        </g>
      )}
      {f >= 200 && f < 600 && (
        <g transform={`translate(${pt.x} ${pt.y - 92})`} opacity={tw(f, 210, 15) * (1 - tw(f, 560, 20))}>
          <rect x={-70} y={-34} width={140} height={52} rx={26} fill={C.deep} opacity={0.85} />
          <text y={2} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={30} fill={C.white}>Kakao</text>
        </g>
      )}
      {/* Peak-Label */}
      <g transform={`translate(${MX(23) - 250} ${PY(12500) + 20}) scale(${peakPop})`}>
        <rect x={-150} y={-56} width={300} height={92} rx={20} fill={C.red} />
        <text y={10} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={52} fill={C.white}>12.500 $</text>
      </g>
      {/* Absturz-Stempel */}
      {f > 560 && (
        <g transform={`translate(${MX(29)} ${PY(3400) - 150}) rotate(-8) scale(${lerp(3.2, 1.5, Easing.out(Easing.cubic)(stamp))})`} opacity={stamp}>
          <rect x={-170} y={-70} width={340} height={124} rx={18} fill="none" stroke={C.red} strokeWidth={10} />
          <text y={22} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={86} fill={C.red}>−74 %</text>
        </g>
      )}
      {/* Feder über der Schokoladenlinie */}
      <g transform={`translate(${MX(37) + 30 + Math.sin(f / 16) * 34} ${IY(144) + feaY}) rotate(${Math.sin(f / 16 + 1) * 20 + 30}) scale(1.7)`} opacity={fea}>
        <Feather />
      </g>
      <g transform={`translate(${MX(37) + 330} ${IY(144) + 120})`} opacity={tw(f, 490, 20)}>
        <text textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={60} fill={C.amber}>Schokolade</text>
        <text y={58} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={40} fill={C.gray}>Preisindex · bleibt oben</text>
      </g>

      {/* Supermarkt-Regal */}
      <rect x={0} y={2810} width={1920} height={30} fill={C.line} />
      <rect x={0} y={2810} width={1920} height={5} fill="#3A5A9A" />
      <rect x={0} y={2840} width={1920} height={40} fill="#1F3150" />
      <ChocoBar f={f} />
      <g transform="translate(330 2620)">
        <rect width={300} height={190} rx={14} fill="#2E5E4E" /><rect width={300} height={190} rx={14} fill="url(#wrapShine)" />
        <text x={30} y={110} fontFamily={FONT} fontWeight={800} fontSize={40} fill={C.white} opacity={0.85}>NUSS</text>
      </g>
      <g transform="translate(1250 2650)">
        <rect width={240} height={160} rx={14} fill="#3A5A9A" /><rect width={240} height={160} rx={14} fill="url(#wrapShine)" />
      </g>
      <PriceTag f={f} />
      <Shopper f={f} />
    </svg>
  );
};

/* ---------- Bildschirm-Texte ---------- */
const Caption: React.FC<{ f: number; from: number; to: number; parts: [string, string?][]; y?: number }> = ({ f, from, to, parts, y = 90 }) => {
  if (f < from - 2 || f > to + 12) return null;
  const out = tw(f, to, 12, IO);
  return (
    <div style={{ position: "absolute", top: y, left: 0, right: 0, textAlign: "center", fontFamily: FONT, fontWeight: 800, fontSize: 68, color: C.white, opacity: 1 - out, letterSpacing: -1 }}>
      {parts.map(([w, col], i) => {
        const p = interpolate(f, [from + i * 5, from + i * 5 + 10], [0, 1], { ...CL, easing: SPR });
        return <span key={i} style={{ display: "inline-block", margin: "0 12px", color: col ?? C.white, opacity: p, translate: `0 ${lerp(26, 0, p)}px`, textShadow: "0 6px 0 #0A111D, 0 0 30px rgba(10,17,29,.8)" }}>{w}</span>;
      })}
    </div>
  );
};

export const TestScene: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { L, LP } = cocoaLen();
  return (
    <AbsoluteFill style={{ background: `linear-gradient(180deg, ${C.bg0}, ${C.bg1})`, overflow: "hidden" }}>
      <CameraMotionBlur shutterAngle={200} samples={6}>
        <AbsoluteFill>
          {/* Streifen-Wand (Markenzeichen) mit leichter Parallaxe */}
          <div style={layerStyle(f, 0.35)}>
            <svg width={1920} height={3240}>{Array.from({ length: 31 }).map((_, i) => <rect key={i} x={i * 64} y={0} width={28} height={3240} fill="#FFFFFF" opacity={0.018} />)}</svg>
          </div>
          <div style={layerStyle(f, 0.6, 3)}><FarLayer /></div>
          <div style={layerStyle(f, 1)}><MainWorld f={f} L={L} LP={LP} /></div>
          <div style={layerStyle(f, 1.45, 5)}><NearLayer f={f} /></div>
        </AbsoluteFill>
      </CameraMotionBlur>
      <Caption f={f} from={392} to={468} y={930} parts={[["Kakao:"], ["steigt", C.red], ["wie"], ["eine"], ["Rakete", C.red]]} />
      <Caption f={f} from={478} to={600} y={930} parts={[["Schokolade:"], ["fällt", C.amber], ["wie"], ["eine"], ["Feder", C.amber]]} />
      <Caption f={f} from={690} to={760} y={70} parts={[["Gleiche"], ["Packung."], ["10 %", C.red], ["weniger", C.red]]} />
      {/* Vignette + Körnung */}
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 55%, rgba(4,8,16,.55) 100%)" }} />
      <AbsoluteFill style={{ opacity: 0.07, mixBlendMode: "overlay", overflow: "hidden" }}>
        <Img src={staticFile("grain.png")} style={{ position: "absolute", width: 2400, height: 1500, left: -(random(`g${Math.floor(f / 2)}`) * 200), top: -(random(`h${Math.floor(f / 2)}`) * 200) }} />
      </AbsoluteFill>
      {/* Ton */}
      <Audio src={staticFile("music_hook.mp3")} volume={0.22} />
      <Sequence from={66}><Audio src={staticFile("sfx/n_sfx_pop.wav")} volume={0.6} /></Sequence>
      <Sequence from={86}><Audio src={staticFile("sfx/n_sfx_ding.wav")} volume={0.35} /></Sequence>
      <Sequence from={145}><Audio src={staticFile("sfx/n_sfx_whoosh.wav")} volume={0.7} /></Sequence>
      <Sequence from={374}><Audio src={staticFile("sfx/n_sfx_pop.wav")} volume={0.5} /></Sequence>
      <Sequence from={562}><Audio src={staticFile("sfx/n_sfx_stamp.wav")} volume={0.9} /></Sequence>
      <Sequence from={605}><Audio src={staticFile("sfx/n_sfx_whoosh.wav")} volume={0.7} /></Sequence>
      <Sequence from={676}><Audio src={staticFile("sfx/n_sfx_paper.wav")} volume={0.6} /></Sequence>
      <Sequence from={fps * 0}><></></Sequence>
    </AbsoluteFill>
  );
};
