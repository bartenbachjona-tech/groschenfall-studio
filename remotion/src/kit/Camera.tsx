import React from "react";
import { Easing, interpolate } from "remotion";
import { noise2D } from "@remotion/noise";
import { CL, IO, lerp } from "./core";
export type K = { f: number; x: number; y: number; z: number; e?: (t: number) => number };
export type Cam = { x: number; y: number; z: number };
export const camAt = (keys: K[], f: number, breathe = 1): Cam => {
  if (f <= keys[0].f) return { x: keys[0].x, y: keys[0].y, z: keys[0].z };
  let i = 0;
  while (i < keys.length - 2 && f > keys[i + 1].f) i++;
  const a = keys[i], b = keys[i + 1];
  const t = interpolate(f, [a.f, b.f], [0, 1], { ...CL, easing: b.e ?? IO });
  const bx = noise2D("cx", f / 90, 0) * 6 * breathe, by = noise2D("cy", 0, f / 90) * 5 * breathe;
  return { x: lerp(a.x, b.x, t) + bx, y: lerp(a.y, b.y, t) + by, z: lerp(a.z, b.z, t) };
};
export const WHIP = Easing.bezier(0.7, 0, 0.2, 1);
/** Ebene mit Parallaxe p (1 = Hauptebene). Welt-Mittelpunkt (cx0, cy0) als Anker. */
export const Layer: React.FC<{ cam: Cam; p?: number; blur?: number; w: number; h: number; children: React.ReactNode }> = ({ cam, p = 1, blur = 0, w, h, children }) => {
  const z = 1 + (cam.z - 1) * p, x = w / 2 + (cam.x - w / 2) * p, y = h / 2 + (cam.y - h / 2) * p;
  return (
    <div style={{ position: "absolute", left: 0, top: 0, width: w, height: h, transformOrigin: "0 0",
      transform: `translate(${960 - x * z}px, ${540 - y * z}px) scale(${z})`, filter: blur ? `blur(${blur}px)` : undefined }}>
      {children}
    </div>
  );
};
