import { useParams } from 'react-router'
import ContactBlock from '../components/ContactBlock.tsx'
import LinkList from '../components/LinkList.tsx'
import PageHero from '../components/PageHero.tsx'
import OrganisingTeam from '../components/OrganisingTeam.tsx'
import { boardAt } from '../data/boards/index.ts'
import { pageContacts } from '../data/contacts.ts'
import { courseEditions } from '../data/courses.ts'
import { asset } from '../utils.ts'
import NotFound from './NotFound.tsx'
import styles from './Pages.module.css'

export default function SummerCourseEdition() {
  const { year } = useParams()
  const edition = courseEditions.find((e) => e.year === year)
  if (!edition) return <NotFound />

  return (
    <>
      <PageHero eyebrow="BEST Course in Summer" title={`BCS ${edition.year}`}>
        {edition.theme ? (
          <p>
            <strong>“{edition.theme}”</strong>
            {edition.teacher && <> — a course taught by {edition.teacher}.</>}
          </p>
        ) : (
          <p>
            Mini Erasmus-type experience in Louvain-la-Neuve, organised around a university course,
            for students from all over Europe.
          </p>
        )}
      </PageHero>

      {(edition.intro || edition.photo) && (
        <section className="section">
          <div className={`container ${edition.intro && edition.photo ? styles.split : ''}`}>
            {edition.intro && (
              <div className={styles.prose}>
                <span className="eyebrow">About the course</span>
                <h2>This year's edition</h2>
                {edition.intro.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            )}
            {edition.photo && (
              <img className={`${styles.photo} ${edition.intro ? '' : styles.photoWide}`} src={asset(edition.photo)} alt={`BCS participants`} loading="lazy" />
            )}
          </div>
        </section>
      )}

      <section className="section" style={edition.intro || edition.photo ? { paddingTop: 0 } : undefined}>
        <div className="container">
          <div className="section__head">
            <span className="eyebrow">Participant corner</span>
            <h2>Useful resources</h2>
          </div>
          <LinkList links={edition.resources} />
          <OrganisingTeam board={boardAt(edition.year)} roles={pageContacts.summerCourse} />
        </div>
      </section>

      <ContactBlock roles={pageContacts.summerCourse} />
    </>
  )
}
