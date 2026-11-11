import { Link } from 'react-router'
import ContactBlock from '../components/ContactBlock.tsx'
import PageHero from '../components/PageHero.tsx'
import { ArrowRightIcon, CalendarIcon, EuroIcon, GlobeIcon, SchoolIcon } from '../components/Icons.tsx'
import { courseContacts, courseEditions } from '../data/courses.ts'
import { asset } from '../utils.ts'
import styles from './Pages.module.css'

const facts = [
  { icon: CalendarIcon, label: 'Duration', value: '9 to 14 days' },
  { icon: SchoolIcon, label: 'Built around', value: 'A university course' },
  { icon: EuroIcon, label: 'Fee', value: '50 € maximum' },
  { icon: GlobeIcon, label: 'Participants', value: 'Students from all over Europe' },
]

export default function SummerCourse() {
  return (
    <>
      <PageHero
        eyebrow="BEST Courses"
        title="BEST Course in Summer"
        media={<img src={asset('images/best-courses-logo.png')} alt="BEST Courses logo" />}
      >
        <p>
          BEST Courses are mini Erasmus-type experiences for students all across Europe, organised
          around a university course.
        </p>
      </PageHero>

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

          <div className={styles.split}>
            <div className={styles.prose}>
              <span className="eyebrow">BCS in Louvain-la-Neuve</span>
              <h2>Learn, travel and meet Europe</h2>
              <p>
                BEST Courses usually last between 9 and 14 days. Our course in Louvain-la-Neuve takes
                place every summer — it is a <strong>BCS (BEST Course in Summer)</strong> — while other
                Local BEST Groups organise courses all year round.
              </p>
              <p>
                The fee is kept very low — <strong>50 euros maximum</strong> — so that money never
                stops students with tight budgets from taking part.
              </p>
              <p>
                Beyond the course itself, a BCS is a chance to discover European cultures, cities and
                universities, and to meet students from every background.
              </p>
            </div>
            <img className={styles.photo} src={asset('images/bcs-group.webp')} alt="Participants of a BEST Course in Summer in Louvain-la-Neuve" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section__head">
            <span className="eyebrow">Editions</span>
            <h2>Our summer courses</h2>
          </div>
          <div className={styles.editions}>
            {courseEditions.map((e) => (
              <Link key={e.year} to={`/summer-course/${e.year}`} className={`card ${styles.edition}`}>
                <span className={styles.year}>{e.year}</span>
                <h3>BCS {e.year}</h3>
                {e.theme ? <p>{e.theme}</p> : <p>Participant resources & information</p>}
                <span className={styles.more}>
                  See the edition <ArrowRightIcon />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactBlock contacts={courseContacts} />
    </>
  )
}
