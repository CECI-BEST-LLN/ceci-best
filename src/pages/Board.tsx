import { Link, useParams } from 'react-router'
import Avatar from '../components/Avatar.tsx'
import PageHero from '../components/PageHero.tsx'
import { boardByYears, currentBoard } from '../data/boards/index.ts'
import NotFound from './NotFound.tsx'
import styles from './Pages.module.css'

/** /board → current board, /board/2024-2025 → that board. */
export default function Board() {
  const { years } = useParams()
  const board = years ? boardByYears(years) : currentBoard
  if (!board) return <NotFound />

  const isCurrent = board === currentBoard

  return (
    <>
      <PageHero eyebrow={`Board ${board.years}`} title={isCurrent ? 'Meet the board' : board.name}>
        {isCurrent ? (
          <p>
            This year's board goes by the name <strong className={styles.boardName}>{board.name}</strong>.
            Here are the students who make BEST Louvain-la-Neuve happen.
          </p>
        ) : (
          <p>The board that ran BEST Louvain-la-Neuve in {board.years}.</p>
        )}
      </PageHero>

      <section className="section">
        <div className="container">
          {board.groupPhoto && (
            <img
              className={`${styles.photo} ${styles.photoWide}`}
              style={{ marginBottom: '3.5rem' }}
              src={board.groupPhoto}
              alt={`Board ${board.years} — ${board.name}`}
            />
          )}

          {board.members.length === 0 ? (
            <p className="lead">The members of this board haven't been added yet.</p>
          ) : (
            <div className={styles.members}>
              {board.members.map((m) => (
                <article key={m.slug + m.role} className={`card ${styles.member}`}>
                  <div className={styles.memberPhotoWrap}>
                    {m.photo ? (
                      <img className={styles.memberPhoto} src={m.photo} alt={m.name} loading="lazy" />
                    ) : (
                      <div className={styles.memberNoPhoto}>
                        <Avatar name={m.name} size={96} />
                      </div>
                    )}
                  </div>
                  <div className={styles.memberBody}>
                    <h3>{m.name}</h3>
                    <p className={styles.role}>{m.role}</p>
                    {isCurrent && m.email && (
                      <a className={styles.memberMail} href={`mailto:${m.email}`}>
                        {m.email}
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}

          <p className={styles.center} style={{ marginTop: '3rem' }}>
            {isCurrent ? (
              <Link to="/board/previous" className="btn btn--primary">
                See previous boards
              </Link>
            ) : (
              <Link to="/board/previous" className="btn btn--ghost" style={{ color: 'var(--c-primary)' }}>
                ← All previous boards
              </Link>
            )}
          </p>
        </div>
      </section>
    </>
  )
}
