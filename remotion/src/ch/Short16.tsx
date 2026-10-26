/* Short 16 – Pflegebeitrag: Kinderlosen-Zuschlag soll 2027 von 0,6 auf 0,9 Punkte steigen (Kabinettsentwurf) */
import React from "react";
import { AbsoluteFill, Easing, staticFile, useCurrentFrame } from "remotion";
import { Audio } from "@remotion/media";
import { Backdrop, Stripes } from "../kit/Stage";
import { Coin } from "../kit/Props";
import { Figure } from "../kit/Figure";
import { C, CL, EndTT, EndYT, FONT, Grain, OUT, Pill, Scenes, Src, SfxTrack, Sub, Txt, W, H, chunks, interpolate, lerp, mk, pop, tw } from "./shortkit";
import D from "../data/s16.json";

const { wk, ps, pe, DUR } = mk(D as any);
export const S16_DUR = DUR;
const INK = "#0A111D", PINK = "#F4B8C8";
const SRCBMG = "Quelle: BMG, Kabinettsbeschluss 30.09.2026";
const FOOT = "Stand 26.10.2026, Gesetzentwurf. Keine Rechts- oder Steuerberatung.";

/* ---------- Requisiten ---------- */
/** Geburtstagskerze mit Zahl, Ursprung Boden */
const Candle: React.FC<{ f: number; n: string; s?: number }> = ({ f, n, s = 1 }) => {
  const fl = 1 + Math.sin(f / 3) * 0.08;
  return (
    <g transform={`scale(${s})`}>
      <ellipse cx={0} cy={-232} rx={22 * fl} ry={40 * fl} fill={C.amber} />
      <ellipse cx={0} cy={-226} rx={10} ry={20} fill="#FFF3C4" />
      <rect x={-4} y={-200} width={8} height={30} fill={INK} />
      <rect x={-110} y={-170} width={220} height={170} rx={20} fill={PINK} />
      <text y={-38} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={120} fill={INK}>{n}</text>
    </g>
  );
};
/** Spardose "Pflege" (Schlitz oben bei y=-210), Ursprung Boden */
const Box: React.FC<{ s?: number }> = ({ s = 1 }) => (
  <g transform={`scale(${s})`}>
    <ellipse cx={0} cy={8} rx={190} ry={22} fill={INK} opacity={0.35} />
    <rect x={-170} y={-210} width={340} height={210} rx={30} fill={C.blue} />
    <rect x={-170} y={-210} width={340} height={60} rx={30} fill="#A7C0FF" />
    <rect x={-70} y={-196} width={140} height={20} rx={10} fill={INK} />
    <text y={-62} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={60} fill={INK}>Pflege</text>
  </g>
);
/** Prozent-Säule */
const Col: React.FC<{ h: number; v: string; col: string; lab: string }> = ({ h, v, col, lab }) => (
  <g>
    <rect x={-120} y={-h} width={240} height={h} rx={20} fill={col} />
    <text y={-h - 30} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={90} fill={col}>{v}</text>
    <text y={70} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={44} fill={C.gray}>{lab}</text>
  </g>
);
/** stilisierter Plenarsaal (ohne Personen) */
const Plenum: React.FC<{ lit: number }> = ({ lit }) => (
  <g>
    {[0, 1, 2, 3].map((r) => {
      const R = 200 + r * 80, n = 9 + r * 3;
      return Array.from({ length: n }).map((_, i) => {
        const a = Math.PI + (Math.PI * (i + 0.5)) / n;
        const on = lit > (i + r * 7) / 45 ? 1 : 0;
        return <rect key={`${r}-${i}`} x={Math.cos(a) * R - 20} y={Math.sin(a) * R - 14} width={40} height={28} rx={8} fill={on ? C.blue : "#2A3F63"} />;
      });
    })}
    <rect x={-80} y={-70} width={160} height={110} rx={12} fill="#5A6B88" />
    <rect x={-390} y={60} width={780} height={14} rx={7} fill="#2A3F63" />
  </g>
);
/** Lohnzettel mit zwei Zeilen */
const Slip: React.FC<{ hl: number; zero: number }> = ({ hl, zero }) => (
  <g>
    <rect x={-380} y={-300} width={760} height={600} rx={24} fill={INK} opacity={0.35} transform="translate(8 12)" />
    <rect x={-380} y={-300} width={760} height={600} rx={24} fill={C.white} />
    <text x={-320} y={-210} fontFamily={FONT} fontWeight={800} fontSize={50} fill={INK}>Lohnzettel</text>
    {[-130, -50].map((y) => <rect key={y} x={-320} y={y} width={640} height={22} rx={11} fill="#D5DCE7" />)}
    <rect x={-340} y={10} width={680} height={110} rx={16} fill={C.amber} opacity={0.3 + 0.5 * hl} />
    <text x={-310} y={82} fontFamily={FONT} fontWeight={800} fontSize={42} fill={INK}>Zuschlag Kinderlose</text>
    <text x={310} y={82} textAnchor="end" fontFamily={FONT} fontWeight={800} fontSize={42} fill={INK}>du</text>
    <text x={-310} y={210} fontFamily={FONT} fontWeight={700} fontSize={42} fill="#5A6B88">Arbeitgeber</text>
    <text x={310} y={210} textAnchor="end" fontFamily={FONT} fontWeight={800} fontSize={54} fill={C.red} opacity={zero}>0 €</text>
  </g>
);
/** Gerichtsgebäude, Ursprung Boden Mitte */
const Court: React.FC = () => (
  <g>
    <path d="M-330 -380 L0 -520 L330 -380 Z" fill="#C9D3E2" />
    <rect x={-330} y={-380} width={660} height={40} fill="#9AA8BF" />
    {[-260, -130, 0, 130, 260].map((x) => <rect key={x} x={x - 32} y={-340} width={64} height={300} rx={10} fill="#C9D3E2" />)}
    <rect x={-360} y={-40} width={720} height={40} rx={8} fill="#9AA8BF" />
    <circle cy={-430} r={26} fill={C.red} opacity={0.8} />
  </g>
);
/** Beitragsbalken aus zwei Teilen */
const Stack2: React.FC<{ a: string; ca: string; b: string; cb: string; g: number; lab: string }> = ({ a, ca, b, cb, g, lab }) => (
  <g>
    <rect x={-170} y={-300} width={340} height={300} rx={18} fill={ca} />
    <text y={-140} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={44} fill={INK}>{a}</text>
    <g opacity={g} transform={`translate(0 ${lerp(-60, 0, g)})`}>
      <rect x={-170} y={-470} width={340} height={160} rx={18} fill={cb} />
      <text y={-376} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={40} fill={INK}>{b}</text>
    </g>
    <text y={70} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={50} fill={C.gray}>{lab}</text>
  </g>
);
/** kleines Kind-Icon */
const KidIcon: React.FC<{ col: string }> = ({ col }) => (
  <g>
    <circle cy={-130} r={40} fill="#E8B98F" />
    <path d="M-50 -80 Q0 -96 50 -80 L56 0 L-56 0 Z" fill={col} />
  </g>
);

export const Short16: React.FC<{ end: "yt" | "tt" }> = ({ end }) => {
  const f = useCurrentFrame();
  const TOT = DUR[end];
  const hB = wk("hook", "bei") - 6;
  const b1 = ps("b1"), b1b = wk("b1", "=der", 1) - 6;
  const b2 = ps("b2") - 4, b2b = wk("b2", "höchstens") - 6;
  const b3 = ps("b3") - 4, b3b = wk("b3", "sie") - 6;
  const b4 = ps("b4") - 4, b4b = wk("b4", "für") - 6, fE = ps(end) - 8;
  const coinAt = wk("hook", "pflegebeitrag") - 2;

  const Title = (f: number, at: number, last: boolean) => {
    const drop = interpolate(f, [at, at + 22], [-520, 0], { ...CL, easing: Easing.bounce });
    const cp = tw(f, at, 6);
    return (
      <g>
        <Figure f={f} x={300} y={820} s={1.15} shirt={C.blue} sleeve="#7C9BEA" look={6} />
        <g transform="translate(300 1260)"><Candle f={f} n="23" s={0.8} /></g>
        <g transform="translate(740 1260)"><Box s={1.05} /></g>
        <g transform={`translate(740 ${980 + drop})`} opacity={cp}><Coin r={120} label="+9 €" /></g>
        {last && <Txt x={740} y={720} s={46} c={C.gray} w={700}>geplant</Txt>}
      </g>
    );
  };

  const scenes = [
    {
      a: 0, b: b1, render: (f: number) => {
        const k = tw(f, hB, 10);
        return (
          <g>
            <g opacity={1 - k}>
              <Txt x={540} y={340} s={110}>Kinderlos</Txt>
              <Txt x={540} y={470} s={110} c={C.amber}>und über 23?</Txt>
            </g>
            <g opacity={k}>
              <Txt x={540} y={340} s={96}>Bei 3.000 € brutto</Txt>
              <Txt x={540} y={460} s={96} c={C.amber}>+9 € im Monat</Txt>
            </g>
            {Title(f, -100, k > 0.5)}
            <Src o={k}>{SRCBMG}</Src>
          </g>
        );
      },
    },
    {
      a: b1, b: b1b, render: (f: number) => {
        const g = interpolate(f, [wk("b1", "neun") - 4, wk("b1", "neun") + 18], [0, 1], { ...CL, easing: OUT });
        return (
          <g>
            <Txt x={540} y={340} s={84}>Zuschlag für Kinderlose</Txt>
            <Txt x={540} y={430} s={48} c={C.gray} w={700}>Prozentpunkte, laut Kabinettsentwurf</Txt>
            <g transform="translate(320 1200)"><Col h={360} v="0,6" col={C.blue} lab="heute" /></g>
            <g transform="translate(760 1200)" opacity={lerp(0.2, 1, g)}><Col h={360 + 180 * g} v="0,9" col={C.amber} lab="ab 2027" /></g>
            <g transform={`translate(540 760) scale(${pop(f, wk("b1", "neun") + 6, 14)})`}><Pill w={260} text="+0,3" col={C.amber} s={60} h={100} /></g>
            <Src o={tw(f, b1 + 6, 10)}>{SRCBMG}</Src>
          </g>
        );
      },
    },
    {
      a: b1b, b: b2, render: (f: number) => {
        const lit = interpolate(f, [b1b, b1b + 40], [0, 1], CL);
        return (
          <g>
            <Txt x={540} y={340} s={90}>Noch nicht Gesetz</Txt>
            <g transform="translate(540 980)"><Plenum lit={lit} /></g>
            <g transform={`translate(540 1200) scale(${pop(f, wk("b1", "fünften") - 2, 14)})`}><Pill w={660} text="1. Lesung: 5. November" col={C.blue} s={52} h={110} /></g>
            <Src o={tw(f, b1b + 6, 10)}>Quelle: Bundestag, Tagesordnung KW 45</Src>
          </g>
        );
      },
    },
    {
      a: b2, b: b2b, render: (f: number) => (
        <g>
          <Txt x={540} y={340} s={90}>Zahlst du allein</Txt>
          <g transform="translate(540 900)"><Slip hl={tw(f, wk("b2", "allein") - 4, 10)} zero={tw(f, wk("b2", "arbeitgeberanteil") - 4, 10)} /></g>
          <Src o={tw(f, b2 + 6, 10)}>Quelle: § 58 Abs. 1 SGB XI</Src>
        </g>
      ),
    },
    {
      a: b2b, b: b3, kind: "zoom" as const, render: (f: number) => {
        const p = pop(f, wk("b2", "neunzehn") - 2, 14);
        const rise = interpolate(f, [b2b + 4, b2b + 30], [0, 1], { ...CL, easing: OUT });
        return (
          <g>
            <Txt x={540} y={340} s={90}>Höchstens</Txt>
            <g transform={`translate(540 740) scale(${p})`} opacity={Math.min(1, p * 2)}>
              <rect x={-360} y={-110} width={720} height={220} rx={30} fill={INK} stroke={C.amber} strokeWidth={8} />
              <text y={44} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={120} fill={C.amber}>+19 €</text>
            </g>
            <Txt x={540} y={930} s={50} c={C.gray} w={700}>extra im Monat</Txt>
            <rect x={200} y={1240 - 200 * rise} width={680} height={200 * rise} rx={16} fill={C.blue} opacity={0.5} />
            <line x1={160} y1={1040} x2={920} y2={1040} stroke={C.red} strokeWidth={10} strokeDasharray="30 18" />
            <Txt x={540} y={1110} s={42} w={700} o={tw(f, wk("b2", "beitragsbemessungsgrenze") - 4, 10)}>Grenze 2027: 6.375 € brutto*</Txt>
            <Txt x={540} y={1320} s={34} c={C.gray} w={600}>* Kabinett, Bundesrat fehlt noch</Txt>
          </g>
        );
      },
    },
    {
      a: b3, b: b3b, render: (f: number) => {
        const q = tw(f, wk("b3", "eltern") - 4, 12);
        return (
          <g>
            <Txt x={540} y={340} s={100}>Warum?</Txt>
            <g transform="translate(540 1060) scale(0.95)"><Court /></g>
            <Txt x={540} y={1160} s={56} w={800}>Bundesverfassungsgericht 2001</Txt>
            <Txt x={540} y={1260} s={46} c={C.amber} w={700} o={q}>Eltern leisten „generativen Beitrag“</Txt>
            <Src o={tw(f, b3 + 6, 10)}>Quelle: BVerfG, Urteil vom 3.4.2001, 1 BvR 1629/94</Src>
          </g>
        );
      },
    },
    {
      a: b3b, b: b4, render: (f: number) => {
        const g = tw(f, wk("b3", "nicht") - 4, 14);
        return (
          <g>
            <Txt x={540} y={340} s={84}>Nicht gleich belasten</Txt>
            <g transform="translate(300 1200)"><Stack2 a="Beitrag" ca={C.blue} b="Erziehung" cb={C.green} g={g} lab="Eltern" /></g>
            <g transform="translate(780 1200)"><Stack2 a="Beitrag" ca={C.blue} b="Zuschlag" cb={C.amber} g={g} lab="Kinderlose" /></g>
          </g>
        );
      },
    },
    {
      a: b4, b: b4b, render: (f: number) => {
        const ks = [0, 1, 2].map((i) => pop(f, wk("b4", "mehreren") - 2 + i * 5, 12));
        return (
          <g>
            <Txt x={540} y={340} s={84}>Ab 2 Kindern unter 25</Txt>
            <Txt x={540} y={450} s={60} c={C.green}>Abschlag – schon seit 2023</Txt>
            {ks.map((k, i) => (
              <g key={i} transform={`translate(${260 + i * 280} 1000) scale(${k})`} opacity={Math.min(1, k * 2)}>
                <KidIcon col={[C.green, C.amber, C.blue][i]} />
                {i > 0 && <g transform="translate(0 110)"><Pill w={220} text="−0,25" col={C.green} s={46} h={80} /></g>}
              </g>
            ))}
            <Txt x={540} y={1260} s={40} c={C.gray} w={600}>Punkte je Kind, 2. bis 5. Kind</Txt>
            <Src o={tw(f, b4 + 6, 10)}>Quelle: § 55 Abs. 3 SGB XI</Src>
          </g>
        );
      },
    },
    {
      a: b4b, b: fE - 10, render: (f: number) => (
        <g>
          <Txt x={540} y={340} s={96}>Kinderlos:</Txt>
          <Txt x={540} y={460} s={96} c={C.amber}>+9 € (geplant)</Txt>
          {Title(f, wk("b4", "neun") - 2, false)}
          <Txt x={740} y={1360} s={40} c={C.gray} w={600} o={tw(f, wk("b4", "dreitausend") - 4, 10)}>bei 3.000 € brutto</Txt>
        </g>
      ),
    },
  ];

  const hi = ["kinder", "dreiundzwanzig", "pflegebeitrag", "zuschlag", "kabinettsentwurf", "bundestag", "allein", "arbeitgeberanteil", "beitragsbemessungsgrenze", "bundesverfassungsgericht", "eltern", "kinderlose", "geplanten"];
  const cs = chunks(D.paras as any, ["hook", "b1", "b2", "b3", "b4", ...(end === "tt" ? ["tt"] : [])], [
    ["dreiundzwanzig", "23"], ["dreitausend brutto", "3.000 brutto"], ["neun euro", "9 €"], ["null komma sechs", "0,6"],
    ["null komma neun", "0,9"], ["fünften november", "5. November"], ["neunzehn euro", "19 €"], ["zweitausendeins", "2001"], ["fünfundzwanzig", "25"],
  ]);
  const subEnd = end === "tt" ? TOT - 6 : pe("b4") + 8;
  const endIn = tw(f, fE, 16);
  const foot = tw(f, b1, 12) * (1 - tw(f, fE, 10));

  const sfx: [number, string, number?][] = [
    [2, "soft", 0.6], [coinAt, "coins", 0.6], [hB - 2, "whoosh", 0.5],
    [b1 - 4, "whoosh", 0.7], [wk("b1", "neun") - 2, "ding", 0.5], [b1b - 4, "whoosh", 0.6], [wk("b1", "fünften") - 2, "soft", 0.6],
    [b2 - 4, "paper", 0.7], [wk("b2", "arbeitgeberanteil") - 4, "stamp", 0.5], [b2b - 4, "whoosh", 0.6], [wk("b2", "neunzehn") - 2, "ding", 0.5],
    [b3 - 4, "whoosh", 0.7], [wk("b3", "eltern") - 4, "marimba", 0.5], [b3b - 4, "whoosh", 0.6],
    [b4 - 4, "whoosh", 0.7], [wk("b4", "mehreren") - 2, "soft", 0.6], [b4b - 4, "whoosh", 0.6], [wk("b4", "neun") - 2, "coins", 0.6],
    [fE - 6, "whoosh", 0.8],
  ];

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Backdrop />
      <Stripes w={W} h={H} />
      <svg width={W} height={H} style={{ position: "absolute" }}>
        <ellipse cx={540} cy={900} rx={560} ry={520} fill="#4A6AAA" opacity={0.12} />
        <Scenes f={f} list={scenes} />
        <text x={540} y={150} textAnchor="middle" fontFamily={FONT} fontWeight={600} fontSize={26} fill={C.gray} opacity={foot * 0.8}>{FOOT}</text>
        {f >= fE && (
          <g opacity={endIn} transform={`translate(0 ${lerp(60, 0, endIn)})`}>
            {end === "yt"
              ? <EndYT f={f} at={fE} line="Was der Bundestag daraus macht." />
              : <EndTT f={f} at={fE} q={["Kanntest du den", "Zuschlag schon?"]} opts={[["Ja", C.green], ["Nein", C.amber], ["Betrifft mich nicht", C.blue]]} />}
          </g>
        )}
      </svg>
      <Sub f={f} cs={cs} end={subEnd} hi={hi} />
      <Grain f={f} />
      <Audio src={staticFile(`audio/s16_${end}.wav`)} />
      <SfxTrack list={sfx} />
    </AbsoluteFill>
  );
};
export const Short16YT: React.FC = () => <Short16 end="yt" />;
export const Short16TT: React.FC = () => <Short16 end="tt" />;
