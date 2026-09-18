import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'

const BENEFITS = [
  { title: 'Business Registration & Verification', body: 'Register your startup or SME with a streamlined process. We verify your documents and mark your profile as verified, building trust with investors.' },
  { title: 'Professional Business Profile', body: 'Build a compelling business profile with your pitch, team, sector, funding stage, and business model. Your profile is your first impression to investors.' },
  { title: 'Pitch Application Submission', body: 'Apply to targeted pitch events directly from your dashboard. Track your application status from submission through to feedback and outcome.' },
  { title: 'Document Upload & Management', body: 'Securely upload your pitch deck, financial projections, company documents, and legal filings. All in one organised, investor-ready space.' },
  { title: 'Investor Matching', body: 'Our matching system identifies investors whose mandate, sector focus, and ticket size align with your business. No cold outreach required.' },
  { title: 'Event Access & Networking', body: 'Register for SikaPitch events, pitch days, and networking sessions that connect you with the right people in Africa\'s investment ecosystem.' },
]

const SECTORS = ['AgriTech', 'FinTech', 'HealthTech', 'EdTech', 'CleanTech', 'Logistics', 'E-Commerce', 'Manufacturing', 'Creative Industries', 'Climate', 'Real Estate', 'Other']

const STAGES = [
  { label: 'Idea Stage', desc: 'You have a problem statement and early concept. Seeking validation support and initial funding.' },
  { label: 'Pre-Seed', desc: 'MVP in development. Seeking first external capital to build and test with real users.' },
  { label: 'Seed', desc: 'Product live with early traction. Raising to accelerate growth and hire your founding team.' },
  { label: 'Series A', desc: 'Proven product-market fit with consistent revenue. Scaling up operations and market expansion.' },
]

export default function ForStartups() {
  return (
    <>
      {/* HERO */}
      <section style={{ background: 'var(--black)', paddingTop: 'calc(var(--nav-h) + 100px)', paddingBottom: 100 }} className="section">
        <div className="container">
          <div style={{ maxWidth: 760 }}>
            <ScrollReveal>
              <div className="kicker">For Startups &amp; SMEs</div>
              <h1 className="display-lg text-white" style={{ marginBottom: 24 }}>
                Build Your Pipeline from<br /><span style={{ color: 'var(--gold)' }}>Idea to Funded Venture.</span>
              </h1>
              <p className="body-lg" style={{ maxWidth: 560, marginBottom: 40 }}>
                SikaPitch gives African founders a structured path to capital. Register, build your profile, apply to pitch events, and connect with investors who are actively looking for businesses like yours.
              </p>
              <Link to="/register" className="btn btn-gold btn-lg">Register as a Startup</Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="section">
        <div className="container">
          <ScrollReveal style={{ textAlign: 'center', marginBottom: 64 }}>
            <h2 className="display-md text-white">Everything You Need to<br /><span style={{ color: 'var(--gold)' }}>Pitch With Confidence</span></h2>
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

      {/* SECTORS */}
      <section className="section" style={{ background: 'var(--navy-mid)' }}>
        <div className="container">
          <ScrollReveal style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="kicker" style={{ justifyContent: 'center' }}>Coverage</div>
            <h2 className="display-md text-white">Sectors We Work With</h2>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 12 }}>
              {SECTORS.map(s => <span key={s} className="pill">{s}</span>)}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* STAGES */}
      <section className="section">
        <div className="container">
          <ScrollReveal style={{ marginBottom: 64 }}>
            <div className="kicker">Funding Stages</div>
            <h2 className="display-md text-white">We Work at Every<br /><span style={{ color: 'var(--gold)' }}>Funding Stage</span></h2>
          </ScrollReveal>
          <div className="grid-4">
            {STAGES.map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 100}>
                <div style={{ borderTop: '2px solid var(--gold)', paddingTop: 24 }}>
                  <div className="kicker" style={{ marginBottom: 8 }}>Stage {String(i + 1).padStart(2, '0')}</div>
                  <h3 className="heading-md text-white" style={{ marginBottom: 12 }}>{s.label}</h3>
                  <p className="body-sm">{s.desc}</p>
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
            <h2 className="display-md text-white" style={{ marginBottom: 24 }}>Your Next Investor Is<br /><span style={{ color: 'var(--gold)' }}>Already on SikaPitch</span></h2>
            <p className="body-lg" style={{ maxWidth: 480, margin: '0 auto 40px' }}>
              Register today, complete your profile, and start receiving matched investor introductions.
            </p>
            <Link to="/register" className="btn btn-gold btn-lg">Get Started Now</Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
