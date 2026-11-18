import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const EASE_OUT = [0.22, 1, 0.36, 1]
const EASE_IN_OUT = [0.65, 0, 0.35, 1]

const Loader = ({ onFinish }) => {
  const [phase, setPhase] = useState(0) // 0=logo, 1=tagline, 2=exit

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 220)
    const t2 = setTimeout(() => setPhase(2), 780)
    const t3 = setTimeout(() => onFinish?.(), 1120)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onFinish])

  return (
    <AnimatePresence>
      {phase < 2 ? (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#111111]"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.35, ease: EASE_IN_OUT }}
          role="status"
          aria-label="Loading"
        >
          <div className="flex flex-col items-center gap-6 relative z-10">
            <motion.img
              src="/logo-light.png"
              alt="Young Media Marketing"
              className="h-14 md:h-16 w-auto object-contain"
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(6px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
            />

            <div className="w-44 h-[1px] bg-white/10 overflow-hidden rounded-full">
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #B8C6A5, #ffffff)' }}
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.65, delay: 0.05, ease: EASE_IN_OUT }}
              />
            </div>

            <motion.div
              className="overflow-hidden h-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase >= 1 ? 1 : 0 }}
              transition={{ duration: 0.25 }}
            >
              <motion.p
                className="text-white/50 text-[11px] md:text-xs tracking-[0.35em] uppercase font-light"
                initial={{ y: 12, opacity: 0 }}
                animate={phase >= 1 ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.3, ease: EASE_OUT }}
              >
                Creative Ideas • Meaningful Impact
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default Loader
