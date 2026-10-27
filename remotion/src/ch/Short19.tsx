/* Short 19 – Kartoffelernte 2026 ein Viertel kleiner, Erzeuger +61,5 %, Laden +11,3 %, TK-Pommes −4,7 % */
import React from "react";
import { AbsoluteFill, staticFile, useCurrentFrame } from "remotion";
import { Audio } from "@remotion/media";
import { Backdrop, Stripes } from "../kit/Stage";
import { Figure } from "../kit/Figure";
import { Arrow, C, CL, EndTT, EndYT, FONT, Grain, OUT, Pill, Scenes, Src, SfxTrack, Sub, Txt, W, H, chunks, interpolate, lerp, mk, pop, tw } from "./shortkit";
import D from "../data/s19.json";

const { wk, ps, pe, DUR } = mk(D as any);
export const S19_DUR = DUR;
const INK = "#0A111D";
const SRC = "Quelle: Statistisches Bundesamt, PM vom 15.10.2026";
const POT = "#C9A26B", POT2 = "#A97F4A";

const Potato: React.FC<{ x: number; y: number; r?: number; rot?: number }> = ({ x, y, r = 40, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <ellipse rx={r * 1.25} ry={r} fill={POT2} transform="translate(3 5)" />
    <ellipse rx={r * 1.25} ry={r} fill={POT} />
    <circle cx={-r * 0.4} cy={-r * 0.2} r={r * 0.09} fill={POT2} /><circle cx={r * 0.35} cy={r * 0.25} r={r * 0.08} fill={POT2} />
  </g>
);
/** Sack, fill 0..1 */
const Sack: React.FC<{ fill: number; s?: number }> = ({ fill, s = 1 }) => {
  const n = Math.round(9 * fill);
  const spots: [number, number][] = [[-80, 120], [0, 130], [80, 120], [-40, 60], [45, 65], [-90, 10], [0, 0], [90, 15], [-30, -55]];
  return (
    <g transform={`scale(${s})`}>
      <path d="M -150 -120 Q -190 60 -150 190 Q 0 230 150 190 Q 190 60 150 -120 Q 0 -90 -150 -120 Z" fill="#8C6A3E" />
      <path d="M -150 -120 Q 0 -150 150 -120 L 130 -160 Q 0 -190 -130 -160 Z" fill="#A9814F" />
      <g clipPath="url(#sackclip)">{spots.slice(0, n).map(([x, y], i) => <Potato key={i} x={x} y={y} r={34} rot={i * 37} />)}</g>
      <clipPath id="sackclip"><path d="M -145 -110 Q -180 60 -145 180 Q 0 220 145 180 Q 180 60 145 -110 Z" /></clipPath>
      <path d="M -150 -120 Q 0 -90 150 -120" stroke="#6B4F2C" strokeWidth={8} fill="none" />
    </g>
  );
};
/** Tiefkühlbeutel Pommes (generisch) */
const FryBag: React.FC<{ s?: number }> = ({ s = 1 }) => (
  <g transform={`scale(${s})`}>
    <path d="M -120 -170 L 120 -170 L 140 170 L -140 170 Z" fill="#3E7BD8" />
    <path d="M -120 -170 L 120 -170 L 124 -140 L -124 -140 Z" fill="#2C5FAF" />
    {[-70, -35, 0, 35, 70].map((x, i) => <rect key={i} x={x - 13} y={-110 + (i % 2) * 20} width={26} height={150} rx={8} fill="#F2C94C" transform={`rotate(${(i - 2) * 6} ${x} 0)`} />)}
    <rect x={-110} y={70} width={220} height={70} rx={14} fill={C.white} />
    <text y={118} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={40} fill="#2C5FAF">POMMES</text>
    {[[-90, -150], [80, 40], [-60, 150]].map(([x, y], i) => <text key={i} x={x} y={y} fontSize={34} fill={C.white} opacity={0.8} fontFamily={FONT}>❄</text>)}
  </g>
);
const Sun: React.FC<{ f: number; s?: number }> = ({ f, s = 1 }) => (
  <g transform={`scale(${s}) rotate(${f * 0.8})`}>
    {Array.from({ length: 12 }).map((_, i) => <rect key={i} x={-8} y={-130} width={16} height={40} rx={8} fill={C.amber} transform={`rotate(${i * 30})`} />)}
    <circle r={80} fill={C.amber} />
  </g>
);

export const Short19: React.FC<{ end: "yt" | "tt" }> = ({ end }) => {
  const f = useCurrentFrame();
  const TOT = DUR[end];
  const b1 = ps("b1"), b1b = wk("b1", "weniger") - 6;
  const b2 = ps("b2") - 4, b2b = wk("b2", "aber") - 6;
  const b3 = ps("b3") - 4, b3b = wk("b3", "tiefgekühlte") - 6;
  const b4 = ps("b4") - 4, fE = ps(end) - 8;

  const scenes = [
    {
      a: 0, b: b1, render: (f: number) => {
        const ar = tw(f, wk("hook", "billiger") - 4, 12);
        return (
          <g>
            <Txt x={540} y={330} s={100}>Ernte −25 %</Txt>
            <Txt x={540} y={445} s={96} c={C.amber}>TK-Pommes?</Txt>
            <g transform="translate(300 960)"><Sack fill={0.55} s={1.25} /></g>
            <Txt x={300} y={1260} s={42} c={C.gray} w={700}>Kartoffelernte</Txt>
            <g transform="translate(790 940)"><FryBag s={1.05} /></g>
            <g transform={`translate(960 ${lerp(820, 900, ar)})`} opacity={ar}><Arrow up={false} col={C.green} s={1.2} /></g>
            <Txt x={790} y={1260} s={42} c={C.gray} w={700}>Tiefkühl-Pommes</Txt>
            <Src o={tw(f, 8, 12)}>{SRC}</Src>
          </g>
        );
      },
    },
    {
      a: b1, b: b1b, render: (f: number) => {
        const g = interpolate(f, [b1 + 6, b1 + 26], [0, 1], { ...CL, easing: OUT });
        const g2 = interpolate(f, [wk("b1", "zehn") - 4, wk("b1", "zehn") + 16], [0, 1], { ...CL, easing: OUT });
        const base = 1250, k = 48;
        return (
          <g>
            <Txt x={540} y={340} s={86}>Kartoffelernte</Txt>
            <Txt x={540} y={430} s={44} c={C.gray} w={700}>in Millionen Tonnen</Txt>
            <line x1={160} y1={base} x2={920} y2={base} stroke="#2A3F63" strokeWidth={8} strokeLinecap="round" />
            <rect x={230} y={base - 13.9 * k * g} width={260} height={13.9 * k * g} rx={18} fill={C.blue} />
            <rect x={590} y={base - 10.4 * k * g2} width={260} height={10.4 * k * g2} rx={18} fill={C.amber} />
            <Txt x={360} y={base - 13.9 * k * g - 30} s={70} o={g}>13,9</Txt>
            <Txt x={720} y={base - 10.4 * k * g2 - 30} s={70} o={g2}>10,4</Txt>
            <Txt x={360} y={base + 70} s={46} c={C.gray} w={700}>2025</Txt>
            <Txt x={720} y={base + 70} s={46} c={C.gray} w={700}>2026*</Txt>
            <Txt x={540} y={base + 160} s={34} c={C.gray} w={600} o={g2}>* erwartet</Txt>
            <Src o={tw(f, b1 + 6, 10)}>{SRC}</Src>
          </g>
        );
      },
    },
    {
      a: b1b, b: b2, kind: "zoom" as const, render: (f: number) => {
        const sh = interpolate(f, [b1b + 6, b1b + 30], [1, 0.89], { ...CL, easing: OUT });
        const sn = tw(f, wk("b1", "hitze") - 6, 14);
        return (
          <g>
            <Txt x={540} y={340} s={86}>Zwei Gründe</Txt>
            <g transform="translate(540 760)">
              <rect x={-330 * sh} y={-150 * sh} width={660 * sh} height={300 * sh} rx={20} fill="#3D6B3A" />
              {Array.from({ length: 6 }).map((_, i) => <line key={i} x1={-320 * sh} x2={320 * sh} y1={(-125 + i * 50) * sh} y2={(-125 + i * 50) * sh} stroke="#2E5430" strokeWidth={10} />)}
            </g>
            <Txt x={540} y={990} s={56} w={800}>Fläche −11 %</Txt>
            <g transform="translate(300 1210)" opacity={sn}><Sun f={f} s={0.8} /></g>
            <Txt x={680} y={1190} s={52} o={sn}>Ertrag pro ha</Txt>
            <Txt x={680} y={1260} s={60} c={C.amber} o={sn}>−15 %</Txt>
            <Txt x={540} y={1360} s={36} c={C.gray} w={600} o={sn}>vor allem Hitze und Trockenheit</Txt>
          </g>
        );
      },
    },
    {
      a: b2, b: b2b, render: (f: number) => {
        const p = pop(f, wk("b2", "einundsechzig") - 2, 14);
        return (
          <g>
            <Txt x={540} y={340} s={86}>Beim Bauern</Txt>
            <Txt x={540} y={430} s={42} c={C.gray} w={700}>Erzeugerpreis Speisekartoffeln, August</Txt>
            <Figure f={f} x={300} y={780} s={1.3} shirt="#3D6B3A" sleeve="#5B8F57" hair="#6B4F2C" smileAt={wk("b2", "einundsechzig")} />
            <g transform="translate(300 1110)"><Sack fill={0.5} s={0.6} /></g>
            <g transform={`translate(750 900) scale(${p})`} opacity={Math.min(1, p * 2)}>
              <Arrow up col={C.green} s={1.4} />
              <text y={230} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={110} fill={C.green}>+61,5 %</text>
              <text y={300} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={38} fill={C.gray}>zum Vorjahr</text>
            </g>
            <Src o={tw(f, b2 + 6, 10)}>{SRC}</Src>
          </g>
        );
      },
    },
    {
      a: b2b, b: b3, render: (f: number) => {
        const pts: [number, number, string, string][] = [[220, 100, "Aug. 2024", "100"], [540, 47.5, "Aug. 2025", "47,5"], [860, 76.7, "Aug. 2026", "76,7"]];
        const Y = (v: number) => 1240 - v * 6.2;
        const l1 = tw(f, b2b + 8, 18), l2 = tw(f, b2b + 30, 18);
        return (
          <g>
            <Txt x={540} y={340} s={86}>Erst der Absturz</Txt>
            <Txt x={540} y={430} s={42} c={C.gray} w={700}>Erzeugerpreis, August 2024 = 100</Txt>
            <line x1={pts[0][0]} y1={Y(100)} x2={lerp(pts[0][0], pts[1][0], l1)} y2={lerp(Y(100), Y(47.5), l1)} stroke={C.red} strokeWidth={14} strokeLinecap="round" />
            <line x1={pts[1][0]} y1={Y(47.5)} x2={lerp(pts[1][0], pts[2][0], l2)} y2={lerp(Y(47.5), Y(76.7), l2)} stroke={C.green} strokeWidth={14} strokeLinecap="round" opacity={l2 > 0 ? 1 : 0} />
            <line x1={160} y1={Y(100)} x2={920} y2={Y(100)} stroke={C.mute} strokeWidth={4} strokeDasharray="14 12" />
            {pts.map(([x, v, lab, t], i) => {
              const o = i === 0 ? 1 : i === 1 ? l1 : l2;
              return (
                <g key={i} opacity={o}>
                  <circle cx={x} cy={Y(v)} r={22} fill={C.white} />
                  <text x={x} y={Y(v) - 44} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={52} fill={C.white}>{t}</text>
                  <text x={x} y={1340} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={36} fill={C.gray}>{lab}</text>
                </g>
              );
            })}
            <Txt x={290} y={Y(42)} s={50} c={C.red} o={l1}>−52,5 %</Txt>
            <Txt x={700} y={Y(40)} s={50} c={C.green} o={l2}>+61,5 %</Txt>
            <Txt x={540} y={490} s={30} c={C.gray} w={600} o={l2}>Index aus beiden Destatis-Raten gerechnet</Txt>
          </g>
        );
      },
    },
    {
      a: b3, b: b3b, render: (f: number) => {
        const p = pop(f, wk("b3", "elf") - 2, 14);
        return (
          <g>
            <Txt x={540} y={340} s={86}>Im Laden</Txt>
            <Txt x={540} y={430} s={42} c={C.gray} w={700}>Verbraucherpreis Kartoffeln, September</Txt>
            <g transform="translate(540 820)">
              <rect x={-360} y={40} width={720} height={60} rx={12} fill="#5A6B88" />
              {[-200, -90, 30, 150, 250, -140, -20, 100, 200].map((x, i) => <Potato key={i} x={x} y={i < 5 ? 10 : -50} r={42} rot={i * 33} />)}
            </g>
            <g transform={`translate(540 1110) scale(${p})`} opacity={Math.min(1, p * 2)}><Pill w={480} text="+11,3 %" col={C.amber} s={80} h={140} /></g>
            <Src o={tw(f, b3 + 6, 10)}>{SRC}</Src>
          </g>
        );
      },
    },
    {
      a: b3b, b: b4, kind: "zoom" as const, render: (f: number) => {
        const p = pop(f, wk("b3", "vier") - 2, 14);
        return (
          <g>
            <Txt x={540} y={340} s={86}>Tiefkühl-Pommes</Txt>
            <Txt x={540} y={430} s={42} c={C.gray} w={700}>Verbraucherpreis, September</Txt>
            <g transform="translate(380 880)"><FryBag s={1.15} /></g>
            <g transform={`translate(800 860) scale(${p})`} opacity={Math.min(1, p * 2)}>
              <Arrow up={false} col={C.green} s={1.3} />
              <text y={230} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={100} fill={C.green}>−4,7 %</text>
            </g>
            <Src o={tw(f, b3b + 6, 10)}>{SRC}</Src>
          </g>
        );
      },
    },
    {
      a: b4, b: fE - 10, render: (f: number) => {
        const q = pop(f, wk("b4", "verrät") - 2, 16);
        return (
          <g>
            <Txt x={540} y={340} s={86}>Feld vs. Laden</Txt>
            <g transform="translate(300 760)"><Pill w={430} text="Feld +61,5 %" col={C.green} s={58} h={130} /></g>
            <g transform="translate(780 760)"><Pill w={430} text="Laden +11,3 %" col={C.amber} s={58} h={130} /></g>
            <g transform={`translate(540 1060) scale(${q})`} opacity={Math.min(1, q * 2)}>
              <circle r={150} fill="#1E3150" stroke={C.blue} strokeWidth={8} />
              <text y={60} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={180} fill={C.blue}>?</text>
            </g>
            <Txt x={540} y={1300} s={50} o={q}>Warum? Offen.</Txt>
          </g>
        );
      },
    },
  ];

  const hi = ["viertel", "pommes", "tonnen", "fläche", "hitze", "bauer", "riesig", "hälfte", "laden", "weniger", "statistik"];
  const cs = chunks(D.paras as any, ["hook", "b1", "b2", "b3", "b4", ...(end === "tt" ? ["tt"] : [])], [
    ["zehn komma vier millionen tonnen", "10,4 Mio. Tonnen"], ["einundsechzig komma fünf prozent", "61,5 %"],
    ["elf komma drei prozent", "11,3 %"], ["vier komma sieben prozent", "4,7 %"],
  ]);
  const subEnd = end === "tt" ? TOT - 6 : pe("b4") + 8;
  const endIn = tw(f, fE, 16);

  const sfx: [number, string, number?][] = [
    [2, "soft", 0.6], [wk("hook", "billiger") - 4, "marimba", 0.5],
    [b1 - 4, "whoosh", 0.7], [wk("b1", "zehn") - 4, "ding", 0.5], [b1b - 4, "whoosh", 0.6], [wk("b1", "hitze") - 6, "soft", 0.5],
    [b2 - 4, "whoosh", 0.7], [wk("b2", "einundsechzig") - 2, "coins", 0.5], [b2b - 4, "whoosh", 0.6], [b2b + 30, "soft", 0.5],
    [b3 - 4, "whoosh", 0.7], [wk("b3", "elf") - 2, "ding", 0.5], [b3b - 4, "whoosh", 0.6], [wk("b3", "vier") - 2, "soft", 0.6],
    [b4 - 4, "whoosh", 0.7], [wk("b4", "verrät") - 2, "marimba", 0.4], [fE - 6, "whoosh", 0.8],
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
              ? <EndYT f={f} at={fE} line="Preise, die nicht zusammenpassen" />
              : <EndTT f={f} at={fE} q={["Kartoffeln oder", "Tiefkühl-Pommes?"]} opts={[["Kartoffeln", C.amber], ["Pommes", C.blue], ["Beides", C.green]]} />}
          </g>
        )}
      </svg>
      <Sub f={f} cs={cs} end={subEnd} hi={hi} />
      <Grain f={f} />
      <Audio src={staticFile(`audio/s19_${end}.wav`)} />
      <SfxTrack list={sfx} />
    </AbsoluteFill>
  );
};
export const Short19YT: React.FC = () => <Short19 end="yt" />;
export const Short19TT: React.FC = () => <Short19 end="tt" />;
