import type { CSSProperties } from 'react'
import { Link } from 'react-router'
import EventCard from '../components/EventCard.tsx'
import { BriefcaseIcon, GlobeIcon, SparkIcon, TrophyIcon, ArrowRightIcon } from '../components/Icons.tsx'
import { events, splitEvents } from '../data/events.ts'
import styles from './Home.module.css'

// TODO: placeholder numbers — check the official BEST figures.
const stats = [
  { value: '80+', label: 'Universities' },
  { value: '30+', label: 'Countries' },
  { value: '3,000+', label: 'Members' },
  { value: '1989', label: 'Since' },
]

const pillars = [
  {
    icon: GlobeIcon,
    title: 'BEST Courses',
    text: 'Week-long academic courses across Europe, combining technology, culture and new friendships.',
  },
  {
    icon: TrophyIcon,
    title: 'Engineering Competitions',
    text: 'EBEC challenges students to solve real problems in teams — from local rounds to the European final.',
  },
  {
    icon: BriefcaseIcon,
    title: 'Career Development',
    text: 'Workshops, company visits and events that connect students with industry partners.',
  },
  {
    icon: SparkIcon,
    title: 'Personal Growth',
    text: 'Organise events, lead projects and gain soft skills by joining our local team.',
  },
]

export default function Home() {
  const { upcoming } = splitEvents(events)

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className={styles.hero}>
        <div className={styles.glow} aria-hidden="true" />
        <div className={`container ${styles.heroInner}`}>
          <div className="fade-up">
            <span className={styles.badge}>Board of European Students of Technology</span>
            <h1>
              Engineering students, <span className={styles.highlight}>connected</span> across Europe.
            </h1>
            <p className={styles.heroLead}>
              BEST Louvain-la-Neuve is the UCLouvain group of a student network spanning 80+
              technology universities. We organise courses, competitions and career events that go
              beyond the classroom.
            </p>
            <div className={styles.actions}>
              <Link to="/events" className="btn btn--accent">
                See our events <ArrowRightIcon width={18} height={18} />
              </Link>
              <Link to="/about" className="btn btn--ghost">
                Discover BEST
              </Link>
            </div>
          </div>

          <dl className={`${styles.stats} fade-up`} style={{ animationDelay: '120ms' }}>
            {stats.map((s) => (
              <div key={s.label} className={styles.stat}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------- What we do ---------- */}
      <section className="section">
        <div className="container">
          <div className="section__head section__head--center">
            <span className="eyebrow">What we do</span>
            <h2>More than an engineering degree</h2>
            <p className="lead">
              We help students become more internationally minded through four main activities.
            </p>
          </div>

          <div className="grid" style={{ '--min': '240px' } as CSSProperties}>
            {pillars.map(({ icon: Icon, title, text }) => (
              <article key={title} className="card">
                <div className="icon-badge">
                  <Icon />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Upcoming events ---------- */}
      <section className="section section--alt">
        <div className="container">
          <div className={styles.rowHead}>
            <div className="section__head" style={{ marginBottom: 0 }}>
              <span className="eyebrow">Agenda</span>
              <h2>Upcoming events</h2>
            </div>
            <Link to="/events" className={styles.allLink}>
              All events <ArrowRightIcon width={18} height={18} />
            </Link>
          </div>

          {upcoming.length > 0 ? (
            <div className="grid" style={{ '--min': '420px' } as CSSProperties}>
              {upcoming.slice(0, 4).map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          ) : (
            <p className="lead">New events are coming soon — stay tuned!</p>
          )}
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="section">
        <div className="container">
          <div className={styles.cta}>
            <div>
              <h2>Want to work with us?</h2>
              <p>
                Reach motivated engineering students from UCLouvain and all over Europe. Let's
                build something together.
              </p>
            </div>
            <div className={styles.actions}>
              <Link to="/partners" className="btn btn--accent">
                Become a partner
              </Link>
              <Link to="/contact" className="btn btn--ghost">
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
