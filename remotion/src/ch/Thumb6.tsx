/* Thumbnails Video 6 „Sollen Minijobs abgeschafft werden?“ – Stil T5D (Video 2/5) */
import React from "react";
import { AbsoluteFill } from "remotion";
import { C, FONT } from "../brand";
import { Figure } from "../kit/Figure";

const Frame: React.FC<{ kicker: string; l1: string; l2: string; children: React.ReactNode; glow?: string }> = ({ kicker, l1, l2, children, glow = "#FFB547" }) => (
  <AbsoluteFill>
    <AbsoluteFill style={{ background: "linear-gradient(180deg,#0B1424 0%,#16243B 100%)" }} />
    <svg width={1280} height={720} style={{ position: "absolute" }}>
      <defs>
        <radialGradient id="glow6" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stopColor={glow} stopOpacity="0.33" /><stop offset="1" stopColor={glow} stopOpacity="0" /></radialGradient>
        <linearGradient id="paper6" x1="0" x2="1"><stop offset="0" stopColor="#FFFFFF" /><stop offset="0.6" stopColor="#E6ECF5" /><stop offset="1" stopColor="#A9B8D2" /></linearGradient>
        <linearGradient id="coin6" x1="0" x2="1"><stop offset="0" stopColor="#FFD27A" /><stop offset="0.5" stopColor="#FFB547" /><stop offset="1" stopColor="#B9822F" /></linearGradient>
        <linearGradient id="bill6" x1="0" x2="1"><stop offset="0" stopColor="#5BEAA8" /><stop offset="1" stopColor="#24995F" /></linearGradient>
      </defs>
      <path d="M0 470 L1280 640 L1280 720 L0 720 Z" fill="#2A3D63" />
      <path d="M0 470 L1280 640" stroke="#86A9FF" strokeWidth={5} />
      <circle cx={880} cy={320} r={300} fill="url(#glow6)" />
      {children}
    </svg>
    <div style={{ position: "absolute", left: 56, top: 56, fontFamily: FONT }}>
      <div style={{ color: C.amber, fontWeight: 800, fontSize: 40, letterSpacing: 4 }}>{kicker}</div>
      <div style={{ color: C.white, fontWeight: 800, fontSize: 132, lineHeight: 0.98, letterSpacing: -3, marginTop: 10, textShadow: "0 8px 24px rgba(0,0,0,.45)" }}>
        {l1}<br />{l2}<span style={{ color: C.amber }}>?</span>
      </div>
    </div>
  </AbsoluteFill>
);

/** A: große Kellnerschürze, Schere schneidet das Band – Lena daneben */
export const T6A: React.FC = () => (
  <Frame kicker="RENTENKOMMISSION" l1="Einfach" l2="weg">
    <g transform="translate(930 400) rotate(10) scale(0.78)">
      <path d="M-170 -150 Q-200 -280 -120 -330" stroke="#EEF2F7" strokeWidth={18} fill="none" />
      <path d="M170 -150 Q200 -280 120 -330" stroke="#EEF2F7" strokeWidth={18} fill="none" opacity={0.5} strokeDasharray="30 18" />
      <path d="M-190 -160 L190 -160 L230 250 Q0 300 -230 250 Z" fill="#1E2B45" />
      <path d="M-190 -160 L190 -160 L200 -60 L-200 -60 Z" fill="#2C3C5C" />
      <rect x={-110} y={10} width={220} height={130} rx={18} fill="#2A3F63" stroke="#86A9FF" strokeWidth={5} />
      <path d="M-30 40 L-30 110 M0 40 L0 110 M30 40 L30 110" stroke="#C9D3E2" strokeWidth={10} strokeLinecap="round" />
      <path d="M-160 -210 L170 -210" stroke="#EEF2F7" strokeWidth={16} />
    </g>
    {/* Schere */}
    <g transform="translate(1110 150) rotate(-30) scale(0.9)">
      <ellipse cx={-70} cy={-40} rx={38} ry={28} fill="none" stroke={C.red} strokeWidth={16} />
      <ellipse cx={-70} cy={40} rx={38} ry={28} fill="none" stroke={C.red} strokeWidth={16} />
      <path d="M-40 -28 L120 20 L-40 6 Z" fill="url(#paper6)" />
      <path d="M-40 28 L120 -20 L-40 -6 Z" fill="#C9D3E2" />
      <circle cx={-20} cy={0} r={9} fill="#5A6B88" />
    </g>
    <Figure f={30} x={560} y={440} s={0.62} shirt="#EEF2F7" sleeve="#DDE4EE" hair="#5B3A29" hairStyle={1} shockAt={0} look={6} />
  </Frame>
);

/** B: dicker Geldstapel mit leerem Siegel – Wirt Toni kratzt sich */
export const T6B: React.FC = () => (
  <Frame kicker="2027" l1="633 €" l2="und dann" glow="#3DDC97">
    <g transform="translate(1010 500) rotate(-12) scale(0.78)">
      {Array.from({ length: 9 }).map((_, i) => (
        <g key={i} transform={`translate(${(i % 2) * 10 - 5} ${-i * 34})`}>
          <rect x={-210} y={-30} width={420} height={60} rx={10} fill="#1C6B45" transform="translate(6 8)" />
          <rect x={-210} y={-30} width={420} height={60} rx={10} fill="url(#bill6)" />
          <rect x={-180} y={-16} width={360} height={32} rx={8} fill="#0A111D" opacity={0.12} />
          <circle cx={0} cy={0} r={18} fill="#0A111D" opacity={0.15} />
        </g>
      ))}
      <g transform="translate(150 -300) rotate(18)">
        <circle r={86} fill="none" stroke={C.red} strokeWidth={14} strokeDasharray="20 10" />
        <circle r={62} fill="none" stroke={C.red} strokeWidth={6} />
      </g>
    </g>
    <Figure f={60} x={560} y={440} s={0.62} shirt="#22304A" sleeve="#2C3C5C" hair="#2B2140" hairStyle={2} look={6} reach={[0, 1, 100, 101]} />
  </Frame>
);

/** C: Münzturm auf Rentenbescheid – Sandra mit großer Lupe */
export const T6C: React.FC = () => (
  <Frame kicker="12 JAHRE" l1="71 €" l2="Rente">
    <g transform="translate(900 360) rotate(-14)">
      <rect x={-230} y={-150} width={460} height={330} rx={16} fill="#0A111D" opacity={0.35} transform="translate(12 16)" />
      <rect x={-230} y={-150} width={460} height={330} rx={16} fill="url(#paper6)" />
      <text x={-190} y={-90} fontFamily={FONT} fontWeight={800} fontSize={34} fill="#0A111D">RENTENBESCHEID</text>
      {[-50, -10, 30, 70, 110].map((y, i) => <rect key={i} x={-190} y={y} width={i === 4 ? 200 : 380} height={14} rx={7} fill="#0A111D" opacity={0.2} />)}
    </g>
    {/* kleiner Münzturm */}
    <g transform="translate(990 400)">
      {Array.from({ length: 5 }).map((_, i) => (
        <g key={i} transform={`translate(0 ${-i * 22})`}>
          <ellipse cx={0} cy={14} rx={64} ry={20} fill="#B9822F" />
          <rect x={-64} y={0} width={128} height={14} fill="#B9822F" />
          <ellipse cx={0} cy={0} rx={64} ry={20} fill="url(#coin6)" />
        </g>
      ))}
    </g>
    {/* Lupe */}
    <g transform="translate(1110 210) rotate(35)">
      <circle r={110} fill="#FFFFFF" opacity={0.14} />
      <circle r={110} fill="none" stroke="#EEF2F7" strokeWidth={22} />
      <rect x={-20} y={118} width={40} height={150} rx={14} fill="#5B3A29" />
    </g>
    <Figure f={20} x={560} y={440} s={0.62} shirt="#FFB547" sleeve="#E89E33" hair="#5B3A29" hairStyle={1} shockAt={0} look={6} />
  </Frame>
);
