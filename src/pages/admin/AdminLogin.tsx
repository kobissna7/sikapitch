import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { supabase } from '../../lib/supabase'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error('Please enter your email and password.')
      return
    }
    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error || !data.session) {
        throw new Error(error?.message ?? 'Login failed')
      }

      // Check admin_roles table
      const { data: role, error: roleError } = await supabase
        .from('admin_roles')
        .select('*')
        .eq('user_id', data.user.id)
        .maybeSingle()

      if (roleError || !role) {
        await supabase.auth.signOut()
        toast.error('Access denied. This account does not have admin privileges.')
        setLoading(false)
        return
      }

      // Store session flags
      sessionStorage.setItem('isAdminAuthenticated', 'true')
      sessionStorage.setItem('adminRole', role.role ?? 'admin')
      sessionStorage.setItem('adminSessionUserId', data.user.id)

      toast.success('Welcome back.')
      navigate('/admin')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred.'
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-layout" style={{ minHeight: '100vh' }}>
      {/* Left: Form */}
      <div className="auth-form-col" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ maxWidth: 400, width: '100%', margin: '0 auto' }}>
          {/* Logo + Brand */}
          <Link to="/" style={{ display: 'inline-block', marginBottom: 40 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.5rem', color: 'var(--white)' }}>
              Sika<span style={{ color: 'var(--gold)' }}>Pitch</span>
            </span>
          </Link>

          {/* Admin badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 28 }}>
            <span style={{ fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)' }}>Admin Access</span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, color: 'var(--white)', marginBottom: 8, lineHeight: 1.1 }}>
            Sign in to the<br />
            <span style={{ color: 'var(--gold)' }}>Control Room.</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem', marginBottom: 40 }}>
            Admin access only. Unauthorized attempts are logged.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <div className="field-group">
              <label className="field-label">Email Address</label>
              <input
                className="field-input"
                type="email"
                placeholder="admin@sikapitch.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div className="field-group">
              <label className="field-label">Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  className="field-input"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  style={{ paddingRight: 48 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer' }}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-gold"
              disabled={loading}
              style={{ width: '100%', justifyContent: 'center', fontSize: '0.875rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, marginTop: 8 }}
            >
              {loading ? (
                <><Loader2 size={16} className="spin" /> Verifying...</>
              ) : (
                'Access Dashboard'
              )}
            </button>
          </form>

          <p style={{ marginTop: 32, color: 'var(--text-muted)', fontSize: '0.8125rem', textAlign: 'center' }}>
            <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'underline' }}>← Back to SikaPitch</Link>
          </p>
        </div>
      </div>

      {/* Right: Image */}
      <div className="auth-image-col">
        <img
          src="https://images.unsplash.com/photo-1573164574511-73c773193279?auto=format&fit=crop&w=1400&q=80"
          alt="African entrepreneur speaking at a business event"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
        />
        <div className="auth-image-overlay">
          <blockquote style={{ fontFamily: 'var(--font-display)', fontSize: '1.625rem', fontWeight: 800, lineHeight: 1.25, color: 'var(--white)', maxWidth: 420 }}>
            Every great company starts with<br />
            <span style={{ color: 'var(--gold)' }}>someone who said yes.</span>
          </blockquote>
        </div>
      </div>
    </div>
  )
}
