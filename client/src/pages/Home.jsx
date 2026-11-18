import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiSend } from 'react-icons/fi'
import { FaInstagram, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa'
import axios from 'axios'
import toast from 'react-hot-toast'

import {
  BRAND, CONTACT, SOCIALS, STATS,
  HOME_SERVICES, SHOWCASE, SELECTED_WORK,
  CLIENTS, AUDIENCES, PROCESS, WHY_US, TESTIMONIALS,
  PORTFOLIO_URL, PORTFOLIO_DOMAIN, driveThumb,
} from '../data/site'
import { Reveal, LineReveal, MediaReveal, SectionHead, EASE } from '../components/ui/Motion'
import Arrow from '../components/ui/Arrow'
import AutoVideo from '../components/ui/AutoVideo'
import VideoLightbox from '../components/ui/VideoLightbox'
import PortfolioButton from '../components/ui/PortfolioButton'
import HeroHeadline from '../components/ui/HeroHeadline'

/* ═══════════════════════════════════════════════════════════════
   00 — HERO SECTION
═══════════════════════════════════════════════════════════════ */
const HeroSection = ({ onOpenReel }) => {
  const scrollToPortfolio = e => {
    e.preventDefault()
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.history.replaceState(null, '', '/#portfolio')
  }

  return (
    <section className="relative bg-white border-b border-line pt-12 pb-20 md:pt-20 md:pb-28">
      <div className="ym-container">
        {/* Top meta bar */}
        <motion.div
          className="flex flex-wrap items-center justify-between gap-4 pb-8 md:pb-12 border-b border-line"
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}
        >
          <span className="ym-label">INDEPENDENT CREATIVE &amp; DIGITAL AGENCY</span>
          <span className="text-xs text-muted tracking-wider uppercase hidden sm:inline">
            Nagpur, India &nbsp;—&nbsp; Est. {BRAND.since}
          </span>
        </motion.div>

        {/* Main headline */}
        <div className="pt-10 md:pt-16">
          <HeroHeadline className="ym-h1 tracking-tight" />
        </div>

        {/* Lower composition: description + CTAs (left) & minimal reel preview (right) */}
        <div className="mt-12 md:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
          <div className="lg:col-span-6">
            <motion.p
              className="ym-lead max-w-xl text-ink/80"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
            >
              We build brands, create digital experiences, and craft content that helps businesses connect, communicate, and grow.
            </motion.p>

            <motion.div
              className="mt-8 md:mt-10 flex flex-wrap items-center gap-3.5"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
            >
              <a href="#portfolio" onClick={scrollToPortfolio} id="hero-explore-work" className="ym-btn ym-btn-dark">
                Explore Our Work <Arrow />
              </a>
              <Link to="/contact" id="hero-lets-talk" className="ym-btn ym-btn-light">
                Let&apos;s Talk <Arrow />
              </Link>
            </motion.div>

            {/* Studio metrics strip */}
            <motion.div
              className="mt-12 pt-8 border-t border-line grid grid-cols-2 sm:grid-cols-4 gap-6"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
            >
              {STATS.map(s => (
                <div key={s.label}>
                  <p className="font-display text-2xl md:text-3xl font-medium tracking-tight text-ink">{s.value}</p>
                  <p className="text-xs text-muted mt-1">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Minimal creative reel frame — links directly to external portfolio website */}
          <div className="lg:col-span-6">
            <MediaReveal animateOnMount delay={0.25}>
              <a
                href={PORTFOLIO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-full text-left block"
                aria-label="Open Young Media Portfolio website in a new tab"
              >
                <div className="ym-frame aspect-[16/10] w-full border border-line">
                  <AutoVideo src={SHOWCASE[0].src} label={SHOWCASE[0].title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex items-end justify-between gap-4 text-white">
                    <div>
                      <span className="inline-block text-[10px] uppercase tracking-[0.2em] text-white/75 mb-1">
                        Featured Reel — 01
                      </span>
                      <p className="font-display text-base sm:text-lg font-medium">{SHOWCASE[0].title}</p>
                    </div>
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/95 text-ink px-4 py-2 text-xs font-medium
                      transition-colors duration-300 group-hover:bg-sage">
                      View Portfolio <Arrow />
                    </span>
                  </div>
                </div>
              </a>
            </MediaReveal>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   01 — WHO WE ARE (ABOUT SECTION)
═══════════════════════════════════════════════════════════════ */
const AboutSection = ({ onOpenReel }) => (
  <section id="about" className="ym-section ym-anchor bg-stone border-b border-line">
    <div className="ym-container">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left column — label + creative imagery */}
        <div className="lg:col-span-5">
          <Reveal><span className="ym-label">01 — WHO WE ARE</span></Reveal>

          <MediaReveal className="mt-8" delay={0.1}>
            <div
              onClick={() => onOpenReel({ ...SHOWCASE[1], type: 'video' })}
              role="button"
              tabIndex={0}
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onOpenReel({ ...SHOWCASE[1], type: 'video' })}
              className="group cursor-pointer"
            >
              <div className="ym-frame aspect-[4/5] border border-line">
                <AutoVideo src={SHOWCASE[1].src} label={SHOWCASE[1].title} />
              </div>
              <div className="flex items-center justify-between text-xs text-muted mt-3">
                <span>Studio Production — {SHOWCASE[1].title}</span>
                <span className="text-ink inline-flex items-center gap-1">Play <Arrow /></span>
              </div>
            </div>
          </MediaReveal>
        </div>

        {/* Right column — editorial statement + details */}
        <div className="lg:col-span-7 lg:pt-12">
          <LineReveal
            as="h2"
            className="ym-h2 text-balance"
            lines={['We turn ambitious ideas into meaningful brand experiences.']}
          />

          <Reveal delay={0.15} className="mt-8 max-w-2xl space-y-5">
            <p className="ym-lead text-ink/85">
              Young Media Marketing is a creative marketing agency focused on helping businesses build stronger identities, create impactful content, and grow their digital presence.
            </p>
            <p className="text-muted leading-relaxed">
              We combine creative direction, cinematic production, and performance strategy under one roof — partnering with ambitious brands from initial positioning to ongoing content and campaign growth.
            </p>
          </Reveal>

          <Reveal delay={0.25} className="mt-12 pt-10 border-t border-line grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted mb-2">Approach</p>
              <p className="font-display text-lg font-medium text-ink">Strategy + Storytelling</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted mb-2">Craft</p>
              <p className="font-display text-lg font-medium text-ink">Cinematic Production</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted mb-2">Outcome</p>
              <p className="font-display text-lg font-medium text-ink">Measurable Growth</p>
            </div>
          </Reveal>

          <Reveal delay={0.3} className="mt-10">
            <Link to="/about" className="ym-link text-sm group">
              More about our studio <Arrow />
            </Link>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
)

/* ═══════════════════════════════════════════════════════════════
   02 — WHAT WE DO (SERVICES SECTION)
═══════════════════════════════════════════════════════════════ */
const ServicesSection = () => (
  <section id="services" className="ym-section ym-anchor bg-white border-b border-line">
    <div className="ym-container">
      <SectionHead
        label="02 — WHAT WE DO"
        title={['Creative thinking.', 'Strategic execution.']}
        aside="From brand identity and content creation to full-funnel digital marketing — every discipline is built to help your brand stand out and grow."
      />

      <div className="mt-16 md:mt-24 ym-hairline-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {HOME_SERVICES.map((s, i) => (
          <Reveal key={s.n} delay={(i % 3) * 0.07}>
            <Link
              to="/services"
              className="group h-full p-8 md:p-10 lg:p-12 flex flex-col justify-between min-h-[290px]
                transition-colors duration-500 ease-out-expo hover:bg-stone block"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-muted tracking-widest">{s.n}</span>
                <span className="w-10 h-10 rounded-full border border-line flex items-center justify-center text-sm text-ink
                  transition-colors duration-500 group-hover:bg-ink group-hover:text-white group-hover:border-ink">
                  <Arrow />
                </span>
              </div>

              <div className="mt-12">
                <h3 className="ym-h3 transition-transform duration-500 ease-out-expo group-hover:translate-x-1">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm text-muted leading-relaxed">{s.desc}</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-sm text-muted">Looking for a tailored monthly retainer or campaign scope?</p>
        <Link to="/services" className="ym-link text-sm group">
          View all 10 capabilities <Arrow />
        </Link>
      </Reveal>
    </div>
  </section>
)

/* ═══════════════════════════════════════════════════════════════
   03 — OUR PORTFOLIO (PORTFOLIO SHOWCASE + EXTERNAL CTA)
═══════════════════════════════════════════════════════════════ */
const PortfolioShowcaseCard = ({ item, index, aspect = 'aspect-[4/5]', className = '', onSelect }) => (
  <Reveal delay={0.05 * index} className={className}>
    <article
      onClick={() => onSelect({ ...item, type: 'video' })}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onSelect({ ...item, type: 'video' })}
      role="button"
      tabIndex={0}
      aria-label={`${item.title} — ${item.category}`}
      className="group cursor-pointer"
    >
      <div className={`ym-frame ${aspect} w-full border border-line`}>
        <AutoVideo src={item.src} label={item.title} />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-[11px] font-medium text-ink">
            {item.category}
          </span>
        </div>
        <div className="absolute bottom-4 right-4 w-11 h-11 rounded-full bg-white text-ink flex items-center justify-center
          opacity-90 group-hover:bg-sage transition-all duration-500">
          <Arrow />
        </div>
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-4 border-b border-line pb-4">
        <div>
          <h3 className="font-display text-lg md:text-xl font-medium text-ink group-hover:translate-x-1 transition-transform duration-500">
            {item.title}
          </h3>
          <p className="text-xs text-muted mt-0.5">{item.category} — Young Media Production</p>
        </div>
        <span className="font-mono text-xs text-muted">0{index + 1}</span>
      </div>
    </article>
  </Reveal>
)

const PortfolioShowcaseSection = ({ onOpenReel }) => (
  <section id="portfolio" className="ym-section ym-anchor bg-stone border-b border-line">
    <div className="ym-container">
      <SectionHead
        label="03 — OUR PORTFOLIO"
        title={[
          'Creativity you can see.',
          <span key="p2" className="ym-muted-word">Results you can feel.</span>,
        ]}
        aside="Every brand has a story. We bring those stories to life through creative campaigns, impactful visuals, strategic branding, and digital experiences."
      />

      {/* Row 1 — Asymmetric 7 / 5 editorial layout */}
      <div className="mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        <PortfolioShowcaseCard
          item={SHOWCASE[0]}
          index={0}
          aspect="aspect-[16/11]"
          className="lg:col-span-7"
          onSelect={onOpenReel}
        />
        <PortfolioShowcaseCard
          item={SHOWCASE[1]}
          index={1}
          aspect="aspect-[4/5]"
          className="lg:col-span-5 lg:mt-16"
          onSelect={onOpenReel}
        />
      </div>

      {/* Row 2 — Asymmetric 5 / 7 editorial layout */}
      <div className="mt-8 lg:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        <PortfolioShowcaseCard
          item={SHOWCASE[2]}
          index={2}
          aspect="aspect-[4/5]"
          className="lg:col-span-5"
          onSelect={onOpenReel}
        />
        <PortfolioShowcaseCard
          item={SHOWCASE[3]}
          index={3}
          aspect="aspect-[16/11]"
          className="lg:col-span-7 lg:mt-12"
          onSelect={onOpenReel}
        />
      </div>

      {/* Row 3 — Three vertical 9:16 social reels */}
      <div className="mt-12 lg:mt-16">
        <Reveal className="flex items-center justify-between mb-6">
          <span className="text-xs uppercase tracking-[0.18em] text-muted">Short-Form &amp; Social Reels</span>
          <span className="text-xs text-muted">Click any frame to watch with sound</span>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
          {SHOWCASE.slice(4, 7).map((item, idx) => (
            <PortfolioShowcaseCard
              key={item.id}
              item={item}
              index={idx + 4}
              aspect="aspect-[9/13]"
              onSelect={onOpenReel}
            />
          ))}
        </div>
      </div>

      {/* ── Featured External Portfolio Website CTA Block ── */}
      <Reveal className="mt-20 md:mt-28">
        <div className="bg-white border border-line p-8 sm:p-12 md:p-16 lg:p-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2.5 rounded-full bg-stone border border-line px-3.5 py-1.5 text-xs text-ink mb-6">
                <span className="w-2 h-2 rounded-full bg-sage" />
                <span>Dedicated Portfolio Showcase — Interactive Archive</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-ink leading-[1.08] text-balance">
                Discover our projects, creative campaigns, and the work behind the brands we build.
              </h3>
              <p className="mt-4 text-muted text-sm sm:text-base max-w-xl leading-relaxed">
                Step inside our full interactive portfolio for complete campaign breakdowns, brand films, creative reels, and production archives.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col lg:items-end justify-center">
              <PortfolioButton id="homepage-portfolio-cta" label="Explore Our Creative Universe" />
              <a
                href={PORTFOLIO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 text-xs text-muted hover:text-ink transition-colors sm:px-2 inline-flex items-center gap-1.5"
              >
                <span>Explore complete campaigns &amp; video archives</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
)

/* ═══════════════════════════════════════════════════════════════
   04 — SELECTED WORK
═══════════════════════════════════════════════════════════════ */
const SelectedWorkCard = ({ item, index, onSelect }) => {
  const [imgErr, setImgErr] = useState(false)

  return (
    <Reveal delay={(index % 2) * 0.1}>
      <article
        onClick={() => onSelect(item)}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onSelect(item)}
        role="button"
        tabIndex={0}
        className="group cursor-pointer border-t border-line pt-6"
      >
        <div className="flex items-center justify-between text-xs text-muted mb-4">
          <span className="uppercase tracking-[0.16em] text-ink font-medium">{item.client}</span>
          <span>{item.category}</span>
        </div>

        <div className="ym-frame aspect-[16/10] w-full border border-line">
          {item.type === 'video' ? (
            <AutoVideo src={item.src} label={item.title} />
          ) : !imgErr ? (
            <img
              src={driveThumb(item.fileId, 1200)}
              alt={item.title}
              loading="lazy"
              onError={() => setImgErr(true)}
            />
          ) : (
            <div className="absolute inset-0 bg-stone flex items-center justify-center p-8 text-center">
              <p className="font-display text-2xl text-ink">{item.title}</p>
            </div>
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
          <div className="absolute bottom-4 right-4 w-11 h-11 rounded-full bg-white text-ink flex items-center justify-center
            opacity-90 group-hover:bg-sage transition-all duration-500">
            <Arrow />
          </div>
        </div>

        <div className="mt-6 flex items-start justify-between gap-6">
          <div>
            <h3 className="ym-h3 group-hover:translate-x-1 transition-transform duration-500">{item.title}</h3>
            <p className="mt-2 text-sm text-muted leading-relaxed max-w-xl">{item.description}</p>
          </div>
          <span className="ym-link text-sm flex-shrink-0 mt-1">
            View Project <Arrow />
          </span>
        </div>
      </article>
    </Reveal>
  )
}

const SelectedWorkSection = ({ onOpenReel }) => (
  <section id="work" className="ym-section ym-anchor bg-white border-b border-line">
    <div className="ym-container">
      <SectionHead
        label="04 — SELECTED WORK"
        title="Ideas made tangible."
        aside="Selected brand films, educational productions, and digital campaigns crafted by our team."
      />

      <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
        {SELECTED_WORK.map((item, i) => (
          <SelectedWorkCard key={item.id} item={item} index={i} onSelect={onOpenReel} />
        ))}
      </div>

      <Reveal className="mt-14 pt-8 border-t border-line flex flex-wrap items-center justify-between gap-4">
        <Link to="/portfolio" className="ym-btn ym-btn-light">
          View Our Work Archive <Arrow />
        </Link>
        <a href={PORTFOLIO_URL} target="_blank" rel="noopener noreferrer" className="ym-link text-sm group">
          Visit Full Portfolio Website <Arrow />
        </a>
      </Reveal>
    </div>
  </section>
)

/* ═══════════════════════════════════════════════════════════════
   05 — TRUSTED BY (OUR CLIENTS)
═══════════════════════════════════════════════════════════════ */
const ClientsSection = () => (
  <section className="ym-section bg-stone border-b border-line">
    <div className="ym-container">
      <SectionHead
        label="05 — TRUSTED BY"
        title="Partnerships built on trust and craft."
        aside="From startups and local businesses to personal brands, creators, and established companies."
      />

      {/* Genuine client roster */}
      <div className="mt-14 md:mt-20 ym-hairline-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6">
        {CLIENTS.map((c, i) => (
          <Reveal
            key={c.name}
            delay={i * 0.08}
            className={`p-8 md:p-12 flex flex-col justify-between min-h-[200px] ${
              i < 3 ? 'lg:col-span-2' : 'lg:col-span-3'
            } ${i === 4 ? 'sm:col-span-2 lg:col-span-3' : ''}`}
          >
            <div className="flex items-center justify-between text-xs text-muted">
              <span className="font-mono">0{i + 1}</span>
              <span className="uppercase tracking-[0.15em]">{c.work}</span>
            </div>
            <div className="mt-10 flex items-baseline justify-between gap-4">
              <p className="font-display text-2xl md:text-3xl font-medium tracking-tight text-ink">{c.name}</p>
              <span className="text-xs text-muted flex-shrink-0">Verified Client</span>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Audience categories */}
      <Reveal className="mt-10 flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-line">
        <span className="text-xs uppercase tracking-[0.18em] text-muted">Who we partner with</span>
        <div className="flex flex-wrap gap-2">
          {AUDIENCES.map(a => (
            <span key={a} className="ym-chip">{a}</span>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
)

/* ═══════════════════════════════════════════════════════════════
   06 — HOW WE WORK (CREATIVE PROCESS)
═══════════════════════════════════════════════════════════════ */
const ProcessSection = () => (
  <section className="ym-section bg-white border-b border-line">
    <div className="ym-container">
      <SectionHead
        label="06 — HOW WE WORK"
        title="From the first idea to the final impact."
        aside="A focused four-stage process that turns business goals into consistent creative output and measurable brand growth."
      />

      <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-line">
        {PROCESS.map((step, i) => (
          <Reveal
            key={step.n}
            delay={i * 0.08}
            className={`pt-8 pb-10 md:px-6 first:md:pl-0 last:md:pr-0 border-b md:border-b-0 ${
              i < PROCESS.length - 1 ? 'lg:border-r border-line' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted">{step.n} — STAGE</span>
              <span className="w-2 h-2 rounded-full bg-sage" />
            </div>
            <h3 className="mt-8 font-display text-2xl md:text-3xl font-medium text-ink">{step.title}</h3>
            <p className="mt-3 text-sm text-muted leading-relaxed">{step.desc}</p>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
)

/* ═══════════════════════════════════════════════════════════════
   WHY CHOOSE US
═══════════════════════════════════════════════════════════════ */
const WhyChooseUsSection = () => (
  <section className="ym-section bg-stone border-b border-line">
    <div className="ym-container">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <Reveal><span className="ym-label">WHY YOUNG MEDIA</span></Reveal>
          <LineReveal
            as="h2"
            className="ym-h2 mt-6 text-balance"
            lines={['More than marketing.', 'We create connections.']}
          />
          <Reveal delay={0.15} className="mt-6">
            <p className="ym-lead">
              We are creative by passion, driven by strategy, and focused on results that move the needle for your business.
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-7 divide-y divide-line border-y border-line">
          {WHY_US.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05} className="py-7 sm:py-8 flex items-start gap-6">
              <span className="font-mono text-xs text-muted pt-1.5">0{i + 1}</span>
              <div className="flex-1">
                <h3 className="font-display text-xl md:text-2xl font-medium text-ink">{item.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
)

/* ═══════════════════════════════════════════════════════════════
   07 — CLIENT STORIES (TESTIMONIALS)
═══════════════════════════════════════════════════════════════ */
const TestimonialsSection = () => (
  <section className="ym-section bg-white border-b border-line">
    <div className="ym-container">
      <SectionHead
        label="07 — CLIENT STORIES"
        title={['Good work speaks.', 'Great partnerships last.']}
        aside="Genuine words from brands we have partnered with across branding, content, and digital marketing."
      />

      <div className="mt-16 md:mt-24 ym-hairline-grid grid-cols-1 lg:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.08} className="p-8 md:p-12 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-muted mb-8">
                <span className="uppercase tracking-[0.16em]">{t.service}</span>
                <span className="font-mono">0{i + 1}</span>
              </div>
              <p className="font-display text-lg md:text-xl text-ink leading-relaxed font-normal">
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
)

/* ═══════════════════════════════════════════════════════════════
   CONTACT SECTION (preserves POST /api/contact integration)
═══════════════════════════════════════════════════════════════ */
const HomeContactSection = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return toast.error('Please fill required fields')
    setLoading(true)

    const text = encodeURIComponent(
      `*New Inquiry from Young Media Website*\n\n` +
      `👤 *Name:* ${form.name}\n` +
      `📧 *Email:* ${form.email}\n` +
      (form.phone ? `📱 *Phone:* ${form.phone}\n` : '') +
      (form.subject ? `📌 *Service Needed:* ${form.subject}\n` : '') +
      `💬 *Message:* ${form.message}`
    )
    const whatsappUrl = `https://wa.me/917058322541?text=${text}`
    window.open(whatsappUrl, '_blank')
    toast.success("Opening WhatsApp with your inquiry! We'll reply shortly.")
    setForm({ name: '', email: '', phone: '', subject: '', message: '' })
    setLoading(false)
  }

  return (
    <section id="contact" className="ym-section ym-anchor bg-stone">
      <div className="ym-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left — editorial CTA & direct contact */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <Reveal><span className="ym-label">GET IN TOUCH</span></Reveal>
              <LineReveal
                as="h2"
                className="ym-h2 mt-6"
                lines={['Have a project in mind?', "Let's make it happen."]}
              />
              <Reveal delay={0.15} className="mt-6">
                <p className="ym-lead">
                  Have an idea, a business, or a brand ready to grow? We&apos;d love to hear from you.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.25} className="mt-12 pt-8 border-t border-line space-y-5 text-sm">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted mb-1">Email</p>
                <a href={CONTACT.emailHref} className="font-display text-lg text-ink hover:underline">{CONTACT.email}</a>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted mb-1">Phone &amp; WhatsApp</p>
                <a href={CONTACT.phoneHref} className="font-display text-lg text-ink hover:underline">{CONTACT.phone}</a>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted mb-1">Studio</p>
                <p className="text-ink">{CONTACT.location}</p>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <a href={SOCIALS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                  className="w-10 h-10 rounded-full border border-line bg-white flex items-center justify-center text-ink hover:bg-ink hover:text-white transition-colors">
                  <FaInstagram size={15} />
                </a>
                <a href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                  className="w-10 h-10 rounded-full border border-line bg-white flex items-center justify-center text-ink hover:bg-ink hover:text-white transition-colors">
                  <FaLinkedinIn size={15} />
                </a>
                <a href={CONTACT.whatsappChat} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                  className="w-10 h-10 rounded-full border border-line bg-white flex items-center justify-center text-ink hover:bg-ink hover:text-white transition-colors">
                  <FaWhatsapp size={15} />
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right — minimal editorial form */}
          <Reveal delay={0.15} className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="bg-white border border-line p-8 sm:p-12 space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="home-contact-name" className="ym-field-label">Your Name *</label>
                  <input id="home-contact-name" name="name" value={form.name}
                    onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                    placeholder="Full name" className="ym-input" required />
                </div>
                <div>
                  <label htmlFor="home-contact-email" className="ym-field-label">Email Address *</label>
                  <input id="home-contact-email" name="email" type="email" value={form.email}
                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    placeholder="you@company.com" className="ym-input" required />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="home-contact-phone" className="ym-field-label">Phone</label>
                  <input id="home-contact-phone" name="phone" value={form.phone}
                    onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                    placeholder="+91 XXXXX XXXXX" className="ym-input" />
                </div>
                <div>
                  <label htmlFor="home-contact-subject" className="ym-field-label">Service Needed</label>
                  <select id="home-contact-subject" name="subject" value={form.subject}
                    onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
                    className="ym-input">
                    <option value="">Select a service...</option>
                    {['Digital Marketing', 'Social Media Management', 'Branding & Identity', 'Content Creation', 'Video Production & Reels', 'Creative Strategy', 'Full Package'].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="home-contact-message" className="ym-field-label">Project Details *</label>
                <textarea id="home-contact-message" name="message" rows={4} value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  placeholder="Tell us about your brand, timeline, and goals..."
                  className="ym-input resize-none" required />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <button type="submit" disabled={loading} className="ym-btn ym-btn-dark py-4 px-8 disabled:opacity-60">
                  {loading ? 'Sending...' : <>Start a Conversation <Arrow /></>}
                </button>
                <span className="text-xs text-muted flex items-center gap-2">
                  <FiSend size={12} /> Typical response within 24 hours
                </span>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   HOME PAGE
═══════════════════════════════════════════════════════════════ */
const Home = () => {
  const [activeReel, setActiveReel] = useState(null)

  return (
    <>
      <Helmet>
        <title>Young Media Marketing — Independent Creative &amp; Digital Agency</title>
        <meta
          name="description"
          content="Young Media Marketing is a creative marketing agency focused on helping businesses build stronger identities, create impactful content, and grow their digital presence."
        />
      </Helmet>

      <HeroSection onOpenReel={setActiveReel} />
      <AboutSection onOpenReel={setActiveReel} />
      <ServicesSection />
      <PortfolioShowcaseSection onOpenReel={setActiveReel} />
      <SelectedWorkSection onOpenReel={setActiveReel} />
      <ClientsSection />
      <ProcessSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <HomeContactSection />

      <VideoLightbox item={activeReel} onClose={() => setActiveReel(null)} />
    </>
  )
}

export default Home
