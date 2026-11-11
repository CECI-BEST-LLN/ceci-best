import type { ExternalLink } from '../data/types.ts'
import { ExternalIcon, FileIcon } from './Icons.tsx'
import styles from './LinkList.module.css'

/** Grid of external resources (documents, forms, events). */
export default function LinkList({ links }: { links: ExternalLink[] }) {
  return (
    <ul className={styles.list}>
      {links.map((l) => (
        <li key={l.href}>
          <a href={l.href} target="_blank" rel="noreferrer" className={styles.item}>
            <span className={styles.icon}>
              <FileIcon />
            </span>
            <span className={styles.text}>
              <strong>{l.label}</strong>
              {l.description && <small>{l.description}</small>}
            </span>
            <ExternalIcon className={styles.ext} />
          </a>
        </li>
      ))}
    </ul>
  )
}
