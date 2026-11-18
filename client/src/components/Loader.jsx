import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const EASE_OUT = [0.22, 1, 0.36, 1]
const EASE_IN_OUT = [0.65, 0, 0.35, 1]

const Loader = ({ onFinish }) => {
  const [phase, setPhase] = useState(0) // 0=logo, 1=tagline, 2=exit

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600)
    const t2 = setTimeout(() => setPhase(2), 2000)
    const t3 = setTimeout(() => onFinish?.(), 2800)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onFinish])

  return (
    <AnimatePresence>
      {phase < 2 ? (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#111111]"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.8, ease: EASE_IN_OUT }}
          role="status"
          aria-label="Loading"
        >
          {/* Ambient glow orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(184,198,165,0.15) 0%, transparent 70%)' }}
              animate={{ scale: [1, 1.3, 1], x: [0, 30, 0], y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(184,198,165,0.1) 0%, transparent 70%)' }}
              animate={{ scale: [1.2, 1, 1.2], x: [0, -20, 0], y: [0, 15, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          <div className="flex flex-col items-center gap-8 relative z-10">
            {/* Logo */}
            <motion.img
              src="/logo-light.png"
              alt="Young Media Marketing"
              className="h-14 md:h-16 w-auto object-contain"
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1, ease: EASE_OUT }}
            />

            {/* Animated progress bar */}
            <div className="w-48 h-[1px] bg-white/10 overflow-hidden rounded-full">
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #B8C6A5, #ffffff)' }}
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.8, delay: 0.2, ease: EASE_IN_OUT }}
              />
            </div>

            {/* Tagline - letter by letter */}
            <motion.div
              className="overflow-hidden h-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase >= 1 ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.p
                className="text-white/50 text-[11px] md:text-xs tracking-[0.35em] uppercase font-light"
                initial={{ y: 20, opacity: 0 }}
                animate={phase >= 1 ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.7, ease: EASE_OUT }}
              >
                Creative Ideas • Meaningful Impact
              </motion.p>
            </motion.div>
          </div>

          {/* Corner flourishes */}
          <motion.div
            className="absolute top-8 left-8 w-8 h-8 border-t border-l border-white/10"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: EASE_OUT }}
          />
          <motion.div
            className="absolute bottom-8 right-8 w-8 h-8 border-b border-r border-white/10"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: EASE_OUT }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default Loader
