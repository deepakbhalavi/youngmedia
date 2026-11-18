import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { TESTIMONIALS, CLIENTS } from '../data/site'
import { Reveal, LineReveal, SectionHead } from '../components/ui/Motion'
import Arrow from '../components/ui/Arrow'

const Testimonials = () => (
  <>
    <Helmet>
      <title>Client Stories — Young Media Marketing</title>
      <meta name="description" content="Read genuine client reviews from SS Collection, Dolly Mobile, and Kanrivo on working with Young Media Marketing." />
    </Helmet>

    <section className="ym-section bg-white border-b border-line pt-16 md:pt-24">
      <div className="ym-container">
        <Reveal><span className="ym-label">07 — CLIENT STORIES</span></Reveal>
        <LineReveal
          as="h1"
          animateOnMount
          className="ym-h1 mt-6 max-w-5xl"
          lines={[
            'Good work speaks.',
            <span key="l2" className="ym-muted-word">Great partnerships last.</span>,
          ]}
        />
        <Reveal delay={0.2} className="mt-6 max-w-xl">
          <p className="ym-lead">
            Genuine reviews from brands who partnered with Young Media Marketing across branding, content, and digital strategy.
          </p>
        </Reveal>

        <div className="mt-16 md:mt-24 ym-hairline-grid grid-cols-1 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08} className="p-8 md:p-12 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-muted mb-8">
                  <span className="uppercase tracking-[0.16em]">{t.service}</span>
                  <span className="font-mono">0{i + 1}</span>
                </div>
                <p className="font-display text-lg md:text-xl text-ink leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
              <div className="mt-10 pt-6 border-t border-line flex items-center justify-between">
                <div>
                  <p className="font-display font-medium text-ink">{t.name}</p>
                  <p className="text-xs text-muted mt-0.5">{t.role}</p>
                </div>
                <span className="w-9 h-9 rounded-full bg-stone border border-line flex items-center justify-center font-display text-xs font-medium text-ink">
                  {t.name.charAt(0)}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <section className="ym-section bg-stone">
      <div className="ym-container">
        <SectionHead
          label="TRUSTED BY"
          title="Brands we have partnered with."
        />
        <div className="mt-14 ym-hairline-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6">
          {CLIENTS.map((c, i) => (
            <Reveal
              key={c.name}
              delay={i * 0.07}
              className={`p-8 md:p-12 flex flex-col justify-between min-h-[180px] ${
                i < 3 ? 'lg:col-span-2' : 'lg:col-span-3'
              } ${i === 4 ? 'sm:col-span-2 lg:col-span-3' : ''}`}
            >
              <div className="flex items-center justify-between text-xs text-muted">
                <span className="font-mono">0{i + 1}</span>
                <span className="uppercase tracking-[0.16em]">{c.work}</span>
              </div>
              <div className="mt-8 flex items-baseline justify-between gap-4">
                <p className="font-display text-2xl md:text-3xl font-medium tracking-tight text-ink">{c.name}</p>
                <span className="text-xs text-muted flex-shrink-0">Verified Client</span>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-14 flex items-center justify-between flex-wrap gap-4">
          <p className="text-sm text-muted">Ready to build your brand with us?</p>
          <Link to="/contact" className="ym-btn ym-btn-dark">Start a Conversation <Arrow /></Link>
        </Reveal>
      </div>
    </section>
  </>
)

export default Testimonials
