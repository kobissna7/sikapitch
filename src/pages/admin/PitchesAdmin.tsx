import { Eye } from 'lucide-react'

const MOCK_PITCHES = [
  { id: 1, startup: 'AgriGrow Solutions', event: 'Accra Tech Summit 2026', submitted: '2026-09-12', status: 'Under Review' },
  { id: 2, startup: 'HealthSync', event: 'Global Pitch Q3', submitted: '2026-09-01', status: 'Shortlisted' },
  { id: 3, startup: 'EduSmart', event: 'Accra Tech Summit 2026', submitted: '2026-08-25', status: 'Rejected' },
]

export default function PitchesAdmin() {
  return (
    <div>
      <div className="dash-header">
        <h1>Pitch Applications</h1>
        <p>Review startup pitch decks and assign to events.</p>
      </div>

      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Startup</th>
              <th>Target Event</th>
              <th>Submitted</th>
              <th>Status</th>
              <th>Deck</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_PITCHES.map(p => (
              <tr key={p.id}>
                <td style={{ fontWeight: 600, color: 'var(--white)' }}>{p.startup}</td>
                <td>{p.event}</td>
                <td>{p.submitted}</td>
                <td>
                  <span className={`badge ${p.status === 'Shortlisted' ? 'badge-green' : p.status === 'Under Review' ? 'badge-amber' : 'alert-error'}`} style={p.status === 'Rejected' ? { padding: '4px 10px', fontSize: '0.6875rem', fontWeight: 700, borderRadius: '2px', textTransform: 'uppercase' } : {}}>
                    {p.status}
                  </span>
                </td>
                <td>
                  <a href="#" style={{ color: 'var(--gold)', display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.8125rem' }}>
                    <Eye size={14} /> View Deck
                  </a>
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
