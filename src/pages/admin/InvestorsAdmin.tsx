import { Search, MoreHorizontal } from 'lucide-react'

const MOCK_INVESTORS = [
  { id: 1, name: 'Abena Osei', company: 'Savannah VC', email: 'abena@savannah.vc', focus: 'FinTech, AgriTech', ticket: '$50k - $250k', status: 'Approved', date: '2026-09-07' },
  { id: 2, name: 'Kwasi Appiah', company: 'Angel Investor', email: 'kwasi@invest.com', focus: 'EdTech, SaaS', ticket: '$10k - $50k', status: 'Pending', date: '2026-09-10' },
]

export default function InvestorsAdmin() {
  const [searchTerm, setSearchTerm] = useState('')
  
  return (
    <div>
      <div className="dash-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>Investors</h1>
          <p>Manage investor profiles and match preferences.</p>
        </div>
        <button className="btn btn-gold">Export CSV</button>
      </div>

      <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: 320 }}>
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
        <table className="data-table">
          <thead>
            <tr>
              <th>Name / Company</th>
              <th>Investment Focus</th>
              <th>Ticket Size</th>
              <th>Registration Date</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {MOCK_INVESTORS.map(i => (
              <tr key={i.id}>
                <td style={{ fontWeight: 600, color: 'var(--white)' }}>
                  {i.name}
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 400 }}>{i.company}</div>
                </td>
                <td>{i.focus}</td>
                <td>{i.ticket}</td>
                <td>{i.date}</td>
                <td>
                  <span className={`badge ${i.status === 'Approved' ? 'badge-green' : 'badge-amber'}`}>
                    {i.status}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 8 }}>
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
