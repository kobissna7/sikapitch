import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth, type UserRole } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { Eye, EyeOff } from 'lucide-react'

export default function Register() {
  const [searchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState<'startup' | 'investor'>(
    searchParams.get('type') === 'investor' ? 'investor' : 'startup'
  )
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const tabStartRef = useRef<HTMLButtonElement>(null)
  const tabInvestorRef = useRef<HTMLButtonElement>(null)
  const [indicatorStyle, setIndicatorStyle] = useState({ left: '0px', width: '0px' })

  const { register } = useAuth()
  const navigate = useNavigate()

  // Slide indicator on tab change
  useEffect(() => {
    const btn = activeTab === 'startup' ? tabStartRef.current : tabInvestorRef.current
    if (btn) {
      const { offsetLeft, offsetWidth } = btn
      setIndicatorStyle({ left: `${offsetLeft}px`, width: `${offsetWidth}px` })
    }
  }, [activeTab])

  useEffect(() => {
    if (searchParams.get('type') === 'investor') setActiveTab('investor')
  }, [searchParams])

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!name.trim()) errs.name = 'Full name is required'
    if (!email.trim()) errs.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'Enter a valid email'
    if (!password) errs.password = 'Password is required'
    else if (password.length < 6) errs.password = 'Must be at least 6 characters'
    if (activeTab === 'startup' && !companyName.trim()) errs.companyName = 'Company name is required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      await register({ name, email, password, role: activeTab as UserRole, companyName })
      toast.success('Account created. Welcome to SikaPitch.')
      if (activeTab === 'investor') navigate('/investor-dashboard')
      else navigate('/dashboard')
    } catch (err: any) {
      toast.error(err.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  const clearError = (field: string) => setErrors(prev => { const n = { ...prev }; delete n[field]; return n })

  return (
    <div className="auth-layout" style={{ height: '100vh', overflow: 'hidden', paddingTop: 'var(--nav-h)' }}>
      {/* ===== LEFT: FORM ===== */}
      <div className="auth-form-col" style={{ background: 'var(--navy-mid)', overflowY: 'auto' }}>

        <div style={{ maxWidth: 420, width: '100%' }}>
          {/* Kicker */}
          <div style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16 }}>
            Join the Platform
          </div>

          {/* Headline */}
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, color: 'var(--white)', lineHeight: 1.1, letterSpacing: '-0.025em', marginBottom: 12 }}>
            Create Your<br />Account
          </h1>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', marginBottom: 24, lineHeight: 1.6 }}>
            Africa's boldest founders start here.
          </p>

          {/* SLIDING TABS */}
          <div className="auth-tabs" style={{ marginBottom: 24 }}>
            <button
              ref={tabStartRef}
              className={`auth-tab-btn${activeTab === 'startup' ? ' active' : ''}`}
              onClick={() => setActiveTab('startup')}
              type="button"
            >
              Startup / SME
            </button>
            <button
              ref={tabInvestorRef}
              className={`auth-tab-btn${activeTab === 'investor' ? ' active' : ''}`}
              onClick={() => setActiveTab('investor')}
              type="button"
            >
              Investor
            </button>
            <div className="auth-tab-indicator" style={indicatorStyle} />
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* Full Name */}
            <div className="field-group" style={{ marginBottom: 20, animationName: 'fadeInUp', animationDuration: '0.7s', animationDelay: '100ms', animationFillMode: 'forwards', opacity: 0 }}>
              <label className="field-label" htmlFor="reg-name">Full Name</label>
              <input
                type="text" id="reg-name"
                className={`field-input${errors.name ? ' field-error' : ''}`}
                placeholder="Your full name"
                value={name}
                onChange={e => { setName(e.target.value); clearError('name') }}
                autoComplete="name"
              />
              {errors.name && <div className="field-error-msg">{errors.name}</div>}
            </div>

            {/* Company / Firm */}
            <div className="field-group" style={{ marginBottom: 20, animationName: 'fadeInUp', animationDuration: '0.7s', animationDelay: '180ms', animationFillMode: 'forwards', opacity: 0 }}>
              <label className="field-label" htmlFor="reg-company">
                {activeTab === 'startup' ? 'Company / Startup Name' : 'Investment Firm (Optional)'}
              </label>
              <input
                type="text" id="reg-company"
                className={`field-input${errors.companyName ? ' field-error' : ''}`}
                placeholder={activeTab === 'startup' ? 'Your company name' : 'e.g. Acacia Capital'}
                value={companyName}
                onChange={e => { setCompanyName(e.target.value); clearError('companyName') }}
              />
              {errors.companyName && <div className="field-error-msg">{errors.companyName}</div>}
            </div>

            {/* Email */}
            <div className="field-group" style={{ marginBottom: 20, animationName: 'fadeInUp', animationDuration: '0.7s', animationDelay: '260ms', animationFillMode: 'forwards', opacity: 0 }}>
              <label className="field-label" htmlFor="reg-email">Email Address</label>
              <input
                type="email" id="reg-email"
                className={`field-input${errors.email ? ' field-error' : ''}`}
                placeholder="you@example.com"
                value={email}
                onChange={e => { setEmail(e.target.value); clearError('email') }}
                autoComplete="email"
              />
              {errors.email && <div className="field-error-msg">{errors.email}</div>}
            </div>

            {/* Password */}
            <div className="field-group" style={{ marginBottom: 20, animationName: 'fadeInUp', animationDuration: '0.7s', animationDelay: '340ms', animationFillMode: 'forwards', opacity: 0 }}>
              <label className="field-label" htmlFor="reg-password">Password</label>
              <div className="field-pw-wrap">
                <input
                  type={showPw ? 'text' : 'password'} id="reg-password"
                  className={`field-input${errors.password ? ' field-error' : ''}`}
                  placeholder="Min. 6 characters"
                  value={password}
                  onChange={e => { setPassword(e.target.value); clearError('password') }}
                  autoComplete="new-password"
                />
                <button type="button" className="field-pw-toggle" onClick={() => setShowPw(p => !p)} aria-label="Toggle password visibility">
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <div className="field-error-msg">{errors.password}</div>}
            </div>

            {/* Terms */}
            <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.3)', marginBottom: 20, lineHeight: 1.6, animationName: 'fadeInUp', animationDuration: '0.7s', animationDelay: '420ms', animationFillMode: 'forwards', opacity: 0 }}>
              By registering, you agree to our{' '}
              <Link to="/terms" style={{ color: 'var(--gold)', borderBottom: '1px solid rgba(201,162,39,0.35)', paddingBottom: 1 }}>Terms & Conditions</Link>
              {' '}and{' '}
              <Link to="/privacy" style={{ color: 'var(--gold)', borderBottom: '1px solid rgba(201,162,39,0.35)', paddingBottom: 1 }}>Privacy Policy</Link>.
            </p>

            {/* Submit */}
            <div style={{ animationName: 'fadeInUp', animationDuration: '0.7s', animationDelay: '500ms', animationFillMode: 'forwards', opacity: 0 }}>
              <button
                type="submit"
                className="btn btn-gold"
                style={{ width: '100%', justifyContent: 'center', fontSize: '0.9375rem', padding: '16px 32px', marginBottom: 32 }}
                disabled={loading}
              >
                {loading ? 'Creating Account...' : `Register as ${activeTab === 'startup' ? 'Startup' : 'Investor'}`}
              </button>

              <p style={{ textAlign: 'center', fontSize: '0.875rem', color: 'rgba(255,255,255,0.35)' }}>
                Already have an account?{' '}
                <Link to="/login" style={{ color: 'var(--gold)', fontWeight: 600, borderBottom: '1px solid rgba(201,162,39,0.4)', paddingBottom: 1 }}>
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* ===== RIGHT: IMAGE ===== */}
      <div className="auth-image-col">
        <img
          src="https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&w=1400&q=80"
          alt="Founders in a business pitch meeting"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div className="auth-image-overlay">
          <div>
            <p style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              fontWeight: 800, color: 'var(--white)', lineHeight: 1.15,
              letterSpacing: '-0.02em', marginBottom: 24,
            }}>
              The investors are<br /><span style={{ color: 'var(--gold)' }}>already waiting.</span>
            </p>
            <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.55)', maxWidth: 340, lineHeight: 1.7 }}>
              Register today. Build your profile. Get matched. The founders who get funded are the ones who took the first step.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
