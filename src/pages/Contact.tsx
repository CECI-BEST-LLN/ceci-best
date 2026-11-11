import { useState, type FormEvent } from 'react'
import PageHero from '../components/PageHero.tsx'
import { MailIcon, PinIcon } from '../components/Icons.tsx'
import { site } from '../data/site.ts'
import styles from './Pages.module.css'

const subjects = ['General question', 'Partnership', 'Events', 'Joining BEST'] as const

export default function Contact() {
  const [sent, setSent] = useState(false)

  // No backend yet: opens the user's mail client with the message pre-filled.
  // Later: replace with a fetch() to an API / form service (Formspree, etc.).
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const subject = `[${data.get('subject')}] ${data.get('name')}`
    const body = `${data.get('message')}\n\n— ${data.get('name')} (${data.get('email')})`
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <>
      <PageHero eyebrow="Contact" title="Get in touch">
        <p>A question, a partnership idea or want to join? We'd love to hear from you.</p>
      </PageHero>

      <section className="section">
        <div className={`container ${styles.contactGrid}`}>
          <div>
            <h2>Let's talk</h2>
            <p className="lead">We usually answer within a few days.</p>
            <ul className={styles.infoList}>
              <li>
                <span className="icon-badge">
                  <MailIcon />
                </span>
                <span>
                  <small>Email</small>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </span>
              </li>
              <li>
                <span className="icon-badge">
                  <PinIcon />
                </span>
                <span>
                  <small>Location</small>
                  {site.address}
                </span>
              </li>
            </ul>
          </div>

          <form className={`card ${styles.form}`} onSubmit={handleSubmit}>
            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor="name">Name</label>
                <input id="name" name="name" autoComplete="name" required />
              </div>
              <div className={styles.field}>
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" autoComplete="email" required />
              </div>
            </div>
            <div className={styles.field}>
              <label htmlFor="subject">Subject</label>
              <select id="subject" name="subject">
                {subjects.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className={styles.field}>
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" required />
            </div>
            {sent && (
              <p className={styles.notice} role="status">
                Your mail app should open — just hit send!
              </p>
            )}
            <button type="submit" className="btn btn--primary">
              Send message
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
