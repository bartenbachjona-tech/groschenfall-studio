/* Short 25 – Heizkostenabrechnung: Ableser-Zähler (Röhrchen) bis 31.12.2026 umrüsten, sonst 3 % kürzen (§ 5 Abs. 3, § 12 Abs. 1 HeizkostenV); Funkzähler ohne Monatsinfo → schon jetzt 3 % (§ 6a) */
import React from "react";
import { AbsoluteFill, staticFile, useCurrentFrame } from "remotion";
import { Audio } from "@remotion/media";
import { Backdrop, Stripes } from "../kit/Stage";
import { Stamp } from "../kit/Props";
import { C, CL, CLOSING, EndShare, EndYT, FONT, Grain, Pill, Scenes, Src, SfxTrack, Sub, Txt, W, H, chunks, interpolate, lerp, mk, pop, tw } from "./shortkit";
import D from "../data/s25.json";

const { wk, ps, pe, DUR } = mk(D as any);
export const S25_DUR = DUR;
const INK = "#0A111D";
const SKIN = "#D8B391";

/* ---------- Bausteine ---------- */

/** Heizkörper (Mitte = Ursprung), dev = Röhrchen-Verdunster (Bernstein) oder Funkzähler (Minze) */
const Radiator: React.FC<{ dev: "tube" | "radio"; f: number; s?: number; waves?: number }> = ({ dev, f, s = 1, waves = 1 }) => (
  <g transform={`scale(${s})`}>
    <rect x={-120} y={-60} width={240} height={130} rx={14} fill={INK} opacity={0.35} transform="translate(6 8)" />
    <rect x={-120} y={-60} width={240} height={130} rx={14} fill="#C9D3E2" stroke={INK} strokeWidth={5} />
    {Array.from({ length: 7 }, (_, i) => <rect key={i} x={-104 + i * 30} y={-48} width={16} height={106} rx={8} fill="#E8EDF4" stroke="#9AA8BE" strokeWidth={2} />)}
    <rect x={-112} y={70} width={14} height={26} fill="#9AA8BE" /><rect x={98} y={70} width={14} height={26} fill="#9AA8BE" />
    {dev === "tube" ? (
      <g transform="translate(40 -30)">
        <rect x={-26} y={-10} width={52} height={92} rx={10} fill="#F4F6FA" stroke={INK} strokeWidth={4} />
        <rect x={-9} y={0} width={18} height={70} rx={9} fill="#FFFFFF" stroke={C.amber} strokeWidth={4} />
        <rect x={-6} y={30} width={12} height={38} rx={6} fill={C.amber} />
        {[10, 22, 34, 46, 58].map((y) => <line key={y} x1={12} y1={y} x2={20} y2={y} stroke={INK} strokeWidth={2} />)}
      </g>
    ) : (
      <g transform="translate(40 -30)">
        <rect x={-30} y={-10} width={60} height={86} rx={10} fill="#F4F6FA" stroke={INK} strokeWidth={4} />
        <rect x={-20} y={4} width={40} height={24} rx={4} fill="#123A2E" />
        <rect x={-14} y={11} width={28} height={10} rx={2} fill={C.green} />
        <circle cx={0} cy={52} r={7} fill={C.green} />
        {[0, 1, 2].map((i) => {
          const ph = ((f / 18 + i / 3) % 1);
          return <path key={i} d={`M ${-22 - ph * 40} ${-24 - ph * 40} A ${30 + ph * 56} ${30 + ph * 56} 0 0 1 ${22 + ph * 40} ${-24 - ph * 40}`} stroke={C.green} strokeWidth={6} fill="none" strokeLinecap="round" opacity={waves * (1 - ph)} transform="translate(0 6)" />;
        })}
      </g>
    )}
  </g>
);

/** stilisierte Person, Ursprung = Füße */
const Person: React.FC<{ shirt: string; prop?: "clip" | "mug"; reach?: number; f: number; s?: number; flip?: boolean }> = ({ shirt, prop, reach = 0, f, s = 1, flip }) => (
  <g transform={`scale(${(flip ? -1 : 1) * s} ${s})`}>
    <ellipse cx={0} cy={4} rx={80} ry={14} fill={INK} opacity={0.4} />
    <rect x={-46} y={-170} width={38} height={172} rx={14} fill="#22385C" />
    <rect x={8} y={-170} width={38} height={172} rx={14} fill="#22385C" />
    <path d="M -72 -160 L -72 -268 Q -72 -312 -28 -312 L 28 -312 Q 72 -312 72 -268 L 72 -160 Z" fill={shirt} stroke={INK} strokeWidth={5} />
    <rect x={-14} y={-334} width={28} height={30} fill={SKIN} />
    <circle cx={0} cy={-378} r={52} fill={SKIN} stroke={INK} strokeWidth={5} />
    <path d="M -52 -390 Q -48 -440 0 -440 Q 50 -440 54 -392 Q 30 -410 -52 -390 Z" fill="#3B2A22" />
    <circle cx={18} cy={-380} r={5} fill={INK} />
    <path d="M 8 -352 Q 22 -344 34 -354" stroke={INK} strokeWidth={4} fill="none" strokeLinecap="round" />
    {/* hinterer Arm */}
    <path d="M -60 -290 L -84 -190" stroke={shirt} strokeWidth={30} strokeLinecap="round" />
    <circle cx={-84} cy={-186} r={15} fill={SKIN} />
    {/* vorderer Arm: reach 1 = nach vorn oben (Klingel) */}
    {(() => {
      const hx = lerp(40, 150, reach), hy = lerp(-200, -330, reach);
      return (
        <g>
          <path d={`M 56 -290 L ${hx} ${hy}`} stroke={shirt} strokeWidth={30} strokeLinecap="round" />
          <circle cx={hx} cy={hy} r={15} fill={SKIN} />
          {prop === "mug" && (
            <g transform={`translate(${hx + 6} ${hy - 4})`}>
              <rect x={-20} y={-30} width={40} height={46} rx={8} fill={C.white} stroke={INK} strokeWidth={4} />
              <path d="M 20 -20 Q 36 -18 34 -4 Q 32 8 20 6" stroke={INK} strokeWidth={4} fill="none" />
              {[0, 1].map((i) => <path key={i} d={`M ${-8 + i * 14} -40 q -8 -14 0 -26 q 8 -12 0 -24`} stroke={C.gray} strokeWidth={4} fill="none" opacity={0.5 + 0.4 * Math.sin(f / 8 + i)} />)}
            </g>
          )}
        </g>
      );
    })()}
    {prop === "clip" && (
      <g transform="translate(-92 -230) rotate(-8)">
        <rect x={-42} y={-56} width={84} height={112} rx={8} fill="#A0784E" stroke={INK} strokeWidth={4} />
        <rect x={-32} y={-42} width={64} height={88} fill={C.white} />
        <rect x={-16} y={-64} width={32} height={16} rx={4} fill="#5A6B88" />
        {[-26, -10, 6, 22].map((y) => <line key={y} x1={-24} y1={y} x2={24} y2={y} stroke={C.mute} strokeWidth={4} />)}
      </g>
    )}
  </g>
);

/** Lupe-Kreis mit Heizkörper-Nahaufnahme */
const Callout: React.FC<{ dev: "tube" | "radio"; f: number; col: string; id: string }> = ({ dev, f, col, id }) => (
  <g>
    <defs><clipPath id={id}><circle r={112} /></clipPath></defs>
    <circle r={124} fill={INK} opacity={0.4} transform="translate(6 10)" />
    <circle r={120} fill="#2F4A75" stroke={col} strokeWidth={10} />
    <g clipPath={`url(#${id})`}><rect x={-120} y={50} width={240} height={80} fill="#24395E" /><g transform="translate(-20 20) scale(0.62)"><Radiator dev={dev} f={f} /></g></g>
  </g>
);

/** Zwei Wohnungstüren im Treppenhaus (Frame 0 + Schluss) */
const Doors: React.FC<{ f: number; ring: number; hlL?: number; hlR?: number }> = ({ f, ring, hlL = 0, hlR = 0 }) => {
  const L = 330, R = 800;
  const rp = (f % 20) / 20;
  return (
    <g>
      {/* Boden/Treppenhaus */}
      <rect x={-40} y={1240} width={1160} height={200} fill="#14223A" />
      <line x1={-40} y1={1240} x2={1120} y2={1240} stroke={C.line} strokeWidth={6} />
      <line x1={-40} y1={760} x2={1120} y2={760} stroke={C.line} strokeWidth={3} opacity={0.5} />
      {/* Glow */}
      <ellipse cx={L} cy={950} rx={230} ry={380} fill={C.amber} opacity={0.10 * hlL} />
      <ellipse cx={R} cy={950} rx={230} ry={380} fill={C.green} opacity={0.10 * hlR} />
      {/* linke Tür: zu */}
      <rect x={L - 160} y={660} width={320} height={584} fill="#2A3F63" stroke={INK} strokeWidth={8} />
      <rect x={L - 136} y={684} width={272} height={556} fill="#4A5F82" stroke={INK} strokeWidth={5} />
      <rect x={L - 106} y={720} width={212} height={210} rx={8} fill="none" stroke="#3A4E70" strokeWidth={6} />
      <rect x={L - 106} y={970} width={212} height={230} rx={8} fill="none" stroke="#3A4E70" strokeWidth={6} />
      <circle cx={L + 100} cy={960} r={14} fill={C.gray} stroke={INK} strokeWidth={4} />
      {/* Klingel */}
      <rect x={L - 214} y={880} width={36} height={56} rx={8} fill={C.gray} stroke={INK} strokeWidth={4} />
      <circle cx={L - 196} cy={908} r={10} fill={C.amber} />
      {ring > 0 && [0, 1].map((i) => {
        const p = (rp + i / 2) % 1;
        return <circle key={i} cx={L - 196} cy={908} r={24 + p * 50} fill="none" stroke={C.amber} strokeWidth={5} opacity={ring * (1 - p)} />;
      })}
      {/* Ableser */}
      <g transform="translate(112 1250) scale(0.95)"><Person shirt="#7C8BA6" prop="clip" reach={ring} f={f} /></g>
      {/* rechte Tür: offen */}
      <rect x={R - 160} y={660} width={320} height={584} fill="#2A3F63" stroke={INK} strokeWidth={8} />
      <rect x={R - 136} y={684} width={272} height={556} fill="#F0C987" opacity={0.28} />
      <rect x={R - 136} y={684} width={272} height={556} fill="#2E4670" opacity={0.7} />
      <g transform={`translate(${R - 34} 1236) scale(0.86)`}><Person shirt="#3E6E8E" prop="mug" reach={0.25} f={f} /></g>
      <path d={`M ${R + 136} 684 L ${R + 78} 712 L ${R + 78} 1212 L ${R + 136} 1240 Z`} fill="#4A5F82" stroke={INK} strokeWidth={5} />
      {/* Nahaufnahmen */}
      <g transform={`translate(${L} 500)`}><Callout dev="tube" f={f} col={C.amber} id="cL" /></g>
      <g transform={`translate(${R} 500)`}><Callout dev="radio" f={f} col={C.green} id="cR" /></g>
    </g>
  );
};

/** Blatt Papier (Ursprung Mitte) */
const Sheet: React.FC<{ w: number; h: number; children?: React.ReactNode }> = ({ w, h, children }) => (
  <g>
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={18} fill={INK} opacity={0.35} transform="translate(8 12)" />
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={18} fill={C.white} />
    {children}
  </g>
);

const Row: React.FC<{ y: number; label: string; dim?: number; col?: string }> = ({ y, label, dim = 0, col = INK }) => (
  <g opacity={1 - 0.6 * dim}>
    <text x={-290} y={y} fontFamily={FONT} fontWeight={700} fontSize={38} fill={col}>{label}</text>
    <rect x={150} y={y - 30} width={140} height={34} rx={8} fill="#D5DCE7" />
  </g>
);

const Phone: React.FC<{ f: number; at: number }> = ({ f, at }) => (
  <g>
    <rect x={-170} y={-290} width={340} height={580} rx={44} fill={INK} opacity={0.4} transform="translate(8 12)" />
    <rect x={-170} y={-290} width={340} height={580} rx={44} fill="#22385C" stroke={INK} strokeWidth={8} />
    <rect x={-148} y={-254} width={296} height={508} rx={26} fill={C.white} />
    <text y={-180} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={32} fill={INK}>Dein Verbrauch</text>
    <text y={-136} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={32} fill={C.green}>im Oktober</text>
    {[0.35, 0.5, 0.42, 0.7, 0.9].map((v, i) => {
      const g = tw(f, at + i * 3, 10);
      const h = 220 * v * g;
      return <rect key={i} x={-120 + i * 50} y={150 - h} width={36} height={h} rx={6} fill={i === 4 ? C.green : "#B8C4D6"} />;
    })}
    <line x1={-128} y1={152} x2={128} y2={152} stroke={C.mute} strokeWidth={4} />
    <text y={210} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={28} fill={C.mute}>… kWh</text>
  </g>
);

const Mailbox: React.FC<{ open: number }> = ({ open }) => (
  <g>
    <rect x={-20} y={120} width={40} height={300} fill="#5A6B88" />
    <rect x={-230} y={-150} width={460} height={290} rx={30} fill={INK} opacity={0.35} transform="translate(8 12)" />
    <rect x={-230} y={-150} width={460} height={290} rx={30} fill="#86A9FF" stroke={INK} strokeWidth={7} />
    <rect x={-190} y={-100} width={380} height={200} rx={16} fill="#1A2A44" />
    <g transform={`translate(0 100) scale(1 ${lerp(1, 0.18, open)})`}>
      <rect x={-190} y={-200} width={380} height={200} rx={16} fill="#9DB8FF" stroke={INK} strokeWidth={6} />
      <rect x={-80} y={-120} width={160} height={22} rx={11} fill={INK} opacity={0.7} />
    </g>
  </g>
);

const House: React.FC<{ f: number; flow: number }> = ({ f, flow }) => (
  <g>
    <path d="M -250 -170 L 0 -360 L 250 -170 Z" fill="#2A4A7A" stroke={INK} strokeWidth={7} strokeLinejoin="round" />
    <rect x={-220} y={-170} width={440} height={520} fill="#33507E" stroke={INK} strokeWidth={7} />
    {[0, 1].map((r) => [0, 1].map((c) => <rect key={`${r}${c}`} x={-180 + c * 220} y={-130 + r * 160} width={140} height={110} rx={8} fill="#F0C987" opacity={0.75} />))}
    <rect x={-220} y={190} width={440} height={160} fill="#1E3150" stroke={INK} strokeWidth={7} />
    {/* Kessel im Keller */}
    <rect x={-60} y={215} width={120} height={110} rx={14} fill={C.gray} stroke={INK} strokeWidth={5} />
    <path d={`M -20 300 Q -8 ${270 + Math.sin(f / 5) * 6} 0 250 Q 10 ${272 - Math.sin(f / 5) * 6} 20 300 Z`} fill={C.amber} />
    {/* Leitungen */}
    <path d="M 0 215 L 0 -150 M 0 30 L -110 30 M 0 30 L 110 30 M 0 -130 L -110 -130 M 0 -130 L 110 -130" stroke={C.red} strokeWidth={10} fill="none" strokeDasharray="1400" strokeDashoffset={1400 * (1 - flow)} strokeLinecap="round" />
    {/* Fernwärme von außen */}
    <path d="M -420 290 L -220 290" stroke={C.red} strokeWidth={10} strokeDasharray="20 14" strokeDashoffset={-f * 2} opacity={flow} />
  </g>
);

const Flat: React.FC<{ f: number }> = ({ f }) => (
  <g>
    <rect x={-150} y={-170} width={300} height={360} rx={10} fill="#33507E" stroke={INK} strokeWidth={7} />
    <rect x={-100} y={-110} width={200} height={240} rx={20} fill={C.white} stroke={INK} strokeWidth={5} />
    <rect x={-60} y={-80} width={120} height={50} rx={8} fill="#22385C" />
    <path d={`M -20 80 Q -8 ${50 + Math.sin(f / 5) * 6} 0 30 Q 10 ${52 - Math.sin(f / 5) * 6} 20 80 Z`} fill={C.blue} />
  </g>
);

const Check: React.FC<{ ok: boolean; s?: number }> = ({ ok, s = 1 }) => (
  <g transform={`scale(${s})`}>
    <circle r={60} fill={ok ? C.green : C.blue} stroke={INK} strokeWidth={6} />
    {ok
      ? <path d="M -28 2 L -8 24 L 30 -22" stroke={INK} strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      : <path d="M -24 -24 L 24 24 M 24 -24 L -24 24" stroke={INK} strokeWidth={14} strokeLinecap="round" />}
  </g>
);

const Badge: React.FC<{ text: string; col: string; s?: number }> = ({ text, col, s = 1 }) => (
  <g transform={`scale(${s})`}><Pill w={text.length * 30 + 70} text={text} col={col} s={48} h={92} /></g>
);

export const Short25: React.FC<{ end: "yt" | "tt" }> = ({ end }) => {
  const f = useCurrentFrame();
  const b1 = ps("b1") - 2, b2 = ps("b2") - 4, b3 = ps("b3") - 4, b4 = ps("b4") - 4, fE = ps(end) - 8;
  const b1b = wk("b1", "solche") - 4, b2b = wk("b2", "abgezogen") - 4, b3b = wk("b3", "fehlt") - 4, loop = wk("b4", "also") - 4;
  const closeAt = wk(end, "groschenfall") - 4;

  const scenes = [
    {
      a: 0, b: b1, render: (f: number) => {
        const hlL = tw(f, wk("hook", "einer") - 4, 10) * (1 - tw(f, wk("hook", "der") - 4, 10));
        const hlR = tw(f, wk("hook", "der") - 4, 10);
        return (
          <g>
            <Txt x={540} y={290} s={96} c={C.amber}>Wer darf kürzen?</Txt>
            <g transform="translate(540 840) scale(0.76) translate(-540 -960)">
              <Doors f={f} ring={1} hlL={hlL} hlR={hlR} />
              <g transform={`translate(430 640) scale(${pop(f, wk("hook", "bald") - 2, 14)})`}><Badge text="bald" col={C.amber} s={1.1} /></g>
              <g transform={`translate(860 640) scale(${pop(f, wk("hook", "sofort") - 2, 14)})`}><Badge text="sofort?" col={C.green} s={1.1} /></g>
            </g>
          </g>
        );
      },
    },
    {
      a: b1, b: b1b, kind: "zoom" as const, render: (f: number) => (
        <g>
          <Txt x={540} y={330} s={84}>Ableser muss rein</Txt>
          <Txt x={540} y={430} s={66} c={C.amber} o={tw(f, b1 + 10, 10)}>= Altgerät</Txt>
          <g transform="translate(600 900)"><Radiator dev="tube" f={f} s={2} /></g>
          <g transform={`translate(${lerp(-80, 150, tw(f, b1, 24))} 1330) scale(0.85)`}><Person shirt="#7C8BA6" prop="clip" f={f} /></g>
          <circle cx={680} cy={820} r={78} fill="none" stroke={C.amber} strokeWidth={8} opacity={tw(f, wk("b1", "ableser") - 2, 10)} />
        </g>
      ),
    },
    {
      a: b1b, b: b2, render: (f: number) => {
        const ar = tw(f, wk("b1", "umgerüstet") - 6, 14);
        const ex = tw(f, wk("b1", "außer") - 2, 10);
        return (
          <g>
            <Txt x={540} y={330} s={84}>Bis 31.12.2026</Txt>
            <Txt x={540} y={430} s={70} c={C.amber}>umrüsten</Txt>
            <g transform={`translate(540 700) rotate(-3) scale(${pop(f, b1b + 4, 14)})`}>
              <rect x={-170} y={-140} width={340} height={280} rx={22} fill={INK} opacity={0.35} transform="translate(8 12)" />
              <rect x={-170} y={-140} width={340} height={280} rx={22} fill={C.white} />
              <rect x={-170} y={-140} width={340} height={80} rx={22} fill={C.amber} />
              <rect x={-170} y={-90} width={340} height={30} fill={C.amber} />
              {[-100, 100].map((x) => <rect key={x} x={x - 10} y={-162} width={20} height={50} rx={10} fill="#5A6B88" />)}
              <text y={-86} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={40} fill={INK}>Dezember</text>
              <text y={70} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={130} fill={INK}>31</text>
            </g>
            <g transform="translate(230 1050)"><Radiator dev="tube" f={f} s={0.8} /></g>
            <g opacity={ar}>
              <path d={`M 380 1040 L ${lerp(380, 580, ar)} 1040`} stroke={C.amber} strokeWidth={14} strokeLinecap="round" />
              <path d="M 560 1012 L 600 1040 L 560 1068" stroke={C.amber} strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <g transform="translate(760 1050)"><Radiator dev="radio" f={f} s={0.8} /></g>
            </g>
            <Txt x={540} y={1270} s={38} c={C.gray} w={700} o={ex}>Ausnahme: technisch unmöglich</Txt>
            <Txt x={540} y={1322} s={38} c={C.gray} w={700} o={ex}>oder unbillige Härte</Txt>
            <Src o={tw(f, b1b + 6, 10)}>Quelle: § 5 Abs. 3 HeizkostenV</Src>
          </g>
        );
      },
    },
    {
      a: b2, b: b2b, render: (f: number) => {
        const hl = tw(f, wk("b2", "heizkosten") - 4, 10);
        return (
          <g>
            <Txt x={540} y={330} s={72}>Abrechnungszeitraum</Txt>
            <Txt x={540} y={430} s={78} c={C.amber}>ab 2027</Txt>
            <g transform={`translate(540 880) scale(${pop(f, b2 + 4, 14)})`}>
              <Sheet w={640} h={620}>
                <text x={-290} y={-220} fontFamily={FONT} fontWeight={800} fontSize={44} fill={INK}>Heizkostenabrechnung</text>
                <line x1={-290} y1={-190} x2={290} y2={-190} stroke={C.gray} strokeWidth={4} strokeDasharray="10 8" />
                <rect x={-300} y={-160} width={600} height={200} rx={16} fill={C.green} opacity={0.18 + 0.2 * hl} stroke={C.green} strokeWidth={5 * hl} />
                <text x={-290} y={-110} fontFamily={FONT} fontWeight={700} fontSize={32} fill={C.mute}>Dein Anteil</text>
                <Row y={-50} label="Heizung" />
                <Row y={10} label="Warmwasser" />
                <line x1={-290} y1={90} x2={290} y2={90} stroke={C.gray} strokeWidth={4} strokeDasharray="10 8" />
                <rect x={-290} y={120} width={380} height={28} rx={8} fill="#E3E9F2" />
                <rect x={-290} y={170} width={300} height={28} rx={8} fill="#E3E9F2" />
              </Sheet>
            </g>
            <Stamp f={f} at={wk("b2", "drei") - 2} x={690} y={1160} text="−3 %" s={0.9} col={C.green} rot={-9} />
            <Src o={tw(f, b2 + 6, 10)}>Quelle: § 12 Abs. 1 HeizkostenV</Src>
          </g>
        );
      },
    },
    {
      a: b2b, b: b3, render: (f: number) => {
        const d = tw(f, b2b + 8, 12);
        return (
          <g>
            <Txt x={540} y={330} s={84}>Nur Heizkosten</Txt>
            <g transform="translate(540 820)">
              <Sheet w={640} h={560}>
                <rect x={-300} y={-240} width={600} height={110} rx={16} fill={C.green} opacity={0.3} />
                <text x={-290} y={-170} fontFamily={FONT} fontWeight={800} fontSize={40} fill={INK}>Heizung + Warmwasser</text>
                <Row y={-40} label="Miete" dim={d} />
                <Row y={60} label="übrige Nebenkosten" dim={d} />
                <line x1={-300} y1={-52} x2={lerp(-300, 300, d)} y2={-52} stroke={C.mute} strokeWidth={6} />
                <line x1={-300} y1={48} x2={lerp(-300, 300, d)} y2={48} stroke={C.mute} strokeWidth={6} />
              </Sheet>
            </g>
            <g transform="translate(750 540) rotate(-6)"><Pill w={190} text="−3 %" col={C.green} s={56} h={100} /></g>
            <g transform={`translate(540 1000) scale(${pop(f, b2b + 10, 14)})`}><Pill w={500} text="nicht betroffen" col={C.mute} fg={C.white} s={52} h={110} /></g>
            <Txt x={540} y={1250} s={38} c={C.gray} w={700} o={tw(f, wk("b2", "abrechnung") - 2, 10)}>abgezogen in der Abrechnung danach</Txt>
            <Src o={tw(f, b2b + 6, 10)}>Keine Rechtsberatung</Src>
          </g>
        );
      },
    },
    {
      a: b3, b: b3b, render: (f: number) => {
        const ph = tw(f, wk("b3", "vermieter") - 4, 14);
        return (
          <g>
            <Txt x={540} y={330} s={84}>Rechts: Funkzähler</Txt>
            <g transform={`translate(${lerp(540, 300, ph)} ${lerp(880, 900, ph)})`}><Radiator dev="radio" f={f} s={lerp(1.9, 1.2, ph)} waves={1} /></g>
            <g opacity={ph} transform={`translate(${lerp(940, 700, ph)} 880) rotate(4) scale(0.85)`}><Phone f={f} at={wk("b3", "verbrauch") - 6} /></g>
            <g transform={`translate(540 1300) scale(${pop(f, wk("b3", "monatlich") - 2, 14)})`}><Pill w={560} text="monatlich Pflicht" col={C.green} s={52} h={110} /></g>
            <Src o={tw(f, b3 + 6, 10)}>Quelle: § 6a HeizkostenV</Src>
          </g>
        );
      },
    },
    {
      a: b3b, b: b4, render: (f: number) => (
        <g>
          <Txt x={540} y={330} s={84}>Keine Monatsinfo?</Txt>
          <g transform="translate(540 820)"><Mailbox open={tw(f, b3b + 4, 16)} /></g>
          <Txt x={540} y={830} s={44} c={C.gray} w={700} o={tw(f, b3b + 14, 10)}>leer</Txt>
          <Stamp f={f} at={wk("b3", "schon") - 3} x={540} y={1240} text="−3 % schon jetzt" s={0.7} col={C.green} rot={-6} />
          <Src o={tw(f, b3b + 6, 10)}>Quelle: § 12 Abs. 1 HeizkostenV</Src>
        </g>
      ),
    },
    {
      a: b4, b: loop, render: (f: number) => {
        const fl = tw(f, wk("b4", "zentralheizung") - 2, 20);
        const r = tw(f, wk("b4", "vermieter") - 4, 10);
        return (
          <g>
            <Txt x={540} y={330} s={84}>Gilt nur hier</Txt>
            <g transform="translate(300 860) scale(0.92)"><House f={f} flow={fl} /></g>
            <g transform={`translate(300 470) scale(${pop(f, wk("b4", "zentralheizung") + 4, 14)})`}><Check ok s={0.9} /></g>
            <Txt x={300} y={1250} s={36} c={C.green} w={800}>Zentralheizung</Txt>
            <Txt x={300} y={1298} s={36} c={C.green} w={800} o={tw(f, wk("b4", "fernwärme") - 2, 10)}>/ Fernwärme</Txt>
            <g opacity={r}>
              <g transform="translate(730 930) scale(0.8)"><Flat f={f} /></g>
              <line x1={610} y1={770} x2={850} y2={1090} stroke={C.blue} strokeWidth={10} strokeLinecap="round" />
              <g transform={`translate(730 690) scale(${pop(f, wk("b4", "vermieter") + 2, 14)})`}><Check ok={false} s={0.8} /></g>
              <Txt x={730} y={1250} s={34} c={C.blue} w={800}>eigene Therme</Txt>
              <Txt x={730} y={1298} s={32} c={C.gray} w={700}>nicht betroffen</Txt>
            </g>
            <Src o={tw(f, b4 + 6, 10)}>§ 1 HeizkostenV · Keine Rechtsberatung</Src>
          </g>
        );
      },
    },
    {
      a: loop, b: fE - 6, kind: "zoom" as const, render: (f: number) => {
        const z = interpolate(f, [loop, loop + 30], [0.84, 0.7], { ...CL });
        return (
          <g>
            <Txt x={540} y={290} s={96} c={C.amber}>Wer darf kürzen?</Txt>
            <g transform={`translate(540 ${lerp(860, 780, (0.84 - z) / 0.14)}) scale(${z}) translate(-540 -960)`}><Doors f={f} ring={1} hlL={0.6} hlR={0.6} /></g>
            <g transform={`translate(540 1135) scale(${pop(f, wk("b4", "zähler") - 3, 14)})`}><Pill w={560} text="✓ Zähler checken" col={C.green} s={50} h={100} /></g>
            <g transform={`translate(540 1255) scale(${pop(f, wk("b4", "vermieter", 1) - 3, 14)})`}><Pill w={600} text="✓ Vermieter fragen" col={C.green} s={50} h={100} /></g>
          </g>
        );
      },
    },
  ];

  const hi = ["ableser", "heizkosten", "jahresende", "umgerüstet", "unzumutbar", "abrechnung", "funkt", "monatlich", "verbrauch", "schon", "zentralheizung", "fernwärme", "checken", "fragen"];
  const cs = chunks(D.paras as any, ["hook", "b1", "b2", "b3", "b4"], [["drei prozent", "3 %"]]);
  const subEnd = pe("b4") + 8;
  const endIn = tw(f, fE, 16);

  const sfx: [number, string, number?][] = [
    [0, "soft", 0.7], [wk("hook", "bald") - 2, "marimba", 0.35], [wk("hook", "sofort") - 2, "ding", 0.35],
    [b1 - 4, "whoosh", 0.7], [b1b - 2, "paper", 0.5], [wk("b1", "außer") - 2, "soft", 0.4],
    [b2 - 4, "whoosh", 0.7], [wk("b2", "drei") - 2, "stamp", 0.5],
    [b2b - 2, "paper", 0.5],
    [b3 - 4, "whoosh", 0.7], [wk("b3", "monatlich") - 2, "ding", 0.4],
    [b3b - 2, "whoosh", 0.6], [wk("b3", "schon") - 3, "stamp", 0.5],
    [b4 - 4, "whoosh", 0.7], [wk("b4", "zentralheizung") + 4, "ding", 0.35],
    [loop - 2, "whoosh", 0.6], [wk("b4", "zähler") - 3, "soft", 0.4], [wk("b4", "vermieter", 1) - 3, "soft", 0.4],
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
              : <EndShare f={f} at={fE} lead={["Schick das an", "jemanden, bei dem"]} who={["jedes Jahr noch der", "Ableser klingelt."]} closeAt={closeAt} />}
          </g>
        )}
      </svg>
      <Sub f={f} cs={cs} end={subEnd} hi={hi} />
      <Grain f={f} />
      <Audio src={staticFile(`audio/s25_${end}.wav`)} />
      <SfxTrack list={sfx} />
    </AbsoluteFill>
  );
};
export const Short25YT: React.FC = () => <Short25 end="yt" />;
export const Short25TT: React.FC = () => <Short25 end="tt" />;
