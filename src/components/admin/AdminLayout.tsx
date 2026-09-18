import { useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Users, Briefcase, FileCheck, FolderOpen,
  Calendar, Zap, MessageSquare, CreditCard, Settings,
  LogOut, Menu, X, ChevronRight,
} from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { clearAdminSession } from './AdminAuthWrapper'

const NAV_ITEMS = [
  { label: 'Overview', icon: LayoutDashboard, path: '/admin' },
  { label: 'Startups', icon: Users, path: '/admin/startups' },
  { label: 'Investors', icon: Briefcase, path: '/admin/investors' },
  { label: 'Pitch Applications', icon: FileCheck, path: '/admin/pitches' },
  { label: 'Documents', icon: FolderOpen, path: '/admin/documents' },
  { label: 'Events', icon: Calendar, path: '/admin/events' },
  { label: 'Investor Matching', icon: Zap, path: '/admin/matching' },
  { label: 'Enquiries', icon: MessageSquare, path: '/admin/enquiries' },
  { label: 'Payments', icon: CreditCard, path: '/admin/payments' },
  { label: 'Settings', icon: Settings, path: '/admin/settings' },
]

export default function AdminLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (path: string) => {
    if (path === '/admin') return location.pathname === '/admin'
    return location.pathname.startsWith(path)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    clearAdminSession()
    navigate('/admin/login')
  }

  const adminEmail = sessionStorage.getItem('adminSessionUserId') ? 'Admin' : 'Admin'
  const currentPage = NAV_ITEMS.find(n => isActive(n.path))?.label ?? 'Dashboard'

  return (
    <div className="admin-shell">
      {/* ===== SIDEBAR ===== */}
      <aside className={`admin-sidebar ${mobileOpen ? 'open' : ''}`}>
        {/* Brand */}
        <div className="admin-sidebar-brand">
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.125rem', color: 'var(--white)' }}>
            Sika<span style={{ color: 'var(--gold)' }}>Pitch</span>
          </span>
          <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginTop: 2 }}>
            Admin Console
          </span>
        </div>

        {/* User Badge */}
        <div className="admin-user-badge">
          <div className="admin-avatar">A</div>
          <div>
            <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--white)' }}>{adminEmail}</div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--gold)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Super Admin</div>
          </div>
        </div>

        {/* Nav Section */}
        <div className="admin-nav-section-label">Management</div>
        <nav>
          {NAV_ITEMS.map(({ label, icon: Icon, path }) => (
            <Link
              key={path}
              to={path}
              className={`admin-nav-link ${isActive(path) ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              <Icon size={16} />
              <span>{label}</span>
              {isActive(path) && <ChevronRight size={14} style={{ marginLeft: 'auto', opacity: 0.5 }} />}
            </Link>
          ))}
        </nav>

        {/* Sign Out */}
        <div className="admin-nav-section-label" style={{ marginTop: 'auto' }}>System</div>
        <button className="admin-nav-link" onClick={handleSignOut} style={{ width: '100%', textAlign: 'left' }}>
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="admin-sidebar-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ===== MAIN AREA ===== */}
      <div className="admin-main">
        {/* Top Bar */}
        <header className="admin-topbar">
          <button
            className="admin-hamburger"
            onClick={() => setMobileOpen(p => !p)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
            <span>Admin</span>
            <ChevronRight size={14} />
            <span style={{ color: 'var(--white)', fontWeight: 600 }}>{currentPage}</span>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.875rem', color: 'var(--black)' }}>A</div>
          </div>
        </header>

        {/* Page Content */}
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
