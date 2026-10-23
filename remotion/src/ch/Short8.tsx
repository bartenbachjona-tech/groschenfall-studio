import React from "react";
import { AbsoluteFill, Img, Sequence, interpolate, random, staticFile, useCurrentFrame } from "remotion";
import { Audio } from "@remotion/media";
import { C, FONT } from "../brand";
import { Backdrop, Stripes } from "../kit/Stage";
import { CL, IO, OUT, SPR, lerp, pop, tw } from "../kit/core";
import { Figure } from "../kit/Figure";
import { Bed, Check, Mag, Phone, Sick, Slip, StampT, Virus } from "../v5/kit5";
import D from "../data/s8.json";

const W = 1080, H = 1920, FPS = 30;
const fr = (s: number) => Math.round(s * FPS);
type P = { start: number; dur: number; words: { text: string; start: number }[] };
const PA = D.paras as Record<string, P>;
const norm = (s: string) => s.toLowerCase().replace(/[^a-zäöüß0-9']/g, "");
const wk = (k: string, word: string, nth = 0) => {
  const p = PA[k]; let n = 0;
  for (const w of p.words) if (norm(w.text).startsWith(norm(word))) { if (n === nth) return fr(p.start + w.start); n++; }
  return fr(p.start);
};
const ps = (k: string) => fr(PA[k].start);
const pe = (k: string) => fr(PA[k].start + PA[k].dur);
export const S8_DUR = { yt: fr(D.tot_yt), tt: fr(D.tot_tt) };

const SFX_GAIN: Record<string, number> = { soft: 0.5, whoosh: 0.4, stamp: 0.55, ding: 0.4, paper: 0.5, marimba: 0.45, coins: 0.4 };

const Txt: React.FC<{ x: number; y: number; s: number; c?: string; a?: "start" | "middle" | "end"; o?: number; w?: number; children: React.ReactNode }> = ({ x, y, s, c = C.white, a = "middle", o = 1, w = 800, children }) => (
  <text x={x} y={y} fontSize={s} fontFamily={FONT} fontWeight={w} fill={c} textAnchor={a} opacity={o} stroke="#0A111D" strokeWidth={s * 0.1} paintOrder="stroke" letterSpacing={-1}>{children}</text>
);

/* ---------- Stilisierter Merz (Brustbild am Pult) ---------- */
const SKIN = "#F0C3A0", SKIN2 = "#D9A584", SUIT = "#22304A", SUIT2 = "#2C3C5C", HAIR = "#B8BEC8";
const MerzBust: React.FC<{ f: number; wag?: number; blink?: number; tag?: number }> = ({ f, wag = 0, blink = 0, tag = 0 }) => {
  const bl = (f + blink) % 110 < 4 ? 0.15 : 1;
  const ang = wag * Math.sin(f / 3.2) * 9;
  return (
    <g>
      {/* Anzug */}
      <path d="M-300 560 L-285 270 Q-255 175 -125 145 L125 145 Q255 175 285 270 L300 560 Z" fill={SUIT} />
      <path d="M-125 145 L-38 340 L-20 210 Z" fill={SUIT2} />
      <path d="M125 145 L38 340 L20 210 Z" fill={SUIT2} />
      <path d="M-62 145 L0 300 L62 145 Z" fill={C.white} />
      <path d="M-20 152 L20 152 L28 300 L0 334 L-28 300 Z" fill="#2E3F7A" />
      <path d="M-20 152 L20 152 L14 184 L-14 184 Z" fill="#24336A" />
      {/* Hals */}
      <rect x={-52} y={40} width={104} height={120} rx={30} fill={SKIN2} />
      {/* Ohren */}
      <ellipse cx={-104} cy={-105} rx={20} ry={36} fill={SKIN2} />
      <ellipse cx={104} cy={-105} rx={20} ry={36} fill={SKIN2} />
      {/* Kopf: lang, hohe Stirn */}
      <path d="M-100 -170 Q-104 -40 -70 30 Q-36 76 0 80 Q36 76 70 30 Q104 -40 100 -170 Q95 -282 0 -288 Q-95 -282 -100 -170 Z" fill={SKIN} />
      <path d="M100 -170 Q104 -40 70 30 Q36 76 0 80 Q50 40 72 -40 Q86 -120 80 -200 Z" fill={SKIN2} opacity={0.45} />
      {/* Haare: grau an den Seiten, oben licht */}
      <path d="M-103 -140 Q-114 -228 -64 -266 Q-84 -210 -86 -140 Z" fill={HAIR} />
      <path d="M103 -140 Q114 -228 64 -266 Q84 -210 86 -140 Z" fill={HAIR} />
      <path d="M-64 -266 Q0 -296 64 -266 Q0 -280 -64 -266 Z" fill={HAIR} opacity={0.8} />
      {/* Augenbrauen (ernst) */}
      <path d="M-80 -140 L-28 -130" stroke="#6E6A66" strokeWidth={9} strokeLinecap="round" />
      <path d="M80 -140 L28 -130" stroke="#6E6A66" strokeWidth={9} strokeLinecap="round" />
      {/* Augen */}
      <ellipse cx={-50} cy={-104} rx={8} ry={8 * bl} fill="#1A1A1A" />
      <ellipse cx={50} cy={-104} rx={8} ry={8 * bl} fill="#1A1A1A" />
      {/* randlose Brille */}
      <rect x={-86} y={-127} width={70} height={44} rx={13} fill="#FFFFFF" fillOpacity={0.12} stroke="#8E9AAE" strokeWidth={3.5} />
      <rect x={16} y={-127} width={70} height={44} rx={13} fill="#FFFFFF" fillOpacity={0.12} stroke="#8E9AAE" strokeWidth={3.5} />
      <path d="M-16 -112 Q0 -120 16 -112 M-86 -112 L-102 -110 M86 -112 L102 -110" stroke="#8E9AAE" strokeWidth={3.5} fill="none" />
      {/* Nase, Falten, Mund */}
      <path d="M-2 -92 Q-12 -42 -4 -30 Q8 -26 18 -34" stroke="#B57E62" strokeWidth={5} fill="none" strokeLinecap="round" />
      <path d="M-44 -20 Q-56 10 -44 30 M44 -20 Q56 10 44 30" stroke="#C99274" strokeWidth={4} fill="none" opacity={0.7} />
      <path d="M-32 14 Q0 8 32 14" stroke="#9A5A4A" strokeWidth={6} fill="none" strokeLinecap="round" />
      {/* Zeigefinger-Arm */}
      <g transform={`rotate(${ang} 250 230)`}>
        <path d="M230 240 L300 120 L292 -40" stroke="#0A111D" strokeWidth={90} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={0.5} />
        <path d="M230 240 L300 120 L292 -40" stroke={SUIT2} strokeWidth={78} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <rect x={262} y={-70} width={62} height={26} rx={10} fill={C.white} />
        <ellipse cx={293} cy={-104} rx={40} ry={44} fill={SKIN} />
        <rect x={282} y={-200} width={24} height={100} rx={12} fill={SKIN} />
        <path d="M268 -96 Q293 -80 318 -96" stroke={SKIN2} strokeWidth={5} fill="none" />
      </g>
      {/* Pult */}
      <path d="M-340 400 L340 400 L300 780 L-300 780 Z" fill="#3A5A9A" />
      <rect x={-360} y={380} width={720} height={40} rx={14} fill="#4E70B4" />
      <rect x={-110} y={300} width={12} height={90} rx={6} fill="#5A6B88" />
      <ellipse cx={-104} cy={292} rx={20} ry={26} fill="#2A3442" />
      <g opacity={tag}>
        <rect x={-230} y={500} width={460} height={92} rx={18} fill={C.deep} opacity={0.85} />
        <text x={0} y={562} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={46} fill={C.white}>Friedrich Merz</text>
      </g>
    </g>
  );
};

/** großes Fieberthermometer */
const BigThermo: React.FC<{ v: number }> = ({ v }) => (
  <g>
    <defs>
      <linearGradient id="tglass" x1="0" x2="1"><stop offset="0" stopColor="#FFFFFF" /><stop offset="0.55" stopColor="#E6ECF5" /><stop offset="1" stopColor="#9FB0CC" /></linearGradient>
      <linearGradient id="tmerc" x1="0" x2="1"><stop offset="0" stopColor="#FF7A80" /><stop offset="1" stopColor="#C8323C" /></linearGradient>
    </defs>
    <rect x={-48} y={-330} width={96} height={400} rx={48} fill="url(#tglass)" />
    <circle cx={0} cy={90} r={76} fill="url(#tglass)" />
    <circle cx={0} cy={90} r={58} fill="url(#tmerc)" />
    <rect x={-19} y={60 - 360 * v} width={38} height={360 * v + 30} rx={19} fill="url(#tmerc)" />
    <rect x={-36} y={-310} width={14} height={340} rx={7} fill="#FFFFFF" opacity={0.55} />
    {[-270, -220, -170, -120, -70, -20].map((y, i) => <rect key={i} x={26} y={y} width={i % 2 ? 14 : 22} height={6} rx={3} fill="#7C8BA6" />)}
  </g>
);

const House: React.FC<{ label: string; col: string }> = ({ label, col }) => (
  <g>
    <path d="M-150 -40 L0 -150 L150 -40 Z" fill={col} />
    <rect x={-130} y={-40} width={260} height={210} fill="#2A3F63" />
    {[-80, -20, 40].map((x) => <rect key={x} x={x} y={0} width={40} height={130} rx={6} fill="#16243B" />)}
    <Txt x={0} y={240} s={46}>{label}</Txt>
  </g>
);
const Monitor: React.FC = () => (
  <g>
    <rect x={-170} y={-130} width={340} height={230} rx={20} fill="#1A2233" stroke="#5A6B88" strokeWidth={6} />
    <rect x={-150} y={-110} width={300} height={190} rx={10} fill="#2A3F63" />
    <g transform="translate(0 -12)"><Slip s={0.6} label="eAU" col="#EEF2F7" /></g>
    <rect x={-30} y={100} width={60} height={60} fill="#5A6B88" /><rect x={-100} y={160} width={200} height={20} rx={10} fill="#5A6B88" />
    <Txt x={0} y={250} s={46}>Arztpraxis</Txt>
  </g>
);

/* ---------- Untertitel ---------- */
const NUM: Record<string, string> = { zweitausendzweiundzwanzig: "2022", zweieinhalb: "2,5" };
type Chunk = { at: number; text: string; hi: string[] };
const chunks = (keys: string[], hi: string[]): Chunk[] => {
  const out: Chunk[] = [];
  for (const k of keys) {
    const ws = PA[k].words; let cur: string[] = []; let at = 0;
    ws.forEach((w, i) => {
      if (!cur.length) at = fr(PA[k].start + w.start);
      const t = w.text.replace(/^([a-zäöüß]+)/i, (m) => NUM[m.toLowerCase()] ?? m);
      cur.push(t);
      const brk = /[,.:?!]$/.test(w.text) || cur.length >= 3 || i === ws.length - 1;
      if (brk) { out.push({ at, text: cur.join(" "), hi }); cur = []; }
    });
  }
  return out;
};
const Sub: React.FC<{ f: number; cs: Chunk[]; end: number }> = ({ f, cs, end }) => {
  const i = cs.findIndex((c, j) => f >= c.at - 1 && f < (cs[j + 1]?.at ?? end) - 1);
  if (i < 0) return null;
  const c = cs[i];
  const p = interpolate(f, [c.at - 1, c.at + 6], [0, 1], { ...CL, easing: SPR });
  return (
    <div style={{ position: "absolute", top: 1420, left: 50, right: 50, textAlign: "center", fontFamily: FONT, fontWeight: 800, fontSize: 64, color: C.white, letterSpacing: -1, opacity: p, transform: `translateY(${lerp(14, 0, p)}px)` }}>
      {c.text.split(" ").map((w, k) => <span key={k} style={{ color: c.hi.some((h) => norm(w).startsWith(h)) ? C.amber : C.white, textShadow: "0 6px 0 #0A111D, 0 0 30px rgba(10,17,29,.9)" }}>{w} </span>)}
    </div>
  );
};

const Grain: React.FC<{ f: number }> = ({ f }) => (
  <>
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 42%, rgba(0,0,0,0) 50%, rgba(4,8,16,.6) 100%)" }} />
    <AbsoluteFill style={{ opacity: 0.07, mixBlendMode: "overlay", overflow: "hidden" }}>
      <Img src={staticFile("grain.png")} style={{ position: "absolute", width: 3700, height: 2120, left: -(random(`g${Math.floor(f / 2)}`) * 300), top: -(random(`h${Math.floor(f / 2)}`) * 200) }} />
    </AbsoluteFill>
  </>
);

/* ---------- Hauptkomposition ---------- */
export const Short8: React.FC<{ end: "yt" | "tt" }> = ({ end }) => {
  const f = useCurrentFrame();
  const TOT = S8_DUR[end];
  const f2 = ps("plan") - 6, f3 = ps("twist") - 6, f3b = wk("twist", "laut") - 8, f4 = ps("fair") - 6, f4b = wk("fair", "es", 0) - 6, fE = ps(end) - 8;

  // Szene 1: Hook
  const q1 = wk("hook", "ist", 0), q2 = wk("hook", "ist", 1);
  const s1out = tw(f, f2 - 2, 12, IO);
  const push = tw(f, 0, fr(4.5), (t) => t);
  const therm = interpolate(f, [0, wk("hook", "krank") + 8], [0.18, 0.92], { ...CL, easing: OUT });
  const card = interpolate(f, [q1 - 4, q1 + 10], [0, 1], { ...CL, easing: SPR });

  // Szene 2: Plan
  const s2in = tw(f, f2, 14), s2out = tw(f, f3 - 2, 12, IO);
  const ban = pop(f, wk("plan", "abschaffen") - 2, 14);
  const slip = pop(f, wk("plan", "attest") - 2, 14);
  const day1 = pop(f, wk("plan", "ersten") - 2, 14);

  // Szene 3: Zählung
  const s3in = tw(f, f3, 14), s3x = tw(f, f3b - 2, 12, IO);
  const fly = f >= wk("twist", "elektronisch") - 4;
  const vor = tw(f, wk("twist", "vorher") - 4, 12, IO);
  const s3bin = tw(f, f3b, 14), s3bout = tw(f, f4 - 2, 12, IO);
  const g1 = interpolate(f, [f3b + 4, f3b + 30], [0, 1], { ...CL, easing: OUT });
  const g2 = interpolate(f, [wk("twist", "zweieinhalb") - 6, wk("twist", "zweieinhalb") + 14], [0, 1], { ...CL, easing: OUT });

  // Szene 4: fair
  const s4in = tw(f, f4, 14), s4x = tw(f, f4b - 2, 12, IO);
  const magX = interpolate(f, [wk("fair", "dak") - 4, wk("fair", "missbrauch")], [380, 700], { ...CL, easing: IO });
  const s4bin = tw(f, f4b, 14), s4bout = tw(f, fE - 2, 12, IO);
  const home = tw(f, wk("fair", "ansteckend") - 4, 16);
  const endIn = tw(f, fE, 18);

  const cs = chunks(["plan", "twist", "fair", ...(end === "tt" ? ["tt"] : [])], ["telefon", "attest", "gesetz", "2022", "elektronisch", "statistik", "2,5", "zählen", "missbrauch", "echte", "hause", "kommentare"]);
  const subEnd = end === "tt" ? TOT - 8 : pe("fair") + 10;

  const sfx: [number, string, number?][] = [
    [2, "soft", 0.6], [q1 - 4, "paper", 0.7], [q2, "soft", 0.6],
    [f2 - 4, "whoosh", 0.7], [wk("plan", "abschaffen") - 2, "soft", 0.8], [wk("plan", "attest") - 2, "paper", 0.7], [wk("plan", "gesetz") - 2, "stamp", 0.9],
    [f3 - 4, "whoosh", 0.7], [wk("twist", "elektronisch") - 2, "marimba", 0.6], [wk("twist", "gelbe") - 2, "paper", 0.6],
    [f3b - 4, "whoosh", 0.7], [wk("twist", "zweieinhalb") - 4, "ding", 0.6],
    [f4 - 4, "whoosh", 0.7], [wk("fair", "hinweise") - 2, "soft", 0.7], [f4b - 4, "whoosh", 0.6], [wk("fair", "ansteckend") - 4, "soft", 0.6],
    [fE - 6, "whoosh", 0.8],
  ];

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Backdrop />
      <Stripes w={W} h={H} />
      <svg width={W} height={H} style={{ position: "absolute" }}>
        <defs>
          <radialGradient id="spot" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stopColor="#4A6AAA" stopOpacity={0.42} /><stop offset="1" stopColor="#3A5A9A" stopOpacity={0} /></radialGradient>
          <radialGradient id="hot" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stopColor="#FF5A60" stopOpacity={0.35} /><stop offset="1" stopColor="#FF5A60" stopOpacity={0} /></radialGradient>
          <pattern id="hatch" width="22" height="22" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="22" height="22" fill="#B07A2A" /><rect width="9" height="22" fill={C.amber} /></pattern>
        </defs>

        {/* ===== Szene 1: Hook ===== */}
        {f < f2 + 14 && (
          <g opacity={1 - s1out}>
            <ellipse cx={540} cy={900} rx={520} ry={500} fill="url(#spot)" />
            <g transform={`translate(540 960) scale(${lerp(1, 1.06, push)}) translate(-540 -960)`}>
              <circle cx={200} cy={830} r={230} fill="url(#hot)" opacity={therm} />
              <g transform="translate(190 900) rotate(-8) scale(1.05)"><BigThermo v={therm} /></g>
              <g transform="translate(600 900) scale(0.86)"><MerzBust f={f} wag={tw(f, q1 - 2, 8)} tag={tw(f, wk("hook", "friedrich") - 2, 10)} /></g>
            </g>
            {/* Titel (erstes Bild) */}
            <Txt x={540} y={270} s={112} c={C.amber}>Fast 3 Wochen</Txt>
            <Txt x={540} y={400} s={112}>krank<tspan fill={C.amber}>?</tspan></Txt>
            {/* Zitat-Karte */}
            {f >= q1 - 4 && (
              <g transform={`translate(540 1290) scale(${0.9 + 0.1 * card})`} opacity={card}>
                <rect x={-480} y={-150} width={960} height={300} rx={30} fill="#0A111D" opacity={0.45} transform="translate(8 12)" />
                <rect x={-480} y={-150} width={960} height={300} rx={30} fill={C.deep} />
                <rect x={-480} y={-150} width={14} height={300} rx={7} fill={C.amber} />
                <text x={-440} y={-50} fontFamily={FONT} fontWeight={800} fontSize={110} fill={C.amber} opacity={0.5}>„</text>
                <Txt x={-370} y={-58} s={58} a="start">Ist das wirklich richtig?</Txt>
                <Txt x={-370} y={22} s={58} a="start" c={C.amber} o={tw(f, q2 - 2, 8)}>Ist das wirklich notwendig?“</Txt>
                <text x={-370} y={100} fontFamily={FONT} fontWeight={600} fontSize={34} fill={C.gray}>Friedrich Merz, Januar 2026</text>
              </g>
            )}
          </g>
        )}

        {/* ===== Szene 2: Seine Lösung ===== */}
        {f >= f2 && f < f3 + 14 && (
          <g opacity={s2in * (1 - s2out)} transform={`translate(0 ${lerp(70, 0, s2in)})`}>
            <Txt x={540} y={330} s={80} c={C.gray} w={700}>Seine Lösung:</Txt>
            <ellipse cx={540} cy={820} rx={520} ry={420} fill="url(#spot)" />
            {/* Telefon durchgestrichen */}
            <g transform="translate(290 780)">
              <Phone x={0} y={0} s={2.1} ring={f > f2 + 4 && f < wk("plan", "abschaffen") ? f : 0} />
              <g transform={`scale(${ban})`} opacity={Math.min(1, ban * 2)}>
                <circle r={210} fill="none" stroke={C.red} strokeWidth={26} />
                <path d="M-148 -148 L148 148" stroke={C.red} strokeWidth={26} strokeLinecap="round" />
              </g>
              <Txt x={0} y={300} s={58}>per Telefon</Txt>
            </g>
            {/* Attest ab Tag 1 */}
            <g transform={`translate(790 780) scale(${slip}) rotate(${lerp(-12, 4, slip)})`} opacity={Math.min(1, slip * 2)}>
              <Slip s={1.7} />
            </g>
            <g transform={`translate(900 600) scale(${day1})`} opacity={Math.min(1, day1 * 2)}>
              <rect x={-80} y={-80} width={160} height={170} rx={20} fill="#0A111D" opacity={0.4} transform="translate(6 8)" />
              <rect x={-80} y={-80} width={160} height={170} rx={20} fill="#EEF2F7" />
              <path d="M-80 -60 a20 20 0 0 1 20 -20 h120 a20 20 0 0 1 20 20 v26 h-160 z" fill={C.red} />
              <text x={0} y={-44} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={26} fill="#FFFFFF">TAG</text>
              <text x={0} y={66} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={100} fill="#0A111D">1</text>
            </g>
            <Txt x={790} y={1080} s={58} o={tw(f, wk("plan", "attest"), 10)}>ab Tag 1</Txt>
            <StampT f={f} at={wk("plan", "gesetz") - 2} x={540} y={1250} text="NOCH KEIN GESETZ" s={0.95} rot={-6} />
          </g>
        )}

        {/* ===== Szene 3a: seit 2022 elektronisch ===== */}
        {f >= f3 && f < f3b + 14 && (
          <g opacity={s3in * (1 - s3x)} transform={`translate(0 ${lerp(70, 0, s3in)})`}>
            <Txt x={540} y={330} s={96} c={C.amber} o={tw(f, wk("twist", "seit") - 2, 10)}>Seit 2022</Txt>
            <g opacity={lerp(1, 0.12, vor)}>
              <g transform="translate(260 690)"><Monitor /></g>
              <g transform="translate(820 700)"><House label="Krankenkasse" col={C.green} /></g>
              {fly && Array.from({ length: 5 }).map((_, i) => {
                const t = ((f - wk("twist", "elektronisch") + i * 14) % 70) / 70;
                return <g key={i} transform={`translate(${lerp(440, 680, t)} ${640 - Math.sin(t * Math.PI) * 110})`} opacity={Math.sin(t * Math.PI)}><rect x={-30} y={-21} width={60} height={42} rx={7} fill="#EEF2F7" /><path d="M-30 -18 L0 4 L30 -18" fill="none" stroke="#5A6B88" strokeWidth={4} /></g>;
              })}
            </g>
            {/* vorher: gelbe Zettel in die Schublade */}
            <g opacity={vor}>
              <Txt x={540} y={470} s={64} c={C.gray} w={700}>Vorher:</Txt>
              {[0, 1, 2].map((i) => {
                const d = interpolate(f, [wk("twist", "gelbe") + i * 7, wk("twist", "gelbe") + i * 7 + 22], [0, 1], { ...CL, easing: IO });
                return <g key={i} transform={`translate(${380 + i * 160} ${lerp(820, 1150, d)}) rotate(${lerp(-10 + i * 10, 20 - i * 12, d)})`} opacity={1 - d * 0.9}><Slip s={0.9} label="AU" /></g>;
              })}
              <g transform="translate(540 1220)">
                <rect x={-280} y={-70} width={560} height={150} rx={18} fill="#7A4E36" />
                <rect x={-280} y={-70} width={560} height={26} rx={12} fill="#9A6A4C" />
                <rect x={-70} y={-10} width={140} height={24} rx={12} fill="#5B3A29" />
              </g>
              <g transform={`translate(880 1000) scale(${pop(f, wk("twist", "statistik") - 2, 12)})`}>
                <rect x={-90} y={-70} width={180} height={140} rx={18} fill="#EEF2F7" />
                {[[-55, 40], [-10, 70], [35, 100]].map(([x, h], i) => <rect key={i} x={x} y={50 - h} width={34} height={h} rx={6} fill="#86A9FF" />)}
                <g transform="translate(78 -62)"><Check p={1} ok={false} r={38} /></g>
              </g>
            </g>
          </g>
        )}

        {/* ===== Szene 3b: AOK +2,5 Tage ===== */}
        {f >= f3b && f < f4 + 14 && (
          <g opacity={s3bin * (1 - s3bout)} transform={`translate(0 ${lerp(70, 0, s3bin)})`}>
            <Txt x={540} y={300} s={56} c={C.gray} w={700}>AOK · Fehltage 2025</Txt>
            <line x1={150} y1={1300} x2={930} y2={1300} stroke="#2A3F63" strokeWidth={8} strokeLinecap="round" />
            {/* ohne Effekt */}
            <rect x={230} y={1300 - 620 * g1} width={240} height={620 * g1} rx={18} fill="#86A9FF" />
            <Txt x={350} y={1300 - 620 * g1 - 30} s={64} o={g1}>20,8</Txt>
            <Txt x={350} y={1360} s={40} c={C.gray} w={700} o={g1}>ohne eAU</Txt>
            {/* gemessen */}
            <rect x={610} y={1300 - 620 * g1} width={240} height={620 * g1} rx={18} fill={C.red} />
            <rect x={610} y={1300 - 620 * g1 - 74 * g2} width={240} height={74 * g2 + 18} rx={18} fill="url(#hatch)" />
            <Txt x={730} y={1300 - 620 * g1 - 74 * g2 - 30} s={64} o={g1}>23,3</Txt>
            <Txt x={730} y={1360} s={40} c={C.gray} w={700} o={g1}>gezählt</Txt>
            <g opacity={g2}>
              <path d={`M470 ${1300 - 620 * g1 - 74} L600 ${1300 - 620 * g1 - 74}`} stroke={C.amber} strokeWidth={5} strokeDasharray="12 10" />
              <path d={`M470 ${1300 - 620 * g1} L600 ${1300 - 620 * g1}`} stroke={C.amber} strokeWidth={5} strokeDasharray="12 10" />
            </g>
            <g transform={`translate(540 470) scale(${pop(f, wk("twist", "zweieinhalb") - 4, 16)})`}>
              <Txt x={0} y={0} s={130} c={C.amber}>+2,5 Tage</Txt>
              <Txt x={0} y={80} s={52} c={C.white} w={700} o={tw(f, wk("twist", "zählen") - 4, 10)}>nur durchs Zählen</Txt>
            </g>
          </g>
        )}

        {/* ===== Szene 4a: Blaumachen per Telefon? ===== */}
        {f >= f4 && f < f4b + 14 && (
          <g opacity={s4in * (1 - s4x)} transform={`translate(0 ${lerp(70, 0, s4in)})`}>
            <Txt x={540} y={330} s={80}>Blaumachen <tspan fill={C.blue}>per Telefon?</tspan></Txt>
            <ellipse cx={540} cy={800} rx={480} ry={400} fill="url(#spot)" />
            <Phone x={540} y={790} s={2.6} />
            <g transform={`translate(${magX} ${760 + Math.sin(f / 6) * 20})`} opacity={tw(f, wk("fair", "dak") - 6, 10)}><Mag x={0} y={0} s={1.5} /></g>
            <Txt x={540} y={470} s={46} c={C.gray} w={700} o={tw(f, wk("fair", "dak") - 4, 10)}>DAK-Umfrage</Txt>
            <g transform={`translate(540 1200) scale(${pop(f, wk("fair", "hinweise") - 2, 14)})`}>
              <rect x={-450} y={-66} width={900} height={132} rx={66} fill="#0A111D" opacity={0.4} transform="translate(6 10)" />
              <rect x={-450} y={-66} width={900} height={132} rx={66} fill={C.deep} stroke={C.green} strokeWidth={5} />
              <g transform="translate(-382 0)"><Check p={1} ok r={38} /></g>
              <Txt x={45} y={17} s={46}>keine Hinweise auf Missbrauch</Txt>
            </g>
          </g>
        )}

        {/* ===== Szene 4b: echte Gründe ===== */}
        {f >= f4b && f < fE + 14 && (
          <g opacity={s4bin * (1 - s4bout)} transform={`translate(0 ${lerp(70, 0, s4bin)})`}>
            <Txt x={540} y={330} s={84}>Echte Gründe</Txt>
            {Array.from({ length: 7 }).map((_, i) => {
              const at = Math.min(f4b + 10 + i * 4, wk("fair", "atemwegsinfekte") - 6 + i * 3);
              return f > at ? <g key={i} opacity={tw(f, at, 10) * (1 - 0.6 * home)}><Virus f={f} seed={i + 3} x={170 + (i % 4) * 250} y={540 + Math.floor(i / 4) * 170} r={34} /></g> : null;
            })}
            <Txt x={540} y={930} s={56} c={C.green} o={tw(f, wk("fair", "atemwegsinfekte"), 10) * (1 - home)}>mehr Infekte</Txt>
            <g opacity={home} transform={`translate(0 ${lerp(60, 0, home)})`}>
              <g transform="translate(540 760)">
                <path d="M-300 40 L0 -170 L300 40 Z" fill={C.amber} opacity={0.9} />
                <rect x={-260} y={40} width={520} height={480} fill="#2A3F63" />
              </g>
              <Figure f={f} x={430} y={930} s={1.0} shirt="#86A9FF" look={-4} blinkSeed={4} />
              <Sick x={430} y={930} s={1.0} />
              <Bed x={560} y={1170} s={0.72} />
              <path d="M330 1060 Q440 1010 560 1050 L760 1060 L780 1150 L320 1150 Z" fill="#4E70B4" />
              <Txt x={540} y={1340} s={58} o={tw(f, wk("fair", "hause") - 2, 10)}>bleibt eher zu Hause</Txt>
            </g>
          </g>
        )}

        {/* ===== Ende TikTok/Insta ===== */}
        {f >= fE && end === "tt" && (
          <g opacity={endIn} transform={`translate(0 ${lerp(60, 0, endIn)})`}>
            <Txt x={540} y={360} s={92}>Merz hat recht?</Txt>
            <Txt x={540} y={480} s={92} c={C.amber}>Oder falsche Lösung?</Txt>
            <g transform="translate(540 820) scale(0.62)"><MerzBust f={f} /></g>
            {([["Hat recht", C.green, 1130], ["Falsche Lösung", C.red, 1300]] as [string, string, number][]).map(([t, c, y], i) => {
              const p = pop(f, fE + 16 + i * 6, 14);
              return (
                <g key={i} transform={`translate(540 ${y}) scale(${p})`}>
                  <rect x={-330} y={-66} width={660} height={132} rx={32} fill="#0A111D" opacity={0.4} transform="translate(6 10)" />
                  <rect x={-330} y={-66} width={660} height={132} rx={32} fill={c} />
                  <text y={24} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={66} fill="#0A111D">{t}</text>
                </g>
              );
            })}
          </g>
        )}
      </svg>

      {/* ===== Ende YouTube ===== */}
      {f >= fE && end === "yt" && (
        <AbsoluteFill style={{ opacity: endIn, transform: `translateY(${lerp(60, 0, endIn)}px)` }}>
          <div style={{ position: "absolute", top: 400, width: W, textAlign: "center", fontFamily: FONT, fontWeight: 800, fontSize: 76, color: C.white, textShadow: "0 6px 0 #0A111D" }}>
            Ganzes Video:
          </div>
          <div style={{ position: "absolute", top: 560, left: 90, width: 900, height: 506, borderRadius: 28, overflow: "hidden", border: "6px solid #EEF2F7", boxShadow: "0 24px 60px rgba(0,0,0,.6)", transform: `scale(${0.9 + 0.1 * pop(f, fE + 4, 16)})` }}>
            <Img src={staticFile("v5thumb.jpg")} style={{ width: "100%", height: "100%" }} />
            <div style={{ position: "absolute", right: 24, bottom: 24, width: 110, height: 110, borderRadius: 55, background: C.red, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 20px rgba(0,0,0,.5)" }}>
              <div style={{ width: 0, height: 0, borderTop: "26px solid transparent", borderBottom: "26px solid transparent", borderLeft: "40px solid #fff", marginLeft: 10 }} />
            </div>
          </div>
        </AbsoluteFill>
      )}

      {f >= f2 && <Sub f={f} cs={cs} end={subEnd} />}
      <Grain f={f} />
      <Audio src={staticFile(`audio/s8_${end}.wav`)} />
      {sfx.map(([t, n, v], i) => (
        <Sequence key={i} from={Math.max(0, t)} durationInFrames={90}><Audio src={staticFile(`sfx/n_sfx_${n}.wav`)} volume={(v ?? 0.6) * (SFX_GAIN[n] ?? 0.5)} /></Sequence>
      ))}
    </AbsoluteFill>
  );
};
export const Short8YT: React.FC = () => <Short8 end="yt" />;
export const Short8TT: React.FC = () => <Short8 end="tt" />;
