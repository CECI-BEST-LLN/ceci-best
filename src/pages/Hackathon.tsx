import type { CSSProperties } from 'react'
import ContactBlock from '../components/ContactBlock.tsx'
import LinkList from '../components/LinkList.tsx'
import PageHero from '../components/PageHero.tsx'
import { BriefcaseIcon, CalendarIcon, EuroIcon, GiftIcon, LightbulbIcon, UsersIcon } from '../components/Icons.tsx'
import { pageContacts } from '../data/contacts.ts'
import type { ExternalLink } from '../data/types.ts'
import { asset } from '../utils.ts'
import styles from './Pages.module.css'

const perks = [
  { icon: EuroIcon, title: 'Free registration', text: 'Sign up for free in a team of four.' },
  { icon: BriefcaseIcon, title: 'Innovative companies', text: 'Meet the companies behind the challenges.' },
  { icon: LightbulbIcon, title: 'Experienced mentors', text: 'Get help from mentors and talented developers.' },
  { icon: UsersIcon, title: 'Networking', text: 'Build your network and develop career-related skills.' },
  { icon: GiftIcon, title: 'Prizes', text: 'The best teams go home with prizes.' },
]

const jamFacts = [
  { icon: CalendarIcon, label: 'When', value: 'April 2026' },
  { icon: UsersIcon, label: 'Participants', value: '50+' },
  { icon: LightbulbIcon, label: 'Challenge', value: 'Make a game in under 24 hours' },
]

const links: ExternalLink[] = [
  {
    label: 'Registration form',
    href: 'https://docs.google.com/forms/d/e/1FAIpQLSeBo5qfLOwSENORr2kFSWuiriknRf0Wf5MMyj8NYHsI1X2VZQ/closedform',
    description: 'Registrations are currently closed',
  },
  { label: 'Facebook event', href: 'https://www.facebook.com/events/862315038813468' },
]

export default function Hackathon() {
  return (
    <>
      <PageHero
        eyebrow="24-hour competition"
        title="Hackathon"
        media={<img src={asset('images/hackathon-logo.png')} alt="Louvain-la-Neuve Hackathon logo" />}
      >
        <p>
          BEST Louvain-la-Neuve's 24-hour hackathon — a competition for computer science students,
          engineering students and coding enthusiasts.
        </p>
      </PageHero>

      {/* ------------------------------------------------ Latest: Game Jam */}
      <section className="section section--alt">
        <div className={`container ${styles.split}`}>
          <div className={styles.prose}>
            <span className="eyebrow">Latest edition · April 2026</span>
            <h2>Game Jam — 24h edition</h2>
            <p>
              Last April, our hackathon became a <strong>24-hour game jam</strong>: more than
              50 participants teamed up with one goal — design, code and ship a playable game in
              less than 24 hours.
            </p>
            <dl className={styles.facts} style={{ marginTop: '2rem', marginBottom: 0 }}>
              {jamFacts.map(({ icon: Icon, label, value }) => (
                <div key={label} className={styles.fact}>
                  <span className="icon-badge">
                    <Icon />
                  </span>
                  <div>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
          <img
            className={styles.poster}
            src={asset('images/game-jam-2026.webp')}
            alt="Game Jam – Edition 24h poster, by CECI BEST Louvain-la-Neuve and Cilyx"
            width={800}
            height={1000}
            loading="lazy"
            decoding="async"
          />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__head">
            <span className="eyebrow">Why join?</span>
            <h2>Demonstrate your computer skills</h2>
          </div>
          <div className="grid" style={{ '--min': '200px' } as CSSProperties}>
            {perks.map(({ icon: Icon, title, text }) => (
              <article key={title} className="card">
                <div className="icon-badge">
                  <Icon />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>

          <div className={styles.photoGrid}>
            <img className={styles.photo} src={asset('images/hackathon-1.webp')} alt="A participant testing a game built during the hackathon" loading="lazy" />
            <img className={styles.photo} src={asset('images/hackathon-2.webp')} alt="A laptop running a project at the hackathon" loading="lazy" />
          </div>

          <h3 style={{ marginTop: '3.5rem' }}>Links</h3>
          <LinkList links={links} />
        </div>
      </section>

      <ContactBlock roles={pageContacts.hackathon} />
    </>
  )
}
