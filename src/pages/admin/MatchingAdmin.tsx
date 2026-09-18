import { useState } from 'react'
import { Zap } from 'lucide-react'

export default function MatchingAdmin() {
  return (
    <div>
      <div className="dash-header">
        <h1>Investor Matching</h1>
        <p>Manually trigger matches or review algorithmic pairings.</p>
      </div>
      <div className="table-wrap">
        <div style={{ padding: 48, textAlign: 'center', color: 'var(--text-muted)' }}>
          <Zap size={48} style={{ margin: '0 auto 16px', color: 'var(--gold)' }} />
          <p>Matching engine is offline.</p>
        </div>
      </div>
    </div>
  )
}
