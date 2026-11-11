import { Link } from 'react-router'
import styles from './Pages.module.css'

export default function NotFound() {
  return (
    <section className={`container ${styles.notFound}`}>
      <div className={styles.code}>404</div>
      <h1 style={{ fontSize: '2rem' }}>Page not found</h1>
      <p className="lead">The page you're looking for doesn't exist or has moved.</p>
      <Link to="/" className="btn btn--primary">
        Back to home
      </Link>
    </section>
  )
}
