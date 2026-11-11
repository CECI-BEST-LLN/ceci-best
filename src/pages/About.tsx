import { Link } from 'react-router'
import PageHero from '../components/PageHero.tsx'
import { GlobeIcon, UsersIcon, SparkIcon } from '../components/Icons.tsx'
import styles from './Pages.module.css'

// TODO: placeholder content — rewrite with the real BEST LLN story.
const values = [
  { icon: GlobeIcon, title: 'International', text: 'We bring students from all over Europe together.' },
  { icon: UsersIcon, title: 'Friendship', text: 'BEST is first and foremost a group of friends who love what they do.' },
  { icon: SparkIcon, title: 'Learning by doing', text: 'Every event is organised by students, for students.' },
]

export default function About() {
  return (
    <>
      <PageHero eyebrow="About us" title="Who we are">
        <p>
          BEST (Board of European Students of Technology) is a non-profit, non-political student
          organisation present at more than 80 universities in over 30 countries.
        </p>
      </PageHero>

      <section className="section">
        <div className={`container ${styles.split}`}>
          <div>
            <span className="eyebrow">BEST Louvain-la-Neuve</span>
            <h2>Our local group at UCLouvain</h2>
            <p className="lead">
              Since our creation, we have welcomed hundreds of students to Louvain-la-Neuve and sent
              just as many to discover the rest of Europe.
            </p>
            <ul className={styles.checklist}>
              <li>Organise international BEST Courses in Louvain-la-Neuve</li>
              <li>Host the local round of the EBEC engineering competition</li>
              <li>Connect students with companies through career events</li>
              <li>Help members develop soft skills by running real projects</li>
            </ul>
          </div>
          <div className={styles.visual}>Photo placeholder</div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="section__head section__head--center">
            <span className="eyebrow">Our values</span>
            <h2>What drives us</h2>
          </div>
          <div className="grid">
            {values.map(({ icon: Icon, title, text }) => (
              <article key={title} className="card">
                <div className="icon-badge">
                  <Icon />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/team" className="btn btn--primary">
              Meet the team
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}
