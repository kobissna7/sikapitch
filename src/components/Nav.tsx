import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const NAV_LINKS = [
  { label: 'For Startups', href: '/for-startups' },
  { label: 'For Investors', href: '/for-investors' },
  { label: 'Events', href: '/events' },
  { label: 'About', href: '/about' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handler = () => {
      const scrollY = window.scrollY
      setScrolled(scrollY > 20)

      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0
      setScrollProgress(Math.min(progress, 100))
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [location])

  const handleLogout = () => { logout(); navigate('/') }
  const getDashboardLink = () => {
    if (!user) return '/login'
    if (user.role === 'admin') return '/admin'
    if (user.role === 'investor') return '/investor-dashboard'
    return '/dashboard'
  }

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        className="progress-scroll-bar"
        style={{ width: `${scrollProgress}%` }}
      />

      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">
          <Link to="/">
            <img src="/logo.png" alt="SikaPitch" className="nav-logo" />
          </Link>

          <div className="nav-links">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                to={link.href}
                className={`nav-link${location.pathname === link.href ? ' active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="nav-actions">
            {user ? (
              <>
                <Link to={getDashboardLink()} className="btn btn-ghost btn-sm">Dashboard</Link>
                <button onClick={handleLogout} className="btn btn-gold btn-sm">Sign Out</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost btn-sm">Sign In</Link>
                <Link to="/register" className="btn btn-gold btn-sm">Get Started</Link>
              </>
            )}
          </div>

          <button
            className="nav-hamburger"
            onClick={() => setMobileOpen(p => !p)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <span style={{ transform: mobileOpen ? 'rotate(45deg) translate(5px, 5px)' : undefined }} />
            <span style={{ opacity: mobileOpen ? 0 : 1 }} />
            <span style={{ transform: mobileOpen ? 'rotate(-45deg) translate(5px, -5px)' : undefined }} />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${mobileOpen ? ' open' : ''}`}>
        {NAV_LINKS.map(link => (
          <Link key={link.href} to={link.href} className="mobile-link">{link.label}</Link>
        ))}
        <div className="mobile-actions">
          {user ? (
            <>
              <Link to={getDashboardLink()} className="btn btn-ghost w-full" style={{ justifyContent: 'center' }}>Dashboard</Link>
              <button onClick={handleLogout} className="btn btn-gold w-full" style={{ justifyContent: 'center' }}>Sign Out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost w-full" style={{ justifyContent: 'center' }}>Sign In</Link>
              <Link to="/register" className="btn btn-gold w-full" style={{ justifyContent: 'center' }}>Get Started</Link>
            </>
          )}
        </div>
      </div>
    </>
  )
}
