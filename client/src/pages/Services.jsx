import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { FiPlus, FiMinus } from 'react-icons/fi'
import { HOME_SERVICES, ALL_SERVICES, PROCESS, FAQS } from '../data/site'
import { Reveal, LineReveal, SectionHead } from '../components/ui/Motion'
import Arrow from '../components/ui/Arrow'

const Services = () => {
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <>
      <Helmet>
        <title>Services — Young Media Marketing</title>
        <meta name="description" content="Young Media Marketing offers Digital Marketing, Social Media Management, Branding & Identity, Content Creation, Video Production & Reels, and Creative Strategy." />
      </Helmet>

      {/* Hero */}
      <section className="ym-section bg-white border-b border-line pt-16 md:pt-24">
        <div className="ym-container">
          <span className="ym-label">02 — WHAT WE DO</span>
          <LineReveal
            as="h1"
            animateOnMount
            className="ym-h1 mt-6 max-w-5xl"
            lines={[
              'Creative thinking.',
              <span key="l2" className="ym-muted-word">Strategic execution.</span>,
            ]}
          />
          <div className="mt-8 max-w-2xl">
            <p className="ym-lead">
              Everything your brand needs to build a distinct identity, craft high-impact content, and achieve measurable digital growth.
            </p>
          </div>

          {/* Core 6 pillars */}
          <div className="mt-16 md:mt-24 ym-hairline-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {HOME_SERVICES.map((s, i) => (
              <Reveal key={s.n} delay={(i % 3) * 0.07} className="p-8 md:p-10 lg:p-12 flex flex-col justify-between min-h-[270px]">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-muted">{s.n}</span>
                  <span className="w-2 h-2 rounded-full bg-sage" />
                </div>
                <div className="mt-12">
                  <h2 className="ym-h3">{s.title}</h2>
                  <p className="mt-3 text-sm text-muted leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Complete 10-service index with deliverables */}
      <section className="ym-section bg-stone border-b border-line">
        <div className="ym-container">
          <SectionHead
            label="COMPLETE CAPABILITIES"
            title="10 specialized studio capabilities."
            aside="Each engagement is scoped around your goals — available as standalone projects or ongoing monthly retainers."
          />

          <div className="mt-16 divide-y divide-line border-y border-line">
            {ALL_SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={0.04 * (i % 4)} className="py-8 md:py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-1 font-mono text-xs text-muted pt-1">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="lg:col-span-4">
                  <h3 className="font-display text-2xl font-medium text-ink">{s.title}</h3>
                </div>
                <div className="lg:col-span-4">
                  <p className="text-sm text-muted leading-relaxed">{s.desc}</p>
                </div>
                <div className="lg:col-span-3 flex flex-wrap gap-2">
                  {s.features.map(f => (
                    <span key={f} className="ym-chip">{f}</span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="ym-section bg-white border-b border-line">
        <div className="ym-container">
          <SectionHead
            label="HOW WE WORK"
            title="From the first idea to the final impact."
          />
          <div className="mt-14 grid grid-cols-1 md:grid-cols-4 border-t border-line">
            {PROCESS.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.07}
                className={`pt-8 pb-8 md:px-6 first:md:pl-0 last:md:pr-0 border-b md:border-b-0 ${i < 3 ? 'md:border-r border-line' : ''}`}>
                <span className="font-mono text-xs text-muted">{step.n}</span>
                <h3 className="mt-6 font-display text-2xl font-medium text-ink">{step.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{step.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="ym-section bg-stone">
        <div className="ym-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <Reveal><span className="ym-label">FAQ</span></Reveal>
              <LineReveal as="h2" className="ym-h2 mt-6" lines={['Common questions.']} />
              <Reveal delay={0.15} className="mt-6">
                <p className="ym-lead">Need a custom package? Let&apos;s build a tailored strategy for your brand.</p>
                <Link to="/contact" className="ym-btn ym-btn-dark mt-8">Get a Custom Quote <Arrow /></Link>
              </Reveal>
            </div>

            <div className="lg:col-span-7 divide-y divide-line border-y border-line">
              {FAQS.map((faq, i) => {
                const isOpen = openFaq === i
                return (
                  <div key={faq.q} className="py-6">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? -1 : i)}
                      className="w-full flex items-center justify-between gap-6 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="font-display text-lg md:text-xl font-medium text-ink">{faq.q}</span>
                      <span className="w-8 h-8 rounded-full border border-line bg-white flex items-center justify-center flex-shrink-0 text-ink">
                        {isOpen ? <FiMinus size={14} /> : <FiPlus size={14} />}
                      </span>
                    </button>
                    <div className={`faq-answer ${isOpen ? 'open' : ''}`}>
                      <p className="pt-4 text-sm text-muted leading-relaxed max-w-2xl">{faq.a}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Services
