import { Link } from 'react-router'
import ContactBlock from '../components/ContactBlock.tsx'
import PageHero from '../components/PageHero.tsx'
import Gallery from '../components/Gallery.tsx'
import { ArrowRightIcon, BriefcaseIcon, CalendarIcon, CoffeeIcon, CubeIcon, EuroIcon, GiftIcon, LightbulbIcon, UsersIcon } from '../components/Icons.tsx'
import PartnerLogo from '../components/PartnerLogo.tsx'
import { challengeEditions, challengePhotos } from '../data/challenge.ts'
import { partnerById } from '../data/partners.ts'
import { pageContacts } from '../data/contacts.ts'
import { asset } from '../utils.ts'
import styles from './Pages.module.css'

const latest = challengeEditions[0]
const latestPhotos = latest ? challengePhotos(latest.slug) : []
const latestPartner = latest?.casePartner ? latest.sponsors?.map(partnerById).find((p) => p.name === latest.casePartner) : undefined

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

      {/* ------------------------------------------------- Latest edition */}
      {latest && (
        <section className="section section--alt">
          <div className={`container ${styles.split}`}>
            <div className={styles.prose}>
              <span className="eyebrow">Latest edition · {latest.dateLabel}</span>
              <h2>{latest.title}</h2>
              {latest.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <dl className={styles.facts} style={{ marginTop: '2rem', marginBottom: '1.5rem' }}>
                {[
                  { icon: CalendarIcon, label: 'When', value: latest.dateLabel },
                  latest.participants && { icon: UsersIcon, label: 'Participants', value: String(latest.participants) },
                  latest.casePartner && { icon: BriefcaseIcon, label: 'Partner', value: latest.casePartner },
                ]
                  .filter((f) => !!f)
                  .map(({ icon: Icon, label, value }) => (
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
              <Link to={`/challenge/${latest.slug}`} className="btn btn--primary">
                More about this edition <ArrowRightIcon width={18} height={18} />
              </Link>
            </div>
            {latest.poster ? (
              <img className={styles.poster} src={asset(latest.poster)} alt={`${latest.title} poster`} loading="lazy" decoding="async" />
            ) : latestPhotos[1] ? (
              <figure className={styles.featurePhoto}>
                <img src={latestPhotos[1]} alt={latest.title} loading="lazy" decoding="async" />
                {latestPartner && (
                  <figcaption>
                    In partnership with <PartnerLogo partner={latestPartner} />
                  </figcaption>
                )}
              </figure>
            ) : null}
          </div>
          {latestPhotos.length > 0 && (
            <div className="container" style={{ marginTop: '3.5rem' }}>
              <h3 style={{ marginBottom: '1.25rem' }}>The day in pictures</h3>
              <Gallery photos={latestPhotos} alt={latest.title} />
            </div>
          )}
        </section>
      )}

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

      <ContactBlock roles={pageContacts.challenge} />
    </>
  )
}
