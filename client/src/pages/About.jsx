import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { FaInstagram, FaYoutube, FaLinkedinIn } from 'react-icons/fa'
import { BRAND, STATS, SHOWCASE, WHY_US, PROCESS, SOCIALS, PORTFOLIO_URL } from '../data/site'
import { Reveal, LineReveal, MediaReveal, SectionHead } from '../components/ui/Motion'
import Arrow from '../components/ui/Arrow'
import AutoVideo from '../components/ui/AutoVideo'
import VideoLightbox from '../components/ui/VideoLightbox'

const timeline = [
  { year: '2020', title: 'The Vision',         desc: 'YoungMedia was founded with a mission to help local brands build a powerful digital presence through premium content.' },
  { year: '2021', title: 'First Campaigns',     desc: 'Launched our first brand campaigns, producing reels and social content that went viral across Instagram and YouTube.' },
  { year: '2022', title: 'Agency Expansion',    desc: 'Grew our team of creators, editors, and strategists. Worked with 15+ brands across fashion, food, and lifestyle.' },
  { year: '2023', title: 'Scaling Impact',      desc: '100+ campaigns delivered. 10M+ reel views generated. Expanded services to include Meta Ads and full social media management.' },
  { year: '2024', title: 'Leading the Market',  desc: 'Establishing YoungMedia as a leading creative agency — known for cinematic quality, strategy, and measurable brand growth.' },
]

const pillars = [
  { n: '01', title: 'Our Mission', text: 'To help brands stand out digitally through impactful content and modern marketing strategies that drive real business growth.' },
  { n: '02', title: 'Our Vision',  text: 'To become a leading creative media agency known for innovation, cinematic storytelling, and transformative digital growth.' },
  { n: '03', title: 'Our Story',   text: 'YoungMedia was created to help local businesses and modern brands build a powerful online presence through high-quality content and creative marketing.' },
]

const About = () => {
  const [activeReel, setActiveReel] = useState(null)

  return (
    <>
      <Helmet>
        <title>About — Young Media Marketing</title>
        <meta name="description" content="YoungMedia is a creative digital marketing and content production agency helping brands grow through cinematic storytelling and strategic social media campaigns." />
      </Helmet>

      {/* Hero */}
      <section className="ym-section bg-white border-b border-line pt-16 md:pt-24">
        <div className="ym-container">
          <Reveal><span className="ym-label">01 — WHO WE ARE</span></Reveal>
          <LineReveal
            as="h1"
            animateOnMount
            className="ym-h1 mt-6 max-w-5xl"
            lines={[
              'We turn ambitious ideas',
              <span key="l2" className="ym-muted-word">into meaningful brand experiences.</span>,
            ]}
          />

          <div className="mt-14 md:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <Reveal className="lg:col-span-6 space-y-5">
              <p className="ym-lead text-ink">
                Young Media Marketing is a creative marketing agency focused on helping businesses build stronger identities, create impactful content, and grow their digital presence.
              </p>
              <p className="text-muted leading-relaxed">
                We combine creativity with marketing strategy to create content that not only looks premium but drives real audience engagement and business growth. We don&apos;t just make content — we build brands.
              </p>
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <Link to="/contact" className="ym-btn ym-btn-dark">Work With Us <Arrow /></Link>
                <Link to="/portfolio" className="ym-btn ym-btn-light">Our Work <Arrow /></Link>
                <a href={PORTFOLIO_URL} target="_blank" rel="noopener noreferrer" className="ym-link text-sm ml-2 group">
                  Portfolio Website <Arrow />
                </a>
              </div>
            </Reveal>

            <div className="lg:col-span-6">
              <MediaReveal animateOnMount delay={0.2}>
                <div
                  onClick={() => setActiveReel({ ...SHOWCASE[0], type: 'video' })}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setActiveReel({ ...SHOWCASE[0], type: 'video' })}
                  className="group cursor-pointer"
                >
                  <div className="ym-frame aspect-[16/10] border border-line">
                    <AutoVideo src={SHOWCASE[0].src} label={SHOWCASE[0].title} />
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-muted">
                    <span>Young Media Studio — Nagpur, India (Est. {BRAND.since})</span>
                    <span className="text-ink inline-flex items-center gap-1">Play Reel <Arrow /></span>
                  </div>
                </div>
              </MediaReveal>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 pt-12 border-t border-line grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.07}>
                <p className="font-display text-4xl md:text-5xl font-medium tracking-tight text-ink">{s.value}</p>
                <p className="text-sm text-ink mt-2 font-medium">{s.label}</p>
                <p className="text-xs text-muted mt-0.5">{s.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Mission / Vision / Story */}
      <section className="ym-section bg-stone border-b border-line">
        <div className="ym-container">
          <SectionHead
            label="02 — FOUNDATION"
            title="Purpose, direction, and origin."
          />
          <div className="mt-14 ym-hairline-grid grid-cols-1 md:grid-cols-3">
            {pillars.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08} className="p-8 md:p-12 flex flex-col justify-between">
                <span className="font-mono text-xs text-muted">{item.n}</span>
                <div className="mt-12">
                  <h2 className="ym-h3">{item.title}</h2>
                  <p className="mt-3 text-sm text-muted leading-relaxed">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="ym-section bg-white border-b border-line">
        <div className="ym-container">
          <SectionHead
            label="03 — OUR JOURNEY"
            title="From vision to measurable impact."
          />
          <div className="mt-14 divide-y divide-line border-y border-line">
            {timeline.map((item, i) => (
              <Reveal key={item.year} delay={i * 0.06} className="py-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline">
                <span className="md:col-span-2 font-mono text-sm text-muted">{item.year}</span>
                <h3 className="md:col-span-4 font-display text-xl md:text-2xl font-medium text-ink">{item.title}</h3>
                <p className="md:col-span-6 text-sm text-muted leading-relaxed">{item.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process + Principles */}
      <section className="ym-section bg-stone">
        <div className="ym-container">
          <SectionHead
            label="04 — PRINCIPLES"
            title="More than marketing. We create connections."
          />
          <div className="mt-14 ym-hairline-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {WHY_US.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.06} className="p-8 md:p-10">
                <span className="font-mono text-xs text-muted">0{i + 1}</span>
                <h3 className="mt-6 font-display text-xl font-medium text-ink">{v.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{v.desc}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14 flex flex-wrap items-center justify-between gap-6 pt-8 border-t border-line">
            <div className="flex items-center gap-3">
              {[
                { icon: FaInstagram, href: SOCIALS.instagram, label: 'Instagram' },
                { icon: FaYoutube,   href: SOCIALS.youtube,   label: 'YouTube' },
                { icon: FaLinkedinIn,href: SOCIALS.linkedin,  label: 'LinkedIn' },
              ].map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-10 h-10 rounded-full border border-line bg-white flex items-center justify-center text-ink hover:bg-ink hover:text-white transition-colors">
                  <Icon size={15} />
                </a>
              ))}
            </div>
            <Link to="/contact" className="ym-btn ym-btn-dark">Start a Conversation <Arrow /></Link>
          </Reveal>
        </div>
      </section>

      <VideoLightbox item={activeReel} onClose={() => setActiveReel(null)} />
    </>
  )
}

export default About
