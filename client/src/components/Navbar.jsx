import { useEffect, useState, useCallback } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_LINKS, CONTACT, SOCIALS } from '../data/site'
import Arrow from './ui/Arrow'
import { EASE } from './ui/Motion'

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [portfolioInView, setPortfolioInView] = useState(false)
  const isHome = location.pathname === '/'

  // Scroll state + simple scroll-spy for the homepage portfolio section
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8)
      if (isHome) {
        const el = document.getElementById('portfolio')
        if (el) {
          const r = el.getBoundingClientRect()
          const mid = window.innerHeight * 0.4
          setPortfolioInView(r.top <= mid && r.bottom >= mid)
        }
      } else {
        setPortfolioInView(false)
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Close menu on route change
  useEffect(() => { setOpen(false) }, [location.pathname])

  const isActive = useCallback(link => {
    if (link.hash) return isHome && portfolioInView
    if (link.to === '/') return isHome && !portfolioInView
    return location.pathname === link.to || location.pathname.startsWith(`${link.to}/`)
  }, [isHome, portfolioInView, location.pathname])

  const handleClick = (e, link) => {
    const wasOpen = open
    setOpen(false)
    if (link.hash) {
      e.preventDefault()
      if (isHome) {
        const scroll = () => document.getElementById(link.hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        wasOpen ? setTimeout(scroll, 380) : scroll()
        window.history.replaceState(null, '', `/#${link.hash}`)
      } else {
        navigate({ pathname: '/', hash: `#${link.hash}` })
      }
    } else if (link.to === '/' && isHome) {
      e.preventDefault()
      window.history.replaceState(null, '', '/')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-[60] bg-white/95 backdrop-blur-md border-b transition-colors duration-500
          ${scrolled || open ? 'border-line' : 'border-line/70'}`}
        style={{ height: 'var(--ym-nav-h)' }}
      >
        <div className="ym-container h-full flex items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" onClick={e => handleClick(e, NAV_LINKS[0])} id="navbar-logo"
            className="flex items-center gap-3 flex-shrink-0" aria-label="Young Media Marketing — Home">
            <img src="/logo-dark.png" alt="Young Media Marketing" width="480" height="236"
              className="h-9 sm:h-10 w-auto object-contain" />
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Primary">
            {NAV_LINKS.map(link => {
              const active = isActive(link)
              return (
                <Link key={link.label} to={link.to} onClick={e => handleClick(e, link)}
                  aria-current={active ? 'page' : undefined}
                  className={`relative px-3 xl:px-4 py-2 text-[14px] transition-colors duration-300
                    ${active ? 'text-ink' : 'text-muted hover:text-ink'}`}>
                  {link.label}
                  {active && (
                    <motion.span layoutId="nav-dot"
                      className="absolute left-1/2 -translate-x-1/2 -bottom-0.5 w-1 h-1 rounded-full bg-ink"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link to="/contact" id="navbar-cta" className="hidden sm:inline-flex ym-btn ym-btn-dark py-2.5 px-5">
              Let&apos;s Talk <Arrow />
            </Link>
            <button
              type="button"
              onClick={() => setOpen(o => !o)}
              id="mobile-menu-toggle"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="lg:hidden relative w-11 h-11 rounded-full border border-line flex items-center justify-center hover:border-ink transition-colors"
            >
              <span className={`absolute h-px w-4 bg-ink transition-transform duration-500 ease-out-expo ${open ? 'rotate-45' : '-translate-y-[3px]'}`} />
              <span className={`absolute h-px w-4 bg-ink transition-transform duration-500 ease-out-expo ${open ? '-rotate-45' : 'translate-y-[3px]'}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 bg-white lg:hidden flex flex-col overflow-y-auto"
            style={{ paddingTop: 'var(--ym-nav-h)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <nav className="ym-container flex-1 flex flex-col justify-center py-10" aria-label="Mobile">
              {NAV_LINKS.map((link, i) => (
                <motion.div key={link.label} className="border-b border-line overflow-hidden"
                  initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.05 + i * 0.05 }}>
                  <Link to={link.to} onClick={e => handleClick(e, link)}
                    className="group flex items-baseline justify-between py-4">
                    <span className="flex items-baseline gap-4">
                      <span className="text-xs text-muted tabular-nums">0{i + 1}</span>
                      <span className={`font-display text-[2.1rem] sm:text-5xl tracking-tight leading-none ${isActive(link) ? 'text-ink' : 'text-ink/80'}`}>
                        {link.label}
                      </span>
                    </span>
                    <span className="text-xl text-muted group-hover:text-ink transition-colors"><Arrow /></span>
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div className="ym-container pb-8 flex flex-col gap-5"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <Link to="/contact" className="ym-btn ym-btn-dark w-full py-4">Let&apos;s Talk <Arrow /></Link>
              <div className="flex flex-wrap justify-between gap-3 text-sm text-muted">
                <a href={CONTACT.emailHref} className="hover:text-ink">{CONTACT.email}</a>
                <div className="flex gap-4">
                  <a href={SOCIALS.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-ink">Instagram</a>
                  <a href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-ink">LinkedIn</a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
