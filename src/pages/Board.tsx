import { Link } from 'react-router'
import PageHero from '../components/PageHero.tsx'
import { currentBoard } from '../data/board.ts'
import { asset } from '../utils.ts'
import styles from './Pages.module.css'

export default function Board() {
  const board = currentBoard

  return (
    <>
      <PageHero eyebrow={`Board ${board.years}`} title="Meet the board">
        <p>
          This year's board goes by the name <strong className={styles.boardName}>{board.name}</strong>.
          Here are the students who make BEST Louvain-la-Neuve happen.
        </p>
      </PageHero>

      <section className="section">
        <div className="container">
          {board.groupPhoto && (
            <img
              className={`${styles.photo} ${styles.photoWide}`}
              style={{ marginBottom: '3.5rem' }}
              src={asset(board.groupPhoto)}
              alt={`Board ${board.years} — ${board.name}`}
            />
          )}

          <div className={styles.members}>
            {board.members.map((m) => (
              <article key={m.name} className={`card ${styles.member}`}>
                <div className={styles.memberPhotoWrap}>
                  {m.photo && <img className={styles.memberPhoto} src={asset(m.photo)} alt={m.name} loading="lazy" />}
                </div>
                <div className={styles.memberBody}>
                  <h3>{m.name}</h3>
                  <p className={styles.role}>{m.role}</p>
                  {m.email && (
                    <a className={styles.memberMail} href={`mailto:${m.email}`}>
                      {m.email}
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>

          <p className={styles.center} style={{ marginTop: '3rem' }}>
            <Link to="/board/previous" className="btn btn--primary">
              See previous boards
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}
