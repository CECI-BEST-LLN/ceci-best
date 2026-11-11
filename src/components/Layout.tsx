import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import Header from './Header.tsx'
import Footer from './Footer.tsx'

export default function Layout() {
  const { pathname } = useLocation()

  // Scroll back to top when navigating to another page.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <>
      <Header />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
