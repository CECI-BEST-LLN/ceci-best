import { isTomatoTarget, throwTomato } from '../easter/tomato.ts'
import type { BoardMember } from '../data/boards/index.ts'
import Avatar from './Avatar.tsx'
import styles from './MemberGrid.module.css'

interface Props {
  members: BoardMember[]
  /** Show mailto links (only for the current board) */
  showEmails?: boolean
}

/** Grid of member cards: portrait photo (or initials), name, role. */
export default function MemberGrid({ members, showEmails = false }: Props) {
  return (
    <div className={styles.grid}>
      {members.map((m) => (
        <article key={m.slug} className={styles.member} onClick={isTomatoTarget(m.slug) ? throwTomato : undefined}>
          <div className={styles.photoWrap}>
            {m.photo ? (
              <img className={styles.photo} src={m.photo} alt={m.name} width={400} height={450} loading="lazy" decoding="async" />
            ) : (
              <div className={styles.noPhoto}>
                <Avatar name={m.name} size={88} />
              </div>
            )}
          </div>
          <div className={styles.body}>
            <h3>{m.name}</h3>
            {m.hasKnownRole && <p className={styles.role}>{m.roleLabel}</p>}
            {showEmails && m.email && (
              <a className={styles.mail} href={`mailto:${m.email}`}>
                {m.email}
              </a>
            )}
          </div>
        </article>
      ))}
    </div>
  )
}
