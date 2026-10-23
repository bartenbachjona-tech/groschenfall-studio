import React from "react";
import { AbsoluteFill, Img, Sequence, interpolate, random, staticFile, useCurrentFrame } from "remotion";
import { Audio } from "@remotion/media";
import { C, FONT } from "../brand";
import { Backdrop, Stripes } from "../kit/Stage";
import { Stamp } from "../kit/Props";
import { CL, IO, SPR, lerp, pop, tw } from "../kit/core";
import D from "../data/s7.json";

const W = 1080, H = 1920, FPS = 30;
const fr = (s: number) => Math.round(s * FPS);
type P = { start: number; dur: number; words: { text: string; start: number }[] };
const PA = D.paras as Record<string, P>;
const norm = (s: string) => s.toLowerCase().replace(/[^a-zäöüß0-9']/g, "");
/** Frame eines Wortes (Anfang) in Absatz k */
const wk = (k: string, word: string, nth = 0) => {
  const p = PA[k]; let n = 0;
  for (const w of p.words) if (norm(w.text).startsWith(norm(word))) { if (n === nth) return fr(p.start + w.start); n++; }
  return fr(p.start);
};
const ps = (k: string) => fr(PA[k].start);
const pe = (k: string) => fr(PA[k].start + PA[k].dur);
export const S7_DUR = { yt: fr(D.tot_yt), tt: fr(D.tot_tt) };

const SFX_GAIN: Record<string, number> = { soft: 0.5, whoosh: 0.4, stamp: 0.55, ding: 0.4, paper: 0.5, marimba: 0.45, coins: 0.4 };

/* ---------- Bausteine ---------- */
const Txt: React.FC<{ x: number; y: number; s: number; c?: string; a?: "start" | "middle" | "end"; o?: number; w?: number; children: React.ReactNode }> = ({ x, y, s, c = C.white, a = "middle", o = 1, w = 800, children }) => (
  <text x={x} y={y} fontSize={s} fontFamily={FONT} fontWeight={w} fill={c} textAnchor={a} opacity={o} stroke="#0A111D" strokeWidth={s * 0.1} paintOrder="stroke" letterSpacing={-1}>{children}</text>
);

const FLAGS = { FR: ["#2B5CC8", "#F3F5F8", "#E2464B"], HU: ["#E2464B", "#F3F5F8", "#2E9E5B"], AT: ["#E2464B", "#F3F5F8", "#E2464B"], DE: ["#1A1A1A", "#D7303A", "#F2C230"] };
type FK = keyof typeof FLAGS;
/** Runde Flaggen-Plakette */
const Badge: React.FC<{ k: FK; r?: number }> = ({ k, r = 110 }) => {
  const v = k === "FR", c = FLAGS[k];
  return (
    <g>
      <circle r={r + 12} fill="#0A111D" opacity={0.45} transform="translate(0 10)" />
      <clipPath id={`b${k}${r}`}><circle r={r} /></clipPath>
      <g clipPath={`url(#b${k}${r})`}>
        {c.map((col, i) => v
          ? <rect key={i} x={-r + (i * 2 * r) / 3} y={-r} width={(2 * r) / 3 + 1} height={2 * r} fill={col} />
          : <rect key={i} x={-r} y={-r + (i * 2 * r) / 3} width={2 * r} height={(2 * r) / 3 + 1} fill={col} />)}
        <circle cx={-r * 0.35} cy={-r * 0.45} r={r * 0.9} fill="#FFFFFF" opacity={0.08} />
      </g>
      <circle r={r} fill="none" stroke="#EEF2F7" strokeWidth={8} />
    </g>
  );
};
const Check: React.FC<{ p: number; ok: boolean; r?: number }> = ({ p, ok, r = 46 }) => (
  <g transform={`scale(${p})`} opacity={Math.min(1, p * 2)}>
    <circle r={r + 6} fill="#0A111D" />
    <circle r={r} fill={ok ? C.green : C.red} />
    {ok
      ? <path d={`M${-r * 0.45} ${r * 0.05} L${-r * 0.12} ${r * 0.36} L${r * 0.48} ${-r * 0.3}`} fill="none" stroke="#0A111D" strokeWidth={r * 0.24} strokeLinecap="round" strokeLinejoin="round" />
      : <path d={`M${-r * 0.35} ${-r * 0.35} L${r * 0.35} ${r * 0.35} M${r * 0.35} ${-r * 0.35} L${-r * 0.35} ${r * 0.35}`} fill="none" stroke="#0A111D" strokeWidth={r * 0.24} strokeLinecap="round" />}
  </g>
);

/** Pflicht-Schild: nur Piktogramm + zwei Zahlen */
const Sign: React.FC<{ a?: number; b?: number }> = ({ a = 0, b = 0 }) => (
  <g>
    <rect x={-150} y={8} width={300} height={250} rx={22} fill="#0A111D" opacity={0.4} transform="translate(8 10)" />
    <rect x={-150} y={8} width={300} height={250} rx={22} fill="#FFD84D" />
    <path d="M-150 30 a22 22 0 0 1 22 -22 h256 a22 22 0 0 1 22 22 v40 h-300 z" fill={C.red} />
    <path d="M0 18 L22 58 L-22 58 Z" fill="#FFD84D" /><rect x={-3} y={30} width={6} height={15} rx={3} fill={C.red} /><circle cx={0} cy={51} r={3.5} fill={C.red} />
    <text x={0} y={128} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={50} fill="#5A6B88" opacity={1 - 0.3 * b}>500 g</text>
    <line x1={-70} x2={70} y1={112} y2={112} stroke={C.red} strokeWidth={7} strokeLinecap="round" opacity={b} />
    <path d="M0 146 v22 m-12 -10 l12 12 l12 -12" fill="none" stroke="#0A111D" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
    <text x={0} y={232} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={60 + 8 * a} fill={C.red}>450 g</text>
  </g>
);

/** Neutrale Packung mit Sichtfenster (Füllstand) */
const Pack: React.FC<{ col: string; fill?: number; w?: number; h?: number; dim?: number }> = ({ col, fill = 1, w = 220, h = 330, dim = 0 }) => (
  <g opacity={1 - dim * 0.45}>
    <rect x={-w / 2} y={-h} width={w} height={h} rx={18} fill={col} />
    <rect x={-w / 2} y={-h} width={w * 0.32} height={h} rx={18} fill="#FFFFFF" opacity={0.1} />
    <rect x={w / 2 - w * 0.2} y={-h} width={w * 0.2} height={h} fill="#000000" opacity={0.14} />
    <rect x={-w * 0.3} y={-h * 0.82} width={w * 0.6} height={h * 0.62} rx={14} fill="#0E1828" />
    <clipPath id={`win${col}`}><rect x={-w * 0.3} y={-h * 0.82} width={w * 0.6} height={h * 0.62} rx={14} /></clipPath>
    <g clipPath={`url(#win${col})`}>
      <rect x={-w * 0.3} y={-h * 0.2 - h * 0.62 * fill} width={w * 0.6} height={h * 0.62 * fill + 2} fill="#E9C27A" />
      {Array.from({ length: 22 }).map((_, i) => {
        const x = -w * 0.27 + (i % 6) * w * 0.105, y = -h * 0.24 - Math.floor(i / 6) * h * 0.11;
        return <circle key={i} cx={x} cy={y} r={w * 0.035} fill="#C99A4E" opacity={y > -h * 0.2 - h * 0.62 * fill ? 1 : 0} />;
      })}
    </g>
    <rect x={-w * 0.3} y={-h * 0.82} width={w * 0.6} height={h * 0.62} rx={14} fill="none" stroke="#FFFFFF" strokeOpacity={0.5} strokeWidth={4} />
  </g>
);

/** kleine Deko-Packung ohne Text */
const Mini: React.FC<{ col: string; w: number; h: number; cap?: string }> = ({ col, w, h, cap }) => (
  <g>
    <rect x={-w / 2} y={-h} width={w} height={h} rx={10} fill={col} opacity={0.55} />
    <rect x={-w / 2} y={-h * 0.62} width={w} height={h * 0.22} fill="#FFFFFF" opacity={0.12} />
    {cap && <rect x={-w * 0.3} y={-h - 16} width={w * 0.6} height={18} rx={6} fill={cap} opacity={0.55} />}
  </g>
);

const Gavel: React.FC<{ a: number }> = ({ a }) => (
  <g>
    <ellipse cx={-100} cy={196} rx={210} ry={30} fill="#0A111D" opacity={0.5} />
    <rect x={-250} y={130} width={300} height={60} rx={14} fill="#7A4E36" />
    <rect x={-250} y={130} width={300} height={16} rx={8} fill="#9A6A4C" />
    <g transform={`translate(240 30) rotate(${lerp(38, 0, a)}) translate(-240 -30)`}>
      <rect x={-60} y={14} width={300} height={32} rx={14} fill="#9A6A4C" />
      <rect x={-170} y={-70} width={120} height={200} rx={20} fill="#7A4E36" />
      <rect x={-182} y={-60} width={144} height={30} rx={10} fill="#5B3A29" />
      <rect x={-182} y={90} width={144} height={30} rx={10} fill="#5B3A29" />
      <rect x={-160} y={-62} width={30} height={184} rx={10} fill="#FFFFFF" opacity={0.1} />
    </g>
  </g>
);

const Paper: React.FC<{ hl: number }> = ({ hl }) => (
  <g>
    <rect x={-300} y={-380} width={600} height={760} rx={20} fill="#0A111D" opacity={0.45} transform="translate(12 16)" />
    <rect x={-300} y={-380} width={600} height={760} rx={20} fill="#F3F5F8" />
    <rect x={-240} y={-320} width={300} height={34} rx={10} fill="#0E1828" />
    {[-240, -195, -150, -105, 40, 85, 130, 175, 220, 265].map((y, i) => <rect key={i} x={-240} y={y} width={[480, 440, 470, 300, 470, 420, 460, 380, 450, 260][i]} height={20} rx={10} fill="#C9D3E2" />)}
    <rect x={-252} y={-58} width={504 * hl} height={70} rx={12} fill="#FFD84D" />
    <rect x={-240} y={-45} width={440} height={20} rx={10} fill="#0E1828" opacity={0.75} />
    <rect x={-240} y={-12} width={300} height={20} rx={10} fill="#0E1828" opacity={0.75} />
  </g>
);

/* ---------- Untertitel (dezent, eine Zeile) ---------- */
const NUM: Record<string, string> = { fünfhundert: "500", vierhundertfünfzig: "450", fünfzehntausend: "15.000" };
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
    <div style={{ position: "absolute", top: 1390, left: 60, right: 60, textAlign: "center", fontFamily: FONT, fontWeight: 800, fontSize: 66, color: C.white, letterSpacing: -1, opacity: p, transform: `translateY(${lerp(14, 0, p)}px)` }}>
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
export const Short7: React.FC<{ end: "yt" | "tt" }> = ({ end }) => {
  const f = useCurrentFrame();
  const TOT = S7_DUR[end];
  const f2 = ps("p2"), f3 = ps("p3") - 6, f4 = ps("p4") - 6, f5 = ps("p5") - 6, fE = ps(end) - 8;

  // Szene 1+2: Laden
  const titleOut = tw(f, pe("p1") - 6, 12, IO);
  const zoom = tw(f, f2 - 4, 26, IO);
  const cam = { s: lerp(1, 1.32, zoom), x: lerp(540, 610, zoom), y: lerp(1010, 960, zoom) };
  const shopOut = tw(f, f3 - 2, 12, IO);
  const fillDrop = tw(f, wk("p2", "kleiner"), 22, IO);
  const swing = Math.sin((f - wk("p1", "schild")) / 5) * 6 * Math.exp(-Math.max(0, f - wk("p1", "schild")) / 18) * (f > wk("p1", "schild") ? 1 : 0);
  const strike = tw(f, wk("p2", "vorher") + 4, 10);
  const big = Math.sin(Math.PI * tw(f, wk("p2", "jetzt"), 14, (t) => t));
  const cal = pop(f, wk("p2", "zwei"), 14) * (1 - tw(f, wk("p2", "vorher"), 10, IO));

  // Szene 3: Strafe
  const s3in = tw(f, f3, 16), s3out = tw(f, f4 - 2, 12, IO);
  const hit = tw(f, wk("p3", "strafe") - 6, 6, (t) => t * t);
  const shake = f > wk("p3", "strafe") ? Math.sin(f * 2.3) * 10 * Math.exp(-(f - wk("p3", "strafe")) / 5) : 0;
  const num = pop(f, wk("p3", "fünfzehntausend"), 16);

  // Szene 4: Länder
  const s4in = tw(f, f4, 14), s4out = tw(f, f5 - 2, 12, IO);
  // Szene 5: Deutschland
  const s5in = tw(f, f5, 16), s5out = tw(f, fE - 2, 12, IO);
  const paper = tw(f, wk("p5", "satz") - 6, 16);
  const hl = tw(f, wk("p5", "koalitionsvertrag"), 16, IO);
  const endIn = tw(f, fE, 18);

  const cs = chunks(["p2", "p3", "p4", "p5", ...(end === "tt" ? ["tt"] : [])], ["500", "450", "15.000", "zwei", "monate", "ungarn", "österreich", "deutschland", "fehlanzeige", "kommentare"]);
  const subEnd = end === "tt" ? TOT - 8 : pe("p5") + 10;

  const sfx: [number, string, number?][] = [
    [wk("p1", "schild") - 3, "soft", 0.8], [f2 - 6, "whoosh", 0.6], [wk("p2", "kleiner"), "soft", 0.7], [wk("p2", "zwei") - 2, "soft", 0.7],
    [wk("p2", "jetzt"), "ding", 0.5], [f3 - 4, "whoosh", 0.8], [wk("p3", "strafe") - 1, "stamp", 0.9], [wk("p3", "fünfzehntausend"), "coins", 0.6],
    [f4 - 4, "whoosh", 0.7], [wk("p4", "ungarn"), "ding", 0.5], [wk("p4", "österreich"), "ding", 0.5],
    [f5 - 4, "whoosh", 0.7], [wk("p5", "satz") - 6, "paper", 0.8], [wk("p5", "fehlanzeige") - 2, "stamp", 0.8], [fE - 6, "whoosh", 0.8],
  ];

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Backdrop />
      <Stripes w={W} h={H} />
      <svg width={W} height={H} style={{ position: "absolute" }}>
        <defs>
          <radialGradient id="spot" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stopColor="#4A6AAA" stopOpacity={0.4} /><stop offset="1" stopColor="#3A5A9A" stopOpacity={0} /></radialGradient>
          <linearGradient id="beam" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFF6D8" stopOpacity={0.16} /><stop offset="1" stopColor="#FFF6D8" stopOpacity={0} /></linearGradient>
        </defs>

        {/* ===== Szene 1+2: Regal ===== */}
        {f < f3 + 14 && (
          <g opacity={1 - shopOut}>
            <g transform={`translate(540 1010) scale(${cam.s}) translate(${-cam.x} ${-cam.y})`}>
              <ellipse cx={540} cy={1000} rx={560} ry={460} fill="url(#spot)" />
              {/* Regal-Korpus */}
              <rect x={80} y={560} width={920} height={720} rx={26} fill="#16243B" stroke="#2A3F63" strokeWidth={4} />
              <path d="M340 560 L250 1280 L830 1280 L740 560 Z" fill="url(#beam)" />
              {/* oberes Fach */}
              {[[170, "#86A9FF", 110, 170], [300, "#3DDC97", 120, 200, "#3DDC97"], [440, "#FF5A60", 100, 150], [570, "#FFB547", 120, 190], [710, "#86A9FF", 110, 160, "#86A9FF"], [850, "#C9D3E2", 120, 200]].map(([x, c, w, h, cap], i) => (
                <g key={i} transform={`translate(${x} 820)`}><Mini col={c as string} w={w as number} h={h as number} cap={cap as string | undefined} /></g>
              ))}
              <rect x={80} y={820} width={920} height={26} fill="#2A3F63" />
              {/* unteres Fach: Heldenpackung */}
              <g transform="translate(200 1240)"><Mini col="#86A9FF" w={130} h={230} /></g>
              <g transform={`translate(430 1240) scale(${lerp(1, 0.985, fillDrop)})`}><Pack col="#E39A3B" fill={lerp(0.92, 0.62, fillDrop)} /></g>
              <rect x={80} y={1240} width={920} height={30} fill="#2A3F63" />
              <rect x={80} y={1266} width={920} height={14} fill="#0A111D" opacity={0.5} />
              {/* Schild am Regal */}
              <g transform={`translate(760 846) rotate(${swing})`}>
                <rect x={-4} y={0} width={8} height={30} fill="#C9D3E2" />
                <g transform="translate(0 22)"><Sign a={big} b={strike} /></g>
              </g>
              {/* Fähnchen Frankreich */}
              <g transform="translate(130 560)" opacity={1 - zoom}>
                <rect x={-4} y={-120} width={8} height={120} rx={4} fill="#C9D3E2" />
                <g transform="translate(58 -88)">
                  <rect x={-50} y={-34} width={100} height={68} rx={8} fill="#0A111D" opacity={0.4} transform="translate(4 5)" />
                  <rect x={-50} y={-34} width={34} height={68} fill={FLAGS.FR[0]} /><rect x={-16} y={-34} width={34} height={68} fill={FLAGS.FR[1]} /><rect x={17} y={-34} width={33} height={68} fill={FLAGS.FR[2]} />
                </g>
              </g>
              {/* Kalender */}
              <g transform={`translate(860 640) scale(${cal}) rotate(6)`} opacity={Math.min(1, cal * 2)}>
                <rect x={-80} y={-70} width={160} height={150} rx={18} fill="#F3F5F8" />
                <path d="M-80 -52 a18 18 0 0 1 18 -18 h124 a18 18 0 0 1 18 18 v24 h-160 z" fill={C.red} />
                <text x={0} y={52} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={74} fill="#0A111D">2</text>
                <text x={0} y={-36} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={22} fill="#FFFFFF">MONATE</text>
              </g>
            </g>
            {/* Titel (erstes Bild) */}
            <g opacity={1 - titleOut}>
              <Txt x={540} y={250} s={86}>Pflicht in <tspan fill={C.blue}>Frankreich.</tspan></Txt>
              <Txt x={540} y={370} s={96} c={C.red}>Bei uns nicht.</Txt>
            </g>
          </g>
        )}

        {/* ===== Szene 3: Strafe ===== */}
        {f >= f3 && f < f4 + 14 && (
          <g opacity={s3in * (1 - s3out)} transform={`translate(${shake} ${lerp(80, 0, s3in)})`}>
            <ellipse cx={540} cy={820} rx={460} ry={380} fill="url(#spot)" />
            <g transform="translate(600 880) scale(1.3)"><Gavel a={hit} /></g>
            <g transform={`translate(540 520) scale(${num})`} opacity={Math.min(1, num * 2)}>
              <Txt x={0} y={-70} s={58} c={C.gray} w={700}>bis zu</Txt>
              <Txt x={0} y={60} s={170} c={C.amber}>15.000 €</Txt>
            </g>
          </g>
        )}

        {/* ===== Szene 4: Länder ===== */}
        {f >= f4 && f < f5 + 14 && (
          <g opacity={s4in * (1 - s4out)}>
            {([["FR", 540, 470, f4 + 2, "Frankreich"], ["HU", 300, 900, wk("p4", "ungarn") - 4, "Ungarn"], ["AT", 780, 900, wk("p4", "österreich") - 4, "Österreich"]] as [FK, number, number, number, string][]).map(([k, x, y, at, name], i) => {
              const p = pop(f, at, 16);
              return (
                <g key={k} transform={`translate(${x} ${y}) scale(${p})`} opacity={Math.min(1, p * 2)}>
                  <Badge k={k} r={i === 0 ? 150 : 135} />
                  <g transform={`translate(${i === 0 ? 110 : 98} ${i === 0 ? 110 : 98})`}><Check p={pop(f, at + 8, 12)} ok r={44} /></g>
                  <Txt x={0} y={(i === 0 ? 150 : 135) + 90} s={54}>{name}</Txt>
                </g>
              );
            })}
          </g>
        )}

        {/* ===== Szene 5: Deutschland ===== */}
        {f >= f5 && f < fE + 14 && (
          <g opacity={s5in * (1 - s5out)}>
            <g transform={`translate(${lerp(540, 260, paper)} ${lerp(720, 420, paper)}) scale(${lerp(1, 0.62, paper) * pop(f, f5 + 2, 16)})`}>
              <Badge k="DE" r={170} />
              <g transform="translate(125 125)"><Check p={pop(f, wk("p5", "fehlanzeige") - 2, 12)} ok={false} r={54} /></g>
              <Txt x={0} y={290} s={64} o={1 - paper}>Deutschland?</Txt>
            </g>
            <g transform={`translate(${lerp(1300, 600, paper)} 900) rotate(${lerp(12, 3, paper)})`} opacity={paper}>
              <Paper hl={hl} />
              <Txt x={-40} y={-293} s={0.1}> </Txt>
            </g>
            <Stamp f={f} at={wk("p5", "fehlanzeige") - 2} x={600} y={1000} text="KEIN GESETZ" s={1.0} rot={-12} />
          </g>
        )}

        {/* ===== Ende TikTok/Insta ===== */}
        {f >= fE && end === "tt" && (
          <g opacity={endIn} transform={`translate(0 ${lerp(60, 0, endIn)})`}>
            <Txt x={540} y={330} s={92}>Brauchen wir</Txt>
            <Txt x={540} y={450} s={92} c={C.amber}>das auch?</Txt>
            <g transform={`translate(540 560) scale(${0.85 + 0.25 * pop(f, fE + 6, 14)}) rotate(-4)`}><Sign a={0} b={1} /></g>
            {([["JA", C.green, 320], ["NEIN", C.red, 760]] as [string, string, number][]).map(([t, c, x], i) => {
              const p = pop(f, fE + 16 + i * 6, 14);
              return (
                <g key={i} transform={`translate(${x} 1150) scale(${p})`}>
                  <rect x={-170} y={-70} width={340} height={140} rx={30} fill="#0A111D" opacity={0.4} transform="translate(6 10)" />
                  <rect x={-170} y={-70} width={340} height={140} rx={30} fill={c} />
                  <text y={26} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={72} fill="#0A111D">{t}</text>
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
            <Img src={staticFile("v4thumbB.jpg")} style={{ width: "100%", height: "100%" }} />
            <div style={{ position: "absolute", right: 24, bottom: 24, width: 110, height: 110, borderRadius: 55, background: C.red, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 20px rgba(0,0,0,.5)" }}>
              <div style={{ width: 0, height: 0, borderTop: "26px solid transparent", borderBottom: "26px solid transparent", borderLeft: "40px solid #fff", marginLeft: 10 }} />
            </div>
          </div>
        </AbsoluteFill>
      )}

      {f >= f2 && <Sub f={f} cs={cs} end={subEnd} />}
      <Grain f={f} />
      <Audio src={staticFile(`audio/s7_${end}.wav`)} />
      {sfx.map(([t, n, v], i) => (
        <Sequence key={i} from={Math.max(0, t)} durationInFrames={90}><Audio src={staticFile(`sfx/n_sfx_${n}.wav`)} volume={(v ?? 0.6) * (SFX_GAIN[n] ?? 0.5)} /></Sequence>
      ))}
    </AbsoluteFill>
  );
};
export const Short7YT: React.FC = () => <Short7 end="yt" />;
export const Short7TT: React.FC = () => <Short7 end="tt" />;
