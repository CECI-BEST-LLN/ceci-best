import styles from './Logo.module.css'

// Placeholder logo — swap the mark for the official BEST logo (SVG in /public).
export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className={`${styles.logo} ${light ? styles.light : ''}`}>
      <span className={styles.mark} aria-hidden="true">
        B
      </span>
      <span className={styles.text}>
        <strong>BEST</strong>
        <span>Louvain-la-Neuve</span>
      </span>
    </span>
  )
}
