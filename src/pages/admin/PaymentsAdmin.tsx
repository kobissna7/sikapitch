import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import toast from 'react-hot-toast'

interface Payment {
  id: string
  amount: number
  currency: string
  status: string
  payment_type: string
  created_at: string
  users?: Array<{
    full_name: string
    email: string
  }>
}

export default function PaymentsAdmin() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPayments()
  }, [])

  const fetchPayments = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('payments')
        .select(`
          id,
          amount,
          currency,
          status,
          payment_type,
          created_at,
          users (
            full_name,
            email
          )
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      setPayments(data || [])
    } catch (err: any) {
      toast.error('Failed to load payments: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const totalRevenue = payments
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + (p.amount || 0), 0)

  return (
    <div>
      <div className="dash-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>Payments Ledger</h1>
          <p>Registration fees, sponsorships, and platform transactions.</p>
        </div>
        <button className="btn btn-gold" onClick={fetchPayments}>Refresh</button>
      </div>

      {/* Stats row */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 32, flexWrap: 'wrap' }}>
        {[
          { label: 'Total Revenue', value: `GHS ${(totalRevenue / 100).toLocaleString()}` },
          { label: 'Total Transactions', value: payments.length },
          { label: 'Pending', value: payments.filter(p => p.status === 'pending').length },
        ].map(stat => (
          <div key={stat.label} style={{ flex: 1, minWidth: 140, background: 'var(--black-surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '20px 24px' }}>
            <div style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8 }}>{stat.label}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--white)' }}>{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="table-wrap">
        {loading ? (
          <div style={{ padding: 48, textAlign: 'center', color: 'var(--text-muted)' }}>Loading transactions...</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: 24, color: 'var(--text-muted)' }}>
                    No transactions recorded.
                  </td>
                </tr>
              ) : payments.map(p => (
                <tr key={p.id}>
                  <td style={{ fontWeight: 600, color: 'var(--white)' }}>
                    {p.users?.[0]?.full_name || 'Unknown'}
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 400 }}>{p.users?.[0]?.email}</div>
                  </td>
                  <td><span className="badge badge-dark">{p.payment_type || 'N/A'}</span></td>
                  <td style={{ fontWeight: 700, color: 'var(--gold)' }}>
                    {p.currency || 'GHS'} {((p.amount || 0) / 100).toFixed(2)}
                  </td>
                  <td>
                    <span className={`badge ${p.status === 'paid' ? 'badge-green' : p.status === 'pending' ? 'badge-amber' : 'badge-red'}`}>
                      {p.status}
                    </span>
                  </td>
                  <td>{new Date(p.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

