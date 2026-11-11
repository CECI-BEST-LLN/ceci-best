import { site } from '../data/site.ts'
import type { Contact } from '../data/types.ts'
import { asset } from '../utils.ts'
import { MailIcon } from './Icons.tsx'
import styles from './ContactBlock.module.css'

interface ContactBlockProps {
  contacts: Contact[]
  title?: string
  intro?: string
}

const initials = (name: string) =>
  name
    .replace(/".*?"/g, '')
    .split(/\s+/)
    .filter(Boolean)
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

/** "Contact information" section shown at the bottom of activity pages. */
export default function ContactBlock({ contacts, title = 'Contact information', intro }: ContactBlockProps) {
  return (
    <section className="section section--alt">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">Questions?</span>
          <h2>{title}</h2>
          {intro && <p className="lead">{intro}</p>}
        </div>

        <div className={styles.grid}>
          <a href={`mailto:${site.email}`} className={`card ${styles.general}`}>
            <span className="icon-badge">
              <MailIcon />
            </span>
            <strong>LLN Board</strong>
            <span className={styles.email}>{site.email}</span>
          </a>

          {contacts.map((c) => (
            <a key={c.email} href={`mailto:${c.email}`} className={`card ${styles.person}`}>
              {c.photo ? (
                <img src={asset(c.photo)} alt="" className={styles.avatar} loading="lazy" />
              ) : (
                <span className={styles.avatar} aria-hidden="true">
                  {initials(c.name)}
                </span>
              )}
              <strong>{c.name}</strong>
              <span className={styles.role}>{c.role}</span>
              <span className={styles.email}>{c.email}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
