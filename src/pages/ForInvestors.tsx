import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'

const BENEFITS = [
  { title: 'Curated Deal Flow', body: 'Access a vetted pipeline of African startups, pre-screened for quality before they reach your dashboard.' },
  { title: 'Sector-Filtered Matching', body: 'Set your mandate, ticket size, and geography. Only see the opportunities that match your criteria.' },
  { title: 'Pitch Event Access', body: 'Attend curated pitch days where founders present live in a structured, transparent setting.' },
  { title: 'Direct Founder Contact', body: 'Connect directly with founders you are interested in. No intermediaries, no delays.' },
]

const TYPES = ['Angel Investors', 'Venture Capital Funds', 'Family Offices', 'Development Finance Institutions']

export default function ForInvestors() {
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
              backgroundImage: 'url("https://images.unsplash.com/photo-1614023342667-6f060e9d1e04?auto=format&fit=crop&w=2000&q=80")',
              backgroundSize: 'cover', backgroundPosition: 'center',
              opacity: 0.35,
            }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--black) 0%, transparent 40%, transparent 80%, var(--black) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to left, var(--black) 0%, transparent 100%)', opacity: 0.8 }} />
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: 900, marginLeft: 'auto', marginRight: 'auto', textAlign: 'right' }}>
          <ScrollReveal>
            <div className="kicker" style={{ marginBottom: 24, justifyContent: 'flex-end' }}>For Investors</div>
            <h1 className="display-xl text-white" style={{ marginBottom: 32, lineHeight: 1.1 }}>
              Access Africa's Most<br />
              <span style={{ color: 'var(--gold)' }}>Promising Ventures.</span>
            </h1>
            <p className="body-lg" style={{ maxWidth: 600, marginBottom: 48, color: 'rgba(255,255,255,0.7)', marginLeft: 'auto' }}>
              Quality deal flow, filtered to match your mandate. No noise. Just the right founders at the right stage, verified and ready to pitch.
            </p>
            <div className="flex gap-24 items-center justify-end" style={{ flexWrap: 'wrap' }}>
              <Link to="/register?type=investor" className="btn btn-gold btn-lg" style={{ padding: '20px 48px' }}>Register as an Investor</Link>
              <Link to="/events" className="btn-text-underline" style={{ color: 'var(--white)' }}>View Pitch Events &rarr;</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* WHO QUALIFIES & BENEFITS */}
      <section style={{ background: 'var(--black-mid)', padding: 'var(--section-pad) 0' }}>
        <div className="container">
          <div className="grid-2" style={{ gap: 80 }}>
            {/* LEFT: Benefits */}
            <ScrollReveal>
              <h2 className="display-md text-white" style={{ marginBottom: 48, lineHeight: 1.1 }}>
                Why Invest Through<br /><span style={{ color: 'var(--gold)' }}>SikaPitch.</span>
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
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

            {/* RIGHT: Who Qualifies */}
            <ScrollReveal delay={150}>
              <div style={{ 
                background: 'rgba(255,255,255,0.02)', 
                border: '1px solid rgba(255,255,255,0.05)', 
                borderRadius: 'var(--radius-lg)', 
                padding: '48px',
                marginTop: 24
              }}>
                <div style={{ fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 24 }}>Who Qualifies</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  {TYPES.map(t => (
                    <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 16, borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: 24 }}>
                      <div style={{ width: 8, height: 8, background: 'var(--gold)', borderRadius: '50%', flexShrink: 0 }} />
                      <span className="body-lg" style={{ color: 'var(--white)' }}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  )
}
