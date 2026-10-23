import React from "react";
import { useCurrentFrame } from "remotion";
import T from "../data/v5ch6.json";
import { Timing } from "../kit/core";
import { Sfx } from "../kit/Chapter";
import { C, FONT, Pop, Scenes, SceneDef, StampT, Tx, V5Shell, interpolate, CL, OUT, lerp, mkA, mkPS, pop, tw } from "./kit5";

const TM = T as Timing;
export const V5CH6_DUR = Math.ceil(TM.total * 30);
const A = mkA(TM), PS = mkPS(TM);
const fOft = A(0, "oft"), fPlatz = A(0, "platz"), fSelbst = A(0, "selbst"), fViele = A(0, "viele");
const fEinheit = A(1, "einheitlich"), fMittel = A(1, "mittelfeld"), fNorw = A(1, "norwegen");
const fDeut = A(2, "deutschland"), fSechs = A(2, "sechs"), fSchwed = A(2, "schweden"), fKaren = A(2, "karenztag"), fDebatte = A(2, "debatte");

export const Flag: React.FC<{ k: string; w?: number; h?: number }> = ({ k, w = 120, h = 80 }) => {
  const id = `fl${k}${w}`;
  return (
    <g>
      <clipPath id={id}><rect x={-w / 2} y={-h / 2} width={w} height={h} rx={8} /></clipPath>
      <g clipPath={`url(#${id})`}>
        {k === "DE" && ["#1A1A1A", "#D7303A", "#F2C230"].map((c, i) => <rect key={i} x={-w / 2} y={-h / 2 + (i * h) / 3} width={w} height={h / 3 + 1} fill={c} />)}
        {k === "BE" && ["#1A1A1A", "#F2C230", "#D7303A"].map((c, i) => <rect key={i} x={-w / 2 + (i * w) / 3} y={-h / 2} width={w / 3 + 1} height={h} fill={c} />)}
        {k === "LU" && ["#E2464B", "#F3F5F8", "#3DA9E0"].map((c, i) => <rect key={i} x={-w / 2} y={-h / 2 + (i * h) / 3} width={w} height={h / 3 + 1} fill={c} />)}
        {k === "NO" && <g><rect x={-w / 2} y={-h / 2} width={w} height={h} fill="#C8323C" /><rect x={-w / 2} y={-h * 0.12} width={w} height={h * 0.24} fill="#FFF" /><rect x={-w * 0.22} y={-h / 2} width={h * 0.24} height={h} fill="#FFF" /><rect x={-w / 2} y={-h * 0.06} width={w} height={h * 0.12} fill="#22408A" /><rect x={-w * 0.19} y={-h / 2} width={h * 0.12} height={h} fill="#22408A" /></g>}
        {k === "SE" && <g><rect x={-w / 2} y={-h / 2} width={w} height={h} fill="#1F5FA8" /><rect x={-w / 2} y={-h * 0.1} width={w} height={h * 0.2} fill="#F2C230" /><rect x={-w * 0.2} y={-h / 2} width={h * 0.2} height={h} fill="#F2C230" /></g>}
      </g>
    </g>
  );
};

const S: SceneDef[] = [
  {
    a: 0, b: PS(1) - 8, render: (f) => {
      const up = interpolate(f, [fPlatz - 10, fPlatz + 10], [0, 1], { ...CL, easing: OUT });
      return (
        <g>
          <Tx x={960} y={180} s={46} c={C.gray} w={700} o={tw(f, fOft, 12)}>Bezahlte Krankheitstage pro Kopf (OECD, 2022)</Tx>
          {/* Treppchen */}
          <rect x={560} y={680} width={260} height={220} fill="#2A3F63" /><rect x={830} y={560} width={260} height={340} fill="#3A5A9A" /><rect x={1100} y={740} width={260} height={160} fill="#2A3F63" />
          <Tx x={690} y={790} s={80} c="#9AA8BF">2</Tx><Tx x={960} y={670} s={90} c={C.amber}>1</Tx><Tx x={1230} y={830} s={70} c="#9AA8BF">3</Tx>
          <g transform={`translate(960 ${lerp(300, 470, up)})`} opacity={up}><Flag k="DE" w={180} h={120} /></g>
          <Pop f={f} at={fPlatz + 6} x={960} y={330}><Tx x={0} y={0} s={90} c={C.red}>24,9 Tage</Tx></Pop>
          <StampT f={f} at={fSelbst + 6} x={1450} y={420} text="KAUM VERGLEICHBAR" s={0.8} rot={-10} col={C.amber} />
          <g opacity={tw(f, fViele - 4, 12)}><Tx x={960} y={990} s={40} c={C.gray} w={700}>Viele Länder zählen kurze Krankheiten gar nicht.</Tx></g>
        </g>
      );
    },
  },
  {
    a: PS(1) - 6, b: PS(2) - 8, kind: "slide", render: (f) => {
      const rows: [string, string, number, string][] = [["NO", "Norwegen", 10.7, "#86A9FF"], ["DE", "Deutschland", 6.8, C.red], ["BE", "Belgien", 6.7, "#86A9FF"], ["SE", "Schweden", 6.6, "#86A9FF"], ["LU", "Luxemburg", 3.2, "#86A9FF"]];
      return (
        <g>
          <Tx x={960} y={170} s={46} c={C.gray} w={700} o={tw(f, fEinheit - 6, 12)}>Verlorene Arbeitszeit durch Krankheit (OECD, Befragung)</Tx>
          {rows.map(([k, n, v, c], i) => {
            const g = interpolate(f, [fEinheit + i * 6, fEinheit + 30 + i * 6], [0, 1], { ...CL, easing: OUT });
            const y = 290 + i * 135;
            const hi = k === "DE" ? tw(f, fMittel - 4, 10) : 0;
            return (
              <g key={k} opacity={tw(f, fEinheit + i * 6 - 4, 8)}>
                <rect x={240} y={y - 52} width={1440} height={104} rx={22} fill={C.amber} opacity={0.12 * hi} />
                <g transform={`translate(330 ${y})`}><Flag k={k} w={96} h={64} /></g>
                <Tx x={400} y={y + 14} s={42} a="start" c={k === "DE" ? C.white : C.gray}>{n}</Tx>
                <rect x={720} y={y - 30} width={v * 80 * g} height={60} rx={14} fill={c} />
                <Tx x={740 + v * 80 * g} y={y + 16} s={44} a="start">{(v * g).toFixed(1).replace(".", ",")} %</Tx>
              </g>
            );
          })}
        </g>
      );
    },
  },
  {
    a: PS(2) - 6, b: V5CH6_DUR + 20, kind: "zoom", render: (f) => {
      const Slip: React.FC<{ x: number; at: number; k: string; name: string; cells: [string, string][] }> = ({ x, at, k, name, cells }) => (
        <g transform={`translate(${x} 260)`} opacity={tw(f, at - 4, 12)}>
          <rect x={-360} y={0} width={720} height={560} rx={30} fill="#EEF2F7" />
          <g transform="translate(-270 70)"><Flag k={k} w={110} h={72} /></g>
          <text x={-190} y={86} fontFamily={FONT} fontWeight={800} fontSize={48} fill="#0A111D">{name}</text>
          {cells.map(([d, v], i) => (
            <g key={i} transform={`translate(-300 ${170 + i * 120})`} opacity={tw(f, at + 6 + i * 8, 10)}>
              <text x={0} y={50} fontFamily={FONT} fontWeight={700} fontSize={40} fill="#3A4560">{d}</text>
              <rect x={300} y={0} width={300} height={74} rx={16} fill={v.startsWith("0") ? C.red : C.green} />
              <text x={450} y={52} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={44} fill="#0A111D">{v}</text>
            </g>
          ))}
        </g>
      );
      return (
        <g>
          <Slip x={540} at={fDeut} k="DE" name="Deutschland" cells={[["Tag 1", "100 %"], ["bis 6 Wochen", "100 %"]]} />
          <Slip x={1380} at={fSchwed} k="SE" name="Schweden" cells={[["Tag 1", "0 % möglich"], ["danach", "80 %"]]} />
          <Pop f={f} at={fKaren} x={960} y={930}><rect x={-360} y={-56} width={720} height={110} rx={55} fill={C.amber} /><text y={18} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={48} fill={C.deep}>Karenztag auch bei uns?</text></Pop>
        </g>
      );
    },
  },
];

export const V5Ch6: React.FC = () => {
  const f = useCurrentFrame();
  const sfx: Sfx[] = [
    [fPlatz, "ding", 0.5], [fSelbst + 6, "stamp", 0.7],
    [PS(1) - 10, "whoosh", 0.7], [fEinheit, "soft", 0.5], [fMittel - 4, "soft", 0.5],
    [PS(2) - 10, "whoosh", 0.7], [fDeut, "paper", 0.5], [fSchwed, "paper", 0.5], [fKaren, "soft", 0.6],
  ];
  return <V5Shell n={6} title="Europameister im Kranksein?" total={TM.total} sfx={sfx}><Scenes f={f} list={S} /></V5Shell>;
};
