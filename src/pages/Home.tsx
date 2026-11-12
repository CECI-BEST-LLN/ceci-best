import type { CSSProperties } from 'react'
import { Link } from 'react-router'
import { ArrowRightIcon } from '../components/Icons.tsx'
import { currentBoard } from '../data/boards/index.ts'
import { partners } from '../data/partners.ts'
import { asset } from '../utils.ts'
import pages from './Pages.module.css'
import styles from './Home.module.css'

const stats = [
  { value: '1989', label: 'Founded' },
  { value: '85', label: 'Local BEST Groups' },
  { value: '30', label: 'Countries' },
  { value: '3', label: 'Flagship events in LLN' },
]

const activities = [
  {
    logo: 'images/ec-logo.png',
    title: 'Engineering Challenge',
    text: 'Students solve an actual challenge proposed by a company — in teams, in one day, in front of a professional jury.',
    to: '/challenge',
    cta: 'About EC',
  },
  {
    logo: 'images/best-courses-logo.png',
    title: 'BEST Courses',
    text: 'Short courses all across Europe that students from Louvain-la-Neuve can join — and our own summer course in LLN.',
    to: '/summer-course',
    cta: 'About BCS',
  },
  {
    logo: 'images/hackathon-logo.png',
    title: 'Hackathon',
    text: 'A 24-hour coding competition organised by BEST Louvain-la-Neuve, with companies, mentors and prizes.',
    to: '/hackathon',
    cta: 'About Hackathon',
  },
]

export default function Home() {
  // The current board's group photo is the hero background — it changes with the board.
  const heroPhoto = currentBoard.groupPhoto

  const statsList = (
    <dl className={`${styles.stats} fade-up`} style={{ animationDelay: '200ms' }}>
      {stats.map((s) => (
        <div key={s.label} className={styles.stat}>
          <dt>{s.label}</dt>
          <dd>{s.value}</dd>
        </div>
      ))}
    </dl>
  )

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section
        className={`${styles.hero} ${heroPhoto ? styles.withPhoto : ''}`}
        style={heroPhoto ? ({ '--hero-photo': `url("${heroPhoto}")` } as CSSProperties) : undefined}
      >
        <div className={styles.glow} aria-hidden="true" />
        <div className={`container ${styles.heroInner}`}>
          <div className={`${styles.heroText} fade-up`}>
            <span className={styles.badge}>Board of European Students of Technology</span>
            <h1>
              BEST <span className={styles.highlight}>Louvain-la-Neuve</span>
            </h1>
            <p className={styles.heroLead}>
              The local BEST group at UCLouvain. We organise engineering competitions, hackathons and
              international courses that bring students, universities and companies together.
            </p>
            <div className={styles.actions}>
              <a href="#activities" className="btn btn--accent">
                Our activities <ArrowRightIcon width={18} height={18} />
              </a>
              <Link to="/best" className="btn btn--ghost">
                What is BEST?
              </Link>
            </div>
          </div>
          {!heroPhoto && (
            <div className={`${styles.heroMark} fade-up`} style={{ animationDelay: '120ms' }} aria-hidden="true">
              <img src={asset('images/best-mark.png')} alt="" />
            </div>
          )}
        </div>

        {heroPhoto && (
          <Link to="/board" className={styles.photoCredit}>
            Board {currentBoard.years} — {currentBoard.name} <ArrowRightIcon width={14} height={14} />
          </Link>
        )}

        {!heroPhoto && <div className="container">{statsList}</div>}
      </section>

      {/* With a photo, the stats sit in a band under the hero so faces stay visible. */}
      {heroPhoto && (
        <div className={styles.statsBand}>
          <div className="container">{statsList}</div>
        </div>
      )}

      {/* ---------- Main activities ---------- */}
      <section className="section" id="activities">
        <div className="container">
          <div className="section__head section__head--center">
            <span className="eyebrow">Main activities</span>
            <h2>What we organise</h2>
            <p className="lead">Three flagship projects, run by students for students.</p>
          </div>

          <div className={styles.activities}>
            {activities.map((a) => (
              <Link key={a.to} to={a.to} className={`card ${styles.activity}`}>
                <div className={styles.activityLogo}>
                  <img src={asset(a.logo)} alt={a.title} loading="lazy" />
                </div>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
                <span className={styles.more}>
                  {a.cta} <ArrowRightIcon />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- What is BEST ---------- */}
      <section className="section section--alt">
        <div className={`container ${pages.split}`}>
          <div>
            <span className="eyebrow">What is BEST?</span>
            <h2>A European network of technology students</h2>
            <div className={pages.prose}>
              <p>
                BEST is a non-profit, non-political organisation running since <strong>1989</strong>.
                With <strong>85 Local BEST Groups in 30 countries</strong>, it creates opportunities
                for European students to communicate, cooperate and exchange.
              </p>
            </div>
            <div className={pages.actions}>
              <Link to="/best" className="btn btn--primary">
                More about BEST
              </Link>
            </div>
          </div>
          <div className={styles.markPanel}>
            <img src={asset('images/logo-best-lln.png')} alt="BEST Louvain-la-Neuve logo" loading="lazy" />
          </div>
        </div>
      </section>

      {/* ---------- Partners ---------- */}
      <section className="section">
        <div className="container">
          <div className={styles.rowHead}>
            <div className="section__head" style={{ marginBottom: 0 }}>
              <span className="eyebrow">Partners</span>
              <h2>They support us</h2>
            </div>
            <Link to="/partners" className={styles.allLink}>
              More about our partners <ArrowRightIcon width={18} height={18} />
            </Link>
          </div>
          <div className={pages.logos}>
            {partners.map((p) => (
              <a key={p.id} href={p.url} target="_blank" rel="noreferrer" className={pages.logoTile}>
                <img src={asset(p.logo)} alt={p.name} loading="lazy" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Louvain-la-Neuve ---------- */}
      <section className="section section--alt">
        <div className={`container ${pages.split} ${pages.splitReverse}`}>
          <div>
            <span className="eyebrow">Louvain-la-Neuve?</span>
            <h2>A city built around its university</h2>
            <div className={pages.prose}>
              <p>
                Louvain-la-Neuve is a town in French-speaking Belgium, about 30 km south-east of
                Brussels. It was built in the 1960s, after the Catholic University of Leuven split in
                two — its name literally means “the new Leuven”. Today it is home to more than 19,000
                inhabitants.
              </p>
            </div>
            <div className={pages.actions}>
              <Link to="/louvain-la-neuve" className="btn btn--primary">
                Learn more about the city
              </Link>
            </div>
          </div>
          <img className={pages.photo} src={asset('images/lln-grand-place.webp')} alt="Grand-Place of Louvain-la-Neuve" loading="lazy" />
        </div>
      </section>
    </>
  )
}
