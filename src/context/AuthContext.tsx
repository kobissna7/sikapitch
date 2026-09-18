import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export type UserRole = 'startup' | 'investor' | 'admin'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  companyName?: string
  verified: boolean
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (data: RegisterData) => Promise<void>
}

interface RegisterData {
  name: string
  email: string
  password: string
  role: UserRole
  companyName?: string
}

const AuthContext = createContext<AuthContextType | null>(null)

// Demo users for local development
const DEMO_USERS: (User & { password: string })[] = [
  { id: '1', name: 'Kwame Mensah', email: 'startup@demo.com', password: 'demo123', role: 'startup', companyName: 'AgriTech Ghana', verified: true },
  { id: '2', name: 'Abena Osei', email: 'investor@demo.com', password: 'demo123', role: 'investor', verified: true },
  { id: '3', name: 'Admin User', email: 'admin@sikapitch.com', password: 'admin123', role: 'admin', verified: true },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('sp_user')
    if (stored) {
      try { setUser(JSON.parse(stored)) } catch {}
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    const found = DEMO_USERS.find(u => u.email === email && u.password === password)
    if (!found) throw new Error('Invalid email or password')
    const { password: _, ...userData } = found
    setUser(userData)
    localStorage.setItem('sp_user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('sp_user')
  }

  const register = async (data: RegisterData) => {
    const newUser: User = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      role: data.role,
      companyName: data.companyName,
      verified: false,
    }
    setUser(newUser)
    localStorage.setItem('sp_user', JSON.stringify(newUser))
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
