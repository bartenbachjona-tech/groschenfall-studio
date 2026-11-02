/* Thumbnails Video 7 „Minijob 2027“ – Stil T5D (Video 2/5): T7D (Haupt) und T6Bn (T6B-neu). T6A bleibt aus Thumb6. */
import React from "react";
import { AbsoluteFill } from "remotion";
import { C, FONT } from "../brand";
import { Lena, Toni, Tray } from "../v7/kit7";

const Frame: React.FC<{ kicker: string; l1: string; l2: string; children: React.ReactNode; glow?: string; size?: number }> = ({ kicker, l1, l2, children, glow = "#FFB547", size = 132 }) => (
  <AbsoluteFill>
    <AbsoluteFill style={{ background: "linear-gradient(180deg,#0B1424 0%,#16243B 100%)" }} />
    <svg width={1280} height={720} style={{ position: "absolute" }}>
      <defs>
        <radialGradient id="glow7" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stopColor={glow} stopOpacity="0.33" /><stop offset="1" stopColor={glow} stopOpacity="0" /></radialGradient>
        <linearGradient id="coin7" x1="0" x2="1"><stop offset="0" stopColor="#FFD27A" /><stop offset="0.5" stopColor="#FFB547" /><stop offset="1" stopColor="#B9822F" /></linearGradient>
        <linearGradient id="side7" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#C98A2E" /><stop offset="1" stopColor="#7A5218" /></linearGradient>
        <linearGradient id="bill7" x1="0" x2="1"><stop offset="0" stopColor="#5BEAA8" /><stop offset="1" stopColor="#24995F" /></linearGradient>
      </defs>
      <path d="M0 470 L1280 640 L1280 720 L0 720 Z" fill="#2A3D63" />
      <path d="M0 470 L1280 640" stroke="#86A9FF" strokeWidth={5} />
      <circle cx={880} cy={320} r={300} fill="url(#glow7)" />
      {children}
    </svg>
    <div style={{ position: "absolute", left: 56, top: 56, fontFamily: FONT }}>
      <div style={{ color: C.amber, fontWeight: 800, fontSize: 40, letterSpacing: 4 }}>{kicker}</div>
      <div style={{ color: C.white, fontWeight: 800, fontSize: size, lineHeight: 0.98, letterSpacing: -3, marginTop: 10, textShadow: "0 8px 24px rgba(0,0,0,.45)" }}>
        {l1}<br />{l2}<span style={{ color: C.amber }}>?</span>
      </div>
    </div>
  </AbsoluteFill>
);

/** 3D-Schriftzug (Extrusion nach unten rechts) */
const Big3D: React.FC<{ x: number; y: number; text: string; s: number; r?: number }> = ({ x, y, text, s, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r})`}>
    {Array.from({ length: 14 }).map((_, i) => (
      <text key={i} x={14 - i} y={18 - i * 1.3} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={s} fill="url(#side7)">{text}</text>
    ))}
    <text x={0} y={0} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={s} fill="url(#coin7)" stroke="#FFE2A8" strokeWidth={3}>{text}</text>
  </g>
);

/** T7D (Haupt): Lena mit Tablett, großes amber „633 €“ auf der Schräge, Toni mit Rechner – „ABGABEN / Wer zahlt?“ */
export const T7D: React.FC = () => (
  <Frame kicker="ABGABEN" l1="Wer" l2="zahlt">
    <ellipse cx={830} cy={570} rx={300} ry={30} fill="#0A111D" opacity={0.5} />
    <Big3D x={830} y={540} text="633 €" s={200} r={-6} />
    <Lena f={12} x={410} y={470} s={0.5} smileAt={0} look={6} />
    <Tray x={480} y={432} s={0.42} />
    <Toni f={40} x={1195} y={440} s={0.5} flip shockAt={0} />
    {/* Rechner in Tonis Hand */}
    <g transform="translate(1165 560) rotate(-10) scale(0.28)">
      <rect x={-150} y={-210} width={300} height={420} rx={30} fill="#1A2233" stroke="#5A6B88" strokeWidth={8} />
      <rect x={-120} y={-180} width={240} height={110} rx={12} fill="#0E1828" />
      <text x={104} y={-102} textAnchor="end" fontFamily={FONT} fontWeight={800} fontSize={66} fill={C.red}>+57</text>
      {Array.from({ length: 12 }).map((_, i) => <rect key={i} x={-120 + (i % 3) * 84} y={-40 + Math.floor(i / 3) * 62} width={72} height={50} rx={10} fill={i === 11 ? C.amber : "#2A3F63"} />)}
    </g>
  </Frame>
);

/** T6B-neu: Geldstapel, Toni – „DEIN CHEF ZAHLT / +57 € im Monat?“ */
export const T6Bn: React.FC = () => (
  <Frame kicker="DEIN CHEF ZAHLT" l1="+57 €" l2="im Monat" glow="#3DDC97" size={124}>
    <g transform="translate(1010 520) rotate(-12) scale(0.78)">
      {Array.from({ length: 9 }).map((_, i) => (
        <g key={i} transform={`translate(${(i % 2) * 10 - 5} ${-i * 34})`}>
          <rect x={-210} y={-30} width={420} height={60} rx={10} fill="#1C6B45" transform="translate(6 8)" />
          <rect x={-210} y={-30} width={420} height={60} rx={10} fill="url(#bill7)" />
          <rect x={-180} y={-16} width={360} height={32} rx={8} fill="#0A111D" opacity={0.12} />
          <circle cx={0} cy={0} r={18} fill="#0A111D" opacity={0.15} />
        </g>
      ))}
    </g>
    {/* Pfeil nach oben */}
    <g transform="translate(1180 170)">
      <path d="M 0 -70 L 50 0 L 20 0 L 20 70 L -20 70 L -20 0 L -50 0 Z" fill={C.red} />
    </g>
    <Toni f={60} x={640} y={450} s={0.6} look={6} shockAt={0} />
  </Frame>
);
