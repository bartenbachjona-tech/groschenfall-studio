import React from "react";
import { AbsoluteFill, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Audio } from "@remotion/media";
import { CameraMotionBlur } from "@remotion/motion-blur";
import { Backdrop, Finish } from "./Stage";

/** Bewegungsunschärfe nur in den angegebenen Frame-Fenstern (spart Renderzeit) */
export const MaybeBlur: React.FC<{ windows: [number, number][]; children: React.ReactNode }> = ({ windows, children }) => {
  const f = useCurrentFrame();
  const on = windows.some(([a, b]) => f >= a && f <= b);
  return on ? <CameraMotionBlur shutterAngle={200} samples={6}>{children}</CameraMotionBlur> : <AbsoluteFill>{children}</AbsoluteFill>;
};
export type Sfx = [number, string, number?];
/* "pop" klang unpassend -> weiches Klicken; alle Effekte zurückhaltender */
const SFX_MAP: Record<string, string> = { pop: "soft" };
const SFX_GAIN: Record<string, number> = { soft: 0.55, whoosh: 0.45, stamp: 0.6, coin: 0.6, coins: 0.5, ding: 0.5, paper: 0.6, marimba: 0.5 };
export const ChapterShell: React.FC<{ ch: number; blur: [number, number][]; sfx: Sfx[]; children: React.ReactNode; overlay?: React.ReactNode; src?: string }> = ({ ch, blur, sfx, children, overlay, src }) => (
  <AbsoluteFill style={{ overflow: "hidden" }}>
    <Backdrop />
    <MaybeBlur windows={blur}><AbsoluteFill>{children}</AbsoluteFill></MaybeBlur>
    {overlay}
    <Finish />
    <Audio src={staticFile(src ?? `audio/ch${ch}.wav`)} />
    {sfx.map(([f, n, v], i) => {
      const name = SFX_MAP[n] ?? n;
      const vol = (v ?? 0.6) * (SFX_GAIN[name] ?? 0.6);
      return <Sequence key={i} from={Math.max(0, Math.round(f))} durationInFrames={90}><Audio src={staticFile(`sfx/n_sfx_${name}.wav`)} volume={vol} /></Sequence>;
    })}
  </AbsoluteFill>
);
