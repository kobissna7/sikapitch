import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import toast from 'react-hot-toast'

interface Enquiry {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: string
  created_at: string
}

export default function EnquiriesAdmin() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    fetchEnquiries()
  }, [])

  const fetchEnquiries = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('enquiries')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setEnquiries(data || [])
    } catch (err: any) {
      toast.error('Failed to load enquiries: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleMarkRead = async (id: string) => {
    try {
      const { error } = await supabase
        .from('enquiries')
        .update({ status: 'read' })
        .eq('id', id)
      if (error) throw error
      toast.success('Marked as read')
      fetchEnquiries()
    } catch (err: any) {
      toast.error('Failed to update: ' + err.message)
    }
  }

  return (
    <div>
      <div className="dash-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>Enquiries</h1>
          <p>Contact form submissions and support requests.</p>
        </div>
        <button className="btn btn-gold" onClick={fetchEnquiries}>Refresh</button>
      </div>
      <div className="table-wrap">
        {loading ? (
          <div style={{ padding: 48, textAlign: 'center', color: 'var(--text-muted)' }}>Loading enquiries...</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>From</th>
                <th>Subject</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: 24, color: 'var(--text-muted)' }}>
                    Inbox is empty.
                  </td>
                </tr>
              ) : enquiries.map(e => (
                <>
                  <tr key={e.id} style={{ cursor: 'pointer' }} onClick={() => setExpanded(expanded === e.id ? null : e.id)}>
                    <td style={{ fontWeight: 600, color: 'var(--white)' }}>
                      {e.name}
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 400 }}>{e.email}</div>
                    </td>
                    <td>{e.subject || 'No subject'}</td>
                    <td>{new Date(e.created_at).toLocaleDateString()}</td>
                    <td>
                      <span className={`badge ${e.status === 'read' ? 'badge-grey' : 'badge-amber'}`}>
                        {e.status || 'unread'}
                      </span>
                    </td>
                    <td>
                      {e.status !== 'read' && (
                        <button
                          onClick={(ev) => { ev.stopPropagation(); handleMarkRead(e.id) }}
                          style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 4, color: 'var(--text-muted)', padding: '4px 10px', cursor: 'pointer', fontSize: '0.75rem' }}
                        >
                          Mark Read
                        </button>
                      )}
                    </td>
                  </tr>
                  {expanded === e.id && (
                    <tr key={`${e.id}-expanded`}>
                      <td colSpan={5} style={{ background: 'rgba(255,255,255,0.02)', padding: '16px 24px', borderTop: '1px solid var(--border)' }}>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-body)', lineHeight: 1.7 }}>{e.message}</p>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

