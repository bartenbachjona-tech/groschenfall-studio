/* Short 11 – Diesel-Paradox: 18 Cent weniger Steuer, trotzdem teurer als E10 */
import React from "react";
import { AbsoluteFill, staticFile, useCurrentFrame } from "remotion";
import { Audio } from "@remotion/media";
import { noise2D } from "@remotion/noise";
import { Backdrop, Stripes } from "../kit/Stage";
import { Arrow, C, CL, EndTT, EndYT, FONT, Grain, H, IO, OUT, Pill, Scenes, Src, SfxTrack, Sub, Txt, W, chunks, interpolate, lerp, mk, pop, tw } from "./shortkit";
import D from "../data/s11.json";

const { wk, ps, pe, DUR } = mk(D as any);
export const S11_DUR = DUR;
const DIE = C.amber, E10 = C.green;

/** Zapfsäule ohne Marke */
const Pump: React.FC<{ label: string; col: string; price: string; po?: number; hot?: number }> = ({ label, col, price, po = 1, hot = 0 }) => (
  <g>
    <rect x={-130} y={-300} width={260} height={560} rx={26} fill="#C9D3E2" />
    <rect x={-130} y={-300} width={260} height={90} rx={26} fill={col} />
    <text y={-238} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={54} fill="#0A111D">{label}</text>
    <rect x={-100} y={-180} width={200} height={110} rx={12} fill="#0A111D" />
    <rect x={-100} y={-180} width={200} height={110} rx={12} fill={C.red} opacity={hot * 0.35} />
    <text y={-104} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={62} fill={hot > 0.5 ? "#FF8A8E" : "#7CF0B8"} opacity={po}>{price}</text>
    <rect x={-60} y={-30} width={120} height={160} rx={14} fill="#9AA8BF" />
    <path d="M130 -40 Q 200 -40 200 60 L 200 200" stroke="#2A3442" strokeWidth={16} fill="none" strokeLinecap="round" />
    <rect x={180} y={190} width={40} height={70} rx={10} fill={col} />
    <rect x={-150} y={250} width={300} height={30} rx={10} fill="#5A6B88" />
  </g>
);
/** Steuerblock über der Säule */
const TaxBlock: React.FC<{ h: number; ct: string; col?: string }> = ({ h, ct, col = "#5A6B88" }) => (
  <g>
    <rect x={-110} y={-h} width={220} height={h} rx={14} fill={col} stroke="#0A111D" strokeWidth={5} />
    <text y={-h / 2 + 18} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={50} fill={C.white}>{ct}</text>
  </g>
);
const Tank: React.FC<{ s?: number }> = ({ s = 1 }) => (
  <g transform={`scale(${s})`}>
    <rect x={-90} y={-120} width={180} height={240} rx={64} fill="#C9D3E2" stroke="#5A6B88" strokeWidth={6} />
    <rect x={-74} y={-10} width={148} height={114} rx={40} fill={C.red} opacity={0.75} />
    <rect x={-18} y={-146} width={36} height={30} rx={6} fill="#5A6B88" />
    <text y={-40} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={40} fill="#0A111D">HEIZÖL</text>
  </g>
);
const Tower: React.FC<{ f: number; hi: number }> = ({ f, hi }) => {
  const rows: [string, string, number][] = [["Gase", "#5A6B88", 0], ["Benzin", C.green, 0], ["Mitteldestillate", C.amber, 1], ["Schweröl", "#3A4560", 0]];
  return (
    <g>
      <rect x={-150} y={-430} width={300} height={860} rx={60} fill="#2A3F63" stroke="#86A9FF" strokeWidth={6} />
      {rows.map(([t, c, h], i) => (
        <g key={i} transform={`translate(0 ${-330 + i * 210})`}>
          <rect x={-130} y={-80} width={260} height={160} rx={18} fill={c} opacity={h ? lerp(0.45, 1, hi) : 0.45} />
          <text y={14} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={t.length > 10 ? 28 : 44} fill={h ? "#0A111D" : C.white}>{t}</text>
        </g>
      ))}
      {Array.from({ length: 4 }).map((_, i) => (
        <circle key={i} cx={noise2D(`b${i}`, f / 40, 0) * 60} cy={400 - ((f * 4 + i * 200) % 800)} r={10} fill="#FFFFFF" opacity={0.25} />
      ))}
    </g>
  );
};
const Snow: React.FC<{ f: number; o: number }> = ({ f, o }) => (
  <g opacity={o}>
    {Array.from({ length: 22 }).map((_, i) => {
      const x = (i * 97) % 1080, y = ((f * (2 + (i % 3)) + i * 151) % 1500) + 200;
      return <g key={i} transform={`translate(${x + noise2D(`s${i}`, f / 60, 0) * 30} ${y}) rotate(${f + i * 20})`}>{[0, 60, 120].map((a) => <rect key={a} x={-2.5} y={-14} width={5} height={28} rx={2.5} fill="#EEF2F7" transform={`rotate(${a})`} />)}</g>;
    })}
  </g>
);

export const Short11: React.FC<{ end: "yt" | "tt" }> = ({ end }) => {
  const f = useCurrentFrame();
  const TOT = DUR[end];
  const b1 = ps("b1"), b1b = wk("b1", "auch") - 4, b2 = ps("b2"), b3 = ps("b3"), b3b = wk("b3", "jetzt") - 4, b4 = ps("b4") - 4, fE = ps(end) - 8;

  const scenes = [
    {
      a: 0, b: b1, render: (f: number) => {
        const tx = tw(f, wk("hook", "steuer") - 4, 14);
        const pr = tw(f, wk("hook", "teurer") - 4, 12);
        return (
          <g>
            <Txt x={540} y={320} s={100}>Weniger Steuer –</Txt>
            <Txt x={540} y={440} s={100} c={C.amber}>trotzdem teurer?</Txt>
            <g transform="translate(300 1030)"><Pump label="Diesel" col={DIE} price="2,26 €" hot={pr} po={lerp(0.25, 1, pr)} /></g>
            <g transform="translate(780 1030)"><Pump label="E10" col={E10} price="2,11 €" po={lerp(0.25, 1, pr)} /></g>
            <g transform={`translate(300 700) scale(${tx})`} opacity={tx}><TaxBlock h={110} ct="33 ct" /></g>
            <g transform={`translate(780 700) scale(${tx})`} opacity={tx}><TaxBlock h={170} ct="51 ct" /></g>
            <g transform={`translate(300 520) scale(${pop(f, wk("hook", "achtzehn") + 6, 14)})`}><Pill w={330} text="−18 ct" col={C.green} s={60} h={100} /></g>
            <Txt x={540} y={1360} s={38} c={C.gray} w={600} o={tx}>Energiesteuer pro Liter</Txt>
            <g transform={`translate(160 760) scale(${pop(f, wk("hook", "teurer") - 2, 12)})`}><Arrow up col={C.red} s={0.6} /></g>
          </g>
        );
      },
    },
    {
      a: b1, b: b1b, render: (f: number) => {
        const d1 = pop(f, wk("b1", "diesel") - 2, 14), d2 = pop(f, wk("b1", "=e") - 2, 14);
        return (
          <g>
            <Txt x={540} y={340} s={84}>21. Oktober 2026</Txt>
            <g transform={`translate(540 700) scale(${d1})`} opacity={Math.min(1, d1 * 2)}>
              <rect x={-420} y={-110} width={840} height={200} rx={28} fill={C.deep} stroke={DIE} strokeWidth={6} />
              <text x={-370} y={30} fontFamily={FONT} fontWeight={800} fontSize={80} fill={DIE}>Diesel</text>
              <text x={370} y={34} textAnchor="end" fontFamily={FONT} fontWeight={800} fontSize={100} fill={C.white}>2,26 €</text>
            </g>
            <g transform={`translate(540 960) scale(${d2})`} opacity={Math.min(1, d2 * 2)}>
              <rect x={-420} y={-110} width={840} height={200} rx={28} fill={C.deep} stroke={E10} strokeWidth={6} />
              <text x={-370} y={30} fontFamily={FONT} fontWeight={800} fontSize={80} fill={E10}>E10</text>
              <text x={370} y={34} textAnchor="end" fontFamily={FONT} fontWeight={800} fontSize={100} fill={C.white}>2,11 €</text>
            </g>
            <g transform={`translate(540 1210) scale(${pop(f, wk("b1", "elf") + 4, 14)})`}><Pill w={560} text="Diesel +15 ct" col={C.red} fg={C.white} s={60} h={110} /></g>
            <Txt x={540} y={1360} s={36} c={C.gray} w={600}>Bundesschnitt pro Liter</Txt>
            <Src o={tw(f, b1 + 6, 10)}>Quelle: ADAC, 21.10.2026</Src>
          </g>
        );
      },
    },
    {
      a: b1b, b: b2, render: (f: number) => {
        const g = interpolate(f, [b1b + 4, b1b + 30], [0, 1], { ...CL, easing: OUT });
        const base = 1250, k = 2200; // px pro € über 1,90 €
        const h = (v: number) => (v - 1.9) * k * g;
        return (
          <g>
            <Txt x={540} y={340} s={84}>3. Quartal 2026</Txt>
            <Txt x={540} y={420} s={46} c={C.gray} w={700}>Durchschnitt pro Liter</Txt>
            <line x1={150} y1={base} x2={930} y2={base} stroke="#2A3F63" strokeWidth={8} strokeLinecap="round" />
            <rect x={220} y={base - h(2.234)} width={260} height={h(2.234)} rx={18} fill={DIE} />
            <Txt x={350} y={base - h(2.234) - 30} s={64} o={g}>2,23 €</Txt>
            <Txt x={350} y={base + 64} s={46} c={C.gray} w={700}>Diesel</Txt>
            <rect x={600} y={base - h(2.17)} width={260} height={h(2.17)} rx={18} fill={E10} />
            <Txt x={730} y={base - h(2.17) - 30} s={64} o={g}>2,17 €</Txt>
            <Txt x={730} y={base + 64} s={46} c={C.gray} w={700}>E10</Txt>
            <g transform={`translate(350 560) scale(${pop(f, wk("b1", "teuerste") - 2, 14)})`}><Pill w={480} text="teuerster Sprit" col={C.red} fg={C.white} s={52} h={100} /></g>
            <Src o={tw(f, b1b + 6, 10)}>Quelle: Bundeskartellamt / MTS-K, PM 02.10.2026</Src>
          </g>
        );
      },
    },
    {
      a: b2, b: b3, render: (f: number) => {
        const hi = tw(f, wk("b2", "diesel") - 4, 14);
        const out = tw(f, wk("b2", "heizöl") - 4, 14);
        return (
          <g>
            <Txt x={540} y={340} s={84}>Die Spur: Raffinerie</Txt>
            <g transform="translate(300 900) scale(0.9)"><Tower f={f} hi={hi} /></g>
            <g opacity={out}>
              <path d="M440 905 Q 560 905 620 720" stroke={C.amber} strokeWidth={10} fill="none" strokeDasharray="18 12" strokeDashoffset={-f * 3} />
              <path d="M440 905 Q 560 905 620 1090" stroke={C.amber} strokeWidth={10} fill="none" strokeDasharray="18 12" strokeDashoffset={-f * 3} />
              <g transform="translate(790 690) scale(0.55)"><Pump label="Diesel" col={DIE} price="" /></g>
              <g transform="translate(790 1110) scale(0.9)"><Tank /></g>
            </g>
            <g transform={`translate(540 1330) scale(${pop(f, wk("b2", "ähnliche") - 2, 14)})`}><Pill w={820} text="sehr ähnliche Produkte" col={C.amber} s={56} h={110} /></g>
            <Src o={tw(f, wk("b2", "laut") - 2, 10)}>Quelle: Bundeskartellamt, Sektoruntersuchung Raffinerien 2025</Src>
          </g>
        );
      },
    },
    {
      a: b3, b: b3b, render: (f: number) => (
        <g>
          <Txt x={540} y={340} s={84}>Heizöl ist teuer</Txt>
          <g transform="translate(330 900) scale(1.6)"><Tank /></g>
          <g transform={`translate(780 820) scale(${pop(f, wk("b3", "plus") - 2, 14)})`}>
            <Arrow up col={C.red} s={1.3} />
            <Txt x={0} y={200} s={100} c={C.amber}>+74,9 %</Txt>
          </g>
          <Txt x={540} y={1300} s={42} c={C.gray} w={700}>Sept. 2026 ggü. Vorjahr</Txt>
          <Src o={tw(f, b3 + 6, 10)}>Quelle: Destatis, PM 364 vom 13.10.2026</Src>
        </g>
      ),
    },
    {
      a: b3b, b: b4, render: (f: number) => {
        const ad = tw(f, wk("b3", "laut") - 4, 12);
        const up = pop(f, wk("b3", "diesel") - 4, 14);
        return (
          <g>
            <Snow f={f} o={1} />
            <Txt x={540} y={340} s={96}>Heizsaison</Txt>
            <g transform="translate(300 860)">
              <path d="M-200 -40 L0 -200 L200 -40 Z" fill="#B0603A" />
              <rect x={-170} y={-40} width={340} height={300} fill="#2A3F63" />
              <rect x={-110} y={10} width={220} height={150} rx={12} fill="#FFE7A8" />
              <path d="M-60 60 Q -40 40 -20 60 T 20 60 T 60 60" stroke={C.red} strokeWidth={8} fill="none" opacity={0.8} />
              <path d="M140 -120 L140 -200 L180 -200 L180 -90" fill="#5A6B88" />
            </g>
            <g transform="translate(300 1180) scale(0.6)"><Tank /></g>
            <g opacity={ad}>
              <path d="M450 1060 Q 600 980 700 900" stroke={C.amber} strokeWidth={10} fill="none" strokeDasharray="18 12" strokeDashoffset={-f * 3} />
              <g transform="translate(800 900) scale(0.6)"><Pump label="Diesel" col={DIE} price="" /></g>
            </g>
            <g transform={`translate(930 640) scale(${up})`}><Arrow up col={C.red} s={0.6} /></g>
            <g transform="translate(540 1330)" opacity={ad}><Pill w={760} text="laut ADAC: ein Grund" col={C.deep} fg={C.white} s={52} h={110} /></g>
            <Src o={ad}>Quelle: ADAC, 21.10.2026</Src>
          </g>
        );
      },
    },
    {
      a: b4, b: fE, render: (f: number) => {
        const k = 330, base = 1240;
        const off = interpolate(f, [wk("b4", "ohne") + 4, wk("b4", "mehrwertsteuer") + 10], [0, 1], { ...CL, easing: IO });
        const gap = pop(f, wk("b4", "dreißig") - 2, 14);
        const bar = (x: number, prod: number, est: number, mw: number, col: string, lab: string, tot: string, net: string) => (
          <g>
            <rect x={x - 130} y={base - prod * k} width={260} height={prod * k} rx={12} fill={col} />
            <g opacity={1 - off} transform={`translate(0 ${-off * 220})`}>
              <rect x={x - 130} y={base - (prod + est) * k} width={260} height={est * k} fill="#5A6B88" stroke="#0A111D" strokeWidth={4} />
              <text x={x} y={base - (prod + est / 2) * k + 14} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={34} fill={C.white}>Energiest.</text>
              <rect x={x - 130} y={base - (prod + est + mw) * k} width={260} height={mw * k} fill="#3A4560" stroke="#0A111D" strokeWidth={4} />
              <text x={x} y={base - (prod + est + mw / 2) * k + 14} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={34} fill={C.white}>MwSt</text>
            </g>
            <Txt x={x} y={base - lerp(prod + est + mw, prod, off) * k - 26} s={56}>{off > 0.5 ? net : tot}</Txt>
            <Txt x={x} y={base + 64} s={46} c={C.gray} w={700}>{lab}</Txt>
          </g>
        );
        return (
          <g>
            <Txt x={540} y={340} s={84}>Ohne Steuern</Txt>
            <line x1={150} y1={base} x2={930} y2={base} stroke="#2A3F63" strokeWidth={8} strokeLinecap="round" />
            {bar(330, 1.565, 0.33, 0.36, DIE, "Diesel", "2,26 €", "1,57 €")}
            {bar(750, 1.259, 0.514, 0.337, E10, "E10", "2,11 €", "1,26 €")}
            <g opacity={gap}>
              <path d={`M470 ${base - 1.565 * k} L610 ${base - 1.565 * k}`} stroke={C.red} strokeWidth={6} strokeDasharray="12 10" />
              <g transform={`translate(540 ${base - 1.36 * k}) scale(${gap})`}><Pill w={210} text="+30 ct" col={C.red} fg={C.white} s={50} h={86} /></g>
            </g>
            <Txt x={540} y={1360} s={36} c={C.gray} w={600} o={gap}>grob gerechnet aus ADAC-Preisen 21.10. und Steuersätzen</Txt>
            <g transform={`translate(540 520) scale(${pop(f, wk("b4", "steuervorteil") - 2, 14)})`}><Pill w={760} text="18 ct Vorteil reichen nicht" col={C.amber} s={50} h={100} /></g>
          </g>
        );
      },
    },
  ];

  const hi = ["diesel", "benzin", "steuer", "teurer", "teuerste", "raffinerie", "heizöl", "mitteldestillate", "heizsaison", "steuervorteil", "nicht"];
  const cs = chunks(D.paras as any, ["hook", "b1", "b2", "b3", "b4", ...(end === "tt" ? ["tt"] : [])], [
    ["achtzehn cent", "18 Cent"], ["einundzwanzigsten oktober", "21. Oktober"], ["zwei euro sechsundzwanzig", "2,26 €"], ["e zehn", "E10"], ["zwei euro elf", "2,11 €"],
    ["vierundsiebzig komma neun prozent", "74,9 %"], ["dreißig cent", "30 Cent"], ["dritten quartal", "3. Quartal"],
  ]);
  const subEnd = end === "tt" ? TOT - 6 : pe("b4") + 8;
  const endIn = tw(f, fE, 16);

  const sfx: [number, string, number?][] = [
    [2, "soft", 0.6], [wk("hook", "steuer") - 4, "paper", 0.6], [wk("hook", "achtzehn") + 6, "ding", 0.5], [wk("hook", "teurer") - 4, "soft", 0.8],
    [b1 - 4, "whoosh", 0.7], [wk("b1", "diesel") - 2, "soft", 0.7], [wk("b1", "=e") - 2, "soft", 0.6], [wk("b1", "elf") + 4, "ding", 0.5],
    [b1b - 4, "whoosh", 0.6], [wk("b1", "teuerste") - 2, "stamp", 0.6],
    [b2 - 4, "whoosh", 0.7], [wk("b2", "diesel") - 4, "marimba", 0.5], [wk("b2", "ähnliche") - 2, "soft", 0.7],
    [b3 - 4, "whoosh", 0.7], [wk("b3", "plus") - 2, "ding", 0.6], [b3b - 4, "whoosh", 0.6], [wk("b3", "laut") - 4, "paper", 0.5],
    [b4 - 4, "whoosh", 0.7], [wk("b4", "ohne") + 4, "paper", 0.6], [wk("b4", "dreißig") - 2, "coins", 0.6], [fE - 6, "whoosh", 0.8],
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
              : <EndTT f={f} at={fE} q={["Diesel oder Benzin:", "Was tankst du?"]} opts={[["Diesel", DIE], ["Benzin", E10], ["Strom / anderes", C.blue]]} />}
          </g>
        )}
      </svg>
      <Sub f={f} cs={cs} end={subEnd} hi={hi} />
      <Grain f={f} />
      <Audio src={staticFile(`audio/s11_${end}.wav`)} />
      <SfxTrack list={sfx} />
    </AbsoluteFill>
  );
};
export const Short11YT: React.FC = () => <Short11 end="yt" />;
export const Short11TT: React.FC = () => <Short11 end="tt" />;
