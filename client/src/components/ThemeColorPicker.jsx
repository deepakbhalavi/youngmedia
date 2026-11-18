import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiCheck, FiDroplet } from 'react-icons/fi'
import { useTheme } from '../context/ThemeContext'
import { COLOR_PRESETS } from '../context/themePresets'

const ThemeColorPicker = () => {
  const { primaryColor, changeColor, theme } = useTheme()
  const [open, setOpen] = useState(false)
  const [customHex, setCustomHex] = useState(primaryColor)
  const panelRef = useRef(null)

  /* Close on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) setOpen(false)
    }
    if (open) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  /* Sync custom input with context */
  useEffect(() => {
    setCustomHex(primaryColor)
  }, [primaryColor])

  const handleCustomChange = (e) => {
    const val = e.target.value
    setCustomHex(val)
    if (/^#[0-9A-Fa-f]{6}$/.test(val)) changeColor(val)
  }

  return (
    <div className="relative" ref={panelRef}>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(p => !p)}
        id="color-picker-toggle"
        aria-label="Change theme color"
        className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
        style={{
          background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}99)`,
          boxShadow: `0 0 12px rgba(var(--primary-rgb), 0.5)`,
          border: '2px solid rgba(255,255,255,0.2)',
        }}
      >
        <FiDroplet size={14} className="text-white" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="absolute right-0 top-12 w-64 rounded-2xl p-4 z-[200]"
            style={{
              background: theme === 'dark'
                ? 'rgba(10, 10, 28, 0.96)'
                : 'rgba(255, 255, 255, 0.96)',
              border: '1px solid rgba(var(--primary-rgb), 0.25)',
              backdropFilter: 'blur(20px)',
              boxShadow: `0 20px 60px rgba(0,0,0,0.4), 0 0 30px rgba(var(--primary-rgb), 0.15)`,
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: 'var(--primary)' }}>
                Theme Color
              </span>
              <button
                onClick={() => setOpen(false)}
                className="w-6 h-6 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                style={{ background: 'rgba(255,255,255,0.07)' }}
              >
                <FiX size={12} />
              </button>
            </div>

            {/* Preset swatches grid */}
            <div className="grid grid-cols-5 gap-2 mb-4">
              {COLOR_PRESETS.map(preset => {
                const isActive = primaryColor.toLowerCase() === preset.hex.toLowerCase()
                return (
                  <button
                    key={preset.hex}
                    onClick={() => changeColor(preset.hex)}
                    title={preset.name}
                    className="relative w-9 h-9 rounded-xl transition-all duration-200 hover:scale-110 hover:-translate-y-0.5"
                    style={{
                      background: preset.hex,
                      boxShadow: isActive
                        ? `0 0 0 2px white, 0 0 0 4px ${preset.hex}`
                        : `0 2px 8px ${preset.hex}55`,
                    }}
                  >
                    {isActive && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <FiCheck size={14} className="text-white drop-shadow" />
                      </span>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Divider */}
            <div className="h-px mb-3" style={{ background: 'rgba(var(--primary-rgb), 0.15)' }} />

            {/* Custom hex input */}
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-lg flex-shrink-0 border-2"
                style={{
                  background: customHex,
                  borderColor: 'rgba(255,255,255,0.15)',
                }}
              />
              <label className="text-[11px] text-gray-400 font-medium mr-1">Custom</label>
              <input
                type="text"
                value={customHex}
                onChange={handleCustomChange}
                maxLength={7}
                placeholder="#7B2FF7"
                className="flex-1 px-2 py-1.5 rounded-lg text-xs font-mono outline-none transition-all duration-200"
                style={{
                  background: theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
                  border: `1px solid rgba(var(--primary-rgb), 0.25)`,
                  color: theme === 'dark' ? '#f0f0ff' : '#111',
                }}
              />
              {/* Native color picker (invisible, triggered by swatch) */}
              <label className="cursor-pointer">
                <input
                  type="color"
                  value={customHex}
                  onChange={(e) => { setCustomHex(e.target.value); changeColor(e.target.value) }}
                  className="sr-only"
                />
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold transition-all hover:scale-105"
                  style={{ background: 'var(--primary)', boxShadow: `0 2px 8px rgba(var(--primary-rgb), 0.4)` }}
                  title="Pick color"
                >
                  ✎
                </div>
              </label>
            </div>

            {/* Live preview bar */}
            <div
              className="mt-3 h-1.5 rounded-full"
              style={{
                background: `linear-gradient(90deg, var(--primary-dark), var(--primary), var(--primary-light))`,
                boxShadow: `0 0 8px rgba(var(--primary-rgb), 0.5)`,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ThemeColorPicker
