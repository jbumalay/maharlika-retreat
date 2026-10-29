import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react'

export type Navigate = (path: string) => void

export function AppLink({
  href,
  navigate,
  className = '',
  children,
  onClick,
  current,
  id,
}: {
  href: string
  navigate: Navigate
  className?: string
  children: ReactNode
  onClick?: () => void
  current?: boolean
  id?: string
}) {
  function follow(event: MouseEvent<HTMLAnchorElement>) {
    if (!event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
      event.preventDefault()
      navigate(href)
      onClick?.()
    }
  }
  return (
    <a href={href} onClick={follow} className={className} id={id} aria-current={current ? 'page' : undefined}>
      {children}
    </a>
  )
}

export function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

export function ButtonLink({
  href,
  navigate,
  children,
  variant = 'primary',
}: {
  href: string
  navigate: Navigate
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'light'
}) {
  return (
    <AppLink href={href} navigate={navigate} className={`button button--${variant}`}>
      <span>{children}</span>
      <ArrowIcon />
    </AppLink>
  )
}

export function SiteHeader({ path, navigate }: { path: string; navigate: Navigate }) {
  const [open, setOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.body.classList.toggle('no-scroll', open)
    if (!open) return

    const container = menuRef.current
    const first = container?.querySelector<HTMLElement>('a[href], button:not([disabled])')
    first?.focus()

    function onKeydown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
        requestAnimationFrame(() => menuButton.current?.focus())
        return
      }
      if (event.key !== 'Tab' || !container) return
      const focusable = Array.from(
        container.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'),
      )
      if (focusable.length === 0) return
      const firstEl = focusable[0]
      const lastEl = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === firstEl) {
        event.preventDefault()
        lastEl.focus()
      } else if (!event.shiftKey && document.activeElement === lastEl) {
        event.preventDefault()
        firstEl.focus()
      }
    }

    window.addEventListener('keydown', onKeydown)
    return () => {
      window.removeEventListener('keydown', onKeydown)
      document.body.classList.remove('no-scroll')
    }
  }, [open])

  useEffect(() => setOpen(false), [path])

  function closeMenu() {
    setOpen(false)
    requestAnimationFrame(() => menuButton.current?.focus())
  }

  const isHome = path === '/'
  return (
    <header className={`site-header ${isHome ? 'site-header--overlay' : ''}`}>
      <div className="header-inner">
        <AppLink href="/" navigate={navigate} className="wordmark" current={isHome}>
          Casa Amihan
        </AppLink>
        <nav className="desktop-nav" aria-label="Main navigation">
          <AppLink href="/rooms" navigate={navigate} current={path.startsWith('/rooms')}>
            Rooms
          </AppLink>
          <AppLink href="/#experiences" navigate={navigate}>
            The Rhythm
          </AppLink>
          <AppLink href="/contact" navigate={navigate} current={path === '/contact'}>
            Contact
          </AppLink>
        </nav>
        <div className="header-action">
          <AppLink href="/contact" navigate={navigate} className="text-action">
            Plan your stay <ArrowIcon />
          </AppLink>
        </div>
        <button
          ref={menuButton}
          className={`menu-toggle${open ? ' is-open' : ''}`}
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>
      <div
        ref={menuRef}
        id="mobile-menu"
        className={`mobile-menu${open ? ' is-open' : ''}`}
        aria-hidden={!open}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-wordmark"
        onClick={(event) => {
          if (event.target === event.currentTarget) closeMenu()
        }}
      >
        <AppLink href="/" navigate={navigate} className="wordmark mobile-menu-wordmark" id="mobile-menu-wordmark" current={path === '/'}>
          Casa Amihan
        </AppLink>
        <nav aria-label="Mobile navigation">
          <a
            href="/rooms"
            onClick={(event) => {
              event.preventDefault()
              navigate('/rooms')
            }}
          >
            Rooms
          </a>
          <AppLink href="/#experiences" navigate={navigate}>
            The Rhythm
          </AppLink>
          <AppLink href="/contact" navigate={navigate}>
            Contact
          </AppLink>
          <AppLink href="/contact" navigate={navigate} className="button button--light">
            <span>Plan your stay</span>
            <ArrowIcon />
          </AppLink>
        </nav>
      </div>
    </header>
  )
}

export function Breadcrumb({
  items,
  navigate,
}: {
  items: { label: string; href?: string }[]
  navigate: Navigate
}) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <ol>
        {items.map((item, index) => (
          <li key={item.label}>
            {item.href ? <AppLink href={item.href} navigate={navigate}>{item.label}</AppLink> : <span aria-current="page">{item.label}</span>}
            {index < items.length - 1 && <span aria-hidden="true">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export function SiteFooter({ navigate }: { navigate: Navigate }) {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <AppLink href="/" navigate={navigate} className="wordmark">Casa Amihan</AppLink>
          <p>A quiet tropical retreat imagined for the Philippine coast.</p>
        </div>
        <nav aria-label="Footer navigation">
          <p className="footer-label">Explore</p>
          <AppLink href="/" navigate={navigate}>Home</AppLink>
          <AppLink href="/rooms" navigate={navigate}>Rooms</AppLink>
          <AppLink href="/contact" navigate={navigate}>Make an inquiry</AppLink>
        </nav>
        <nav aria-label="Room links">
          <p className="footer-label">Rooms</p>
          <AppLink href="/rooms/garden-suite" navigate={navigate}>Garden Suite</AppLink>
          <AppLink href="/rooms/canopy-room" navigate={navigate}>Canopy Room</AppLink>
          <AppLink href="/rooms/open-air-villa" navigate={navigate}>Open-Air Villa</AppLink>
        </nav>
      </div>
      <div className="footer-base">
        <p>Casa Amihan is a fictional concept project. No property or booking service is represented.</p>
        <p>Designed as a portfolio prototype.</p>
      </div>
    </footer>
  )
}

export function PageShell({
  path,
  navigate,
  children,
}: {
  path: string
  navigate: Navigate
  children: ReactNode
}) {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader path={path} navigate={navigate} />
      <main id="main">{children}</main>
      <SiteFooter navigate={navigate} />
    </>
  )
}
