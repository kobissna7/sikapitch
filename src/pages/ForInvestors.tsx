import { Link } from 'react-router-dom'

const BENEFITS = [
  { title: 'Curated Deal Flow', body: 'Access a vetted pipeline of African startups, pre-screened for quality before they reach your dashboard.' },
  { title: 'Sector-Filtered Matching', body: 'Set your mandate, ticket size, and geography. Only see the opportunities that match your criteria.' },
  { title: 'Pitch Event Access', body: 'Attend curated pitch days where founders present live in a structured, transparent setting.' },
  { title: 'Direct Founder Contact', body: 'Connect directly with founders you are interested in. No intermediaries, no delays.' },
]

const TYPES = ['Angel Investors', 'Venture Capital Funds', 'Family Offices', 'Development Finance Institutions']

export default function ForInvestors() {
  return (
    <div className="for-investors-grid" style={{
      minHeight: '100vh',
      paddingTop: 'var(--nav-h)',
      background: 'var(--black)',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      overflowX: 'hidden',
    }}>
      {/* LEFT: IMAGE */}
      <div className="for-investors-img" style={{ position: 'relative', overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1611428813653-aa606c998586?auto=format&fit=crop&w=1400&q=80"
          alt="Professional investor in a meeting"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to left, rgba(11,18,40,0.8) 0%, rgba(11,18,40,0.15) 100%)',
        }} />
        {/* Who qualifies */}
        <div style={{
          position: 'absolute', bottom: 48, left: 48, right: 48,
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(12px)',
          border: '1px solid rgba(201,162,39,0.2)', borderRadius: 4,
          padding: '24px 28px',
        }}>
          <div style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 14 }}>Who Qualifies</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {TYPES.map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 5, height: 5, background: 'var(--gold)', borderRadius: '50%', flexShrink: 0 }} />
                <span style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.75)' }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT: CONTENT */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(40px, 6vw, 96px)',
        paddingTop: 'clamp(40px, 4vw, 64px)',
      }}>
        <div className="kicker" style={{ marginBottom: 20 }}>For Investors</div>
        <h1 className="display-lg text-white" style={{ marginBottom: 20 }}>
          Access Africa's Most<br />
          <span style={{ color: 'var(--gold)' }}>Promising Ventures.</span>
        </h1>
        <p className="body-lg" style={{ maxWidth: 480, marginBottom: 40, lineHeight: 1.7 }}>
          Quality deal flow, filtered to match your mandate. No noise. Just the right founders at the right stage, verified and ready to pitch.
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
          <Link to="/register?type=investor" className="btn btn-gold btn-lg">Register as an Investor</Link>
          <Link to="/events" style={{ fontSize: '0.875rem', color: 'var(--text-muted)', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: 2 }}>
            View Pitch Events
          </Link>
        </div>
      </div>

      {/* MOBILE STYLES */}
      <style>{`
        @media (max-width: 900px) {
          .for-investors-grid { grid-template-columns: 1fr !important; }
          .for-investors-img { display: none !important; }
        }
        @media (max-width: 480px) {
          .for-investors-grid .kicker { font-size: 0.625rem; }
          .for-investors-grid .display-lg { font-size: 2.25rem; }
        }
      `}</style>
    </div>
  )
}
