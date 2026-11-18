import { Outlet, useLocation } from 'react-router-dom'
import { MotionConfig, motion, AnimatePresence } from 'framer-motion'
import { useRef } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppButton from './WhatsAppButton'

const EASE = [0.22, 1, 0.36, 1]
const ROUTE_ORDER = ['/', '/about', '/services', '/portfolio', '/testimonials', '/blog', '/contact']

const getRouteIndex = pathname => {
  if (pathname.startsWith('/blog')) return ROUTE_ORDER.indexOf('/blog')
  const idx = ROUTE_ORDER.indexOf(pathname)
  return idx === -1 ? 0 : idx
}

const getRouteLabel = pathname => {
  if (pathname === '/') return 'Home'
  if (pathname.startsWith('/blog')) return 'Journal'
  const clean = pathname.replace(/^\//, '').split('/')[0]
  return clean.charAt(0).toUpperCase() + clean.slice(1)
}

const PublicLayout = () => {
  const { pathname } = useLocation()
  const prevPathRef = useRef(pathname)

  const prevIdx = getRouteIndex(prevPathRef.current)
  const currIdx = getRouteIndex(pathname)
  const direction = currIdx >= prevIdx ? 1 : -1

  if (prevPathRef.current !== pathname) {
    prevPathRef.current = pathname
  }

  const label = getRouteLabel(pathname)

  return (
    <MotionConfig reducedMotion="user">
      <Navbar />

      {/* Top progress slider bar on route change */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bar-${pathname}`}
          className="fixed left-0 right-0 z-[60] h-[2px] pointer-events-none"
          style={{
            top: 'var(--ym-nav-h)',
            background: 'linear-gradient(90deg, #111111 0%, #8FA37A 50%, #B8C6A5 100%)',
            transformOrigin: direction >= 0 ? 'left' : 'right',
          }}
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: [0, 1, 1], opacity: [1, 1, 0] }}
          transition={{ duration: 0.75, times: [0, 0.6, 1], ease: EASE }}
        />
      </AnimatePresence>

      {/* Full-viewport horizontal curtain slider wipe */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`curtain-${pathname}`}
          aria-hidden="true"
          className="fixed inset-0 z-[55] pointer-events-none flex items-center justify-center"
          style={{
            background: '#111111',
            transformOrigin: direction >= 0 ? 'right' : 'left',
          }}
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: 0.65, ease: [0.65, 0, 0.35, 1] }}
        >
          <motion.span
            className="font-display text-xs uppercase tracking-[0.35em] text-white/70"
            initial={{ opacity: 0.9 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {label}
          </motion.span>
        </motion.div>
      </AnimatePresence>

      {/* Page content directional slide transition */}
      <main className="overflow-x-clip" style={{ paddingTop: 'var(--ym-nav-h)' }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pathname}
            initial={{ opacity: 0, x: direction * 72, filter: 'blur(4px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: direction * -48, filter: 'blur(3px)' }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      <WhatsAppButton />
    </MotionConfig>
  )
}

export default PublicLayout
