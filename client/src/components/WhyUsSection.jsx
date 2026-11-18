import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import {
  FiZap, FiClock, FiStar, FiTarget, FiTrendingUp,
  FiUsers, FiHeart, FiMessageSquare
} from 'react-icons/fi'

const reasons = [
  { icon: FiTarget,        title: 'Strategy + Creativity',      desc: 'We combine storytelling, creativity, and marketing strategy to produce content that not only looks premium but also delivers results.' },
  { icon: FiTrendingUp,    title: 'Built for Business Growth',   desc: 'Every reel, campaign, and ad is built with a clear objective—to increase visibility, build trust, generate leads, and drive sales.' },
  { icon: FiZap,           title: 'Cinematic by Passion',        desc: 'We are creative by passion, driven by strategy, and fully focused on results that move the needle for your business.' },
  { icon: FiUsers,         title: 'Ambitious Brand Partners',    desc: 'From startups to established companies—we partner with ambitious businesses ready to stand out in a crowded digital world.' },
]

const WhyUsSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section ref={ref} className="section" style={{ background: 'var(--color-bg)', transition: 'background-color 0.3s' }}>
      <div className="container-max">
        <motion.div className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}>
          <span className="section-label mb-5 inline-flex">✦ Why Young Media?</span>
          <h2 className="heading-lg text-gray-900 dark:text-white mb-4">
            Why <span className="gradient-text">Young Media?</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We don't believe in creating content just to fill a feed. We combine storytelling, creativity, and marketing strategy to produce content that not only looks premium but also delivers results.
          </p>
          <p className="text-gray-500 dark:text-gray-500 text-sm font-semibold mt-4 tracking-wide uppercase">
            Creative by Passion. Driven by Strategy. Focused on Results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reasons.map((r, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="card-glass p-6 group">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                style={{ background: 'linear-gradient(135deg, rgba(123,47,247,0.15), rgba(192,132,252,0.06))', border: '1px solid rgba(123,47,247,0.18)' }}>
                <r.icon size={20} className="text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors" />
              </div>
              <h3 className="font-display font-semibold text-gray-900 dark:text-white text-sm mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">{r.title}</h3>
              <p className="text-gray-600 dark:text-gray-500 text-xs leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyUsSection
