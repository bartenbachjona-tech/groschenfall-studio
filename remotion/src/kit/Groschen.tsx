/* Maskottchen „Der Groschen“ (Marke v2, docs/brand/LOOK.md) – reiner Code-Baustein, nichts generiert.
   <Groschen reaction="schreck" x={820} y={560} size={160} startFrame={0} fall f={frame} />
   - size = Durchmesser in px (Short: 130–170)
   - fall = Signet: Fall von oben in ≤ 0,5 s (12 Frames), Landung mit Stauchung, danach sofort die Reaktion
   - sound = „Klick-Kling“ (coins + ding aus dem SFX-Satz) bei der Landung, leiser als die Stimme
   Reaktionen: schreck · augenrollen · lupe · triumph · kopfschuetteln (Standard ohne Reaktion: neutral) */
import React from "react";
import { Easing, Sequence, interpolate, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { C, FONT } from "../brand";
import { CL, lerp } from "./core";

export type GroschenReaction = "neutral" | "schreck" | "augenrollen" | "lupe" | "triumph" | "kopfschuetteln";

export const G = { body: "#C98A4B", rim: "#E3B07A", dark: "#8A5A2B", edge: "#6E4520", arm: "#5A3A1C", eye: "#FFFFFF", pupil: "#0E1828" };
/** Fall-Dauer und Beginn der Reaktion relativ zu startFrame (in Frames, 30 fps) */
export const G_FALL = 12, G_REACT = 14;

let uid = 0;
const useUid = () => React.useMemo(() => `gr${uid++}`, []);

const Spark: React.FC<{ x: number; y: number; s: number; o: number; c?: string }> = ({ x, y, s, o, c = C.amber }) => (
  <path d={`M ${x} ${y - s} Q ${x} ${y} ${x + s} ${y} Q ${x} ${y} ${x} ${y + s} Q ${x} ${y} ${x - s} ${y} Q ${x} ${y} ${x} ${y - s} Z`} fill={c} opacity={o} />
);

/** Ein Auge im Einheitsmaß (Münzradius 100). lid 0 = offen, 1 = zu */
const Eye: React.FC<{ id: string; cx: number; cy: number; rx: number; ry: number; px: number; py: number; pr: number; lid: number; lower?: number; closed?: boolean | "happy" | "squeeze" }> = ({ id, cx, cy, rx, ry, px, py, pr, lid, lower = 0, closed }) => {
  const right = cx > 0;
  if (closed === "happy") return <path d={`M ${cx - rx} ${cy + 8} Q ${cx} ${cy - ry * 1.1} ${cx + rx} ${cy + 8}`} fill="none" stroke={G.pupil} strokeWidth={7} strokeLinecap="round" />;
  if (closed === "squeeze") return <path d={right ? `M ${cx + rx * 0.8} ${cy - 14} L ${cx - rx * 0.7} ${cy} L ${cx + rx * 0.8} ${cy + 14}` : `M ${cx - rx * 0.8} ${cy - 14} L ${cx + rx * 0.7} ${cy} L ${cx - rx * 0.8} ${cy + 14}`} fill="none" stroke={G.pupil} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />;
  if (closed || lid >= 0.97) return <path d={`M ${cx - rx} ${cy + 2} Q ${cx} ${cy + ry * 0.55} ${cx + rx} ${cy + 2}`} fill="none" stroke={G.pupil} strokeWidth={6} strokeLinecap="round" />;
  return (
    <g>
      <clipPath id={id}><ellipse cx={cx} cy={cy} rx={rx} ry={ry} /></clipPath>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={G.eye} />
      <g clipPath={`url(#${id})`}>
        <circle cx={cx + px} cy={cy + py} r={pr} fill={G.pupil} />
        <circle cx={cx + px - pr * 0.35} cy={cy + py - pr * 0.4} r={pr * 0.3} fill="#fff" />
        {lid > 0 && <rect x={cx - rx - 2} y={cy - ry - 2} width={rx * 2 + 4} height={(ry * 2 + 4) * lid} fill={G.dark} />}
        {lower > 0 && <path d={`M ${cx - rx - 2} ${cy + ry + 2} L ${cx - rx - 2} ${cy + ry - (ry * 2) * lower} Q ${cx} ${cy + ry - (ry * 2) * lower - ry * 0.5} ${cx + rx + 2} ${cy + ry - (ry * 2) * lower} L ${cx + rx + 2} ${cy + ry + 2} Z`} fill={G.dark} />}
        {lower > 0 && <path d={`M ${cx - rx} ${cy + ry - (ry * 2) * lower} Q ${cx} ${cy + ry - (ry * 2) * lower - ry * 0.5} ${cx + rx} ${cy + ry - (ry * 2) * lower}`} fill="none" stroke={G.pupil} strokeWidth={4} />}
        {lid > 0 && <line x1={cx - rx} x2={cx + rx} y1={cy - ry - 2 + (ry * 2 + 4) * lid} y2={cy - ry - 2 + (ry * 2 + 4) * lid} stroke={G.pupil} strokeWidth={4} />}
      </g>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke={G.pupil} strokeWidth={3.5} />
    </g>
  );
};

export const Groschen: React.FC<{
  f: number; x: number; y: number; size?: number; reaction?: GroschenReaction;
  startFrame?: number; fall?: boolean; sound?: boolean; flip?: boolean; opacity?: number;
}> = ({ f, x, y, size = 160, reaction = "neutral", startFrame = 0, fall = false, sound = true, flip = false, opacity = 1 }) => {
  const id = useUid();
  const k = size / 200; // Einheitsmaß: Radius 100
  const t0 = f - startFrame;
  if (fall && t0 < 0) return null;

  // ---- Fall + Landung (Signet) ----
  let dy = 0, sx = 1, sy = 1, spin = 0;
  if (fall) {
    const p = interpolate(t0, [0, G_FALL], [0, 1], { ...CL, easing: Easing.in(Easing.quad) });
    dy = lerp(-(y + size * 1.2), 0, p);
    spin = lerp(-25, 0, p);
    const sq = interpolate(t0, [G_FALL, G_FALL + 2, G_FALL + 5, G_FALL + 8], [0, 1, -0.4, 0], CL);
    sx = 1 + 0.14 * sq; sy = 1 - 0.16 * sq;
  }
  const rt = fall ? t0 - G_REACT : t0; // Zeit seit Reaktionsbeginn
  const act = rt >= 0 ? reaction : "neutral";

  // ---- Standard-Mimik ----
  let eyeRy = 25, eyeRx = 21, pr = 10.5, px = 0, py = 2, lid = 0.12, closed: boolean | "happy" | "squeeze" = false, lower = 0, brows: React.ReactNode = null, rEyeScale = 1;
  let mouth: React.ReactNode = <path d="M -14 22 Q 0 27 14 22" fill="none" stroke={G.pupil} strokeWidth={5} strokeLinecap="round" />;
  let rot = spin, bx = 0, by = 0, turn = 1;
  let arms: React.ReactNode = null, extra: React.ReactNode = null, front: React.ReactNode = null;
  // Blinzeln im Ruhezustand
  const blink = act === "neutral" && ((Math.max(0, t0) + 40) % 90) < 3;
  if (blink) lid = 0.97;

  const aw = size <= 200 ? 11 : 7;
  const armL = (ax: number, ay: number) => <path d={`M -96 10 Q ${(-96 + ax) / 2 - 10} ${(10 + ay) / 2 + 12} ${ax} ${ay}`} fill="none" stroke={G.arm} strokeWidth={aw} strokeLinecap="round" />;
  const armR = (ax: number, ay: number) => <path d={`M 96 10 Q ${(96 + ax) / 2 + 10} ${(10 + ay) / 2 + 12} ${ax} ${ay}`} fill="none" stroke={G.arm} strokeWidth={aw} strokeLinecap="round" />;
  const hand = (hx: number, hy: number) => <circle cx={hx} cy={hy} r={aw + 2} fill={G.arm} />;

  if (act === "schreck") {
    by = interpolate(rt, [0, 5, 11, 15, 19], [0, -46, 0, -8, 0], CL);
    const shake = Math.exp(-rt / 18) * Math.sin(rt * 2.6) * 5 + Math.sin(rt * 1.7) * 1.2;
    bx = shake;
    eyeRy = 31; eyeRx = 24; pr = 7.5; py = -1; lid = 0;
    mouth = <ellipse cx={0} cy={30} rx={9} ry={12} fill={G.pupil} />;
    arms = <>{armL(-138, -48)}{hand(-138, -48)}{armR(138, -48)}{hand(138, -48)}</>;
    const o = interpolate(rt, [0, 4, 40, 50], [0, 1, 1, 0.85], CL);
    extra = (
      <g opacity={o} stroke={C.red} strokeWidth={8} strokeLinecap="round">
        <line x1={-70} y1={-118} x2={-86} y2={-150} /><line x1={0} y1={-124} x2={0} y2={-160} /><line x1={70} y1={-118} x2={86} y2={-150} />
      </g>
    );
  } else if (act === "augenrollen") {
    const a = interpolate(rt, [0, 22], [Math.PI * 0.5, Math.PI * 1.5], { ...CL, easing: Easing.inOut(Easing.quad) });
    px = Math.cos(a) * 10; py = -Math.abs(Math.sin(a)) * 11 - 4;
    if (rt > 22) { px = 0; py = -15; }
    lid = interpolate(rt, [0, 8], [0.12, 0.42], CL);
    mouth = <path d="M -16 26 L 14 21" fill="none" stroke={G.pupil} strokeWidth={5} strokeLinecap="round" />;
    rot = interpolate(rt, [0, 12, 24], [0, -6, -4], CL);
    arms = <>{armL(-122, 58)}{hand(-122, 58)}{armR(122, 58)}{hand(122, 58)}</>;
  } else if (act === "lupe") {
    rEyeScale = interpolate(rt, [0, 10], [1, 1.45], { ...CL, easing: Easing.out(Easing.back(2)) });
    const wob = Math.sin(rt / 7) * 3;
    px = 3; py = 1; lid = 0.08;
    mouth = <path d="M -12 30 Q -2 25 10 30" fill="none" stroke={G.pupil} strokeWidth={5} strokeLinecap="round" />;
    const lx = 34, ly = -26 + wob; // Lupe vor dem rechten Auge
    arms = <>{armL(-118, 60)}{hand(-118, 60)}{armR(lx + 42, ly + 50)}</>;
    front = (
      <g>
        <line x1={lx + 30} y1={ly + 32} x2={lx + 72} y2={ly + 76} stroke={G.arm} strokeWidth={13} strokeLinecap="round" />
        <circle cx={lx} cy={ly} r={44} fill="#BFD6FF" fillOpacity={0.18} stroke={G.rim} strokeWidth={9} />
        <circle cx={lx} cy={ly} r={44} fill="none" stroke={G.pupil} strokeWidth={3} />
        <path d={`M ${lx - 26} ${ly - 18} Q ${lx - 18} ${ly - 30} ${lx - 4} ${ly - 33}`} fill="none" stroke="#fff" strokeOpacity={0.7} strokeWidth={5} strokeLinecap="round" />
        {hand(lx + 74, ly + 78)}
      </g>
    );
  } else if (act === "triumph") {
    by = -Math.abs(Math.sin((rt / 12) * Math.PI)) * 34 * Math.exp(-rt / 45);
    lower = 0.38; py = -4; lid = 0.05;
    mouth = <path d="M -24 22 Q 0 40 24 22" fill="none" stroke={G.pupil} strokeWidth={6} strokeLinecap="round" />;
    arms = <>{armL(-140, -70)}{hand(-140, -70)}{armR(140, -70)}{hand(140, -70)}</>;
    const sp = (d: number) => interpolate(rt, [d, d + 6, d + 20], [0, 1, 0.25], CL) + 0.25 * (rt > d + 20 ? 1 : 0) * (0.6 + 0.4 * Math.sin(rt / 4 + d));
    extra = (
      <g>
        <Spark x={-128} y={-118} s={26} o={sp(0)} />
        <Spark x={132} y={-104} s={20} o={sp(3)} c="#fff" />
        <Spark x={-150} y={30} s={16} o={sp(6)} c="#fff" />
        <Spark x={150} y={44} s={24} o={sp(2)} />
      </g>
    );
  } else if (act === "kopfschuetteln") {
    const s = Math.sin(rt / 3.2) * Math.exp(-Math.max(0, rt - 30) / 25);
    turn = 1 - 0.22 * Math.abs(s);
    bx = s * 14;
    rot = s * 9;
    closed = true;
    mouth = <path d="M -18 30 L 18 30" fill="none" stroke={G.pupil} strokeWidth={6} strokeLinecap="round" />;
    brows = <g stroke={G.pupil} strokeWidth={6} strokeLinecap="round"><line x1={-54} y1={-52} x2={-16} y2={-42} /><line x1={54} y1={-52} x2={16} y2={-42} /></g>;
    const mo = interpolate(rt, [0, 4, 50, 60], [0, 0.9, 0.9, 0.4], CL);
    extra = (
      <g opacity={mo} fill="none" stroke={C.gray} strokeWidth={7} strokeLinecap="round">
        <path d="M -128 -40 Q -146 0 -128 40" /><path d="M -150 -58 Q -174 0 -150 58" />
        <path d="M 128 -40 Q 146 0 128 40" /><path d="M 150 -58 Q 174 0 150 58" />
      </g>
    );
    arms = <>{armL(-118, 62)}{hand(-118, 62)}{armR(118, 62)}{hand(118, 62)}</>;
  }

  const fx = flip ? -1 : 1;
  const sh = fall ? interpolate(t0, [0, G_FALL], [0.15, 1], CL) : 1;
  return (
    <g transform={`translate(${x} ${y})`} opacity={opacity}>
      {/* Schlagschatten auf dem Boden */}
      <ellipse cx={0} cy={size * 0.56} rx={size * 0.42 * sh} ry={size * 0.07 * sh} fill="#000" opacity={0.35 * sh} />
      <g transform={`translate(${bx * k} ${(dy + by * k)}) scale(${k * sx * fx * turn} ${k * sy}) rotate(${rot})`}>
        {extra}
        {arms}
        {/* Dicke der Münze */}
        <circle cx={0} cy={9} r={100} fill={G.edge} />
        <circle r={100} fill={G.rim} />
        <circle r={88} fill={G.body} />
        <circle r={80} fill="none" stroke={G.dark} strokeWidth={3} strokeOpacity={0.7} strokeDasharray="2 7" />
        {/* Glanzlicht oben links */}
        <path d="M -70 -42 A 82 82 0 0 1 -30 -78" fill="none" stroke="#FFF3DE" strokeOpacity={0.75} strokeWidth={9} strokeLinecap="round" />
        {/* Prägung „10“ */}
        <text x={1.5} y={83} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={48} fill={G.rim} letterSpacing={-1}>10</text>
        <text x={0} y={81} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={48} fill="#5E3A17" letterSpacing={-1}>10</text>
        {/* Gesicht */}
        <Eye id={`${id}l`} cx={-33} cy={-24} rx={eyeRx} ry={eyeRy} px={px} py={py} pr={pr} lid={lid} lower={lower} closed={closed} />
        <g transform={`translate(33 -24) scale(${rEyeScale}) translate(-33 24)`}>
          <Eye id={`${id}r`} cx={33} cy={-24} rx={eyeRx} ry={eyeRy} px={px} py={py} pr={pr} lid={lid} lower={lower} closed={closed} />
        </g>
        {brows}
        {mouth}
        {front}
      </g>
    </g>
  );
};

/** „Klick-Kling“ bei der Landung (Frame startFrame + G_FALL), ≤ 0,7 s, leiser als die Stimme */
export const GroschenKling: React.FC<{ startFrame: number; volume?: number }> = ({ startFrame, volume = 1 }) => (
  <>
    <Sequence from={Math.max(0, startFrame + G_FALL - 1)} durationInFrames={21}><Audio src={staticFile("sfx/n_sfx_coins.wav")} volume={0.16 * volume} /></Sequence>
    <Sequence from={Math.max(0, startFrame + G_FALL + 2)} durationInFrames={21}><Audio src={staticFile("sfx/n_sfx_ding.wav")} volume={0.12 * volume} /></Sequence>
  </>
);

/** Endbild-Baustein: Groschen + „Groschenfall.“ (+ Abschlusszeile) – für EndShareG/EndYTG */
export const GroschenEnd: React.FC<{ f: number; at: number; line?: string; cy?: number }> = ({ f, at, line, cy = 1060 }) => {
  const o = interpolate(f, [at + 12, at + 24], [0, 1], CL);
  return (
    <g>
      <Groschen f={f} x={540} y={cy - 170} size={260} reaction="triumph" startFrame={at} fall />
      <text x={540} y={cy + 110} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={104} fill={C.white} letterSpacing={-2} opacity={o}>Groschenfall.</text>
      {line && <text x={540} y={cy + 200} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={56} fill={C.gray} opacity={interpolate(f, [at + 20, at + 32], [0, 1], CL)}>{line}</text>}
    </g>
  );
};
