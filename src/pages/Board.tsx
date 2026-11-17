import { lazy, Suspense, useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router'
import { Shovel } from '../components/dig/Art.tsx'
import BoardSky from '../components/dig/BoardSky.tsx'
import MemberGrid from '../components/MemberGrid.tsx'
import PageHero from '../components/PageHero.tsx'
import { boardByYears, currentBoard, previousBoards, type Board as BoardData } from '../data/boards/index.ts'
import NotFound from './NotFound.tsx'
import styles from './Pages.module.css'

// The underground (all previous boards) is only downloaded when someone starts digging.
const Underground = lazy(() => import('../components/dig/Underground.tsx'))

/** /board → current board in the sky (+ dig), /board/2024-2025 → a past board's own page. */
export default function Board() {
  const { years } = useParams()
  const board = years ? boardByYears(years) : currentBoard
  if (!board) return <NotFound />
  return board === currentBoard ? <CurrentBoard /> : <PastBoard board={board} />
}

function GroupPhoto({ board, eager = false }: { board: BoardData; eager?: boolean }) {
  if (!board.groupPhoto) return null
  return (
    <img
      className={styles.groupPhoto}
      src={board.groupPhoto}
      alt={`Board ${board.years}${board.name ? ` — ${board.name}` : ''}`}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
    />
  )
}

function CurrentBoard() {
  const board = currentBoard

  // "/board#previous-boards" opens the dig directly (used by links from other pages).
  const { hash } = useLocation()
  const [clicked, setClicked] = useState(false)
  const digging = clicked || hash === '#previous-boards'

  useEffect(() => {
    if (!digging) return
    // Let the sky and grass appear first, then dig down. The dig is lazy-loaded, so wait until
    // it is actually in the page (up to ~5 s on a slow phone connection).
    let tries = 0
    let t = setTimeout(function scroll() {
      const dig = document.getElementById('previous-boards')
      if (dig) dig.scrollIntoView({ behavior: clicked ? 'smooth' : 'instant' })
      else if (++tries < 50) t = setTimeout(scroll, 100)
    }, clicked ? 1100 : 0)
    return () => clearTimeout(t)
  }, [digging, clicked])

  return (
    <>
      <BoardSky
        active={digging}
        surface={
          !digging && (
            <button type="button" className={`btn btn--primary ${styles.digButton}`} onClick={() => setClicked(true)}>
              <Shovel width={20} height={20} /> Show previous boards
            </button>
          )
        }
      >
        <div className={styles.skyIntro}>
          <span className="eyebrow">Board {board.years}</span>
          <h1>Meet the board</h1>
          <p className="lead">
            {board.name && (
              <>
                This year's board goes by the name <strong className={styles.boardName}>{board.name}</strong>.{' '}
              </>
            )}
            Here are the students who make BEST Louvain-la-Neuve happen.
          </p>
        </div>
        <GroupPhoto board={board} eager />
        <MemberGrid members={board.members} showEmails />
      </BoardSky>

      {digging && (
        <Suspense fallback={<div className={styles.digLoading}>Digging…</div>}>
          <Underground boards={previousBoards} />
        </Suspense>
      )}
    </>
  )
}

function PastBoard({ board }: { board: BoardData }) {
  return (
    <>
      <PageHero eyebrow={`Board ${board.years}`} title={board.title}>
        <p>The board that ran BEST Louvain-la-Neuve in {board.years}.</p>
      </PageHero>

      <section className="section">
        <div className="container">
          <GroupPhoto board={board} />
          {board.members.length === 0 ? (
            <p className="lead">The members of this board haven't been added yet.</p>
          ) : (
            <MemberGrid members={board.members} />
          )}
          <p className={styles.center} style={{ marginTop: '3rem' }}>
            <Link to="/board#previous-boards" className="btn btn--ghost" style={{ color: 'var(--c-primary)' }}>
              ← All previous boards
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}
