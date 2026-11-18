import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiPlay } from 'react-icons/fi'

const VideoHero = () => {

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Video background */}
      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'brightness(0.45) saturate(1.1)' }}
      >
        <source src="https://cdn.pixabay.com/video/2024/05/14/212077_large.mp4" type="video/mp4" />
        {/* Fallback video */}
        <source src="https://cdn.mixkit.co/videos/preview/mixkit-digital-animation-of-a-glowing-purple-network-45-large.mp4" type="video/mp4" />
      </video>

      {/* Overlay gradients */}
      <div className="video-overlay absolute inset-0 z-10" />
      <div className="absolute inset-0 z-10"
        style={{ background: 'radial-gradient(ellipse at center, rgba(104,40,232,0.1) 0%, transparent 70%)' }} />
      <div className="grid-pattern absolute inset-0 z-10 opacity-20" />

      {/* Glow orbs */}
      <div className="orb orb-purple w-80 h-80 top-1/4 left-1/4 z-10 opacity-20 animate-orb-float" />
      <div className="orb orb-orange w-64 h-64 bottom-1/4 right-1/4 z-10 opacity-15 animate-orb-float" style={{ animationDelay: '2s' }} />


      {/* Content */}
      <div className="container-max relative z-20 px-4 md:px-8 text-center pt-24 pb-20">

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="mb-6">
          <span className="section-label" style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff' }}>✦ Digital Marketing • Ad Films • Content Production • Brand Strategy</span>
        </motion.div>

        <motion.h1
          className="heading-xl text-white mb-6 max-w-5xl mx-auto text-balance"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          We Don't Just Create Content.{' '}
          <span className="gradient-text">We Create Growth.</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.82)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          Your audience scrolls every second. We make sure they stop, watch, and remember your brand.
        </motion.p>

        <motion.div className="flex flex-wrap gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}>
          <Link to="/contact" className="btn-primary text-base px-8 py-4">
            Let's Grow Together <FiArrowRight />
          </Link>
          <Link to="/portfolio" className="btn-outline text-base px-8 py-4">
            <FiPlay /> View Our Work
          </Link>
        </motion.div>


      </div>

      {/* Scroll indicator */}
      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}>
        <span className="text-xs tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.45)' }}>Scroll</span>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-10" style={{ background: 'linear-gradient(to bottom, var(--color-purple), transparent)' }} />
      </motion.div>
    </section>
  )
}

export default VideoHero
