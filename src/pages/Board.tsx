import { lazy, Suspense, useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router'
import Avatar from '../components/Avatar.tsx'
import { Shovel } from '../components/dig/Art.tsx'
import PageHero from '../components/PageHero.tsx'
import { boardByYears, currentBoard, previousBoards } from '../data/boards/index.ts'
import NotFound from './NotFound.tsx'
import styles from './Pages.module.css'

// Loaded only when someone starts digging.
const BoardDig = lazy(() => import('../components/dig/BoardDig.tsx'))

/** /board → current board, /board/2024-2025 → that board. */
export default function Board() {
  const { years } = useParams()
  const board = years ? boardByYears(years) : currentBoard
  const isCurrent = board === currentBoard

  // "/board#previous-boards" opens the dig directly (used by links from other pages).
  const { hash } = useLocation()
  const [clicked, setClicked] = useState(false)
  const digging = clicked || hash === '#previous-boards'

  // Scroll to the dig once it is rendered.
  useEffect(() => {
    if (!digging || !isCurrent) return
    const t = setTimeout(() => document.getElementById('previous-boards')?.scrollIntoView({ behavior: 'smooth' }), 150)
    return () => clearTimeout(t)
  }, [digging, isCurrent])

  if (!board) return <NotFound />

  return (
    <>
      <PageHero eyebrow={`Board ${board.years}`} title={isCurrent ? 'Meet the board' : board.title}>
        {isCurrent ? (
          <p>
            {board.name && (
              <>
                This year's board goes by the name <strong className={styles.boardName}>{board.name}</strong>.{' '}
              </>
            )}
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
              alt={`Board ${board.years}${board.name ? ` — ${board.name}` : ''}`}
            />
          )}

          {board.members.length === 0 ? (
            <p className="lead">The members of this board haven't been added yet.</p>
          ) : (
            <div className={styles.members}>
              {board.members.map((m) => (
                <article key={m.slug} className={`card ${styles.member}`}>
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
                    {m.hasKnownRole && <p className={styles.role}>{m.roleLabel}</p>}
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
              !digging && (
                <button type="button" className={`btn btn--primary ${styles.digButton}`} onClick={() => setClicked(true)}>
                  <Shovel width={20} height={20} /> Show previous boards
                </button>
              )
            ) : (
              <Link to="/board#previous-boards" className="btn btn--ghost" style={{ color: 'var(--c-primary)' }}>
                ← All previous boards
              </Link>
            )}
          </p>
        </div>
      </section>

      {isCurrent && digging && (
        <Suspense fallback={null}>
          <BoardDig boards={previousBoards} />
        </Suspense>
      )}
    </>
  )
}
