import React from "react";
import { AbsoluteFill } from "remotion";
import { C, FONT } from "../brand";
import { Backdrop, Stripes } from "../kit/Stage";
import { Bar, Coin, Defs, Feather, PriceTag, Rocket } from "../kit/Props";
import { Figure } from "../kit/Figure";

const Txt: React.FC<{ x: number; y: number; s: number; c: string; children: React.ReactNode; a?: "start" | "middle" | "end" }> = ({ x, y, s, c, children, a = "middle" }) => (
  <text x={x} y={y} fontSize={s} fontFamily={FONT} fontWeight={800} fill={c} textAnchor={a} stroke="#0A111D" strokeWidth={s * 0.12} paintOrder="stroke" letterSpacing={-1}>{children}</text>
);

/** A: Rakete abgestürzt vs. Feder oben */
export const ThumbA: React.FC = () => (
  <AbsoluteFill>
    <Backdrop /><Stripes w={1280} h={720} />
    <svg width={1280} height={720} style={{ position: "absolute" }}>
      <Defs />
      <circle cx={330} cy={560} r={150} fill="#3A4560" opacity={0.5} />
      <g transform="translate(330 470) rotate(120) scale(2.1)"><Rocket f={0} flame={0} /></g>
      {[[250, 380, 40], [400, 330, 30], [300, 280, 24]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} fill={C.gray} opacity={0.25} />)}
      <Txt x={330} y={170} s={120} c={C.red}>Kakao</Txt>
      <Txt x={330} y={290} s={130} c={C.red}>−56 %</Txt>
      <g transform="translate(930 250) rotate(25) scale(2.4)"><Feather /></g>
      <g transform="translate(800 420) scale(0.85)"><Bar f={0} x={0} y={0} wrap="#6B2438" label="SCHOKOLADE" sub="Vollmilch" /></g>
      <Txt x={985} y={690} s={110} c={C.amber}>+75 %</Txt>
    </svg>
  </AbsoluteFill>
);

/** B: Preisschild + geschockte Figur */
export const ThumbB: React.FC = () => (
  <AbsoluteFill>
    <Backdrop /><Stripes w={1280} h={720} />
    <svg width={1280} height={720} style={{ position: "absolute" }}>
      <Defs />
      <g transform="translate(60 330) scale(1.15)"><Bar f={60} x={0} y={0} wrap="#6B2438" label="SCHOKOLADE" sub="Vollmilch" grams={["100 g", "90 g"]} xrayAt={0} shrinkAt={0} /></g>
      <g transform="translate(300 500) scale(1.35)"><PriceTag f={200} x={0} y={0} a="1,49 €" b="1,99 €" flipAt={0} hang={false} /></g>
      <Figure f={300} x={1060} y={330} s={1.25} shockAt={290} />
      <Txt x={420} y={190} s={150} c={C.white}>Abzocke?</Txt>
      <Txt x={560} y={300} s={56} c={C.amber}>Kakao halb so teuer</Txt>
    </svg>
  </AbsoluteFill>
);

/** C: Preisschere – Kakao stürzt, Schokolade steigt */
export const ThumbC: React.FC = () => {
  const X0 = 80, X1 = 1110, Y = (v: number) => 680 - v * 3.5;
  const cocoa = [10, 12, 14, 18, 30, 62, 100, 88, 70, 52, 40, 36, 34];
  const choco = [20, 22, 25, 30, 38, 46, 55, 62, 68, 72, 74, 75, 76];
  const pts = (a: number[]) => a.map((v, i) => `${X0 + (i * (X1 - 180 - X0)) / (a.length - 1)},${Y(v)}`).join(" ");
  const lx = X1 - 180;
  return (
    <AbsoluteFill>
      <Backdrop /><Stripes w={1280} h={720} />
      <svg width={1280} height={720} style={{ position: "absolute" }}>
        <Defs />
        {[0, 1, 2, 3, 4].map((i) => <line key={i} x1={X0} x2={X1} y1={650 - i * 105} y2={650 - i * 105} stroke="#FFFFFF" strokeOpacity={0.07} strokeWidth={2} />)}
        <polygon points={`${pts(choco.slice(9)).split(" ").map((p, i) => p).join(" ")}`} fill="none" />
        <polyline points={pts(cocoa)} fill="none" stroke={C.red} strokeWidth={16} strokeLinejoin="round" strokeLinecap="round" />
        <polyline points={pts(choco)} fill="none" stroke={C.amber} strokeWidth={16} strokeLinejoin="round" strokeLinecap="round" />
        <circle cx={lx} cy={Y(34)} r={18} fill={C.red} /><circle cx={lx} cy={Y(76)} r={18} fill={C.amber} />
        <line x1={lx + 40} x2={lx + 40} y1={Y(76) + 10} y2={Y(34) - 10} stroke={C.white} strokeWidth={6} strokeDasharray="12 10" />
        <Txt x={lx + 60} y={Y(76) + 24} s={58} c={C.amber} a="start">Schoko</Txt>
        <Txt x={lx + 60} y={Y(34) + 24} s={58} c={C.red} a="start">Kakao</Txt>
        <Txt x={60} y={125} s={104} c={C.white} a="start">Wo bleibt</Txt>
        <Txt x={60} y={235} s={104} c={C.white} a="start">das Geld?</Txt>
      </svg>
    </AbsoluteFill>
  );
};

/** D: Wer kassiert? – Tafel wird zerteilt, Münzen fliegen weg */
export const ThumbD: React.FC = () => (
  <AbsoluteFill>
    <Backdrop /><Stripes w={1280} h={720} />
    <svg width={1280} height={720} style={{ position: "absolute" }}>
      <Defs />
      <g transform="translate(70 360) rotate(-8) scale(1.25)"><Bar f={0} x={0} y={0} wrap="#6B2438" label="SCHOKOLADE" sub="Vollmilch" xrayAt={0} /></g>
      {[[700, 300, 46], [800, 220, 40], [900, 330, 52], [1010, 210, 38], [760, 420, 34]].map(([x, y, r], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${i * 17 - 20})`}><Coin r={r} label="€" /></g>
      ))}
      <Figure f={300} x={1120} y={420} s={1.05} angryAt={290} pointAt={290} />
      <Txt x={50} y={165} s={128} c={C.white} a="start">Wer kassiert?</Txt>
      <Txt x={560} y={660} s={76} c={C.amber}>1,49 € → 1,99 €</Txt>
    </svg>
  </AbsoluteFill>
);
