/* Short 21 – Frist: Krankenkasse zu teuer? Bis zu 400 €/Jahr Unterschied, kein Brief mehr, Frist Ende Januar */
import React from "react";
import { AbsoluteFill, staticFile, useCurrentFrame } from "remotion";
import { Audio } from "@remotion/media";
import { Backdrop, Stripes } from "../kit/Stage";
import { Stamp } from "../kit/Props";
import { Figure } from "../kit/Figure";
import { Arrow, C, CL, CLOSING, EndShare, EndYT, FONT, Grain, OUT, Pill, Scenes, Src, SfxTrack, Sub, Txt, W, H, chunks, interpolate, lerp, mk, pop, tw } from "./shortkit";
import D from "../data/s21.json";

const { wk, ps, pe, DUR } = mk(D as any);
export const S21_DUR = DUR;
const INK = "#0A111D";

/** neutrales Kassen-Gebäude (keine echte Kasse) */
const Kasse: React.FC<{ col: string; label: string; s?: number; sub?: string }> = ({ col, label, s = 1, sub }) => (
  <g transform={`scale(${s})`}>
    <rect x={-150} y={-170} width={300} height={360} rx={18} fill={INK} opacity={0.35} transform="translate(8 12)" />
    <path d="M -170 -110 L 0 -230 L 170 -110 Z" fill={col} />
    <rect x={-150} y={-110} width={300} height={300} rx={10} fill="#22385C" />
    <rect x={-150} y={-110} width={300} height={70} fill={col} opacity={0.9} />
    <text y={-62} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={40} fill={INK}>{label}</text>
    <rect x={-55} y={40} width={110} height={150} rx={10} fill="#16243B" />
    <circle cx={30} cy={115} r={7} fill={col} />
    {[-110, 70].map((x, i) => <rect key={i} x={x} y={-20} width={40} height={40} rx={6} fill="#FFE7A8" opacity={0.85} />)}
    {sub && <text y={250} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={44} fill={col}>{sub}</text>}
  </g>
);
const Mailbox: React.FC<{ f: number; at: number }> = ({ f, at }) => {
  const x = tw(f, at, 10);
  return (
    <g>
      <rect x={-18} y={60} width={36} height={260} fill="#5A6B88" />
      <path d="M -170 60 L -170 -60 Q -170 -150 -80 -150 L 170 -150 L 170 60 Z" fill="#2A4A7A" stroke={INK} strokeWidth={6} />
      <rect x={-120} y={-80} width={200} height={22} rx={11} fill={INK} />
      <rect x={170} y={-150} width={18} height={110} fill={C.red} />
      <g transform="translate(0 -230) rotate(-8)">
        <rect x={-110} y={-70} width={220} height={140} rx={10} fill={C.white} />
        <path d="M -110 -70 L 0 10 L 110 -70" stroke={C.gray} strokeWidth={6} fill="none" />
        <line x1={-140} y1={90} x2={lerp(-140, 140, x)} y2={lerp(90, -90, x)} stroke={C.red} strokeWidth={18 * x} strokeLinecap="round" opacity={x} />
      </g>
    </g>
  );
};
const Cal: React.FC<{ f: number; at: number }> = ({ f, at }) => {
  const r = tw(f, at, 12);
  return (
    <g>
      <rect x={-330} y={-300} width={660} height={600} rx={30} fill={INK} opacity={0.35} transform="translate(8 12)" />
      <rect x={-330} y={-300} width={660} height={600} rx={30} fill={C.white} />
      <rect x={-330} y={-300} width={660} height={120} rx={30} fill={C.blue} />
      <rect x={-330} y={-220} width={660} height={40} fill={C.blue} />
      <text y={-215} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={64} fill={INK}>Januar</text>
      {Array.from({ length: 31 }, (_, i) => {
        const c = (i + 4) % 7, row = Math.floor((i + 4) / 7);
        const x = -270 + c * 90, y = -120 + row * 82;
        return (
          <g key={i}>
            <text x={x} y={y + 12} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={36} fill={i === 30 ? C.red : "#5A6B88"}>{i + 1}</text>
            {i === 30 && <circle cx={x} cy={y} r={44} fill="none" stroke={C.red} strokeWidth={8} strokeDasharray={280} strokeDashoffset={280 * (1 - r)} />}
          </g>
        );
      })}
    </g>
  );
};

export const Short21: React.FC<{ end: "yt" | "tt" }> = ({ end }) => {
  const f = useCurrentFrame();
  const b1 = ps("b1"), b2 = ps("b2") - 4, b2b = wk("b2", "bundestag") - 8;
  const b3 = ps("b3") - 4, b4 = ps("b4") - 4, fE = ps(end) - 8;
  const closeAt = wk(end, "groschenfall") - 4;

  const scenes = [
    {
      a: 0, b: b1, render: (f: number) => {
        const look = interpolate(f, [0, 40, 70], [-8, 8, -8], CL);
        return (
          <g>
            <Txt x={540} y={310} s={100}>Bis zu 400 €</Txt>
            <Txt x={540} y={420} s={84} c={C.amber}>im Jahr</Txt>
            <g transform="translate(250 900)"><Kasse col={C.green} label="günstig" s={0.9} /></g>
            <g transform="translate(830 900)"><Kasse col={C.red} label="teuer" s={0.9} /></g>
            <Figure f={f} x={540} y={1000} s={0.85} shirt={C.amber} look={look} shockAt={wk("hook", "vierhundert") - 2} />
          </g>
        );
      },
    },
    {
      a: b1, b: b2, render: (f: number) => {
        const p1 = pop(f, wk("b1", "dreitausend") - 2, 14), p2 = pop(f, wk("b1", "teuersten") - 2, 16);
        return (
          <g>
            <Txt x={540} y={330} s={78}>günstigste vs. teuerste</Txt>
            <g transform="translate(260 760)"><Kasse col={C.green} label="günstig" s={0.6} /></g>
            <g transform="translate(820 760)"><Kasse col={C.red} label="teuer" s={0.6} /></g>
            <g transform={`translate(540 800) scale(${p1})`} opacity={Math.min(1, p1 * 2)}>
              <rect x={-130} y={-160} width={260} height={320} rx={16} fill={C.white} />
              {[0, 1, 2, 3].map((i) => <rect key={i} x={-95} y={-110 + i * 42} width={190 - i * 30} height={16} rx={8} fill={C.gray} />)}
              <text y={110} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={46} fill={INK}>3.000 €</text>
              <text y={145} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={28} fill="#5A6B88">brutto</text>
            </g>
            <g transform={`translate(540 1150) scale(${lerp(0.6, 1, p2)})`} opacity={p2}>
              <rect x={-380} y={-95} width={760} height={180} rx={34} fill={INK} stroke={C.amber} strokeWidth={8} />
              <text y={32} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={88} fill={C.amber}>≈ 400 €/Jahr</text>
            </g>
            <Txt x={540} y={1305} s={34} c={C.gray} w={600} o={p2}>Unterschied für dich · manche Kassen nur regional</Txt>
            <Src o={tw(f, b1 + 6, 10)}>Quelle: GKV-Spitzenverband, Stand 27.10.26 (2,18–4,39 %)</Src>
          </g>
        );
      },
    },
    {
      a: b2, b: b2b, render: (f: number) => (
        <g>
          <Txt x={540} y={330} s={86}>Beitrag rauf?</Txt>
          <Stamp f={f} at={wk("b2", "wechseln") - 2} x={540} y={450} text="Wechsel erlaubt" s={0.6} col={C.green} rot={-4} />
          <g transform="translate(540 1000)"><Mailbox f={f} at={wk("b2", "brief") - 4} /></g>
          <Txt x={540} y={1370} s={84} c={C.red} o={tw(f, wk("b2", "brief") - 2, 10)}>Kein Brief mehr</Txt>
        </g>
      ),
    },
    {
      a: b2b, b: b3, render: (f: number) => (
        <g>
          <Txt x={540} y={340} s={82}>Info-Pflicht zurück?</Txt>
          <Txt x={540} y={640} s={50} c={C.gray} w={700} o={tw(f, b2b + 8, 10)}>Bundestag</Txt>
          <Stamp f={f} at={wk("b2", "bundestag") - 2} x={540} y={740} text="ja" s={1} col={C.green} rot={-5} />
          <Txt x={540} y={960} s={50} c={C.gray} w={700} o={tw(f, wk("b2", "kraft") - 6, 10)}>in Kraft</Txt>
          <Stamp f={f} at={wk("b2", "kraft") - 2} x={540} y={1060} text="nein" s={1} col={C.red} rot={4} />
          <Src o={tw(f, b2b + 6, 10)}>Quelle: § 175 SGB V (seit 30.07.26); Bundestag 15.10.26</Src>
        </g>
      ),
    },
    {
      a: b3, b: b4, render: (f: number) => (
        <g>
          <Txt x={540} y={330} s={90}>Frist:</Txt>
          <Txt x={540} y={440} s={90} c={C.amber}>Ende Januar</Txt>
          <g transform="translate(540 900) scale(0.95)"><Cal f={f} at={wk("b3", "ende", 1) - 4} /></g>
          <Txt x={540} y={1330} s={42} c={C.gray} w={700} o={tw(f, wk("b3", "januar", 1), 10)}>wenn er im Januar steigt · neue Kasse ab 1. April</Txt>
          <Src o={tw(f, b3 + 6, 10)}>Quelle: § 175 Abs. 4 SGB V</Src>
        </g>
      ),
    },
    {
      a: b4, b: fE - 10, kind: "zoom" as const, render: (f: number) => {
        const a1 = tw(f, wk("b4", "mitglied") - 4, 12), a2 = tw(f, wk("b4", "erledigt") - 4, 14);
        return (
          <g>
            <Txt x={540} y={330} s={84}>Kündigen?</Txt>
            <Txt x={540} y={440} s={84} c={C.green}>Nicht nötig</Txt>
            <Figure f={f} x={170} y={900} s={0.6} shirt={C.amber} look={6} smileAt={wk("b4", "erledigt")} />
            <g transform="translate(560 860)"><Kasse col={C.green} label="neu" s={0.6} /></g>
            <g transform="translate(900 860)" opacity={0.85}><Kasse col={C.red} label="alt" s={0.5} /></g>
            <g opacity={a1}><path d={`M 270 860 L ${lerp(270, 430, a1)} 860`} stroke={C.white} strokeWidth={14} strokeLinecap="round" /></g>
            <g opacity={a2}>
              <path d={`M 600 1060 Q 760 1180 ${lerp(600, 900, a2)} 1040`} stroke={C.green} strokeWidth={12} fill="none" strokeDasharray="26 18" strokeLinecap="round" />
              <Txt x={740} y={1260} s={50} c={C.green}>kündigt für dich</Txt>
            </g>
          </g>
        );
      },
    },
  ];

  const hi = ["krankenkasse", "teuer", "zusatzbeiträge", "billigste", "teuersten", "wechseln", "brief", "bundestag", "kraft", "frist", "januar", "kündigen", "neuen"];
  const cs = chunks(D.paras as any, ["hook", "b1", "b2", "b3", "b4"], [
    ["bis zu vierhundert euro", "bis zu 400 €"], ["dreitausend euro", "3.000 €"],
  ]);
  const subEnd = pe("b4") + 8;
  const endIn = tw(f, fE, 16);

  const sfx: [number, string, number?][] = [
    [0, "soft", 0.7], [wk("hook", "vierhundert") - 2, "coins", 0.5],
    [b1 - 4, "whoosh", 0.7], [wk("b1", "dreitausend") - 2, "paper", 0.5], [wk("b1", "teuersten") - 2, "ding", 0.5],
    [b2 - 4, "whoosh", 0.7], [wk("b2", "wechseln") - 2, "stamp", 0.5], [wk("b2", "brief") - 2, "paper", 0.5],
    [b2b - 4, "whoosh", 0.6], [wk("b2", "bundestag") - 2, "stamp", 0.5], [wk("b2", "kraft") - 2, "stamp", 0.5],
    [b3 - 4, "whoosh", 0.7], [wk("b3", "ende", 1) - 2, "marimba", 0.4], [b4 - 4, "whoosh", 0.7], [wk("b4", "erledigt") - 2, "ding", 0.4],
    [fE - 6, "whoosh", 0.8], [closeAt, "coins", 0.4],
  ];

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Backdrop />
      <Stripes w={W} h={H} />
      <svg width={W} height={H} style={{ position: "absolute" }}>
        <ellipse cx={540} cy={900} rx={560} ry={520} fill="#4A6AAA" opacity={0.12} />
        <Scenes f={f} list={scenes} />
        {f >= fE && (
          <g opacity={endIn} transform={`translate(0 ${lerp(60, 0, endIn)})`}>
            {end === "yt"
              ? <EndYT f={f} at={fE} line={CLOSING} />
              : <EndShare f={f} at={fE} who={["noch bei einer", "teuren Kasse ist."]} closeAt={closeAt} />}
          </g>
        )}
      </svg>
      <Sub f={f} cs={cs} end={subEnd} hi={hi} />
      <Grain f={f} />
      <Audio src={staticFile(`audio/s21_${end}.wav`)} />
      <SfxTrack list={sfx} />
    </AbsoluteFill>
  );
};
export const Short21YT: React.FC = () => <Short21 end="yt" />;
export const Short21TT: React.FC = () => <Short21 end="tt" />;
