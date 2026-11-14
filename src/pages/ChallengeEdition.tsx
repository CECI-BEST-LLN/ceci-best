import { useParams } from 'react-router'
import ContactBlock from '../components/ContactBlock.tsx'
import LinkList from '../components/LinkList.tsx'
import PageHero from '../components/PageHero.tsx'
import { BriefcaseIcon, CalendarIcon, ChatIcon, PinIcon } from '../components/Icons.tsx'
import OrganisingTeam from '../components/OrganisingTeam.tsx'
import { boardAt } from '../data/boards/index.ts'
import { challengeEditions, challengePhotos } from '../data/challenge.ts'
import Gallery from '../components/Gallery.tsx'
import { pageContacts } from '../data/contacts.ts'
import { partnerById } from '../data/partners.ts'
import { asset } from '../utils.ts'
import NotFound from './NotFound.tsx'
import styles from './Pages.module.css'
import PartnerLogo from '../components/PartnerLogo.tsx'

export default function ChallengeEdition() {
  const { slug } = useParams()
  const edition = challengeEditions.find((e) => e.slug === slug)
  if (!edition) return <NotFound />

  const facts = [
    { icon: CalendarIcon, label: 'Date', value: edition.dateLabel },
    { icon: PinIcon, label: 'Location', value: edition.location },
    edition.casePartner && { icon: BriefcaseIcon, label: 'Case by', value: edition.casePartner },
    edition.language && { icon: ChatIcon, label: 'Language', value: edition.language },
  ].filter((f) => !!f)

  const sponsors = (edition.sponsors ?? []).map(partnerById)

  return (
    <>
      <PageHero eyebrow="Engineering Challenge" title={edition.title} />

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

          <div className={edition.poster ? styles.split : undefined}>
            <div className={styles.prose}>
              <span className="eyebrow">Event recap</span>
              <h2>What happened?</h2>
              {edition.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {edition.details && (
                <ul className={styles.checklist}>
                  {edition.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              )}
            </div>
            {edition.poster && (
              <img
                className={styles.photo}
                style={{ aspectRatio: 'auto', maxWidth: 440, justifySelf: 'center' }}
                src={asset(edition.poster)}
                alt={`${edition.title} poster`}
                loading="lazy"
              />
            )}
          </div>

          {edition.links.length > 0 && (
            <>
              <h3 style={{ marginTop: '3.5rem' }}>Links</h3>
              <LinkList links={edition.links} />
            </>
          )}

          {challengePhotos(edition.slug).length > 0 && (
            <div style={{ marginTop: '3.5rem' }}>
              <h3 style={{ marginBottom: '1.25rem' }}>The day in pictures</h3>
              <Gallery photos={challengePhotos(edition.slug)} alt={edition.title} />
            </div>
          )}

          <OrganisingTeam board={boardAt(edition.date)} roles={pageContacts.challenge} />
        </div>
      </section>

      {sponsors.length > 0 && (
        <section className="section section--alt">
          <div className="container">
            <div className="section__head section__head--center">
              <span className="eyebrow">Thank you</span>
              <h2>Made possible by our sponsors</h2>
            </div>
            <div className={styles.logos}>
              {sponsors.map((p) =>
                p.url ? (
                  <a key={p.id} href={p.url} target="_blank" rel="noreferrer" className={styles.logoTile}>
                    <PartnerLogo partner={p} />
                  </a>
                ) : (
                  <div key={p.id} className={styles.logoTile}>
                    <PartnerLogo partner={p} />
                  </div>
                ),
              )}
            </div>
          </div>
        </section>
      )}

      <ContactBlock roles={pageContacts.challenge} />
    </>
  )
}
