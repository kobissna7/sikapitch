import { Link, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { LayoutDashboard, FileText, Send, UserCircle, LogOut } from 'lucide-react'

// Dummy components for dashboard sub-routes
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
      <div className="card">
        <h3 className="heading-md mb-16">Profile Status</h3>
        <p className="body-sm text-secondary mb-16">Your profile needs a few more details before it can be shown to investors.</p>
        <div className="progress-meta mb-8">
          <span>Completion</span>
          <span>65%</span>
        </div>
        <div className="progress-bar mb-24">
          <div className="progress-fill" style={{ width: '65%' }}></div>
        </div>
        <Link to="/dashboard/profile" className="btn btn-outline btn-sm">Complete Profile</Link>
      </div>
      
      <div className="card">
        <h3 className="heading-md mb-16">Next Pitch Event</h3>
        <div className="badge badge-green mb-12">Applications Open</div>
        <h4 className="body-md font-semibold mb-8">SikaPitch Open Day 2025</h4>
        <p className="body-sm text-secondary mb-16">Deadline: 30 September 2025</p>
        <Link to="/events" className="btn btn-navy btn-sm">View Details</Link>
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
      <div className="card" style={{ maxWidth: 800 }}>
        <form style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div className="grid-2" style={{ gap: 24 }}>
            <div className="form-group">
              <label className="form-label">Company Name</label>
              <input type="text" className="form-input" defaultValue={user?.companyName} />
            </div>
            <div className="form-group">
              <label className="form-label">Sector</label>
              <select className="form-select">
                <option>AgriTech</option>
                <option>FinTech</option>
                <option>HealthTech</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Pitch / One-Liner</label>
            <input type="text" className="form-input" placeholder="What does your company do in one sentence?" />
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea className="form-textarea" placeholder="Detailed description of your business model and traction..."></textarea>
          </div>
          <button type="button" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Save Changes</button>
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
    <div className="card mb-24">
      <div className="file-drop">
        <FileText size={32} style={{ color: 'var(--grey-400)', margin: '0 auto 16px' }} />
        <h4 className="heading-md mb-8">Upload Pitch Deck</h4>
        <p className="body-sm text-secondary mb-16">PDF format, max 10MB.</p>
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
            <LayoutDashboard /> Overview
          </Link>
          <Link to="/dashboard/profile" className={`sidebar-link ${isActive('/dashboard/profile') ? 'active' : ''}`}>
            <UserCircle /> Business Profile
          </Link>
          <Link to="/dashboard/documents" className={`sidebar-link ${isActive('/dashboard/documents') ? 'active' : ''}`}>
            <FileText /> Documents
          </Link>
          
          <div className="sidebar-section">Actions</div>
          <button onClick={handleLogout} className="sidebar-link w-full text-left">
            <LogOut /> Sign Out
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
