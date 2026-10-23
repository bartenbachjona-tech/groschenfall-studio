import React from "react";
import { useCurrentFrame } from "remotion";
import T from "../data/v5ch7.json";
import { Timing } from "../kit/core";
import { Sfx } from "../kit/Chapter";
import { C, Check, Doc, FONT, Figure, Merz, Phone, Pop, Scenes, SceneDef, Tx, V5Shell, interpolate, CL, OUT, lerp, mkA, mkPS, pop, tw } from "./kit5";

const TM = T as Timing;
export const V5CH7_DUR = Math.ceil(TM.total * 30);
const A = mkA(TM), PS = mkPS(TM);
const fKosten = A(0, "kosten"), fGest = A(0, "gestiegen"), fGenauer = A(0, "genauer"), fBeleg = A(0, "beleg");
const fLoest = A(1, "löst"), fVoller = A(1, "voller");
const fDenkst = A(2, "denkst"), fKomm = A(2, "kommentare");

const Item: React.FC<{ f: number; at: number; y: number; ok: boolean; text: string }> = ({ f, at, y, ok, text }) => (
  <g transform={`translate(1110 ${y})`} opacity={tw(f, at - 2, 10)}>
    <rect x={0} y={-48} width={700} height={92} rx={20} fill={C.deep} />
    <g transform="translate(50 -2)"><Check p={pop(f, at, 12)} ok={ok} r={28} /></g>
    <text x={100} y={12} fontFamily={FONT} fontWeight={700} fontSize={36} fill={C.white}>{text}</text>
  </g>
);

const S: SceneDef[] = [
  {
    a: 0, b: PS(1) - 8, render: (f) => (
      <g>
        <Merz f={f} x={300} y={460} s={0.85} />
        <Figure f={f} x={600} y={470} s={0.85} shirt="#86A9FF" smileAt={10} />
        <Doc f={f} x={880} y={460} s={0.85} />
        <Tx x={590} y={230} s={64} o={tw(f, 4, 12)}>Hat Merz recht?</Tx>
        <Item f={f} at={fKosten} y={360} ok text="Kosten sind real" />
        <Item f={f} at={fGest} y={480} ok text="Krankheitstage gestiegen" />
        <Item f={f} at={fGenauer} y={600} ok={false} text="großer Teil: Zähleffekt" />
        <Item f={f} at={fBeleg} y={720} ok={false} text="Telefon-Missbrauch: kein Beleg" />
      </g>
    ),
  },
  {
    a: PS(1) - 6, b: PS(2) - 8, kind: "zoom", render: (f) => (
      <g>
        <Phone x={960} y={520} s={2.2} />
        <Pop f={f} at={fLoest} x={960} y={250}><Tx x={0} y={0} s={70}>Attest ab Tag 1: die Lösung?</Tx></Pop>
        <Pop f={f} at={fVoller} x={960} y={900}><Tx x={0} y={0} s={60} c={C.amber}>Oder nur vollere Wartezimmer?</Tx></Pop>
      </g>
    ),
  },
  {
    a: PS(2) - 6, b: V5CH7_DUR + 20, kind: "slide", render: (f) => (
      <g>
        <Tx x={960} y={330} s={84} o={tw(f, fDenkst - 4, 12)}>Bist du zu oft krank?</Tx>
        {([["Merz hat recht", C.green, 640], ["Falsche Lösung", C.red, 1280]] as [string, string, number][]).map(([t, c, x], i) => {
          const p = pop(f, fDenkst + 8 + i * 6, 14);
          return (
            <g key={i} transform={`translate(${x} 560) scale(${p})`}>
              <rect x={-270} y={-75} width={540} height={150} rx={36} fill="#0A111D" opacity={0.4} transform="translate(8 10)" />
              <rect x={-270} y={-75} width={540} height={150} rx={36} fill={c} />
              <text y={20} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={54} fill="#0A111D">{t}</text>
            </g>
          );
        })}
        <Tx x={960} y={800} s={56} c={C.amber} o={tw(f, fKomm - 4, 12)}>Schreib's in die Kommentare!</Tx>
      </g>
    ),
  },
];

export const V5Ch7: React.FC = () => {
  const f = useCurrentFrame();
  const sfx: Sfx[] = [
    [fKosten, "soft", 0.4], [fGest, "soft", 0.4], [fGenauer, "soft", 0.4], [fBeleg, "soft", 0.4],
    [PS(1) - 10, "whoosh", 0.7], [fLoest, "soft", 0.5], [fVoller, "soft", 0.5],
    [PS(2) - 10, "whoosh", 0.7], [fDenkst + 8, "soft", 0.5], [fDenkst + 14, "soft", 0.5], [fKomm, "ding", 0.5],
  ];
  return <V5Shell n={7} title="Fazit" total={TM.total} sfx={sfx}><Scenes f={f} list={S} /></V5Shell>;
};
