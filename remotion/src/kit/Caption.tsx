import React from "react";
import { interpolate } from "remotion";
import { C, FONT } from "../brand";
import { CL, SPR, IO, lerp, tw } from "./core";
/** Großer Bildschirm-Satz, Wörter springen nacheinander rein */
export const Caption: React.FC<{ f: number; from: number; to: number; parts: [string, string?][]; y?: number; size?: number }> = ({ f, from, to, parts, y = 80, size = 68 }) => {
  if (f < from - 2 || f > to + 14) return null;
  const out = tw(f, to, 12, IO);
  return (
    <div style={{ position: "absolute", top: y, left: 40, right: 40, textAlign: "center", fontFamily: FONT, fontWeight: 800, fontSize: size, color: C.white, opacity: 1 - out, letterSpacing: -1 }}>
      {parts.map(([w, col], i) => {
        const p = interpolate(f, [from + i * 5, from + i * 5 + 10], [0, 1], { ...CL, easing: SPR });
        return <span key={i} style={{ display: "inline-block", margin: "0 12px", color: col ?? C.white, opacity: p, translate: `0 ${lerp(26, 0, p)}px`, textShadow: "0 6px 0 #0A111D, 0 0 30px rgba(10,17,29,.8)" }}>{w}</span>;
      })}
    </div>
  );
};
/** Kapitel-Label oben links */
export const ChapterLabel: React.FC<{ f: number; n: number; title: string; at?: number; dur?: number }> = ({ f, n, title, at = 8, dur = 120 }) => {
  const a = tw(f, at, 14), b = tw(f, at + dur, 14, IO);
  if (f < at || f > at + dur + 16) return null;
  return (
    <div style={{ position: "absolute", left: 80, top: 64, fontFamily: FONT, opacity: a * (1 - b), translate: `${lerp(-30, 0, a)}px 0` }}>
      <div style={{ fontSize: 26, fontWeight: 700, color: C.green, letterSpacing: 5 }}>KAPITEL {n}</div>
      <div style={{ fontSize: 50, fontWeight: 800, color: C.white, textShadow: "0 4px 0 #0A111D" }}>{title}</div>
      <div style={{ height: 5, width: 280 * tw(f, at + 6, 24), background: C.green, borderRadius: 3, marginTop: 6 }} />
    </div>
  );
};
