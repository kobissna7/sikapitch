import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'

const MARQUEE_ITEMS = [
  '180+ Founders Funded',
  '₵2.4M+ Raised',
  '40+ Active Investors',
  'Next Cohort Open',
  '180+ Founders Funded',
  '₵2.4M+ Raised',
  '40+ Active Investors',
  'Next Cohort Open',
]

const HOW_IT_WORKS = [
  {
    num: '01',
    kicker: '01 — Register',
    title: "You've got the idea.",
    body: "Create your startup profile in under 10 minutes. Tell us your sector, stage, and what you need. That's all we ask to start.",
  },
  {
    num: '02',
    kicker: '02 — Pitch',
    title: "We've got the room.",
    body: "Apply to curated pitch events matched to your industry. Upload your deck. We handle the curation. You handle the pitch.",
  },
  {
    num: '03',
    kicker: '03 — Get Funded',
    title: 'They can say yes.',
    body: 'Our matching engine connects you with investors actively looking for businesses like yours. No cold outreach. Direct introductions.',
  },
]

const VALUES = [
  { num: '01', title: 'Transparency', body: 'Every deal, every match, every interaction in the open. No hidden agendas. You know exactly where you stand.' },
  { num: '02', title: 'Access', body: 'Geography and network should not decide who gets funded. We close the distance between a good idea and the capital it needs.' },
  { num: '03', title: 'Impact', body: 'We measure success in problems solved across African communities. Not just pitches won.' },
]

export default function Home() {
  return (
    <>
      {/* ===== HERO — compressed to 100vh ===== */}
      <section className="page-hero-dark" style={{
        position: 'relative',
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'var(--black)',
        overflow: 'hidden'
      }}>
        
        {/* Background Image / Video */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <div
              className="animate-ken-burns"
              style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'url("https://images.unsplash.com/photo-1687422808565-929533931584?auto=format&fit=crop&w=2070&q=80")',
                backgroundSize: 'cover', backgroundPosition: 'center',
                opacity: 0.35,
              }}
            />
            {/* Dark overlay */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--black) 0%, transparent 30%, transparent 70%, var(--black) 100%)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, transparent 0%, var(--black) 100%)', opacity: 0.8 }} />
        </div>

        {/* Central Content */}
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 900, paddingTop: 'calc(var(--nav-h) + 40px)', paddingBottom: 100 }}>
            <div className="animate-fade-up" style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 32, display: 'inline-block' }}>
              Africa's Premier Pitch Platform
            </div>
            <h1 style={{ marginBottom: 32 }}>
              <span className="display-xl text-white animate-fade-up delay-150" style={{ display: 'block' }}>You've got</span>
              <span className="display-xl animate-fade-up delay-300" style={{ display: 'block', color: 'var(--gold)' }}>the idea.</span>
              <span className="display-xl text-white animate-fade-up delay-450" style={{ display: 'block' }}>We've got</span>
              <span className="display-xl animate-fade-up delay-600" style={{ display: 'block', color: 'var(--gold)' }}>the room.</span>
            </h1>
            <p className="animate-fade-up delay-750 body-lg" style={{ margin: '0 auto 48px', maxWidth: 600, color: 'rgba(255,255,255,0.7)' }}>
              Pitch to the investors who can actually say yes. SikaPitch connects Africa's boldest founders to capital through structured events and a matching engine that works.
            </p>
            <div className="flex gap-24 items-center justify-center animate-fade-up delay-900" style={{ flexWrap: 'wrap', marginBottom: 48 }}>
              <Link to="/register" className="btn btn-gold btn-lg">Register Your Startup</Link>
              <Link to="/register?type=investor" className="btn-text-underline">I'm an investor &rarr;</Link>
            </div>
        </div>

        {/* ===== MARQUEE ===== */}
        <div className="marquee-wrap animate-fade-in delay-900" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 1, borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: 'none', background: 'transparent' }}>
          <div className="marquee-track" style={{ padding: '24px 0' }}>
            {MARQUEE_ITEMS.map((item, i) => (
              <span key={i} className="marquee-item" style={{ fontSize: '0.875rem' }}>
                {item} <span className="marquee-dot">·</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="kicker">The Process</div>
            <h2 className="display-lg text-white" style={{ marginBottom: 96 }}>
              Three steps.<br /><span style={{ color: 'var(--gold)' }}>One outcome.</span>
            </h2>
          </ScrollReveal>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {HOW_IT_WORKS.map((step, index) => (
              <ScrollReveal key={step.num} delay={index * 120}>
                <div className="grid-2" style={{
                  gap: 32,
                  alignItems: 'center',
                  padding: '72px 0',
                }}>
                  <div>
                    <div style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(6rem, 14vw, 11rem)',
                      fontWeight: 800,
                      lineHeight: 1,
                      color: 'transparent',
                      WebkitTextStroke: '1px rgba(201,162,39,0.15)',
                      userSelect: 'none',
                    }}>
                      {step.num}
                    </div>
                  </div>
                  <div>
                    <div className="kicker" style={{ marginBottom: 16 }}>{step.kicker}</div>
                    <h3 className="display-md text-white" style={{ marginBottom: 24 }}>{step.title}</h3>
                    <p className="body-lg">{step.body}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal style={{ marginTop: 80, textAlign: 'center' }}>
            <Link to="/register" className="btn btn-gold btn-lg">Start Your Application</Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== PULL QUOTE ===== */}
      <section style={{ background: 'var(--black-mid)', padding: '160px 0' }}>
        <div className="container" style={{ maxWidth: 880, textAlign: 'center' }}>
          <ScrollReveal>
            <div style={{ fontSize: '3.5rem', color: 'var(--gold)', fontFamily: 'Georgia, serif', lineHeight: 0.5, marginBottom: 32, opacity: 0.5 }}>"</div>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.625rem, 3.5vw, 2.75rem)',
              fontWeight: 800,
              lineHeight: 1.2,
              color: 'var(--white)',
              letterSpacing: '-0.02em',
              marginBottom: 48,
            }}>
              SikaPitch gave us the structure we needed to prepare our deck, and put us directly in front of the investors who ended up leading our seed round.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
              <div style={{
                width: 52, height: 52, borderRadius: '50%', flexShrink: 0,
                backgroundImage: 'url("https://images.unsplash.com/photo-1573496527892-904f897eb744?w=100&h=100&fit=crop&crop=face")',
                backgroundSize: 'cover', backgroundPosition: 'center',
                border: '2px solid var(--border-gold)',
              }} />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 700, color: 'var(--white)', fontSize: '1rem' }}>David Osei</div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--gold)' }}>Founder, AgriGrow Solutions — Funded 2025</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== EVENTS ===== */}
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ gap: 80, alignItems: 'start' }}>
            <div>
              <ScrollReveal>
                <div className="kicker">Next Event</div>
                <h2 className="display-lg text-white" style={{ marginBottom: 32 }}>
                  The room is<br /><span style={{ color: 'var(--gold)' }}>ready for you.</span>
                </h2>
                <p className="body-lg" style={{ marginBottom: 40 }}>
                  Structured events. Curated investors. Real outcomes. Every SikaPitch event is designed to produce funded founders, not just networked ones.
                </p>
                <Link to="/events" className="btn btn-ghost btn-lg">View All Events</Link>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={150}>
              <div style={{
                background: 'var(--black-card)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: 24, padding: 48, position: 'relative', overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', top: -80, right: -80, width: 300, height: 300, background: 'radial-gradient(circle, rgba(201,162,39,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
                    <span className="badge badge-gold">Applications Open</span>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', marginBottom: 6 }}>Closes in</div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--white)', letterSpacing: '-0.01em' }}>21d : 14h</div>
                    </div>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.625rem', fontWeight: 800, color: 'var(--white)', letterSpacing: '-0.02em', marginBottom: 16 }}>
                    SikaPitch Open Day 2025
                  </h3>
                  <p className="body-md" style={{ marginBottom: 32 }}>
                    Our flagship annual pitch event. Open to all early-stage startups across West Africa. Top pitches receive direct investor introductions.
                  </p>
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24, marginBottom: 32 }}>
                    <div style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--gold)', marginBottom: 14 }}>Open sectors</div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {['AgriTech', 'FinTech', 'HealthTech', 'EdTech', 'CleanTech'].map(s => (
                        <span key={s} className="pill">{s}</span>
                      ))}
                    </div>
                  </div>
                  <Link to="/events" className="btn btn-gold w-full btn-lg" style={{ justifyContent: 'center' }}>Apply to Pitch</Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== VALUES ===== */}
      <section className="section" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="container">
          <ScrollReveal>
            <div className="kicker">What We Stand For</div>
            <h2 className="display-md text-white" style={{ marginBottom: 80 }}>
              Three principles.<br /><span style={{ color: 'var(--gold)' }}>Every decision.</span>
            </h2>
          </ScrollReveal>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {VALUES.map((v, i) => (
              <ScrollReveal key={v.num} delay={i * 100}>
                <div className="grid-2" style={{
                  gap: 40, alignItems: 'center',
                  padding: '64px 0'
                }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '4.5rem', fontWeight: 800, color: 'transparent', WebkitTextStroke: '2px rgba(255,255,255,0.1)' }}>{v.num}</div>
                  <h3 className="heading-lg text-white">{v.title}</h3>
                  <p className="body-md">{v.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CLOSING CTA — true black ===== */}
      <section style={{ background: 'var(--black)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 700, height: 700, background: 'radial-gradient(circle, rgba(201,162,39,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <ScrollReveal>
            <div className="kicker" style={{ justifyContent: 'center', marginBottom: 32 }}>Ready</div>
            <h2 className="display-xl text-white" style={{ marginBottom: 24 }}>
              Your pitch<br /><span style={{ color: 'var(--gold)' }}>starts here.</span>
            </h2>
            <p className="body-lg" style={{ maxWidth: 480, margin: '0 auto 56px' }}>
              The investors are waiting. The room is booked. The only thing missing is you.
            </p>
            <div style={{ display: 'inline-block', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 260, height: 80, background: 'radial-gradient(ellipse, rgba(201,162,39,0.3) 0%, transparent 70%)', pointerEvents: 'none', filter: 'blur(16px)' }} />
              <Link to="/register" className="btn btn-gold btn-lg" style={{ position: 'relative', fontSize: '1rem', padding: '20px 52px' }}>
                Register Now
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
