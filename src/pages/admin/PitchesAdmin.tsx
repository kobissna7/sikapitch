import { useState, useEffect } from 'react'
import { Eye } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import toast from 'react-hot-toast'

interface Pitch {
  id: string
  title: string
  status: string
  created_at: string
  deck_url?: string
  startup_id?: string
  founder_name?: string
}

export default function PitchesAdmin() {
  const [pitches, setPitches] = useState<Pitch[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPitches()
  }, [])

  const fetchPitches = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('pitches')
        .select('id, title, status, created_at, deck_url, startup_id, founder_name')
        .order('created_at', { ascending: false })

      if (error) throw error
      setPitches(data || [])
    } catch (err: any) {
      toast.error('Failed to load pitches: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('pitches')
        .update({ status: newStatus })
        .eq('id', id)
      
      if (error) throw error
      toast.success(`Status updated to ${newStatus}`)
      fetchPitches() // Refresh list
    } catch (err: any) {
      toast.error('Failed to update status: ' + err.message)
    }
  }

  return (
    <div>
      <div className="dash-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>Pitch Applications</h1>
          <p>Review startup pitch decks and assign to events.</p>
        </div>
        <button className="btn btn-gold" onClick={fetchPitches}>Refresh</button>
      </div>

      <div className="table-wrap">
        {loading ? (
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>Loading pitches...</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Startup</th>
                <th>Pitch Title</th>
                <th>Submitted</th>
                <th>Status</th>
                <th>Deck</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pitches.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: 24, color: 'var(--text-muted)' }}>
                    No pitch applications found.
                  </td>
                </tr>
              ) : pitches.map(p => (
                <tr key={p.id}>
                  <td style={{ fontWeight: 600, color: 'var(--white)' }}>
                    {p.founder_name || 'Unknown'}
                  </td>
                  <td>{p.title || 'Untitled Pitch'}</td>
                  <td>{new Date(p.created_at).toLocaleDateString()}</td>
                  <td>
                    <span className={`badge ${p.status === 'Approved' ? 'badge-green' : p.status === 'Reviewing' ? 'badge-amber' : p.status === 'Pending' ? 'badge-amber' : 'alert-error'}`} style={p.status === 'Rejected' ? { padding: '4px 10px', fontSize: '0.6875rem', fontWeight: 700, borderRadius: '2px', textTransform: 'uppercase' } : {}}>
                      {p.status || 'Pending'}
                    </span>
                  </td>
                  <td>
                    {p.deck_url ? (
                      <a href={p.deck_url} target="_blank" rel="noreferrer" style={{ color: 'var(--gold)', display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.8125rem' }}>
                        <Eye size={14} /> View Deck
                      </a>
                    ) : (
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.8125rem' }}>No Deck</span>
                    )}
                  </td>
                  <td style={{ display: 'flex', gap: 8 }}>
                    {p.status !== 'Approved' && (
                      <button onClick={() => handleUpdateStatus(p.id, 'Approved')} style={{ background: 'var(--gold)', border: 'none', color: '#000', cursor: 'pointer', padding: '4px 8px', borderRadius: 4, fontSize: '0.75rem', fontWeight: 600 }}>
                        Approve
                      </button>
                    )}
                    {p.status !== 'Rejected' && (
                      <button onClick={() => handleUpdateStatus(p.id, 'Rejected')} style={{ background: 'rgba(255,50,50,0.2)', border: 'none', color: '#ff6b6b', cursor: 'pointer', padding: '4px 8px', borderRadius: 4, fontSize: '0.75rem', fontWeight: 600 }}>
                        Reject
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

