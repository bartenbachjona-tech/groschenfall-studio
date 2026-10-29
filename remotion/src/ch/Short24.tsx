/* Short 24 – Mogelpackung: Ültje Studentenfutter Original 200 g → 150 g, Edeka gleicher Preis 3,49 € (VZHH, Okt. 2026), bis zu +33 % pro Kilo */
import React from "react";
import { AbsoluteFill, random, staticFile, useCurrentFrame } from "remotion";
import { Audio } from "@remotion/media";
import { Backdrop, Stripes } from "../kit/Stage";
import { PriceTag, Stamp } from "../kit/Props";
import { C, CL, CLOSING, EndShare, EndYT, FONT, Grain, Pill, Scenes, Src, SfxTrack, Sub, Txt, W, H, chunks, interpolate, lerp, mk, pop, tw } from "./shortkit";
import D from "../data/s24.json";

const { wk, ps, pe, DUR } = mk(D as any);
export const S24_DUR = DUR;
const INK = "#0A111D";
const NUT = ["#C98B4E", "#A8672F", "#E2B27A", "#7A4A2A", "#D9A05B", "#8E3B3B"];

/** Schale mit loser Nussmischung (kein Produkt, keine Verpackung). amt = Füllmenge 0..1 */
const Bowl: React.FC<{ amt: number; seed: string; label?: string; s?: number }> = ({ amt, seed, label, s = 1 }) => {
  const n = Math.round(20 + 50 * amt);
  return (
    <g transform={`scale(${s})`}>
      {Array.from({ length: n }, (_, i) => {
        const u = random(`${seed}x${i}`) * 2 - 1;
        const x = u * 150;
        const y = -random(`${seed}y${i}`) * (30 + 110 * amt) * Math.sqrt(1 - u * u) + 6;
        const r = 16 + random(`${seed}r${i}`) * 8;
        return { x, y, r, i };
      }).sort((a, b) => a.y - b.y).map(({ x, y, r, i }) => (
        <ellipse key={i} cx={x} cy={y} rx={r} ry={r * 0.72} fill={NUT[i % NUT.length]} stroke={INK} strokeWidth={3} transform={`rotate(${random(`${seed}a${i}`) * 80 - 40} ${x} ${y})`} />
      ))}
      <path d="M -180 0 L 180 0 Q 170 90 0 96 Q -170 90 -180 0 Z" fill="#6E86B8" stroke={INK} strokeWidth={6} />
      <ellipse cx={0} cy={0} rx={180} ry={18} fill="#8FA6D6" stroke={INK} strokeWidth={5} />
      {label && <text y={68} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={52} fill={INK}>{label}</text>}
    </g>
  );
};

/** Balkenwaage: zwei Schalen; tilt in Grad (+ = links tiefer) */
const Scale: React.FC<{ tilt: number; l: number; r: number; ll: string; rl: string }> = ({ tilt, l, r, ll, rl }) => {
  const rad = (tilt * Math.PI) / 180, arm = 290;
  const lx = 540 - arm * Math.cos(rad), ly = 700 + arm * Math.sin(rad);
  const rx = 540 + arm * Math.cos(rad), ry = 700 - arm * Math.sin(rad);
  return (
    <g>
      <ellipse cx={540} cy={1330} rx={220} ry={26} fill={INK} opacity={0.45} />
      <path d="M 420 1320 L 660 1320 L 600 1270 L 480 1270 Z" fill="#2A4A7A" stroke={INK} strokeWidth={6} />
      <rect x={526} y={700} width={28} height={575} fill="#5A6B88" stroke={INK} strokeWidth={5} />
      <line x1={lx} y1={ly} x2={rx} y2={ry} stroke="#8FA6D6" strokeWidth={22} strokeLinecap="round" />
      <circle cx={540} cy={700} r={22} fill={C.amber} stroke={INK} strokeWidth={5} />
      {[[lx, ly, l, ll, "L"], [rx, ry, r, rl, "R"]].map(([x, y, a, lab, k]) => (
        <g key={k as string}>
          <line x1={x as number} y1={y as number} x2={(x as number) - 120} y2={(y as number) + 260} stroke={C.gray} strokeWidth={4} />
          <line x1={x as number} y1={y as number} x2={(x as number) + 120} y2={(y as number) + 260} stroke={C.gray} strokeWidth={4} />
          <g transform={`translate(${x} ${(y as number) + 260}) scale(0.7)`}><Bowl amt={a as number} seed={k as string} label={lab as string} /></g>
        </g>
      ))}
    </g>
  );
};

const Bon: React.FC<{ f: number; at: number }> = ({ f, at }) => (
  <g>
    <path d="M -230 -330 L 230 -330 L 230 300 L 200 330 L 170 300 L 140 330 L 110 300 L 80 330 L 50 300 L 20 330 L -10 300 L -40 330 L -70 300 L -100 330 L -130 300 L -160 330 L -190 300 L -230 330 Z" fill={C.white} />
    <text y={-250} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={58} fill={INK}>Edeka</text>
    <line x1={-190} y1={-210} x2={190} y2={-210} stroke={C.gray} strokeWidth={4} strokeDasharray="10 8" />
    <text x={-190} y={-130} fontFamily={FONT} fontWeight={700} fontSize={32} fill={C.mute}>vorher 200 g</text>
    <text x={190} y={-130} textAnchor="end" fontFamily={FONT} fontWeight={800} fontSize={44} fill={INK}>3,49 €</text>
    <g opacity={tw(f, at, 10)}>
      <text y={-40} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={56} fill={C.amber}>↓</text>
      <text x={-190} y={50} fontFamily={FONT} fontWeight={700} fontSize={32} fill={C.mute}>jetzt 150 g</text>
      <text x={190} y={50} textAnchor="end" fontFamily={FONT} fontWeight={800} fontSize={44} fill={C.red}>3,49 €</text>
    </g>
    <line x1={-190} y1={110} x2={190} y2={110} stroke={C.gray} strokeWidth={4} strokeDasharray="10 8" />
  </g>
);

const KgSign: React.FC<{ text: string; col: string; fg?: string }> = ({ text, col, fg = INK }) => (
  <g>
    <rect x={-210} y={-80} width={420} height={160} rx={20} fill={INK} opacity={0.35} transform="translate(6 10)" />
    <rect x={-210} y={-80} width={420} height={160} rx={20} fill={col} />
    <text y={22} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={62} fill={fg}>{text}</text>
  </g>
);

const Envelope: React.FC = () => (
  <g>
    <rect x={-220} y={-140} width={440} height={280} rx={16} fill={INK} opacity={0.35} transform="translate(8 12)" />
    <rect x={-220} y={-140} width={440} height={280} rx={16} fill={C.white} />
    <path d="M -220 -140 L 0 20 L 220 -140" stroke={C.gray} strokeWidth={8} fill="none" />
    <text y={100} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={42} fill={INK}>Anfrage VZHH</text>
  </g>
);

const ShelfTag: React.FC<{ dimP: number; lens: number }> = ({ dimP, lens }) => (
  <g>
    <rect x={-380} y={-70} width={760} height={30} rx={8} fill="#5A6B88" />
    <rect x={-300} y={-40} width={600} height={380} rx={18} fill={INK} opacity={0.35} transform="translate(8 12)" />
    <rect x={-300} y={-40} width={600} height={380} rx={18} fill={C.white} />
    <text x={-260} y={30} fontFamily={FONT} fontWeight={700} fontSize={36} fill={C.mute}>Nussmischung 150 g</text>
    <text x={-260} y={140} fontFamily={FONT} fontWeight={800} fontSize={110} fill={INK} opacity={1 - 0.75 * dimP}>3,49 €</text>
    <text x={-260} y={272} fontFamily={FONT} fontWeight={700} fontSize={30} fill={C.mute}>Grundpreis 23,27 €/kg</text>
    {lens > 0 && (
      <g transform={`translate(${lerp(360, 40, lens)} ${lerp(460, 262, lens)})`} opacity={Math.min(1, lens * 2)}>
        <circle r={115} fill={INK} opacity={0.92} stroke={C.green} strokeWidth={12} />
        <text y={-14} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={30} fill={C.gray}>Grundpreis</text>
        <text y={34} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={38} fill={C.green}>23,27 €/kg</text>
        <line x1={82} y1={82} x2={170} y2={170} stroke={C.green} strokeWidth={30} strokeLinecap="round" />
      </g>
    )}
  </g>
);

const Phone: React.FC = () => (
  <g>
    <rect x={-180} y={-300} width={360} height={600} rx={46} fill={INK} opacity={0.4} transform="translate(8 12)" />
    <rect x={-180} y={-300} width={360} height={600} rx={46} fill="#22385C" stroke={INK} strokeWidth={8} />
    <rect x={-156} y={-262} width={312} height={524} rx={28} fill={C.white} />
    <rect x={-120} y={-200} width={240} height={180} rx={18} fill="#E3E9F2" />
    <path d="M -50 -140 L 50 -140 L 40 -60 L -40 -60 Z" fill="#C98B4E" stroke={INK} strokeWidth={4} />
    <text y={40} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={40} fill={INK}>Mogelpackung</text>
    <rect x={-110} y={90} width={220} height={84} rx={42} fill={C.red} />
    <text y={146} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={40} fill={C.white}>melden</text>
  </g>
);

export const Short24: React.FC<{ end: "yt" | "tt" }> = ({ end }) => {
  const f = useCurrentFrame();
  const b2 = ps("b2") - 4, b3 = ps("b3") - 4, b4 = ps("b4") - 4, fE = ps(end) - 8;
  const b1 = ps("b1") - 2, b1b = wk("b1", "bei") - 4, b2b = wk("b2", "bis", 1) - 4, b3b = wk("b3", "hersteller") - 4;
  const b4b = wk("b4", "und") - 4, loop = wk("b4", "verbraucherzentrale") - 4;
  const closeAt = wk(end, "groschenfall") - 4;

  const scenes = [
    {
      a: 0, b: b1, render: (f: number) => {
        const t = 7 + Math.sin(f / 9) * 1.2;
        return (
          <g>
            <Txt x={540} y={320} s={100} c={C.amber}>150 statt 200 g</Txt>
            <Scale tilt={t} l={1} r={0.55} ll="200 g" rl="150 g" />
            <PriceTag f={f} x={540} y={430} a="3,49 €" s={1.4} />
          </g>
        );
      },
    },
    {
      a: b1, b: b1b, render: (f: number) => {
        const sh = interpolate(f, [wk("b1", "hundertfünfzig") - 4, wk("b1", "hundertfünfzig") + 12], [1, 0.55], CL);
        const lab = f >= wk("b1", "hundertfünfzig") - 2 ? "150 g" : "200 g";
        return (
          <g>
            <Txt x={540} y={330} s={70}>Ültje Studentenfutter</Txt>
            <Txt x={540} y={420} s={54} c={C.gray} w={700}>Original</Txt>
            <g transform="translate(540 980) scale(1.25)"><Bowl amt={sh} seed="B" /></g>
            <g transform={`translate(540 1200) scale(${pop(f, wk("b1", "zweihundert") - 2, 14)})`}>
              <Pill w={360} text={lab} col={lab === "150 g" ? C.red : C.amber} fg={lab === "150 g" ? C.white : INK} s={70} h={130} />
            </g>
            <Src o={tw(f, b1 + 6, 10)}>Quelle: VZHH, Mogelpackungsliste Okt. 2026</Src>
          </g>
        );
      },
    },
    {
      a: b1b, b: b2, render: (f: number) => (
        <g>
          <Txt x={540} y={330} s={84}>Gleicher Preis</Txt>
          <g transform={`translate(540 820) rotate(-3) scale(${pop(f, b1b + 4, 14)})`}><Bon f={f} at={wk("b1", "selben") - 4} /></g>
          <Stamp f={f} at={wk("b1", "preis") - 2} x={560} y={1010} text="3,49 € = 3,49 €" s={0.55} col={C.red} rot={-8} />
          <Txt x={540} y={1300} s={34} c={C.gray} w={600} o={tw(f, wk("b1", "meldet") - 2, 10)}>gemeldet: Verbraucherzentrale Hamburg</Txt>
          <Src o={tw(f, b1b + 6, 10)}>Quelle: VZHH, Mogelpackungsliste Okt. 2026</Src>
        </g>
      ),
    },
    {
      a: b2, b: b2b, render: (f: number) => {
        const r = tw(f, wk("b2", "zahlst") - 2, 12);
        const bd = pop(f, wk("b2", "drittel") - 2, 14);
        return (
          <g>
            <Txt x={540} y={330} s={84}>Preis pro Kilo</Txt>
            <g transform="translate(540 640)"><KgSign text="17,45 €/kg" col={C.white} /></g>
            <Txt x={540} y={780} s={36} c={C.gray} w={600}>bei 200 g</Txt>
            <g opacity={r} transform={`translate(540 ${lerp(860, 900, r)})`}>
              <path d="M 0 -50 L 0 30 M -36 -4 L 0 34 L 36 -4" stroke={C.red} strokeWidth={14} strokeLinecap="round" fill="none" />
            </g>
            <g transform={`translate(540 1040) scale(${0.6 + 0.4 * r})`} opacity={r}><KgSign text="23,27 €/kg" col={C.red} fg={C.white} /></g>
            <Txt x={540} y={1180} s={36} c={C.gray} w={600} o={r}>bei 150 g</Txt>
            <g transform={`translate(860 880) rotate(10) scale(${bd})`} opacity={Math.min(1, bd * 2)}>
              <circle r={120} fill={C.amber} stroke={INK} strokeWidth={6} />
              <text y={-18} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={34} fill={INK}>bis zu</text>
              <text y={38} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={58} fill={INK}>+33 %</text>
            </g>
          </g>
        );
      },
    },
    {
      a: b2b, b: b3, render: (f: number) => {
        const g = interpolate(f, [wk("b2", "gesenkt") - 4, wk("b2", "gesenkt") + 10], [0, 1], CL);
        return (
          <g>
            <Txt x={540} y={330} s={84}>Bis zu?</Txt>
            {[0, 1, 2].map((i) => {
              const sel = i === 1;
              const y = sel ? lerp(700, 860, g) : 700;
              return (
                <g key={i} transform={`translate(${220 + i * 320} ${y})`}>
                  <rect x={-130} y={-70} width={260} height={140} rx={16} fill={C.white} opacity={sel ? 1 : 0.55} />
                  <text y={20} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={58} fill={INK}>3,49 €</text>
                  {sel && <line x1={-110} y1={20} x2={lerp(-110, 110, g)} y2={-20} stroke={C.red} strokeWidth={12} strokeLinecap="round" opacity={g} />}
                  {sel && <path d="M 0 90 L 0 170 M -34 136 L 0 172 L 34 136" stroke={C.green} strokeWidth={12} strokeLinecap="round" fill="none" opacity={g} />}
                </g>
              );
            })}
            <g transform={`translate(540 1200) scale(${pop(f, wk("b2", "manche") - 2, 14)})`}><Pill w={820} text="manche Händler: günstiger" col={C.green} s={52} h={120} /></g>
            <Src o={tw(f, b2b + 6, 10)}>Quelle: VZHH, Okt. 2026</Src>
          </g>
        );
      },
    },
    {
      a: b3, b: b3b, render: (f: number) => {
        const p = pop(f, b3 + 8, 14);
        return (
          <g>
            <Txt x={540} y={330} s={84}>Verboten?</Txt>
            <rect x={526} y={820} width={28} height={480} fill="#5A6B88" />
            <g transform={`translate(540 760) scale(${p}) rotate(-3)`} opacity={Math.min(1, p * 2)}>
              <rect x={-360} y={-150} width={720} height={300} rx={26} fill={INK} opacity={0.35} transform="translate(8 12)" />
              <rect x={-360} y={-150} width={720} height={300} rx={26} fill={C.blue} />
              <text y={-20} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={76} fill={INK}>grundsätzlich</text>
              <text y={80} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={76} fill={INK}>erlaubt</text>
            </g>
          </g>
        );
      },
    },
    {
      a: b3b, b: b4, render: (f: number) => {
        const e = pop(f, b3b + 4, 14), bub = tw(f, wk("b3", "hat") - 2, 10);
        const dots = Math.floor(f / 8) % 4;
        return (
          <g>
            <Txt x={540} y={330} s={84}>Hersteller</Txt>
            <Txt x={540} y={430} s={66} c={C.amber} o={tw(f, wk("b3", "intersnack") - 2, 10)}>Intersnack</Txt>
            <g transform={`translate(420 860) rotate(-4) scale(${e})`}><Envelope /></g>
            <g opacity={bub} transform="translate(800 640)">
              <path d="M -120 -70 Q -120 -110 -80 -110 L 80 -110 Q 120 -110 120 -70 L 120 30 Q 120 70 80 70 L -20 70 L -70 120 L -60 70 L -80 70 Q -120 70 -120 30 Z" fill={C.white} />
              <text y={0} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={80} fill={INK}>{".".repeat(dots)}</text>
            </g>
            <Stamp f={f} at={wk("b3", "geantwortet") - 2} x={540} y={1180} text="keine Antwort" s={0.75} col={C.red} rot={-7} />
            <Src o={tw(f, b3b + 6, 10)}>Quelle: VZHH, Okt. 2026</Src>
          </g>
        );
      },
    },
    {
      a: b4, b: b4b, kind: "zoom" as const, render: (f: number) => {
        const lens = tw(f, wk("b4", "grundpreis") - 4, 14);
        const dimP = tw(f, wk("b4", "packungspreis") - 4, 10);
        return (
          <g>
            <Txt x={540} y={330} s={84}>Dein Schutz</Txt>
            <g transform={`translate(540 760) scale(${pop(f, b4 + 6, 14)})`}><ShelfTag dimP={dimP} lens={lens} /></g>
            <g transform={`translate(540 1290) scale(${pop(f, wk("b4", "grundpreis") + 6, 14)})`}><Pill w={760} text="Grundpreis vergleichen" col={C.green} s={52} h={120} /></g>
          </g>
        );
      },
    },
    {
      a: b4b, b: loop, render: (f: number) => (
        <g>
          <Txt x={540} y={330} s={84}>Melden</Txt>
          <g transform={`translate(540 770) scale(${pop(f, b4b + 2, 14)})`}><Phone /></g>
          <g transform={`translate(540 1180) scale(${pop(f, wk("b4", "mogelpackungen") - 2, 14)})`}><Pill w={800} text="→ Verbraucherzentrale" col={C.green} s={54} h={120} /></g>
          <Src o={tw(f, b4b + 4, 10)}>Quelle: VZHH 10.07.2026 / Verbraucherzentrale</Src>
        </g>
      ),
    },
    {
      a: loop, b: fE - 6, render: (f: number) => {
        const t = interpolate(f, [loop + 4, loop + 16], [0, 7], CL) + Math.sin(f / 9) * 1.2;
        return (
          <g>
            <Txt x={540} y={320} s={100} c={C.amber}>150 statt 200 g</Txt>
            <Scale tilt={t} l={1} r={0.55} ll="200 g" rl="150 g" />
            <PriceTag f={f} x={540} y={430} a="3,49 €" s={1.4} />
          </g>
        );
      },
    },
  ];

  const hi = ["studentenfutter", "teurer", "drittel", "edeka", "preis", "kilo", "händler", "gesenkt", "grundsätzlich", "geantwortet", "grundpreis", "packungspreis", "mogelpackungen", "verbraucherzentrale"];
  const cs = chunks(D.paras as any, ["hook", "b1", "b2", "b3", "b4"], [
    ["zweihundert", "200"], ["hundertfünfzig gramm", "150 Gramm"],
  ]);
  const subEnd = pe("b4") + 8;
  const endIn = tw(f, fE, 16);

  const sfx: [number, string, number?][] = [
    [0, "soft", 0.7], [wk("hook", "teurer") - 2, "coins", 0.4],
    [b1 - 4, "whoosh", 0.7], [wk("b1", "hundertfünfzig") - 4, "soft", 0.5],
    [b1b - 2, "whoosh", 0.6], [wk("b1", "preis") - 2, "stamp", 0.5],
    [b2 - 4, "whoosh", 0.7], [wk("b2", "drittel") - 2, "ding", 0.5],
    [b2b - 2, "whoosh", 0.6], [wk("b2", "gesenkt") - 4, "marimba", 0.4],
    [b3 - 4, "whoosh", 0.7], [b3b - 2, "paper", 0.5], [wk("b3", "geantwortet") - 2, "stamp", 0.5],
    [b4 - 4, "whoosh", 0.7], [wk("b4", "grundpreis") - 4, "ding", 0.4],
    [b4b - 2, "whoosh", 0.6], [loop, "soft", 0.5],
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
              : <EndShare f={f} at={fE} who={["im Supermarkt nur auf", "den Packungspreis schaut."]} closeAt={closeAt} />}
          </g>
        )}
      </svg>
      <Sub f={f} cs={cs} end={subEnd} hi={hi} />
      <Grain f={f} />
      <Audio src={staticFile(`audio/s24_${end}.wav`)} />
      <SfxTrack list={sfx} />
    </AbsoluteFill>
  );
};
export const Short24YT: React.FC = () => <Short24 end="yt" />;
export const Short24TT: React.FC = () => <Short24 end="tt" />;
