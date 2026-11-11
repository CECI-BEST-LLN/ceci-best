import { Link } from 'react-router'
import { navLinks, site } from '../data/site.ts'
import Logo from './Logo.tsx'
import styles from './Footer.module.css'

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.about}>
          <Logo light />
          <p>
            The local BEST group at {site.university}. Part of a network of 80+ technology
            universities across Europe.
          </p>
        </div>

        <div>
          <h4>Explore</h4>
          <ul>
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4>Follow us</h4>
          <ul>
            <li>
              <a href={site.socials.instagram} target="_blank" rel="noreferrer">
                Instagram
              </a>
            </li>
            <li>
              <a href={site.socials.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={site.socials.facebook} target="_blank" rel="noreferrer">
                Facebook
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4>Contact</h4>
          <ul>
            <li>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li>{site.address}</li>
          </ul>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <span>
          © {year} {site.name}
        </span>
        <span>{site.tagline}</span>
      </div>
    </footer>
  )
}
