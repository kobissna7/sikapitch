import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { Eye, EyeOff } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const { login } = useAuth()
  const navigate = useNavigate()

  const validate = () => {
    let ok = true
    if (!email) { setEmailError('Email is required'); ok = false }
    else if (!/\S+@\S+\.\S+/.test(email)) { setEmailError('Enter a valid email'); ok = false }
    else setEmailError('')
    if (!password) { setPasswordError('Password is required'); ok = false }
    else setPasswordError('')
    return ok
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      await login(email, password)
      toast.success('Welcome back.')
      const stored = localStorage.getItem('sp_user')
      if (stored) {
        const u = JSON.parse(stored)
        if (u.role === 'admin') navigate('/admin')
        else if (u.role === 'investor') navigate('/investor-dashboard')
        else navigate('/dashboard')
      }
    } catch (err: any) {
      toast.error(err.message || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-layout" style={{ minHeight: '100vh', paddingTop: 'var(--nav-h)' }}>
      {/* ===== LEFT: FORM ===== */}
      <div className="auth-form-col" style={{ background: 'var(--navy-mid)' }}>

        <div style={{ maxWidth: 400, width: '100%', animationName: 'fadeInUp', animationDuration: '0.9s', animationFillMode: 'forwards' }}>
          {/* Kicker */}
          <div style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16 }}>
            Welcome Back
          </div>

          {/* Headline */}
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, color: 'var(--white)', lineHeight: 1.1, letterSpacing: '-0.025em', marginBottom: 12 }}>
            Sign In to<br />SikaPitch
          </h1>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', marginBottom: 48, lineHeight: 1.6 }}>
            Your funding journey continues here.
          </p>

          {/* Demo Info */}
          <div style={{
            background: 'rgba(201,162,39,0.08)', border: '1px solid rgba(201,162,39,0.2)',
            borderRadius: 4, padding: '12px 16px', marginBottom: 40, fontSize: '0.8125rem', color: 'rgba(255,255,255,0.5)',
          }}>
            <span style={{ color: 'var(--gold)', fontWeight: 600 }}>Demo: </span>
            startup@demo.com / demo123 &nbsp;·&nbsp; investor@demo.com / demo123 &nbsp;·&nbsp; admin@sikapitch.com / admin123
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div className="field-group" style={{ animationName: 'fadeInUp', animationDuration: '0.7s', animationDelay: '100ms', animationFillMode: 'forwards', opacity: 0 }}>
              <label className="field-label" htmlFor="login-email">Email Address</label>
              <input
                type="email" id="login-email"
                className={`field-input${emailError ? ' field-error' : ''}`}
                placeholder="you@example.com"
                value={email}
                onChange={e => { setEmail(e.target.value); if (emailError) setEmailError('') }}
                autoComplete="email"
              />
              {emailError && <div className="field-error-msg">{emailError}</div>}
            </div>

            {/* Password */}
            <div className="field-group" style={{ animationName: 'fadeInUp', animationDuration: '0.7s', animationDelay: '200ms', animationFillMode: 'forwards', opacity: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="field-label" htmlFor="login-password">Password</label>
                <button type="button" style={{ fontSize: '0.75rem', color: 'var(--gold)', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.04em', paddingBottom: 10 }}>
                  Forgot?
                </button>
              </div>
              <div className="field-pw-wrap">
                <input
                  type={showPw ? 'text' : 'password'} id="login-password"
                  className={`field-input${passwordError ? ' field-error' : ''}`}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => { setPassword(e.target.value); if (passwordError) setPasswordError('') }}
                  autoComplete="current-password"
                />
                <button type="button" className="field-pw-toggle" onClick={() => setShowPw(p => !p)} aria-label="Toggle password visibility">
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {passwordError && <div className="field-error-msg">{passwordError}</div>}
            </div>

            {/* Submit */}
            <div style={{ animationName: 'fadeInUp', animationDuration: '0.7s', animationDelay: '300ms', animationFillMode: 'forwards', opacity: 0 }}>
              <button
                type="submit"
                className="btn btn-gold"
                style={{ width: '100%', justifyContent: 'center', fontSize: '0.9375rem', padding: '16px 32px', marginBottom: 32 }}
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>

              <p style={{ textAlign: 'center', fontSize: '0.875rem', color: 'rgba(255,255,255,0.35)' }}>
                Don't have an account?{' '}
                <Link to="/register" style={{ color: 'var(--gold)', fontWeight: 600, borderBottom: '1px solid rgba(201,162,39,0.4)', paddingBottom: 1 }}>
                  Create one
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* ===== RIGHT: IMAGE ===== */}
      <div className="auth-image-col">
        <img
          src="https://images.unsplash.com/photo-1687422809654-579d81c29d32?auto=format&fit=crop&w=1400&q=80"
          alt="Founders on stage at a pitch event"
        />
        <div className="auth-image-overlay">
          <div>
            <p style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              fontWeight: 800, color: 'var(--white)', lineHeight: 1.15,
              letterSpacing: '-0.02em', marginBottom: 24,
            }}>
              Every pitch starts with<br /><span style={{ color: 'var(--gold)' }}>one decision.</span>
            </p>
            <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.55)', maxWidth: 340, lineHeight: 1.7 }}>
              The founders who got funded didn't wait for the perfect moment. They registered. They showed up. You can too.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
