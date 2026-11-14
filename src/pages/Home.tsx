import type { CSSProperties, ReactNode } from 'react'
import { Link } from 'react-router'
import { ArrowRightIcon } from '../components/Icons.tsx'
import PartnerLogo from '../components/PartnerLogo.tsx'
import { boards, currentBoard } from '../data/boards/index.ts'
import { challengeEditions } from '../data/challenge.ts'
import { courseEditions, courseHighlights } from '../data/courses.ts'
import { jamPhotos } from '../data/hackathon.ts'
import { partners } from '../data/partners.ts'
import { asset } from '../utils.ts'
import styles from './Home.module.css'

// BEST colours: one per activity
const ORANGE = '#f7a823'
const BLUE = '#0f6cb6'
const GREEN = '#78bc2b'

const ec = challengeEditions[0]
const bcs = courseEditions[0]
const bcsBuilds = bcs ? courseHighlights(bcs.year) : []
const oldestBoard = boards[boards.length - 1]

/* ------------------------------------------------------------- pieces */

interface EventProps {
  id: string
  accent: string
  logo: string
  logoAlt: string
  eyebrow: string
  title: string
  children: ReactNode
  facts: string[]
  to: string
  cta: string
  media: ReactNode
  reverse?: boolean
}

function EventFeature({ id, accent, logo, logoAlt, eyebrow, title, children, facts, to, cta, media, reverse }: EventProps) {
  return (
    <section id={id} className={styles.event} style={{ '--accent': accent } as CSSProperties}>
      <div className={`container ${styles.eventInner} ${reverse ? styles.reverse : ''}`}>
        <div className={styles.eventText}>
          <img className={styles.eventLogo} src={asset(logo)} alt={logoAlt} loading="lazy" />
          <span className={styles.eventEyebrow}>{eyebrow}</span>
          <h2>{title}</h2>
          <div className={styles.eventBody}>{children}</div>
          <ul className={styles.chips}>
            {facts.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <Link to={to} className={styles.eventCta}>
            {cta} <ArrowRightIcon width={18} height={18} />
          </Link>
        </div>
        <div className={styles.eventMedia}>{media}</div>
      </div>
    </section>
  )
}

/** One large photo + two small ones. */
function Collage({ photos, alt }: { photos: string[]; alt: string }) {
  const [a, b, c] = photos
  return (
    <div className={styles.collage}>
      {a && <img className={styles.collageMain} src={a} alt={alt} loading="lazy" decoding="async" />}
      {b && <img src={b} alt={alt} loading="lazy" decoding="async" />}
      {c && <img src={c} alt={alt} loading="lazy" decoding="async" />}
    </div>
  )
}

/* --------------------------------------------------------------- page */

export default function Home() {
  const heroPhoto = currentBoard.groupPhoto

  const made = [
    ...bcsBuilds.map((src) => ({ src, label: `Prototype · BCS ${bcs?.year}`, color: GREEN })),
    ...[jamPhotos[4], jamPhotos[6], jamPhotos[7]].filter(Boolean).map((src) => ({ src, label: 'Game made in 24h · Game Jam 2026', color: BLUE })),
  ]

  return (
    <>
      {/* ================================================================ Hero */}
      <section
        className={styles.hero}
        style={heroPhoto ? ({ '--hero-photo': `url("${heroPhoto}")` } as CSSProperties) : undefined}
      >
        <div className={`container ${styles.heroInner}`}>
          <span className={styles.badge}>Board of European Students of Technology</span>
          <h1>
            BEST <span>Louvain-la-Neuve</span>
          </h1>
          <p className={styles.heroLead}>
            Engineering challenges, 24-hour game jams and international courses — organised by
            students, for students, at UCLouvain.
          </p>
        </div>

        <div className={`container ${styles.tiles}`}>
          <a href="#challenge" className={styles.tile} style={{ '--accent': ORANGE } as CSSProperties}>
            <small>Competition</small>
            <strong>Engineering Challenge</strong>
            <ArrowRightIcon />
          </a>
          <a href="#hackathon" className={styles.tile} style={{ '--accent': BLUE } as CSSProperties}>
            <small>24 hours</small>
            <strong>Hackathon · Game Jam</strong>
            <ArrowRightIcon />
          </a>
          <a href="#summer-course" className={styles.tile} style={{ '--accent': GREEN } as CSSProperties}>
            <small>International</small>
            <strong>BEST Course in Summer</strong>
            <ArrowRightIcon />
          </a>
        </div>
      </section>

      {/* ============================================================== Events */}
      {ec && (
        <EventFeature
          id="challenge"
          accent={ORANGE}
          logo="images/ec-logo.png"
          logoAlt="Engineering Challenge"
          eyebrow={`Latest edition · ${ec.dateLabel}`}
          title="Engineering Challenge"
          facts={['Teams of 4', 'Real company case', 'Professional jury', 'Free']}
          to="/challenge"
          cta="Discover the challenge"
          media={
            ec.poster ? (
              <img className={styles.poster} src={asset(ec.poster)} alt={`${ec.title} poster`} loading="lazy" decoding="async" />
            ) : null
          }
        >
          <p>
            One day to solve a real engineering problem proposed by a company, then pitch the
            solution to a jury of professionals.
            {ec.casePartner && (
              <>
                {' '}
                In {ec.slug}, students tackled a case by <strong>{ec.casePartner}</strong> at the{' '}
                {ec.location.split(',')[0]}.
              </>
            )}
          </p>
        </EventFeature>
      )}

      <EventFeature
        id="hackathon"
        accent={BLUE}
        logo="images/hackathon-logo.png"
        logoAlt="Louvain-la-Neuve Hackathon"
        eyebrow="Latest edition · April 2026"
        title="Game Jam — 24h edition"
        facts={['50+ participants', '24 hours', 'One playable game']}
        to="/hackathon"
        cta="See the game jam"
        media={<Collage photos={[jamPhotos[1], jamPhotos[5], jamPhotos[9]]} alt="Game Jam 2026" />}
        reverse
      >
        <p>
          Our hackathon turned into a game jam: teams had less than 24 hours to design, code and
          present a playable game — from the opening briefing to the final demos in front of the
          whole amphitheatre.
        </p>
      </EventFeature>

      {bcs && (
        <EventFeature
          id="summer-course"
          accent={GREEN}
          logo="images/best-courses-logo.png"
          logoAlt="BEST Courses"
          eyebrow={`Latest edition · Summer ${bcs.year}`}
          title={bcs.theme ?? `BEST Course in Summer ${bcs.year}`}
          facts={['20 European students', bcs.teacher ?? 'University course', '50 € max']}
          to="/summer-course"
          cta="About the summer course"
          media={<Collage photos={[bcs.photo ? asset(bcs.photo) : '', ...bcsBuilds.slice(0, 2)].filter(Boolean)} alt={`BCS ${bcs.year}`} />}
        >
          <p>
            Every summer we welcome students from all over Europe for a course at UCLouvain. In{' '}
            {bcs.year}, they went from a client brief to working prototypes — and discovered
            Belgium along the way.
          </p>
        </EventFeature>
      )}

      {/* ===================================================== Made by students */}
      {made.length > 0 && (
        <section className={styles.made}>
          <div className="container">
            <span className={styles.madeEyebrow}>Made by students</span>
            <h2>What participants build with us</h2>
            <p className={styles.madeLead}>Prototypes from the summer course, games coded in 24 hours.</p>
          </div>
          <div className={styles.madeStrip}>
            {made.map((m) => (
              <figure key={m.src} className={styles.madeItem} style={{ '--accent': m.color } as CSSProperties}>
                <img src={m.src} alt={m.label} loading="lazy" decoding="async" />
                <figcaption>{m.label}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* =============================================================== Board */}
      <section className="section">
        <div className={`container ${styles.board}`}>
          {heroPhoto && <img className={styles.boardPhoto} src={heroPhoto} alt={currentBoard.title} loading="lazy" decoding="async" />}
          <div>
            <span className="eyebrow">Board {currentBoard.years}</span>
            <h2>{currentBoard.name ? `Meet ${currentBoard.name}` : 'Meet the board'}</h2>
            <p className="lead">
              {currentBoard.members.length} students run BEST Louvain-la-Neuve this year — and they
              are the latest of a long line going back to {oldestBoard?.years.slice(0, 4)}.
            </p>
            <div className={styles.boardActions}>
              <Link to="/board" className="btn btn--primary">
                Meet the board
              </Link>
              <Link to="/board#previous-boards" className={styles.textLink}>
                Dig through {boards.length} boards <ArrowRightIcon width={18} height={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ Partners */}
      <section className={`section section--alt ${styles.partners}`}>
        <div className="container">
          <div className={styles.partnersHead}>
            <h2>Our partners</h2>
            <Link to="/partners" className={styles.textLink}>
              Work with us <ArrowRightIcon width={18} height={18} />
            </Link>
          </div>
          <div className={styles.logos}>
            {partners.map((p) => (
              <a key={p.id} href={p.url} target="_blank" rel="noreferrer" className={styles.logoTile} aria-label={p.name}>
                <PartnerLogo partner={p} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================= Network */}
      <section className="section">
        <div className={`container ${styles.network}`}>
          <Link to="/best" className={styles.networkCard}>
            <img src={asset('images/best-mark.png')} alt="" className={styles.networkMark} />
            <div>
              <h3>Part of BEST, since 1989</h3>
              <p>A European network of 85 local groups in 30 countries, connecting students, universities and companies.</p>
              <span className={styles.textLink}>
                What is BEST? <ArrowRightIcon width={16} height={16} />
              </span>
            </div>
          </Link>
          <Link to="/louvain-la-neuve" className={`${styles.networkCard} ${styles.networkPhoto}`} style={{ '--bg': `url("${asset('images/lln-grand-place.webp')}")` } as CSSProperties}>
            <div>
              <h3>Based in Louvain-la-Neuve</h3>
              <p>A city built around its university, 30 km from Brussels.</p>
              <span className={styles.textLink}>
                Discover the city <ArrowRightIcon width={16} height={16} />
              </span>
            </div>
          </Link>
        </div>
      </section>
    </>
  )
}
