import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'

const BENEFITS = [
  { title: 'Business Registration', body: 'Register and verify your startup. Build trust with investors from day one.' },
  { title: 'Pitch Applications', body: 'Apply to events and track your status from submission through to outcome.' },
  { title: 'Investor Matching', body: 'Our system matches you with investors whose mandate aligns with your business.' },
  { title: 'Document Hub', body: 'Securely upload pitch decks, financials, and filings in one investor-ready space.' },
]

export default function ForStartups() {
  return (
    <>
      {/* IMMERSIVE HERO */}
      <section style={{
        position: 'relative',
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: 'calc(var(--nav-h) + 40px)',
        background: 'var(--black)',
        overflow: 'hidden'
      }}>
        {/* Background Image */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <div
            className="animate-ken-burns"
            style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'url("https://images.unsplash.com/photo-1594750301491-4023e192171a?auto=format&fit=crop&w=2000&q=80")',
              backgroundSize: 'cover', backgroundPosition: 'center',
              opacity: 0.35,
            }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--black) 0%, transparent 40%, transparent 80%, var(--black) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, var(--black) 0%, transparent 100%)', opacity: 0.8 }} />
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: 900 }}>
          <ScrollReveal>
            <div className="kicker" style={{ marginBottom: 24 }}>For Startups &amp; SMEs</div>
            <h1 className="display-xl text-white" style={{ marginBottom: 32, lineHeight: 1.1 }}>
              Build Your Pipeline from<br />
              <span style={{ color: 'var(--gold)' }}>Idea to Funded Venture.</span>
            </h1>
            <p className="body-lg" style={{ maxWidth: 600, marginBottom: 48, color: 'rgba(255,255,255,0.7)' }}>
              SikaPitch gives African founders a structured path to capital. Register, build your profile, apply to pitch events, and connect with investors who are actively looking for businesses like yours.
            </p>
            <div className="flex gap-24 items-center" style={{ flexWrap: 'wrap' }}>
              <Link to="/register" className="btn btn-gold btn-lg" style={{ padding: '20px 48px' }}>Register as a Startup</Link>
              <Link to="/events" className="btn-text-underline" style={{ color: 'var(--white)' }}>View Upcoming Events &rarr;</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* STATS & BENEFITS */}
      <section style={{ background: 'var(--black)', padding: 'var(--section-pad) 0' }}>
        <div className="container">
          <div className="grid-2" style={{ gap: 80 }}>
            {/* LEFT: Stats */}
            <ScrollReveal>
              <h2 className="display-md text-white" style={{ marginBottom: 48, lineHeight: 1.1 }}>
                The Network<br /><span style={{ color: 'var(--gold)' }}>You Need.</span>
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 32 }}>
                {[
                  { val: '12+', label: 'Active Sectors' },
                  { val: '4', label: 'Funding Stages' },
                  { val: 'GH', label: 'Ghana Focused' },
                ].map(s => (
                  <div key={s.label} style={{ borderLeft: '2px solid var(--gold)', paddingLeft: 24 }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 800, color: 'var(--white)', lineHeight: 1 }}>{s.val}</div>
                    <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 8 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* RIGHT: Benefits */}
            <ScrollReveal delay={150}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 40, paddingTop: 16 }}>
                {BENEFITS.map((b, i) => (
                  <div key={b.title} style={{
                    borderTop: '1px solid rgba(255,255,255,0.08)',
                    paddingTop: 32,
                  }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, color: 'transparent', WebkitTextStroke: '1px rgba(201,162,39,0.4)', marginBottom: 16 }}>0{i+1}</div>
                    <h3 className="heading-lg text-white" style={{ marginBottom: 12 }}>{b.title}</h3>
                    <p className="body-md" style={{ color: 'rgba(255,255,255,0.5)' }}>{b.body}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  )
}
