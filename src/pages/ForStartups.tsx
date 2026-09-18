import { Link } from 'react-router-dom'

const BENEFITS = [
  { title: 'Business Registration', body: 'Register and verify your startup. Build trust with investors from day one.' },
  { title: 'Pitch Applications', body: 'Apply to events and track your status from submission through to outcome.' },
  { title: 'Investor Matching', body: 'Our system matches you with investors whose mandate aligns with your business.' },
  { title: 'Document Hub', body: 'Securely upload pitch decks, financials, and filings in one investor-ready space.' },
]

export default function ForStartups() {
  return (
    <div className="for-startups-grid" style={{
      minHeight: '100vh',
      paddingTop: 'var(--nav-h)',
      background: 'var(--black)',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      overflowX: 'hidden',
    }}>
      {/* LEFT: CONTENT */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(40px, 6vw, 96px)',
        paddingTop: 'clamp(40px, 4vw, 64px)',
      }}>
        <div className="kicker" style={{ marginBottom: 20 }}>For Startups &amp; SMEs</div>
        <h1 className="display-lg text-white" style={{ marginBottom: 20 }}>
          Build Your Pipeline from<br />
          <span style={{ color: 'var(--gold)' }}>Idea to Funded Venture.</span>
        </h1>
        <p className="body-lg" style={{ maxWidth: 480, marginBottom: 40, lineHeight: 1.7 }}>
          SikaPitch gives African founders a structured path to capital. Register, build your profile, apply to pitch events, and connect with investors who are actively looking for businesses like yours.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 48 }}>
          {BENEFITS.map(b => (
            <div key={b.title} style={{
              borderTop: '1px solid rgba(201,162,39,0.25)',
              paddingTop: 16,
            }}>
              <div style={{ width: 6, height: 6, background: 'var(--gold)', borderRadius: '50%', marginBottom: 10 }} />
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--white)', marginBottom: 6 }}>{b.title}</div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{b.body}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <Link to="/register" className="btn btn-gold btn-lg">Register as a Startup</Link>
          <Link to="/events" style={{ fontSize: '0.875rem', color: 'var(--text-muted)', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: 2 }}>
            View Upcoming Events
          </Link>
        </div>
      </div>

      {/* RIGHT: IMAGE */}
      <div className="for-startups-img" style={{ position: 'relative', overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80"
          alt="African founders in a business meeting"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(11,18,40,0.85) 0%, rgba(11,18,40,0.2) 100%)',
        }} />
        {/* Stat callout */}
        <div style={{
          position: 'absolute', bottom: 48, left: 48, right: 48,
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(12px)',
          border: '1px solid rgba(201,162,39,0.2)', borderRadius: 4,
          padding: '24px 28px',
        }}>
          <div style={{ display: 'flex', gap: 40 }}>
            {[
              { val: '12+', label: 'Active Sectors' },
              { val: '4', label: 'Funding Stages' },
              { val: 'GH', label: 'Ghana Focused' },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 800, color: 'var(--gold)' }}>{s.val}</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MOBILE STYLES */}
      <style>{`
        @media (max-width: 900px) {
          .for-startups-grid { grid-template-columns: 1fr !important; }
          .for-startups-img { display: none !important; }
        }
        @media (max-width: 480px) {
          .for-startups-grid .kicker { font-size: 0.625rem; }
          .for-startups-grid .display-lg { font-size: 2.25rem; }
        }
      `}</style>
    </div>
  )
}
