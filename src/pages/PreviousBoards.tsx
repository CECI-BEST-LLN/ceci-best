import PageHero from '../components/PageHero.tsx'
import { previousBoards } from '../data/board.ts'
import styles from './Pages.module.css'

const detailed = previousBoards.filter((b) => b.members.length > 0)
const earlier = previousBoards.filter((b) => b.members.length === 0)

export default function PreviousBoards() {
  return (
    <>
      <PageHero eyebrow="History" title="Previous boards">
        <p>Every year, a new board takes over BEST Louvain-la-Neuve — each with its own name.</p>
      </PageHero>

      <section className="section">
        <div className={`container ${styles.boards}`}>
          {detailed.map((b) => (
            <article key={b.years} className={`card ${styles.boardCard}`}>
              <h3>
                <span className={styles.boardName}>{b.name}</span>
                <small>{b.years}</small>
              </h3>
              <dl className={styles.roster}>
                {b.members.map((m) => (
                  <div key={m.role}>
                    <dt>{m.role}</dt>
                    <dd>{m.name}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>

        {earlier.length > 0 && (
          <div className="container" style={{ marginTop: '3rem' }}>
            <h3>Earlier boards</h3>
            <ul className={styles.earlier}>
              {earlier.map((b) => (
                <li key={b.years}>
                  <span className={styles.boardName}>{b.name}</span> <small>{b.years}</small>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </>
  )
}
