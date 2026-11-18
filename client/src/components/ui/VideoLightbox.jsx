import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX } from 'react-icons/fi'
import { driveEmbed, driveView } from '../../data/site'
import { EASE } from './Motion'

/**
 * Fullscreen lightbox for a project / reel.
 * item: { title, client?, category?, description?, type: 'video' | 'drive', src?, fileId? }
 */
const VideoLightbox = ({ item, onClose }) => {
  useEffect(() => {
    if (!item) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey) }
  }, [item, onClose])

  return createPortal(
    <AnimatePresence>
      {item && (
        <motion.div
          key="lightbox"
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
          style={{ background: 'rgba(17,17,17,0.92)' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          onClick={onClose}
          role="dialog" aria-modal="true" aria-label={item.title}
        >
          <motion.div
            className="relative w-full max-w-5xl flex flex-col"
            initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-end justify-between gap-6 mb-4 text-white">
              <div className="min-w-0">
                {(item.client || item.category) && (
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/60 mb-1 truncate">
                    {[item.client, item.category].filter(Boolean).join(' — ')}
                  </p>
                )}
                <h3 className="font-display text-xl sm:text-2xl font-medium tracking-tight truncate">{item.title}</h3>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                {item.type === 'drive' && (
                  <a href={driveView(item.fileId)} target="_blank" rel="noopener noreferrer"
                    className="hidden sm:inline-flex text-xs text-white/70 hover:text-white border border-white/20 hover:border-white/60 rounded-full px-4 py-2 transition-colors">
                    Open in Drive ↗
                  </a>
                )}
                <button onClick={onClose} aria-label="Close"
                  className="w-11 h-11 rounded-full border border-white/20 hover:border-white hover:bg-white hover:text-ink text-white flex items-center justify-center transition-colors">
                  <FiX size={18} />
                </button>
              </div>
            </div>

            {item.type === 'drive' ? (
              <div className="relative w-full bg-black" style={{ paddingBottom: '56.25%' }}>
                <iframe src={driveEmbed(item.fileId)} title={item.title}
                  allow="autoplay; encrypted-media" allowFullScreen
                  className="absolute inset-0 w-full h-full" style={{ border: 'none' }} />
              </div>
            ) : (
              <div className="w-full bg-black flex items-center justify-center">
                <video
                  key={item.src}
                  src={item.src}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-[78vh] w-auto max-w-full"
                />
              </div>
            )}

            {item.description && (
              <p className="text-white/70 text-sm leading-relaxed mt-4 max-w-2xl">{item.description}</p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

export default VideoLightbox
