import { useState } from 'react'

export default function DocumentsAdmin() {
  return (
    <div>
      <div className="dash-header">
        <h1>Documents</h1>
        <p>Review startup compliance and verification documents.</p>
      </div>
      <div className="table-wrap">
        <div style={{ padding: 48, textAlign: 'center', color: 'var(--text-muted)' }}>
          Document verification module is being initialized...
        </div>
      </div>
    </div>
  )
}
