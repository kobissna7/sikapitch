import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'

const BENEFITS = [
  { title: 'Curated Deal Flow', body: 'Access a vetted pipeline of African startups and SMEs, pre-screened for quality and completeness before they reach your dashboard.' },
  { title: 'Sector-Filtered Matching', body: 'Set your investment mandate, sector focus, ticket size, and geography. Our system surfaces only the opportunities that match your criteria.' },
  { title: 'Pitch Event Access', body: 'Attend SikaPitch curated pitch events where founders present live. Evaluate businesses in a structured, transparent setting.' },
  { title: 'Document Review', body: 'Review verified pitch decks, financial projections, team profiles, and legal documents, all in one organised investor workspace.' },
  { title: 'Direct Founder Contact', body: 'Connect directly with founders you are interested in. No intermediaries, no delays. Conversation starts at your discretion.' },
  { title: 'Portfolio Tracking', body: 'Track the businesses you have engaged with, save profiles for later review, and maintain notes on your deal pipeline.' },
]

const INVESTOR_TYPES = [
  { label: 'Angel Investors', desc: 'Individual investors deploying personal capital into early-stage African startups.' },
  { label: 'Venture Capital Funds', desc: 'Institutional funds with a specific focus on African or emerging market deal flow.' },
  { label: 'Family Offices', desc: 'Private wealth seeking impact-aligned investment opportunities in high-growth markets.' },
  { label: 'Development Finance', desc: 'DFIs and impact-first investors seeking measurable community and economic outcomes.' },
]

export default function ForInvestors() {
  return (
    <>
      <section style={{ background: 'var(--black)', paddingTop: 'calc(var(--nav-h) + 100px)', paddingBottom: 100 }} className="section">
        <div className="container">
          <div style={{ maxWidth: 760 }}>
            <ScrollReveal>
              <div className="kicker">For Investors</div>
              <h1 className="display-lg text-white" style={{ marginBottom: 24 }}>
                Access Africa's Most<br /><span style={{ color: 'var(--gold)' }}>Promising Ventures.</span>
              </h1>
              <p className="body-lg" style={{ maxWidth: 560, marginBottom: 40 }}>
                Quality deal flow, filtered to match your mandate. No noise. Just the right founders at the right stage.
              </p>
              <Link to="/register?type=investor" className="btn btn-gold btn-lg">Register as an Investor</Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="section">
        <div className="container">
          <ScrollReveal style={{ textAlign: 'center', marginBottom: 64 }}>
            <h2 className="display-md text-white">A Better Way to Source<br /><span style={{ color: 'var(--gold)' }}>African Deals</span></h2>
          </ScrollReveal>
          <div className="grid-3">
            {BENEFITS.map((b, i) => (
              <ScrollReveal key={b.title} delay={i * 80}>
                <div className="card-navy" style={{ height: '100%' }}>
                  <div style={{ width: 8, height: 8, background: 'var(--gold)', borderRadius: '50%', marginBottom: 20 }} />
                  <h3 className="heading-md text-white" style={{ marginBottom: 12 }}>{b.title}</h3>
                  <p className="body-sm">{b.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* INVESTOR TYPES */}
      <section className="section" style={{ background: 'var(--navy-mid)' }}>
        <div className="container">
          <ScrollReveal style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="kicker" style={{ justifyContent: 'center' }}>Who Qualifies</div>
            <h2 className="display-md text-white">Who Can Register<br /><span style={{ color: 'var(--gold)' }}>as an Investor</span></h2>
          </ScrollReveal>
          <div className="grid-4">
            {INVESTOR_TYPES.map((t, i) => (
              <ScrollReveal key={t.label} delay={i * 100}>
                <div style={{ borderTop: '2px solid var(--gold)', paddingTop: 24 }}>
                  <div className="kicker" style={{ marginBottom: 8 }}>{String(i + 1).padStart(2, '0')}</div>
                  <h3 className="heading-md text-white" style={{ marginBottom: 12 }}>{t.label}</h3>
                  <p className="body-sm">{t.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section">
        <div className="container">
          <ScrollReveal style={{ marginBottom: 80 }}>
            <div className="kicker">How It Works</div>
            <h2 className="display-md text-white">Three steps to your<br /><span style={{ color: 'var(--gold)' }}>next investment.</span></h2>
          </ScrollReveal>
          <div className="grid-3" style={{ gap: 40 }}>
            {[
              { num: '01', title: 'Create Your Profile', body: 'Register and configure your mandate, preferred sectors, ticket size, and geography. Your profile stays private.' },
              { num: '02', title: 'Receive Matched Startups', body: 'Our system sends you curated startup profiles that match your mandate. Review at your pace, no pressure.' },
              { num: '03', title: 'Engage and Invest', body: 'Save profiles you are interested in, request full documents, and connect directly with founders you want to pursue.' },
            ].map((s, i) => (
              <ScrollReveal key={s.num} delay={i * 100}>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 28 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 800, color: 'transparent', WebkitTextStroke: '1px rgba(201,162,39,0.2)', marginBottom: 16 }}>{s.num}</div>
                  <h3 className="heading-md text-white" style={{ marginBottom: 12 }}>{s.title}</h3>
                  <p className="body-md">{s.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ textAlign: 'center' }}>
        <div className="container">
          <ScrollReveal>
            <h2 className="display-md text-white" style={{ marginBottom: 24 }}>Start Seeing African<br /><span style={{ color: 'var(--gold)' }}>Deal Flow Today</span></h2>
            <p className="body-lg" style={{ maxWidth: 480, margin: '0 auto 40px' }}>
              Register your investor profile and begin receiving matched opportunities within 24 hours of verification.
            </p>
            <Link to="/register?type=investor" className="btn btn-gold btn-lg">Register as an Investor</Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
