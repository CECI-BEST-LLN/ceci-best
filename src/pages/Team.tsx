import type { CSSProperties } from 'react'
import PageHero from '../components/PageHero.tsx'
import { team } from '../data/team.ts'
import styles from './Pages.module.css'

const initials = (name: string) =>
  name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

export default function Team() {
  return (
    <>
      <PageHero eyebrow="Our people" title="Meet the board">
        <p>The students who make BEST Louvain-la-Neuve happen this year.</p>
      </PageHero>

      <section className="section">
        <div className="container">
          <div className="grid" style={{ '--min': '220px' } as CSSProperties}>
            {team.map((m, i) => (
              <article key={`${m.role}-${i}`} className={`card ${styles.member}`}>
                {m.photo ? (
                  <img
                    className={styles.avatar}
                    src={`${import.meta.env.BASE_URL}${m.photo}`}
                    alt={m.name}
                    loading="lazy"
                  />
                ) : (
                  <div className={styles.avatar} aria-hidden="true">
                    {initials(m.name)}
                  </div>
                )}
                <h3>{m.name}</h3>
                <p className={styles.role}>{m.role}</p>
                {m.study && <p className={styles.study}>{m.study}</p>}
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
