import { Outlet, useLocation } from 'react-router-dom'
import { MotionConfig, motion, AnimatePresence } from 'framer-motion'
import { useRef, useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppButton from './WhatsAppButton'

// Silk-smooth agency easing curve
const SMOOTH_EASE = [0.16, 1, 0.3, 1]

const ROUTE_ORDER = ['/', '/about', '/services', '/portfolio', '/testimonials', '/blog', '/contact']

const getRouteIndex = pathname => {
  if (pathname.startsWith('/blog')) return ROUTE_ORDER.indexOf('/blog')
  const idx = ROUTE_ORDER.indexOf(pathname)
  return idx === -1 ? 0 : idx
}

const PublicLayout = () => {
  const { pathname } = useLocation()
  const prevPathRef = useRef(pathname)

  const prevIdx = getRouteIndex(prevPathRef.current)
  const currIdx = getRouteIndex(pathname)
  const direction = currIdx >= prevIdx ? 1 : -1

  useEffect(() => {
    prevPathRef.current = pathname
  }, [pathname])

  return (
    <MotionConfig reducedMotion="user">
      <Navbar />

      {/* Silky slim progress accent line on page change */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bar-${pathname}`}
          className="fixed left-0 right-0 z-[60] h-[2.5px] pointer-events-none"
          style={{
            top: 'var(--ym-nav-h)',
            background: 'linear-gradient(90deg, #8FA37A 0%, #B8C6A5 50%, #111111 100%)',
          }}
          initial={{ scaleX: 0, transformOrigin: direction >= 0 ? '0% 50%' : '100% 50%', opacity: 1 }}
          animate={{ scaleX: [0, 0.7, 1], opacity: [1, 1, 0] }}
          transition={{ duration: 0.5, times: [0, 0.7, 1], ease: SMOOTH_EASE }}
        />
      </AnimatePresence>

      {/* Butter-smooth page slide transition: instant mount, zero exit delay, zero blank flash */}
      <main
        className="overflow-x-clip"
        style={{
          paddingTop: 'var(--ym-nav-h)',
          minHeight: 'calc(100vh - var(--ym-nav-h))',
        }}
      >
        <motion.div
          key={pathname}
          initial={{
            opacity: 0,
            x: direction * 32,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.32,
            ease: SMOOTH_EASE,
          }}
          style={{ willChange: 'transform, opacity' }}
        >
          <Outlet />
        </motion.div>
      </main>

      <Footer />
      <WhatsAppButton />
    </MotionConfig>
  )
}

export default PublicLayout
