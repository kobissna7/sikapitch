export default function SettingsAdmin() {
  return (
    <div>
      <div className="dash-header">
        <h1>Platform Settings</h1>
        <p>Global site configuration and admin user management.</p>
      </div>
      <div style={{ maxWidth: 600 }}>
        <div className="table-wrap" style={{ padding: 24 }}>
          <h3 style={{ marginBottom: 16 }}>Admin Access</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: 24 }}>
            New administrators must first create a regular account on Supabase, then have their User ID added to the <code>admin_roles</code> table manually by a super admin.
          </p>
          <div className="alert alert-info">
            Configuration options will be available in v1.1.
          </div>
        </div>
      </div>
    </div>
  )
}
