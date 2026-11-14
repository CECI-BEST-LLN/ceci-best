import { useCallback, useEffect, useState } from 'react'
import styles from './Gallery.module.css'

interface Props {
  photos: string[]
  /** Accessible description, numbered automatically: "<alt> (1/4)" */
  alt: string
}

/** Photo grid; clicking a photo opens it full screen (arrows / Esc supported). */
export default function Gallery({ photos, alt }: Props) {
  const [open, setOpen] = useState<number | null>(null)
  const close = useCallback(() => setOpen(null), [])
  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + photos.length) % photos.length)), [photos.length])

  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, close, step])

  const label = (i: number) => `${alt} (${i + 1}/${photos.length})`

  return (
    <>
      <ul className={styles.grid}>
        {photos.map((src, i) => (
          <li key={src}>
            <button type="button" className={styles.thumb} onClick={() => setOpen(i)} aria-label={`Open photo: ${label(i)}`}>
              <img src={src} alt={label(i)} loading="lazy" decoding="async" />
            </button>
          </li>
        ))}
      </ul>

      {open !== null && (
        <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label={label(open)} onClick={close}>
          <img src={photos[open]} alt={label(open)} onClick={(e) => e.stopPropagation()} />
          <button type="button" className={`${styles.nav} ${styles.close}`} onClick={close} aria-label="Close">
            ×
          </button>
          {photos.length > 1 && (
            <>
              <button type="button" className={`${styles.nav} ${styles.prev}`} onClick={(e) => (e.stopPropagation(), step(-1))} aria-label="Previous photo">
                ‹
              </button>
              <button type="button" className={`${styles.nav} ${styles.next}`} onClick={(e) => (e.stopPropagation(), step(1))} aria-label="Next photo">
                ›
              </button>
            </>
          )}
          <span className={styles.counter}>
            {open + 1} / {photos.length}
          </span>
        </div>
      )}
    </>
  )
}
