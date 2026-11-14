import ContactBlock from '../components/ContactBlock.tsx'
import Gallery from '../components/Gallery.tsx'
import PageHero from '../components/PageHero.tsx'
import { CalendarIcon, EuroIcon, GlobeIcon, SchoolIcon } from '../components/Icons.tsx'
import { pageContacts } from '../data/contacts.ts'
import { courseEditions, courseHighlights } from '../data/courses.ts'
import { asset } from '../utils.ts'
import styles from './Pages.module.css'

const facts = [
  { icon: CalendarIcon, label: 'Duration', value: '9 to 14 days' },
  { icon: SchoolIcon, label: 'Built around', value: 'A university course' },
  { icon: EuroIcon, label: 'Fee', value: '50 € maximum' },
  { icon: GlobeIcon, label: 'Participants', value: 'Students from all over Europe' },
]

export default function SummerCourse() {
  const [latest, ...previous] = courseEditions
  const highlights = latest ? courseHighlights(latest.year) : []

  return (
    <>
      <PageHero
        eyebrow="BEST Courses"
        title="BEST Course in Summer"
        media={<img src={asset('images/best-courses-logo.png')} alt="BEST Courses logo" />}
      >
        <p>
          Every summer, BEST Louvain-la-Neuve welcomes students from all over Europe for a
          mini Erasmus-type experience organised around a university course.
        </p>
      </PageHero>

      {/* ---------------------------------------------------- What is a BCS */}
      <section className="section">
        <div className="container">
          <dl className={styles.facts}>
            {facts.map(({ icon: Icon, label, value }) => (
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

          <div className={styles.prose}>
            <span className="eyebrow">The concept</span>
            <h2>Learn, travel and meet Europe</h2>
            <p>
              BEST Courses usually last between 9 and 14 days. Ours takes place every summer in
              Louvain-la-Neuve — it is a <strong>BCS (BEST Course in Summer)</strong> — while other
              Local BEST Groups organise courses all year round.
            </p>
            <p>
              The fee is kept very low — <strong>50 euros maximum</strong> — so that money never
              stops students with tight budgets from taking part. Beyond the course itself, it is a
              chance to discover European cultures, cities and universities, and to meet students
              from every background.
            </p>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- Latest edition */}
      {latest && (
        <section className="section section--alt">
          <div className={`container ${latest.photo ? styles.split : ''}`}>
            <div className={styles.prose}>
              <span className="eyebrow">Latest edition · Summer {latest.year}</span>
              <h2>{latest.theme ?? `BCS ${latest.year}`}</h2>
              {latest.intro?.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            {latest.photo && (
              <img className={styles.photo} src={asset(latest.photo)} alt={`Participants of BCS ${latest.year}`} loading="lazy" decoding="async" />
            )}
          </div>

          {highlights.length > 0 && (
            <div className="container" style={{ marginTop: '4rem' }}>
              <div className="section__head">
                <h3 style={{ fontSize: '1.6rem' }}>What the participants built</h3>
                {latest.highlightsIntro && <p className="lead">{latest.highlightsIntro}</p>}
              </div>
              <Gallery photos={highlights} alt={`Prototype built by BCS ${latest.year} participants`} />
            </div>
          )}
        </section>
      )}

      {/* ----------------------------------------------- Previous editions */}
      {previous.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section__head">
              <span className="eyebrow">Previous editions</span>
              <h2>Before that</h2>
            </div>
            <div className={styles.pastCourses}>
              {previous.map((e) => (
                <figure key={e.year} className={styles.pastCourse}>
                  {e.photo ? (
                    <img src={asset(e.photo)} alt={`Participants of BCS ${e.year}`} loading="lazy" decoding="async" />
                  ) : (
                    <div className={styles.pastNoPhoto} aria-hidden="true">
                      {e.year}
                    </div>
                  )}
                  <figcaption>
                    <strong>BCS {e.year}</strong>
                    {e.theme && <span>{e.theme}</span>}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      <ContactBlock roles={pageContacts.summerCourse} />
    </>
  )
}
