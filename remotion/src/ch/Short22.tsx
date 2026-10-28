/* Short 22 – Steht dir zu: Steuererklärung 2022 freiwillig bis 31.12.2026, Ø-Erstattung 1.240 € (Destatis) */
import React from "react";
import { AbsoluteFill, staticFile, useCurrentFrame } from "remotion";
import { Audio } from "@remotion/media";
import { Backdrop, Stripes } from "../kit/Stage";
import { Stamp } from "../kit/Props";
import { Figure } from "../kit/Figure";
import { C, CL, CLOSING, EndShare, EndYT, FONT, Grain, Pill, Scenes, Src, SfxTrack, Sub, Txt, W, H, chunks, interpolate, lerp, mk, pop, tw } from "./shortkit";
import D from "../data/s22.json";

const { wk, ps, pe, DUR } = mk(D as any);
export const S22_DUR = DUR;
const INK = "#0A111D";

/** Geldstapel mit Schild */
const Stack: React.FC<{ label: string; s?: number }> = ({ label, s = 1 }) => (
  <g transform={`scale(${s})`}>
    <ellipse cx={0} cy={150} rx={210} ry={30} fill={INK} opacity={0.4} />
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <g key={i} transform={`translate(${(i % 2) * 10 - 5} ${120 - i * 44})`}>
        <rect x={-170} y={-22} width={340} height={44} rx={8} fill={i % 2 ? "#3DB883" : C.green} stroke={INK} strokeWidth={4} />
        <rect x={-60} y={-22} width={40} height={44} fill={C.white} opacity={0.5} />
      </g>
    ))}
    <g transform="translate(0 -210)">
      <rect x={-200} y={-62} width={400} height={124} rx={24} fill={INK} stroke={C.amber} strokeWidth={8} />
      <text y={30} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={86} fill={C.amber}>{label}</text>
    </g>
  </g>
);
/** Kopfhörer über der Figur */
const Phones: React.FC = () => (
  <g>
    <path d="M -62 -40 Q 0 -150 62 -40" stroke={INK} strokeWidth={14} fill="none" />
    <rect x={-80} y={-50} width={30} height={56} rx={12} fill={C.red} />
    <rect x={50} y={-50} width={30} height={56} rx={12} fill={C.red} />
  </g>
);
const Doc: React.FC<{ title: string; col: string; s?: number }> = ({ title, col, s = 1 }) => (
  <g transform={`scale(${s})`}>
    <rect x={-170} y={-220} width={340} height={440} rx={18} fill={INK} opacity={0.35} transform="translate(8 12)" />
    <rect x={-170} y={-220} width={340} height={440} rx={18} fill={C.white} />
    <text y={-150} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={40} fill={INK}>Bescheid</text>
    {[0, 1, 2, 3].map((i) => <rect key={i} x={-120} y={-100 + i * 44} width={240 - i * 35} height={16} rx={8} fill={C.gray} />)}
    <rect x={-140} y={110} width={280} height={70} rx={12} fill={col} />
    <text y={158} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={38} fill={INK}>{title}</text>
  </g>
);

export const Short22: React.FC<{ end: "yt" | "tt" }> = ({ end }) => {
  const f = useCurrentFrame();
  const b1 = ps("b1"), b2 = ps("b2") - 4, b3 = ps("b3") - 4, b4 = ps("b4") - 4, fE = ps(end) - 8;
  const closeAt = wk(end, "groschenfall") - 4;

  const scenes = [
    {
      a: 0, b: b1, render: (f: number) => {
        const walk = interpolate(f, [0, b1], [230, 330], CL);
        return (
          <g>
            <Txt x={540} y={320} s={110} c={C.amber}>1.240 €</Txt>
            <Txt x={540} y={440} s={84}>liegen lassen?</Txt>
            <g transform="translate(780 980)"><Stack label="1.240 €" s={0.8} /></g>
            <g transform={`translate(${walk} 900)`}>
              <Figure f={f} x={0} y={0} s={0.8} shirt={C.blue} look={-8} flip />
              <g transform="translate(0 -40) scale(0.8)"><Phones /></g>
            </g>
          </g>
        );
      },
    },
    {
      a: b1, b: b2, render: (f: number) => {
        const g = interpolate(f, [b1 + 6, b1 + 30], [0, 1], CL);
        return (
          <g>
            <Txt x={540} y={330} s={80}>Erstattung 2022</Txt>
            <Txt x={540} y={420} s={44} c={C.gray} w={700}>Arbeitnehmer, wenn Geld zurückkam</Txt>
            <line x1={240} y1={1120} x2={840} y2={1120} stroke="#2A3F63" strokeWidth={8} strokeLinecap="round" />
            <rect x={400} y={1120 - 480 * g} width={280} height={480 * g} rx={20} fill={C.amber} />
            <Txt x={540} y={1120 - 480 * g - 34} s={92} o={g}>Ø 1.240 €</Txt>
            <Stamp f={f} at={wk("b1", "durchschnitt") - 2} x={540} y={1250} text="Durchschnitt" s={0.6} col={C.blue} rot={-4} />
            <Src o={tw(f, b1 + 6, 10)}>Quelle: Destatis, 10.06.26 (Steuerjahr 2022)</Src>
          </g>
        );
      },
    },
    {
      a: b2, b: b3, render: (f: number) => {
        const x1 = tw(f, wk("b2", "nebeneinkünfte") - 2, 10);
        const p1 = pop(f, wk("b2", "freiwillig") - 2, 14), p2 = pop(f, wk("b2", "rückwirkend") - 2, 14);
        return (
          <g>
            <Txt x={540} y={330} s={80}>Keine Pflicht?</Txt>
            <Figure f={f} x={210} y={700} s={0.7} shirt={C.green} look={6} smileAt={wk("b2", "freiwillig")} />
            <g transform="translate(700 600)">
              <Pill w={420} text="Steuerklasse 1" col={C.blue} s={48} h={100} />
            </g>
            <g transform="translate(700 740)">
              <Pill w={420} text="Nebeneinkünfte" col="#5A6B88" fg={C.white} s={46} h={100} />
              <line x1={-200} y1={0} x2={lerp(-200, 200, x1)} y2={0} stroke={C.red} strokeWidth={14} strokeLinecap="round" opacity={x1} />
            </g>
            <g transform={`translate(640 980) scale(${p1})`} opacity={Math.min(1, p1 * 2)}><Pill w={520} text="freiwillig" col={C.green} s={64} h={130} /></g>
            <g opacity={Math.min(1, p2 * 2)} transform={`translate(540 1210) scale(${p2})`}>
              <path d="M 220 30 L -180 30 M -180 30 L -130 -10 M -180 30 L -130 70" stroke={C.amber} strokeWidth={14} strokeLinecap="round" fill="none" />
              <Txt x={20} y={-30} s={56} c={C.amber}>rückwirkend</Txt>
            </g>
            <Txt x={540} y={1330} s={32} c={C.gray} w={600}>Nebenjob, Eltern-/Krankengeld, ALG &gt; 410 € → Pflicht, andere Frist</Txt>
          </g>
        );
      },
    },
    {
      a: b3, b: b4, render: (f: number) => {
        const fade = interpolate(f, [wk("b3", "danach") - 4, wk("b3", "weg") + 6], [1, 0.15], CL);
        const r = pop(f, b3 + 8, 14);
        return (
          <g>
            <Txt x={540} y={330} s={84}>Für 2022: Frist</Txt>
            <g transform={`translate(540 780) scale(${r})`} opacity={Math.min(1, r * 2)}>
              <rect x={-300} y={-200} width={600} height={400} rx={30} fill={C.white} />
              <rect x={-300} y={-200} width={600} height={110} rx={30} fill={C.red} />
              <rect x={-300} y={-120} width={600} height={30} fill={C.red} />
              <text y={-125} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={52} fill={INK}>Dezember</text>
              <text y={110} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={170} fill={INK}>31.12.</text>
            </g>
            <Txt x={540} y={1070} s={44} c={C.gray} w={700} o={tw(f, wk("b3", "finanzamt") - 4, 10)}>Eingang beim Finanzamt</Txt>
            <g opacity={fade}><Txt x={540} y={1230} s={120} c={C.amber}>2022</Txt></g>
            <Stamp f={f} at={wk("b3", "weg") - 2} x={540} y={1200} text="verfällt" s={0.9} col={C.red} rot={-6} />
            <Src o={tw(f, b3 + 6, 10)}>Quelle: § 46 Abs. 2 Nr. 8 EStG; § 169 AO</Src>
          </g>
        );
      },
    },
    {
      a: b4, b: fE - 10, kind: "zoom" as const, render: (f: number) => {
        const a = tw(f, wk("b4", "einspruch") - 4, 12);
        return (
          <g>
            <Txt x={540} y={330} s={84}>Nachzahlung?</Txt>
            <g transform={`translate(${lerp(540, 380, a)} 820) rotate(${lerp(0, -6, a)})`}><Doc title="Nachzahlung" col={C.red} s={0.9} /></g>
            <g opacity={a} transform="translate(800 820)">
              <path d="M 120 0 L -60 0 M -60 0 L -10 -40 M -60 0 L -10 40" stroke={C.green} strokeWidth={14} strokeLinecap="round" fill="none" />
            </g>
            <g transform={`translate(540 1150) scale(${pop(f, wk("b4", "zurücknehmen") - 2, 14)})`}><Pill w={760} text="Einspruch: zurücknehmen" col={C.green} s={54} h={120} /></g>
            <Txt x={540} y={1300} s={42} c={C.gray} w={700} o={tw(f, wk("b4", "binnen") - 2, 10)}>binnen 1 Monat nach Bescheid</Txt>
          </g>
        );
      },
    },
  ];

  const hi = ["steuererklärung", "erstattung", "durchschnitt", "freiwillig", "rückwirkend", "steuerklasse", "finanzamt", "weg", "nachzahlung", "einspruch", "monats"];
  const cs = chunks(D.paras as any, ["hook", "b1", "b2", "b3", "b4"], [
    ["zwölfhundertvierzig euro", "1.240 €"], ["zweitausendzweiundzwanzig", "2022"], ["steuerklasse eins", "Steuerklasse 1"],
    ["einunddreißigsten dezember", "31. Dezember"],
  ]);
  const subEnd = pe("b4") + 8;
  const endIn = tw(f, fE, 16);

  const sfx: [number, string, number?][] = [
    [0, "soft", 0.7], [wk("hook", "zwölfhundertvierzig") - 2, "coins", 0.5],
    [b1 - 4, "whoosh", 0.7], [wk("b1", "durchschnitt") - 2, "stamp", 0.5],
    [b2 - 4, "whoosh", 0.7], [wk("b2", "nebeneinkünfte") - 2, "paper", 0.4], [wk("b2", "freiwillig") - 2, "ding", 0.5],
    [b3 - 4, "whoosh", 0.7], [wk("b3", "einunddreißigsten") - 2, "paper", 0.5], [wk("b3", "weg") - 2, "stamp", 0.5],
    [b4 - 4, "whoosh", 0.7], [wk("b4", "zurücknehmen") - 2, "marimba", 0.4],
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
              : <EndShare f={f} at={fE} who={["noch nie eine Steuer-", "erklärung gemacht hat."]} closeAt={closeAt} />}
          </g>
        )}
      </svg>
      <Sub f={f} cs={cs} end={subEnd} hi={hi} />
      <Grain f={f} />
      <Audio src={staticFile(`audio/s22_${end}.wav`)} />
      <SfxTrack list={sfx} />
    </AbsoluteFill>
  );
};
export const Short22YT: React.FC = () => <Short22 end="yt" />;
export const Short22TT: React.FC = () => <Short22 end="tt" />;
