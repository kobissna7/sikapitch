import { useState } from 'react'
import { Link } from 'react-router-dom'

const EVENTS = [
  {
    id: 1,
    title: 'SikaPitch Open Day 2025',
    date: 'October 2025',
    location: 'Accra, Ghana',
    type: 'Pitch Competition',
    sectors: ['AgriTech', 'FinTech', 'HealthTech'],
    status: 'open',
    description: 'Our flagship annual pitch event. Open to all early-stage startups across West Africa. Top pitches receive direct investor introductions and mentorship access.',
    deadline: 'Applications close 30 September 2025',
  },
  {
    id: 2,
    title: 'AgriTech Africa Pitch Day',
    date: 'November 2025',
    location: 'Virtual',
    type: 'Sector Event',
    sectors: ['AgriTech', 'CleanTech'],
    status: 'open',
    description: 'A dedicated pitch day for startups transforming food systems, supply chains, and agricultural productivity across Africa.',
    deadline: 'Applications close 15 October 2025',
  },
  {
    id: 3,
    title: 'SikaPitch SME Funding Roundtable',
    date: 'December 2025',
    location: 'Lagos, Nigeria',
    type: 'Roundtable',
    sectors: ['Manufacturing', 'Logistics', 'E-Commerce'],
    status: 'coming_soon',
    description: 'A focused roundtable for established SMEs seeking growth-stage capital. Structured format with pre-matched investor tables.',
    deadline: 'Applications opening soon',
  },
]

const TYPES = ['All', 'Pitch Competition', 'Sector Event', 'Roundtable']

export default function Events() {
  const [activeType, setActiveType] = useState('All')

  const filtered = activeType === 'All' ? EVENTS : EVENTS.filter(e => e.type === activeType)

  return (
    <>
      <section className="page-hero-navy section">
        <div className="container">
          <div style={{ maxWidth: 700 }}>
            <div className="label text-gold mb-16">Events</div>
            <h1 className="display-lg text-white mb-24">
              Pitch Events That Create Real Outcomes
            </h1>
            <p className="body-lg" style={{ color: 'rgba(255,255,255,0.75)', maxWidth: 560 }}>
              SikaPitch hosts structured pitch events that connect founders with investors in a transparent,
              curated environment. Each event is designed to produce funded outcomes, not just exposure.
            </p>
          </div>
        </div>
      </section>

      {/* FILTER */}
      <section className="section">
        <div className="container">
          <div className="tabs">
            {TYPES.map(t => (
              <button
                key={t}
                className={`tab-btn${activeType === t ? ' active' : ''}`}
                onClick={() => setActiveType(t)}
              >
                {t}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {filtered.map(event => (
              <div key={event.id} className="card" style={{ display: 'flex', gap: 40, alignItems: 'flex-start', padding: '32px' }}>
                <div style={{ flex: 1 }}>
                  <div className="flex gap-12 items-center mb-16" style={{ flexWrap: 'wrap' }}>
                    <span className={`badge ${event.status === 'open' ? 'badge-green' : 'badge-amber'}`}>
                      {event.status === 'open' ? 'Applications Open' : 'Coming Soon'}
                    </span>
                    <span className="badge badge-navy">{event.type}</span>
                  </div>
                  <h2 className="heading-lg mb-8">{event.title}</h2>
                  <div className="flex gap-24 mb-16" style={{ flexWrap: 'wrap' }}>
                    <span className="body-sm text-muted">
                      <strong style={{ color: 'var(--text-secondary)' }}>Date:</strong> {event.date}
                    </span>
                    <span className="body-sm text-muted">
                      <strong style={{ color: 'var(--text-secondary)' }}>Location:</strong> {event.location}
                    </span>
                  </div>
                  <p className="body-md text-secondary mb-16">{event.description}</p>
                  <div className="flex gap-8" style={{ flexWrap: 'wrap', marginBottom: 16 }}>
                    {event.sectors.map(s => <span key={s} className="badge badge-gold">{s}</span>)}
                  </div>
                  <p className="body-sm" style={{ color: 'var(--gold)', fontWeight: 600 }}>{event.deadline}</p>
                </div>
                <div style={{ flexShrink: 0 }}>
                  {event.status === 'open' ? (
                    <Link to="/register" className="btn btn-navy">Apply to Pitch</Link>
                  ) : (
                    <button className="btn btn-outline" disabled style={{ opacity: 0.6, cursor: 'not-allowed' }}>Notify Me</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT TO EXPECT */}
      <section className="section section-off-white">
        <div className="container">
          <div className="text-center mb-48">
            <div className="gold-line-center" />
            <h2 className="display-md">What to Expect at a SikaPitch Event</h2>
          </div>
          <div className="grid-3">
            {[
              { title: 'Structured Format', body: 'Each event follows a clear format: pitch, Q&A, and feedback. Founders know exactly what to prepare and how they will be evaluated.' },
              { title: 'Curated Investor Audience', body: 'Investors at our events are vetted and matched to the event\'s sector focus. You will pitch to people who can actually fund your business.' },
              { title: 'Post-Event Follow-Up', body: 'We don\'t stop at the event. Our team follows up on investor interest, facilitates introductions, and tracks outcomes for every participant.' },
            ].map(item => (
              <div key={item.title} className="card">
                <div style={{ width: 48, height: 4, background: 'var(--gold)', borderRadius: 2, marginBottom: 24 }} />
                <h3 className="heading-md mb-12">{item.title}</h3>
                <p className="body-sm text-secondary">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section-navy">
        <div className="container text-center">
          <h2 className="display-md text-white mb-16">Ready to Pitch?</h2>
          <p className="body-lg mb-32" style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 460, margin: '16px auto 32px' }}>
            Register your startup today to access event applications, investor matching, and more.
          </p>
          <Link to="/register" className="btn btn-primary btn-lg">Register Now</Link>
        </div>
      </section>
    </>
  )
}
