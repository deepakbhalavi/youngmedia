import { motion } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'
import { CONTACT } from '../data/site'

const WhatsAppButton = () => (
  <motion.a
    href={CONTACT.whatsappChat}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat on WhatsApp"
    className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 group"
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
  >
    <span className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-ink text-white border border-ink
      transition-colors duration-500 group-hover:bg-sage group-hover:text-ink group-hover:border-sage">
      <FaWhatsapp size={22} />
    </span>
  </motion.a>
)

export default WhatsAppButton
