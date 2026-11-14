import type { ReactNode } from 'react'
import { Cloud, GrassEdge, Sun } from './Art.tsx'
import styles from './BoardSky.module.css'

interface Props {
  children: ReactNode
  /** Content shown at the bottom (e.g. the "Show previous boards" button) */
  surface?: ReactNode
  /** When true, the section turns into a sky ending on grass (the dig has started). */
  active: boolean
}

/** Current board section. Plain page by default; becomes a sky once the dig starts. */
export default function BoardSky({ children, surface, active }: Props) {
  return (
    <section className={`${styles.sky} ${active ? styles.active : ''}`}>
      <div className={styles.skyBg} aria-hidden="true" />
      {active && (
        <div className={styles.art} aria-hidden="true">
          <Sun className={styles.sun} />
          <Cloud className={`${styles.cloud} ${styles.c1}`} />
          <Cloud className={`${styles.cloud} ${styles.c2}`} />
          <Cloud className={`${styles.cloud} ${styles.c3}`} />
          <Cloud className={`${styles.cloud} ${styles.c4}`} />
        </div>
      )}

      <div className={`container ${styles.content}`}>{children}</div>

      <div className={styles.surface}>
        <GrassEdge className={styles.grass} />
        {surface && <div className={styles.surfaceContent}>{surface}</div>}
      </div>
    </section>
  )
}
