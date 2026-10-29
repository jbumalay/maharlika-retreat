import { useEffect, useState } from 'react'
import { PageShell } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { RoomsPage } from './pages/RoomsPage'
import { RoomDetailPage } from './pages/RoomDetailPage'
import { ContactPage } from './pages/ContactPage'

function locationState() {
  return { path: window.location.pathname, query: new URLSearchParams(window.location.search) }
}

export default function App() {
  const [location, setLocation] = useState(locationState)

  useEffect(() => {
    function update() {
      setLocation(locationState())
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
    window.addEventListener('popstate', update)
    return () => window.removeEventListener('popstate', update)
  }, [])

  function navigate(target: string) {
    const [pathWithQuery, hash] = target.split('#')
    const targetUrl = new URL(pathWithQuery || '/', window.location.origin)
    const current = `${window.location.pathname}${window.location.search}`
    const next = `${targetUrl.pathname}${targetUrl.search}`
    if (current !== next) window.history.pushState({}, '', `${next}${hash ? `#${hash}` : ''}`)
    setLocation({ path: targetUrl.pathname, query: targetUrl.searchParams })
    requestAnimationFrame(() => {
      if (hash) document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
      else window.scrollTo({ top: 0, behavior: 'auto' })
    })
  }

  let page
  if (location.path === '/') page = <HomePage navigate={navigate} />
  else if (location.path === '/rooms') page = <RoomsPage navigate={navigate} />
  else if (location.path.startsWith('/rooms/')) {
    const slug = location.path.split('/').pop() ?? ''
    page = <RoomDetailPage navigate={navigate} slug={slug} />
  }
  else if (location.path === '/contact') page = <ContactPage navigate={navigate} query={location.query} />
  else page = (
    <section className="not-found section-shell">
      <p className="context-line">404</p>
      <h1>This path leads away from the garden.</h1>
      <button className="button button--primary" onClick={() => navigate('/')}>Return home</button>
    </section>
  )

  useEffect(() => {
    const titles: Record<string, string> = {
      '/': 'Casa Amihan — A fictional tropical retreat',
      '/rooms': 'Rooms — Casa Amihan',
      '/rooms/garden-suite': 'Garden Suite — Casa Amihan',
      '/rooms/canopy-room': 'Canopy Room — Casa Amihan',
      '/rooms/open-air-villa': 'Open-Air Villa — Casa Amihan',
      '/contact': 'Stay inquiry — Casa Amihan',
    }
    document.title = titles[location.path] ?? 'Page not found — Casa Amihan'
  }, [location.path])

  return <PageShell path={location.path} navigate={navigate}>{page}</PageShell>
}
