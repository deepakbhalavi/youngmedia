import { useEffect, useRef } from 'react'

/**
 * Muted, looping video that reliably autoplays when in view.
 * Explicitly sets `video.defaultMuted = true` and `video.muted = true` on the DOM node.
 */
const AutoVideo = ({ src, className = '', label, threshold = 0.1 }) => {
  const ref = useRef(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return

    video.defaultMuted = true
    video.muted = true
    video.playsInline = true

    const tryPlay = () => {
      video.muted = true
      const p = video.play()
      if (p && typeof p.catch === 'function') {
        p.catch(() => {})
      }
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          tryPlay()
        } else {
          video.pause()
        }
      },
      { threshold, rootMargin: '200px 0px' }
    )

    io.observe(video)
    return () => io.disconnect()
  }, [src, threshold])

  const handleLoadedData = e => {
    const v = e.currentTarget
    v.muted = true
    v.play().catch(() => {})
  }

  return (
    <video
      ref={ref}
      src={src}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label}
      disablePictureInPicture
      onLoadedData={handleLoadedData}
    />
  )
}

export default AutoVideo
