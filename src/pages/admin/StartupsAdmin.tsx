import { useState, useEffect } from 'react'
import { Search, Filter, Check, X } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import toast from 'react-hot-toast'

interface StartupProfile {
  id: string
  company_name: string
  industry: string
  status: string
  created_at: string
  users?: Array<{
    full_name: string
    email: string
  }>
}

export default function StartupsAdmin() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')
  const [startups, setStartups] = useState<StartupProfile[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStartups()
  }, [])

  const fetchStartups = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('startup_profiles')
        .select(`
          id,
          company_name,
          industry,
          status,
          created_at,
          users (
            full_name,
            email
          )
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      setStartups(data || [])
    } catch (err: any) {
      toast.error('Failed to load startups: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('startup_profiles')
        .update({ status: newStatus })
        .eq('id', id)
      
      if (error) throw error
      toast.success(`Status updated to ${newStatus}`)
      fetchStartups() // Refresh list
    } catch (err: any) {
      toast.error('Failed to update status: ' + err.message)
    }
  }

  const filteredStartups = startups.filter(s => {
    const matchStatus = filterStatus === 'All' || s.status === filterStatus
    const term = searchTerm.toLowerCase()
    const matchSearch = 
      s.company_name?.toLowerCase().includes(term) || 
      s.users?.[0]?.full_name?.toLowerCase().includes(term) ||
      s.users?.[0]?.email?.toLowerCase().includes(term)
    return matchStatus && matchSearch
  })

  return (
    <div>
      <div className="dash-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>Startups</h1>
          <p>Manage and verify startup profiles.</p>
        </div>
        <button className="btn btn-gold" onClick={fetchStartups}>Refresh</button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200, maxWidth: 320 }}>
          <Search size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search startups..." 
            className="form-input"
            style={{ paddingLeft: 44, width: '100%', background: 'var(--black-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '12px 16px 12px 44px', color: 'var(--white)' }}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div style={{ position: 'relative' }}>
          <Filter size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <select 
            className="form-input"
            style={{ paddingLeft: 44, background: 'var(--black-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '12px 32px 12px 44px', color: 'var(--white)', appearance: 'none' }}
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="table-wrap">
        {loading ? (
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>Loading startups...</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Founder</th>
                <th>Sector</th>
                <th>Registration Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStartups.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: 24, color: 'var(--text-muted)' }}>
                    No startups found.
                  </td>
                </tr>
              ) : filteredStartups.map(s => (
                <tr key={s.id}>
                  <td style={{ fontWeight: 600, color: 'var(--white)' }}>
                    {s.company_name || 'Unnamed Company'}
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 400 }}>{s.users?.[0]?.email}</div>
                  </td>
                  <td>{s.users?.[0]?.full_name || 'Unknown'}</td>
                  <td><span className="badge" style={{ background: 'rgba(255,255,255,0.06)' }}>{s.industry || 'N/A'}</span></td>
                  <td>{new Date(s.created_at).toLocaleDateString()}</td>
                  <td>
                    <span className={`badge ${s.status === 'Approved' ? 'badge-green' : s.status === 'Pending' ? 'badge-amber' : 'alert-error'}`} style={s.status === 'Rejected' ? { padding: '4px 10px', fontSize: '0.6875rem', fontWeight: 700, borderRadius: '2px', textTransform: 'uppercase' } : {}}>
                      {s.status || 'Pending'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right', display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                    {s.status !== 'Approved' && (
                      <button onClick={() => handleUpdateStatus(s.id, 'Approved')} style={{ background: 'var(--gold)', border: 'none', color: '#000', cursor: 'pointer', padding: 6, borderRadius: 4 }} title="Approve">
                        <Check size={16} />
                      </button>
                    )}
                    {s.status !== 'Rejected' && (
                      <button onClick={() => handleUpdateStatus(s.id, 'Rejected')} style={{ background: 'rgba(255,50,50,0.2)', border: 'none', color: '#ff6b6b', cursor: 'pointer', padding: 6, borderRadius: 4 }} title="Reject">
                        <X size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

