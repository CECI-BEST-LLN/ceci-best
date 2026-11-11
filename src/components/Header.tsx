import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { navItems, type NavItem } from '../data/site.ts'
import { ChevronDownIcon } from './Icons.tsx'
import Logo from './Logo.tsx'
import styles from './Header.module.css'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const close = () => {
    setOpen(false)
    // Drop focus so hover/focus-driven dropdowns close after a click.
    ;(document.activeElement as HTMLElement | null)?.blur()
  }

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
          <Logo height={46} />
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

        <nav id="main-nav" className={`${styles.nav} ${open ? styles.open : ''}`} aria-label="Main">
          <ul className={styles.menu}>
            {navItems.map((item) => (
              <li key={item.label} className={item.children ? styles.hasDropdown : undefined}>
                {item.children ? (
                  <Dropdown item={item} onNavigate={close} />
                ) : (
                  <NavLink
                    to={item.to!}
                    onClick={close}
                    className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
                  >
                    {item.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

function Dropdown({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  const { pathname } = useLocation()
  const children = item.children ?? []
  const isActive = children.some((c) => pathname === c.to || pathname.startsWith(`${c.to}/`))

  return (
    <>
      <button type="button" className={`${styles.link} ${isActive ? styles.active : ''}`} aria-haspopup="true">
        {item.label}
        <ChevronDownIcon className={styles.chevron} />
      </button>
      <ul className={styles.dropdown}>
        {children.map((c) => (
          <li key={c.to}>
            <NavLink
              to={c.to}
              end
              onClick={onNavigate}
              className={({ isActive }) => `${styles.dropLink} ${isActive ? styles.dropActive : ''}`}
            >
              {c.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  )
}
