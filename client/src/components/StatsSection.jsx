import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

const stats = [
  { value: 100,  suffix: '+',  label: 'Videos Produced',   desc: 'Reels, edits & campaigns' },
  { value: 25,   suffix: '+',  label: 'Brands Worked With', desc: 'Across categories'       },
  { value: 10,   suffix: 'M+', label: 'Total Reel Views',   desc: 'Organic reach generated' },
  { value: 500,  suffix: 'K+', label: 'Audience Reached',   desc: 'Across platforms'        },
  { value: 95,   suffix: '%',  label: 'Client Satisfaction', desc: 'Retention rate'         },
]

const StatsSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="py-16 px-4 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, rgba(123,47,247,0.06), rgba(192,132,252,0.03))', transition: 'background-color 0.3s' }}>

      <div className="absolute inset-0"
        style={{ borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }} />

      <div className="container-max relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-0 lg:divide-x lg:divide-purple-500/10"
          style={{ '--tw-divide-opacity': 0.1 }}>
          {stats.map((stat, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="text-center px-6 py-4">
              <p className="font-display font-bold text-3xl md:text-4xl gradient-text mb-1">
                {stat.value}{stat.suffix}
              </p>
              <p className="text-gray-900 dark:text-white font-semibold text-sm mb-1">{stat.label}</p>
              <p className="text-gray-600 dark:text-gray-500 text-xs">{stat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection
