import type { ReactNode } from 'react'
import { Cloud, GrassEdge, Sun } from './Art.tsx'
import styles from './BoardSky.module.css'

/** Sky background for the current board, ending on a grass edge (where the dig starts). */
export default function BoardSky({ children, surface }: { children: ReactNode; surface?: ReactNode }) {
  return (
    <section className={styles.sky}>
      <div className={styles.art} aria-hidden="true">
        <Sun className={styles.sun} />
        <Cloud className={`${styles.cloud} ${styles.c1}`} />
        <Cloud className={`${styles.cloud} ${styles.c2}`} />
        <Cloud className={`${styles.cloud} ${styles.c3}`} />
        <Cloud className={`${styles.cloud} ${styles.c4}`} />
      </div>

      <div className={`container ${styles.content}`}>{children}</div>

      <div className={styles.surface}>
        <GrassEdge className={styles.grass} />
        {surface && <div className={styles.surfaceContent}>{surface}</div>}
      </div>
    </section>
  )
}
