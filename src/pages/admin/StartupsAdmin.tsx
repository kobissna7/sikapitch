import { useState } from 'react'
import { Search, Filter, MoreHorizontal } from 'lucide-react'

const MOCK_STARTUPS = [
  { id: 1, name: 'AgriGrow Solutions', founder: 'Kwame Mensah', email: 'kwame@agrigrow.co', sector: 'AgriTech', status: 'Pending', date: '2026-09-08' },
  { id: 2, name: 'PayFluid', founder: 'Abena Osei', email: 'abena@payfluid.io', sector: 'FinTech', status: 'Approved', date: '2026-09-07' },
  { id: 3, name: 'HealthSync', founder: 'Dr. John Doe', email: 'john@healthsync.com', sector: 'HealthTech', status: 'Approved', date: '2026-09-05' },
  { id: 4, name: 'EduSmart', founder: 'Jane Smith', email: 'jane@edusmart.net', sector: 'EdTech', status: 'Rejected', date: '2026-09-01' },
]

export default function StartupsAdmin() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')

  return (
    <div>
      <div className="dash-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>Startups</h1>
          <p>Manage and verify startup profiles.</p>
        </div>
        <button className="btn btn-gold">Export CSV</button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: 320 }}>
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
        <table className="data-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Founder</th>
              <th>Sector</th>
              <th>Registration Date</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {MOCK_STARTUPS.map(s => (
              <tr key={s.id}>
                <td style={{ fontWeight: 600, color: 'var(--white)' }}>
                  {s.name}
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 400 }}>{s.email}</div>
                </td>
                <td>{s.founder}</td>
                <td><span className="badge" style={{ background: 'rgba(255,255,255,0.06)' }}>{s.sector}</span></td>
                <td>{s.date}</td>
                <td>
                  <span className={`badge ${s.status === 'Approved' ? 'badge-green' : s.status === 'Pending' ? 'badge-amber' : 'alert-error'}`} style={s.status === 'Rejected' ? { padding: '4px 10px', fontSize: '0.6875rem', fontWeight: 700, borderRadius: '2px', textTransform: 'uppercase' } : {}}>
                    {s.status}
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
