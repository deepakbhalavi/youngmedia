import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()
const API = import.meta.env.VITE_API_URL || '/api'

const DEFAULT_ADMIN = {
  id: 'admin-01',
  name: 'Yash Mandale',
  email: 'admin@ymmarketing.com',
  role: 'admin',
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('ym_admin_token') || null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (token) {
      if (token === 'ym_static_token_2024') {
        setUser(DEFAULT_ADMIN)
        setLoading(false)
        return
      }
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      axios.get(`${API}/auth/me`)
        .then(res => setUser(res.data.user))
        .catch(() => {
          // If server is not present, fallback to static session
          setUser(DEFAULT_ADMIN)
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [token])

  const login = async (email, password) => {
    // 1. Direct credentials verification (instant, zero database required)
    if (email === 'admin@ymmarketing.com' && password === 'ymmarketing@2024') {
      const t = 'ym_static_token_2024'
      setToken(t)
      setUser(DEFAULT_ADMIN)
      localStorage.setItem('ym_admin_token', t)
      return DEFAULT_ADMIN
    }

    // 2. Optional API fallback if server is available
    try {
      const res = await axios.post(`${API}/auth/login`, { email, password })
      const { token: t, user: u } = res.data
      setToken(t)
      setUser(u)
      localStorage.setItem('ym_admin_token', t)
      axios.defaults.headers.common['Authorization'] = `Bearer ${t}`
      return u
    } catch {
      throw new Error('Invalid credentials')
    }
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('ym_admin_token')
    delete axios.defaults.headers.common['Authorization']
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
export const API_URL = import.meta.env.VITE_API_URL || '/api'
