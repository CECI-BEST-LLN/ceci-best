import { categoryLabels, type BestEvent } from '../data/events.ts'
import styles from './EventCard.module.css'

const day = new Intl.DateTimeFormat('en-GB', { day: '2-digit' })
const month = new Intl.DateTimeFormat('en-GB', { month: 'short' })
const full = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

function formatRange(e: BestEvent) {
  const start = new Date(e.date)
  if (!e.endDate) return full.format(start)
  return `${full.format(start)} – ${full.format(new Date(e.endDate))}`
}

export default function EventCard({ event, past = false }: { event: BestEvent; past?: boolean }) {
  const start = new Date(event.date)

  return (
    <article className={`card ${styles.card} ${past ? styles.past : ''}`}>
      <div className={styles.date} aria-hidden="true">
        <span className={styles.day}>{day.format(start)}</span>
        <span className={styles.month}>{month.format(start)}</span>
      </div>

      <div className={styles.body}>
        <span className={`${styles.tag} ${styles[event.category]}`}>
          {categoryLabels[event.category]}
        </span>
        <h3>{event.title}</h3>
        <p className={styles.meta}>
          <time dateTime={event.date}>{formatRange(event)}</time> · {event.location}
        </p>
        <p>{event.description}</p>
        {event.link && !past && (
          <a className={styles.more} href={event.link} target="_blank" rel="noreferrer">
            Learn more →
          </a>
        )}
      </div>
    </article>
  )
}
