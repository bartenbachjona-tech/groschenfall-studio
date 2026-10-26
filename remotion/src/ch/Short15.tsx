/* Short 15 – Tankrabatt endet 31.12.2026: ab Januar rechnerisch +16,7 ct/l Steuer, nicht wegen Öl */
import React from "react";
import { AbsoluteFill, staticFile, useCurrentFrame } from "remotion";
import { Audio } from "@remotion/media";
import { noise2D } from "@remotion/noise";
import { Backdrop, Stripes } from "../kit/Stage";
import { Stamp } from "../kit/Props";
import { Arrow, C, CL, EndTT, EndYT, FONT, Grain, OUT, Pill, Scenes, Src, SfxTrack, Sub, Txt, W, H, chunks, interpolate, lerp, mk, pop, tw } from "./shortkit";
import D from "../data/s15.json";

const { wk, ps, pe, DUR } = mk(D as any);
export const S15_DUR = DUR;
const INK = "#0A111D", BEN = C.green, DIE = C.amber;
const SRC68 = "Quelle: § 68 Energiesteuergesetz";

/* ---------- Requisiten (markenlos) ---------- */
/** Zapfsäule, Ursprung Mitte; Anzeige zeigt "disp" */
const Pump: React.FC<{ label: string; col: string; disp: string; dcol?: string; s?: number }> = ({ label, col, disp, dcol = "#7CF0B8", s = 1 }) => (
  <g transform={`scale(${s})`}>
    <rect x={-130} y={-300} width={260} height={560} rx={26} fill="#C9D3E2" />
    <rect x={-130} y={-300} width={260} height={90} rx={26} fill={col} />
    <text y={-238} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={50} fill={INK}>{label}</text>
    <rect x={-100} y={-180} width={200} height={110} rx={12} fill={INK} />
    <text y={-104} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={disp.length > 7 ? 46 : 58} fill={dcol}>{disp}</text>
    <rect x={-60} y={-30} width={120} height={160} rx={14} fill="#9AA8BF" />
    <path d="M130 -40 Q 200 -40 200 60 L 200 200" stroke="#2A3442" strokeWidth={16} fill="none" strokeLinecap="round" />
    <rect x={180} y={190} width={40} height={70} rx={10} fill={col} />
    <rect x={-150} y={250} width={300} height={30} rx={10} fill="#5A6B88" />
  </g>
);
/** Ölfass, Ursprung Boden Mitte */
const Barrel: React.FC<{ s?: number }> = ({ s = 1 }) => (
  <g transform={`scale(${s})`}>
    <ellipse cx={0} cy={6} rx={130} ry={20} fill={INK} opacity={0.35} />
    <rect x={-110} y={-300} width={220} height={300} rx={26} fill="#3A4560" />
    {[-240, -150, -60].map((y) => <rect key={y} x={-116} y={y} width={232} height={18} rx={9} fill="#5A6B88" />)}
    <ellipse cx={0} cy={-300} rx={110} ry={24} fill="#5A6B88" />
    <ellipse cx={40} cy={-302} rx={18} ry={6} fill={INK} />
    <text y={-178} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={46} fill={C.gray}>ÖL</text>
  </g>
);
/** Kalenderblatt */
const Cal: React.FC<{ top: string; big: string; col?: string; s?: number }> = ({ top, big, col = C.red, s = 1 }) => (
  <g transform={`scale(${s})`}>
    <rect x={-150} y={-160} width={300} height={320} rx={26} fill={INK} opacity={0.35} transform="translate(8 12)" />
    <rect x={-150} y={-160} width={300} height={320} rx={26} fill={C.white} />
    <rect x={-150} y={-160} width={300} height={90} rx={26} fill={col} />
    <rect x={-150} y={-100} width={300} height={30} fill={col} />
    <text y={-98} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={46} fill={C.white}>{top}</text>
    <text y={90} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={150} fill={INK}>{big}</text>
  </g>
);
/** Gesetzbuch mit § */
const Book: React.FC<{ s?: number; label?: string }> = ({ s = 1, label = "§ 68" }) => (
  <g transform={`scale(${s})`}>
    <rect x={-150} y={-200} width={300} height={400} rx={18} fill="#2A3F63" stroke={C.blue} strokeWidth={8} />
    <rect x={-150} y={-200} width={40} height={400} rx={12} fill={C.blue} />
    <text x={20} y={30} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={110} fill={C.white}>{label}</text>
    <text x={20} y={110} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={30} fill={C.gray}>EnergieStG</text>
  </g>
);
/** Tankanzeige: Liter-Zähler + Füllbalken */
const Meter: React.FC<{ l: number; eur: string }> = ({ l, eur }) => (
  <g>
    <rect x={-380} y={-260} width={760} height={520} rx={40} fill={INK} stroke="#5A6B88" strokeWidth={8} />
    <text x={-320} y={-150} fontFamily={FONT} fontWeight={700} fontSize={44} fill={C.gray}>Liter</text>
    <text x={320} y={-140} textAnchor="end" fontFamily={FONT} fontWeight={800} fontSize={110} fill="#7CF0B8">{l.toFixed(0)}</text>
    <rect x={-320} y={-80} width={640} height={50} rx={25} fill="#2A3F63" />
    <rect x={-320} y={-80} width={640 * (l / 50)} height={50} rx={25} fill={C.green} />
    <text x={-320} y={60} fontFamily={FONT} fontWeight={700} fontSize={44} fill={C.gray}>mehr Steuer</text>
    <text x={320} y={190} textAnchor="end" fontFamily={FONT} fontWeight={800} fontSize={150} fill={C.amber}>{eur}</text>
  </g>
);
/** CO2-Wolke */
const Cloud: React.FC<{ f: number }> = ({ f }) => (
  <g transform={`translate(0 ${noise2D("cl", f / 50, 0) * 8})`}>
    {[[-150, 20, 110], [-40, -50, 140], [100, -20, 120], [190, 40, 90], [20, 60, 120]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} fill="#5A6B88" />)}
    <text y={60} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={120} fill={C.white}>CO₂</text>
  </g>
);
/** Deckel (gestrichelt = nur angekündigt) */
const Lid: React.FC<{ solid: number }> = ({ solid }) => (
  <g>
    <rect x={-300} y={-60} width={600} height={120} rx={30} fill={C.blue} opacity={0.15 + 0.6 * solid} stroke={C.blue} strokeWidth={8} strokeDasharray="28 20" />
    <rect x={-60} y={-110} width={120} height={60} rx={20} fill="none" stroke={C.blue} strokeWidth={8} strokeDasharray="20 14" />
    <text y={22} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={60} fill={C.white}>Preisdeckel</text>
  </g>
);

export const Short15: React.FC<{ end: "yt" | "tt" }> = ({ end }) => {
  const f = useCurrentFrame();
  const TOT = DUR[end];
  const b1 = ps("b1"), b1b = wk("b1", "laut") - 6;
  const b2 = ps("b2") - 4, b2b = wk("b2", "fünfzig") - 6;
  const b3 = ps("b3") - 4, b3b = wk("b3", "verlängerung") - 6;
  const b4 = ps("b4") - 4, b4b = wk("b4", "stand") - 6, fE = ps(end) - 8;
  const oil = wk("hook", "ölpreis");

  const scenes = [
    {
      // Titelbild: Zapfsäule + großes "+8,35 €", Ölfass "unschuldig"
      a: 0, b: b1, render: (f: number) => {
        const bo = 1;
        const halo = tw(f, wk("hook", "unschuldig") - 2, 12);
        return (
          <g>
            <Txt x={540} y={330} s={124} c={C.amber}>+8,35 €</Txt>
            <Txt x={540} y={430} s={64}>pro 50 Liter</Txt>
            <Txt x={540} y={495} s={40} c={C.gray} w={600}>rechnerisch, ab 1. Januar</Txt>
            <g transform="translate(330 1010)"><Pump label="SUPER" col={BEN} disp="+16,7 ct" dcol={C.amber} /></g>
            <g transform={`translate(800 1290) scale(${bo})`} opacity={Math.min(1, bo * 2)}>
              <circle cy={-160} r={210} fill={C.green} opacity={0.18 * halo} />
              <Barrel s={0.95} />
              <g transform={`translate(0 -380) scale(${pop(f, wk("hook", "unschuldig") - 2, 14)})`}><Pill w={330} text="unschuldig" col={C.green} s={46} h={84} /></g>
            </g>
            <Src o={tw(f, 8, 12)}>{SRC68}</Src>
          </g>
        );
      },
    },
    {
      a: b1, b: b1b, render: (f: number) => {
        const t1 = pop(f, wk("b1", "benzin") - 2, 14), t2 = pop(f, wk("b1", "diesel") - 2, 14), t3 = pop(f, wk("b1", "vierzehn") - 2, 14);
        return (
          <g>
            <Txt x={540} y={340} s={90}>Seit 1. Oktober</Txt>
            <Txt x={540} y={430} s={52} c={C.gray} w={700}>Energiesteuer gesenkt</Txt>
            <g transform={`translate(300 1060) scale(${0.85 * t1})`} opacity={Math.min(1, t1 * 2)}><Pump label="Benzin" col={BEN} disp="−14 ct" /></g>
            <g transform={`translate(780 1060) scale(${0.85 * t2})`} opacity={Math.min(1, t2 * 2)}><Pump label="Diesel" col={DIE} disp="−14 ct" /></g>
            <g transform={`translate(540 620) scale(${t3})`} opacity={Math.min(1, t3 * 2)}><Pill w={600} text="je −14,04 ct/Liter" col={C.green} s={54} h={110} /></g>
            <Src o={tw(f, b1 + 6, 10)}>{SRC68}</Src>
          </g>
        );
      },
    },
    {
      a: b1b, b: b2, render: (f: number) => {
        const flip = interpolate(f, [wk("b1", "einunddreißigsten") - 2, wk("b1", "einunddreißigsten") + 14], [0, 1], { ...CL, easing: OUT });
        return (
          <g>
            <Txt x={540} y={340} s={90}>Laut Gesetz Schluss</Txt>
            <g transform={`translate(540 880) rotate(${lerp(-6, 3, flip)})`}><Cal top="Dezember" big="31" s={1.5} /></g>
            <Stamp f={f} at={wk("b1", "dezember") + 2} x={540} y={1250} text="Rabatt endet" s={0.8} />
            <Src o={tw(f, b1b + 6, 10)}>{SRC68} Abs. 1 und 5</Src>
          </g>
        );
      },
    },
    {
      a: b2, b: b2b, render: (f: number) => {
        const a1 = pop(f, b2 + 6, 14), a2 = pop(f, wk("b2", "mehrwertsteuer") + 2, 14), a3 = pop(f, wk("b2", "siebzehn") - 2, 14);
        return (
          <g>
            <Txt x={540} y={340} s={90}>Pro Liter</Txt>
            <g transform={`translate(540 640) scale(${a1})`} opacity={Math.min(1, a1 * 2)}><Pill w={560} text="14,04 ct Steuer" col={C.blue} s={60} h={120} /></g>
            <Txt x={540} y={830} s={90} c={C.gray} o={a2}>+ 19 % MwSt</Txt>
            <line x1={240} y1={890} x2={840} y2={890} stroke={C.gray} strokeWidth={8} opacity={a2} strokeLinecap="round" />
            <g transform={`translate(540 1060) scale(${a3})`} opacity={Math.min(1, a3 * 2)}>
              <rect x={-330} y={-110} width={660} height={220} rx={30} fill={INK} stroke={C.amber} strokeWidth={8} />
              <text y={44} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={130} fill={C.amber}>16,7 ct</text>
            </g>
            <Txt x={540} y={1270} s={40} c={C.gray} w={600} o={a3}>rechnerisch</Txt>
          </g>
        );
      },
    },
    {
      a: b2b, b: b3, kind: "zoom" as const, render: (f: number) => {
        const t0 = wk("b2", "fünfzig") - 2;
        const l = interpolate(f, [t0, t0 + 40], [0, 50], { ...CL, easing: OUT });
        const eur = (l * 0.16708).toFixed(2).replace(".", ",") + " €";
        return (
          <g>
            <Txt x={540} y={340} s={90}>Eine Tankfüllung</Txt>
            <g transform="translate(540 860)"><Meter l={l} eur={"+" + eur} /></g>
            <Txt x={540} y={1220} s={44} c={C.gray} w={700} o={tw(f, wk("b2", "gleichem") - 4, 10)}>bei gleichem Preis vor Steuern</Txt>
          </g>
        );
      },
    },
    {
      a: b3, b: b3b, render: (f: number) => {
        const p = pop(f, wk("b3", "nächstes") - 2, 14);
        return (
          <g>
            <Txt x={540} y={340} s={90}>Und der CO₂-Preis?</Txt>
            <g transform="translate(540 760)"><Cloud f={f} /></g>
            <g transform={`translate(540 1060) scale(${p})`} opacity={Math.min(1, p * 2)}>
              <rect x={-420} y={-100} width={840} height={200} rx={30} fill={INK} stroke={C.green} strokeWidth={6} />
              <text y={-6} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={66} fill={C.green}>2027: 55–65 €/t</text>
              <text y={66} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={44} fill={C.gray}>wie 2026</text>
            </g>
            <Txt x={540} y={1260} s={40} c={C.gray} w={600} o={tw(f, wk("b3", "bundestagsbeschluss"), 10)}>Bundestag 15.10. · Bundesrat offen</Txt>
            <Src o={tw(f, b3 + 6, 10)}>Quelle: Bundestag, Drs. 21/7869, 21/8626</Src>
          </g>
        );
      },
    },
    {
      a: b3b, b: b4, render: (f: number) => (
        <g>
          <Txt x={540} y={340} s={90}>Verlängerung?</Txt>
          <g transform="translate(540 860)"><Cal top="Januar" big="1" col={C.blue} s={1.3} /></g>
          <Stamp f={f} at={wk("b3", "nicht", 1) - 2} x={540} y={1200} text="nicht beschlossen" s={0.62} />
          <Src o={tw(f, b3b + 6, 10)}>Stand 26.10.2026</Src>
        </g>
      ),
    },
    {
      a: b4, b: b4b, render: (f: number) => {
        const x = tw(f, wk("b4", "gesetz") - 4, 12);
        return (
          <g>
            <Txt x={540} y={340} s={90}>Spritpreisdeckel?</Txt>
            <g transform="translate(540 700)"><Lid solid={0} /></g>
            <g transform={`translate(540 880) scale(${pop(f, wk("b4", "angekündigt") - 4, 14)})`}><Pill w={500} text="nur angekündigt" col={C.amber} s={54} h={104} /></g>
            <g transform="translate(540 1150)" opacity={0.5 + 0.5 * x}>
              <Book s={0.75} label="§ ?" />
              <line x1={-150} y1={-170} x2={150} y2={170} stroke={C.red} strokeWidth={16 * x} strokeLinecap="round" />
            </g>
            <Txt x={540} y={1375} s={40} c={C.gray} w={600} o={x}>kein Gesetzentwurf</Txt>
          </g>
        );
      },
    },
    {
      // Payoff + Loop zurück zum Titelbild
      a: b4b, b: fE - 10, render: (f: number) => {
        const g = pop(f, b4b + 8, 14), o = pop(f, wk("b4", "ölpreis") - 4, 14);
        return (
          <g>
            <Txt x={540} y={330} s={92}>Stand heute:</Txt>
            <Txt x={540} y={440} s={92} c={C.amber}>Steuer, nicht Öl</Txt>
            <g transform={`translate(300 960) scale(${g})`} opacity={Math.min(1, g * 2)}><Book s={1} /></g>
            <g transform={`translate(300 700) scale(${g})`} opacity={Math.min(1, g * 2)}><Pill w={330} text="+16,7 ct" col={C.amber} s={56} h={100} /></g>
            <g transform={`translate(790 1180) scale(${o})`} opacity={Math.min(1, o * 2)}>
              <Barrel s={0.9} />
              <g transform="translate(0 -370)"><Pill w={330} text="unschuldig" col={C.green} s={46} h={84} /></g>
            </g>
            <Txt x={540} y={1330} s={40} c={C.gray} w={600}>rechnerisch, volle Weitergabe offen</Txt>
          </g>
        );
      },
    },
  ];

  const hi = ["januar", "steuer", "ölpreis", "unschuldig", "benzin", "diesel", "gesetz", "dezember", "mehrwertsteuer", "liter", "rabatts", "beschlossen", "spritpreisdeckel", "angekündigt", "steueraufschlag"];
  const cs = chunks(D.paras as any, ["hook", "b1", "b2", "b3", "b4", ...(end === "tt" ? ["tt"] : [])], [
    ["vierzehn cent", "14 Cent"], ["einunddreißigsten dezember", "31. Dezember"], ["siebzehn cent", "17 Cent"],
    ["fünfzig liter", "50 Liter"], ["acht euro fünfunddreißig", "8,35 €"], ["c-o-zwei-preis", "CO₂-Preis"],
  ]);
  const subEnd = end === "tt" ? TOT - 6 : pe("b4") + 8;
  const endIn = tw(f, fE, 16);

  const sfx: [number, string, number?][] = [
    [2, "soft", 0.6], [oil - 4, "whoosh", 0.5], [wk("hook", "unschuldig") - 2, "ding", 0.5],
    [b1 - 4, "whoosh", 0.7], [wk("b1", "benzin") - 2, "soft", 0.6], [wk("b1", "diesel") - 2, "soft", 0.6], [wk("b1", "vierzehn") - 2, "coins", 0.5],
    [b1b - 4, "paper", 0.6], [wk("b1", "dezember") + 2, "stamp", 0.6],
    [b2 - 4, "whoosh", 0.7], [wk("b2", "siebzehn") - 2, "ding", 0.5], [b2b - 4, "whoosh", 0.6], [wk("b2", "acht") - 2, "coins", 0.6],
    [b3 - 4, "whoosh", 0.7], [wk("b3", "nächstes") - 2, "soft", 0.6], [b3b - 4, "paper", 0.6], [wk("b3", "nicht", 1) - 2, "stamp", 0.6],
    [b4 - 4, "whoosh", 0.7], [wk("b4", "angekündigt") - 4, "soft", 0.6], [b4b - 4, "marimba", 0.5], [wk("b4", "ölpreis") - 4, "ding", 0.5],
    [fE - 6, "whoosh", 0.8],
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
              ? <EndYT f={f} at={fE} line="Wir rechnen nach, bevor es teurer wird." />
              : <EndTT f={f} at={fE} q={["Tankst du im Dezember", "noch einmal voll?"]} opts={[["Ja, klar", C.green], ["Nein", C.blue], ["Fahre kaum", C.amber]]} />}
          </g>
        )}
      </svg>
      <Sub f={f} cs={cs} end={subEnd} hi={hi} />
      <Grain f={f} />
      <Audio src={staticFile(`audio/s15_${end}.wav`)} />
      <SfxTrack list={sfx} />
    </AbsoluteFill>
  );
};
export const Short15YT: React.FC = () => <Short15 end="yt" />;
export const Short15TT: React.FC = () => <Short15 end="tt" />;
