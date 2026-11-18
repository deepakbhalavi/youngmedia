import { Link } from 'react-router-dom'
import { FaInstagram, FaLinkedinIn, FaYoutube, FaWhatsapp } from 'react-icons/fa'
import { BRAND, CONTACT, SOCIALS, FOOTER_SERVICES, PORTFOLIO_URL, PORTFOLIO_DOMAIN } from '../data/site'
import Arrow from './ui/Arrow'

const navigation = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Portfolio', to: '/#portfolio' },
  { label: 'Our Work', to: '/portfolio' },
  { label: 'Testimonials', to: '/testimonials' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

const socials = [
  { icon: FaInstagram, href: SOCIALS.instagram, label: 'Instagram' },
  { icon: FaLinkedinIn, href: SOCIALS.linkedin, label: 'LinkedIn' },
  { icon: FaYoutube, href: SOCIALS.youtube, label: 'YouTube' },
  { icon: FaWhatsapp, href: SOCIALS.whatsapp, label: 'WhatsApp' },
]

const ColTitle = ({ children }) => (
  <h4 className="text-[11px] uppercase tracking-[0.18em] text-white/40 font-sans font-medium mb-6">{children}</h4>
)

const footerLink = 'text-[15px] text-white/75 hover:text-white transition-colors duration-300'

const Footer = () => (
  <footer className="bg-ink text-white relative overflow-hidden">
    <div className="ym-container pt-20 md:pt-28">
      {/* Portfolio website feature strip */}
      <a href={PORTFOLIO_URL} target="_blank" rel="noopener noreferrer" id="footer-portfolio-link"
        className="group flex flex-col md:flex-row md:items-center justify-between gap-6 border-y border-white/10 py-8 md:py-10 mb-16 md:mb-24">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-sage mb-3">Portfolio website</p>
          <p className="font-display text-2xl sm:text-3xl md:text-4xl tracking-tight leading-tight">
            Explore Our Creative Universe
          </p>
        </div>
        <span className="inline-flex items-center gap-4 text-white/70 group-hover:text-white transition-colors">
          <span className="text-sm sm:text-base font-medium">Interactive Experience</span>
          <span className="w-12 h-12 rounded-full border border-white/20 group-hover:bg-sage group-hover:border-sage group-hover:text-ink flex items-center justify-center text-lg transition-colors duration-500">
            <Arrow />
          </span>
        </span>
      </a>

      <div className="grid grid-cols-2 md:grid-cols-12 gap-x-6 gap-y-12">
        {/* Brand */}
        <div className="col-span-2 md:col-span-5 lg:col-span-4">
          <Link to="/" aria-label="Young Media Marketing — Home" className="inline-block">
            <img src="/logo-light.png" alt="Young Media Marketing" width="480" height="236" className="h-12 w-auto object-contain" loading="lazy" />
          </Link>
          <p className="mt-6 text-white/60 leading-relaxed max-w-sm">{BRAND.statement}</p>
          <div className="flex gap-2 mt-8">
            {socials.map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:text-ink hover:bg-white hover:border-white transition-colors duration-300">
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="md:col-span-2 lg:col-start-6">
          <ColTitle>Navigation</ColTitle>
          <ul className="space-y-3">
            {navigation.map(l => (
              <li key={l.label}><Link to={l.to} className={footerLink}>{l.label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div className="md:col-span-2 lg:col-span-3">
          <ColTitle>Services</ColTitle>
          <ul className="space-y-3">
            {FOOTER_SERVICES.map(s => (
              <li key={s}><Link to="/services" className={footerLink}>{s}</Link></li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="col-span-2 md:col-span-3 lg:col-span-3">
          <ColTitle>Contact</ColTitle>
          <ul className="space-y-3">
            <li><a href={CONTACT.emailHref} className={footerLink}>{CONTACT.email}</a></li>
            <li><a href={CONTACT.phoneHref} className={footerLink}>{CONTACT.phone}</a></li>
            <li className="text-[15px] text-white/50">{CONTACT.location}</li>
            <li className="pt-2"><a href={SOCIALS.instagram} target="_blank" rel="noopener noreferrer" className={`${footerLink} inline-flex items-center gap-2 group`}>Instagram <Arrow /></a></li>
            <li><a href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer" className={`${footerLink} inline-flex items-center gap-2 group`}>LinkedIn <Arrow /></a></li>
            <li><a href={PORTFOLIO_URL} target="_blank" rel="noopener noreferrer" className={`${footerLink} inline-flex items-center gap-2 group`}>Portfolio Website <Arrow /></a></li>
          </ul>
        </div>
      </div>

      {/* Oversized wordmark */}
      <div aria-hidden="true" className="mt-20 md:mt-28 select-none pointer-events-none">
        <p className="font-display font-medium leading-[0.8] tracking-[-0.06em] text-white/[0.06] whitespace-nowrap"
          style={{ fontSize: 'clamp(4rem, 15.5vw, 15.5rem)' }}>
          Young Media
        </p>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-white/45">
        <p>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
        <div className="flex items-center gap-5">
          <span>Crafted in India</span>
          <Link to="/admin" className="hover:text-white transition-colors">Admin</Link>
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:text-white transition-colors">Back to top ↑</button>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
