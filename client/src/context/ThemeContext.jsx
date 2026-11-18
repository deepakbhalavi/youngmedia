import { createContext, useContext, useEffect } from 'react'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  useEffect(() => {
    // Remove any dark/light class — just use plain purple theme
    document.documentElement.className = ''
    // Clear any previously stored overrides
    localStorage.removeItem('ym_theme')
    localStorage.removeItem('ym_primary')
  }, [])

  return (
    <ThemeContext.Provider value={{}}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext) ?? {}
