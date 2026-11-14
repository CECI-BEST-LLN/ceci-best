import { Suspense, useEffect } from 'react'
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
        {/* Pages are lazy-loaded: keep the space while the chunk downloads. */}
        <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
