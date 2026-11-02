/* Short 27 – Mogelpackung: Lorenz Erdnuss Locken Mexican Style 175 g → 150 g, Edeka gleicher Preis 2,29 € (VZHH Mogelpackungsliste Okt. 2026), Grundpreis 13,09 → 15,27 €/kg (+16,7 %) */
import React from "react";
import { AbsoluteFill, random, staticFile, useCurrentFrame } from "remotion";
import { Audio } from "@remotion/media";
import { Backdrop, Stripes } from "../kit/Stage";
import { PriceTag } from "../kit/Props";
import { C, CL, CLOSING, EndShare, EndYT, FONT, Grain, Pill, Scenes, Src, SfxTrack, Sub, Txt, W, H, chunks, interpolate, lerp, mk, pop, tw } from "./shortkit";
import D from "../data/s27.json";

const { wk, ps, pe, DUR } = mk(D as any);
export const S27_DUR = DUR;
const INK = "#0A111D";
const BAG = "#4A5C7E", BAG2 = "#3A4966";
const CURL = ["#E7A54A", "#D48F3A", "#F0B865", "#C98235"];

/** generische Erdnusslocke (gezeichnet, kein Produktfoto) */
const Curl: React.FC<{ s?: number; rot?: number; col?: string }> = ({ s = 1, rot = 0, col = CURL[0] }) => (
  <g transform={`rotate(${rot}) scale(${s})`}>
    <path d="M -40 10 Q -46 -22 -18 -30 Q 4 -36 10 -16 Q 14 -4 26 -10 Q 44 -16 44 6 Q 42 30 14 30 Q -4 30 -10 20 Q -18 30 -30 26 Q -40 22 -40 10 Z" fill={col} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
    <circle cx={-16} cy={-8} r={3} fill="#9A5E24" /><circle cx={20} cy={8} r={3} fill="#9A5E24" /><circle cx={-4} cy={14} r={2.5} fill="#9A5E24" />
  </g>
);

/** neutrale Snacktüte ohne Marke; fill = Füllstand 0..1; label = Grammzahl */
const Bag: React.FC<{ label: string; col?: string; fill: number; seed: string; s?: number; strike?: number }> = ({ label, col = C.white, fill, seed, s = 1, strike = 0 }) => {
  const top = 200 - 340 * fill;
  return (
    <g transform={`scale(${s})`}>
      <ellipse cx={0} cy={250} rx={170} ry={24} fill={INK} opacity={0.45} />
      <path d="M -150 -230 L 150 -230 Q 172 0 150 230 L -150 230 Q -172 0 -150 -230 Z" fill={BAG} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      {/* Sichtfenster mit Füllstand */}
      <clipPath id={`win${seed}`}><rect x={-110} y={-140} width={220} height={340} rx={30} /></clipPath>
      <rect x={-110} y={-140} width={220} height={340} rx={30} fill={BAG2} />
      <g clipPath={`url(#win${seed})`}>
        <rect x={-110} y={top} width={220} height={400} fill="#F0B865" opacity={0.18} />
        {Array.from({ length: 34 }, (_, i) => {
          const x = -95 + random(`${seed}x${i}`) * 190, y = top + 20 + random(`${seed}y${i}`) * 360;
          return <g key={i} transform={`translate(${x} ${y})`}><Curl s={0.62} rot={random(`${seed}r${i}`) * 360} col={CURL[i % 4]} /></g>;
        })}
        <line x1={-110} y1={top} x2={110} y2={top} stroke={C.white} strokeWidth={5} strokeDasharray="14 10" opacity={0.75} />
      </g>
      <rect x={-110} y={-140} width={220} height={340} rx={30} fill="none" stroke={INK} strokeWidth={5} />
      {/* Falz oben/unten */}
      {[-230, 230].map((y) => <path key={y} d={`M -150 ${y} ${Array.from({ length: 10 }, (_, i) => `L ${-150 + 30 * i + 15} ${y + (y < 0 ? -14 : 14)} L ${-150 + 30 * (i + 1)} ${y}`).join(" ")}`} fill={BAG} stroke={INK} strokeWidth={5} strokeLinejoin="round" />)}
      <text y={-166} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={58} fill={col} stroke={INK} strokeWidth={5} paintOrder="stroke">{label}</text>
      {strike > 0 && <line x1={-90} y1={-186} x2={lerp(-90, 90, strike)} y2={lerp(-186, -166, strike)} stroke={C.red} strokeWidth={12} strokeLinecap="round" />}
    </g>
  );
};

/** Frame 0 / Loop: zwei Tüten, ein gemeinsames Preisschild */
const TwoBags: React.FC<{ f: number; q?: number }> = ({ f, q = 0 }) => (
  <g>
    <g transform="translate(290 1020)"><Bag label="175 g" fill={0.92} seed="L" s={1.05} /></g>
    <g transform="translate(790 1020)"><Bag label="150 g" col={C.amber} fill={0.62} seed="R" s={1.05} /></g>
    <path d="M 290 640 L 540 520 L 790 640" stroke={C.mute} strokeWidth={5} fill="none" />
    <PriceTag f={f} x={540} y={500} a="2,29 €" s={1.5} />
    {q > 0 && (
      <g transform={`translate(${lerp(1000, 900, q)} ${1060 + Math.sin(f / 7) * 6})`} opacity={q}>
        <circle r={70} fill={INK} opacity={0.85} stroke={C.amber} strokeWidth={10} />
        <text y={34} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={96} fill={C.amber}>?</text>
        <line x1={50} y1={50} x2={110} y2={110} stroke={C.amber} strokeWidth={22} strokeLinecap="round" />
      </g>
    )}
  </g>
);

const Sign: React.FC<{ w: number; h: number; col: string; children: React.ReactNode }> = ({ w, h, col, children }) => (
  <g>
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={20} fill={INK} opacity={0.35} transform="translate(8 12)" />
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={20} fill={col} />
    {children}
  </g>
);

/** Regal-Preisschild: dim = Packungspreis abgeblendet, hl = Grundpreiszeile hervorgehoben */
const ShelfTag: React.FC<{ name: string; price: string; base: string; dim?: number; hl?: number }> = ({ name, price, base, dim = 0, hl = 0 }) => (
  <g>
    <rect x={-400} y={-80} width={800} height={34} rx={8} fill="#5A6B88" />
    <rect x={-320} y={-46} width={640} height={400} rx={18} fill={INK} opacity={0.35} transform="translate(8 12)" />
    <rect x={-320} y={-46} width={640} height={400} rx={18} fill={C.white} />
    <text x={-280} y={26} fontFamily={FONT} fontWeight={700} fontSize={38} fill={C.mute}>{name}</text>
    <text x={-280} y={160} fontFamily={FONT} fontWeight={800} fontSize={124} fill={INK} opacity={1 - 0.78 * dim}>{price}</text>
    <rect x={-292} y={232} width={584} height={64} rx={12} fill={C.green} opacity={0.35 * hl} />
    <text x={-280} y={278} fontFamily={FONT} fontWeight={700} fontSize={36} fill={hl > 0.5 ? INK : C.mute}>{base}</text>
  </g>
);

const Lens: React.FC<{ l1: string; l2: string; r?: number }> = ({ l1, l2, r = 150 }) => (
  <g>
    <line x1={r * 0.72} y1={r * 0.72} x2={r * 1.45} y2={r * 1.45} stroke={C.green} strokeWidth={36} strokeLinecap="round" />
    <circle r={r} fill={INK} opacity={0.94} stroke={C.green} strokeWidth={14} />
    <text y={-18} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={38} fill={C.gray}>{l1}</text>
    <text y={42} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={50} fill={C.green}>{l2}</text>
  </g>
);

const Check: React.FC<{ p: number; s?: number }> = ({ p, s = 1 }) => (
  <g transform={`scale(${s * p})`} opacity={Math.min(1, p * 2)}>
    <circle r={60} fill={C.green} stroke={INK} strokeWidth={6} />
    <path d="M -28 2 L -8 24 L 30 -22" stroke={INK} strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </g>
);

export const Short27: React.FC<{ end: "yt" | "tt" }> = ({ end }) => {
  const f = useCurrentFrame();
  const h25 = wk("hook", "fünfundzwanzig");
  const s1 = h25 - 6;
  const b1 = ps("b1") - 4, b1b = wk("b1", "=so") - 4;
  const b2 = ps("b2") - 4, b2b = wk("b2", "eine") - 4;
  const b3 = ps("b3") - 4, b3b = wk("b3", "verboten") - 4;
  const b4 = ps("b4") - 4, b4b = wk("b4", "sondern") - 4, b4c = wk("b4", "=der") - 4;
  const closeAt = wk(end, "groschenfall") - 4;
  const fE = end === "yt" ? closeAt - 4 : ps(end) - 8;
  const loop = ps("yt") - 4;

  const scenes = [
    {
      // Frame 0: Konflikt sofort sichtbar
      a: 0, b: s1, render: (f: number) => (
        <g>
          <Txt x={540} y={250} s={92} c={C.white}>Gleicher Preis.</Txt>
          <Txt x={540} y={360} s={92} c={C.amber}>25 g weniger.</Txt>
          <TwoBags f={f} />
          <Src o={tw(f, 20, 10)} y={1370}>Quelle: VZHH, Mogelpackungsliste Okt. 2026</Src>
        </g>
      ),
    },
    {
      // b1(a): Grammzahl-Nahaufnahme + Bauchbinde
      a: s1, b: b1, render: (f: number) => {
        const st = interpolate(f, [h25 + 2, h25 + 14], [0, 1], CL);
        const nw = pop(f, wk("hook", "gramm") + 2, 14);
        return (
          <g>
            <g transform="translate(540 760) scale(1.25)"><Bag label="175 g" fill={lerp(0.92, 0.62, nw)} seed="Z" strike={st} /></g>
            <g transform={`translate(780 470) scale(${nw}) rotate(-6)`} opacity={Math.min(1, nw * 2)}>
              <Pill w={340} text="150 g" col={C.amber} s={84} h={150} />
            </g>
            <Txt x={540} y={350} s={110} c={C.red} o={tw(f, h25, 8)}>– 25 g</Txt>
            <g opacity={tw(f, s1 + 4, 10)} transform={`translate(${lerp(-200, 0, tw(f, s1 + 4, 12))} 0)`}>
              <rect x={40} y={1240} width={1000} height={130} rx={18} fill={INK} opacity={0.85} />
              <rect x={40} y={1240} width={16} height={130} fill={C.amber} />
              <text x={84} y={1295} fontFamily={FONT} fontWeight={800} fontSize={44} fill={C.white}>Lorenz Erdnuss Locken</text>
              <text x={84} y={1348} fontFamily={FONT} fontWeight={700} fontSize={38} fill={C.gray}>Mexican Style</text>
            </g>
          </g>
        );
      },
    },
    {
      // b1(b): Preisschild gleich, bei Edeka
      a: b1, b: b1b, render: (f: number) => {
        const r = pop(f, b1 + 8, 14), eq = pop(f, wk("b1", "gleich") - 2, 14);
        return (
          <g>
            <Txt x={540} y={340} s={88}>Preis: gleich</Txt>
            <g transform="translate(250 560)"><PriceTag f={f} x={0} y={0} a="2,29 €" s={2} /></g>
            <Txt x={250} y={530} s={44} c={C.gray} w={700}>vorher 175 g</Txt>
            <g transform={`translate(830 560)`} opacity={Math.min(1, r * 2)}><PriceTag f={f} x={0} y={0} a="2,29 €" s={2 * Math.max(0.01, r)} /></g>
            <Txt x={830} y={530} s={44} c={C.amber} w={700} o={r}>jetzt 150 g</Txt>
            <path d="M 470 680 L 590 680" stroke={C.gray} strokeWidth={12} strokeLinecap="round" opacity={r} />
            <path d="M 580 655 L 616 680 L 580 705 Z" fill={C.gray} opacity={r} />
            <g transform={`translate(540 980) scale(${eq})`} opacity={Math.min(1, eq * 2)}>
              <circle r={110} fill={C.blue} stroke={INK} strokeWidth={8} />
              <rect x={-55} y={-34} width={110} height={22} rx={8} fill={INK} />
              <rect x={-55} y={12} width={110} height={22} rx={8} fill={INK} />
            </g>
            <Txt x={540} y={1200} s={64} c={C.white} o={tw(f, wk("b1", "edeka") - 2, 10)}>bei Edeka</Txt>
            <Src o={tw(f, b1 + 6, 10)}>Quelle: VZHH, Mogelpackungsliste Okt. 2026</Src>
          </g>
        );
      },
    },
    {
      // b1: Klemmbrett Mogelpackungsliste
      a: b1b, b: b2, render: (f: number) => {
        const ck = pop(f, wk("b1", "mogelpackungsliste") + 6, 14);
        const vz = tw(f, wk("b1", "verbraucherzentrale") - 2, 10);
        return (
          <g>
            <Txt x={540} y={330} s={84}>Auf der Liste</Txt>
            <g transform="translate(540 820) rotate(-3)">
              <rect x={-300} y={-360} width={600} height={720} rx={30} fill={INK} opacity={0.35} transform="translate(8 12)" />
              <rect x={-300} y={-360} width={600} height={720} rx={30} fill="#8A6A4A" stroke={INK} strokeWidth={6} />
              <rect x={-260} y={-310} width={520} height={640} rx={12} fill={C.white} />
              <rect x={-90} y={-390} width={180} height={70} rx={16} fill={C.gray} stroke={INK} strokeWidth={6} />
              <text y={-230} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={48} fill={INK}>Mogelpackungsliste</text>
              <line x1={-220} y1={-200} x2={220} y2={-200} stroke={C.gray} strokeWidth={4} strokeDasharray="10 8" />
              {[-150, 120, 220].map((y) => <rect key={y} x={-220} y={y} width={340} height={26} rx={12} fill={C.gray} opacity={0.7} />)}
              <text x={-220} y={-60} fontFamily={FONT} fontWeight={800} fontSize={42} fill={INK}>Erdnuss Locken</text>
              <rect x={-220} y={-40} width={300} height={14} rx={7} fill={C.amber} />
              <text x={-220} y={30} fontFamily={FONT} fontWeight={800} fontSize={36} fill={C.mute}>175 g → 150 g</text>
              <g transform="translate(180 -20)"><Check p={ck} s={0.85} /></g>
            </g>
            <Txt x={540} y={1300} s={44} c={C.gray} w={700} o={vz}>Verbraucherzentrale Hamburg</Txt>
            <Src o={tw(f, b1b + 6, 10)}>Quelle: VZHH, Mogelpackungsliste Okt. 2026</Src>
          </g>
        );
      },
    },
    {
      // b2(a): Grundpreis vorher/nachher + Badge
      a: b2, b: b2b, render: (f: number) => {
        const r = pop(f, wk("b2", "teurer") - 4, 14), bd = pop(f, wk("b2", "geworden") + 2, 14);
        return (
          <g>
            <Txt x={540} y={330} s={84}>Pro Kilo teurer</Txt>
            <g transform="translate(540 620)"><Sign w={640} h={180} col={C.white}>
              <text x={-280} y={-22} fontFamily={FONT} fontWeight={700} fontSize={34} fill={C.mute}>vorher 175 g</text>
              <text x={-280} y={52} fontFamily={FONT} fontWeight={800} fontSize={74} fill={INK}>13,09 €/kg</text>
            </Sign></g>
            <path d="M 540 740 L 540 800" stroke={C.gray} strokeWidth={12} strokeLinecap="round" opacity={r} />
            <path d="M 512 790 L 540 830 L 568 790 Z" fill={C.gray} opacity={r} />
            <g transform={`translate(540 960) scale(${r})`} opacity={Math.min(1, r * 2)}><Sign w={640} h={180} col={C.red}>
              <text x={-280} y={-22} fontFamily={FONT} fontWeight={700} fontSize={34} fill={INK}>jetzt 150 g</text>
              <text x={-280} y={52} fontFamily={FONT} fontWeight={800} fontSize={74} fill={INK}>15,27 €/kg</text>
            </Sign></g>
            <g transform={`translate(800 1150) rotate(-8) scale(${bd})`} opacity={Math.min(1, bd * 2)}>
              <Pill w={320} text="+16,7 %" col={C.amber} s={70} h={130} />
            </g>
            <Txt x={540} y={1340} s={34} c={C.gray} w={600} o={bd}>eigene Rechnung nach VZHH</Txt>
            <Src o={tw(f, b2 + 6, 10)}>2,29 € ÷ 175 g bzw. 150 g</Src>
          </g>
        );
      },
    },
    {
      // b2(b): Locke auf Waage, Zeiger klettert
      a: b2b, b: b3, render: (f: number) => {
        const ang = interpolate(f, [b2b + 6, wk("b2", "packungspreis")], [-50, 40], CL);
        return (
          <g>
            <Txt x={540} y={330} s={80} c={C.amber}>Versteckte</Txt>
            <Txt x={540} y={430} s={80} c={C.amber}>Preiserhöhung</Txt>
            <g transform="translate(540 900)">
              <ellipse cx={0} cy={250} rx={260} ry={26} fill={INK} opacity={0.45} />
              <rect x={-240} y={-40} width={480} height={290} rx={40} fill="#2A4A7A" stroke={INK} strokeWidth={7} />
              <rect x={-280} y={-80} width={560} height={50} rx={20} fill="#8FA6D6" stroke={INK} strokeWidth={6} />
              <g transform="translate(0 -128)"><Curl s={2.4} rot={-10} /></g>
              <circle cx={0} cy={100} r={92} fill={C.white} stroke={INK} strokeWidth={6} />
              <path d="M -76 100 A 76 76 0 0 1 76 100" stroke={C.gray} strokeWidth={8} fill="none" />
              <path d="M 38 34 A 76 76 0 0 1 76 100" stroke={C.red} strokeWidth={10} fill="none" />
              <g transform={`translate(0 100) rotate(${ang})`}>
                <line x1={0} y1={0} x2={0} y2={-80} stroke={C.red} strokeWidth={8} strokeLinecap="round" />
              </g>
              <circle cx={0} cy={100} r={12} fill={INK} />
              <text y={234} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={30} fill={C.white}>€ pro Locke</text>
            </g>
            <g opacity={tw(f, wk("b2", "packungspreis") - 2, 10)}>
              <Txt x={540} y={1300} s={50} c={C.gray} w={700}>am Packungspreis: unsichtbar</Txt>
            </g>
          </g>
        );
      },
    },
    {
      // b3(a): Sprechblase „höhere Kosten“
      a: b3, b: b3b, render: (f: number) => {
        const bb = pop(f, b3 + 6, 14);
        return (
          <g>
            <Txt x={540} y={330} s={84}>Die Begründung</Txt>
            <g transform={`translate(540 760) scale(${bb})`} opacity={Math.min(1, bb * 2)}>
              <path d="M -380 -170 Q -380 -210 -340 -210 L 340 -210 Q 380 -210 380 -170 L 380 110 Q 380 150 340 150 L -60 150 L -160 260 L -150 150 L -340 150 Q -380 150 -380 110 Z" fill={INK} opacity={0.35} transform="translate(8 12)" />
              <path d="M -380 -170 Q -380 -210 -340 -210 L 340 -210 Q 380 -210 380 -170 L 380 110 Q 380 150 340 150 L -60 150 L -160 260 L -150 150 L -340 150 Q -380 150 -380 110 Z" fill={C.white} stroke={INK} strokeWidth={6} />
              <text y={-6} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={96} fill={C.amber} stroke={INK} strokeWidth={4} paintOrder="stroke">höhere</text>
              <text y={96} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={96} fill={C.amber} stroke={INK} strokeWidth={4} paintOrder="stroke">Kosten</text>
            </g>
            <Txt x={540} y={1150} s={38} c={C.gray} w={700} o={tw(f, b3 + 14, 10)}>sinngemäß: Lorenz an die VZHH</Txt>
            <Src o={tw(f, b3 + 6, 10)}>Quelle: VZHH, Mogelpackungsliste Okt. 2026</Src>
          </g>
        );
      },
    },
    {
      // b3(b): Schild „grundsätzlich erlaubt“ + Blickpfeil
      a: b3b, b: b4, render: (f: number) => {
        const sg = pop(f, b3b + 4, 14), ar = interpolate(f, [wk("b3", "wo") - 6, wk("b3", "hinschaust") + 4], [0, 1], CL);
        return (
          <g>
            <Txt x={540} y={330} s={84}>Nicht verboten</Txt>
            <g transform="translate(270 900)"><Bag label="150 g" col={C.amber} fill={0.62} seed="E" s={0.85} /></g>
            <g transform={`translate(760 640) rotate(4) scale(${sg})`} opacity={Math.min(1, sg * 2)}>
              <rect x={-12} y={60} width={24} height={300} fill="#5A6B88" stroke={INK} strokeWidth={5} />
              <Sign w={480} h={190} col={C.blue}>
                <text y={-12} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={54} fill={INK}>grundsätzlich</text>
                <text y={54} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={54} fill={INK}>erlaubt</text>
              </Sign>
            </g>
            <g opacity={ar}>
              <path d={`M 500 1180 Q 700 1260 ${lerp(520, 900, ar)} ${lerp(1180, 1150, ar)}`} stroke={C.green} strokeWidth={14} fill="none" strokeLinecap="round" />
              <path d="M 0 -26 L 36 0 L 0 26 Z" fill={C.green} transform={`translate(${lerp(520, 900, ar)} ${lerp(1180, 1150, ar)}) rotate(-15)`} />
              <Txt x={720} y={1340} s={52} c={C.green}>wo du hinschaust</Txt>
            </g>
            <Src o={tw(f, b3b + 6, 10)}>Quelle: VZHH</Src>
          </g>
        );
      },
    },
    {
      // b4(a): Regalschild, Packungspreis abgeblendet
      a: b4, b: b4b, render: (f: number) => {
        const dim = interpolate(f, [wk("b4", "nicht") - 2, wk("b4", "nicht") + 10], [0, 1], CL);
        return (
          <g>
            <Txt x={540} y={330} s={84} c={C.green}>Dein Schutz</Txt>
            <g transform={`translate(540 720) scale(${pop(f, b4 + 6, 14)})`}><ShelfTag name="Erdnuss Locken 150 g" price="2,29 €" base="Grundpreis 15,27 €/kg" dim={dim} /></g>
            <g opacity={dim}>
              <line x1={300} y1={790} x2={760} y2={790} stroke={C.red} strokeWidth={12} strokeLinecap="round" />
              <Txt x={540} y={1260} s={56} c={C.red}>nicht der Packungspreis</Txt>
            </g>
          </g>
        );
      },
    },
    {
      // b4(b): Lupe auf Grundpreis
      a: b4b, b: b4c, render: (f: number) => {
        const ln = interpolate(f, [wk("b4", "kleine") - 6, wk("b4", "zeile") + 6], [0, 1], CL);
        const hl = tw(f, wk("b4", "grundpreis") - 2, 8);
        return (
          <g>
            <Txt x={540} y={330} s={84}>Die kleine Zeile</Txt>
            <g transform="translate(540 640)"><ShelfTag name="Erdnuss Locken 150 g" price="2,29 €" base="Grundpreis 15,27 €/kg" dim={1} hl={hl} /></g>
            {ln > 0 && (
              <g transform={`translate(${lerp(820, 470, ln)} ${lerp(1250, 940, ln)})`} opacity={Math.min(1, ln * 2)}>
                <Lens l1="Grundpreis" l2="15,27 €/kg" r={160} />
              </g>
            )}
            <Src o={tw(f, b4b + 6, 10)}>Quelle: Preisangabenverordnung (PAngV), § 4</Src>
          </g>
        );
      },
    },
    {
      // b4(c): Tüte A / Tüte B
      a: b4c, b: end === "yt" ? loop : fE - 6, render: (f: number) => {
        const ck = pop(f, wk("b4", "günstiger") - 2, 14);
        return (
          <g>
            <Txt x={540} y={330} s={80}>Welche Tüte ist</Txt>
            <Txt x={540} y={430} s={80} c={C.green}>günstiger?</Txt>
            {[["Tüte A", "2,29 €", "15,27 €/kg", 270, false], ["Tüte B", "2,79 €", "11,16 €/kg", 810, true]].map(([n, p, g, x, win]) => (
              <g key={n as string} transform={`translate(${x} 820)`}>
                <rect x={-230} y={-200} width={460} height={420} rx={20} fill={INK} opacity={0.35} transform="translate(8 12)" />
                <rect x={-230} y={-200} width={460} height={420} rx={20} fill={C.white} stroke={win && ck > 0.5 ? C.green : "none"} strokeWidth={12} />
                <text y={-120} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={50} fill={INK}>{n as string}</text>
                <text y={20} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={84} fill={INK} opacity={0.3}>{p as string}</text>
                <rect x={-200} y={90} width={400} height={80} rx={14} fill={win && ck > 0.5 ? C.green : "#E3E9F2"} />
                <text y={144} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={46} fill={INK}>{g as string}</text>
              </g>
            ))}
            <g transform="translate(990 620)"><Check p={ck} s={1.1} /></g>
            <Txt x={540} y={1180} s={34} c={C.gray} w={600} o={tw(f, b4c + 10, 10)}>Beispielwerte</Txt>
          </g>
        );
      },
    },
    ...(end === "tt" ? [] : [{
      // Loop: zurück zu den zwei Tüten aus Frame 0
      a: loop, b: fE - 6, render: (f: number) => (
        <g>
          <Txt x={540} y={250} s={92} c={C.white}>Gleicher Preis.</Txt>
          <Txt x={540} y={360} s={92} c={C.amber}>25 g weniger.</Txt>
          <TwoBags f={f} q={tw(f, wk("yt", "nächste") - 4, 12)} />
        </g>
      ),
    }]),
  ];

  const hi = ["mogelpackung", "lorenz", "weniger", "gleich", "edeka", "teurer", "preiserhöhung", "verboten", "grundpreis", "kilo", "günstiger", "packungspreis"];
  const cs = chunks(D.paras as any, ["hook", "b1", "b2", "b3", "b4"], [
    ["fünfundzwanzig gramm", "25 g"],
  ]);
  const subEnd = pe("b4") + 8;
  const endIn = tw(f, fE, 16);

  const sfx: [number, string, number?][] = [
    [0, "soft", 0.7], [h25 + 2, "paper", 0.5], [wk("hook", "gramm") + 2, "stamp", 0.45],
    [b1 - 4, "whoosh", 0.7], [wk("b1", "gleich") - 2, "ding", 0.4],
    [b1b - 2, "whoosh", 0.6], [wk("b1", "mogelpackungsliste") + 6, "marimba", 0.4],
    [b2 - 4, "whoosh", 0.7], [wk("b2", "teurer") - 4, "coins", 0.4],
    [b2b - 2, "whoosh", 0.6],
    [b3 - 4, "whoosh", 0.7], [wk("b3", "höhere") - 4, "soft", 0.5],
    [b3b - 2, "whoosh", 0.6], [b3b + 4, "stamp", 0.4],
    [b4 - 4, "whoosh", 0.7], [wk("b4", "kleine") - 6, "soft", 0.5],
    [b4b - 2, "whoosh", 0.6], [wk("b4", "grundpreis") - 2, "ding", 0.4],
    [b4c - 2, "whoosh", 0.6], [wk("b4", "günstiger") - 2, "marimba", 0.4],
    ...(end === "yt" ? [[loop - 2, "whoosh", 0.6]] as [number, string, number][] : []),
    [fE - 6, "whoosh", 0.8], [closeAt, "coins", 0.4],
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
              ? <EndYT f={f} at={fE} line={CLOSING} />
              : (
                <g>
                  <EndShare f={f} at={fE} who={["zum Fernsehabend", "immer Erdnuss"]} closeAt={closeAt} />
                  <Txt x={540} y={960} s={74} c={C.amber} o={tw(f, fE + 12, 12)}>Locken mitbringt.</Txt>
                </g>
              )}
          </g>
        )}
      </svg>
      <Sub f={f} cs={cs} end={subEnd} hi={hi} />
      <Grain f={f} />
      <Audio src={staticFile(`audio/s27_${end}.wav`)} />
      <SfxTrack list={sfx} />
    </AbsoluteFill>
  );
};
export const Short27YT: React.FC = () => <Short27 end="yt" />;
export const Short27TT: React.FC = () => <Short27 end="tt" />;
