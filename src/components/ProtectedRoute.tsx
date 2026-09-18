import { Navigate } from 'react-router-dom'
import { useAuth, type UserRole } from '../context/AuthContext'

interface Props {
  children: React.ReactNode
  role: UserRole
}

export default function ProtectedRoute({ children, role }: Props) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#F7F8FA' }}>
        <div style={{ textAlign: 'center' }}>
          <img src="/logo.png" alt="SikaPitch" style={{ height: 40, marginBottom: 16, opacity: 0.6 }} />
          <p style={{ color: '#4A5068', fontFamily: 'Inter, sans-serif' }}>Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace />
  if (user.role !== role) {
    if (user.role === 'admin') return <Navigate to="/admin" replace />
    if (user.role === 'investor') return <Navigate to="/investor-dashboard" replace />
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}
