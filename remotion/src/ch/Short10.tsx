/* Short 10 – Steuerpläne 2027: Wer soll mehr zahlen? (Regierungsentwurf) */
import React from "react";
import { AbsoluteFill, staticFile, useCurrentFrame } from "remotion";
import { Audio } from "@remotion/media";
import { Backdrop, Stripes } from "../kit/Stage";
import { Figure } from "../kit/Figure";
import { Coin } from "../kit/Props";
import { C, CL, EndTT, EndYT, FONT, Grain, H, IO, OUT, Pill, Scenes, Src, SfxTrack, Sub, Txt, W, chunks, interpolate, lerp, mk, pop, tw } from "./shortkit";
import D from "../data/s10.json";

const { wk, ps, pe, DUR } = mk(D as any);
export const S10_DUR = DUR;
const SRC = "Quelle: Regierungsentwurf, BR-Drs. 507/26";

const Stamp: React.FC<{ f: number; at: number; x: number; y: number; text: string; col?: string; rot?: number; s?: number }> = ({ f, at, x, y, text, col = C.red, rot = -8, s = 1 }) => {
  if (f < at) return null;
  const k = interpolate(f, [at, at + 8], [0, 1], CL);
  const w = text.length * 44 + 80;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s * lerp(2.2, 1, k)})`} opacity={k}>
      <rect x={-w / 2} y={-58} width={w} height={104} rx={14} fill="#0A111D" fillOpacity={0.55} stroke={col} strokeWidth={8} />
      <text y={20} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={70} fill={col}>{text}</text>
    </g>
  );
};

/** Waage: tilt > 0 → rechts tiefer */
const Scale: React.FC<{ tilt: number; left: React.ReactNode; right: React.ReactNode }> = ({ tilt, left, right }) => {
  const a = tilt * 10, dy = Math.sin((a * Math.PI) / 180) * 300;
  return (
    <g>
      <path d="M-120 420 L120 420 L40 360 L-40 360 Z" fill="#3A5A9A" />
      <rect x={-16} y={-40} width={32} height={410} rx={12} fill="#4E70B4" />
      <circle cx={0} cy={-40} r={30} fill={C.amber} />
      <g transform={`rotate(${a} 0 -40)`}><rect x={-320} y={-52} width={640} height={24} rx={12} fill="#86A9FF" /></g>
      {[[-300, -dy, left], [300, dy, right]].map(([x, y, n], i) => (
        <g key={i} transform={`translate(${x} ${(y as number) - 40})`}>
          <path d="M0 0 L-110 170 M0 0 L110 170" stroke="#9AA8BF" strokeWidth={5} />
          <path d="M-150 170 Q0 230 150 170 Z" fill="#C9D3E2" />
          <g transform="translate(0 165)">{n as React.ReactNode}</g>
        </g>
      ))}
    </g>
  );
};
const Card: React.FC<{ q?: boolean; label?: string }> = ({ q = true, label }) => (
  <g>
    <rect x={-46} y={-130} width={92} height={130} rx={12} fill={q ? "#2A3F63" : C.red} stroke="#EEF2F7" strokeWidth={5} />
    <text y={-46} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={66} fill={C.amber}>{label ?? "?"}</text>
  </g>
);
const InfoCard: React.FC<{ f: number; at: number; y: number; title: string; val: string; delta: string; col: string }> = ({ f, at, y, title, val, delta, col }) => {
  const p = pop(f, at, 14);
  if (f < at) return null;
  return (
    <g transform={`translate(540 ${y}) scale(${p})`} opacity={Math.min(1, p * 2)}>
      <rect x={-450} y={-90} width={900} height={180} rx={28} fill="#0A111D" opacity={0.4} transform="translate(6 10)" />
      <rect x={-450} y={-90} width={900} height={180} rx={28} fill={C.deep} stroke={col} strokeWidth={5} />
      <text x={-410} y={-18} fontFamily={FONT} fontWeight={700} fontSize={42} fill={C.gray}>{title}</text>
      <text x={-410} y={58} fontFamily={FONT} fontWeight={800} fontSize={70} fill={C.white}>{val}</text>
      <text x={410} y={58} textAnchor="end" fontFamily={FONT} fontWeight={800} fontSize={64} fill={col}>{delta}</text>
    </g>
  );
};
const Step: React.FC<{ n: number; t: string }> = ({ n, t }) => (
  <g>
    <circle r={58} fill={C.amber} />
    <text y={15} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={44} fill="#0A111D">{n}/3</text>
    <text x={84} y={20} fontFamily={FONT} fontWeight={800} fontSize={58} fill={C.white} stroke="#0A111D" strokeWidth={5} paintOrder="stroke">{t}</text>
  </g>
);
const Toolbox: React.FC = () => (
  <g>
    <path d="M-80 -110 L-80 -150 Q-80 -170 -60 -170 L60 -170 Q80 -170 80 -150 L80 -110" fill="none" stroke="#5A6B88" strokeWidth={18} />
    <rect x={-200} y={-120} width={400} height={220} rx={20} fill={C.red} />
    <rect x={-200} y={-40} width={400} height={20} fill="#B83A40" />
    <rect x={-30} y={-52} width={60} height={44} rx={8} fill="#C9D3E2" />
    <g transform="translate(150 -170) rotate(30)"><rect x={-12} y={-80} width={24} height={110} rx={8} fill="#5B3A29" /><rect x={-50} y={-110} width={100} height={44} rx={10} fill="#9AA8BF" /></g>
  </g>
);

export const Short10: React.FC<{ end: "yt" | "tt" }> = ({ end }) => {
  const f = useCurrentFrame();
  const TOT = DUR[end];
  const b1 = ps("b1"), b1b = wk("b1", "grundfreibetrag") - 4, b2 = ps("b2"), b2b = wk("b2", "=zwei") - 4, b3 = ps("b3"), b3b = wk("b3", "und") - 4, fE = ps(end) - 8;

  const scenes = [
    {
      a: 0, b: b1, render: (f: number) => {
        const coin = interpolate(f, [wk("hook", "acht") - 2, wk("hook", "kindergeld") + 4], [0, 1], { ...CL, easing: OUT });
        const cards = (i: number) => pop(f, wk("hook", "drei") + i * 4, 12);
        const tilt = lerp(-0.6, 0, tw(f, wk("hook", "drei"), 20, IO)) + 0.5 * tw(f, wk("hook", "zahlen") - 4, 16, IO);
        return (
          <g>
            <Txt x={540} y={330} s={118} c={C.amber}>2027:</Txt>
            <Txt x={540} y={460} s={104}>Wer zahlt drauf<tspan fill={C.amber}>?</tspan></Txt>
            <g transform="translate(540 900)">
              <Scale tilt={tilt}
                left={<g>
                  <Figure f={f} x={-40} y={-260} s={0.42} shirt="#86A9FF" blinkSeed={1} />
                  <Figure f={f} x={40} y={-220} s={0.3} shirt="#3DDC97" blinkSeed={4} hairStyle={1} />
                  <g transform={`translate(0 ${lerp(-420, -60, coin)})`} opacity={coin > 0 ? 1 : 0}><Coin r={56} label="+8 €" /></g>
                </g>}
                right={<g>{[-90, 0, 90].map((x, i) => <g key={i} transform={`translate(${x} 0) scale(${cards(i)})`}><Card /></g>)}</g>} />
            </g>
            <g transform="translate(540 1320)" opacity={tw(f, wk("hook", "plant") - 2, 10)}>
              <rect x={-230} y={-50} width={460} height={92} rx={18} fill="none" stroke={C.gray} strokeWidth={4} strokeDasharray="14 10" />
              <text y={14} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={42} fill={C.gray}>Plan der Regierung</text>
            </g>
          </g>
        );
      },
    },
    {
      a: b1, b: b1b, render: (f: number) => (
        <g>
          <g transform="translate(540 820) rotate(-3)">
            <rect x={-300} y={-380} width={600} height={760} rx={20} fill="#EEF2F7" />
            <text y={-280} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={46} fill="#0A111D">Einkommensteuer-</text>
            <text y={-224} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={46} fill="#0A111D">reformgesetz 2027</text>
            {[-140, -90, -40, 10, 60, 110, 160, 210].map((y, i) => <rect key={i} x={-230} y={y} width={i % 3 === 2 ? 280 : 460} height={18} rx={9} fill="#0A111D" opacity={0.18} />)}
          </g>
          <Stamp f={f} at={wk("b1", "entwurf") - 2} x={540} y={760} text="ENTWURF" rot={-10} s={1.25} />
          <Txt x={540} y={1330} s={66} c={C.amber} o={tw(f, wk("b1", "noch") - 2, 10)}>noch nicht beschlossen</Txt>
          <Txt x={540} y={340} s={90} c={C.green} o={tw(f, wk("b1", "entlastung") - 4, 10)}>Erst die Entlastung</Txt>
          <Src o={tw(f, b1 + 6, 10)}>{SRC}</Src>
        </g>
      ),
    },
    {
      a: b1b, b: b2, render: (f: number) => (
        <g>
          <Txt x={540} y={340} s={90} c={C.green}>Entlastung</Txt>
          <InfoCard f={f} at={wk("b1", "grundfreibetrag") - 2} y={560} title="Grundfreibetrag" val="12.564 €" delta="+216 €" col={C.green} />
          <InfoCard f={f} at={wk("b1", "kindergeld") - 2} y={800} title="Kindergeld pro Monat" val="267 €" delta="+8 €" col={C.green} />
          <InfoCard f={f} at={wk("b1", "pauschbetrag") - 2} y={1040} title="Arbeitnehmer-Pauschbetrag" val="1.430 €*" delta="+200 €" col={C.green} />
          <Txt x={540} y={1250} s={40} c={C.amber} w={700} o={tw(f, wk("b1", "hilft") - 4, 10)}>* bringt nur etwas ohne höhere Werbungskosten</Txt>
          <Src o={1}>{SRC}</Src>
        </g>
      ),
    },
    {
      a: b2, b: b2b, render: (f: number) => {
        const st = tw(f, wk("b2", "fünfundvierzig") - 4, 14);
        const mv = interpolate(f, [wk("b2", "zweihundertfünfzigtausend") - 6, wk("b2", "zweihundertfünfzigtausend") + 14], [0, 1], { ...CL, easing: IO });
        const nw = pop(f, wk("b2", "siebenundvierzig") - 4, 14);
        return (
          <g>
            <Txt x={540} y={340} s={90}>Wer soll mehr zahlen<tspan fill={C.amber}>?</tspan></Txt>
            <g transform="translate(150 520)" opacity={tw(f, wk("b2", "eins") - 4, 10)}><Step n={1} t="Spitzenverdiener" /></g>
            <g opacity={st}>
              {/* Treppe */}
              <rect x={120} y={1100} width={240} height={160} fill="#3A5A9A" />
              <text x={240} y={1200} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={56} fill={C.white}>42 %</text>
              <rect x={360} y={940} width={260} height={320} fill="#4E70B4" />
              <text x={490} y={1040} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={60} fill={C.white}>45 %</text>
              <g transform="translate(470 1310)">
                <text textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={36} fill={C.gray} opacity={1 - mv}>ab 277.826 €</text>
                <text textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={38} fill={C.amber} opacity={mv}>ab 250.000 €</text>
              </g>
              <g transform={`translate(0 ${lerp(-200, 0, nw)})`} opacity={Math.min(1, nw * 2)}>
                <rect x={620} y={780} width={260} height={480} fill={C.red} />
                <text x={750} y={880} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={64} fill={C.white}>47 %</text>
                <text x={775} y={1310} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={38} fill={C.amber}>ab 280.000 €</text>
                <g transform="translate(750 720) rotate(8)"><rect x={-70} y={-34} width={140} height={64} rx={14} fill={C.amber} /><text y={16} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={40} fill="#0A111D">NEU</text></g>
              </g>
              <text x={540} y={1380} textAnchor="middle" fontFamily={FONT} fontWeight={600} fontSize={32} fill={C.gray}>zu versteuerndes Einkommen pro Jahr</text>
            </g>
            <Src o={1}>{SRC}</Src>
          </g>
        );
      },
    },
    {
      a: b2b, b: b3, render: (f: number) => {
        const sh = interpolate(f, [wk("b2", "zwanzig") - 2, wk("b2", "fünfzehn") + 6], [0, 1], { ...CL, easing: IO });
        return (
          <g>
            <g transform="translate(150 360)"><Step n={2} t="Handwerkerbonus" /></g>
            <g transform="translate(540 820) scale(1.3)"><Toolbox /></g>
            <g transform="translate(540 1180)">
              <text x={-60} textAnchor="end" fontFamily={FONT} fontWeight={800} fontSize={110} fill={C.gray} opacity={lerp(1, 0.45, sh)}>20 %</text>
              <text x={0} y={-6} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={80} fill={C.amber} opacity={sh}>→</text>
              <text x={60} fontFamily={FONT} fontWeight={800} fontSize={110} fill={C.red} opacity={sh}>15 %</text>
            </g>
            <Txt x={540} y={1300} s={44} c={C.gray} w={700} o={sh}>max. 900 statt 1.200 € Steuerbonus</Txt>
            <Src o={1}>{SRC}</Src>
          </g>
        );
      },
    },
    {
      a: b3, b: b3b, render: (f: number) => {
        const sw = interpolate(f, [wk("b3", "fünf") - 2, wk("b3", "zwei") + 8], [0, 1], { ...CL, easing: IO });
        return (
          <g>
            <g transform="translate(150 360)"><Step n={3} t="Minijobs" /></g>
            <Figure f={f} x={330} y={760} s={1.1} shirt="#22304A" sleeve="#2C3C5C" blinkSeed={2} hairStyle={2} />
            <g transform="translate(330 610)"><rect x={-130} y={-40} width={260} height={70} rx={14} fill={C.deep} /><text y={10} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={36} fill={C.white}>Arbeitgeber</text></g>
            <Figure f={f} x={780} y={820} s={0.95} shirt="#EEF2F7" sleeve="#DDE4EE" blinkSeed={5} hairStyle={1} hair="#5B3A29" />
            <g transform="translate(780 1010)"><rect x={-70} y={-20} width={140} height={150} rx={12} fill={C.deep} /></g>
            <g transform="translate(780 650)"><rect x={-110} y={-40} width={220} height={70} rx={14} fill={C.deep} /><text y={10} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={36} fill={C.white}>Minijob</text></g>
            <g transform="translate(540 1230)" opacity={tw(f, wk("b3", "fünf") - 4, 10)}>
              <rect x={-420} y={-90} width={840} height={150} rx={28} fill={C.deep} stroke={C.amber} strokeWidth={5} />
              <text x={-380} y={-30} fontFamily={FONT} fontWeight={700} fontSize={38} fill={C.gray}>Pauschsteuer, zahlt der Arbeitgeber</text>
              <text x={-380} y={40} fontFamily={FONT} fontWeight={800} fontSize={60} fill={C.gray} opacity={lerp(1, 0.45, sw)}>2 %</text>
              <text x={-250} y={36} fontFamily={FONT} fontWeight={800} fontSize={50} fill={C.amber} opacity={sw}>→</text>
              <text x={-170} y={40} fontFamily={FONT} fontWeight={800} fontSize={60} fill={C.red} opacity={sw}>5 %</text>
            </g>
            <Src o={1}>{SRC}</Src>
          </g>
        );
      },
    },
    {
      a: b3b, b: fE, render: (f: number) => {
        const r = pop(f, wk("b3", "sechsundsechzig") - 4, 14);
        const k = pop(f, wk("b3", "acht") - 4, 14);
        return (
          <g>
            <Txt x={540} y={340} s={100}>Und die Mitte<tspan fill={C.amber}>?</tspan></Txt>
            <Figure f={f} x={540} y={600} s={1.0} shirt="#86A9FF" blinkSeed={3} smileAt={wk("b3", "sechsundsechzig")} />
            <Txt x={540} y={1010} s={52} c={C.gray} w={700} o={tw(f, wk("b3", "alleinstehend") - 2, 10)}>allein · 50.000 € zu versteuern</Txt>
            <g transform={`translate(540 1150) scale(${r})`} opacity={Math.min(1, r * 2)}><Pill w={760} text="−66 € Steuer im Jahr" col={C.green} s={60} h={130} /></g>
            <g transform={`translate(540 1320) scale(${k})`} opacity={Math.min(1, k * 2)}><Pill w={760} text="+8 € pro Kind/Monat" col={C.blue} s={56} h={110} /></g>
            <Src o={tw(f, wk("b3", "grob") - 4, 10)}>grob gerechnet nach Tarif im Entwurf, ohne Soli/Kirchensteuer</Src>
          </g>
        );
      },
    },
  ];

  const hi = ["kindergeld", "entwurf", "beschlossen", "entlastung", "spitzenverdiener", "neu", "handwerkerbonus", "arbeitgeber", "minijobs", "mitte", "grob"];
  const cs = chunks(D.paras as any, ["hook", "b1", "b2", "b3", ...(end === "tt" ? ["tt"] : [])], [
    ["acht euro", "8 €"], ["zweihundertsechzehn euro", "216 €"], ["zweihundertsiebenundsechzig euro", "267 €"], ["plus zweihundert", "plus 200 €"],
    ["fünfundvierzig prozent", "45 %"], ["zweihundertfünfzigtausend euro", "250.000 €"], ["siebenundvierzig prozent", "47 %"], ["zweihundertachtzigtausend", "280.000 €"],
    ["zwanzig", "20"], ["fünfzehn prozent", "15 %"], ["fünf", "5"], ["zwei prozent", "2 %"], ["fünfzigtausend euro", "50.000 €"], ["sechsundsechzig euro", "66 €"],
    ["eins", "1"], ["zwei", "2"], ["drei", "3"],
  ]);
  const subEnd = end === "tt" ? TOT - 6 : pe("b3") + 8;
  const endIn = tw(f, fE, 16);

  const sfx: [number, string, number?][] = [
    [2, "soft", 0.6], [wk("hook", "acht") - 2, "coins", 0.6], [wk("hook", "drei") - 2, "paper", 0.6], [wk("hook", "zahlen") - 2, "soft", 0.6],
    [b1 - 4, "whoosh", 0.7], [wk("b1", "entwurf") - 2, "stamp", 0.9], [b1b - 4, "whoosh", 0.6],
    [wk("b1", "grundfreibetrag") - 2, "soft", 0.7], [wk("b1", "kindergeld") - 2, "soft", 0.7], [wk("b1", "pauschbetrag") - 2, "soft", 0.7],
    [b2 - 4, "whoosh", 0.7], [wk("b2", "zweihundertfünfzigtausend") - 4, "marimba", 0.5], [wk("b2", "siebenundvierzig") - 4, "ding", 0.6],
    [b2b - 4, "whoosh", 0.7], [wk("b2", "fünfzehn") - 2, "soft", 0.7], [b3 - 4, "whoosh", 0.7], [wk("b3", "fünf") - 2, "paper", 0.6],
    [b3b - 4, "whoosh", 0.7], [wk("b3", "sechsundsechzig") - 4, "coins", 0.6], [wk("b3", "acht") - 4, "ding", 0.5], [fE - 6, "whoosh", 0.8],
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
              ? <EndYT f={f} at={fE} line="Wir rechnen nach." />
              : <EndTT f={f} at={fE} q={["Welche Stelle", "trifft dich?"]} opts={[["1 · Spitzensteuer", C.red], ["2 · Handwerkerbonus", C.amber], ["3 · Minijob-Steuer", C.blue]]} />}
          </g>
        )}
      </svg>
      <Sub f={f} cs={cs} end={subEnd} hi={hi} />
      <Grain f={f} />
      <Audio src={staticFile(`audio/s10_${end}.wav`)} />
      <SfxTrack list={sfx} />
    </AbsoluteFill>
  );
};
export const Short10YT: React.FC = () => <Short10 end="yt" />;
export const Short10TT: React.FC = () => <Short10 end="tt" />;
