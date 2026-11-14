// Hand-drawn SVG art for the "dig through the boards" section.
// Every piece is a plain component: size it with width/height or CSS.
import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement>

/* ------------------------------------------------------------------ Sky */

export const Sun = (p: P) => (
  <svg viewBox="0 0 120 120" aria-hidden="true" {...p}>
    <g className="sun-rays" stroke="#ffcf3f" strokeWidth="6" strokeLinecap="round">
      {Array.from({ length: 12 }, (_, i) => (
        <line key={i} x1="60" y1="8" x2="60" y2="20" transform={`rotate(${i * 30} 60 60)`} />
      ))}
    </g>
    <circle cx="60" cy="60" r="30" fill="#ffd54a" />
    <circle cx="60" cy="60" r="30" fill="url(#sunShine)" />
    <defs>
      <radialGradient id="sunShine" cx="0.35" cy="0.35" r="0.7">
        <stop offset="0" stopColor="#fff6c4" />
        <stop offset="1" stopColor="#ffd54a" stopOpacity="0" />
      </radialGradient>
    </defs>
  </svg>
)

export const Cloud = (p: P) => (
  <svg viewBox="0 0 200 90" aria-hidden="true" {...p}>
    <g fill="#fff">
      <ellipse cx="60" cy="58" rx="45" ry="26" />
      <ellipse cx="105" cy="45" rx="42" ry="34" />
      <ellipse cx="150" cy="60" rx="38" ry="24" />
      <rect x="30" y="58" width="150" height="26" rx="13" />
    </g>
    <g fill="#e3eef9">
      <rect x="40" y="72" width="130" height="12" rx="6" />
    </g>
  </svg>
)

export const Bird = (p: P) => (
  <svg viewBox="0 0 40 20" aria-hidden="true" {...p}>
    <path className="bird-wings" d="M2 12 Q11 2 20 11 Q29 2 38 12" fill="none" stroke="#2b3a4a" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
)

/* -------------------------------------------------------------- Surface */

/** Wavy strip of grass, meant to be stretched horizontally. */
export const GrassStrip = (p: P) => (
  <svg viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true" {...p}>
    <path d="M0 60 Q150 30 300 55 T600 50 T900 58 T1200 48 V120 H0 Z" fill="#5aa843" />
    <path d="M0 75 Q200 55 400 72 T800 68 T1200 70 V120 H0 Z" fill="#4c9638" />
    <g fill="#6cc04f">
      {Array.from({ length: 80 }, (_, i) => {
        const x = i * 15 + (i % 3) * 4
        const h = 18 + ((i * 37) % 22)
        return <path key={i} d={`M${x} 64 q3 -${h} 6 -${h + 4} q-1 ${h / 2} 3 ${h + 4} z`} />
      })}
    </g>
  </svg>
)

export const Flower = ({ color = '#f7a823', ...p }: P & { color?: string }) => (
  <svg viewBox="0 0 40 70" aria-hidden="true" {...p}>
    <path d="M20 68 Q18 45 20 28" stroke="#3f8a2e" strokeWidth="3" fill="none" />
    <path d="M20 50 q-12 -4 -14 -14 q10 2 14 14" fill="#4c9638" />
    <g fill={color}>
      {Array.from({ length: 6 }, (_, i) => (
        <ellipse key={i} cx="20" cy="14" rx="5" ry="9" transform={`rotate(${i * 60} 20 22)`} />
      ))}
    </g>
    <circle cx="20" cy="22" r="5" fill="#fff3b0" />
  </svg>
)

export const Tree = (p: P) => (
  <svg viewBox="0 0 160 200" aria-hidden="true" {...p}>
    <path d="M72 200 L76 120 Q70 100 52 92 M78 130 Q92 110 110 104" stroke="#7a4a26" strokeWidth="12" fill="none" strokeLinecap="round" />
    <circle cx="80" cy="70" r="52" fill="#4c9638" />
    <circle cx="45" cy="92" r="34" fill="#5aa843" />
    <circle cx="118" cy="88" r="36" fill="#5aa843" />
    <circle cx="82" cy="44" r="34" fill="#6cc04f" />
    <circle cx="62" cy="62" r="6" fill="#e5484d" />
    <circle cx="104" cy="70" r="6" fill="#e5484d" />
    <circle cx="86" cy="96" r="6" fill="#e5484d" />
  </svg>
)

/** Wooden sign + shovel planted in the ground. */
export const DigSign = (p: P) => (
  <svg viewBox="0 0 220 170" aria-hidden="true" {...p}>
    {/* shovel */}
    <g transform="rotate(14 170 90)">
      <rect x="164" y="6" width="10" height="110" rx="4" fill="#8a5a35" />
      <rect x="152" y="4" width="34" height="10" rx="5" fill="#6e4527" />
      <path d="M150 112 h38 v26 q-19 28 -38 0 z" fill="#9aa7b4" stroke="#6b7785" strokeWidth="3" />
    </g>
    {/* sign */}
    <rect x="58" y="70" width="10" height="100" fill="#7a4a26" />
    <rect x="10" y="30" width="110" height="52" rx="6" fill="#c98b4f" stroke="#7a4a26" strokeWidth="4" />
    <text x="65" y="63" textAnchor="middle" fontFamily="var(--font-heading), sans-serif" fontWeight="700" fontSize="20" fill="#4a2a12">
      DIG HERE
    </text>
  </svg>
)

/* ---------------------------------------------------------- Underground */

export const Pebble = ({ color = '#8d7a6a', ...p }: P & { color?: string }) => (
  <svg viewBox="0 0 30 20" aria-hidden="true" {...p}>
    <ellipse cx="15" cy="11" rx="13" ry="8" fill={color} />
    <ellipse cx="11" cy="8" rx="5" ry="2.5" fill="#fff" opacity="0.18" />
  </svg>
)

export const Root = (p: P) => (
  <svg viewBox="0 0 120 160" aria-hidden="true" {...p}>
    <g stroke="#c9a173" strokeLinecap="round" fill="none" opacity="0.8">
      <path d="M60 0 Q55 40 62 70 Q70 110 50 158" strokeWidth="6" />
      <path d="M60 40 Q30 55 18 90" strokeWidth="4" />
      <path d="M64 80 Q95 95 104 130" strokeWidth="4" />
      <path d="M25 72 Q10 80 6 100" strokeWidth="2.5" />
    </g>
  </svg>
)

export const Worm = (p: P) => (
  <svg viewBox="0 0 90 40" aria-hidden="true" {...p}>
    <path className="worm-body" d="M6 26 Q18 6 30 24 T54 24 T78 18" fill="none" stroke="#f08a8a" strokeWidth="9" strokeLinecap="round" />
    <circle cx="79" cy="16" r="1.8" fill="#3b2020" />
  </svg>
)

export const Bone = ({ color = '#efe6d2', ...p }: P & { color?: string }) => (
  <svg viewBox="0 0 80 30" aria-hidden="true" {...p}>
    <g fill={color} stroke="#c9bb9c" strokeWidth="2">
      <rect x="16" y="11" width="48" height="8" rx="4" />
      <circle cx="12" cy="10" r="7" />
      <circle cx="12" cy="20" r="7" />
      <circle cx="68" cy="10" r="7" />
      <circle cx="68" cy="20" r="7" />
    </g>
  </svg>
)

export const Skull = (p: P) => (
  <svg viewBox="0 0 60 60" aria-hidden="true" {...p}>
    <path d="M30 4 C14 4 6 16 6 28 C6 38 12 42 16 44 V54 H44 V44 C48 42 54 38 54 28 C54 16 46 4 30 4 Z" fill="#efe6d2" stroke="#c9bb9c" strokeWidth="2" />
    <ellipse cx="20" cy="28" rx="7" ry="8" fill="#3b2f2a" />
    <ellipse cx="40" cy="28" rx="7" ry="8" fill="#3b2f2a" />
    <path d="M30 34 l-4 8 h8 z" fill="#3b2f2a" />
    <path d="M22 54 v-6 M30 54 v-6 M38 54 v-6" stroke="#c9bb9c" strokeWidth="2" />
  </svg>
)

export const Ammonite = (p: P) => (
  <svg viewBox="0 0 80 80" aria-hidden="true" {...p}>
    <circle cx="40" cy="40" r="34" fill="#b9a58a" stroke="#8d7a6a" strokeWidth="3" />
    <path
      d="M40 40 m0 -4 a4 4 0 1 1 -4 4 a8 8 0 1 1 8 8 a14 14 0 1 1 -14 -14 a20 20 0 1 1 20 20 a26 26 0 1 1 -26 -26"
      fill="none"
      stroke="#8d7a6a"
      strokeWidth="3"
    />
    {Array.from({ length: 14 }, (_, i) => (
      <line key={i} x1="40" y1="12" x2="40" y2="20" stroke="#8d7a6a" strokeWidth="2" transform={`rotate(${i * 25.7} 40 40)`} />
    ))}
  </svg>
)

/** T-rex skeleton, lying in the rock. */
export const DinoSkeleton = (p: P) => (
  <svg viewBox="0 0 420 220" aria-hidden="true" {...p}>
    <g fill="none" stroke="#efe6d2" strokeLinecap="round" strokeLinejoin="round">
      {/* spine + tail */}
      <path d="M110 92 Q160 70 220 82 Q300 96 350 120 Q385 138 414 170" strokeWidth="9" />
      {/* vertebrae */}
      {Array.from({ length: 16 }, (_, i) => {
        const t = i / 15
        const x = 120 + t * 280
        const y = 88 + Math.sin(t * Math.PI * 0.9) * -6 + t * t * 70
        return <line key={i} x1={x} y1={y - 12} x2={x + 2} y2={y + 6} strokeWidth="5" />
      })}
      {/* ribs */}
      {Array.from({ length: 7 }, (_, i) => (
        <path key={i} d={`M${150 + i * 18} 86 q${-4 + i} 34 ${8 - i} 58`} strokeWidth="5" />
      ))}
      {/* hind leg */}
      <path d="M250 96 L268 150 L246 196 L272 204" strokeWidth="10" />
      <path d="M272 204 l14 -2 M272 204 l12 8" strokeWidth="5" />
      {/* tiny arm */}
      <path d="M140 110 l10 22 l12 -4" strokeWidth="6" />
      {/* neck */}
      <path d="M112 92 Q92 84 78 64" strokeWidth="9" />
    </g>
    {/* skull */}
    <g fill="#efe6d2" stroke="#c9bb9c" strokeWidth="2">
      <path d="M8 46 Q14 22 46 18 Q80 14 92 36 Q96 56 84 66 L40 70 Q18 70 8 46 Z" />
      <path d="M20 62 L84 66 L80 80 Q48 86 24 76 Z" />
    </g>
    <circle cx="64" cy="34" r="7" fill="#3b2f2a" />
    <path d="M24 62 l4 6 l4 -6 l4 6 l4 -6 l4 6 l4 -6 l4 6 l4 -6 l4 6 l4 -6" stroke="#3b2f2a" strokeWidth="2" fill="none" />
  </svg>
)

export const TriceratopsSkull = (p: P) => (
  <svg viewBox="0 0 200 140" aria-hidden="true" {...p}>
    <path d="M70 20 Q120 -6 168 30 Q196 64 176 104 Q150 92 120 96 Z" fill="#e2d6bd" stroke="#c9bb9c" strokeWidth="3" />
    {Array.from({ length: 7 }, (_, i) => (
      <circle key={i} cx={96 + i * 13} cy={20 + Math.abs(3 - i) * 6} r="4" fill="#c9bb9c" />
    ))}
    <path d="M24 82 Q40 50 90 52 Q128 56 124 96 Q110 124 60 118 Q30 112 24 82 Z" fill="#efe6d2" stroke="#c9bb9c" strokeWidth="3" />
    <path d="M24 84 L4 98 L28 100 Z" fill="#efe6d2" stroke="#c9bb9c" strokeWidth="3" />
    <path d="M78 58 Q60 20 30 8 Q56 34 66 62 Z" fill="#efe6d2" stroke="#c9bb9c" strokeWidth="3" />
    <path d="M100 60 Q100 26 120 4 Q114 34 112 62 Z" fill="#efe6d2" stroke="#c9bb9c" strokeWidth="3" />
    <path d="M30 76 Q20 62 26 52" stroke="#c9bb9c" strokeWidth="5" fill="none" strokeLinecap="round" />
    <circle cx="80" cy="80" r="9" fill="#3b2f2a" />
  </svg>
)

export const Crystal = ({ color = '#7fd3ff', ...p }: P & { color?: string }) => (
  <svg viewBox="0 0 60 70" aria-hidden="true" {...p}>
    <path d="M10 68 L16 26 L26 10 L30 40 Z" fill={color} opacity="0.85" />
    <path d="M24 68 L30 14 L40 0 L46 34 L40 68 Z" fill={color} />
    <path d="M30 14 L40 0 L36 40 Z" fill="#fff" opacity="0.35" />
    <path d="M42 68 L48 34 L56 24 L56 68 Z" fill={color} opacity="0.7" />
  </svg>
)

/* ---------------------------------------------------------------- China */

export const Mountains = (p: P) => (
  <svg viewBox="0 0 1200 300" preserveAspectRatio="none" aria-hidden="true" {...p}>
    <path d="M0 300 L0 170 Q80 60 160 150 Q230 30 320 140 Q400 70 470 160 Q560 40 660 150 Q740 80 820 160 Q900 50 990 150 Q1080 90 1200 160 L1200 300 Z" fill="#9db6a8" opacity="0.7" />
    <path d="M0 300 L0 220 Q120 120 240 210 Q360 110 480 220 Q600 130 720 215 Q840 120 960 220 Q1080 140 1200 210 L1200 300 Z" fill="#6f9a7f" />
  </svg>
)

export const GreatWall = (p: P) => (
  <svg viewBox="0 0 1200 160" preserveAspectRatio="none" aria-hidden="true" {...p}>
    <path d="M0 120 Q150 70 300 100 T600 90 T900 105 T1200 80 V160 H0 Z" fill="#4f7d5f" />
    <path d="M0 108 Q150 58 300 88 T600 78 T900 93 T1200 68 V84 Q1050 98 900 109 T600 94 T300 104 T0 124 Z" fill="#c9a87a" />
    {Array.from({ length: 40 }, (_, i) => {
      const x = i * 30 + 6
      const y = 64 + Math.sin(i / 3) * 14 + (i > 20 ? -4 : 0)
      return <rect key={i} x={x} y={y + 18} width="14" height="9" fill="#c9a87a" />
    })}
    <rect x="280" y="62" width="40" height="40" fill="#b8956a" />
    <rect x="276" y="56" width="48" height="8" fill="#8a3b2b" />
    <rect x="880" y="68" width="40" height="40" fill="#b8956a" />
    <rect x="876" y="62" width="48" height="8" fill="#8a3b2b" />
  </svg>
)

export const Pagoda = (p: P) => (
  <svg viewBox="0 0 200 280" aria-hidden="true" {...p}>
    <rect x="98" y="0" width="4" height="30" fill="#7a2e1f" />
    <circle cx="100" cy="8" r="6" fill="#f7c948" />
    {[0, 1, 2, 3].map((i) => {
      const y = 30 + i * 58
      const w = 70 + i * 26
      return (
        <g key={i}>
          <rect x={100 - w / 2 + 8} y={y + 18} width={w - 16} height="40" fill="#b23a2a" />
          <rect x={100 - w / 2 + 16} y={y + 26} width="10" height="24" fill="#f7c948" opacity="0.85" />
          <rect x={100 + w / 2 - 26} y={y + 26} width="10" height="24" fill="#f7c948" opacity="0.85" />
          <path d={`M${100 - w / 2 - 22} ${y + 22} Q100 ${y - 6} ${100 + w / 2 + 22} ${y + 22} L${100 + w / 2} ${y + 16} L${100 - w / 2} ${y + 16} Z`} fill="#2f4f3e" />
          <path d={`M${100 - w / 2 - 22} ${y + 22} q-4 -10 6 -10 M${100 + w / 2 + 22} ${y + 22} q4 -10 -6 -10`} stroke="#2f4f3e" strokeWidth="4" fill="none" />
        </g>
      )
    })}
    <rect x="38" y="262" width="124" height="18" fill="#7a2e1f" />
    <rect x="88" y="236" width="24" height="26" fill="#5a1f14" />
  </svg>
)

export const Lantern = (p: P) => (
  <svg viewBox="0 0 50 90" aria-hidden="true" {...p}>
    <line x1="25" y1="0" x2="25" y2="14" stroke="#5a1f14" strokeWidth="2" />
    <rect x="15" y="12" width="20" height="6" rx="2" fill="#f7c948" />
    <ellipse cx="25" cy="42" rx="20" ry="25" fill="#e23b2e" />
    <path d="M14 22 Q8 42 14 62 M25 17 V67 M36 22 Q42 42 36 62" stroke="#b02a20" strokeWidth="2" fill="none" />
    <ellipse cx="19" cy="34" rx="5" ry="9" fill="#ff8a7a" opacity="0.6" />
    <rect x="15" y="64" width="20" height="6" rx="2" fill="#f7c948" />
    <path d="M20 70 v14 M25 70 v18 M30 70 v14" stroke="#f7c948" strokeWidth="2" />
  </svg>
)

export const Shovel = (p: P) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M14 10 L20 4 M18 2 L22 6" />
    <path d="M13 7 l4 4 l-5 5 q-3 3 -6 2 l-2 -2 q-1 -3 2 -6 z" />
  </svg>
)
