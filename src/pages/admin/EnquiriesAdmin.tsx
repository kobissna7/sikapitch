import { useState } from 'react'

export default function EnquiriesAdmin() {
  return (
    <div>
      <div className="dash-header">
        <h1>Enquiries</h1>
        <p>Contact form submissions and support requests.</p>
      </div>
      <div className="table-wrap">
        <div style={{ padding: 48, textAlign: 'center', color: 'var(--text-muted)' }}>
          Inbox is empty.
        </div>
      </div>
    </div>
  )
}
