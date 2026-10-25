/* Short 12 – Zuzahlungen 2027: 5 € werden 7,50 €, Belastungsgrenze bleibt */
import React from "react";
import { AbsoluteFill, staticFile, useCurrentFrame } from "remotion";
import { Audio } from "@remotion/media";
import { noise2D } from "@remotion/noise";
import { Backdrop, Stripes } from "../kit/Stage";
import { Stamp } from "../kit/Props";
import { C, CL, EndTT, EndYT, FONT, Grain, H, IO, OUT, Pill, Scenes, Src, SfxTrack, Sub, Txt, W, chunks, interpolate, lerp, mk, pop, tw } from "./shortkit";
import D from "../data/s12.json";

const { wk, ps, pe, DUR } = mk(D as any);
export const S12_DUR = DUR;
const PINK = "#F4B8C8";

/** Pfeil nach rechts (für "5 € → 7,50 €") */
const RArrow: React.FC<{ col?: string; s?: number }> = ({ col = C.amber, s = 1 }) => (
  <path transform={`scale(${s})`} d="M-50 -14 L10 -14 L10 -38 L56 0 L10 38 L10 14 L-50 14 Z" fill={col} stroke="#0A111D" strokeWidth={5} strokeLinejoin="round" />
);

/** Quittung (Papierstreifen mit Zackenrand), Betrag kippt bei flip 0→1 */
const Receipt: React.FC<{ a: string; b?: string; flip?: number; w?: number; h?: number; title?: string }> = ({ a, b, flip = 0, w = 320, h = 360, title = "Zuzahlung" }) => {
  const zig = [...Array(10)].map((_, i) => `L${w / 2 - (i + 0.5) * (w / 10)} ${h / 2 + 16} L${w / 2 - (i + 1) * (w / 10)} ${h / 2}`).join(" ");
  const d = `M${-w / 2} ${-h / 2} L${w / 2} ${-h / 2} L${w / 2} ${h / 2} ${zig} Z`;
  const sa = flip < 0.5 ? 1 - flip * 2 : 0, sb = flip >= 0.5 ? (flip - 0.5) * 2 : 0;
  return (
    <g>
      <path d={d} fill="#0A111D" opacity={0.35} transform="translate(8 12)" />
      <path d={d} fill="#F4F1EA" />
      {[0, 1, 2].map((i) => <rect key={i} x={-w / 2 + 34} y={-h / 2 + 40 + i * 34} width={w - 68 - i * 50} height={12} rx={6} fill="#C9CCD3" />)}
      <text y={-h / 2 + 190} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={w * 0.11} fill="#5A6B88">{title}</text>
      <g transform={`translate(0 ${-h / 2 + 280}) scale(1 ${Math.max(0.02, b ? (flip < 0.5 ? sa : sb) : 1)})`}>
        <text y={0} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={w * 0.24} fill={b && flip >= 0.5 ? "#C77B12" : "#0A111D"}>{b && flip >= 0.5 ? b : a}</text>
      </g>
      <rect x={-w / 2 + 34} y={h / 2 - 40} width={w - 68} height={6} rx={3} fill="#C9CCD3" />
    </g>
  );
};

/** Kassenrezept (rosa, ohne Logo) */
const Rx: React.FC<{ w?: number; label?: string }> = ({ w = 380, label = "Rezept" }) => {
  const h = w * 0.62;
  return (
    <g>
      <rect x={-w / 2 + 8} y={-h / 2 + 12} width={w} height={h} rx={12} fill="#0A111D" opacity={0.35} />
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={12} fill={PINK} />
      <rect x={-w / 2 + 24} y={-h / 2 + 24} width={w * 0.42} height={h * 0.3} rx={6} fill="none" stroke="#B5677D" strokeWidth={4} />
      <text x={w / 2 - 26} y={-h / 2 + 62} textAnchor="end" fontFamily={FONT} fontWeight={800} fontSize={w * 0.1} fill="#8E3B55">{label}</text>
      {[0, 1, 2].map((i) => <rect key={i} x={-w / 2 + 24} y={-h / 2 + h * 0.48 + i * h * 0.15} width={w * (0.8 - i * 0.18)} height={h * 0.06} rx={4} fill="#D88EA3" />)}
      <path d={`M${w * 0.12} ${h * 0.36} q 30 -30 60 0 t 60 -10`} stroke="#2A3F63" strokeWidth={5} fill="none" strokeLinecap="round" />
    </g>
  );
};

/** markenlose Medikamenten-Packung */
const Pack: React.FC<{ w?: number; col?: string }> = ({ w = 220, col = C.blue }) => {
  const h = w * 0.62;
  return (
    <g>
      <path d={`M${-w / 2} ${-h / 2} L${-w / 2 + 40} ${-h / 2 - 34} L${w / 2 + 40} ${-h / 2 - 34} L${w / 2 + 40} ${h / 2 - 34} L${w / 2} ${h / 2} Z`} fill="#AEB9CC" />
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={6} fill="#EEF2F7" />
      <rect x={-w / 2} y={-h / 2 + h * 0.18} width={w} height={h * 0.26} fill={col} />
      <rect x={-w / 2 + 18} y={h * 0.12} width={w * 0.5} height={h * 0.1} rx={4} fill="#C9D3E2" />
      <circle cx={w * 0.3} cy={h * 0.2} r={h * 0.13} fill="none" stroke={col} strokeWidth={5} />
    </g>
  );
};

/** Apotheken-Tresen (markenlos): Regal, Tresen, Rezept, Quittung */
const Counter: React.FC<{ f: number; rx: number; flip: number; rcpt: string; rcpt2?: string; tilt?: number }> = ({ f, rx, flip, rcpt, rcpt2, tilt = 0 }) => (
  <g>
    {/* Regal */}
    <rect x={120} y={560} width={840} height={420} rx={18} fill="#16243B" stroke="#2A3F63" strokeWidth={6} />
    {[0, 1, 2].map((r) => (
      <g key={r}>
        <rect x={120} y={690 + r * 130} width={840} height={12} fill="#2A3F63" />
        {Array.from({ length: 7 }).map((_, i) => (
          <rect key={i} x={150 + i * 115} y={612 + r * 130 + (i % 2) * 14} width={88} height={78 - (i % 2) * 14} rx={6} fill={[C.blue, "#C9D3E2", C.green, "#9AA8BF", C.amber, "#C9D3E2", C.blue][(i + r * 3) % 7]} opacity={0.55} />
        ))}
      </g>
    ))}
    {/* Tresen */}
    <rect x={60} y={1010} width={960} height={50} rx={14} fill="#C9D3E2" />
    <rect x={90} y={1060} width={900} height={300} fill="#2A3F63" />
    <rect x={90} y={1060} width={900} height={22} fill="#0A111D" opacity={0.3} />
    <rect x={300} y={1150} width={480} height={120} rx={14} fill="#1B2D49" />
    <path d="M540 1180 l0 60 M510 1210 l60 0" stroke={C.green} strokeWidth={18} strokeLinecap="round" opacity={0.85} />
    {/* Rezept wird hingelegt */}
    <g transform={`translate(${lerp(-200, 330, rx)} ${lerp(860, 990, rx)}) rotate(${lerp(-25, -8, rx)})`}><Rx w={300} /></g>
    {/* Packung */}
    <g transform="translate(560 960)"><Pack w={170} /></g>
    {/* Quittung */}
    <g transform={`translate(800 ${830 + noise2D("rc", f / 50, 0) * 4}) rotate(${6 + tilt})`}><Receipt a={rcpt} b={rcpt2} flip={flip} w={300} h={340} /></g>
  </g>
);

/** Kalenderblatt */
const CalSheet: React.FC<{ top: string; big: string; s?: number }> = ({ top, big, s = 1 }) => (
  <g transform={`scale(${s})`}>
    <rect x={-120} y={-130} width={240} height={260} rx={22} fill="#0A111D" opacity={0.35} transform="translate(6 10)" />
    <rect x={-120} y={-130} width={240} height={260} rx={22} fill={C.white} />
    <rect x={-120} y={-130} width={240} height={74} rx={22} fill={C.red} />
    <rect x={-120} y={-80} width={240} height={24} fill={C.red} />
    <text y={-76} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={40} fill={C.white}>{top}</text>
    <text y={60} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={big.length > 3 ? 64 : 120} fill="#0A111D">{big}</text>
  </g>
);

/** stilisierter Plenarsaal ohne Personen */
const Plenum: React.FC<{ f: number; lit: number }> = ({ f, lit }) => (
  <g>
    {[0, 1, 2, 3, 4].map((r) => {
      const R = 220 + r * 75, n = 9 + r * 3;
      return Array.from({ length: n }).map((_, i) => {
        const a = Math.PI + (Math.PI * (i + 0.5)) / n;
        const on = lit > (i + r * 7) / 60 ? 1 : 0;
        return <rect key={`${r}-${i}`} x={540 + Math.cos(a) * R - 20} y={1000 + Math.sin(a) * R - 14} width={40} height={28} rx={8} fill={on ? C.green : "#2A3F63"} opacity={on ? 0.9 : 1} />;
      });
    })}
    <rect x={460} y={930} width={160} height={110} rx={12} fill="#5A6B88" />
    <rect x={430} y={1040} width={220} height={22} rx={8} fill="#2A3F63" />
    <rect x={150} y={1080} width={780} height={14} rx={7} fill="#2A3F63" />
    <circle cx={540} cy={960 + noise2D("pl", f / 60, 0) * 2} r={14} fill={C.gray} opacity={0.4} />
  </g>
);

/** Krankenhausbett */
const Bed: React.FC = () => (
  <g>
    <rect x={-320} y={-40} width={640} height={70} rx={20} fill="#C9D3E2" />
    <rect x={-300} y={-80} width={600} height={50} rx={22} fill={C.white} />
    <rect x={-290} y={-120} width={170} height={60} rx={26} fill="#EEF2F7" stroke="#C9D3E2" strokeWidth={4} />
    <rect x={-100} y={-96} width={390} height={40} rx={18} fill={C.blue} opacity={0.75} />
    <rect x={-345} y={-210} width={26} height={330} rx={10} fill="#9AA8BF" />
    <rect x={320} y={-130} width={26} height={250} rx={10} fill="#9AA8BF" />
    <rect x={-345} y={-210} width={70} height={26} rx={10} fill="#9AA8BF" />
    {[-280, 280].map((x) => <circle key={x} cx={x} cy={140} r={24} fill="#5A6B88" />)}
    <path d="M-270 30 L-280 120 M270 30 L280 120" stroke="#9AA8BF" strokeWidth={14} strokeLinecap="round" />
  </g>
);

/** Therapie-Liege */
const Bench: React.FC = () => (
  <g>
    <rect x={-300} y={-40} width={600} height={60} rx={26} fill={C.green} opacity={0.85} />
    <rect x={-300} y={-40} width={160} height={60} rx={26} fill={C.green} />
    <rect x={-280} y={20} width={560} height={22} rx={10} fill="#5A6B88" />
    <path d="M-220 42 L-250 190 M220 42 L250 190 M-220 42 L220 190 M220 42 L-220 190" stroke="#9AA8BF" strokeWidth={12} strokeLinecap="round" />
    <rect x={-200} y={-100} width={110} height={56} rx={28} fill="#EEF2F7" />
  </g>
);

/** Münze klein (gestapelt) */
const Disc: React.FC<{ y: number; c?: string }> = ({ y, c = C.amber }) => (
  <g transform={`translate(0 ${y})`}>
    <ellipse cx={0} cy={10} rx={120} ry={30} fill="#B9822F" />
    <rect x={-120} y={-6} width={240} height={16} fill="#B9822F" />
    <ellipse cx={0} cy={-6} rx={120} ry={30} fill={c} />
    <ellipse cx={0} cy={-6} rx={84} ry={20} fill="none" stroke="#0A111D" strokeOpacity={0.2} strokeWidth={4} />
  </g>
);
/** Münzstapel, wächst bis zum Deckel */
const Stack: React.FC<{ n: number; base: number; gap?: number }> = ({ n, base, gap = 30 }) => (
  <g>
    {Array.from({ length: Math.floor(n) }).map((_, i) => <Disc key={i} y={base - i * gap} />)}
  </g>
);
/** Deckel / Schranke */
const Lid: React.FC<{ y: number; label: string; col?: string; heart?: boolean }> = ({ y, label, col = C.green, heart }) => (
  <g transform={`translate(0 ${y})`}>
    <rect x={-250} y={-24} width={500} height={48} rx={24} fill="#0A111D" opacity={0.4} transform="translate(6 10)" />
    <rect x={-250} y={-24} width={500} height={48} rx={24} fill={col} />
    <rect x={-10} y={-120} width={20} height={96} fill={col} />
    <g transform="translate(0 -150)"><Pill w={heart ? 260 : 220} text={label} col={col} s={64} h={110} /></g>
    {heart && <path transform="translate(-170 -150) scale(1.6)" d="M0 12 C -22 -4 -14 -22 0 -12 C 14 -22 22 -4 0 12 Z" fill={C.red} stroke="#0A111D" strokeWidth={3} />}
  </g>
);

/** Briefumschlag */
const Env: React.FC = () => (
  <g>
    <rect x={-180} y={-110} width={360} height={220} rx={16} fill="#0A111D" opacity={0.35} transform="translate(6 10)" />
    <rect x={-180} y={-110} width={360} height={220} rx={16} fill="#F4F1EA" />
    <path d="M-180 -110 L0 30 L180 -110" stroke="#C9CCD3" strokeWidth={8} fill="none" strokeLinejoin="round" />
    <text y={80} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={34} fill="#2A3F63">Antrag Befreiung</text>
  </g>
);
/** Krankenkasse als neutrales Gebäude */
const Kasse: React.FC = () => (
  <g>
    <path d="M-230 -150 L0 -270 L230 -150 Z" fill="#5A6B88" />
    <rect x={-210} y={-150} width={420} height={330} fill="#2A3F63" />
    {[-150, -50, 50, 150].map((x) => <rect key={x} x={x - 22} y={-110} width={44} height={250} rx={8} fill="#86A9FF" opacity={0.45} />)}
    <rect x={-240} y={180} width={480} height={30} rx={8} fill="#5A6B88" />
    <rect x={-160} y={-215} width={320} height={52} rx={10} fill={C.deep} />
    <text y={-178} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={34} fill={C.white}>Krankenkasse</text>
  </g>
);
/** Schuhkarton mit Quittungen */
const Box: React.FC<{ f: number; fill: number; top: string }> = ({ f, fill, top }) => {
  const n = Math.floor(fill * 7);
  return (
    <g>
      {Array.from({ length: n }).map((_, i) => (
        <g key={i} transform={`translate(${((i * 53) % 160) - 80} ${-30 - i * 14}) rotate(${((i * 37) % 30) - 15})`}><rect x={-70} y={-90} width={140} height={180} rx={6} fill="#F4F1EA" stroke="#C9CCD3" strokeWidth={3} /></g>
      ))}
      <g transform={`translate(20 ${-150 - n * 6 + noise2D("bx", f / 50, 0) * 3}) rotate(-6)`} opacity={fill > 0.95 ? 1 : 0}><Receipt a={top} w={230} h={270} /></g>
      <path d="M-280 0 L280 0 L250 260 L-250 260 Z" fill="#B0603A" />
      <path d="M-280 0 L280 0 L280 40 L-280 40 Z" fill="#8E4A2C" />
      <rect x={-90} y={100} width={180} height={70} rx={10} fill="#F4F1EA" opacity={0.85} />
      <text y={148} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={36} fill="#8E4A2C">2027</text>
    </g>
  );
};

export const Short12: React.FC<{ end: "yt" | "tt" }> = ({ end }) => {
  const f = useCurrentFrame();
  const TOT = DUR[end];
  const b1 = ps("b1"), b1b = wk("b1", "weiter") - 4, b1c = wk("b1", "aber") - 4, b1d = wk("b1", "nie") - 4;
  const b2 = ps("b2"), b2b = wk("b2", "höchstens") - 4, b2c = wk("b2", "beim") - 4, b2d = wk("b2", "plus") - 4;
  const b3 = ps("b3"), b3b = wk("b3", "mehr") - 4, b3c = wk("b3", "chronisch") - 4;
  const b4 = ps("b4"), b4b = wk("b4", "also") - 4, b4c = wk("b4", "denn") - 4, fE = ps(end) - 8;
  const SRC61 = "Quelle: BGBl. 2026 I Nr. 228, § 61 SGB V";

  const scenes = [
    { // Titelbild: Tresen, Quittung 5 € → 7,50 €
      a: 0, b: b1, render: (f: number) => {
        const fl = interpolate(f, [wk("hook", "sieben") - 6, wk("hook", "sieben") + 6], [0, 1], CL);
        const cal = pop(f, wk("hook", "januar") - 4, 14);
        return (
          <g>
            <Txt x={540} y={300} s={60} c={C.gray} w={700}>Zuzahlung auf Rezept</Txt>
            <Txt x={300} y={445} s={130}>5 €</Txt>
            <g transform="translate(500 400)"><RArrow s={1.1} /></g>
            <Txt x={790} y={445} s={130} c={C.amber}>7,50 €</Txt>
            <Counter f={f} rx={interpolate(f, [0, 22], [0.75, 1], { ...CL, easing: OUT })} flip={fl} rcpt="5,00 €" rcpt2="7,50 €" />
            <g transform={`translate(230 700) rotate(-8) scale(${cal})`} opacity={Math.min(1, cal * 2)}><CalSheet top="Januar" big="1.1." s={0.95} /></g>
            <Src o={tw(f, wk("hook", "januar"), 10)} y={1380}>§ 61 SGB V n. F., gilt ab 1.1.2027</Src>
          </g>
        );
      },
    },
    { // Bundestag beschlossen
      a: b1, b: b1b, render: (f: number) => (
        <g>
          <Txt x={540} y={360} s={96}>Bundestag</Txt>
          <Txt x={540} y={440} s={46} c={C.gray} w={700}>10. Juli 2026</Txt>
          <Plenum f={f} lit={interpolate(f, [b1 + 4, wk("b1", "beschlossen")], [0, 1], CL)} />
          <Stamp f={f} at={wk("b1", "beschlossen")} x={540} y={1230} text="beschlossen" col={C.green} s={0.8} />
          <Src o={tw(f, b1 + 6, 10)}>Quelle: GKV-Beitragssatzstabilisierungsgesetz, BGBl. 2026 I Nr. 228</Src>
        </g>
      ),
    },
    { // weiter 10 % vom Preis
      a: b1b, b: b1c, render: (f: number) => {
        const p = pop(f, wk("b1", "zehn") - 4, 14);
        const g = interpolate(f, [wk("b1", "zehn"), wk("b1", "zehn") + 20], [0, 1], { ...CL, easing: OUT });
        return (
          <g>
            <Txt x={540} y={360} s={96}>Weiter gilt:</Txt>
            <g transform="translate(540 800) scale(2)"><Pack w={240} /></g>
            <g transform="translate(540 1110)">
              <rect x={-330} y={-30} width={660} height={60} rx={30} fill="#2A3F63" />
              <rect x={-330} y={-30} width={660 * 0.1 * g} height={60} rx={30} fill={C.amber} />
              <Txt x={-330 + 66 * g + 20} y={20} s={44} a="start" o={g}>10 %</Txt>
              <Txt x={330} y={90} s={36} c={C.gray} w={600} a="end">Preis = 100 %</Txt>
            </g>
            <g transform={`translate(540 1290) scale(${p})`} opacity={Math.min(1, p * 2)}><Pill w={560} text="10 % vom Preis" col={C.amber} s={60} h={116} /></g>
            <Src o={tw(f, b1b + 6, 10)}>{SRC61}</Src>
          </g>
        );
      },
    },
    { // Mindest- & Höchstbetrag +50 %
      a: b1c, b: b1d, render: (f: number) => {
        const m = interpolate(f, [wk("b1", "sieben") - 4, wk("b1", "sieben") + 4], [0, 1], CL);
        const x = interpolate(f, [wk("b1", "fünfzehn") - 4, wk("b1", "fünfzehn") + 4], [0, 1], CL);
        const row = (y: number, lab: string, a: string, b: string, k: number, at: number) => {
          const p = pop(f, at, 14);
          return (
            <g transform={`translate(540 ${y}) scale(${0.85 + 0.15 * p})`} opacity={Math.min(1, p * 2)}>
              <rect x={-440} y={-150} width={880} height={300} rx={30} fill={C.deep} stroke={k > 0.5 ? C.amber : "#2A3F63"} strokeWidth={6} />
              <Txt x={-400} y={-70} s={50} c={C.gray} w={700} a="start">{lab}</Txt>
              <Txt x={-400} y={80} s={100} a="start" c={k > 0.5 ? C.mute : C.white}>{a}</Txt>
              {k > 0.5 && <line x1={-410} y1={50} x2={-410 + a.length * 62} y2={50} stroke={C.red} strokeWidth={10} strokeLinecap="round" />}
              <g transform="translate(-10 46)" opacity={k}><RArrow s={0.9} /></g>
              <g transform={`translate(400 46) scale(${lerp(0.4, 1, k)})`} opacity={k}><Txt x={0} y={34} s={100} c={C.amber} a="end">{b}</Txt></g>
            </g>
          );
        };
        return (
          <g>
            <Txt x={540} y={340} s={90}>Ab 1.1.2027</Txt>
            {row(640, "mindestens", "5 €", "7,50 €", m, b1c + 2)}
            {row(1010, "höchstens", "10 €", "15 €", x, wk("b1", "höchstens") - 6)}
            <g transform={`translate(540 1300) scale(${pop(f, wk("b1", "zehn", 1) + 2, 14)})`}><Pill w={700} text="Grenzen je +50 %" col={C.red} fg={C.white} s={56} h={110} /></g>
            <Src o={tw(f, b1c + 6, 10)}>bisher: mind. 5 €, max. 10 € · § 61 Satz 1 SGB V</Src>
          </g>
        );
      },
    },
    { // Nie mehr als das Mittel kostet
      a: b1d, b: b2, render: (f: number) => {
        const g = interpolate(f, [b1d + 6, b1d + 30], [0, 1], { ...CL, easing: OUT });
        const bar = Math.min(g * 7.5, 6);
        const k = 90;
        return (
          <g>
            <Txt x={540} y={340} s={84}>Packung für 6 €</Txt>
            <g transform="translate(300 820) scale(1.5)"><Pack w={220} col={C.green} /></g>
            <g transform="translate(300 1040)"><Pill w={200} text="6 €" col={C.white} s={60} h={100} /></g>
            <line x1={600} y1={1150} x2={960} y2={1150} stroke="#2A3F63" strokeWidth={8} strokeLinecap="round" />
            <rect x={700} y={1150 - 7.5 * k} width={160} height={7.5 * k} rx={14} fill="none" stroke={C.mute} strokeWidth={5} strokeDasharray="14 10" />
            <Txt x={780} y={1150 - 7.5 * k - 24} s={44} c={C.mute} w={700}>7,50 €</Txt>
            <rect x={700} y={1150 - bar * k} width={160} height={bar * k} rx={14} fill={C.green} />
            <line x1={680} y1={1150 - 6 * k} x2={880} y2={1150 - 6 * k} stroke={C.white} strokeWidth={6} opacity={g} />
            <Txt x={880} y={1150 - 6 * k + 20} s={56} a="start" o={g}>6 €</Txt>
            <Txt x={780} y={1220} s={40} c={C.gray} w={700}>Zuzahlung</Txt>
            <g transform={`translate(540 1320) scale(${pop(f, wk("b1", "kostet") - 2, 14)})`}><Pill w={780} text="nie mehr als der Preis" col={C.green} s={56} h={110} /></g>
          </g>
        );
      },
    },
    { // Krankenhaus 15 statt 10 € pro Tag
      a: b2, b: b2b, render: (f: number) => {
        const k = interpolate(f, [wk("b2", "fünfzehn") - 4, wk("b2", "fünfzehn") + 4], [0, 1], CL);
        const coinY = interpolate(f, [b2 + 6, b2 + 22], [-200, 0], { ...CL, easing: OUT });
        return (
          <g>
            <Txt x={540} y={340} s={96}>Krankenhaus</Txt>
            <g transform="translate(540 1000)"><Bed /></g>
            <g transform={`translate(540 ${650 + coinY})`}>
              <circle r={150} fill="#B9822F" transform="translate(0 12)" />
              <circle r={150} fill={k > 0.5 ? C.amber : "#C9D3E2"} />
              <circle r={110} fill="none" stroke="#0A111D" strokeOpacity={0.2} strokeWidth={8} />
              <g transform={`scale(1 ${Math.max(0.05, Math.abs(1 - 2 * k))})`}>
                <text y={36} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={100} fill="#0A111D">{k > 0.5 ? "15 €" : "10 €"}</text>
              </g>
            </g>
            <Txt x={540} y={870} s={46} c={C.gray} w={700}>pro Tag</Txt>
            <g transform={`translate(540 1300) scale(${pop(f, wk("b2", "pro") - 2, 14)})`}><Pill w={640} text="15 € statt 10 €" col={C.amber} s={60} h={116} /></g>
            <Src o={tw(f, b2 + 6, 10)}>{SRC61} (Satz 2)</Src>
          </g>
        );
      },
    },
    { // max. 28 Tage im Jahr
      a: b2b, b: b2c, render: (f: number) => {
        const n = Math.round(interpolate(f, [wk("b2", "achtundzwanzig") - 6, wk("b2", "tage") + 6], [0, 28], CL));
        return (
          <g>
            <Txt x={540} y={340} s={90}>höchstens</Txt>
            {Array.from({ length: 35 }).map((_, i) => {
              const c = i % 7, r = Math.floor(i / 7), on = i < n;
              return <rect key={i} x={170 + c * 106} y={480 + r * 106} width={90} height={90} rx={14} fill={on ? C.amber : i >= 28 ? "#16243B" : "#2A3F63"} opacity={on ? 1 : 0.9} />;
            })}
            <Txt x={540} y={1130} s={150} c={C.amber}>{`${n} Tage`}</Txt>
            <Txt x={540} y={1220} s={50} c={C.gray} w={700}>im Kalenderjahr</Txt>
            <Src o={tw(f, b2b + 6, 10)}>28-Tage-Grenze: § 39 Abs. 4 SGB V (unverändert)</Src>
          </g>
        );
      },
    },
    { // Physio-Rezept Pauschale
      a: b2c, b: b2d, render: (f: number) => {
        const k = interpolate(f, [wk("b2", "fünfzehn", 1) - 4, wk("b2", "fünfzehn", 1) + 4], [0, 1], CL);
        return (
          <g>
            <Txt x={540} y={340} s={96}>Physio-Rezept</Txt>
            <g transform="translate(540 840)"><Bench /></g>
            <g transform={`translate(330 640) rotate(-6) scale(${pop(f, b2c + 4, 14)})`}><Rx w={340} label="Verordnung" /></g>
            <g transform="translate(760 620)">
              <rect x={-170} y={-90} width={340} height={180} rx={26} fill={C.deep} stroke={k > 0.5 ? C.amber : "#2A3F63"} strokeWidth={6} />
              <Txt x={0} y={-30} s={36} c={C.gray} w={700}>Pauschale</Txt>
              <Txt x={0} y={60} s={84} c={k > 0.5 ? C.amber : C.white}>{k > 0.5 ? "15 €" : "10 €"}</Txt>
            </g>
            <g transform={`translate(540 1180) scale(${pop(f, wk("b2", "pauschale") - 2, 14)})`}><Pill w={800} text="15 € statt 10 € je Rezept" col={C.amber} s={52} h={110} /></g>
            <Src o={tw(f, b2c + 6, 10)}>{SRC61} (Satz 3), Heilmittel</Src>
          </g>
        );
      },
    },
    { // + wie bisher 10 %
      a: b2d, b: b3, render: (f: number) => {
        const p1 = pop(f, b2d + 4, 14), p2 = pop(f, wk("b2", "zehn", 2) - 2, 14);
        return (
          <g>
            <Txt x={540} y={340} s={84}>pro Verordnung</Txt>
            <g transform={`translate(300 800) scale(${p1})`}>
              <circle r={200} fill={C.amber} />
              <text y={40} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={116} fill="#0A111D">15 €</text>
            </g>
            <Txt x={540} y={850} s={140} o={p2}>+</Txt>
            <g transform={`translate(790 800) scale(${p2})`}>
              <circle r={170} fill={C.blue} />
              <text y={36} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={100} fill="#0A111D">10 %</text>
            </g>
            <Txt x={790} y={1050} s={42} c={C.gray} w={700} o={p2}>der Kosten</Txt>
            <Txt x={300} y={1080} s={42} c={C.gray} w={700} o={p1}>Pauschale</Txt>
            <g transform={`translate(540 1260) scale(${p2})`}><Pill w={520} text="10 % wie bisher" col={C.deep} fg={C.white} s={52} h={104} /></g>
          </g>
        );
      },
    },
    { // Grenze bleibt: Stapel wächst
      a: b3, b: b3b, render: (f: number) => {
        const n = interpolate(f, [b3, b3b + 10], [3, 13], CL);
        return (
          <g>
            <Txt x={540} y={340} s={84}>Deine Grenze</Txt>
            <Txt x={540} y={430} s={84} c={C.green}>bleibt gleich</Txt>
            <g transform="translate(540 0)"><Stack n={n} base={1250} /></g>
            <Txt x={540} y={1370} s={40} c={C.gray} w={700}>alle Zuzahlungen im Jahr</Txt>
            <Src o={tw(f, b3 + 6, 10)}>§ 62 Abs. 1 SGB V, unverändert</Src>
          </g>
        );
      },
    },
    { // 2 % Deckel
      a: b3b, b: b3c, render: (f: number) => {
        const ly = interpolate(f, [b3b + 4, wk("b3", "zwei") + 6], [300, 760], { ...CL, easing: OUT });
        const n = Math.min(interpolate(f, [b3b, b3c], [13, 22], CL), (1250 - ly - 40) / 30 + 1);
        return (
          <g>
            <Txt x={540} y={340} s={84}>Belastungsgrenze</Txt>
            <g transform="translate(540 0)"><Stack n={n} base={1250} /><Lid y={ly} label="2 %" /></g>
            <g transform={`translate(540 1325) scale(${pop(f, wk("b3", "bruttojahreseinkommen") - 2, 14)})`}><Pill w={740} text="vom Bruttojahreseinkommen" col={C.deep} fg={C.white} s={46} h={96} /></g>
            <Src o={tw(f, b3b + 6, 10)}>vereinfacht · Familien-Freibeträge nicht berücksichtigt</Src>
          </g>
        );
      },
    },
    { // chronisch krank 1 %
      a: b3c, b: b4, render: (f: number) => {
        const ly = interpolate(f, [wk("b3", "=ein") - 6, wk("b3", "=ein") + 12], [760, 1000], { ...CL, easing: OUT });
        const n = Math.min(17, (1250 - ly - 40) / 30 + 1);
        return (
          <g>
            <Txt x={540} y={340} s={84}>chronisch krank</Txt>
            <g transform="translate(540 0)"><Stack n={n} base={1250} /><Lid y={ly} label="1 %" heart /></g>
            <Txt x={540} y={1370} s={40} c={C.gray} w={700}>darüber: keine Zuzahlung mehr</Txt>
            <Src o={tw(f, b3c + 6, 10)}>§ 62 Abs. 1 Satz 2 SGB V</Src>
          </g>
        );
      },
    },
    { // Befreiung beantragen
      a: b4, b: b4b, render: (f: number) => {
        const t = interpolate(f, [b4 + 8, wk("b4", "kasse")], [0, 1], { ...CL, easing: IO });
        return (
          <g>
            <Txt x={540} y={340} s={84}>Befreiung</Txt>
            <Txt x={540} y={430} s={84} c={C.green}>beantragen</Txt>
            <g transform="translate(720 1000)"><Kasse /></g>
            <g transform={`translate(${lerp(260, 640, t)} ${lerp(760, 1060, t) - Math.sin(t * Math.PI) * 140}) rotate(${lerp(-10, 6, t)}) scale(${lerp(1, 0.55, t)})`} opacity={1 - tw(f, wk("b4", "kasse") + 4, 8)}><Env /></g>
            <Src o={tw(f, b4 + 6, 10)}>Keine Rechts- oder Steuerberatung</Src>
          </g>
        );
      },
    },
    { // Quittungen sammeln
      a: b4b, b: b4c, render: (f: number) => {
        const fill = interpolate(f, [b4b + 4, wk("b4", "sammeln") + 4], [0, 1], CL);
        return (
          <g>
            <Txt x={540} y={340} s={84}>Quittungen sammeln</Txt>
            <g transform="translate(540 1060)"><Box f={f} fill={fill} top="7,50 €" /></g>
          </g>
        );
      },
    },
    { // Loop: zurück zum Tresen
      a: b4c, b: fE, kind: "zoom" as const, render: (f: number) => (
        <g>
          <Txt x={540} y={300} s={60} c={C.gray} w={700}>ab Januar zählt</Txt>
          <Txt x={540} y={430} s={110} c={C.amber}>jede Quittung</Txt>
          <Counter f={f} rx={1} flip={1} rcpt="5,00 €" rcpt2="7,50 €" />
          <g transform="translate(230 700) rotate(-8)"><CalSheet top="Januar" big="1.1." s={0.95} /></g>
        </g>
      ),
    },
  ];

  const hi = ["januar", "beschlossen", "nie", "krankenhaus", "physio", "pauschale", "grenze", "chronisch", "befreiung", "quittungen", "sammeln"];
  const cs = chunks(D.paras as any, ["hook", "b1", "b2", "b3", "b4", ...(end === "tt" ? ["tt"] : [])], [
    ["sieben euro fünfzig", "7,50 €"], ["fünf euro", "5 €"], ["zehn euro", "10 €"], ["zehn prozent", "10 %"], ["zwei prozent", "2 %"], ["ein prozent", "1 %"],
    ["achtundzwanzig tage", "28 Tage"], ["fünfzehn", "15"], ["zehn", "10"], ["fünf", "5"],
  ]);
  const subEnd = end === "tt" ? TOT - 6 : pe("b4") + 8;
  const endIn = tw(f, fE, 16);

  const sfx: [number, string, number?][] = [
    [2, "paper", 0.6], [wk("hook", "januar") - 4, "soft", 0.7], [wk("hook", "sieben") - 4, "ding", 0.6],
    [b1 - 4, "whoosh", 0.7], [wk("b1", "beschlossen"), "stamp", 0.6], [b1b - 4, "whoosh", 0.5], [wk("b1", "zehn") - 4, "soft", 0.6],
    [b1c - 4, "whoosh", 0.6], [wk("b1", "sieben") - 4, "coins", 0.5], [wk("b1", "fünfzehn") - 4, "coins", 0.5],
    [b1d - 4, "whoosh", 0.6], [wk("b1", "kostet") - 2, "ding", 0.5],
    [b2 - 4, "whoosh", 0.7], [b2 + 18, "coins", 0.5], [b2b - 4, "whoosh", 0.5], [wk("b2", "achtundzwanzig") - 6, "marimba", 0.5],
    [b2c - 4, "whoosh", 0.6], [b2c + 4, "paper", 0.5], [b2d - 4, "whoosh", 0.5], [wk("b2", "zehn", 2) - 2, "soft", 0.6],
    [b3 - 4, "whoosh", 0.7], [b3 + 10, "coins", 0.4], [wk("b3", "zwei") + 4, "stamp", 0.5], [wk("b3", "=ein") + 10, "soft", 0.7],
    [b4 - 4, "whoosh", 0.7], [b4 + 8, "paper", 0.6], [b4b - 4, "whoosh", 0.5], [wk("b4", "sammeln"), "paper", 0.5],
    [b4c - 4, "whoosh", 0.6], [fE - 6, "whoosh", 0.8],
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
              ? <EndYT f={f} at={fE} line="Wir rechnen nach, bevor du zahlst." />
              : <EndTT f={f} at={fE} q={["Wie viel zahlst du", "im Jahr zu?"]} opts={[["unter 50 €", C.green], ["50 bis 200 €", C.amber], ["mehr als 200 €", C.red]]} />}
          </g>
        )}
      </svg>
      <Sub f={f} cs={cs} end={subEnd} hi={hi} />
      <Grain f={f} />
      <Audio src={staticFile(`audio/s12_${end}.wav`)} />
      <SfxTrack list={sfx} />
    </AbsoluteFill>
  );
};
export const Short12YT: React.FC = () => <Short12 end="yt" />;
export const Short12TT: React.FC = () => <Short12 end="tt" />;
