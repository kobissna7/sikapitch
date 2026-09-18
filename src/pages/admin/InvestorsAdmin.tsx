import { useState, useEffect } from 'react'
import { Search, Check, X } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import toast from 'react-hot-toast'

interface InvestorProfile {
  id: string
  user_id?: string
  company_name: string
  focus: string
  ticket_size: string
  status: string
  created_at: string
  contact_email?: string
  full_name?: string
}

export default function InvestorsAdmin() {
  const [searchTerm, setSearchTerm] = useState('')
  const [investors, setInvestors] = useState<InvestorProfile[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchInvestors()
  }, [])

  const fetchInvestors = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('investor_profiles')
        .select('id, company_name, focus, ticket_size, status, created_at, contact_email, full_name, user_id')
        .order('created_at', { ascending: false })

      if (error) throw error
      setInvestors(data || [])
    } catch (err: any) {
      toast.error('Failed to load investors: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('investor_profiles')
        .update({ status: newStatus })
        .eq('id', id)
      
      if (error) throw error
      toast.success(`Status updated to ${newStatus}`)
      fetchInvestors() // Refresh list
    } catch (err: any) {
      toast.error('Failed to update status: ' + err.message)
    }
  }

  const filteredInvestors = investors.filter(i => {
    const term = searchTerm.toLowerCase()
    return (
      i.full_name?.toLowerCase().includes(term) ||
      i.company_name?.toLowerCase().includes(term) ||
      i.contact_email?.toLowerCase().includes(term) ||
      i.focus?.toLowerCase().includes(term)
    )
  })

  return (
    <div>
      <div className="dash-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>Investors</h1>
          <p>Manage investor profiles and match preferences.</p>
        </div>
        <button className="btn btn-gold" onClick={fetchInvestors}>Refresh</button>
      </div>

      <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200, maxWidth: 320 }}>
          <Search size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search investors..." 
            className="form-input"
            style={{ paddingLeft: 44, width: '100%', background: 'var(--black-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '12px 16px 12px 44px', color: 'var(--white)' }}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="table-wrap">
        {loading ? (
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>Loading investors...</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Name / Company</th>
                <th>Investment Focus</th>
                <th>Ticket Size</th>
                <th>Registration Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvestors.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: 24, color: 'var(--text-muted)' }}>
                    No investors found.
                  </td>
                </tr>
              ) : filteredInvestors.map(i => (
                <tr key={i.id}>
                  <td style={{ fontWeight: 600, color: 'var(--white)' }}>
                    {i.full_name || 'Unknown'}
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 400 }}>{i.company_name || i.contact_email}</div>
                  </td>
                  <td>{i.focus || 'N/A'}</td>
                  <td>{i.ticket_size || 'N/A'}</td>
                  <td>{new Date(i.created_at).toLocaleDateString()}</td>
                  <td>
                    <span className={`badge ${i.status === 'Approved' ? 'badge-green' : i.status === 'Pending' ? 'badge-amber' : 'alert-error'}`} style={i.status === 'Rejected' ? { padding: '4px 10px', fontSize: '0.6875rem', fontWeight: 700, borderRadius: '2px', textTransform: 'uppercase' } : {}}>
                      {i.status || 'Pending'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right', display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                    {i.status !== 'Approved' && (
                      <button onClick={() => handleUpdateStatus(i.id, 'Approved')} style={{ background: 'var(--gold)', border: 'none', color: '#000', cursor: 'pointer', padding: 6, borderRadius: 4 }} title="Approve">
                        <Check size={16} />
                      </button>
                    )}
                    {i.status !== 'Rejected' && (
                      <button onClick={() => handleUpdateStatus(i.id, 'Rejected')} style={{ background: 'rgba(255,50,50,0.2)', border: 'none', color: '#ff6b6b', cursor: 'pointer', padding: 6, borderRadius: 4 }} title="Reject">
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

