/* Short 23 – Welcher Typ bist du: Typklassen 2027 (GDV 30.09.2026): 7,4 Mio. höher / 5,1 Mio. niedriger / 71 % gleich; Kündigung bis 30.11. */
import React from "react";
import { AbsoluteFill, staticFile, useCurrentFrame } from "remotion";
import { Audio } from "@remotion/media";
import { Backdrop, Stripes } from "../kit/Stage";
import { Stamp } from "../kit/Props";
import { Figure } from "../kit/Figure";
import { Arrow, C, CL, CLOSING, EndShare, EndYT, FONT, Grain, Pill, Scenes, Src, SfxTrack, Sub, Txt, W, H, chunks, interpolate, lerp, mk, pop, tw } from "./shortkit";
import D from "../data/s23.json";

const { wk, ps, pe, DUR } = mk(D as any);
export const S23_DUR = DUR;
const INK = "#0A111D";

/** neutrales Auto (Seitenansicht, ohne Marke) */
const Car: React.FC<{ col: string; s?: number }> = ({ col, s = 1 }) => (
  <g transform={`scale(${s})`}>
    <ellipse cx={0} cy={78} rx={170} ry={16} fill={INK} opacity={0.45} />
    <path d="M -160 40 L -160 0 Q -150 -30 -110 -36 L -70 -40 L -30 -90 Q -20 -100 0 -100 L 70 -100 Q 92 -100 104 -86 L 136 -40 Q 166 -34 166 0 L 166 40 Z" fill={col} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -50 -44 L -20 -84 L 20 -84 L 20 -44 Z" fill="#BFE3FF" opacity={0.85} />
    <path d="M 34 -44 L 34 -84 L 74 -84 Q 86 -84 92 -74 L 112 -44 Z" fill="#BFE3FF" opacity={0.85} />
    <rect x={148} y={-14} width={18} height={12} rx={4} fill="#FFE7A8" />
    {[-96, 104].map((x) => (
      <g key={x} transform={`translate(${x} 44)`}>
        <circle r={36} fill={INK} />
        <circle r={16} fill={C.gray} />
      </g>
    ))}
  </g>
);

/** drei Fahrer-Typen mit Autos und Typklassen-Pfeilen */
const TRIO: { col: string; up: boolean | null; ac: string; shirt: string }[] = [
  { col: "#C8494E", up: true, ac: C.red, shirt: C.blue },
  { col: "#2E9C6E", up: false, ac: C.green, shirt: C.amber },
  { col: "#4E6FB8", up: null, ac: C.blue, shirt: C.green },
];
const Trio: React.FC<{ f: number; act?: number[]; dim?: boolean[] }> = ({ f, act = [0, 0, 0], dim = [false, false, false] }) => (
  <g>
    {TRIO.map((t, i) => {
      const x = 200 + i * 340;
      const a = act[i];
      return (
        <g key={i} opacity={dim[i] ? 0.4 : 1}>
          <ellipse cx={x} cy={760} rx={150} ry={210} fill={t.ac} opacity={0.18 * a} />
          <g transform={`translate(${x} ${560 - 20 * a}) scale(${0.8 + 0.25 * a})`}>
            {t.up === null
              ? <g>
                  <rect x={-56} y={-40} width={112} height={28} rx={8} fill={t.ac} stroke={INK} strokeWidth={6} />
                  <rect x={-56} y={12} width={112} height={28} rx={8} fill={t.ac} stroke={INK} strokeWidth={6} />
                </g>
              : <Arrow up={t.up} col={t.ac} />}
          </g>
          <Figure f={f} x={x} y={720} s={0.62} shirt={t.shirt} look={i === 0 ? 4 : i === 2 ? -4 : 0} blinkSeed={i} />
          <g transform={`translate(${x} 960)`}><Car col={t.col} s={0.95} /></g>
        </g>
      );
    })}
  </g>
);

/** Puzzleteil */
const Piece: React.FC<{ text: string; col: string; w?: number; o?: number }> = ({ text, col, w = 330, o = 1 }) => (
  <g opacity={o}>
    <rect x={-w / 2} y={-90} width={w} height={180} rx={18} fill={INK} opacity={0.35} transform="translate(6 10)" />
    <rect x={-w / 2} y={-90} width={w} height={180} rx={18} fill={col} />
    <circle cx={w / 2} cy={0} r={30} fill={col} />
    <text y={14} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={text.length > 9 ? 38 : 44} fill={INK}>{text}</text>
  </g>
);

const Phone: React.FC<{ f: number; at: number; free: number }> = ({ f, at, free }) => {
  const typed = "typklasse.de";
  const n = Math.round(interpolate(f, [at, at + 18], [0, typed.length], CL));
  return (
    <g>
      <rect x={-200} y={-360} width={400} height={720} rx={50} fill={INK} opacity={0.4} transform="translate(8 12)" />
      <rect x={-200} y={-360} width={400} height={720} rx={50} fill="#22385C" stroke={INK} strokeWidth={8} />
      <rect x={-176} y={-320} width={352} height={640} rx={30} fill={C.white} />
      <rect x={-50} y={-344} width={100} height={12} rx={6} fill={INK} />
      <rect x={-150} y={-230} width={300} height={80} rx={40} fill="#E3E9F2" stroke={C.blue} strokeWidth={5} />
      <circle cx={-110} cy={-190} r={14} fill="none" stroke={C.mute} strokeWidth={5} />
      <text x={-82} y={-178} fontFamily={FONT} fontWeight={800} fontSize={34} fill={INK}>{typed.slice(0, n)}</text>
      {[0, 1, 2].map((i) => <rect key={i} x={-140} y={-90 + i * 60} width={280 - i * 50} height={22} rx={11} fill={C.gray} opacity={tw(f, at + 18 + i * 4, 8)} />)}
      <g transform={`translate(0 170) scale(${free})`} opacity={Math.min(1, free * 2)}>
        <rect x={-140} y={-50} width={280} height={100} rx={50} fill={C.green} />
        <text y={16} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={44} fill={INK}>kostenlos</text>
      </g>
    </g>
  );
};

const Letter: React.FC<{ title: string; col: string; s?: number }> = ({ title, col, s = 1 }) => (
  <g transform={`scale(${s})`}>
    <rect x={-170} y={-210} width={340} height={420} rx={18} fill={INK} opacity={0.35} transform="translate(8 12)" />
    <rect x={-170} y={-210} width={340} height={420} rx={18} fill={C.white} />
    {[0, 1, 2, 3].map((i) => <rect key={i} x={-120} y={-150 + i * 44} width={240 - i * 35} height={16} rx={8} fill={C.gray} />)}
    <rect x={-150} y={70} width={300} height={90} rx={14} fill={col} />
    <text y={128} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={title.length > 12 ? 32 : 38} fill={INK}>{title}</text>
  </g>
);

const Mailbox: React.FC = () => (
  <g>
    <rect x={-18} y={60} width={36} height={240} fill="#5A6B88" />
    <path d="M -170 60 L -170 -60 Q -170 -150 -80 -150 L 170 -150 L 170 60 Z" fill="#2A4A7A" stroke={INK} strokeWidth={6} />
    <rect x={-120} y={-80} width={200} height={22} rx={11} fill={INK} />
    <rect x={-150} y={-30} width={300} height={66} rx={12} fill={C.blue} />
    <text y={14} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={40} fill={INK}>Versicherer</text>
  </g>
);

const CalNov: React.FC<{ f: number; at: number }> = ({ f, at }) => {
  const r = tw(f, at, 12);
  return (
    <g>
      <rect x={-330} y={-300} width={660} height={600} rx={30} fill={INK} opacity={0.35} transform="translate(8 12)" />
      <rect x={-330} y={-300} width={660} height={600} rx={30} fill={C.white} />
      <rect x={-330} y={-300} width={660} height={120} rx={30} fill={C.red} />
      <rect x={-330} y={-220} width={660} height={40} fill={C.red} />
      <text y={-215} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={64} fill={INK}>November</text>
      {Array.from({ length: 30 }, (_, i) => {
        const c = (i + 6) % 7, row = Math.floor((i + 6) / 7);
        const x = -270 + c * 90, y = -130 + row * 74;
        return (
          <g key={i}>
            <text x={x} y={y + 12} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={36} fill={i === 29 ? C.red : "#5A6B88"}>{i + 1}</text>
            {i === 29 && <circle cx={x} cy={y} r={44} fill="none" stroke={C.red} strokeWidth={10} strokeDasharray={280} strokeDashoffset={280 * (1 - r)} />}
          </g>
        );
      })}
    </g>
  );
};

const Hourglass: React.FC<{ f: number }> = ({ f }) => {
  const k = (f % 60) / 60;
  return (
    <g>
      <rect x={-80} y={-110} width={160} height={18} rx={8} fill={C.amber} />
      <rect x={-80} y={92} width={160} height={18} rx={8} fill={C.amber} />
      <path d="M -60 -92 L 60 -92 L 8 0 L 60 92 L -60 92 L -8 0 Z" fill="#BFE3FF" opacity={0.35} stroke={C.gray} strokeWidth={5} />
      <path d={`M ${-50 + 30 * k} ${-80 + 70 * k} L ${50 - 30 * k} ${-80 + 70 * k} L 4 -4 L -4 -4 Z`} fill={C.amber} />
      <path d={`M -50 88 L 50 88 L ${20 - 10 * k} ${70 - 50 * k} L ${-20 + 10 * k} ${70 - 50 * k} Z`} fill={C.amber} />
    </g>
  );
};

export const Short23: React.FC<{ end: "yt" | "tt" }> = ({ end }) => {
  const f = useCurrentFrame();
  const b1 = ps("b1"), b2 = ps("b2") - 4, b3 = ps("b3") - 4, b4 = ps("b4") - 4, fE = ps(end) - 8;
  const b1b = wk("b1", "auch") - 4, b3b = wk("b3", "muss") - 4, loop = wk("b4", "also") - 4;
  const closeAt = wk(end, "groschenfall") - 4;
  const tHoch = wk("hook", "hoch") - 2, tRunter = wk("hook", "runter") - 2, tGleich = wk("hook", "gleich") - 2;

  const scenes = [
    {
      a: 0, b: b1, render: (f: number) => {
        const sp = (t: number) => interpolate(f, [t, t + 10], [0, 1], CL);
        const off = (t: number) => (t2: number) => sp(t) * (1 - sp(t2));
        const a1 = off(tHoch)(tRunter), a2 = off(tRunter)(tGleich), a3 = sp(tGleich);
        const anyA = f >= tHoch;
        const nums: [number, string, string, string, number][] = [
          [tHoch, "7,4 Mio.", "höher", C.red, 0], [tRunter, "5,1 Mio.", "niedriger", C.green, 1], [tGleich, "71 %", "gleich", C.blue, 2],
        ];
        return (
          <g>
            <Txt x={540} y={300} s={100}>Rauf, runter</Txt>
            <Txt x={540} y={410} s={100} c={C.amber}>oder gleich?</Txt>
            <Trio f={f} act={[a1, a2, a3]} dim={anyA ? [a1 < 0.5, a2 < 0.5, a3 < 0.5] : [false, false, false]} />
            {nums.map(([t, n, l, c, i]) => {
              const p = pop(f, t, 14);
              const x = 200 + i * 340;
              return f >= t ? (
                <g key={i} transform={`translate(${x} 1150) scale(${p})`} opacity={Math.min(1, p * 2)}>
                  <rect x={-160} y={-80} width={320} height={170} rx={24} fill={INK} opacity={0.85} stroke={c} strokeWidth={6} />
                  <text y={4} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={60} fill={C.amber}>{n}</text>
                  <text y={60} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={32} fill={c}>{l}</text>
                </g>
              ) : null;
            })}
            <Txt x={540} y={1340} s={32} c={C.gray} w={600} o={tw(f, tHoch, 10)}>Kfz-Haftpflicht, Typklassen 2027</Txt>
            <Src o={tw(f, tHoch, 10)}>Quelle: GDV, 30.09.2026</Src>
          </g>
        );
      },
    },
    {
      a: b1, b: b1b, render: (f: number) => (
        <g>
          <Txt x={540} y={330} s={84}>Typklasse hoch</Txt>
          <g transform="translate(320 760)"><Arrow up col={C.red} s={1.6} /></g>
          <g transform="translate(700 780)"><Car col="#C8494E" s={1.1} /></g>
          <Stamp f={f} at={wk("b1", "nicht") - 2} x={540} y={1020} text="≠ automatisch teurer" s={0.62} col={C.amber} rot={-5} />
          <g opacity={tw(f, wk("b1", "automatisch") + 6, 10)}>
            <Txt x={540} y={1210} s={36} c={C.gray} w={700}>Faustregel: teures Auto, teure Ersatzteile</Txt>
            <Txt x={540} y={1260} s={36} c={C.gray} w={700}>→ eher höhere Kasko-Typklasse</Txt>
          </g>
          <Src o={tw(f, b1 + 6, 10)}>Quelle: GDV, 30.09.2026</Src>
        </g>
      ),
    },
    {
      a: b1b, b: b2, render: (f: number) => {
        const r = tw(f, wk("b1", "region") - 4, 12), k = tw(f, wk("b1", "fahrleistung") - 4, 12);
        return (
          <g>
            <Txt x={540} y={330} s={84}>Nur ein Teil</Txt>
            <g transform="translate(540 640)"><Piece text="Typklasse" col={C.blue} /></g>
            <g transform={`translate(${lerp(-200, 360, r)} 860)`} opacity={r}><Piece text="Region" col={C.amber} /></g>
            <g transform={`translate(${lerp(1280, 720, k)} 860)`} opacity={k}><Piece text="Fahrleistung" col={C.green} /></g>
            <g transform="translate(540 1080)"><Piece text="…" col="#5A6B88" o={0.5 * k} /></g>
            <Txt x={540} y={1260} s={34} c={C.gray} w={600} o={tw(f, wk("b1", "zählen"), 10)}>Typklasse: unverbindlich für Versicherer</Txt>
          </g>
        );
      },
    },
    {
      a: b2, b: b3, render: (f: number) => (
        <g>
          <Txt x={540} y={330} s={84}>Selbst prüfen</Txt>
          <g transform={`translate(540 800) scale(${pop(f, b2 + 4, 14)})`}><Phone f={f} at={wk("b2", "typklasse") - 4} free={pop(f, wk("b2", "kostenlos") - 2, 14)} /></g>
          <Txt x={540} y={1260} s={34} c={C.gray} w={600} o={tw(f, wk("b2", "typklasse") + 10, 10)}>HSN/TSN aus dem Fahrzeugschein</Txt>
          <Src o={tw(f, b2 + 6, 10)}>Quelle: GDV</Src>
        </g>
      ),
    },
    {
      a: b3, b: b3b, render: (f: number) => {
        const v = pop(f, wk("b3", "vertrag") - 2, 14);
        return (
          <g>
            <Txt x={540} y={330} s={90}>Wechseln?</Txt>
            <Figure f={f} x={250} y={720} s={0.8} shirt={C.blue} look={6} />
            <g transform={`translate(700 800) rotate(4) scale(${v})`} opacity={Math.min(1, v * 2)}>
              <Letter title="Vertrag" col={C.blue} s={1.05} />
            </g>
            <g transform={`translate(700 1150) scale(${pop(f, wk("b3", "jahreswechsel") - 2, 14)})`}>
              <Pill w={560} text="Verlängerung 1.1." col={C.amber} s={50} h={110} />
            </g>
          </g>
        );
      },
    },
    {
      a: b3b, b: b4, render: (f: number) => {
        const fly = interpolate(f, [wk("b3", "kündigung") - 2, wk("b3", "versicherer")], [0, 1], CL);
        const inBox = interpolate(f, [wk("b3", "versicherer"), wk("b3", "versicherer") + 8], [1, 0], CL);
        return (
          <g>
            <Txt x={540} y={330} s={84}>Kündigen bis</Txt>
            <g transform="translate(310 700) scale(0.72)"><CalNov f={f} at={wk("b3", "dreißigsten") - 2} /></g>
            <g transform="translate(800 820) scale(0.85)"><Mailbox /></g>
            <g transform={`translate(${lerp(160, 790, fly)} ${lerp(1000, 700, fly) - 160 * Math.sin(fly * Math.PI)}) rotate(${lerp(-10, 0, fly)}) scale(${lerp(0.55, 0.3, fly)})`} opacity={inBox * tw(f, b3b, 8)}>
              <Letter title="Kündigung" col={C.red} />
            </g>
            <g transform={`translate(540 1150) scale(${pop(f, wk("b3", "versicherer") - 2, 14)})`}><Pill w={700} text="Eingang bis 30.11." col={C.red} fg={C.white} s={60} h={128} /></g>
            <Txt x={540} y={1290} s={32} c={C.gray} w={600} o={tw(f, wk("b3", "versicherer") + 8, 10)}>nur bei Verlängerung zum 1.1. – Vertrag prüfen</Txt>
            <Src o={tw(f, b3b + 6, 10)}>Quelle: Verbraucherzentrale, Stand 16.10.2025</Src>
          </g>
        );
      },
    },
    {
      a: b4, b: loop, kind: "zoom" as const, render: (f: number) => {
        const a = tw(f, wk("b4", "sonderkündigungsrecht") - 4, 12);
        const h = pop(f, wk("b4", "hinweis") - 2, 14);
        return (
          <g>
            <Txt x={540} y={330} s={84}>Beitrag erhöht?</Txt>
            <g transform={`translate(${lerp(540, 300, a)} 760) rotate(${lerp(0, -6, a)})`}><Letter title="Beitrag steigt" col={C.red} s={0.9} /></g>
            <g opacity={a} transform="translate(560 760)">
              <path d="M -50 0 L 50 0 M 50 0 L 10 -36 M 50 0 L 10 36" stroke={C.green} strokeWidth={14} strokeLinecap="round" fill="none" />
            </g>
            <g transform={`translate(800 760) scale(${h})`} opacity={Math.min(1, h * 2)}><Hourglass f={f} /></g>
            <Txt x={800} y={930} s={34} c={C.amber} w={700} o={tw(f, wk("b4", "hinweis"), 10)}>1 Monat ab Mitteilung</Txt>
            <g transform={`translate(540 1150) scale(${pop(f, wk("b4", "sonderkündigungsrecht") - 2, 14)})`}><Pill w={640} text="Sonderkündigung" col={C.green} s={60} h={128} /></g>
            <Src o={tw(f, b4 + 6, 10)}>Quelle: GDV / Die Versicherer, 21.08.2024</Src>
          </g>
        );
      },
    },
    {
      a: loop, b: fE - 10, render: (f: number) => (
        <g>
          <Txt x={540} y={300} s={100}>Welcher Fahrer</Txt>
          <Txt x={540} y={410} s={100} c={C.amber}>bist du?</Txt>
          <Trio f={f} />
        </g>
      ),
    },
  ];

  const hi = ["typklasse", "hoch", "runter", "gleich", "region", "fahrleistung", "kostenlos", "kündigung", "versicherer", "sonderkündigungsrecht", "mitteilung"];
  const cs = chunks(D.paras as any, ["hook", "b1", "b2", "b3", "b4"], [
    ["typklasse punkt de", "typklasse.de"], ["dreißigsten november", "30. November"],
  ]);
  const subEnd = pe("b4") + 8;
  const endIn = tw(f, fE, 16);

  const sfx: [number, string, number?][] = [
    [0, "soft", 0.7], [tHoch, "whoosh", 0.5], [tRunter, "whoosh", 0.5], [tGleich, "ding", 0.4],
    [b1 - 4, "whoosh", 0.7], [wk("b1", "nicht") - 2, "stamp", 0.5],
    [b1b - 2, "whoosh", 0.6], [wk("b1", "region") - 4, "paper", 0.4], [wk("b1", "fahrleistung") - 4, "paper", 0.4],
    [b2 - 4, "whoosh", 0.7], [wk("b2", "kostenlos") - 2, "ding", 0.5],
    [b3 - 4, "whoosh", 0.7], [b3b - 2, "whoosh", 0.6], [wk("b3", "dreißigsten") - 2, "paper", 0.5], [wk("b3", "versicherer"), "stamp", 0.4],
    [b4 - 4, "whoosh", 0.7], [wk("b4", "sonderkündigungsrecht") - 2, "marimba", 0.4],
    [loop, "whoosh", 0.6], [fE - 6, "whoosh", 0.8], [closeAt, "coins", 0.4],
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
              : <EndShare f={f} at={fE} who={["seine Autoversicherung", "nie gewechselt hat."]} closeAt={closeAt} />}
          </g>
        )}
      </svg>
      <Sub f={f} cs={cs} end={subEnd} hi={hi} />
      <Grain f={f} />
      <Audio src={staticFile(`audio/s23_${end}.wav`)} />
      <SfxTrack list={sfx} />
    </AbsoluteFill>
  );
};
export const Short23YT: React.FC = () => <Short23 end="yt" />;
export const Short23TT: React.FC = () => <Short23 end="tt" />;
