import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { Link } from 'react-router'
import type { Board } from '../../data/boards/index.ts'
import Avatar from '../Avatar.tsx'
import { ArrowRightIcon } from '../Icons.tsx'
import {
  Ammonite, Bird, Bone, Cloud, Crystal, DigSign, DinoSkeleton, Flower, GrassStrip, GreatWall, Lantern,
  Mountains, Pagoda, Pebble, Root, Skull, Sun, Tree, TriceratopsSkull, Worm,
} from './Art.tsx'
import styles from './BoardDig.module.css'

/* --------------------------------------------------------------- helpers */

/** Small deterministic random generator, so decorations don't move between renders. */
function rng(seed: number) {
  let a = seed * 9301 + 49297
  return () => {
    a = (a * 1103515245 + 12345) % 2147483648
    return a / 2147483648
  }
}

// Soil colour by depth (0 = surface, 1 = just before China).
const SOIL: [number, string][] = [
  [0, '#5aa843'],
  [0.07, '#8a5a35'],
  [0.3, '#704729'],
  [0.5, '#5b3a26'],
  [0.7, '#463026'],
  [0.86, '#2f2521'],
  [1, '#5a2414'],
]

function soilAt(t: number) {
  const i = Math.max(1, SOIL.findIndex(([s]) => s >= t))
  const [s0, c0] = SOIL[i - 1]
  const [s1, c1] = SOIL[i]
  const k = s1 === s0 ? 0 : (t - s0) / (s1 - s0)
  const hex = (c: string, o: number) => parseInt(c.slice(1 + o, 3 + o), 16)
  const mix = (o: number) => Math.round(hex(c0, o) + (hex(c1, o) - hex(c0, o)) * k)
  return `rgb(${mix(0)} ${mix(2)} ${mix(4)})`
}

/** Fun, roughly exponential depth — ending at the Earth's diameter. */
function depthLabel(index: number, total: number) {
  if (index >= total - 1) return '12,742 km'
  const meters = Math.round(2 * Math.pow(1.7, index))
  return meters >= 1000 ? `${(meters / 1000).toFixed(1)} km` : `${meters} m`
}

/* ---------------------------------------------------------- decorations */

interface Deco {
  key: string
  node: ReactNode
  style: CSSProperties
}

function decorationsFor(index: number, t: number, cardOnLeft: boolean, dinoAt: Set<number>, trikeAt: number): Deco[] {
  const r = rng(index + 1)
  const out: Deco[] = []
  // x in the half not covered by the card (on mobile everything sits behind the card anyway)
  const freeX = () => (cardOnLeft ? 58 + r() * 36 : 4 + r() * 34)
  const anyX = () => r() * 94
  const y = () => 8 + r() * 80
  const add = (key: string, node: ReactNode, x: number, top: number, w: number, rot = 0, extra: CSSProperties = {}) =>
    out.push({ key: `${key}-${out.length}`, node, style: { left: `${x}%`, top: `${top}%`, width: w, transform: `rotate(${rot}deg)`, ...extra } })

  // Pebbles everywhere
  const pebbles = 3 + Math.floor(r() * 4)
  for (let i = 0; i < pebbles; i++) {
    const shade = t < 0.5 ? '#9a8573' : t < 0.85 ? '#6d6058' : '#4a403c'
    add('pebble', <Pebble color={shade} />, anyX(), y(), 18 + r() * 22, r() * 40 - 20, { opacity: 0.8 })
  }

  if (t < 0.3) {
    add('root', <Root />, freeX(), -4, 70 + r() * 50, r() * 20 - 10)
    if (r() > 0.3) add('worm', <Worm />, freeX(), y(), 60 + r() * 20, r() * 30 - 15, { animationDelay: `${r() * 2}s` })
  }

  if (t > 0.18) {
    const bones = Math.min(7, 1 + Math.floor(t * 7))
    for (let i = 0; i < bones; i++) add('bone', <Bone />, freeX(), y(), 34 + r() * 30, r() * 180)
  }
  if (t > 0.4 && r() > 0.45) add('skull', <Skull />, freeX(), y(), 42 + r() * 16, r() * 30 - 15)
  if (t > 0.35 && r() > 0.4) add('ammonite', <Ammonite />, freeX(), y(), 46 + r() * 26, r() * 360)
  if (t > 0.6) {
    const crystals = 1 + Math.floor(r() * 2)
    for (let i = 0; i < crystals; i++) add('crystal', <Crystal color={r() > 0.5 ? '#7fd3ff' : '#c49bff'} />, freeX(), y(), 30 + r() * 24, r() * 40 - 20)
  }
  if (dinoAt.has(index)) add('dino', <DinoSkeleton />, cardOnLeft ? 52 : 2, 18, 380, r() * 8 - 4, { maxWidth: '46%' })
  if (index === trikeAt) add('trike', <TriceratopsSkull />, freeX() - 6, 30, 190, -8, { maxWidth: '36%' })

  return out
}

/* -------------------------------------------------------------- pieces */

function BoardCard({ board, depth }: { board: Board; depth: string }) {
  return (
    <article className={styles.card}>
      <header className={styles.cardHead}>
        <div>
          <span className={styles.cardYears}>{board.years}</span>
          <h3>{board.title}</h3>
        </div>
        <span className={styles.depthTag}>⛏ {depth}</span>
      </header>
      {board.members.length > 0 ? (
        <ul className={styles.people}>
          {board.members.map((m) => (
            <li key={m.slug} title={m.hasKnownRole ? `${m.name} — ${m.roleLabel}` : m.name}>
              <Avatar name={m.name} photo={m.photo} size={54} />
              <strong>{m.name}</strong>
              {m.hasKnownRole && <small>{m.roleLabel}</small>}
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.unknown}>We haven't dug up the members of this board yet.</p>
      )}
      <Link to={`/board/${board.years}`} className={styles.cardLink}>
        See this board <ArrowRightIcon />
      </Link>
    </article>
  )
}

/* ---------------------------------------------------------------- main */

/** Previous boards, newest at the surface, oldest… in China. */
export default function BoardDig({ boards }: { boards: Board[] }) {
  const [active, setActive] = useState(-1)
  const strataRefs = useRef<(HTMLElement | null)[]>([])

  const underground = useMemo(() => boards.slice(0, -1), [boards])
  const deepest = boards[boards.length - 1]
  const n = underground.length

  const layout = useMemo(() => {
    const dinoAt = new Set([Math.round(n * 0.72), Math.round(n * 0.9)])
    const trikeAt = Math.round(n * 0.8)
    return underground.map((board, i) => {
      const t = n <= 1 ? 0 : i / (n - 1)
      const cardOnLeft = i % 2 === 0
      return {
        board,
        cardOnLeft,
        from: soilAt(t),
        to: soilAt(n <= 1 ? 1 : (i + 1) / (n - 1)),
        decos: decorationsFor(i, t, cardOnLeft, dinoAt, trikeAt),
        depth: depthLabel(i, boards.length),
      }
    })
  }, [underground, n, boards.length])

  // Depth meter: which board is currently in the middle of the screen
  useEffect(() => {
    const els = strataRefs.current.filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index))
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [boards])

  const activeBoard = active >= 0 ? boards[active] : undefined

  return (
    <section className={styles.dig} id="previous-boards" aria-label="Previous boards">
      {/* ------------------------------------------------------------ Sky */}
      <div className={styles.sky}>
        <Sun className={styles.sun} />
        <Cloud className={`${styles.cloud} ${styles.cloud1}`} />
        <Cloud className={`${styles.cloud} ${styles.cloud2}`} />
        <Cloud className={`${styles.cloud} ${styles.cloud3}`} />
        <Bird className={`${styles.bird} ${styles.bird1}`} />
        <Bird className={`${styles.bird} ${styles.bird2}`} />
        <Bird className={`${styles.bird} ${styles.bird3}`} />

        <div className={`container ${styles.skyText}`}>
          <span className={styles.skyEyebrow}>History of BEST Louvain-la-Neuve</span>
          <h2>Previous boards</h2>
          <p>Grab a shovel — the deeper you dig, the older the board. Let's see how far down it goes…</p>
          <span className={styles.scrollHint} aria-hidden="true">
            ↓
          </span>
        </div>

        <div className={styles.surface}>
          <Tree className={styles.tree} />
          <DigSign className={styles.sign} />
          <Flower className={styles.flower} style={{ left: '22%' }} />
          <Flower className={styles.flower} style={{ left: '27%', height: 52 }} color="#e5484d" />
          <Flower className={styles.flower} style={{ left: '64%', height: 58 }} color="#c49bff" />
          <Flower className={styles.flower} style={{ left: '88%' }} color="#fff" />
          <GrassStrip className={styles.grass} />
        </div>
      </div>

      {/* ---------------------------------------------------- Underground */}
      {layout.map(({ board, cardOnLeft, from, to, decos, depth }, i) => (
        <div
          key={board.years}
          ref={(el) => {
            strataRefs.current[i] = el
          }}
          data-index={i}
          className={styles.stratum}
          style={{ background: `linear-gradient(${from}, ${to})` }}
        >
          <div className={styles.texture} aria-hidden="true" />
          {decos.map((d) => (
            <div key={d.key} className={styles.deco} style={d.style}>
              {d.node}
            </div>
          ))}
          <div className={`container ${styles.row} ${cardOnLeft ? styles.left : styles.right}`}>
            <BoardCard board={board} depth={depth} />
          </div>
        </div>
      ))}

      {/* ---------------------------------------------------------- China */}
      {deepest && (
        <div
          className={styles.china}
          ref={(el) => {
            strataRefs.current[n] = el
          }}
          data-index={n}
        >
          <svg className={styles.breakthrough} viewBox="0 0 1200 80" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 0 H1200 V30 L1120 52 L1040 34 L960 60 L880 38 L800 66 L720 40 L640 70 L560 42 L480 64 L400 36 L320 58 L240 34 L160 54 L80 30 L0 48 Z" fill="#5a2414" />
          </svg>
          <Lantern className={`${styles.lantern} ${styles.lantern1}`} />
          <Lantern className={`${styles.lantern} ${styles.lantern2}`} />
          <Lantern className={`${styles.lantern} ${styles.lantern3}`} />
          <Lantern className={`${styles.lantern} ${styles.lantern4}`} />

          <div className={`container ${styles.chinaText}`}>
            <span className={styles.skyEyebrow}>Depth: 12,742 km</span>
            <h2>Wait… is this China?!</h2>
            <p>You dug so deep you went straight through the Earth. Here lies the oldest board we know of.</p>
          </div>

          <div className={`container ${styles.row} ${styles.center}`}>
            <BoardCard board={deepest} depth="12,742 km" />
          </div>

          <div className={styles.chinaLand} aria-hidden="true">
            <Mountains className={styles.mountains} />
            <Pagoda className={styles.pagoda} />
            <GreatWall className={styles.wall} />
          </div>

          <div className={styles.backUp}>
            <button type="button" className="btn btn--accent" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              Climb back up ↑
            </button>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------- Depth meter */}
      <div className={`${styles.meter} ${activeBoard ? styles.meterOn : ''}`} aria-hidden="true">
        <span className={styles.meterLabel}>Depth</span>
        <strong>{activeBoard ? depthLabel(active, boards.length) : '0 m'}</strong>
        <span className={styles.meterYears}>{activeBoard?.years}</span>
        <div className={styles.meterBar}>
          <div style={{ height: `${boards.length > 1 ? (Math.max(active, 0) / (boards.length - 1)) * 100 : 0}%` }} />
        </div>
      </div>
    </section>
  )
}
