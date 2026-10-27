/* Short 18 – Deutschlandticket 66,80 € ab 2027: Preis kommt jetzt aus einer Formel */
import React from "react";
import { AbsoluteFill, staticFile, useCurrentFrame } from "remotion";
import { Audio } from "@remotion/media";
import { Backdrop, Stripes } from "../kit/Stage";
import { Stamp } from "../kit/Props";
import { C, CL, EndTT, EndYT, FONT, Grain, OUT, Pill, Scenes, Src, SfxTrack, Sub, Txt, W, H, chunks, interpolate, lerp, mk, pop, tw } from "./shortkit";
import D from "../data/s18.json";

const { wk, ps, pe, DUR } = mk(D as any);
export const S18_DUR = DUR;
const INK = "#0A111D";
const SRC = "Quelle: Bayer. Verkehrsministerium (VMK-Vorsitz), 30.09.2026";

/** generische Ticketkarte (kein Logo) */
const Ticket: React.FC<{ v: string; col?: string; s?: number; dim?: boolean; year?: string }> = ({ v, col = C.white, s = 1, dim, year }) => (
  <g transform={`scale(${s})`} opacity={dim ? 0.55 : 1}>
    <rect x={-150} y={-95} width={300} height={190} rx={22} fill={INK} opacity={0.35} transform="translate(6 8)" />
    <rect x={-150} y={-95} width={300} height={190} rx={22} fill="#1E3150" stroke={col} strokeWidth={6} />
    <rect x={-150} y={-95} width={300} height={52} rx={22} fill={col} opacity={0.9} />
    <rect x={-150} y={-60} width={300} height={17} fill={col} opacity={0.9} />
    <text x={-128} y={-58} fontFamily={FONT} fontWeight={800} fontSize={30} fill={INK}>D-Ticket</text>
    {year && <text x={128} y={-58} textAnchor="end" fontFamily={FONT} fontWeight={700} fontSize={26} fill={INK}>{year}</text>}
    <text y={52} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={v.length > 6 ? 64 : v.length > 4 ? 74 : 92} fill={col}>{v}</text>
    <circle cx={-150} cy={0} r={16} fill={C.bg1} /><circle cx={150} cy={0} r={16} fill={C.bg1} />
  </g>
);

/** Treppe 49 → 58 → 63 → ? */
const STEPS: [string, string, number][] = [["49 €", "2023", 49], ["58 €", "2025", 58], ["63 €", "2026", 63], ["?", "2027", 66.8]];
const Stairs: React.FC<{ f: number; at: number[]; last?: string; lastCol?: string; s?: number; extra?: number }> = ({ f, at, last = "?", lastCol = C.amber, s = 1, extra = 0 }) => (
  <g transform={`scale(${s})`}>
    {STEPS.map(([v, y, n], i) => {
      const p = pop(f, at[i], 14);
      const x = 170 + i * 250, yy = 1300 - (n - 45) * 22;
      const top = 1300 - (n - 45) * 22 + 110;
      return (
        <g key={i} opacity={Math.min(1, p * 2)}>
          <rect x={x - 110} y={top} width={220} height={1460 - top} rx={14} fill={i === 3 ? "#3A2E1A" : "#22385C"} opacity={p} />
          <g transform={`translate(${x} ${lerp(yy + 60, yy, p)}) scale(${0.62 * p})`}>
            <Ticket v={i === 3 ? last : v} year={y} col={i === 3 ? lastCol : C.blue} />
          </g>
        </g>
      );
    })}
    {extra > 0 && (
      <g opacity={extra}>
        <rect x={170 + 4 * 250 - 110} y={1300 - (70.5 - 45) * 22 + 110} width={220} height={400} rx={14} fill="#3A2E1A" strokeDasharray="14 10" stroke={C.amber} strokeWidth={5} />
      </g>
    )}
  </g>
);

const Gear: React.FC<{ r: number; rot: number; col: string }> = ({ r, rot, col }) => (
  <g transform={`rotate(${rot})`}>
    {Array.from({ length: 10 }).map((_, i) => <rect key={i} x={-r * 0.16} y={-r * 1.18} width={r * 0.32} height={r * 0.4} rx={6} fill={col} transform={`rotate(${i * 36})`} />)}
    <circle r={r} fill={col} /><circle r={r * 0.38} fill={C.bg1} />
  </g>
);

export const Short18: React.FC<{ end: "yt" | "tt" }> = ({ end }) => {
  const f = useCurrentFrame();
  const TOT = DUR[end];
  const b1 = ps("b1"), b1b = wk("b1", "=und") - 6;
  const b2 = ps("b2") - 4, b3 = ps("b3") - 4, b3b = wk("b3", "neuen") - 8;
  const b4 = ps("b4") - 4, fE = ps(end) - 8;
  const hAt = [6, wk("hook", "achtundfünfzig") - 2, wk("hook", "dreiundsechzig") - 2, wk("hook", "deutschlandticket") - 2];

  const scenes = [
    {
      a: 0, b: b1, render: (f: number) => (
        <g>
          <Txt x={540} y={330} s={92}>Deutschlandticket</Txt>
          <Txt x={540} y={440} s={84} c={C.amber}>49 → 58 → 63 → ?</Txt>
          <Txt x={540} y={510} s={38} c={C.gray} w={600}>Preis pro Monat</Txt>
          <g transform="translate(0 -120)"><Stairs f={f} at={[-30, -30, -30, -30]} /></g>
        </g>
      ),
    },
    {
      a: b1, b: b1b, kind: "zoom" as const, render: (f: number) => {
        const fl = interpolate(f, [b1 + 2, b1 + 14], [0, 1], { ...CL, easing: OUT });
        const sx = Math.max(0.03, Math.abs(Math.cos((1 - fl) * Math.PI)));
        return (
          <g>
            <Txt x={540} y={340} s={90}>Ab Januar</Txt>
            <g transform={`translate(540 860) scale(${1.7 * sx} 1.7)`}><Ticket v={fl > 0.5 ? "66,80 €" : "?"} year="2027" col={C.amber} /></g>
            <g transform={`translate(540 1220) scale(${pop(f, wk("b1", "drei") - 2, 14)})`}><Pill w={420} text="+3,80 €" col={C.amber} s={72} h={130} /></g>
            <Src o={tw(f, b1 + 6, 10)}>{SRC}</Src>
          </g>
        );
      },
    },
    {
      a: b1b, b: b2, render: (f: number) => {
        const cross = tw(f, wk("b1", "keiner") - 2, 10);
        const m = tw(f, wk("b1", "formel") - 8, 14);
        return (
          <g>
            <Txt x={540} y={340} s={84}>Nicht verhandelt</Txt>
            <Txt x={540} y={440} s={84} c={C.green} o={m}>sondern berechnet</Txt>
            {/* Verhandlungstisch mit Sprechblasen */}
            <g opacity={1 - 0.6 * m}>
              <rect x={240} y={780} width={600} height={40} rx={20} fill="#5A6B88" />
              {[[330, 640], [750, 640]].map(([x, y], i) => (
                <g key={i}><rect x={x - 90} y={y - 70} width={180} height={110} rx={30} fill={C.white} /><text x={x} y={y + 12} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={60} fill={INK}>{i ? "70!" : "50!"}</text></g>
              ))}
              <line x1={240} y1={560} x2={840} y2={860} stroke={C.red} strokeWidth={18 * cross} strokeLinecap="round" />
            </g>
            {/* Formel-Maschine */}
            <g transform={`translate(540 1130) scale(${0.6 + 0.4 * m})`} opacity={m}>
              <rect x={-260} y={-130} width={520} height={260} rx={36} fill="#1E3150" stroke={C.green} strokeWidth={8} />
              <g transform="translate(-130 0)"><Gear r={62} rot={f * 3} col={C.green} /></g>
              <g transform="translate(20 -30)"><Gear r={44} rot={-f * 4.2} col={C.blue} /></g>
              <text x={150} y={30} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={80} fill={C.white}>=</text>
            </g>
          </g>
        );
      },
    },
    {
      a: b2, b: b3, render: (f: number) => {
        const rows: [string, number, string, string][] = [["Personal", 55, C.blue, "personal"], ["Energie", 20, C.amber, "energie"], ["allg. Kosten", 25, C.gray, "allgemeine"]];
        return (
          <g>
            <Txt x={540} y={340} s={90}>Die Formel</Txt>
            <Txt x={540} y={430} s={44} c={C.gray} w={700}>Gewichtung der Kosten</Txt>
            {rows.map(([n, v, c, key], i) => {
              const g = interpolate(f, [wk("b2", key) - 4, wk("b2", key) + 16], [0, 1], { ...CL, easing: OUT });
              const y = 640 + i * 230;
              return (
                <g key={i} opacity={Math.min(1, g * 3)}>
                  <text x={150} y={y} fontFamily={FONT} fontWeight={800} fontSize={54} fill={C.white}>{n}</text>
                  <rect x={150} y={y + 30} width={780} height={90} rx={22} fill="#1E3150" />
                  <rect x={150} y={y + 30} width={780 * (v / 55) * g} height={90} rx={22} fill={c} />
                  <text x={930} y={y} textAnchor="end" fontFamily={FONT} fontWeight={800} fontSize={64} fill={c}>{Math.round(v * g)} %</text>
                </g>
              );
            })}
            <Src o={tw(f, b2 + 6, 10)}>{SRC}</Src>
          </g>
        );
      },
    },
    {
      a: b3, b: b3b, render: (f: number) => {
        const x = tw(f, wk("b3", "preis") - 4, 10);
        return (
          <g>
            <Txt x={540} y={340} s={80}>Verkehrsminister, März</Txt>
            <g transform="translate(540 760)">
              <rect x={-330} y={-150} width={660} height={300} rx={30} fill="#1E3150" stroke={C.green} strokeWidth={8} />
              <g transform="translate(-170 0) scale(0.9)"><Gear r={70} rot={f * 2} col={C.green} /></g>
              <text x={60} y={26} fontFamily={FONT} fontWeight={800} fontSize={70} fill={C.white}>Formel</text>
            </g>
            <Stamp f={f} at={wk("b3", "beschlossen") - 2} x={540} y={1010} text="beschlossen" s={0.7} col={C.green} />
            <g transform="translate(540 1230)" opacity={tw(f, wk("b3", "nicht") - 4, 10)}>
              <rect x={-230} y={-80} width={460} height={160} rx={26} fill={INK} stroke="#5A6B88" strokeWidth={6} />
              <text y={26} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={70} fill={C.gray}>Preis</text>
              <line x1={-250} y1={-90} x2={250} y2={90} stroke={C.red} strokeWidth={16 * x} strokeLinecap="round" />
            </g>
          </g>
        );
      },
    },
    {
      a: b3b, b: b4, render: (f: number) => {
        const p = pop(f, b3b + 8, 14);
        return (
          <g>
            <Txt x={540} y={340} s={84}>Neuer Preis</Txt>
            <Txt x={540} y={440} s={84} c={C.amber}>jedes Jahr</Txt>
            <g transform={`translate(540 900) scale(${p})`} opacity={Math.min(1, p * 2)}>
              <rect x={-230} y={-230} width={460} height={460} rx={40} fill={C.white} />
              <rect x={-230} y={-230} width={460} height={120} rx={40} fill={C.amber} />
              <rect x={-230} y={-150} width={460} height={40} fill={C.amber} />
              <text y={-145} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={56} fill={INK}>September</text>
              <text y={140} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={230} fill={INK}>30</text>
            </g>
            <Txt x={540} y={1260} s={46} c={C.gray} w={700} o={tw(f, wk("b3", "dreißigsten") - 4, 10)}>spätestens, fürs Folgejahr</Txt>
            <Src o={tw(f, b3b + 6, 10)}>{SRC}</Src>
          </g>
        );
      },
    },
    {
      a: b4, b: fE - 10, render: (f: number) => {
        const br = tw(f, wk("b4", "drittel") - 6, 14);
        const ex = tw(f, wk("b4", "nächsten") - 4, 14);
        return (
          <g>
            <Txt x={540} y={330} s={86}>Seit dem Start</Txt>
            <Txt x={540} y={430} s={90} c={C.amber} o={br}>+36 %</Txt>
            <g transform="translate(-20 0) scale(0.8)">
              <Stairs f={f} at={[-30, -30, -30, -30]} last="66,80 €" extra={ex} />
              <g opacity={br}>
                <path d={`M 170 ${1300 - 4 * 22 - 70} L 170 ${1300 - 4 * 22 - 140} L 920 ${1300 - 21.8 * 22 - 140} L 920 ${1300 - 21.8 * 22 - 70}`} fill="none" stroke={C.amber} strokeWidth={8} strokeLinecap="round" strokeDasharray={1200} strokeDashoffset={1200 * (1 - br)} />
              </g>
            </g>
            <Txt x={540} y={1340} s={44} c={C.gray} w={700} o={ex}>Nächster Preis: bis 30.9.2027</Txt>
          </g>
        );
      },
    },
  ];

  const hi = ["deutschlandticket", "januar", "formel", "personal", "energie", "kosten", "beschlossen", "preis", "september", "drittel", "zahl"];
  const cs = chunks(D.paras as any, ["hook", "b1", "b2", "b3", "b4", ...(end === "tt" ? ["tt"] : [])], [
    ["neunundvierzig", "49"], ["achtundfünfzig", "58"], ["dreiundsechzig", "63"], ["sechsundsechzig euro achtzig", "66,80 €"], ["drei euro achtzig", "3,80 €"],
    ["fünfundfünfzig prozent", "55 %"], ["zwanzig", "20"], ["fünfundzwanzig", "25"], ["dreißigsten september", "30. September"],
  ]);
  const subEnd = end === "tt" ? TOT - 6 : pe("b4") + 8;
  const endIn = tw(f, fE, 16);

  const sfx: [number, string, number?][] = [
    [2, "soft", 0.6], [hAt[1], "soft", 0.5], [hAt[2], "soft", 0.5], [hAt[3], "marimba", 0.5],
    [b1 - 4, "whoosh", 0.7], [b1 + 2, "paper", 0.5], [wk("b1", "drei") - 2, "ding", 0.5], [b1b - 4, "whoosh", 0.6], [wk("b1", "keiner") - 2, "soft", 0.5], [wk("b1", "formel") - 6, "marimba", 0.5],
    [b2 - 4, "whoosh", 0.7], [wk("b2", "personal") - 4, "soft", 0.5], [wk("b2", "energie") - 4, "soft", 0.5], [wk("b2", "allgemeine") - 4, "soft", 0.5],
    [b3 - 4, "whoosh", 0.7], [wk("b3", "beschlossen") - 2, "stamp", 0.6], [b3b - 4, "whoosh", 0.6], [b3b + 8, "paper", 0.5],
    [b4 - 4, "whoosh", 0.7], [wk("b4", "drittel") - 4, "coins", 0.5], [wk("b4", "nächsten") - 4, "ding", 0.4], [fE - 6, "whoosh", 0.8],
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
              ? <EndYT f={f} at={fE} line="Folg für die nächste Zahl" />
              : <EndTT f={f} at={fE} q={["Lohnt sich das Ticket", "für dich noch?"]} opts={[["Ja, klar", C.green], ["Knapp", C.amber], ["Nicht mehr", C.red]]} />}
          </g>
        )}
      </svg>
      <Sub f={f} cs={cs} end={subEnd} hi={hi} />
      <Grain f={f} />
      <Audio src={staticFile(`audio/s18_${end}.wav`)} />
      <SfxTrack list={sfx} />
    </AbsoluteFill>
  );
};
export const Short18YT: React.FC = () => <Short18 end="yt" />;
export const Short18TT: React.FC = () => <Short18 end="tt" />;
