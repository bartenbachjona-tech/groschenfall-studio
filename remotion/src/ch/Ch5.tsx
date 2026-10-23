import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { C, FONT } from "../brand";
import T5 from "../data/ch5.json";
import { CL, IO, SPR, Timing, lerp, mkW, pop, tw } from "../kit/core";
import { camAt, K, Layer, WHIP } from "../kit/Camera";
import { Stripes } from "../kit/Stage";
import { ChapterShell, Sfx } from "../kit/Chapter";
import { ChapterLabel } from "../kit/Caption";
import { Defs, Stamp, T } from "../kit/Props";
import { EuropeMap, ISO, europeProj } from "../kit/Globe";

const TM = T5 as Timing;
export const CH5_DUR = Math.ceil(TM.total * 30);
const W = mkW(TM);
const WW = 5760, WH = 1080;

const fTrick = W(0, "trick,"), fPackung = W(0, "packung"), fGleich = W(0, "gleich,"), fWeniger = W(0, "weniger.");
const fFra = W(1, "frankreich"), fJuli = W(1, "juli"), fMonate = W(1, "monate"), fSchild = W(1, "schild"), fUng = W(1, "ungarn"), fOes = W(1, "österreich"), fGesetz = W(1, "antimogelpackungsgesetz.");
const fDe = W(2, "deutschland"), fKoa = W(2, "koalitionsvertrag"), fTrans = W(2, "transparenz"), fKein = W(2, "gesetz"), fNicht = W(2, "nicht.");

/* Karte bei x 2880..5760 */
const MX0 = 2980, MY0 = 60, MW = 2600, MH = 1000;
const P = europeProj(MX0, MY0, MW, MH);
const pos = (lon: number, lat: number) => P([lon, lat]) ?? [0, 0];
const FR = pos(2.4, 46.6), HU = pos(19.4, 47.2), AT = pos(14.5, 47.6), DE = pos(10.4, 51.1);
const KEYS: K[] = [
  { f: 0, x: 960, y: 540, z: 1.05 },
  { f: fWeniger + 10, x: 960, y: 540, z: 1.0 },
  { f: fFra + 16, x: FR[0] + 120, y: FR[1] - 20, z: 1.35, e: WHIP },
  { f: fUng - 8, x: FR[0] + 180, y: FR[1] - 10, z: 1.4 },
  { f: fUng + 12, x: (HU[0] + AT[0]) / 2 + 60, y: HU[1] - 30, z: 1.3, e: IO },
  { f: fDe - 6, x: (HU[0] + AT[0]) / 2 + 60, y: HU[1] - 30, z: 1.32 },
  { f: fDe + 16, x: DE[0] + 260, y: DE[1], z: 1.15, e: IO },
  { f: CH5_DUR, x: DE[0] + 280, y: DE[1] + 10, z: 1.2 },
];
const BLUR: [number, number][] = [[fFra - 8, fFra + 18]];

const Sign: React.FC<{ x: number; y: number; at: number; f: number; line: string }> = ({ x, y, at, f, line }) => {
  const p = pop(f, at);
  return (
    <g transform={`translate(${x} ${y}) scale(${p})`} opacity={p}>
      <rect x={-6} y={0} width={12} height={110} fill={C.mute} />
      <rect x={-150} y={-120} width={300} height={130} rx={16} fill={C.white} />
      <T x={0} y={-72} s={26} a="middle" c={C.red}>⚠ Weniger Inhalt!</T>
      <T x={0} y={-30} s={24} a="middle" c={C.deep} w={700}>{line}</T>
    </g>
  );
};

const Main: React.FC<{ f: number }> = ({ f }) => {
  const shrink = interpolate(f, [fWeniger - 10, fWeniger + 14], [1, 0.62], { ...CL, easing: SPR });
  const xr = tw(f, fPackung - 10, 20, IO);
  const colors: Record<string, string> = {};
  const fr = tw(f, fFra - 6, 12), hu = tw(f, fUng - 6, 12), at = tw(f, fOes - 6, 12), de = tw(f, fDe - 4, 12);
  if (fr > 0.5) colors[ISO.FRA] = C.green;
  if (hu > 0.5) colors[ISO.HUN] = C.green;
  if (at > 0.5) colors[ISO.AUT] = C.green;
  if (de > 0.5) colors[ISO.DEU] = "#5A6B88";
  return (
    <svg width={WW} height={WH} style={{ overflow: "visible" }}>
      <Defs />
      {/* Chipstüte mit Röntgenblick */}
      <g>
        <T x={960} y={150} s={56} a="middle" o={tw(f, fTrick - 6, 12)}>Der unsichtbare Trick</T>
        <g transform="translate(960 600)">
          <path d="M -230 -330 L 230 -330 L 250 -300 L 230 330 L -230 330 L -250 -300 Z" fill="#B23A48" opacity={1 - 0.75 * xr} />
          <path d="M -230 -330 L 230 -330 L 250 -300 L 230 330 L -230 330 L -250 -300 Z" fill="none" stroke={C.white} strokeWidth={6} strokeDasharray="14 10" opacity={xr} />
          <T x={0} y={-140} s={90} a="middle" o={1 - 0.7 * xr}>CHIPS</T>
          <g opacity={xr}>
            {Array.from({ length: 24 }).map((_, i) => {
              const col = i % 6, row = Math.floor(i / 6);
              const visible = row / 4 < shrink;
              const yy = 300 - row * 130 * (0.9 + 0.1 * shrink);
              return visible ? <ellipse key={i} cx={-170 + col * 68} cy={yy - 40} rx={34} ry={22} fill={C.amber} transform={`rotate(${(i * 37) % 40 - 20} ${-170 + col * 68} ${yy - 40})`} /> : null;
            })}
            <line x1={-240} x2={240} y1={330 - 600 * shrink} y2={330 - 600 * shrink} stroke={C.red} strokeWidth={6} strokeDasharray="12 8" />
          </g>
        </g>
        <T x={1500} y={420} s={48} c={C.white} o={tw(f, fGleich - 6, 12)}>Packung:</T><T x={1500} y={480} s={56} c={C.green} o={tw(f, fGleich - 4, 12)}>gleich</T>
        <T x={1500} y={640} s={48} c={C.white} o={tw(f, fWeniger - 6, 12)}>Inhalt:</T><T x={1500} y={700} s={56} c={C.red} o={tw(f, fWeniger - 4, 12)}>weniger</T>
      </g>
      {/* Europa */}
      <g opacity={tw(f, fFra - 14, 14)}>
        <EuropeMap x={MX0} y={MY0} w={MW} h={MH} colors={colors} />
        <Sign x={FR[0]} y={FR[1] - 40} at={fSchild - 4} f={f} line="2 Monate Hinweis" />
        <g opacity={fr} transform={`translate(${FR[0] - 380} ${FR[1] + 160})`}><T x={0} y={0} s={52}>Frankreich</T><T x={0} y={50} s={34} c={C.gray} w={700} o={tw(f, fJuli - 4, 10)}>seit Juli 2024</T></g>
        <g opacity={hu} transform={`translate(${HU[0] + 40} ${HU[1] + 120})`}><T x={0} y={0} s={48}>Ungarn</T><T x={0} y={44} s={30} c={C.gray} w={700}>seit 2024</T></g>
        <g opacity={at} transform={`translate(${AT[0] - 300} ${AT[1] + 150})`}><T x={0} y={0} s={48}>Österreich</T><T x={0} y={44} s={30} c={C.gray} w={700}>seit April 2026</T></g>
        <g transform={`translate(${DE[0]} ${DE[1]}) scale(${pop(f, fDe)})`} opacity={de}><circle r={56} fill={C.deep} /><T x={0} y={24} s={70} a="middle" c={C.amber}>?</T></g>
        {/* Koalitionsvertrag */}
        <g opacity={tw(f, fKoa - 6, 14)} transform={`translate(${DE[0] + 280} ${DE[1] - 330}) rotate(${lerp(-6, -2, tw(f, fKoa - 6, 20))})`}>
          <rect x={0} y={0} width={520} height={600} rx={12} fill={C.white} />
          <T x={40} y={70} s={34} c={C.deep}>Koalitionsvertrag</T>
          {Array.from({ length: 9 }).map((_, i) => <rect key={i} x={40} y={110 + i * 46} width={i === 4 ? 0 : 440 - (i % 3) * 60} height={14} rx={7} fill="#C9D3E2" />)}
          <rect x={30} y={280} width={460 * tw(f, fTrans - 6, 16)} height={70} rx={8} fill={C.amber} opacity={0.6} />
          <T x={40} y={312} s={26} c={C.deep}>„mehr Transparenz bei</T><T x={40} y={342} s={26} c={C.deep}>versteckten Preiserhöhungen“</T>
        </g>
        <Stamp f={f} at={fKein + 2} x={DE[0] + 540} y={DE[1] + 360} text="KEIN GESETZ" s={0.8} />
      </g>
    </svg>
  );
};

export const Ch5: React.FC = () => {
  const f = useCurrentFrame();
  const c = camAt(KEYS, f);
  const sfx: Sfx[] = [[fPackung - 10, "paper", 0.5], [fWeniger - 10, "pop", 0.5], [fFra - 8, "whoosh", 0.6], [fSchild - 4, "pop", 0.5], [fUng - 6, "pop", 0.4], [fOes - 6, "pop", 0.4], [fDe, "ding", 0.4], [fKoa - 6, "paper", 0.5], [fKein + 2, "stamp", 0.8]];
  return (
    <ChapterShell ch={5} sfx={sfx} blur={BLUR} overlay={<ChapterLabel f={f} n={5} title="Die Mogelpackung" at={2} dur={22} />}>
      <Layer cam={c} p={0.3} w={WW} h={WH}><Stripes w={WW} h={WH} /></Layer>
      <Layer cam={c} p={1} w={WW} h={WH}><Main f={f} /></Layer>
    </ChapterShell>
  );
};
