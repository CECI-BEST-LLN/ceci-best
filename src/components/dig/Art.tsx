// Flat, low-key SVG art for the board page "dig".
// Underground pieces are line art using currentColor, so their colour/opacity is set in CSS.
import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement>
const line = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round' } as const

/* ------------------------------------------------------------------ Sky */

export const Sun = (p: P) => (
  <svg viewBox="0 0 200 200" aria-hidden="true" {...p}>
    <circle cx="100" cy="100" r="96" fill="#fff" opacity="0.18" />
    <circle cx="100" cy="100" r="70" fill="#fff" opacity="0.22" />
    <circle cx="100" cy="100" r="44" fill="#ffe08a" />
  </svg>
)

export const Cloud = (p: P) => (
  <svg viewBox="0 0 240 80" aria-hidden="true" {...p}>
    <path d="M20 70 Q8 70 8 58 Q8 44 26 44 Q30 22 56 22 Q72 4 100 12 Q120 0 142 16 Q170 10 180 34 Q204 30 214 48 Q232 50 232 62 Q232 70 220 70 Z" fill="#fff" />
  </svg>
)

/** Clean two-tone grass edge, stretched to full width. */
export const GrassEdge = (p: P) => (
  <svg viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true" {...p}>
    <path d="M0 52 C240 20 420 70 720 44 C1000 20 1200 64 1440 40 V120 H0 Z" fill="#6cbf4a" />
    <path d="M0 74 C300 52 520 90 820 70 C1080 52 1260 86 1440 66 V120 H0 Z" fill="#5aa843" />
  </svg>
)

/* ---------------------------------------------------------- Underground */

export const Pebble = (p: P) => (
  <svg viewBox="0 0 30 18" aria-hidden="true" {...p}>
    <ellipse cx="15" cy="9" rx="14" ry="8" fill="currentColor" />
  </svg>
)

export const Bone = (p: P) => (
  <svg viewBox="0 0 80 30" aria-hidden="true" {...p}>
    <path d="M18 11 H62 M18 19 H62" {...line} strokeWidth="2.5" />
    <path d="M18 11 a6 6 0 1 0 -6 4 a6 6 0 1 0 6 4 M62 11 a6 6 0 1 1 6 4 a6 6 0 1 1 -6 4" {...line} strokeWidth="2.5" />
  </svg>
)

export const Skull = (p: P) => (
  <svg viewBox="0 0 60 60" aria-hidden="true" {...p}>
    <path d="M30 6 C15 6 8 17 8 28 C8 37 13 41 17 43 V53 H43 V43 C47 41 52 37 52 28 C52 17 45 6 30 6 Z" {...line} strokeWidth="2.5" />
    <circle cx="21" cy="28" r="6" {...line} strokeWidth="2.5" />
    <circle cx="39" cy="28" r="6" {...line} strokeWidth="2.5" />
    <path d="M30 35 l-3 6 h6 z M23 53 v-6 M30 53 v-6 M37 53 v-6" {...line} strokeWidth="2" />
  </svg>
)

export const Ammonite = (p: P) => (
  <svg viewBox="0 0 80 80" aria-hidden="true" {...p}>
    <circle cx="40" cy="40" r="34" {...line} strokeWidth="2.5" />
    <path d="M40 40 m0 -4 a4 4 0 1 1 -4 4 a8 8 0 1 1 8 8 a14 14 0 1 1 -14 -14 a20 20 0 1 1 20 20 a26 26 0 1 1 -26 -26" {...line} strokeWidth="2" />
  </svg>
)

/** T-rex skeleton, line art. */
export const DinoSkeleton = (p: P) => (
  <svg viewBox="0 0 420 220" aria-hidden="true" {...p}>
    <g {...line}>
      <path d="M110 92 Q160 70 220 82 Q300 96 350 120 Q385 138 414 170" strokeWidth="5" />
      {Array.from({ length: 16 }, (_, i) => {
        const t = i / 15
        const x = 120 + t * 280
        const y = 88 + Math.sin(t * Math.PI * 0.9) * -6 + t * t * 70
        return <line key={i} x1={x} y1={y - 10} x2={x + 2} y2={y + 5} strokeWidth="3" />
      })}
      {Array.from({ length: 7 }, (_, i) => (
        <path key={i} d={`M${150 + i * 18} 86 q${-4 + i} 34 ${8 - i} 58`} strokeWidth="3" />
      ))}
      <path d="M250 96 L268 150 L246 196 L272 204 M272 204 l14 -2 M272 204 l12 8" strokeWidth="5" />
      <path d="M140 110 l10 22 l12 -4" strokeWidth="4" />
      <path d="M112 92 Q92 84 78 64" strokeWidth="5" />
      <path d="M8 46 Q14 22 46 18 Q80 14 92 36 Q96 56 84 66 L40 70 Q18 70 8 46 Z M20 62 L84 66 L80 80 Q48 86 24 76 Z" strokeWidth="3" />
      <circle cx="64" cy="36" r="6" strokeWidth="3" />
    </g>
  </svg>
)

export const TriceratopsSkull = (p: P) => (
  <svg viewBox="0 0 200 140" aria-hidden="true" {...p}>
    <g {...line} strokeWidth="3">
      <path d="M70 20 Q120 -6 168 30 Q196 64 176 104 Q150 92 120 96" />
      <path d="M24 82 Q40 50 90 52 Q128 56 124 96 Q110 124 60 118 Q30 112 24 82 Z" />
      <path d="M24 84 L4 98 L28 100" />
      <path d="M78 58 Q60 20 30 8 Q56 34 66 62 M100 60 Q100 26 120 4 Q114 34 112 62" />
      <circle cx="80" cy="80" r="8" />
    </g>
  </svg>
)

/** Wavy line marking a change of rock layer. */
export const StrataLine = (p: P) => (
  <svg viewBox="0 0 1440 24" preserveAspectRatio="none" aria-hidden="true" {...p}>
    <path d="M0 12 C180 2 360 22 540 12 S900 2 1080 12 S1360 20 1440 10" {...line} strokeWidth="2" />
  </svg>
)

/* --------------------------------------------------- Other side of Earth */

export const Mountains = (p: P) => (
  <svg viewBox="0 0 1440 260" preserveAspectRatio="none" aria-hidden="true" {...p}>
    <path d="M0 260 V170 L120 90 L230 160 L360 60 L500 170 L620 100 L760 180 L900 70 L1040 170 L1170 110 L1300 175 L1440 120 V260 Z" fill="#b9cdd8" />
    <path d="M0 260 V210 L160 140 L300 205 L450 130 L610 210 L780 150 L940 215 L1100 145 L1260 210 L1440 160 V260 Z" fill="#94b3c4" />
  </svg>
)

/** Flat temple / pagoda silhouette. */
export const Temple = (p: P) => (
  <svg viewBox="0 0 220 300" aria-hidden="true" {...p}>
    <rect x="108" y="0" width="4" height="34" fill="#7a2e1f" />
    <circle cx="110" cy="10" r="6" fill="#f7a823" />
    {[0, 1, 2].map((i) => {
      const y = 34 + i * 72
      const w = 90 + i * 34
      return (
        <g key={i}>
          <rect x={110 - w / 2 + 10} y={y + 22} width={w - 20} height="50" fill="#b8402e" />
          <rect x={110 - 8} y={y + 34} width="16" height="38" fill="#7a2e1f" />
          <path d={`M${110 - w / 2 - 26} ${y + 26} Q110 ${y - 8} ${110 + w / 2 + 26} ${y + 26} Z`} fill="#062b4d" />
        </g>
      )
    })}
    <rect x="30" y="268" width="160" height="16" fill="#7a2e1f" />
    <rect x="16" y="284" width="188" height="16" fill="#5a2014" />
  </svg>
)

export const Shovel = (p: P) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M14 10 L20 4 M18 2 L22 6" />
    <path d="M13 7 l4 4 l-5 5 q-3 3 -6 2 l-2 -2 q-1 -3 2 -6 z" />
  </svg>
)
