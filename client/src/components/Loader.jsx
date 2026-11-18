import { motion } from 'framer-motion'

const Loader = () => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white" role="status" aria-label="Loading">
    <div className="flex flex-col items-center gap-8">
      <motion.img
        src="/logo-dark.png"
        alt="Young Media Marketing"
        className="h-12 w-auto object-contain"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="w-40 h-px bg-line overflow-hidden">
        <motion.div
          className="h-full bg-ink origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.65, 0, 0.35, 1] }}
        />
      </div>
    </div>
  </div>
)

export default Loader
