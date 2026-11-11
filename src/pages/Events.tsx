import type { CSSProperties } from 'react'
import { useMemo, useState } from 'react'
import EventCard from '../components/EventCard.tsx'
import PageHero from '../components/PageHero.tsx'
import { categoryLabels, events, splitEvents, type EventCategory } from '../data/events.ts'
import styles from './Pages.module.css'

type Filter = EventCategory | 'all'

const filters: Filter[] = ['all', ...(Object.keys(categoryLabels) as EventCategory[])]

export default function Events() {
  const [filter, setFilter] = useState<Filter>('all')

  const { upcoming, past } = useMemo(
    () => splitEvents(filter === 'all' ? events : events.filter((e) => e.category === filter)),
    [filter],
  )

  return (
    <>
      <PageHero eyebrow="Agenda" title="Events">
        <p>Courses, competitions, workshops and social events organised by BEST Louvain-la-Neuve.</p>
      </PageHero>

      <section className="section">
        <div className="container">
          <div className={styles.filters} role="group" aria-label="Filter events by category">
            {filters.map((f) => (
              <button
                key={f}
                className={`${styles.chip} ${filter === f ? styles.chipActive : ''}`}
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
              >
                {f === 'all' ? 'All' : categoryLabels[f]}
              </button>
            ))}
          </div>

          <h2>Upcoming</h2>
          {upcoming.length > 0 ? (
            <div className="grid" style={{ '--min': '420px' } as CSSProperties}>
              {upcoming.map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          ) : (
            <p className={styles.empty}>No upcoming events in this category for now.</p>
          )}

          {past.length > 0 && (
            <>
              <h2 className={styles.subhead}>Past events</h2>
              <div className="grid" style={{ '--min': '420px' } as CSSProperties}>
                {past.map((e) => (
                  <EventCard key={e.id} event={e} past />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  )
}
