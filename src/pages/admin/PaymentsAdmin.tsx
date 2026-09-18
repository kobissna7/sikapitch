export default function PaymentsAdmin() {
  return (
    <div>
      <div className="dash-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>Payments Ledger</h1>
          <p>Registration fees, sponsorships, and platform transactions.</p>
        </div>
        <button className="btn btn-gold">Export CSV</button>
      </div>
      <div className="table-wrap">
        <div style={{ padding: 48, textAlign: 'center', color: 'var(--text-muted)' }}>
          No transactions recorded.
        </div>
      </div>
    </div>
  )
}
