/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        /* ── Minimalist Modern Agency design system ── */
        ink:   '#111111',   // primary text
        muted: '#666666',   // secondary text
        line:  '#E5E5E5',   // borders
        paper: '#FFFFFF',   // primary background
        stone: '#F5F5F2',   // secondary background
        sage:  { DEFAULT: '#B8C6A5', light: '#DCE3D2', dark: '#8E9E7B' },

        /* ── Legacy palettes (still used by the admin panel) ── */
        theme: {
          bg:          'var(--color-bg)',
          'bg-alt':    'var(--color-bg-alt)',
          'bg-darker': 'var(--color-bg-darker)',
          surface:     'var(--color-surface)',
          border:      'var(--color-border)',
          text:        'var(--color-text)',
          muted:       'var(--color-muted)',
          purple:      'var(--color-purple)',
          accent:      'var(--color-accent)',
        },
        purple: {
          50:  '#F5F0FF', 100: '#EDE5FF', 200: '#D4C0FF', 300: '#B897FF', 400: '#9B6DFF',
          500: '#6828E8', 600: '#5920C8', 700: '#4A18A8', 800: '#3B1088', 900: '#291064', 950: '#170838',
        },
        dark: {
          50:  '#3A3A4A', 100: '#2E2E3E', 200: '#252535', 300: '#1E1E2E', 400: '#19191F',
          500: '#141418', 600: '#101014', 700: '#0C0C10', 800: '#0A0A0E', 900: '#050508',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        sans:    ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        site: '1440px',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      animation: {
        'fade-in':    'fadeIn 0.6s ease-out forwards',
        'slide-up':   'slideUp 0.7s ease-out forwards',
        'marquee':    'marquee 40s linear infinite',
        'pulse-ring': 'pulseRing 1.8s ease-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'orb-float':  'orbFloat 6s ease-in-out infinite',
        'spin-slow':  'spin 10s linear infinite',
      },
      keyframes: {
        fadeIn:    { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp:   { '0%': { opacity: '0', transform: 'translateY(40px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        marquee:   { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        pulseRing: { '0%': { transform: 'scale(1)', opacity: '0.8' }, '100%': { transform: 'scale(1.7)', opacity: '0' } },
        glowPulse: { '0%, 100%': { opacity: '0.6' }, '50%': { opacity: '1' } },
        orbFloat:  { '0%, 100%': { transform: 'translate(0, 0)' }, '50%': { transform: 'translate(20px, -20px)' } },
      },
      screens: { 'xs': '480px' },
    },
  },
  plugins: [],
}
