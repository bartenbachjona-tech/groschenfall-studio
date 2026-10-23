import React from "react";
import { useCurrentFrame } from "remotion";
import T from "../data/v5ch5.json";
import { Timing } from "../kit/core";
import { Sfx } from "../kit/Chapter";
import { Bed, C, Check, Doc, FONT, Figure, Mag, Phone, Pop, Quote, Ring, Scenes, SceneDef, Sick, Slip, Tx, V5Shell, interpolate, CL, OUT, IO, lerp, mkA, mkPS, pop, tw } from "./kit5";

const TM = T as Timing;
export const V5CH5_DUR = Math.ceil(TM.total * 30);
const A = mkA(TM), PS = mkPS(TM);
const fCorona = A(0, "corona"), fEnde = A(0, "ende"), fKennt = A(0, "kennt"), fSympt = A(0, "symptome"), fFuenf = A(0, "fünf");
const f7000 = A(1, "siebentausend"), f36 = A(1, "sechsunddreißig"), fMeist = A(1, "meisten"), f86 = A(1, "sechsundachtzig");
const fHinw = A(2, "hinweise"), fNicht = A(2, "nicht"), fStorm = A(2, "storm");
const fHaus = A(3, "hausärzte"), fKata = A(3, "katastrophal"), fSchnupf = A(3, "schnupfen"), fBuero = A(3, "bürokratiewelle"), fWarte = A(3, "wartezeiten"), fSchwer = A(3, "schwer");

const Rule: React.FC<{ f: number; at: number; y: number; text: string }> = ({ f, at, y, text }) => (
  <g transform={`translate(1080 ${y})`} opacity={tw(f, at - 2, 10)}>
    <rect x={0} y={-50} width={720} height={92} rx={20} fill={C.deep} />
    <g transform="translate(52 -4)"><Check p={pop(f, at, 12)} r={28} /></g>
    <text x={104} y={10} fontFamily={FONT} fontWeight={700} fontSize={38} fill={C.white}>{text}</text>
  </g>
);

const S: SceneDef[] = [
  {
    a: 0, b: PS(1) - 8, render: (f) => (
      <g>
        <g transform="translate(-180 0)">
          <Figure f={f} x={760} y={520} s={0.9} shirt="#86A9FF" look={4} reach={[10, 30, 400, 430]} />
          <Sick x={760} y={520} s={0.9} />
          <Bed x={820} y={760} s={0.95} />
          <Phone x={900} y={590} s={0.8} r={-15} ring={f > 10 && f < 80 ? f : 0} />
        </g>
        <Pop f={f} at={fCorona} x={1440} y={200}><rect x={-300} y={-46} width={600} height={86} rx={43} fill="#3A5A9A" /><text y={14} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={36} fill={C.white}>eingeführt in der Corona-Zeit</text></Pop>
        <Pop f={f} at={fEnde} x={1440} y={310}><rect x={-300} y={-46} width={600} height={86} rx={43} fill={C.green} /><text y={14} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={36} fill={C.deep}>seit Ende 2023 dauerhaft</text></Pop>
        <Rule f={f} at={fKennt} y={500} text="Praxis kennt dich" />
        <Rule f={f} at={fSympt} y={620} text="keine schweren Symptome" />
        <Rule f={f} at={fFuenf} y={740} text="höchstens 5 Tage" />
      </g>
    ),
  },
  {
    a: PS(1) - 6, b: PS(2) - 8, kind: "slide", render: (f) => (
      <g>
        <Pop f={f} at={f7000 - 4} x={960} y={190}><rect x={-420} y={-50} width={840} height={96} rx={48} fill={C.deep} /><text y={16} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={40} fill={C.white}>DAK-Umfrage · über 7.000 Beschäftigte</text></Pop>
        <Ring f={f} at={f36} x={440} y={540} r={150} v={0.36} col="#86A9FF" val="36 %" label={["schon telefonisch", "krankgeschrieben"]} />
        <Ring f={f} at={fMeist} x={960} y={540} r={150} v={0.72} col={C.amber} val="72 %" label={["davon: kein Arzt-", "besuch möglich"]} />
        <Ring f={f} at={f86} x={1480} y={540} r={150} v={0.86} col={C.green} val="86 %" label={["davon: niemanden", "anstecken"]} />
      </g>
    ),
  },
  {
    a: PS(2) - 6, b: PS(3) - 8, kind: "zoom", render: (f) => {
      const sx = interpolate(f, [PS(2), fNicht + 10], [520, 1040], { ...CL, easing: IO });
      return (
        <g>
          {Array.from({ length: 9 }).map((_, i) => <g key={i} transform={`translate(${520 + (i % 3) * 260} ${360 + Math.floor(i / 3) * 170}) rotate(${(i % 2 ? 4 : -5)})`}><Slip s={0.75} label="AU" /></g>)}
          <g transform={`translate(${sx} ${430 + Math.sin(f / 10) * 60})`}><Mag x={0} y={0} s={1.3} /></g>
          <Pop f={f} at={fNicht} x={780} y={210}><rect x={-520} y={-56} width={1040} height={110} rx={55} fill={C.deep} /><g transform="translate(-460 0)"><Check p={1} r={34} /></g><text x={30} y={16} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={42} fill={C.white}>keine Hinweise auf Missbrauch</text></Pop>
          <Quote f={f} at={fStorm} x={1060} y={560} w={800} lines={["Blaumachen hat nicht das", "Ausmaß, den Krankenstand", "signifikant nach oben", "zu treiben."]} who="Andreas Storm, DAK-Chef" col={C.green} />
        </g>
      );
    },
  },
  {
    a: PS(3) - 6, b: V5CH5_DUR + 20, kind: "slide", render: (f) => {
      const pile = interpolate(f, [fBuero - 10, fBuero + 40], [0, 1], { ...CL, easing: OUT });
      return (
        <g>
          <Doc f={f} x={460} y={420} s={0.95} shockAt={fBuero + 10} />
          <rect x={250} y={720} width={600} height={40} rx={12} fill="#7A4E36" />
          {Array.from({ length: Math.round(pile * 14) }).map((_, i) => <rect key={i} x={560 + (i % 2) * 14} y={700 - i * 26} width={220} height={22} rx={4} fill={i % 2 ? "#FFD84D" : "#EEF2F7"} />)}
          {[0, 1, 2, 3, 4].map((i) => {
            const t = interpolate(f, [fSchnupf - 10 + i * 6, fSchnupf + 30 + i * 6], [0, 1], { ...CL, easing: OUT });
            const x = lerp(2100, 1050 + i * 170, t);
            return <g key={i}><Figure f={f + i * 9} x={x} y={500} s={0.6} shirt={["#86A9FF", "#3DDC97", "#FFB547", "#C9D3E2", "#FF5A60"][i]} blinkSeed={i} /><Sick x={x} y={500} s={0.6} /></g>;
          })}
          <Quote f={f} at={fKata - 6} x={900} y={150} w={620} lines={["absolut", "katastrophal"]} who="Hausärzteverband" col={C.red} />
          <Pop f={f} at={fWarte} x={1720} y={260}>
            <circle r={80} fill="#EEF2F7" /><line x1={0} y1={0} x2={0} y2={-50} stroke="#0A111D" strokeWidth={10} strokeLinecap="round" transform={`rotate(${(f - fWarte) * 12})`} /><line x1={0} y1={0} x2={34} y2={0} stroke="#0A111D" strokeWidth={10} strokeLinecap="round" />
          </Pop>
        </g>
      );
    },
  },
];

export const V5Ch5: React.FC = () => {
  const f = useCurrentFrame();
  const sfx: Sfx[] = [
    [10, "marimba", 0.5], [fCorona, "soft", 0.5], [fEnde, "soft", 0.5], [fKennt, "soft", 0.4], [fSympt, "soft", 0.4], [fFuenf, "soft", 0.4],
    [PS(1) - 10, "whoosh", 0.7], [f36, "soft", 0.5], [fMeist, "soft", 0.5], [f86, "soft", 0.5],
    [PS(2) - 10, "whoosh", 0.7], [fNicht, "ding", 0.5], [fStorm, "paper", 0.5],
    [PS(3) - 10, "whoosh", 0.7], [fKata - 6, "paper", 0.5], [fBuero - 6, "paper", 0.6], [fWarte, "soft", 0.5],
  ];
  return <V5Shell n={5} title="Blaumachen per Telefon?" total={TM.total} sfx={sfx}><Scenes f={f} list={S} /></V5Shell>;
};
