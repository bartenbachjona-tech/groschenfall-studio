/* Short 17 – Mindestlohn 14,60 € ab 2027 im Vergleich: pro Stunde NL vorn, pro Monat DE Platz 3 in der EU */
import React from "react";
import { AbsoluteFill, staticFile, useCurrentFrame } from "remotion";
import { Audio } from "@remotion/media";
import { Backdrop, Stripes } from "../kit/Stage";
import { Stamp } from "../kit/Props";
import { C, CL, EndTT, EndYT, FONT, Grain, OUT, Pill, Scenes, Src, SfxTrack, Sub, Txt, W, H, chunks, interpolate, lerp, mk, pop, tw } from "./shortkit";
import D from "../data/s17.json";

const { wk, ps, pe, DUR } = mk(D as any);
export const S17_DUR = DUR;
const INK = "#0A111D";
const SRCDE = "Quelle: Mindestlohnanpassungsverordnung (MiLoV5)";
const SRCEU = "Quelle: Destatis/Eurostat, Stand 15.09.2026";

/* ---------- Flaggen (Länderfarben, keine Logos) ---------- */
type Cc = "FR" | "NL" | "DE" | "LU" | "IE";
const FLAG: Record<Cc, { dir: "v" | "h"; c: string[] }> = {
  FR: { dir: "v", c: ["#2A4BA0", "#F3F6FA", "#E1394B"] },
  NL: { dir: "h", c: ["#C8323C", "#F3F6FA", "#2A4BA0"] },
  DE: { dir: "h", c: ["#1A1A1A", "#D7262E", "#F2C230"] },
  LU: { dir: "h", c: ["#E1394B", "#F3F6FA", "#3FA9E0"] },
  IE: { dir: "v", c: ["#2E9E5B", "#F3F6FA", "#F28C28"] },
};
const Flag: React.FC<{ cc: Cc; w?: number }> = ({ cc, w = 180 }) => {
  const h = w * 0.66, { dir, c } = FLAG[cc];
  return (
    <g>
      <rect x={-w / 2 + 5} y={-h / 2 + 7} width={w} height={h} rx={12} fill={INK} opacity={0.35} />
      <clipPath id={`fc${cc}${w}`}><rect x={-w / 2} y={-h / 2} width={w} height={h} rx={12} /></clipPath>
      <g clipPath={`url(#fc${cc}${w})`}>
        {c.map((col, i) => dir === "v"
          ? <rect key={i} x={-w / 2 + (i * w) / 3} y={-h / 2} width={w / 3 + 1} height={h} fill={col} />
          : <rect key={i} x={-w / 2} y={-h / 2 + (i * h) / 3} width={w} height={h / 3 + 1} fill={col} />)}
      </g>
    </g>
  );
};
/** Lohnschild mit Flagge oben; flip 0..1 dreht das Schild um */
const Sign: React.FC<{ cc: Cc; v: string; lab: string; col?: string; flip?: number; sub?: string }> = ({ cc, v, lab, col = C.white, flip = 1, sub }) => (
  <g>
    <rect x={-8} y={-30} width={16} height={330} rx={8} fill="#5A6B88" />
    <g transform={`scale(${Math.max(0.02, Math.abs(Math.cos((1 - flip) * Math.PI)))} 1)`}>
      <rect x={-150} y={-190} width={300} height={200} rx={24} fill={INK} stroke={flip > 0.5 ? col : "#5A6B88"} strokeWidth={6} />
      {flip > 0.5
        ? <text y={-58} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={v.length > 6 ? 62 : 76} fill={col}>{v}</text>
        : <text y={-50} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={110} fill={C.gray}>?</text>}
      {sub && flip > 0.5 && <text y={-14} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={26} fill={C.gray}>{sub}</text>}
    </g>
    <g transform="translate(0 -260)"><Flag cc={cc} w={150} /></g>
    <text y={350} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={44} fill={C.gray}>{lab}</text>
  </g>
);
/** Uhr */
const Clock: React.FC<{ f: number; s?: number }> = ({ f, s = 1 }) => (
  <g transform={`scale(${s})`}>
    <circle r={110} fill={C.white} stroke={C.blue} strokeWidth={12} />
    {Array.from({ length: 12 }).map((_, i) => <rect key={i} x={-4} y={-96} width={8} height={18} rx={4} fill={INK} transform={`rotate(${i * 30})`} />)}
    <rect x={-6} y={-70} width={12} height={74} rx={6} fill={INK} transform={`rotate(${f * 6})`} />
    <rect x={-5} y={-50} width={10} height={54} rx={5} fill={C.amber} transform={`rotate(${f * 0.6})`} />
    <circle r={12} fill={INK} />
  </g>
);

export const Short17: React.FC<{ end: "yt" | "tt" }> = ({ end }) => {
  const f = useCurrentFrame();
  const TOT = DUR[end];
  const b1 = ps("b1"), b1b = wk("b1", "ab") - 6;
  const b2 = ps("b2") - 4;
  const b3 = ps("b3") - 4, b3b = wk("b3", "=die") - 6;
  const b4 = ps("b4") - 4, b4b = wk("b4", "was") - 6, fE = ps(end) - 8;

  const scenes = [
    {
      // Titelbild: drei Länderschilder, deutsches noch verdeckt
      a: 0, b: b1, render: (f: number) => {
        const s1 = 1, s2 = 1, s3 = 1 + 0.08 * Math.sin(Math.max(0, f - wk("hook", "wir") + 4) / 3) * Math.exp(-Math.max(0, f - wk("hook", "wir") + 4) / 12) * (f > wk("hook", "wir") - 4 ? 1 : 0);
        return (
          <g>
            <Txt x={540} y={330} s={100}>Frankreich: 12,31 €.</Txt>
            <Txt x={540} y={450} s={110} c={C.amber}>Wir?</Txt>
            <Txt x={540} y={520} s={40} c={C.gray} w={600}>Mindestlohn pro Stunde, brutto</Txt>
            <g transform={`translate(190 960) scale(${s1 * 0.95})`} opacity={Math.min(1, s1 * 2)}><Sign cc="FR" v="12,31 €" lab="Frankreich" col={C.blue} /></g>
            <g transform={`translate(540 960) scale(${s3 * 0.95})`} opacity={Math.min(1, s3 * 2)}><Sign cc="DE" v="" lab="Deutschland" flip={0} /></g>
            <g transform={`translate(890 960) scale(${s2 * 0.95})`} opacity={Math.min(1, s2 * 2)}><Sign cc="NL" v="14,99 €" lab="Niederlande" col={C.green} /></g>
            <Src o={tw(f, 8, 12)}>Quellen: service-public.gouv.fr · rijksoverheid.nl</Src>
          </g>
        );
      },
    },
    {
      a: b1, b: b1b, render: (f: number) => (
        <g>
          <Txt x={540} y={340} s={90}>Bei uns heute</Txt>
          <g transform="translate(540 960) scale(1.5)"><Sign cc="DE" v="13,90 €" lab="" col={C.white} flip={interpolate(f, [b1 + 2, b1 + 16], [0, 1], { ...CL, easing: OUT })} /></g>
          <Txt x={540} y={1340} s={44} c={C.gray} w={700}>pro Stunde, seit 1.1.2026</Txt>
          <Src o={tw(f, b1 + 6, 10)}>{SRCDE}</Src>
        </g>
      ),
    },
    {
      a: b1b, b: b2, kind: "zoom" as const, render: (f: number) => {
        const fl = interpolate(f, [wk("b1", "vierzehn") - 4, wk("b1", "vierzehn") + 10], [0, 1], { ...CL, easing: OUT });
        return (
          <g>
            <Txt x={540} y={340} s={90}>Ab Januar</Txt>
            <g transform="translate(540 960) scale(1.5)"><Sign cc="DE" v={fl > 0.5 ? "14,60 €" : "13,90 €"} lab="" col={C.amber} flip={fl > 0.5 ? fl : 1 - fl} /></g>
            <Stamp f={f} at={wk("b1", "verordnung") - 2} x={540} y={1300} text="beschlossen" s={0.7} col={C.green} />
            <Src o={tw(f, b1b + 6, 10)}>{SRCDE}</Src>
          </g>
        );
      },
    },
    {
      a: b2, b: b3, render: (f: number) => {
        const g = interpolate(f, [b2 + 6, b2 + 30], [0, 1], { ...CL, easing: OUT });
        const base = 1230, k = 200;
        const hDE = (14.6 - 12) * k * g, hNL = (14.99 - 12) * k * g;
        return (
          <g>
            <Txt x={540} y={340} s={90}>Pro Stunde</Txt>
            <Txt x={540} y={430} s={52} c={C.green} o={tw(f, wk("b2", "vorn") - 4, 10)}>Niederlande vorn</Txt>
            <line x1={160} y1={base} x2={920} y2={base} stroke="#2A3F63" strokeWidth={8} strokeLinecap="round" />
            <rect x={230} y={base - hDE} width={260} height={hDE} rx={18} fill={C.amber} />
            <rect x={590} y={base - hNL} width={260} height={hNL} rx={18} fill={C.green} />
            <Txt x={360} y={base - hDE - 30} s={62} o={g}>14,60 €</Txt>
            <Txt x={720} y={base - hNL - 30} s={62} o={g}>14,99 €</Txt>
            <g transform={`translate(360 ${base + 70})`}><Flag cc="DE" w={110} /></g>
            <g transform={`translate(720 ${base + 70})`}><Flag cc="NL" w={110} /></g>
            <Txt x={360} y={base + 170} s={36} c={C.gray} w={600}>ab Januar</Txt>
            <Txt x={720} y={base + 170} s={36} c={C.gray} w={600}>Stand heute, ab 21 J.</Txt>
            <Txt x={540} y={495} s={32} c={C.gray} w={600} o={g}>Achse ab 12 €</Txt>
          </g>
        );
      },
    },
    {
      a: b3, b: b3b, render: (f: number) => {
        const rows: [Cc, string, string, string][] = [["LU", "1", "Luxemburg", "2.771 €"], ["IE", "2", "Irland", "2.391 €"], ["DE", "3", "Deutschland", "2.343 €"], ["NL", "4", "Niederlande", "2.338 €"]];
        const at = [b3 + 8, b3 + 14, b3 + 20, b3 + 26]; const hl = tw(f, wk("b3", "platz") - 4, 10);
        return (
          <g>
            <Txt x={540} y={340} s={90}>Pro Monat</Txt>
            <Txt x={540} y={425} s={44} c={C.gray} w={700}>EU, Stand heute (13,90 €)</Txt>
            {rows.map(([cc, n, name, v], i) => {
              const p = pop(f, at[i], 14), de = cc === "DE";
              return (
                <g key={i} transform={`translate(540 ${610 + i * 180}) scale(${p})`} opacity={Math.min(1, p * 2)}>
                  <rect x={-430} y={-70} width={860} height={140} rx={24} fill={de ? "#2A3F63" : INK} stroke={de ? (hl > 0.5 ? C.amber : "#5A6B88") : "#2A3F63"} strokeWidth={6} />
                  <text x={-380} y={22} fontFamily={FONT} fontWeight={800} fontSize={64} fill={de ? C.amber : C.gray}>{n}</text>
                  <g transform="translate(-250 0)"><Flag cc={cc} w={96} /></g>
                  <text x={-180} y={20} fontFamily={FONT} fontWeight={800} fontSize={50} fill={C.white}>{name}</text>
                  <text x={400} y={20} textAnchor="end" fontFamily={FONT} fontWeight={800} fontSize={54} fill={de ? C.amber : C.white}>{v}</text>
                </g>
              );
            })}
            <Src o={tw(f, b3 + 6, 10)}>{SRCEU}</Src>
          </g>
        );
      },
    },
    {
      a: b3b, b: b4, render: (f: number) => {
        const g = interpolate(f, [b3b + 6, b3b + 30], [0, 1], { ...CL, easing: OUT });
        return (
          <g>
            <Txt x={540} y={340} s={84}>Weniger Stunden</Txt>
            <Txt x={540} y={430} s={52} c={C.gray} w={700}>pro Monat gerechnet</Txt>
            <g transform="translate(540 720)"><Clock f={f} s={1.2} /></g>
            <rect x={300} y={960} width={560 * g} height={90} rx={20} fill={C.amber} />
            <rect x={300} y={1100} width={500 * g} height={90} rx={20} fill={C.green} />
            <g transform="translate(220 1005)"><Flag cc="DE" w={100} /></g>
            <g transform="translate(220 1145)"><Flag cc="NL" w={100} /></g>
            <Txt x={540} y={1300} s={46} w={700} o={g}>Stunde vorn ≠ Monat vorn</Txt>
          </g>
        );
      },
    },
    {
      a: b4, b: b4b, render: (f: number) => {
        const p = pop(f, b4 + 8, 14), q = pop(f, wk("b4", "hundertachtzehn") - 2, 14);
        return (
          <g>
            <Txt x={540} y={340} s={90}>Vollzeit ab Januar</Txt>
            <Txt x={540} y={430} s={44} c={C.gray} w={700}>rechnerisch, brutto im Monat</Txt>
            <g transform={`translate(540 760) scale(${p})`} opacity={Math.min(1, p * 2)}>
              <rect x={-380} y={-130} width={760} height={260} rx={34} fill={INK} stroke={C.amber} strokeWidth={8} />
              <text y={50} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={150} fill={C.amber}>≈ 2.460 €</text>
            </g>
            <g transform={`translate(540 1080) scale(${q})`} opacity={Math.min(1, q * 2)}><Pill w={420} text="+118 €" col={C.green} s={72} h={130} /></g>
            <Txt x={540} y={1260} s={36} c={C.gray} w={600}>14,60 € × 168,6 Std. (Destatis-Methode)</Txt>
          </g>
        );
      },
    },
    {
      a: b4b, b: fE - 10, render: (f: number) => (
        <g>
          <Txt x={540} y={330} s={92}>Und die Nachbarn</Txt>
          <Txt x={540} y={440} s={92} c={C.amber}>2027?</Txt>
          <g transform="translate(190 960) scale(0.95)"><Sign cc="FR" v="" lab="Frankreich" flip={0} /></g>
          <g transform="translate(540 960) scale(0.95)"><Sign cc="DE" v="14,60 €" lab="Deutschland" col={C.amber} /></g>
          <g transform="translate(890 960) scale(0.95)"><Sign cc="NL" v="" lab="Niederlande" flip={0} /></g>
          <Txt x={540} y={1370} s={40} c={C.gray} w={600}>noch nicht festgelegt</Txt>
        </g>
      ),
    },
  ];

  const hi = ["frankreich", "niederlanden", "wir", "stunde", "januar", "beschlossen", "vorn", "monat", "platz", "luxemburg", "irland", "stunden", "vollzeit", "nachbarn"];
  const cs = chunks(D.paras as any, ["hook", "b1", "b2", "b3", "b4", ...(end === "tt" ? ["tt"] : [])], [
    ["zwölf euro einunddreißig", "12,31 €"], ["fast fünfzehn", "fast 15"], ["dreizehn euro neunzig", "13,90 €"], ["vierzehn euro sechzig", "14,60 €"],
    ["vierzehn euro neunundneunzig", "14,99 €"], ["einundzwanzig jahren", "21 Jahren"], ["platz drei", "Platz 3"],
    ["zweitausendvierhundertsechzig euro", "2.460 €"], ["hundertachtzehn", "118"],
  ]);
  const subEnd = end === "tt" ? TOT - 6 : pe("b4") + 8;
  const endIn = tw(f, fE, 16);

  const sfx: [number, string, number?][] = [
    [2, "soft", 0.6], [wk("hook", "niederlanden") - 2, "soft", 0.6], [wk("hook", "wir") - 4, "marimba", 0.5],
    [b1 - 4, "whoosh", 0.7], [b1 + 2, "paper", 0.5], [b1b - 4, "whoosh", 0.6], [wk("b1", "vierzehn") - 4, "ding", 0.5], [wk("b1", "verordnung") - 2, "stamp", 0.6],
    [b2 - 4, "whoosh", 0.7], [wk("b2", "vorn") - 4, "soft", 0.6],
    [b3 - 4, "whoosh", 0.7], [wk("b3", "luxemburg") - 4, "soft", 0.5], [wk("b3", "irland") - 4, "soft", 0.5], [wk("b3", "platz") - 4, "ding", 0.5], [wk("b3", "niederlanden") - 4, "soft", 0.5],
    [b3b - 4, "whoosh", 0.6], [b4 - 4, "whoosh", 0.7], [wk("b4", "zweitausendvierhundertsechzig") - 2, "coins", 0.6], [wk("b4", "hundertachtzehn") - 2, "ding", 0.5],
    [b4b - 4, "whoosh", 0.6], [fE - 6, "whoosh", 0.8],
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
              ? <EndYT f={f} at={fE} line="Wir vergleichen, sobald sie nachziehen." />
              : <EndTT f={f} at={fE} q={["Welches Land hättest", "du vorne vermutet?"]} opts={[["Deutschland", C.amber], ["Niederlande", C.green], ["Frankreich", C.blue]]} />}
          </g>
        )}
      </svg>
      <Sub f={f} cs={cs} end={subEnd} hi={hi} />
      <Grain f={f} />
      <Audio src={staticFile(`audio/s17_${end}.wav`)} />
      <SfxTrack list={sfx} />
    </AbsoluteFill>
  );
};
export const Short17YT: React.FC = () => <Short17 end="yt" />;
export const Short17TT: React.FC = () => <Short17 end="tt" />;
