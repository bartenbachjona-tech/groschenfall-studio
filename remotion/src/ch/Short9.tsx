/* Short 9 – Drei Nachbarn, drei Heizungen (Heizöl +74,9 %) */
import React from "react";
import { AbsoluteFill, staticFile, useCurrentFrame } from "remotion";
import { Audio } from "@remotion/media";
import { Backdrop, Stripes } from "../kit/Stage";
import { Figure } from "../kit/Figure";
import { Arrow, C, EndTT, EndYT, FONT, Grain, H, Scenes, Src, SfxTrack, Sub, Txt, W, chunks, interpolate, CL, OUT, IO, lerp, mk, pop, tw } from "./shortkit";
import D from "../data/s9.json";

const { wk, ps, pe, DUR } = mk(D as any);
export const S9_DUR = DUR;

/* ---------- Requisiten ---------- */
const OilTank: React.FC<{ lvl?: number; glow?: number }> = ({ lvl = 0.7, glow = 0 }) => (
  <g>
    <rect x={-70} y={-90} width={140} height={180} rx={50} fill={C.amber} opacity={glow * 0.35} transform="scale(1.25)" />
    <rect x={-70} y={-90} width={140} height={180} rx={50} fill="#C9D3E2" />
    <rect x={-58} y={80 - 160 * lvl} width={116} height={160 * lvl} rx={30} fill={C.amber} opacity={0.85} />
    <rect x={-70} y={-90} width={140} height={180} rx={50} fill="none" stroke="#5A6B88" strokeWidth={6} />
    <rect x={-14} y={-110} width={28} height={24} rx={6} fill="#5A6B88" />
    <text y={10} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={36} fill="#0A111D">ÖL</text>
  </g>
);
const GasBoiler: React.FC<{ f: number }> = ({ f }) => (
  <g>
    <rect x={-60} y={-90} width={120} height={180} rx={16} fill="#EEF2F7" />
    <rect x={-40} y={-60} width={80} height={60} rx={10} fill="#16243B" />
    <path d={`M0 ${-12 - Math.sin(f / 3) * 4} Q 16 -26 8 -46 Q 2 -34 -6 -40 Q -16 -24 0 -12 Z`} fill="#4EA3FF" />
    <path d="M0 -14 Q 8 -22 4 -32 Q 0 -26 -3 -28 Q -8 -20 0 -14 Z" fill="#BFE3FF" />
    <rect x={-30} y={30} width={60} height={12} rx={6} fill="#9AA8BF" />
    <text y={78} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={28} fill="#0A111D">GAS</text>
  </g>
);
const HeatPump: React.FC<{ f: number }> = ({ f }) => (
  <g>
    <rect x={-90} y={-70} width={180} height={140} rx={14} fill="#EEF2F7" />
    <circle cx={-24} cy={0} r={48} fill="#16243B" />
    <g transform={`translate(-24 0) rotate(${f * 14})`}>{[0, 120, 240].map((a) => <path key={a} transform={`rotate(${a})`} d="M0 0 Q 18 -16 6 -40 Q -6 -20 0 0 Z" fill="#86A9FF" />)}</g>
    <rect x={40} y={-40} width={36} height={80} rx={6} fill="#C9D3E2" />
    <path d="M58 -24 L48 2 L60 2 L52 28 L70 -4 L58 -4 Z" fill={C.amber} />
  </g>
);
/** Haus mit Fenster, Figur und Gerät */
const Home: React.FC<{ f: number; x: number; y: number; s?: number; kind: 0 | 1 | 2; seed: number; hi?: number }> = ({ f, x, y, s = 1, kind, seed, hi = 0 }) => {
  const shirt = ["#86A9FF", "#3DDC97", "#FFB547"][kind];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-150} y={-120} width={300} height={420} rx={12} fill={C.amber} opacity={hi * 0.25} transform="scale(1.08)" />
      <path d="M-160 -100 L0 -230 L160 -100 Z" fill={["#B0603A", "#3A5A9A", "#4E7A6A"][kind]} />
      <rect x={-140} y={-100} width={280} height={390} fill="#2A3F63" />
      <rect x={-120} y={-70} width={240} height={250} rx={12} fill="#FFE7A8" opacity={0.92} />
      <g transform="translate(-50 40)"><Figure f={f} x={0} y={0} s={0.5} shirt={shirt} blinkSeed={seed} hairStyle={(seed % 3) as 0 | 1 | 2} look={4} /></g>
      <g transform="translate(55 90) scale(0.62)">
        {kind === 0 ? <OilTank /> : kind === 1 ? <GasBoiler f={f} /> : <HeatPump f={f} />}
      </g>
      <rect x={-140} y={180} width={280} height={14} fill="#16243B" />
      <rect x={-26} y={210} width={52} height={80} rx={6} fill="#16243B" />
    </g>
  );
};
const Truck: React.FC = () => (
  <g>
    <rect x={-170} y={-70} width={230} height={120} rx={14} fill="#C9D3E2" />
    <rect x={-150} y={-50} width={190} height={30} rx={8} fill={C.amber} opacity={0.8} />
    <path d="M60 -40 L130 -40 L170 0 L170 50 L60 50 Z" fill="#86A9FF" />
    <rect x={80} y={-28} width={50} height={30} rx={6} fill="#16243B" />
    {[-110, 120].map((cx) => <g key={cx}><circle cx={cx} cy={58} r={30} fill="#16243B" /><circle cx={cx} cy={58} r={12} fill="#9AA8BF" /></g>)}
  </g>
);
const Bill: React.FC<{ title: string; val: string; col: string; h: number }> = ({ title, val, col, h }) => (
  <g>
    <rect x={-120} y={-h} width={240} height={h} rx={18} fill={col} />
    <Txt x={0} y={-h - 30} s={58} o={h > 4 ? 1 : 0}>{val}</Txt>
    <Txt x={0} y={64} s={40} c={C.gray} w={700}>{title}</Txt>
  </g>
);
const Stamp: React.FC<{ f: number; at: number; x: number; y: number; text: string; col?: string; rot?: number }> = ({ f, at, x, y, text, col = C.amber, rot = -8 }) => {
  if (f < at) return null;
  const k = interpolate(f, [at, at + 8], [0, 1], CL);
  const w = text.length * 44 + 80;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${lerp(2.2, 1, k)})`} opacity={k}>
      <rect x={-w / 2} y={-58} width={w} height={104} rx={14} fill="#0A111D" fillOpacity={0.6} stroke={col} strokeWidth={8} />
      <text y={20} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={70} fill={col}>{text}</text>
    </g>
  );
};

/* ---------- Drei-Häuser-Szene (Hook + Loop) ---------- */
const Street: React.FC<{ f: number; t0: number; showNums: boolean; qAt: number }> = ({ f, t0, showNums, qAt }) => {
  const up = showNums ? 1 : pop(f, t0 + 4, 14);
  const dn = pop(f, showNums ? wk("hook", "günstiger") - 4 : t0 + 8, 14);
  const q = showNums ? 0 : tw(f, qAt - 3, 10);
  return (
    <g>
      <Txt x={540} y={360} s={124}><tspan fill={C.amber}>Öl</tspan> · Gas · Strom</Txt>
      <ellipse cx={540} cy={1240} rx={560} ry={70} fill="#0A111D" opacity={0.4} />
      <Home f={f} x={190} y={960} s={0.98} kind={0} seed={1} hi={up} />
      <Home f={f} x={540} y={960} s={0.98} kind={1} seed={2} />
      <Home f={f} x={890} y={960} s={0.98} kind={2} seed={3} />
      <g transform={`translate(190 600) scale(${up})`} opacity={Math.min(1, up * 2)}>
        <Arrow up col={C.red} s={0.8} />
        <Txt x={0} y={-96} s={76} c={C.amber}>+74,9 %</Txt>
      </g>
      {[540, 890].map((x, i) => (
        <g key={x} transform={`translate(${x} 640) scale(${dn})`} opacity={Math.min(1, dn * 2)}>
          <Arrow up={false} col={C.green} s={0.6} />
          <Txt x={0} y={-70} s={60} c={C.green}>{i ? "−5,5 %" : "−2,8 %"}</Txt>
        </g>
      ))}
      <g opacity={q} transform={`translate(0 ${lerp(30, 0, q)})`}>
        <rect x={140} y={1290} width={800} height={110} rx={55} fill={C.deep} opacity={0.88} />
        <Txt x={540} y={1365} s={62}>Welcher Nachbar bist du?</Txt>
      </g>
    </g>
  );
};

export const Short9: React.FC<{ end: "yt" | "tt" }> = ({ end }) => {
  const f = useCurrentFrame();
  const TOT = DUR[end];
  const b1 = ps("b1"), b1b = wk("b1", "leichtes") - 4, b2 = ps("b2"), b2b = wk("b2", "nachbar", 1) - 4, b3 = ps("b3"), b3b = wk("b3", "teuer") - 4, b3c = wk("b3", "der") - 4, b4 = ps("b4") - 6, fE = ps(end) - 8;

  const scenes = [
    { a: 0, b: b1, render: (f: number) => <Street f={f} t0={0} showNums qAt={wk("hook", "welcher")} /> },
    {
      a: b1, b: b1b, render: (f: number) => {
        const fifth = tw(f, wk("b1", "jede") - 4, 12);
        return (
          <g>
            <Txt x={540} y={330} s={84}>Nachbar 1 · <tspan fill={C.amber}>Öl</tspan></Txt>
            <g opacity={1 - fifth}>
              <Home f={f} x={540} y={900} s={1.5} kind={0} seed={1} />
            </g>
            <g opacity={fifth}>
              {[0, 1, 2, 3, 4].map((i) => {
                const p = pop(f, wk("b1", "jede") + i * 3, 12);
                return (
                  <g key={i} transform={`translate(${140 + i * 200} 860) scale(${0.5 * p})`} opacity={i === 2 ? 1 : 0.45}>
                    <path d="M-160 -100 L0 -230 L160 -100 Z" fill={i === 2 ? C.amber : "#3A5A9A"} />
                    <rect x={-140} y={-100} width={280} height={300} fill={i === 2 ? "#B0603A" : "#2A3F63"} />
                    <rect x={-70} y={-40} width={140} height={110} rx={10} fill="#FFE7A8" opacity={i === 2 ? 1 : 0.5} />
                  </g>
                );
              })}
              <Txt x={540} y={1130} s={88} c={C.amber} o={tw(f, wk("b1", "fünfte") - 2, 10)}>1 von 5 Wohnungen</Txt>
              <Txt x={540} y={1210} s={46} c={C.gray} w={700} o={tw(f, wk("b1", "fünfte"), 10)}>heizt mit Öl</Txt>
              <Src o={tw(f, wk("b1", "fünfte"), 10)}>Quelle: Destatis, Zensus 2022</Src>
            </g>
          </g>
        );
      },
    },
    {
      a: b1b, b: b2, render: (f: number) => {
        const g = interpolate(f, [wk("b1", "vierundsiebzig") - 6, wk("b1", "prozent") + 4], [0, 1], { ...CL, easing: OUT });
        const g0 = tw(f, b1b + 2, 14);
        return (
          <g>
            <Txt x={540} y={330} s={80}>Preis für Heizöl</Txt>
            <line x1={150} y1={1250} x2={930} y2={1250} stroke="#2A3F63" strokeWidth={8} strokeLinecap="round" />
            <rect x={210} y={1250 - 360 * g0} width={260} height={360 * g0} rx={18} fill="#86A9FF" />
            <Txt x={340} y={1250 - 360 * g0 - 30} s={56} o={g0}>100</Txt>
            <Txt x={340} y={1315} s={44} c={C.gray} w={700}>Sept. 2025</Txt>
            <rect x={610} y={1250 - 360 * g0 - 270 * g} width={260} height={360 * g0 + 270 * g} rx={18} fill={C.red} />
            <Txt x={740} y={1250 - 360 * g0 - 270 * g - 30} s={56} o={g0}>{Math.round(100 + 74.9 * g)}</Txt>
            <Txt x={740} y={1315} s={44} c={C.gray} w={700}>Sept. 2026</Txt>
            <g transform={`translate(540 520) scale(${pop(f, wk("b1", "vierundsiebzig") - 2, 16)})`}>
              <Txt x={0} y={0} s={150} c={C.amber}>+74,9 %</Txt>
            </g>
            <Txt x={540} y={1395} s={34} c={C.gray} w={600}>Preisindex, Sept. 2025 = 100</Txt>
            <Src o={tw(f, b1b + 6, 10)}>Quelle: Destatis, PM 364 vom 13.10.2026</Src>
          </g>
        );
      },
    },
    {
      a: b2, b: b2b, render: (f: number) => (
        <g>
          <Txt x={540} y={330} s={84}>Nachbar 2 · <tspan fill={C.green}>Gas</tspan></Txt>
          <Home f={f} x={360} y={900} s={1.25} kind={1} seed={2} />
          <g transform={`translate(830 820) scale(${pop(f, wk("b2", "zwei", 1) - 2, 14)})`}>
            <Arrow up={false} col={C.green} s={1.1} />
            <Txt x={0} y={180} s={92} c={C.green}>−2,8 %</Txt>
          </g>
          <Txt x={540} y={1395} s={34} c={C.gray} w={600}>Erdgas, Sept. 2026 ggü. Vorjahr</Txt>
          <Src o={tw(f, b2 + 6, 10)}>Quelle: Destatis, PM 364 vom 13.10.2026</Src>
        </g>
      ),
    },
    {
      a: b2b, b: b3, render: (f: number) => {
        const plug = tw(f, wk("b2", "strom") - 4, 12);
        return (
          <g>
            <Txt x={540} y={330} s={70}>Nachbar 3 · <tspan fill={C.blue}>Wärmepumpe</tspan></Txt>
            <Home f={f} x={330} y={900} s={1.2} kind={2} seed={3} />
            <g transform="translate(720 1130) scale(1.2)"><HeatPump f={f} /></g>
            <g opacity={plug}>
              <path d="M720 1050 Q 720 980 800 960" stroke="#5A6B88" strokeWidth={10} fill="none" />
              <path d="M800 900 L770 960 L800 960 L780 1020 L840 940 L808 940 L830 900 Z" fill={C.amber} stroke="#0A111D" strokeWidth={5} />
            </g>
            <g transform={`translate(860 650) scale(${pop(f, wk("b2", "fünf") - 2, 14)})`}>
              <Arrow up={false} col={C.green} s={0.9} />
              <Txt x={-40} y={-100} s={88} c={C.green}>Strom −5,5 %</Txt>
            </g>
            <Txt x={540} y={1395} s={34} c={C.gray} w={600}>Strompreise allgemein, Sept. 2026 ggü. Vorjahr</Txt>
            <Src o={tw(f, b2b + 6, 10)}>Quelle: Destatis, PM 364 vom 13.10.2026</Src>
          </g>
        );
      },
    },
    {
      a: b3, b: b3b, render: (f: number) => {
        const vor = tw(f, wk("b3", "öl") - 4, 12);
        return (
          <g>
            <Txt x={540} y={360} s={104}>Preis <tspan fill={C.red}>≠</tspan> Rechnung</Txt>
            <g opacity={1 - vor}>
              <g transform="translate(330 860) rotate(-8)">
                <rect x={-150} y={-90} width={300} height={180} rx={20} fill={C.amber} />
                <circle cx={-110} cy={0} r={18} fill={C.deep} />
                <Txt x={20} y={24} s={70} c={C.deep}>+75 %</Txt>
              </g>
              <g transform="translate(760 880) rotate(5)">
                <rect x={-140} y={-190} width={280} height={380} rx={16} fill="#EEF2F7" />
                {[-130, -80, -30, 20, 70].map((y, i) => <rect key={i} x={-100} y={y} width={i === 4 ? 120 : 200} height={16} rx={8} fill="#0A111D" opacity={0.25} />)}
                <Txt x={0} y={160} s={44} c={C.deep} w={800}>Rechnung</Txt>
              </g>
            </g>
            <g opacity={vor}>
              <g transform="translate(540 900) scale(2.4)"><OilTank lvl={0.82} /></g>
              <Txt x={540} y={1250} s={80} c={C.green}>Tank voll = Vorrat</Txt>
            </g>
          </g>
        );
      },
    },
    {
      a: b3b, b: b3c, render: (f: number) => {
        const drive = interpolate(f, [b3b, wk("b3", "nachkaufen")], [1, 0], { ...CL, easing: OUT });
        return (
          <g>
            <Txt x={540} y={360} s={92}>Teuer für alle,</Txt>
            <Txt x={540} y={470} s={92} c={C.amber}>die jetzt nachkaufen</Txt>
            <Home f={f} x={300} y={950} s={1.0} kind={0} seed={1} />
            <g transform={`translate(${lerp(760, 1400, drive)} 1150)`}><Truck /></g>
            <g transform="translate(300 640)" opacity={tw(f, wk("b3", "nachkaufen") - 2, 10)}>
              <rect x={-110} y={-50} width={220} height={100} rx={20} fill={C.red} />
              <Txt x={0} y={20} s={56}>Tank leer</Txt>
            </g>
          </g>
        );
      },
    },
    {
      a: b3c, b: b4, render: (f: number) => {
        const b = (w: string, n = 0) => interpolate(f, [wk("b3", w, n) - 4, wk("b3", w, n) + 18], [0, 1], { ...CL, easing: OUT });
        const oil = b("öl", 1), gas = b("gas"), wp = b("wärmepumpe");
        return (
          <g>
            <Txt x={540} y={330} s={72}>Heizkosten 2026</Txt>
            <Txt x={540} y={410} s={48} c={C.gray} w={700}>70-m²-Wohnung, geschätzt</Txt>
            <line x1={120} y1={1250} x2={960} y2={1250} stroke="#2A3F63" strokeWidth={8} strokeLinecap="round" />
            <g transform="translate(250 1250)"><Bill title="Öl" val="1.275 €" col={C.red} h={620 * oil} /></g>
            <g transform="translate(540 1250)"><Bill title="Gas" val="1.120 €" col={C.blue} h={545 * gas} /></g>
            <g transform="translate(830 1250)"><Bill title="Wärmepumpe" val="735 €" col={C.green} h={358 * wp} /></g>
            <Stamp f={f} at={wk("b3", "prognose") - 3} x={540} y={600} text="PROGNOSE" rot={-7} />
            <Src o={tw(f, b3c + 6, 10)}>Quelle: co2online, Heizspiegel 2026 (Prognose)</Src>
          </g>
        );
      },
    },
    { a: b4, b: fE, render: (f: number) => <Street f={f} t0={b4} showNums={false} qAt={b4} /> },
  ];

  const hi = ["öl", "heizöl", "gas", "strom", "günstiger", "wärmepumpe", "rechnung", "vorrat", "nachkaufen", "prognose", "nachbar"];
  const cs = chunks(D.paras as any, ["hook", "b1", "b2", "b3", "b4", ...(end === "tt" ? ["tt"] : [])], [
    ["fünfundsiebzig prozent", "75 %"], ["vierundsiebzig komma neun prozent", "74,9 %"], ["zwei komma acht prozent", "2,8 %"], ["fünf komma fünf prozent", "5,5 %"],
    ["nachbar eins", "Nachbar 1"], ["nachbar zwei", "Nachbar 2"], ["nachbar drei", "Nachbar 3"], ["siebzigquadratmeterwohnung", "70-m²-Wohnung"],
    ["zwölfhundertfünfundsiebzig euro", "1.275 €"], ["elfhundertzwanzig", "1.120 €"], ["siebenhundertfünfunddreißig", "735 €"],
  ]);
  const subEnd = end === "tt" ? TOT - 6 : pe("b4") + 8;
  const endIn = tw(f, fE, 16);

  const sfx: [number, string, number?][] = [
    [2, "soft", 0.6], [wk("hook", "fünfundsiebzig") - 2, "ding", 0.6], [wk("hook", "günstiger") - 4, "soft", 0.7], [wk("hook", "welcher") - 3, "paper", 0.5],
    [b1 - 4, "whoosh", 0.7], [wk("b1", "jede") - 2, "marimba", 0.5], [b1b - 4, "whoosh", 0.6], [wk("b1", "vierundsiebzig") - 2, "ding", 0.7],
    [b2 - 4, "whoosh", 0.7], [wk("b2", "zwei", 1) - 2, "soft", 0.7], [b2b - 4, "whoosh", 0.6], [wk("b2", "fünf") - 2, "soft", 0.7],
    [b3 - 4, "whoosh", 0.7], [wk("b3", "öl") - 4, "paper", 0.5], [b3b - 4, "whoosh", 0.6], [wk("b3", "nachkaufen") - 2, "coins", 0.6],
    [b3c - 4, "whoosh", 0.6], [wk("b3", "prognose") - 3, "stamp", 0.8], [b4 - 4, "whoosh", 0.6], [fE - 6, "whoosh", 0.8],
  ];

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Backdrop />
      <Stripes w={W} h={H} />
      <svg width={W} height={H} style={{ position: "absolute" }}>
        <ellipse cx={540} cy={900} rx={560} ry={520} fill="#4A6AAA" opacity={0.12} />
        <Scenes f={f} list={scenes.map((s) => ({ ...s, b: s === scenes[scenes.length - 1] ? fE : s.b }))} />
        {f >= fE && (
          <g opacity={endIn} transform={`translate(0 ${lerp(60, 0, endIn)})`}>
            {end === "yt"
              ? <EndYT f={f} at={fE} line="Wir rechnen nach." />
              : <EndTT f={f} at={fE} q={["Womit", "heizt du?"]} opts={[["Öl", C.amber], ["Gas", C.blue], ["Wärmepumpe", C.green]]} />}
          </g>
        )}
      </svg>
      <Sub f={f} cs={cs} end={subEnd} hi={hi} />
      <Grain f={f} />
      <Audio src={staticFile(`audio/s9_${end}.wav`)} />
      <SfxTrack list={sfx} />
    </AbsoluteFill>
  );
};
export const Short9YT: React.FC = () => <Short9 end="yt" />;
export const Short9TT: React.FC = () => <Short9 end="tt" />;
