import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router'
import { navLinks } from '../data/site.ts'
import Logo from './Logo.tsx'
import styles from './Header.module.css'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const close = () => setOpen(false)

  // Add a shadow once the page is scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" onClick={close} className={styles.brand} aria-label="BEST Louvain-la-Neuve — home">
          <Logo />
        </Link>

        <button
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="main-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav id="main-nav" className={`${styles.nav} ${open ? styles.open : ''}`}>
          <ul>
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  onClick={close}
                  to={link.to}
                  className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Link to="/contact" onClick={close} className="btn btn--primary">
            Contact us
          </Link>
        </nav>
      </div>
    </header>
  )
}
