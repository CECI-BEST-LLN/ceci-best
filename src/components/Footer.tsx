import { Link } from 'react-router'
import { navItems, site } from '../data/site.ts'
import { asset } from '../utils.ts'
import { FacebookIcon, InstagramIcon, LinkedinIcon, MailIcon } from './Icons.tsx'
import styles from './Footer.module.css'

const year = new Date().getFullYear()

const socials = [
  { label: 'Facebook', href: site.socials.facebook, Icon: FacebookIcon },
  { label: 'Instagram', href: site.socials.instagram, Icon: InstagramIcon },
  { label: 'LinkedIn', href: site.socials.linkedin, Icon: LinkedinIcon },
]

// Footer columns: dropdown groups from the main nav, plus an "Explore" column for single links.
const groups = navItems.filter((i) => i.children)
const singles = [
  ...navItems.filter((i) => !i.children).map((i) => ({ label: i.label === 'BEST' ? 'About BEST' : i.label, to: i.to! })),
  { label: 'Louvain-la-Neuve', to: '/louvain-la-neuve' },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.about}>
          <div className={styles.brand}>
            <img src={asset('images/best-mark.png')} alt="" width={44} height={44} />
            <span>
              <strong>BEST</strong>
              Louvain-la-Neuve
            </span>
          </div>
          <p>
            The local BEST group at UCLouvain — part of a European network of technology students
            since 1989.
          </p>
          <div className={styles.socials}>
            {socials.map(({ label, href, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4>Explore</h4>
          <ul>
            {singles.map((l) => (
              <li key={l.to}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {groups.map((g) => (
          <div key={g.label}>
            <h4>{g.label}</h4>
            <ul>
              {g.children!.map((c) => (
                <li key={c.to}>
                  <Link to={c.to}>{c.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={`container ${styles.contact}`}>
        <a href={`mailto:${site.email}`} className={styles.mail}>
          <MailIcon /> {site.email}
        </a>
      </div>

      <div className={`container ${styles.bottom}`}>
        <span>
          © {year} {site.legalName}
        </span>
        <span>{site.tagline}</span>
      </div>
    </footer>
  )
}
