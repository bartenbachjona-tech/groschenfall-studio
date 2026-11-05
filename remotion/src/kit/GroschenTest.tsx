/* Abnahme-Composition für den Groschen (NIGHT_RUN §B): Signet am Schlüsselbild, 5 Reaktionen groß + 168 px, Endbild, Reihe aller Reaktionen */
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, FONT } from "../brand";
import { Grain } from "../ch/shortkit";
import { EndShareG } from "./GroschenEnds";
import { Groschen, GroschenEnd, GroschenKling, GroschenReaction } from "./Groschen";

export const GT_DUR = 540;
const R: GroschenReaction[] = ["schreck", "augenrollen", "lupe", "triumph", "kopfschuetteln"];

const Bg: React.FC = () => (
  <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 40%, ${C.bg1} 0%, ${C.bg0} 70%)` }} />
);

/** Beispiel-Schlüsselbild: Brief der Krankenkasse mit roter Zeile + Betrag */
const Letter: React.FC = () => (
  <g transform="translate(480 820) rotate(-3)">
    <rect x={-330} y={-400} width={660} height={820} rx={18} fill="#F4F1EA" />
    <rect x={-330} y={-400} width={660} height={120} rx={18} fill="#DCE4F0" />
    <text x={-280} y={-322} fontFamily={FONT} fontWeight={800} fontSize={44} fill={C.bg0}>Deine Krankenkasse</text>
    {[0, 1, 2, 3].map((i) => <rect key={i} x={-280} y={-230 + i * 50} width={i === 3 ? 300 : 540} height={18} rx={9} fill="#C9CED8" />)}
    <rect x={-300} y={0} width={600} height={150} rx={14} fill="#FFE3E4" stroke={C.red} strokeWidth={6} />
    <text x={-270} y={60} fontFamily={FONT} fontWeight={700} fontSize={40} fill={C.bg0}>Beitrag pro Jahr</text>
    <text x={270} y={122} textAnchor="end" fontFamily={FONT} fontWeight={800} fontSize={82} fill={C.red}>+ 240 €</text>
    {[0, 1].map((i) => <rect key={i} x={-280} y={210 + i * 50} width={i ? 260 : 520} height={18} rx={9} fill="#C9CED8" />)}
  </g>
);

export const GroschenTest: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Bg />
      <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{ position: "absolute" }}>
        {f < 60 && (
          <g>
            <Letter />
            <Groschen f={f} x={925} y={500} size={160} reaction="schreck" startFrame={0} fall />
            <text x={540} y={300} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={76} fill={C.white}>Teurer ohne Brief?</text>

          </g>
        )}
        {R.map((r, i) => {
          const a = 60 + i * 60;
          if (f < a || f >= a + 60) return null;
          return (
            <g key={r}>
              <Groschen f={f} x={540} y={820} size={520} reaction={r} startFrame={a} />
              <text x={540} y={1260} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={72} fill={C.amber}>{r}</text>
              <Groschen f={f} x={300} y={1520} size={168} reaction={r} startFrame={a} />
              <text x={470} y={1530} fontFamily={FONT} fontWeight={600} fontSize={40} fill={C.gray}>168 px</text>
            </g>
          );
        })}
        {f >= 360 && f < 420 && <GroschenEnd f={f} at={360} line="Geld, endlich klar." />}
        {f >= 480 && <EndShareG f={f} at={480} who={["einen Brief", "erwartet."]} closeAt={492} />}
        {f >= 420 && f < 480 && (
          <g>
            {R.map((r, i) => (
              <g key={r}>
                <Groschen f={f} x={150 + (i % 3) * 390} y={600 + Math.floor(i / 3) * 520} size={168} reaction={r} startFrame={420} />
                <text x={150 + (i % 3) * 390} y={760 + Math.floor(i / 3) * 520} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={36} fill={C.gray}>{r}</text>
              </g>
            ))}
          </g>
        )}
      </svg>
      <GroschenKling startFrame={0} />
      <Grain f={f} />
    </AbsoluteFill>
  );
};
