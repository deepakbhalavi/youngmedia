import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaInstagram, FaPlay, FaPause } from 'react-icons/fa'
import { useRef, useState } from 'react'

const reels = [
  {
    src: '/reels/kanrivo.mp4',
    title: 'Kanrivo Brand Film',
    client: 'Kanrivo',
  },
  {
    src: '/reels/reel2.mp4',
    title: 'Creative Reel',
    client: 'YoungMedia',
  },
  {
    src: '/reels/reel3.mp4',
    title: 'Social Media Reel',
    client: 'YoungMedia',
  },
  {
    src: '/reels/reel4.mp4',
    title: 'Brand Highlight',
    client: 'YoungMedia',
  },
]

const ReelCard = ({ reel, index, inView }) => {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  const toggle = () => {
    if (!videoRef.current) return
    if (playing) {
      videoRef.current.pause()
      setPlaying(false)
    } else {
      videoRef.current.play()
      setPlaying(true)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className="relative rounded-2xl overflow-hidden group cursor-pointer"
      style={{
        aspectRatio: '9/16',
        background: '#0d0d0d',
        boxShadow: '0 8px 32px rgba(123,47,247,0.25)',
        border: '1px solid rgba(168,85,247,0.2)',
      }}
      onClick={toggle}
    >
      <video
        ref={videoRef}
        src={reel.src}
        className="w-full h-full object-cover"
        loop
        playsInline
        preload="metadata"
        onEnded={() => setPlaying(false)}
      />

      {/* Overlay */}
      <div
        className="absolute inset-0 flex flex-col justify-between p-4 transition-opacity duration-300"
        style={{
          background: playing
            ? 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)'
            : 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.15) 100%)',
        }}
      >
        {/* Play / Pause button */}
        <div className="flex justify-center items-center flex-1">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              background: 'rgba(123,47,247,0.85)',
              opacity: playing ? 0 : 1,
              transform: playing ? 'scale(0.8)' : 'scale(1)',
              boxShadow: '0 0 20px rgba(123,47,247,0.6)',
            }}
          >
            {playing ? <FaPause size={18} className="text-white" /> : <FaPlay size={18} className="text-white ml-1" />}
          </div>
        </div>

        {/* Pause icon shown on hover while playing */}
        {playing && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.5)' }}>
              <FaPause size={16} className="text-white" />
            </div>
          </div>
        )}

        {/* Bottom label */}
        <div>
          <p className="text-white font-semibold text-sm">{reel.title}</p>
          <p className="text-purple-300 text-xs mt-0.5">{reel.client}</p>
        </div>
      </div>
    </motion.div>
  )
}

const InstagramGrid = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section ref={ref} className="section-sm" style={{ background: 'var(--color-bg)', transition: 'background-color 0.3s' }}>
      <div className="container-max">
        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}>
          <span className="section-label mb-5 inline-flex">✦ Our Reels</span>
          <h2 className="heading-lg text-gray-900 dark:text-white mb-4">
            Content We <span className="gradient-text">Created</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400">Real content. Real results. Check out what we've been creating.</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {reels.map((reel, i) => (
            <ReelCard key={i} reel={reel} index={i} inView={inView} />
          ))}
        </div>

        <motion.div className="text-center mt-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}>
          <a href="https://www.instagram.com/youngmedia7?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-2">
            <FaInstagram size={16} /> Follow @youngmedia
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default InstagramGrid
