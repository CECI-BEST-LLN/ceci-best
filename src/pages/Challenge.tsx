import { Link } from 'react-router'
import ContactBlock from '../components/ContactBlock.tsx'
import PageHero from '../components/PageHero.tsx'
import { ArrowRightIcon, CoffeeIcon, CubeIcon, EuroIcon, GiftIcon, LightbulbIcon, UsersIcon } from '../components/Icons.tsx'
import { challengeContacts, challengeEditions } from '../data/challenge.ts'
import { asset } from '../utils.ts'
import styles from './Pages.module.css'

const formats = [
  {
    icon: LightbulbIcon,
    title: 'Case Study',
    text: 'Teams develop and present realistic solutions to a hypothetical but practical problem.',
  },
  {
    icon: CubeIcon,
    title: 'Innovative Design',
    text: 'Participants imagine — or build — a functional prototype based on given specifications.',
  },
]

const facts = [
  { icon: EuroIcon, label: 'Price', value: 'Completely free' },
  { icon: UsersIcon, label: 'Teams', value: '4 students' },
  { icon: GiftIcon, label: 'Rewards', value: 'Prizes for the best teams' },
  { icon: CoffeeIcon, label: 'All day', value: 'Food & drinks provided' },
]

export default function Challenge() {
  return (
    <>
      <PageHero
        eyebrow="Competition"
        title="Engineering Challenge"
        media={<img src={asset('images/ec-logo.png')} alt="Engineering Challenge logo" />}
      >
        <p>
          A student competition in Louvain-la-Neuve where teams solve real-world engineering problems
          in a limited time. Free, student-run, and all about creativity, teamwork and technical
          thinking.
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

          <div className="section__head">
            <span className="eyebrow">Two challenges</span>
            <h2>Pick your format</h2>
            <p className="lead">
              Open to all students interested in problem-solving, technology and innovation.
            </p>
          </div>
          <div className="grid">
            {formats.map(({ icon: Icon, title, text }) => (
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

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section__head">
            <span className="eyebrow">Previous editions</span>
            <h2>Look back</h2>
          </div>
          <div className={styles.editions}>
            {challengeEditions.map((e) => (
              <Link key={e.slug} to={`/challenge/${e.slug}`} className={`card ${styles.edition}`}>
                <span className={styles.year}>{e.slug}</span>
                <h3>{e.title}</h3>
                <p>
                  {e.dateLabel}
                  {e.casePartner && ` · Case by ${e.casePartner}`}
                </p>
                <span className={styles.more}>
                  See the edition <ArrowRightIcon />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactBlock contacts={challengeContacts} />
    </>
  )
}
