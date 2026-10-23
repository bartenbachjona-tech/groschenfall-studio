import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { C, FONT } from "../brand";
import { CL, pop, tw } from "../kit/core";
import { Backdrop, Finish, Stripes } from "../kit/Stage";
import { Coin } from "../kit/Props";
export const END_DUR = 360;
export const EndCard: React.FC = () => {
  const f = useCurrentFrame();
  const drop = interpolate(f, [0, 22], [-300, 250], { ...CL, easing: Easing.bounce });
  return (
    <AbsoluteFill>
      <Backdrop /><Stripes w={1920} h={1080} />
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <g transform={`translate(960 ${drop}) rotate(${interpolate(f, [0, 22], [-200, 0], CL)})`}><Coin r={90} label="G" /></g>
        <text x={960} y={430} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={72} fill={C.white} opacity={tw(f, 18, 14)}>Groschenfall</text>
        <text x={960} y={480} textAnchor="middle" fontFamily={FONT} fontWeight={600} fontSize={30} fill={C.gray} opacity={tw(f, 26, 14)}>Damit bei dir der Groschen fällt.</text>
        <rect x={150} y={560} width={880} height={495 * 0.0 + 360} rx={24} fill="#FFFFFF" opacity={0.04 * tw(f, 30, 20)} />
        <text x={590} y={545} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={34} fill={C.amber} opacity={tw(f, 34, 14)}>Als Nächstes ansehen</text>
        <circle cx={1450} cy={740} r={170} fill="#FFFFFF" opacity={0.04 * tw(f, 30, 20)} />
        <text x={1450} y={545} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={34} fill={C.amber} opacity={tw(f, 38, 14)}>Abonnieren</text>
      </svg>
      <Finish />
    </AbsoluteFill>
  );
};
