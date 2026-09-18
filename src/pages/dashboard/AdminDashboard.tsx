import { Link, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { LayoutDashboard, Users, FileCheck, Calendar, MessageSquare, DollarSign, LogOut } from 'lucide-react'

const STARTUPS = [
  { id: 1, name: 'AgriGrow Solutions', sector: 'AgriTech', status: 'Pending Review', date: '2026-09-08' },
  { id: 2, name: 'PayFluid', sector: 'FinTech', status: 'Verified', date: '2026-09-07' },
]

const Overview = () => (
  <div>
    <div className="dash-header">
      <h1>Admin Dashboard</h1>
      <p>Platform metrics and pending approvals.</p>
    </div>
    
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon stat-icon-gold"><Users size={24} /></div>
        <div className="stat-value">124</div>
        <div className="stat-label">Total Startups</div>
      </div>
      <div className="stat-card">
        <div className="stat-icon stat-icon-navy"><Users size={24} /></div>
        <div className="stat-value">45</div>
        <div className="stat-label">Total Investors</div>
      </div>
      <div className="stat-card">
        <div className="stat-icon stat-icon-amber"><FileCheck size={24} /></div>
        <div className="stat-value">12</div>
        <div className="stat-label">Pending Verification</div>
      </div>
      <div className="stat-card">
        <div className="stat-icon stat-icon-green"><MessageSquare size={24} /></div>
        <div className="stat-value">5</div>
        <div className="stat-label">New Enquiries</div>
      </div>
    </div>
    
    <div className="table-wrap">
      <div className="table-wrap-header">
        <h3>Recent Startup Registrations</h3>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Sector</th>
            <th>Registration Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {STARTUPS.map(s => (
            <tr key={s.id}>
              <td style={{ fontWeight: 600 }}>{s.name}</td>
              <td><span className="badge badge-grey">{s.sector}</span></td>
              <td>{s.date}</td>
              <td>
                <span className={`badge ${s.status === 'Verified' ? 'badge-green' : 'badge-amber'}`}>
                  {s.status}
                </span>
              </td>
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

export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  
  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/')

  return (
    <div className="dash-layout">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-inner">
          <div className="sidebar-user">
            <div className="sidebar-avatar" style={{ background: 'var(--white)', color: 'var(--navy)' }}>A</div>
            <div className="sidebar-username">System Admin</div>
            <div className="sidebar-role">SikaPitch HQ</div>
          </div>
          
          <div className="sidebar-section">Management</div>
          <Link to="/admin" className={`sidebar-link ${location.pathname === '/admin' ? 'active' : ''}`}>
            <LayoutDashboard /> Overview
          </Link>
          <Link to="/admin/users" className={`sidebar-link ${isActive('/admin/users') ? 'active' : ''}`}>
            <Users /> Users & Verification
          </Link>
          <Link to="/admin/pitches" className={`sidebar-link ${isActive('/admin/pitches') ? 'active' : ''}`}>
            <FileCheck /> Pitch Applications
          </Link>
          <Link to="/admin/events" className={`sidebar-link ${isActive('/admin/events') ? 'active' : ''}`}>
            <Calendar /> Events Management
          </Link>
          <Link to="/admin/enquiries" className={`sidebar-link ${isActive('/admin/enquiries') ? 'active' : ''}`}>
            <MessageSquare /> Enquiries
          </Link>
          <Link to="/admin/payments" className={`sidebar-link ${isActive('/admin/payments') ? 'active' : ''}`}>
            <DollarSign /> Payments & Sponsorship
          </Link>
          
          <div className="sidebar-section">System</div>
          <button onClick={handleLogout} className="sidebar-link w-full text-left">
            <LogOut /> Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="dash-main">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/users" element={<div className="dash-header"><h1>Users Management</h1><p>Module coming soon.</p></div>} />
          <Route path="/pitches" element={<div className="dash-header"><h1>Pitch Applications</h1><p>Module coming soon.</p></div>} />
          <Route path="/events" element={<div className="dash-header"><h1>Events Management</h1><p>Module coming soon.</p></div>} />
          <Route path="/enquiries" element={<div className="dash-header"><h1>Enquiries Inbox</h1><p>Module coming soon.</p></div>} />
          <Route path="/payments" element={<div className="dash-header"><h1>Payments Ledger</h1><p>Module coming soon.</p></div>} />
        </Routes>
      </div>
    </div>
  )
}
