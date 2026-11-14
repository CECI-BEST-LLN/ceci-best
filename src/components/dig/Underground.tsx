import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { Link } from 'react-router'
import type { Board } from '../../data/boards/index.ts'
import MemberGrid from '../MemberGrid.tsx'
import { ArrowRightIcon } from '../Icons.tsx'
import { Ammonite, Bone, Cloud, DinoSkeleton, GrassEdge, Mountains, Pebble, Skull, StrataLine, Sun, Temple, TriceratopsSkull } from './Art.tsx'
import styles from './Underground.module.css'

/* --------------------------------------------------------------- helpers */

/** Deterministic random generator, so decorations stay put between renders. */
function rng(seed: number) {
  let a = seed * 9301 + 49297
  return () => {
    a = (a * 1103515245 + 12345) % 2147483648
    return a / 2147483648
  }
}

// Soil colour by depth (0 = just under the grass, 1 = just before the other side).
const SOIL: [number, string][] = [
  [0, '#5aa843'],
  [0.06, '#7d5a3e'],
  [0.3, '#684a35'],
  [0.55, '#54402f'],
  [0.78, '#3d322b'],
  [0.92, '#2c2622'],
  [1, '#3a2620'],
]

function soilAt(t: number) {
  const i = Math.max(1, SOIL.findIndex(([s]) => s >= t))
  const [s0, c0] = SOIL[i - 1]
  const [s1, c1] = SOIL[i]
  const k = s1 === s0 ? 0 : (t - s0) / (s1 - s0)
  const ch = (c: string, o: number) => parseInt(c.slice(1 + o, 3 + o), 16)
  const mix = (o: number) => Math.round(ch(c0, o) + (ch(c1, o) - ch(c0, o)) * k)
  return `rgb(${mix(0)} ${mix(2)} ${mix(4)})`
}

/**
 * Exponential depth scaled to the number of boards: 2 m for the first layer,
 * the Earth's centre (6,371 km) for the last one underground, then its diameter on the other side.
 */
function depthLabel(index: number, total: number) {
  if (index >= total - 1) return '12,742 km'
  const t = total > 2 ? index / (total - 2) : 0
  const meters = 2 * Math.pow(6_371_000 / 2, t)
  if (meters < 1000) return `${Math.round(meters)} m`
  const km = meters / 1000
  return km < 10 ? `${km.toFixed(1)} km` : `${Math.round(km).toLocaleString('en-US')} km`
}

/* ---------------------------------------------------------- decorations */

interface Deco {
  key: string
  node: ReactNode
  style: CSSProperties
}

/** Small fossils in the side margins; more of them the deeper you go. */
function marginDecos(index: number, t: number): Deco[] {
  const r = rng(index + 7)
  const out: Deco[] = []
  const side = () => (r() > 0.5 ? 1 + r() * 6 : 91 + r() * 6)
  const add = (node: ReactNode, w: number) =>
    out.push({ key: `d${out.length}`, node, style: { left: `${side()}%`, top: `${10 + r() * 80}%`, width: w, transform: `rotate(${Math.round(r() * 360)}deg)` } })

  for (let i = 0; i < 3; i++) add(<Pebble />, 14 + r() * 18)
  if (t > 0.15) for (let i = 0; i < Math.min(5, Math.floor(t * 6)); i++) add(<Bone />, 40 + r() * 24)
  if (t > 0.35 && r() > 0.5) add(<Skull />, 40 + r() * 12)
  if (t > 0.3 && r() > 0.45) add(<Ammonite />, 44 + r() * 20)
  return out
}

/* ---------------------------------------------------------------- pieces */

function BoardHeader({ board, depth, light = true }: { board: Board; depth: string; light?: boolean }) {
  return (
    <header className={`${styles.header} ${light ? styles.headerLight : ''}`}>
      <div>
        <span className={styles.years}>{board.years}</span>
        <h3>{board.title}</h3>
      </div>
      <div className={styles.headerSide}>
        <span className={styles.depth}>{depth}</span>
        <Link to={`/board/${board.years}`} className={styles.link}>
          Board page <ArrowRightIcon />
        </Link>
      </div>
    </header>
  )
}

function Members({ board }: { board: Board }) {
  return board.members.length > 0 ? (
    <MemberGrid members={board.members} />
  ) : (
    <p className={styles.unknown}>The members of this board haven't been found yet.</p>
  )
}

/* ------------------------------------------------------------------ main */

/** Previous boards as layers of soil, newest first — the oldest one on the other side of the world. */
export default function Underground({ boards }: { boards: Board[] }) {
  const [active, setActive] = useState(-1)
  const refs = useRef<(HTMLElement | null)[]>([])

  const underground = useMemo(() => boards.slice(0, -1), [boards])
  const deepest = boards[boards.length - 1]
  const n = underground.length

  const layers = useMemo(() => {
    const fossilAt = new Map<number, 'dino' | 'trike'>([
      [Math.round(n * 0.62), 'dino'],
      [Math.round(n * 0.76), 'trike'],
      [Math.round(n * 0.9), 'dino'],
    ])
    return underground.map((board, i) => {
      const t = n <= 1 ? 0 : i / (n - 1)
      return {
        board,
        from: soilAt(t),
        to: soilAt(n <= 1 ? 1 : (i + 1) / (n - 1)),
        decos: marginDecos(i, t),
        fossil: fossilAt.get(i),
        flip: i % 2 === 1,
        depth: depthLabel(i, boards.length),
      }
    })
  }, [underground, n, boards.length])

  // Depth meter follows the layer in the middle of the screen.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const index = Number((e.target as HTMLElement).dataset.index)
          // Hide the meter again when leaving the underground (e.g. scrolling back up).
          setActive((current) => (e.isIntersecting ? index : current === index ? -1 : current))
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    refs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [boards])

  const activeBoard = active >= 0 ? boards[active] : undefined
  const setRef = (i: number) => (el: HTMLElement | null) => {
    refs.current[i] = el
  }

  return (
    <section className={styles.underground} id="previous-boards" aria-label="Previous boards">
      {layers.map(({ board, from, to, decos, fossil, flip, depth }, i) => (
        <div
          key={board.years}
          ref={setRef(i)}
          data-index={i}
          className={`${styles.layer} ${fossil ? styles.withFossil : ''}`}
          style={{ background: `linear-gradient(${from}, ${to})` }}
        >
          <StrataLine className={styles.strata} />
          {decos.map((d) => (
            <div key={d.key} className={styles.deco} style={d.style}>
              {d.node}
            </div>
          ))}
          {fossil && (
            <div className={`${styles.fossil} ${flip ? styles.fossilLeft : styles.fossilRight}`} aria-hidden="true">
              {fossil === 'dino' ? <DinoSkeleton /> : <TriceratopsSkull />}
            </div>
          )}
          <div className="container">
            <BoardHeader board={board} depth={depth} />
            <Members board={board} />
          </div>
        </div>
      ))}

      {/* -------------------------------------- The other side of the world */}
      {deepest && (
        <div className={styles.end} ref={setRef(n)} data-index={n}>
          {/* A normal landscape, rotated 180°: we arrive from underneath. */}
          <div className={styles.upsideDown} aria-hidden="true">
            <Mountains className={styles.mountains} />
            <Temple className={styles.temple} />
            <GrassEdge className={styles.endGrass} />
            <div className={styles.endSoil} />
          </div>
          <Cloud className={`${styles.endCloud} ${styles.ec1}`} aria-hidden="true" />
          <Cloud className={`${styles.endCloud} ${styles.ec2}`} aria-hidden="true" />
          <Sun className={styles.endSun} aria-hidden="true" />

          <div className={`container ${styles.endContent}`}>
            <div className={styles.endIntro}>
              <span className={styles.endEyebrow}>Depth: 12,742 km</span>
              <h2>The other side of the world</h2>
              <p>You dug straight through the Earth. Here lies the oldest board we know of.</p>
            </div>
            <BoardHeader board={deepest} depth="12,742 km" light={false} />
            <Members board={deepest} />
            <div className={styles.backUp}>
              <button type="button" className="btn btn--primary" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                Back to the surface ↑
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------ Depth meter */}
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
