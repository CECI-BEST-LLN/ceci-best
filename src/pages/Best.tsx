import PageHero from '../components/PageHero.tsx'
import { BriefcaseIcon, GlobeIcon, SchoolIcon, UsersIcon } from '../components/Icons.tsx'
import { site } from '../data/site.ts'
import { asset } from '../utils.ts'
import styles from './Pages.module.css'

const pillars = [
  { icon: UsersIcon, title: 'Students', text: 'Technology students eager to grow beyond their curriculum.' },
  { icon: SchoolIcon, title: 'Universities', text: 'Technical universities across Europe that host and support our events.' },
  { icon: BriefcaseIcon, title: 'Companies', text: 'Companies looking to meet and train the engineers of tomorrow.' },
]

export default function Best() {
  return (
    <>
      <PageHero
        eyebrow="About BEST"
        title="Board of European Students of Technology"
        media={<img src={asset('images/best-mark.png')} alt="" />}
      >
        <p>
          A non-profit, non-political organisation founded in 1989, with 85 Local BEST Groups in 30
          countries.
        </p>
      </PageHero>

      <section className="section">
        <div className={`container ${styles.split}`}>
          <div className={styles.prose}>
            <span className="eyebrow">Our mission</span>
            <h2>Making technology students more internationally minded</h2>
            <p>
              BEST provides communication, cooperation and exchange opportunities for students all
              over Europe. We help them become more internationally minded by developing intercultural
              understanding and the skills needed to work in a global environment.
            </p>
            <p>
              To do so, we organise academic and non-academic events — engineering competitions,
              workshops, courses and educational symposia — and help students move into the job
              market, notably through an international career centre.
            </p>
            <div className={styles.actions}>
              <a href={site.internationalUrl} target="_blank" rel="noreferrer" className="btn btn--primary">
                <GlobeIcon width={18} height={18} /> BEST International website
              </a>
            </div>
          </div>
          <img className={styles.photo} src={asset('images/bcs-group.webp')} alt="Participants of a BEST Course in Louvain-la-Neuve" loading="lazy" />
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="section__head section__head--center">
            <span className="eyebrow">Our goal</span>
            <h2>The three pillars of a successful professional journey</h2>
            <p className="lead">
              We aim to deliver high-quality services to students and to strengthen the links
              between students, universities and companies.
            </p>
          </div>
          <div className="grid">
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
    </>
  )
}
