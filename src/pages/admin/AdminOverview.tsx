import { useState, useEffect } from 'react'
import { Users, Briefcase, FileCheck, MessageSquare } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { Link } from 'react-router-dom'

interface RecentStartup {
  id: string
  company_name: string
  industry: string
  status: string
  created_at: string
}

export default function AdminOverview() {
  const [stats, setStats] = useState({ startups: 0, investors: 0, pending: 0, enquiries: 0 })
  const [recentStartups, setRecentStartups] = useState<RecentStartup[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  async function loadStats() {
    try {
      setLoading(true)
      const [
        { count: startupCount },
        { count: investorCount },
        { count: pendingCount },
        { count: enquiryCount },
        { data: recent }
      ] = await Promise.all([
        supabase.from('startup_profiles').select('*', { count: 'exact', head: true }),
        supabase.from('investor_profiles').select('*', { count: 'exact', head: true }),
        supabase.from('startup_profiles').select('*', { count: 'exact', head: true }).eq('status', 'Pending'),
        supabase.from('enquiries').select('*', { count: 'exact', head: true }).neq('status', 'read'),
        supabase.from('startup_profiles').select('id, company_name, industry, status, created_at').order('created_at', { ascending: false }).limit(5),
      ])

      setStats({
        startups: startupCount || 0,
        investors: investorCount || 0,
        pending: pendingCount || 0,
        enquiries: enquiryCount || 0,
      })
      setRecentStartups(recent || [])
    } catch (err) {
      console.error('Failed to load stats', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return (
    <div style={{ padding: 48, textAlign: 'center', color: 'var(--text-muted)' }}>
      Loading dashboard...
    </div>
  )

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
        <div className="table-wrap-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Recent Startup Registrations</h3>
          <Link to="/admin/startups" style={{ fontSize: '0.8125rem', color: 'var(--gold)', textDecoration: 'none' }}>
            View All
          </Link>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Sector</th>
              <th>Registration Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentStartups.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', padding: 24, color: 'var(--text-muted)' }}>
                  No startups registered yet.
                </td>
              </tr>
            ) : recentStartups.map(s => (
              <tr key={s.id}>
                <td style={{ fontWeight: 600, color: 'var(--white)' }}>{s.company_name || 'Unnamed'}</td>
                <td><span className="badge" style={{ background: 'rgba(255,255,255,0.06)' }}>{s.industry || 'N/A'}</span></td>
                <td>{new Date(s.created_at).toLocaleDateString()}</td>
                <td>
                  <span className={`badge ${s.status === 'Approved' ? 'badge-green' : s.status === 'Rejected' ? 'badge-red' : 'badge-amber'}`}>
                    {s.status || 'Pending'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

