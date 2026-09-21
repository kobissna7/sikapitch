import { Link, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { LayoutDashboard, Users, Bookmark, LogOut } from 'lucide-react'

const cardStyle = {
  background: 'var(--black-mid)',
  borderRadius: 20,
  padding: 32,
}

// Dummy Data
const MATCHES = [
  { id: 1, name: 'AgriGrow Solutions', sector: 'AgriTech', stage: 'Seed', description: 'IoT solutions for smallholder farmers in West Africa.' },
  { id: 2, name: 'PayFluid', sector: 'FinTech', stage: 'Pre-Seed', description: 'Cross-border B2B payments infrastructure.' },
]

const Overview = () => (
  <div>
    <div className="dash-header">
      <h1>Investor Dashboard</h1>
      <p>Your curated deal flow and matches.</p>
    </div>

    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon stat-icon-navy"><Users size={24} /></div>
        <div className="stat-value">12</div>
        <div className="stat-label">New Matches</div>
      </div>
      <div className="stat-card">
        <div className="stat-icon stat-icon-gold"><Bookmark size={24} /></div>
        <div className="stat-value">4</div>
        <div className="stat-label">Saved Startups</div>
      </div>
    </div>

    <div className="table-wrap">
      <div className="table-wrap-header">
        <h3>Recent Matches</h3>
        <Link to="/investor-dashboard/dealflow" className="btn btn-ghost btn-sm">View All</Link>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>Startup Name</th>
            <th>Sector</th>
            <th>Stage</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {MATCHES.map(m => (
            <tr key={m.id}>
              <td style={{ fontWeight: 600 }}>{m.name}</td>
              <td><span className="badge badge-grey">{m.sector}</span></td>
              <td>{m.stage}</td>
              <td style={{ color: 'var(--text-muted)' }}>{m.description}</td>
              <td>
                <button className="btn btn-outline btn-sm" style={{ padding: '6px 12px' }}>Review</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)

const DealFlow = () => (
  <div>
    <div className="dash-header">
      <h1>Deal Flow</h1>
      <p>Browse and filter startups matching your investment mandate.</p>
    </div>
    <div className="grid-2" style={{ gap: 24 }}>
      {MATCHES.map(m => (
        <div key={m.id} style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--white)' }}>{m.name}</h3>
            <span className="badge badge-gold">{m.sector}</span>
          </div>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: 12 }}><strong style={{ color: 'var(--text-body)' }}>Stage:</strong> {m.stage}</div>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 24 }}>{m.description}</p>
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn btn-gold btn-sm">Full Profile</button>
            <button className="btn btn-ghost btn-sm">Save</button>
          </div>
        </div>
      ))}
    </div>
  </div>
)

export default function InvestorDashboard() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="dash-layout">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-inner">
          <div className="sidebar-user">
            <div className="sidebar-avatar">{user?.name?.charAt(0) || 'I'}</div>
            <div className="sidebar-username">{user?.name}</div>
            <div className="sidebar-role">Investor Account</div>
          </div>

          <div className="sidebar-section">Main Menu</div>
          <Link to="/investor-dashboard" className={`sidebar-link ${isActive('/investor-dashboard') ? 'active' : ''}`}>
            <LayoutDashboard size={18} /> Overview
          </Link>
          <Link to="/investor-dashboard/dealflow" className={`sidebar-link ${isActive('/investor-dashboard/dealflow') ? 'active' : ''}`}>
            <Users size={18} /> Deal Flow
          </Link>

          <div className="sidebar-section">Actions</div>
          <button onClick={handleLogout} className="sidebar-link" style={{ width: '100%', textAlign: 'left' }}>
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="dash-main">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/dealflow" element={<DealFlow />} />
        </Routes>
      </div>
    </div>
  )
}
