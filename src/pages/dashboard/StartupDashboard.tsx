import { Link, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { LayoutDashboard, FileText, Send, UserCircle, LogOut } from 'lucide-react'

const cardStyle = {
  background: 'var(--black-mid)',
  borderRadius: 20,
  padding: 32,
}

const Overview = () => (
  <div>
    <div className="dash-header">
      <h1>Dashboard Overview</h1>
      <p>Welcome back! Here's what's happening with your startup profile.</p>
    </div>

    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon stat-icon-gold"><UserCircle size={24} /></div>
        <div className="stat-value">65%</div>
        <div className="stat-label">Profile Completion</div>
      </div>
      <div className="stat-card">
        <div className="stat-icon stat-icon-navy"><FileText size={24} /></div>
        <div className="stat-value">2</div>
        <div className="stat-label">Documents Uploaded</div>
      </div>
      <div className="stat-card">
        <div className="stat-icon stat-icon-green"><Send size={24} /></div>
        <div className="stat-value">1</div>
        <div className="stat-label">Active Applications</div>
      </div>
    </div>

    <div className="grid-2" style={{ gap: 24 }}>
      <div style={cardStyle}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 700, color: 'var(--white)', marginBottom: 12 }}>Profile Status</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem', marginBottom: 20 }}>Your profile needs a few more details before it can be shown to investors.</p>
        <div className="progress-meta mb-8">
          <span>Completion</span>
          <span>65%</span>
        </div>
        <div className="progress-bar" style={{ marginBottom: 24 }}>
          <div className="progress-fill" style={{ width: '65%' }}></div>
        </div>
        <Link to="/dashboard/profile" className="btn btn-outline btn-sm">Complete Profile</Link>
      </div>

      <div style={cardStyle}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 700, color: 'var(--white)', marginBottom: 12 }}>Next Pitch Event</h3>
        <span className="badge badge-green" style={{ marginBottom: 12, display: 'inline-block' }}>Applications Open</span>
        <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--white)', marginBottom: 8 }}>SikaPitch Open Day 2025</h4>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: 20 }}>Deadline: 30 September 2025</p>
        <Link to="/events" className="btn btn-ghost btn-sm">View Details</Link>
      </div>
    </div>
  </div>
)

const Profile = () => {
  const { user } = useAuth()
  return (
    <div>
      <div className="dash-header">
        <h1>Business Profile</h1>
        <p>Manage your startup details and visibility.</p>
      </div>
      <div style={{ ...cardStyle, maxWidth: 800 }}>
        <form style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div className="grid-2" style={{ gap: 24 }}>
            <div className="field-group">
              <label className="field-label">Company Name</label>
              <input type="text" className="field-input" defaultValue={user?.companyName} />
            </div>
            <div className="field-group">
              <label className="field-label">Sector</label>
              <select className="field-select">
                <option>AgriTech</option>
                <option>FinTech</option>
                <option>HealthTech</option>
              </select>
            </div>
          </div>
          <div className="field-group">
            <label className="field-label">Pitch / One-Liner</label>
            <input type="text" className="field-input" placeholder="What does your company do in one sentence?" />
          </div>
          <div className="field-group">
            <label className="field-label">Description</label>
            <textarea className="field-input" style={{ minHeight: 120, resize: 'vertical' }} placeholder="Detailed description of your business model and traction..."></textarea>
          </div>
          <button type="button" className="btn btn-gold" style={{ alignSelf: 'flex-start' }}>Save Changes</button>
        </form>
      </div>
    </div>
  )
}

const Documents = () => (
  <div>
    <div className="dash-header">
      <h1>Documents</h1>
      <p>Upload your pitch deck and supporting files.</p>
    </div>
    <div style={{ ...cardStyle, marginBottom: 24 }}>
      <div className="file-drop">
        <FileText size={32} style={{ color: 'var(--text-muted)', margin: '0 auto 16px' }} />
        <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 700, color: 'var(--white)', marginBottom: 8 }}>Upload Pitch Deck</h4>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: 20 }}>PDF format, max 10MB.</p>
        <button className="btn btn-outline btn-sm">Browse Files</button>
      </div>
    </div>
  </div>
)

export default function StartupDashboard() {
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
            <div className="sidebar-avatar">{user?.name?.charAt(0) || 'S'}</div>
            <div className="sidebar-username">{user?.companyName || user?.name}</div>
            <div className="sidebar-role">Startup Account</div>
          </div>

          <div className="sidebar-section">Main Menu</div>
          <Link to="/dashboard" className={`sidebar-link ${isActive('/dashboard') ? 'active' : ''}`}>
            <LayoutDashboard size={18} /> Overview
          </Link>
          <Link to="/dashboard/profile" className={`sidebar-link ${isActive('/dashboard/profile') ? 'active' : ''}`}>
            <UserCircle size={18} /> Business Profile
          </Link>
          <Link to="/dashboard/documents" className={`sidebar-link ${isActive('/dashboard/documents') ? 'active' : ''}`}>
            <FileText size={18} /> Documents
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
          <Route path="/profile" element={<Profile />} />
          <Route path="/documents" element={<Documents />} />
        </Routes>
      </div>
    </div>
  )
}
