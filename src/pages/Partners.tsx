import { Link } from 'react-router'
import PageHero from '../components/PageHero.tsx'
import { BriefcaseIcon, GlobeIcon, UsersIcon } from '../components/Icons.tsx'
import { partners } from '../data/partners.ts'
import styles from './Pages.module.css'

const benefits = [
  {
    icon: UsersIcon,
    title: 'Talent',
    text: 'Meet motivated engineering students from UCLouvain and across Europe.',
  },
  {
    icon: BriefcaseIcon,
    title: 'Employer branding',
    text: 'Showcase your company through workshops, case studies and company visits.',
  },
  {
    icon: GlobeIcon,
    title: 'European reach',
    text: 'Tap into a network of 80+ technology universities in 30+ countries.',
  },
]

export default function Partners() {
  return (
    <>
      <PageHero eyebrow="Corporate relations" title="Partner with BEST">
        <p>
          We work with companies that want to connect with the engineers of tomorrow. Let's find the
          collaboration that fits you.
        </p>
      </PageHero>

      <section className="section">
        <div className="container">
          <div className="section__head">
            <span className="eyebrow">Why partner with us</span>
            <h2>What we can do together</h2>
          </div>
          <div className="grid">
            {benefits.map(({ icon: Icon, title, text }) => (
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

      <section className="section section--alt">
        <div className="container">
          <div className="section__head section__head--center">
            <span className="eyebrow">They trust us</span>
            <h2>Our partners</h2>
          </div>
          <div className={styles.logos}>
            {partners.map((p) => {
              const content = p.logo ? (
                <img src={`${import.meta.env.BASE_URL}${p.logo}`} alt={p.name} loading="lazy" />
              ) : (
                p.name
              )
              return p.url ? (
                <a key={p.name} className={styles.logoTile} href={p.url} target="_blank" rel="noreferrer">
                  {content}
                </a>
              ) : (
                <div key={p.name} className={styles.logoTile}>
                  {content}
                </div>
              )
            })}
          </div>
          <p style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/contact" className="btn btn--primary">
              Become a partner
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}
