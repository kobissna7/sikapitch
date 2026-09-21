import { useState } from 'react'
import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'

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
      {/* HERO */}
      <section style={{ background: 'var(--black)', paddingTop: 'calc(var(--nav-h) + 80px)', paddingBottom: 'clamp(60px, 8vw, 100px)' }}>
        <div className="container">
          <div style={{ maxWidth: 880 }}>
            <ScrollReveal>
              <div className="kicker" style={{ marginBottom: 24 }}>Events</div>
              <h1 className="display-xl text-white" style={{ marginBottom: 32, lineHeight: 1.1 }}>
                Pitch Events That<br /><span style={{ color: 'var(--gold)' }}>Create Outcomes.</span>
              </h1>
              <p className="body-lg" style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 600 }}>
                SikaPitch hosts structured pitch events that connect founders with investors in a transparent,
                curated environment. Each event is designed to produce funded outcomes, not just exposure.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FILTER & LIST */}
      <section style={{ background: 'var(--black-mid)', padding: 'var(--section-pad) 0' }}>
        <div className="container">
          <div style={{ 
            display: 'flex', gap: 32, overflowX: 'auto', paddingBottom: 16, marginBottom: 48,
            borderBottom: '1px solid rgba(255,255,255,0.08)', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch'
          }}>
            {TYPES.map(t => (
              <button
                key={t}
                onClick={() => setActiveType(t)}
                style={{
                  fontSize: '0.8125rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: activeType === t ? 'var(--gold)' : 'rgba(255,255,255,0.4)',
                  borderBottom: activeType === t ? '2px solid var(--gold)' : '2px solid transparent',
                  paddingBottom: 12, whiteSpace: 'nowrap', transition: 'all 0.3s'
                }}
              >
                {t}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {filtered.map((event, i) => (
              <ScrollReveal key={event.id} delay={i * 100}>
                <div style={{ 
                  display: 'flex', flexWrap: 'wrap', gap: 40, alignItems: 'flex-start', 
                  padding: '48px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' 
                }}>
                  <div style={{ flex: '1 1 500px' }}>
                    <div className="flex gap-12 items-center mb-24" style={{ flexWrap: 'wrap' }}>
                      <span className="badge badge-gold" style={{ background: event.status === 'open' ? 'rgba(201,162,39,0.1)' : 'rgba(255,255,255,0.05)', color: event.status === 'open' ? 'var(--gold)' : 'var(--white)', border: 'none' }}>
                        {event.status === 'open' ? 'Applications Open' : 'Coming Soon'}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        {event.type}
                      </span>
                    </div>
                    <h2 className="display-md text-white" style={{ marginBottom: 16, lineHeight: 1.1 }}>{event.title}</h2>
                    <div className="flex gap-24 mb-24" style={{ flexWrap: 'wrap' }}>
                      <span className="body-sm">
                        <strong style={{ color: 'var(--white)' }}>Date:</strong> <span style={{ color: 'rgba(255,255,255,0.5)' }}>{event.date}</span>
                      </span>
                      <span className="body-sm">
                        <strong style={{ color: 'var(--white)' }}>Location:</strong> <span style={{ color: 'rgba(255,255,255,0.5)' }}>{event.location}</span>
                      </span>
                    </div>
                    <p className="body-lg" style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 24 }}>{event.description}</p>
                    <div className="flex gap-8" style={{ flexWrap: 'wrap', marginBottom: 24 }}>
                      {event.sectors.map(s => <span key={s} className="pill">{s}</span>)}
                    </div>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--gold)', fontWeight: 600 }}>{event.deadline}</p>
                  </div>
                  <div style={{ flexShrink: 0, width: '100%', maxWidth: 240 }}>
                    {event.status === 'open' ? (
                      <Link to="/register" className="btn btn-gold w-full" style={{ justifyContent: 'center', padding: '16px' }}>Apply to Pitch</Link>
                    ) : (
                      <button className="btn w-full" disabled style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.3)', cursor: 'not-allowed', padding: '16px', justifyContent: 'center' }}>Notify Me</button>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT TO EXPECT */}
      <section style={{ background: 'var(--black)', padding: 'var(--section-pad) 0' }}>
        <div className="container">
          <ScrollReveal style={{ textAlign: 'center', marginBottom: 80 }}>
            <div className="kicker" style={{ justifyContent: 'center' }}>The Standard</div>
            <h2 className="display-lg text-white">What to Expect</h2>
          </ScrollReveal>
          <div className="grid-3" style={{ gap: 40 }}>
            {[
              { num: '01', title: 'Structured Format', body: 'Each event follows a clear format: pitch, Q&A, and feedback. Founders know exactly what to prepare and how they will be evaluated.' },
              { num: '02', title: 'Curated Audience', body: 'Investors at our events are vetted and matched to the event\'s sector focus. You will pitch to people who can actually fund your business.' },
              { num: '03', title: 'Real Follow-Up', body: 'We don\'t stop at the event. Our team follows up on investor interest, facilitates introductions, and tracks outcomes for every participant.' },
            ].map((item, i) => (
              <ScrollReveal key={item.num} delay={i * 100}>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3.5rem, 10vw, 4.5rem)', fontWeight: 800, color: 'transparent', WebkitTextStroke: '2px rgba(201,162,39,0.4)', marginBottom: 24 }}>{item.num}</div>
                  <h3 className="heading-lg text-white" style={{ marginBottom: 16 }}>{item.title}</h3>
                  <p className="body-md" style={{ color: 'rgba(255,255,255,0.5)' }}>{item.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--black-mid)', padding: 'var(--section-pad) 0', textAlign: 'center' }}>
        <div className="container">
          <ScrollReveal>
            <h2 className="display-xl text-white" style={{ marginBottom: 24, lineHeight: 1.1 }}>
              Ready to <span style={{ color: 'var(--gold)' }}>Pitch?</span>
            </h2>
            <p className="body-lg" style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 500, margin: '0 auto 48px' }}>
              Register your startup today to access event applications, investor matching, and more.
            </p>
            <Link to="/register" className="btn btn-gold btn-lg" style={{ padding: '20px 48px', fontSize: '1.125rem' }}>Start Your Application</Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
