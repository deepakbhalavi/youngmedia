import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { FiSend } from 'react-icons/fi'
import { FaWhatsapp, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa'
import axios from 'axios'
import toast from 'react-hot-toast'
import { CONTACT, SOCIALS, PORTFOLIO_URL } from '../data/site'
import { Reveal, LineReveal } from '../components/ui/Motion'
import Arrow from '../components/ui/Arrow'

const API_URL = '/api'

const Contact = () => {
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
    <>
      <Helmet>
        <title>Contact — Young Media Marketing</title>
        <meta name="description" content="Get in touch with Young Media Marketing for branding, content creation, social media management, and digital marketing." />
      </Helmet>

      {/* Hero */}
      <section className="ym-section bg-white border-b border-line pt-16 md:pt-24">
        <div className="ym-container">
          <Reveal><span className="ym-label">CONTACT</span></Reveal>
          <LineReveal
            as="h1"
            animateOnMount
            className="ym-h1 mt-6 max-w-5xl"
            lines={[
              'Have a project in mind?',
              <span key="l2" className="ym-muted-word">Let&apos;s make it happen.</span>,
            ]}
          />
          <Reveal delay={0.2} className="mt-6 max-w-xl">
            <p className="ym-lead">
              Have an idea, a business, or a brand ready to grow? We&apos;d love to hear from you.
            </p>
          </Reveal>

          <div className="mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Sidebar */}
            <Reveal className="lg:col-span-5 space-y-8">
              <div className="border-t border-line pt-6">
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted mb-2">Email</p>
                <a href={CONTACT.emailHref} className="font-display text-2xl text-ink hover:underline">{CONTACT.email}</a>
              </div>
              <div className="border-t border-line pt-6">
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted mb-2">Phone</p>
                <a href={CONTACT.phoneHref} className="font-display text-2xl text-ink hover:underline">{CONTACT.phone}</a>
              </div>
              <div className="border-t border-line pt-6">
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted mb-2">Studio Location</p>
                <p className="font-display text-xl text-ink">{CONTACT.location}</p>
              </div>

              <div className="border-t border-line pt-6 flex flex-wrap gap-3">
                <a href={CONTACT.whatsappChat} target="_blank" rel="noopener noreferrer" className="ym-btn ym-btn-dark">
                  <FaWhatsapp size={16} /> Chat on WhatsApp <Arrow />
                </a>
                <a href={PORTFOLIO_URL} target="_blank" rel="noopener noreferrer" className="ym-btn ym-btn-light">
                  Portfolio Website <Arrow />
                </a>
              </div>

              <div className="border-t border-line pt-6">
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted mb-4">Socials</p>
                <div className="flex gap-3">
                  {[
                    { icon: FaInstagram, href: SOCIALS.instagram, label: 'Instagram' },
                    { icon: FaLinkedinIn, href: SOCIALS.linkedin, label: 'LinkedIn' },
                    { icon: FaYoutube, href: SOCIALS.youtube, label: 'YouTube' },
                  ].map(({ icon: Icon, href, label }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                      className="w-11 h-11 rounded-full border border-line flex items-center justify-center text-ink hover:bg-ink hover:text-white transition-colors">
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Form */}
            <Reveal delay={0.15} className="lg:col-span-7">
              <div className="bg-stone border border-line p-8 sm:p-12">
                <h2 className="ym-h3 mb-8">Start a Conversation</h2>
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                      <label htmlFor="contact-name" className="ym-field-label">Name *</label>
                      <input id="contact-name" name="name" value={form.name}
                        onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                        placeholder="Your name" className="ym-input" required />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="ym-field-label">Email *</label>
                      <input id="contact-email" name="email" type="email" value={form.email}
                        onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                        placeholder="your@email.com" className="ym-input" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                      <label htmlFor="contact-phone" className="ym-field-label">Phone</label>
                      <input id="contact-phone" name="phone" value={form.phone}
                        onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                        placeholder="+91 XXXXX XXXXX" className="ym-input" />
                    </div>
                    <div>
                      <label htmlFor="contact-subject" className="ym-field-label">Service Needed</label>
                      <select id="contact-subject" name="subject" value={form.subject}
                        onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
                        className="ym-input">
                        <option value="">Select service...</option>
                        {['Social Media Marketing', 'Video Editing', 'Content Strategy', 'Reel Production', 'Meta Ads', 'Branding', 'Full Package'].map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="ym-field-label">Message *</label>
                    <textarea id="contact-message" name="message" value={form.message}
                      onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                      placeholder="Tell us about your brand, goals, and what you're looking to achieve..."
                      rows={5} className="ym-input resize-none" required />
                  </div>
                  <button id="contact-submit" type="submit" disabled={loading}
                    className="ym-btn ym-btn-dark w-full sm:w-auto py-4 px-9 disabled:opacity-60">
                    {loading ? 'Sending...' : <><FiSend size={14} /> Start a Conversation <Arrow /></>}
                  </button>
                </form>
              </div>
            </Reveal>
          </div>

          {/* Map */}
          <Reveal className="mt-16 border border-line overflow-hidden" style={{ height: '340px' }}>
            <iframe
              title="Young Media Marketing Location"
              src={CONTACT.mapEmbed}
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(100%) contrast(1.05)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </div>
      </section>
    </>
  )
}

export default Contact
