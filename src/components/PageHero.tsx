import type { ReactNode } from 'react'
import styles from './PageHero.module.css'

interface PageHeroProps {
  eyebrow: string
  title: string
  children?: ReactNode
}

/** Banner at the top of inner pages. */
export default function PageHero({ eyebrow, title, children }: PageHeroProps) {
  return (
    <section className={styles.hero}>
      <div className="container fade-up">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        {children && <div className={styles.intro}>{children}</div>}
      </div>
    </section>
  )
}
