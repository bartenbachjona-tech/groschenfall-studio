/* Endkarten mit dem Groschen (Marke v2, ab Abnahme 05.11.2026) – Kopien von EndYT/EndShare aus shortkit.tsx,
   dort bleibt alles unverändert (Handbuch G8). Ersetzt nur die fallende „G“-Münze durch den Groschen. */
import React from "react";
import { C } from "../brand";
import { CLOSING, Pill, Txt } from "../ch/shortkit";
import { pop, tw } from "./core";
import { Groschen, GroschenKling } from "./Groschen";

export const EndYTG: React.FC<{ f: number; at: number; line: string }> = ({ f, at, line }) => {
  const btn = pop(f, at + 20, 16);
  return (
    <g>
      <Groschen f={f} x={540} y={700} size={260} reaction="triumph" startFrame={at} fall />
      <Txt x={540} y={1000} s={96} o={tw(f, at + 12, 12)}>Groschenfall</Txt>
      <Txt x={540} y={1080} s={46} c={C.gray} w={700} o={tw(f, at + 18, 12)}>{line}</Txt>
      <g transform={`translate(540 1250) scale(${btn})`} opacity={Math.min(1, btn * 2)}><Pill w={420} text="Folgen" col={C.amber} s={62} h={130} /></g>
    </g>
  );
};

export const EndShareG: React.FC<{ f: number; at: number; who: [string, string]; closeAt: number; lead?: [string, string] }> = ({ f, at, who, closeAt, lead = ["Schick das an", "jemanden, der"] }) => {
  const ic = pop(f, at + 6, 16);
  return (
    <g>
      <g transform={`translate(540 330) scale(${ic})`} opacity={Math.min(1, ic * 2)}>
        <circle r={90} fill={C.amber} />
        <path d="M -38 30 L -38 -6 Q -38 -34 -6 -34 L 22 -34 L 22 -62 L 64 -18 L 22 26 L 22 -2 L -6 -2 Q -10 -2 -10 4 L -10 30 Z" fill="#0A111D" />
      </g>
      <Txt x={540} y={540} s={80} o={tw(f, at, 12)}>{lead[0]}</Txt>
      <Txt x={540} y={640} s={80} o={tw(f, at + 3, 12)}>{lead[1]}</Txt>
      <Txt x={540} y={770} s={74} c={C.amber} o={tw(f, at + 8, 12)}>{who[0]}</Txt>
      <Txt x={540} y={865} s={74} c={C.amber} o={tw(f, at + 10, 12)}>{who[1]}</Txt>
      {f >= closeAt - 2 && (
        <g>
          <Groschen f={f} x={540} y={1110} size={190} reaction="triumph" startFrame={closeAt} fall />
          <Txt x={540} y={1300} s={84} o={tw(f, closeAt + 6, 12)}>Groschenfall.</Txt>
          <Txt x={540} y={1385} s={56} c={C.gray} w={700} o={tw(f, closeAt + 16, 12)}>{CLOSING}</Txt>
        </g>
      )}
    </g>
  );
};

/** Ton zu den Endkarten: im Short neben <SfxTrack> einsetzen, z. B. <GroschenKling startFrame={closeAt} /> */
export { GroschenKling };
