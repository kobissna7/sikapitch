import { useState } from 'react'
import { Plus } from 'lucide-react'

export default function EventsAdmin() {
  return (
    <div>
      <div className="dash-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>Events</h1>
          <p>Manage platform events, summits, and pitch days.</p>
        </div>
        <button className="btn btn-gold" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Plus size={16} /> New Event
        </button>
      </div>
      <div className="table-wrap">
        <div style={{ padding: 48, textAlign: 'center', color: 'var(--text-muted)' }}>
          No events created yet.
        </div>
      </div>
    </div>
  )
}
