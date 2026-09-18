import { useEffect, useState, type ReactNode } from 'react'
import { useNavigate, useLocation, Navigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

interface AdminAuthWrapperProps {
  children: ReactNode
}

export default function AdminAuthWrapper({ children }: AdminAuthWrapperProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [checking, setChecking] = useState(true)
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    const verify = async () => {
      try {
        // First check sessionStorage for cached auth
        const cachedUserId = sessionStorage.getItem('adminSessionUserId')
        const cachedAuth = sessionStorage.getItem('isAdminAuthenticated')

        const { data: { session } } = await supabase.auth.getSession()

        if (!session) {
          clearAdminSession()
          setAuthorized(false)
          setChecking(false)
          return
        }

        // If sessionStorage matches current session, trust it
        if (cachedAuth === 'true' && cachedUserId === session.user.id) {
          setAuthorized(true)
          setChecking(false)
          return
        }

        // Re-verify against admin_roles table
        const { data: role, error } = await supabase
          .from('admin_roles')
          .select('*')
          .eq('user_id', session.user.id)
          .maybeSingle()

        if (error || !role) {
          await supabase.auth.signOut()
          clearAdminSession()
          setAuthorized(false)
        } else {
          sessionStorage.setItem('isAdminAuthenticated', 'true')
          sessionStorage.setItem('adminRole', role.role ?? 'admin')
          sessionStorage.setItem('adminSessionUserId', session.user.id)
          setAuthorized(true)
        }
      } catch {
        clearAdminSession()
        setAuthorized(false)
      } finally {
        setChecking(false)
      }
    }

    verify()
  }, [navigate])

  if (checking) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--black)',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div className="spinner" style={{ width: 40, height: 40, border: '3px solid var(--border)', borderTopColor: 'var(--gold)', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Verifying access...</p>
        </div>
      </div>
    )
  }

  if (!authorized) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}

export function clearAdminSession() {
  sessionStorage.removeItem('isAdminAuthenticated')
  sessionStorage.removeItem('adminRole')
  sessionStorage.removeItem('adminSessionUserId')
}
