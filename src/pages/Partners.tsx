import ContactBlock from '../components/ContactBlock.tsx'
import PageHero from '../components/PageHero.tsx'
import { ExternalIcon } from '../components/Icons.tsx'
import { contactByRole } from '../data/board.ts'
import { partners } from '../data/partners.ts'
import { asset } from '../utils.ts'
import styles from './Pages.module.css'

const contacts = [contactByRole('FR Responsible'), contactByRole('Competitions Coordinator'), contactByRole('BCS Main Organiser')]

export default function Partners() {
  return (
    <>
      <PageHero eyebrow="Corporate relations" title="Our partners">
        <p>
          The companies that support BEST Louvain-la-Neuve and help us offer free, high-quality
          events to students.
        </p>
      </PageHero>

      <section className="section">
        <div className="container">
          {partners.map((p) => (
            <article key={p.id} className={`card ${styles.partner}`}>
              <div className={styles.partnerLogo}>
                <img src={asset(p.logo)} alt={p.name} loading="lazy" />
              </div>
              <div>
                <h3>{p.name}</h3>
                {p.description && <p>{p.description}</p>}
                {p.url && (
                  <a href={p.url} target="_blank" rel="noreferrer">
                    {p.url.replace(/^https?:\/\/(www\.)?/, '')} <ExternalIcon width={14} height={14} />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <ContactBlock
        contacts={contacts}
        title="Contact us"
        intro="A question about one of our projects, or considering sponsoring an event? Get in touch — we are always open to collaboration."
      />
    </>
  )
}
