import type { ReactNode } from 'react'
import styles from './PageHero.module.css'

interface PageHeroProps {
  eyebrow: string
  title: string
  children?: ReactNode
  /** Optional visual (logo, image) shown on the right */
  media?: ReactNode
}

/** Banner at the top of inner pages. */
export default function PageHero({ eyebrow, title, children, media }: PageHeroProps) {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.inner} ${media ? styles.withMedia : ''}`}>
        <div className="fade-up">
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          {children && <div className={styles.intro}>{children}</div>}
        </div>
        {media && (
          <div className={`${styles.media} fade-up`} style={{ animationDelay: '100ms' }}>
            {media}
          </div>
        )}
      </div>
    </section>
  )
}
