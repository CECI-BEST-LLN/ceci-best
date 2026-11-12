import styles from './Avatar.module.css'

const initials = (name: string) =>
  name
    .replace(/["“”].*?["“”]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

/** Round photo, or initials when there is no photo. */
export default function Avatar({ name, photo, size = 88 }: { name: string; photo?: string; size?: number }) {
  const style = { width: size, height: size, fontSize: size * 0.32 }
  return photo ? (
    <img className={styles.avatar} style={style} src={photo} alt="" loading="lazy" />
  ) : (
    <span className={styles.avatar} style={style} aria-hidden="true">
      {initials(name)}
    </span>
  )
}
