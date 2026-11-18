import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

const steps = [
  { n: '01', title: 'Discover',  desc: 'We understand your brand, audience, competitors, and business goals.',                                                                  color: '#7B2FF7' },
  { n: '02', title: 'Create',   desc: 'We plan, shoot, design, and edit content that reflects your brand and captures attention.',                                              color: '#8B4FFF' },
  { n: '03', title: 'Launch',   desc: 'We publish and promote your content through the right channels using proven marketing strategies.',                                       color: '#A97BFF' },
  { n: '04', title: 'Scale',    desc: 'We analyze performance, optimize campaigns, and continuously improve to help your business grow.',                                       color: '#C084FC' },
]

const ProcessSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section ref={ref} className="section" style={{ background: 'var(--color-bg-alt)', transition: 'background-color 0.3s' }}>
      <div className="container-max">
        <motion.div className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}>
          <span className="section-label mb-5 inline-flex">✦ How We Work</span>
          <h2 className="heading-lg text-gray-900 dark:text-white mb-4">
            Our <span className="gradient-text">Process</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            From discovery to scale — a simple, proven 4-step workflow that delivers real business growth.
          </p>
        </motion.div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="process-step group">

              {/* Step number */}
              <div className="flex items-start justify-between mb-5">
                <span className="font-display font-bold text-4xl leading-none"
                  style={{ color: step.color, opacity: 0.25, transition: 'opacity 0.3s' }}
                  onMouseEnter={e => e.target.style.opacity = '0.55'}
                  onMouseLeave={e => e.target.style.opacity = '0.25'}>
                  {step.n}
                </span>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                  style={{ background: `${step.color}15`, border: `1px solid ${step.color}35`, color: step.color }}>
                  {parseInt(step.n)}
                </div>
              </div>

              {/* Accent line */}
              <div className="w-8 h-0.5 rounded-full mb-4 transition-all duration-500 group-hover:w-16"
                style={{ background: `linear-gradient(90deg, ${step.color}, transparent)` }} />

              <h3 className="font-display font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-500 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Connector hint */}
        <div className="flex items-center justify-center mt-10 gap-3 opacity-30">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full" style={{ background: step.color }} />
              {i < steps.length - 1 && <div className="w-8 h-px" style={{ background: `linear-gradient(90deg, ${step.color}, ${steps[i+1].color})` }} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProcessSection
