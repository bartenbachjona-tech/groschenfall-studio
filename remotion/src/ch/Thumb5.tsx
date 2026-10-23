import React from "react";
import { AbsoluteFill } from "remotion";
import { C, FONT } from "../brand";
import { Figure } from "../kit/Figure";

const BG: React.FC = () => (
  <AbsoluteFill style={{ background: "linear-gradient(180deg,#0E1828 0%,#16243B 100%)" }} />
);
const Head: React.FC<{ kicker: string; l1: string; l2: string; q?: boolean }> = ({ kicker, l1, l2, q = true }) => (
  <div style={{ position: "absolute", left: 56, top: 64, fontFamily: FONT }}>
    <div style={{ color: C.amber, fontWeight: 800, fontSize: 40, letterSpacing: 4 }}>{kicker}</div>
    <div style={{ color: C.white, fontWeight: 800, fontSize: 132, lineHeight: 1.0, letterSpacing: -3, marginTop: 8, textShadow: "0 8px 24px rgba(0,0,0,.45)" }}>
      {l1}<br />{l2}{q && <span style={{ color: C.amber }}>?</span>}
    </div>
  </div>
);

/** A: Thermometer schießt wie ein Börsenchart nach oben */
export const T5A: React.FC = () => (
  <AbsoluteFill>
    <BG />
    <svg width={1280} height={720} style={{ position: "absolute" }}>
      <path d="M0 660 L1280 560 L1280 720 L0 720 Z" fill="#22355A" />
      <g transform="translate(930 420) rotate(18) scale(0.72)">
        <rect x={-62} y={-300} width={124} height={560} rx={62} fill="#EEF2F7" />
        <rect x={-50} y={-290} width={34} height={540} rx={17} fill="#FFFFFF" opacity={0.7} />
        <circle cx={0} cy={270} r={100} fill="#EEF2F7" />
        <circle cx={0} cy={270} r={76} fill={C.red} />
        <rect x={-24} y={-250} width={48} height={520} rx={24} fill={C.red} />
        {[-200, -140, -80, -20, 40, 100, 160].map((y, i) => <rect key={i} x={32} y={y} width={i % 2 ? 22 : 34} height={8} rx={4} fill="#9AA8BF" />)}
        {/* Quecksilber schießt oben raus */}
        <path d="M0 -250 L0 -330 L-40 -380 L30 -450 L10 -520" fill="none" stroke={C.red} strokeWidth={46} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M-40 -500 L10 -600 L62 -500 Z" fill={C.red} />
      </g>
      {[[700, 230], [740, 420], [1180, 300]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={14 - i * 3} fill={C.red} opacity={0.6} />)}
    </svg>
    <Head kicker="MERZ SAGT:" l1="Zu oft" l2="krank" />
  </AbsoluteFill>
);

/** B: Telefonhörer mit rotem Verbotsschild */
export const T5B: React.FC = () => (
  <AbsoluteFill>
    <BG />
    <svg width={1280} height={720} style={{ position: "absolute" }}>
      <circle cx={940} cy={390} r={250} fill="#22355A" />
      <g transform="translate(940 390) rotate(-30)">
        <path d="M-130 10 Q0 -130 130 10" fill="none" stroke={C.white} strokeWidth={70} strokeLinecap="round" />
        <rect x={-235} y={20} width={170} height={100} rx={40} fill={C.white} transform="rotate(-38 -150 70)" />
        <rect x={65} y={20} width={170} height={100} rx={40} fill={C.white} transform="rotate(38 150 70)" />
      </g>
      <g transform="translate(940 390)">
        <circle r={260} fill="none" stroke={C.red} strokeWidth={36} />
        <path d="M-184 -184 L184 184" stroke={C.red} strokeWidth={36} strokeLinecap="round" />
      </g>
    </svg>
    <Head kicker="KRANK PER TELEFON" l1="Bald" l2="vorbei" />
  </AbsoluteFill>
);

/** C: Volles Wartezimmer, Schlange bis auf die Straße */
export const T5C: React.FC = () => (
  <AbsoluteFill>
    <BG />
    <svg width={1280} height={720} style={{ position: "absolute" }}>
      <path d="M0 610 L1280 610 L1280 720 L0 720 Z" fill="#22355A" />
      <rect x={1040} y={250} width={240} height={360} fill="#16243B" stroke="#2A3F63" strokeWidth={6} />
      <rect x={1080} y={330} width={150} height={280} fill="#0A111D" />
      <rect x={1060} y={270} width={190} height={46} rx={8} fill={C.green} />
      <text x={1155} y={303} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={30} fill="#0A111D">PRAXIS</text>
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <Figure f={i * 7} x={985 - i * 120} y={400 + (i % 2) * 8} s={0.66} shirt={["#86A9FF", "#3DDC97", "#FFB547", "#C9D3E2", "#FF5A60"][i]} hairStyle={(i % 3) as 0 | 1 | 2} blinkSeed={i} />
          <rect x={985 - i * 120 - 30} y={400 + (i % 2) * 8 + 16} width={60} height={16} rx={8} fill={["#FF5A60", "#FFB547", "#86A9FF", "#FF5A60", "#3DDC97"][i]} />
          <rect x={985 - i * 120 + 6} y={400 + (i % 2) * 8 - 30} width={30} height={5} rx={2} fill="#EEF2F7" />
        </g>
      ))}
      <rect x={1080} y={330} width={150} height={280} fill="#0A111D" opacity={0} />
    </svg>
    <Head kicker="ATTEST AB TAG 1" l1="Alle zum" l2="Arzt" />
  </AbsoluteFill>
);

/** D: im Stil von Video 2 – großes plastisches Thermometer, Schräge, kranke Figur */
import { Merz as MerzFig, Sick as SickO } from "../v5/kit5";
export const T5D: React.FC = () => (
  <AbsoluteFill>
    <AbsoluteFill style={{ background: "linear-gradient(180deg,#0B1424 0%,#16243B 100%)" }} />
    <svg width={1280} height={720} style={{ position: "absolute" }}>
      <defs>
        <linearGradient id="glass" x1="0" x2="1"><stop offset="0" stopColor="#FFFFFF" /><stop offset="0.55" stopColor="#E6ECF5" /><stop offset="1" stopColor="#9FB0CC" /></linearGradient>
        <radialGradient id="bulb" cx="0.35" cy="0.35" r="0.75"><stop offset="0" stopColor="#FF8A8F" /><stop offset="1" stopColor="#C8323C" /></radialGradient>
        <linearGradient id="merc" x1="0" x2="1"><stop offset="0" stopColor="#FF7A80" /><stop offset="1" stopColor="#C8323C" /></linearGradient>
        <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stopColor="#FF5A60" stopOpacity="0.35" /><stop offset="1" stopColor="#FF5A60" stopOpacity="0" /></radialGradient>
      </defs>
      {/* Schräge wie bei Video 2 */}
      <path d="M0 470 L1280 640 L1280 720 L0 720 Z" fill="#2A3D63" />
      <path d="M0 470 L1280 640" stroke="#86A9FF" strokeWidth={5} />
      <circle cx={870} cy={300} r={300} fill="url(#glow)" />
      {/* Riesen-Thermometer */}
      <g transform="translate(880 330) rotate(24)">
        <rect x={-74} y={-330} width={148} height={560} rx={74} fill="url(#glass)" />
        <circle cx={0} cy={250} r={118} fill="url(#glass)" />
        <circle cx={0} cy={250} r={92} fill="url(#bulb)" />
        <rect x={-30} y={-300} width={60} height={560} rx={30} fill="url(#merc)" />
        <rect x={-58} y={-310} width={22} height={520} rx={11} fill="#FFFFFF" opacity={0.55} />
        {[-240, -180, -120, -60, 0, 60, 120].map((y, i) => <rect key={i} x={40} y={y} width={i % 2 ? 22 : 36} height={9} rx={4} fill="#7C8BA6" />)}
        <circle cx={-34} cy={215} r={22} fill="#FFFFFF" opacity={0.5} />
      </g>
      {/* Hitzestriche */}
      {[[700, 120, -30], [1110, 160, 30], [1150, 260, 40]].map(([x, y, r], i) => <rect key={i} x={x} y={y} width={70} height={10} rx={5} fill="#FF8A8F" opacity={0.7} transform={`rotate(${r} ${x} ${y})`} />)}
      {/* kranke Figur, zusammengesunken mit Decke */}
      <g transform="translate(1110 470)">
        <ellipse cx={0} cy={150} rx={120} ry={18} fill="#0A111D" opacity={0.5} />
      </g>
      <Figure f={8} x={1110} y={420} s={0.6} shirt="#86A9FF" look={-6} shockAt={0} />
      <SickO x={1110} y={420} s={0.6} />
      <path d="M1040 520 Q1110 470 1180 520 L1190 620 L1030 620 Z" fill="#3A5A9A" />
      {/* Merz zeigt (stilisiert) */}
      <MerzFig f={30} x={420} y={520} s={0.55} pointAt={0} angryAt={0} flip />
    </svg>
    <div style={{ position: "absolute", left: 56, top: 56, fontFamily: FONT }}>
      <div style={{ color: C.amber, fontWeight: 800, fontSize: 40, letterSpacing: 4 }}>MERZ SAGT:</div>
      <div style={{ color: C.white, fontWeight: 800, fontSize: 124, lineHeight: 0.98, letterSpacing: -3, marginTop: 10, textShadow: "0 8px 24px rgba(0,0,0,.45)" }}>
        Du bist zu<br />oft krank<span style={{ color: C.amber }}>?</span>
      </div>
    </div>
  </AbsoluteFill>
);
