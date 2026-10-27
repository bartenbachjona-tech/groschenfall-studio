/* Short 20 – Tabaksteuer 2027–2030: Entwurf rechnete 8,77 → 11,36 € je Schachtel, beschlossen wurde mehr */
import React from "react";
import { AbsoluteFill, staticFile, useCurrentFrame } from "remotion";
import { Audio } from "@remotion/media";
import { Backdrop, Stripes } from "../kit/Stage";
import { Stamp } from "../kit/Props";
import { Arrow, C, CL, EndTT, EndYT, FONT, Grain, OUT, Pill, Scenes, Src, SfxTrack, Sub, Txt, W, H, chunks, interpolate, lerp, mk, pop, tw } from "./shortkit";
import D from "../data/s20.json";

const { wk, ps, pe, DUR } = mk(D as any);
export const S20_DUR = DUR;
const INK = "#0A111D";
const SRC = "Quelle: BT-Drs. 21/7859 (Entwurf), 21/8605; Bundesrat 603/26";

/** neutrale Schachtel, keine Marke */
const Pack: React.FC<{ s?: number; label?: string }> = ({ s = 1, label = "20" }) => (
  <g transform={`scale(${s})`}>
    <rect x={-110} y={-160} width={220} height={320} rx={18} fill={INK} opacity={0.35} transform="translate(8 10)" />
    <rect x={-110} y={-160} width={220} height={320} rx={18} fill="#D9DFE8" />
    <rect x={-110} y={-160} width={220} height={90} rx={18} fill="#9AA7BB" />
    <rect x={-110} y={-90} width={220} height={20} fill="#9AA7BB" />
    <rect x={-110} y={10} width={220} height={60} fill={C.amber} />
    <text y={52} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={40} fill={INK}>Steuer</text>
    <text y={-95} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={56} fill={INK}>{label}</text>
    <text y={130} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={30} fill="#5A6B88">Stück</text>
  </g>
);
const Tag: React.FC<{ v: string; col: string; s?: number }> = ({ v, col, s = 1 }) => (
  <g transform={`scale(${s})`}>
    <rect x={-170} y={-70} width={340} height={140} rx={24} fill={INK} stroke={col} strokeWidth={7} />
    <text y={28} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={84} fill={col}>{v}</text>
  </g>
);

export const Short20: React.FC<{ end: "yt" | "tt" }> = ({ end }) => {
  const f = useCurrentFrame();
  const TOT = DUR[end];
  const b1 = ps("b1"), b1b = wk("b1", "=ab") - 6;
  const b2 = ps("b2") - 4, b2b = wk("b2", "=zwei") - 6;
  const b3 = ps("b3") - 4, b3b = wk("b3", "teurer") - 6;
  const b4 = ps("b4") - 4, b4b = wk("b4", "=und") - 6, fE = ps(end) - 8;

  const scenes = [
    {
      a: 0, b: b1, render: (f: number) => {
        const p = pop(f, wk("hook", "neunhundertfünfundvierzig") - 2, 14);
        return (
          <g>
            <Txt x={540} y={330} s={92}>1 Schachtel am Tag</Txt>
            <Txt x={540} y={450} s={110} c={C.amber}>+945 € im Jahr?</Txt>
            <g transform="translate(330 930) rotate(-6)"><Pack s={1.3} /></g>
            <g transform="translate(770 900)">
              <rect x={-170} y={-170} width={340} height={340} rx={34} fill={C.white} />
              <rect x={-170} y={-170} width={340} height={90} rx={34} fill={C.amber} />
              <rect x={-170} y={-110} width={340} height={30} fill={C.amber} />
              <text y={110} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={120} fill={INK}>2030</text>
            </g>
            <g transform={`translate(770 1200) scale(${p})`} opacity={Math.min(1, p * 2)}><Pill w={300} text="rechnerisch" col={C.blue} s={44} h={90} /></g>
            <Txt x={540} y={1340} s={38} c={C.gray} w={600}>im Vergleich zu 2027</Txt>
          </g>
        );
      },
    },
    {
      a: b1, b: b1b, render: (f: number) => (
        <g>
          <Txt x={540} y={340} s={86}>Tabaksteuer</Txt>
          <Txt x={540} y={440} s={86} c={C.green}>ist durch</Txt>
          <Txt x={540} y={600} s={44} c={C.gray} w={700} o={tw(f, wk("b1", "bundestag") - 4, 8)}>Bundestag</Txt>
          <Stamp f={f} at={wk("b1", "bundestag") - 2} x={540} y={690} text="beschlossen" s={0.62} col={C.green} rot={-5} />
          <Txt x={540} y={840} s={44} c={C.gray} w={700} o={tw(f, wk("b1", "bundesrat") - 4, 8)}>Bundesrat</Txt>
          <Stamp f={f} at={wk("b1", "bundesrat") - 2} x={540} y={930} text="kein Einspruch" s={0.55} col={C.blue} rot={4} />
          <Txt x={540} y={1080} s={44} c={C.gray} w={700} o={tw(f, wk("b1", "verkündet") - 4, 8)}>Gesetz</Txt>
          <Stamp f={f} at={wk("b1", "verkündet") - 2} x={540} y={1170} text="verkündet" s={0.62} col={C.amber} rot={-4} />
          <Src o={tw(f, b1 + 6, 10)}>Quelle: Bundesrat, Drs. 603/26 · BGBl. I Nr. 309</Src>
        </g>
      ),
    },
    {
      a: b1b, b: b2, render: (f: number) => (
        <g>
          <Txt x={540} y={340} s={86}>Jedes Jahr ab Januar</Txt>
          {["2027", "2028", "2029", "2030"].map((y, i) => {
            const p = pop(f, wk("b1", "vier") - 10 + i * 5, 14);
            const x = 210 + i * 220, h = 200 + i * 130;
            return (
              <g key={i} opacity={Math.min(1, p * 2)}>
                <rect x={x - 95} y={1300 - h * p} width={190} height={h * p} rx={16} fill={i === 3 ? C.amber : "#2A4A7A"} />
                <text x={x} y={1370} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={48} fill={C.gray}>{y}</text>
                <text x={x} y={1300 - h * p - 30} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={54} fill={C.white}>{i + 1}.</text>
              </g>
            );
          })}
          <Txt x={540} y={470} s={44} c={C.gray} w={700}>4 Stufen</Txt>
        </g>
      ),
    },
    {
      a: b2, b: b2b, render: (f: number) => {
        const p1 = pop(f, wk("b2", "acht") - 2, 14), p2 = pop(f, wk("b2", "elf") - 2, 14);
        return (
          <g>
            <Txt x={540} y={340} s={80}>Annahme im Entwurf</Txt>
            <Txt x={540} y={430} s={44} c={C.gray} w={700}>Ø-Preis je Schachtel (20 Stück)</Txt>
            <g transform={`translate(300 800) scale(${p1})`} opacity={Math.min(1, p1 * 2)}><Pack s={0.9} /></g>
            <g transform={`translate(300 1110) scale(${p1})`} opacity={Math.min(1, p1 * 2)}><Tag v="8,77 €" col={C.blue} s={0.9} /></g>
            <Txt x={300} y={1250} s={48} c={C.gray} o={p1}>2027</Txt>
            <g transform={`translate(780 800) scale(${p2})`} opacity={Math.min(1, p2 * 2)}><Pack s={0.9} /></g>
            <g transform={`translate(780 1110) scale(${p2})`} opacity={Math.min(1, p2 * 2)}><Tag v="11,36 €" col={C.amber} s={0.9} /></g>
            <Txt x={780} y={1250} s={48} c={C.gray} o={p2}>2030</Txt>
            <Src o={tw(f, b2 + 6, 10)}>{SRC}</Src>
          </g>
        );
      },
    },
    {
      a: b2b, b: b3, kind: "zoom" as const, render: (f: number) => {
        const l1 = tw(f, b2b + 6, 12), l2 = tw(f, wk("b2", "dreihundertfünfundsechzig") - 4, 12), l3 = tw(f, wk("b2", "tage") + 2, 12);
        return (
          <g>
            <Txt x={540} y={340} s={86}>Nachgerechnet</Txt>
            <Txt x={540} y={640} s={84} o={l1}>11,36 € − 8,77 €</Txt>
            <Txt x={540} y={760} s={96} c={C.amber} o={l1}>= 2,59 €</Txt>
            <Txt x={540} y={930} s={84} o={l2}>× 365 Tage</Txt>
            <g transform={`translate(540 1130) scale(${lerp(0.6, 1, l3)})`} opacity={l3}>
              <rect x={-300} y={-100} width={600} height={190} rx={34} fill={INK} stroke={C.amber} strokeWidth={8} />
              <text y={42} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={120} fill={C.amber}>945 €</text>
            </g>
            <Txt x={540} y={1300} s={38} c={C.gray} w={600} o={l3}>mehr im Jahr 2030 als 2027</Txt>
          </g>
        );
      },
    },
    {
      a: b3, b: b3b, render: (f: number) => {
        const g = interpolate(f, [b3 + 8, b3 + 30], [0, 1], { ...CL, easing: OUT });
        const k = 120, base = 1230;
        const ar = tw(f, wk("b3", "darüber") - 6, 12);
        return (
          <g>
            <Txt x={540} y={340} s={80}>Beschlossen: mehr</Txt>
            <Txt x={540} y={430} s={42} c={C.gray} w={700}>Steuer-Mehreinnahmen 2030</Txt>
            <line x1={160} y1={base} x2={920} y2={base} stroke="#2A3F63" strokeWidth={8} strokeLinecap="round" />
            <rect x={230} y={base - 3.589 * k * g} width={260} height={3.589 * k * g} rx={18} fill={C.blue} />
            <rect x={590} y={base - 4.461 * k * g} width={260} height={4.461 * k * g} rx={18} fill={C.amber} />
            <Txt x={360} y={base - 3.589 * k * g - 30} s={56} o={g}>3,6 Mrd. €</Txt>
            <Txt x={720} y={base - 4.461 * k * g - 30} s={56} o={g}>4,5 Mrd. €</Txt>
            <Txt x={360} y={base + 70} s={44} c={C.gray} w={700}>Entwurf</Txt>
            <Txt x={720} y={base + 70} s={44} c={C.gray} w={700}>Gesetz</Txt>
            <g opacity={ar}>
              <Txt x={540} y={base + 180} s={48}>Preise eher höher</Txt>
            </g>
            <Src o={tw(f, b3 + 6, 10)}>{SRC}</Src>
          </g>
        );
      },
    },
    {
      a: b3b, b: b4, render: (f: number) => {
        const p1 = pop(f, wk("b3", "tabakerhitzer") - 2, 14), p2 = pop(f, wk("b3", "liquids") - 2, 14);
        return (
          <g>
            <Txt x={540} y={340} s={86}>Auch teurer</Txt>
            <Txt x={540} y={430} s={44} c={C.gray} w={700}>ab Januar 2027</Txt>
            <g transform={`translate(300 880) scale(${p1})`} opacity={Math.min(1, p1 * 2)}>
              <rect x={-70} y={-200} width={140} height={400} rx={60} fill="#9AA7BB" />
              <rect x={-40} y={-170} width={80} height={60} rx={14} fill={INK} />
              <circle cy={120} r={22} fill={C.blue} />
            </g>
            <Txt x={300} y={1210} s={50} o={p1}>Erhitzer</Txt>
            <g transform={`translate(780 900) scale(${p2})`} opacity={Math.min(1, p2 * 2)}>
              <rect x={-30} y={-210} width={60} height={70} rx={10} fill="#5A6B88" />
              <rect x={-90} y={-150} width={180} height={300} rx={30} fill="#86A9FF" opacity={0.85} />
              <rect x={-90} y={0} width={180} height={150} rx={30} fill={C.blue} />
              <text y={-40} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={44} fill={INK}>Liquid</text>
            </g>
            <Txt x={780} y={1210} s={50} o={p2}>Liquids</Txt>
          </g>
        );
      },
    },
    {
      a: b4, b: b4b, render: (f: number) => {
        const t = interpolate(f, [b4 + 10, b4 + 34], [0, -10], { ...CL, easing: OUT });
        return (
          <g>
            <Txt x={540} y={340} s={86}>Begründung</Txt>
            <Txt x={540} y={430} s={44} c={C.gray} w={700}>laut Gesetzentwurf</Txt>
            <g transform="translate(540 900)">
              <rect x={-12} y={-180} width={24} height={420} rx={12} fill="#5A6B88" />
              <path d="M -120 240 L 120 240 L 60 200 L -60 200 Z" fill="#5A6B88" />
              <g transform={`rotate(${t})`}>
                <rect x={-380} y={-200} width={760} height={18} rx={9} fill={C.gray} />
                <g transform="translate(-300 -20)">
                  <path d="M -130 0 L 130 0 L 90 60 L -90 60 Z" fill={C.amber} />
                  <text y={-30} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={54} fill={C.amber}>Haushalt</text>
                </g>
                <g transform="translate(300 -20)" opacity={tw(f, wk("b4", "gesundheit") - 4, 10)}>
                  <path d="M -130 0 L 130 0 L 90 60 L -90 60 Z" fill={C.green} />
                  <text y={-30} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={54} fill={C.green}>Gesundheit</text>
                </g>
              </g>
            </g>
            <Txt x={540} y={1300} s={40} c={C.gray} w={600}>„vor allem“ der Haushalt</Txt>
          </g>
        );
      },
    },
    {
      a: b4b, b: fE - 10, kind: "zoom" as const, render: (f: number) => (
        <g>
          <Txt x={540} y={400} s={96}>Und für dich?</Txt>
          <g transform="translate(540 900) rotate(-6)"><Pack s={1.3} /></g>
          <g transform={`translate(840 760) scale(${pop(f, b4b + 6, 14)})`}><Arrow up col={C.amber} s={1.1} /></g>
        </g>
      ),
    },
  ];

  const hi = ["schachtel", "tabaksteuer", "bundestag", "bundesrat", "januar", "stufen", "gesetzentwurf", "höhere", "erhitzer", "liquids", "haushalt", "gesundheit", "dich"];
  const cs = chunks(D.paras as any, ["hook", "b1", "b2", "b3", "b4", ...(end === "tt" ? ["tt"] : [])], [
    ["bis zweitausenddreißig", "bis 2030"], ["neunhundertfünfundvierzig euro", "945 €"], ["acht euro siebenundsiebzig", "8,77 €"],
    ["für zweitausendsiebenundzwanzig", "für 2027"], ["elf euro sechsunddreißig", "11,36 €"], ["für zweitausenddreißig", "für 2030"],
    ["zwei euro neunundfünfzig", "2,59 €"], ["dreihundertfünfundsechzig", "365"],
  ]);
  const subEnd = end === "tt" ? TOT - 6 : pe("b4") + 8;
  const endIn = tw(f, fE, 16);

  const sfx: [number, string, number?][] = [
    [2, "soft", 0.6], [wk("hook", "neunhundertfünfundvierzig") - 2, "coins", 0.5],
    [b1 - 4, "whoosh", 0.7], [wk("b1", "bundestag") - 2, "stamp", 0.5], [wk("b1", "bundesrat") - 2, "stamp", 0.5], [wk("b1", "verkündet") - 2, "stamp", 0.5],
    [b1b - 4, "whoosh", 0.6], [b2 - 4, "whoosh", 0.7], [wk("b2", "acht") - 2, "paper", 0.5], [wk("b2", "elf") - 2, "paper", 0.5],
    [b2b - 4, "whoosh", 0.6], [wk("b2", "tage") + 2, "ding", 0.5], [b3 - 4, "whoosh", 0.7], [b3b - 4, "whoosh", 0.6],
    [wk("b3", "tabakerhitzer") - 2, "soft", 0.5], [wk("b3", "liquids") - 2, "soft", 0.5], [b4 - 4, "whoosh", 0.7], [b4b - 4, "marimba", 0.4], [fE - 6, "whoosh", 0.8],
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
              ? <EndYT f={f} at={fE} line="Was Steuern dich kosten" />
              : <EndTT f={f} at={fE} q={["Hättest du mit so", "viel gerechnet?"]} opts={[["Mehr", C.red], ["Weniger", C.green], ["Genau so", C.blue]]} />}
          </g>
        )}
      </svg>
      <Sub f={f} cs={cs} end={subEnd} hi={hi} />
      <Grain f={f} />
      <Audio src={staticFile(`audio/s20_${end}.wav`)} />
      <SfxTrack list={sfx} />
    </AbsoluteFill>
  );
};
export const Short20YT: React.FC = () => <Short20 end="yt" />;
export const Short20TT: React.FC = () => <Short20 end="tt" />;
