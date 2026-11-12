import { contactsFor, type Role } from '../data/boards/index.ts'
import { site } from '../data/site.ts'
import Avatar from './Avatar.tsx'
import { MailIcon } from './Icons.tsx'
import styles from './ContactBlock.module.css'

interface ContactBlockProps {
  /** Board positions to show — people are taken from the current board */
  roles: Role[]
  title?: string
  intro?: string
}

/** "Contact information" section shown at the bottom of activity pages. */
export default function ContactBlock({ roles, title = 'Contact information', intro }: ContactBlockProps) {
  const contacts = contactsFor(roles)

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
            <a key={c.email + c.role} href={`mailto:${c.email}`} className={`card ${styles.person}`}>
              <span className={styles.avatar}>
                <Avatar name={c.name} photo={c.photo} />
              </span>
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
