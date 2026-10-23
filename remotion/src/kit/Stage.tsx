import React from "react";
import { AbsoluteFill, Img, random, staticFile, useCurrentFrame } from "remotion";
import { C } from "../brand";
export const Backdrop: React.FC = () => (
  <AbsoluteFill style={{ background: `linear-gradient(180deg, ${C.bg0}, ${C.bg1})` }} />
);
export const Stripes: React.FC<{ w: number; h: number }> = ({ w, h }) => (
  <svg width={w} height={h} style={{ position: "absolute" }}>
    {Array.from({ length: Math.ceil(w / 64) }).map((_, i) => <rect key={i} x={i * 64} y={0} width={28} height={h} fill="#FFFFFF" opacity={0.018} />)}
  </svg>
);
export const Finish: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <>
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 55%, rgba(4,8,16,.55) 100%)" }} />
      <AbsoluteFill style={{ opacity: 0.07, mixBlendMode: "overlay", overflow: "hidden" }}>
        <Img src={staticFile("grain.png")} style={{ position: "absolute", width: 2400, height: 1500, left: -(random(`g${Math.floor(f / 2)}`) * 200), top: -(random(`h${Math.floor(f / 2)}`) * 200) }} />
      </AbsoluteFill>
    </>
  );
};
