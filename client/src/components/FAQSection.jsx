import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiPlus, FiMinus } from 'react-icons/fi'

const faqs = [
  { q: 'How long does content delivery take?', a: 'Typically 3–5 business days for reels and short-form edits. For full campaigns and shoots, we plan a timeline during the discovery call based on your requirements.' },
  { q: 'Do you manage Instagram accounts?', a: 'Yes! Our Social Media Management service covers full account handling — content posting, audience engagement, DM management, stories, and monthly growth reporting.' },
  { q: 'Can we customize marketing packages?', a: 'Absolutely. Every brand has unique needs. We build custom packages combining the services that make most sense for your goals and budget.' },
  { q: 'Do you provide Meta Ads management?', a: 'Yes, we run performance-based Meta (Facebook & Instagram) ad campaigns — from creative and copy to targeting, optimization, and detailed ROI reports.' },
  { q: 'What industries do you work with?', a: 'Restaurants, cafes, fashion, fitness, lifestyle, e-commerce, D2C brands, influencers, corporate businesses, and more. If you have a brand story, we can tell it.' },
  { q: 'How often do you shoot content?', a: 'This depends on your package. Most clients do monthly shoots (1–2 days per month), but we also offer weekly shoots for high-frequency content brands.' },
  { q: 'Do you travel for shoots?', a: 'Yes! We\'re based in Mumbai and travel across India for shoots. Travel charges may apply for out-of-city assignments. Contact us for a custom quote.' },
]

const FAQSection = () => {
  const [open, setOpen] = useState(null)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section ref={ref} className="section" style={{ background: 'var(--color-bg-darker)', transition: 'background-color 0.3s' }}>
      <div className="container-max max-w-3xl">
        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}>
          <span className="section-label mb-5 inline-flex">✦ FAQ</span>
          <h2 className="heading-lg text-gray-900 dark:text-white mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400">Everything you need to know before working with us.</p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07 }}
              className={`faq-item ${open === i ? 'open' : ''}`}>

              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left gap-4">
                <span className={`font-display font-semibold text-sm transition-colors duration-300 ${open === i ? 'text-purple-600 dark:text-purple-300' : 'text-gray-800 dark:text-white'}`}>
                  {faq.q}
                </span>
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300
                  ${open === i ? 'bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 rotate-0' : 'bg-black/5 dark:bg-white/5 text-gray-500'}`}>
                  {open === i ? <FiMinus size={14} /> : <FiPlus size={14} />}
                </div>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                     initial={{ height: 0, opacity: 0 }}
                     animate={{ height: 'auto', opacity: 1 }}
                     exit={{ height: 0, opacity: 0 }}
                     transition={{ duration: 0.35, ease: 'easeInOut' }}>
                    <div className="px-5 pb-5">
                      <div className="w-full h-px mb-4" style={{ background: 'var(--color-border)' }} />
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQSection
