import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const EASE_OUT = [0.22, 1, 0.36, 1]
const EASE_IN_OUT = [0.76, 0, 0.24, 1]
const LOGO = '/logo-intro.png'

/**
 * Brand intro:
 * 1. Logo wipes in left→right with a 3D tilt that settles flat
 * 2. A light sheen sweeps across the logo surface (masked to the logo shape)
 * 3. Screen splits open (top/bottom panels) revealing the website underneath
 */
const Loader = ({ onReveal, onFinish }) => {
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => { setExiting(true); onReveal?.() }, 1500)
    const t2 = setTimeout(() => onFinish?.(), 2150)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onReveal, onFinish])

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none" role="status" aria-label="Loading Young Media">
      {/* Split panels */}
      <motion.div
        className="absolute inset-x-0 top-0 h-1/2 bg-[#0B0B0B]"
        animate={exiting ? { y: '-100%' } : { y: 0 }}
        transition={{ duration: 0.65, ease: EASE_IN_OUT }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-[#0B0B0B]"
        animate={exiting ? { y: '100%' } : { y: 0 }}
        transition={{ duration: 0.65, ease: EASE_IN_OUT }}
      />

      {/* Logo stage */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ perspective: 900 }}
        animate={exiting ? { opacity: 0, scale: 1.12, filter: 'blur(6px)' } : { opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.4, ease: EASE_OUT }}
      >
        {/* Soft sage glow behind logo */}
        <motion.div
          className="absolute w-[420px] h-[420px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(184,198,165,0.22) 0%, transparent 65%)' }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: EASE_OUT }}
        />

        <motion.div
          className="relative w-[220px] sm:w-[280px] md:w-[320px] aspect-[490/246]"
          initial={{ rotateX: 35, rotateY: -25, scale: 0.8, clipPath: 'inset(0 100% 0 0)' }}
          animate={{ rotateX: 0, rotateY: 0, scale: 1, clipPath: 'inset(0 0% 0 0)' }}
          transition={{ duration: 0.85, ease: EASE_OUT }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <img src={LOGO} alt="Young Media Marketing" className="absolute inset-0 w-full h-full object-contain select-none" draggable="false" />

          {/* Sheen masked to the logo shape */}
          <div
            aria-hidden="true"
            className="absolute inset-0 overflow-hidden"
            style={{
              WebkitMaskImage: `url(${LOGO})`, maskImage: `url(${LOGO})`,
              WebkitMaskSize: 'contain', maskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center', maskPosition: 'center',
            }}
          >
            <motion.div
              className="absolute inset-y-0 w-1/2"
              style={{ background: 'linear-gradient(100deg, transparent 0%, rgba(255,255,255,0.95) 50%, transparent 100%)' }}
              initial={{ x: '-120%' }}
              animate={{ x: '260%' }}
              transition={{ duration: 0.7, delay: 0.7, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>

        {/* Underline + wordmark */}
        <motion.div
          className="mt-8 h-px w-40 origin-center"
          style={{ background: 'linear-gradient(90deg, transparent, #B8C6A5, transparent)' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.55, ease: EASE_OUT }}
        />
        <motion.p
          className="mt-4 text-[10px] sm:text-[11px] uppercase tracking-[0.45em] text-white/55"
          initial={{ opacity: 0, y: 8, letterSpacing: '0.2em' }}
          animate={{ opacity: 1, y: 0, letterSpacing: '0.45em' }}
          transition={{ duration: 0.6, delay: 0.75, ease: EASE_OUT }}
        >
          Young Media
        </motion.p>
      </motion.div>
    </div>
  )
}

export default Loader
