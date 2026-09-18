import { useState, useEffect } from 'react'
import { Users, Briefcase, FileCheck, Calendar, MessageSquare, DollarSign } from 'lucide-react'
import { supabase } from '../../lib/supabase'

export default function AdminOverview() {
  const [stats, setStats] = useState({
    startups: 0,
    investors: 0,
    pending: 0,
    enquiries: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStats() {
      // Mock stats for now until backend is fully populated
      setStats({
        startups: 124,
        investors: 45,
        pending: 12,
        enquiries: 5,
      })
      setLoading(false)
    }
    loadStats()
  }, [])

  const STARTUPS = [
    { id: 1, name: 'AgriGrow Solutions', sector: 'AgriTech', status: 'Pending', date: '2026-09-08' },
    { id: 2, name: 'PayFluid', sector: 'FinTech', status: 'Approved', date: '2026-09-07' },
  ]

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <div className="dash-header">
        <h1>Admin Overview</h1>
        <p>Platform metrics and pending approvals.</p>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon stat-icon-gold"><Users size={24} /></div>
          <div className="stat-value">{stats.startups}</div>
          <div className="stat-label">Total Startups</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon stat-icon-navy"><Briefcase size={24} /></div>
          <div className="stat-value">{stats.investors}</div>
          <div className="stat-label">Total Investors</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon stat-icon-amber"><FileCheck size={24} /></div>
          <div className="stat-value">{stats.pending}</div>
          <div className="stat-label">Pending Verifications</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon stat-icon-green"><MessageSquare size={24} /></div>
          <div className="stat-value">{stats.enquiries}</div>
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
                <td style={{ fontWeight: 600, color: 'var(--white)' }}>{s.name}</td>
                <td><span className="badge" style={{ background: 'rgba(255,255,255,0.06)' }}>{s.sector}</span></td>
                <td>{s.date}</td>
                <td>
                  <span className={`badge ${s.status === 'Approved' ? 'badge-green' : 'badge-amber'}`}>
                    {s.status}
                  </span>
                </td>
                <td>
                  <button className="pill">Review</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
