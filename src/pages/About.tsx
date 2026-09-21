import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'

export default function About() {
  return (
    <>
      {/* HERO */}
      <section style={{ background: 'var(--black)', paddingTop: 'calc(var(--nav-h) + 80px)', paddingBottom: 'clamp(60px, 8vw, 100px)' }}>
        <div className="container">
          <div style={{ maxWidth: 780 }}>
            <ScrollReveal>
              <div className="kicker" style={{ marginBottom: 24 }}>About SikaPitch</div>
              <h1 className="display-lg text-white" style={{ marginBottom: 24, lineHeight: 1.1 }}>
                Building the Pipeline<br /><span style={{ color: 'var(--gold)' }}>Africa's Founders Deserve.</span>
              </h1>
              <p className="body-lg" style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 600 }}>
                SikaPitch is a registered aggregator platform connecting African startups to funding opportunities. Through curated pitching events, we create room for innovators to present their ideas, sharpen them into workable solutions, and access the support they need.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section style={{ background: 'var(--black-mid)', padding: 'var(--section-pad) 0' }}>
        <div className="container">
          <div className="grid-2" style={{ gap: 64, alignItems: 'start' }}>
            <ScrollReveal>
              <div className="kicker" style={{ marginBottom: 24 }}>Mission</div>
              <h2 className="display-md text-white" style={{ marginBottom: 24, lineHeight: 1.1 }}>Why We Exist</h2>
              <p className="body-lg" style={{ color: 'rgba(255,255,255,0.65)', marginBottom: 24 }}>
                To democratise access to funding for African startups and SMEs by creating structured, transparent, and impactful pathways to capital and investor engagement.
              </p>
              <p className="body-md" style={{ color: 'rgba(255,255,255,0.5)' }}>
                We believe that geography and network should not determine who gets funded. The best ideas in Africa are not in one city or one country. SikaPitch exists to level that playing field.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <div className="kicker" style={{ marginBottom: 24 }}>Vision</div>
              <h2 className="display-md text-white" style={{ marginBottom: 24, lineHeight: 1.1 }}>What We're Building</h2>
              <p className="body-lg" style={{ color: 'rgba(255,255,255,0.65)', marginBottom: 24 }}>
                To become the most trusted platform for startup-investor engagement across Africa, driving economic transformation through structured capital deployment.
              </p>
              <p className="body-md" style={{ color: 'rgba(255,255,255,0.5)' }}>
                A continent where any founder with a validated idea and the drive to build can find their investor, make their pitch, and grow their venture.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section style={{ background: 'var(--black)', padding: 'var(--section-pad) 0' }}>
        <div className="container">
          <ScrollReveal style={{ textAlign: 'center', marginBottom: 80 }}>
            <div className="kicker" style={{ justifyContent: 'center', marginBottom: 24 }}>The Platform</div>
            <h2 className="display-lg text-white" style={{ lineHeight: 1.1 }}>What SikaPitch<br /><span style={{ color: 'var(--gold)' }}>Actually Does</span></h2>
          </ScrollReveal>
          <div className="grid-3" style={{ gap: 40 }}>
            {[
              { num: '01', title: 'Aggregates Opportunity', body: 'We bring together startups, SMEs, investors, mentors, and ecosystem partners in one structured platform.' },
              { num: '02', title: 'Curates Events', body: 'We host and manage pitch events that give founders a real stage to present their business and get direct investor feedback.' },
              { num: '03', title: 'Matches and Connects', body: 'Our matching engine aligns startups with investors whose mandate, sector, and ticket size match what founders need.' },
              { num: '04', title: 'Verifies and Vets', body: 'We verify business registrations and investor credentials to maintain trust and quality within the ecosystem.' },
              { num: '05', title: 'Tracks and Reports', body: 'We track pitch outcomes, funding raised, investor engagement, and ecosystem metrics to improve the platform continuously.' },
              { num: '06', title: 'Supports Growth', body: 'Beyond funding, we connect founders with mentors, advisors, and corporate sponsors who can open doors beyond capital.' },
            ].map((item, i) => (
              <ScrollReveal key={item.num} delay={i * 70}>
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

      {/* VALUES */}
      <section style={{ background: 'var(--black-mid)', padding: 'var(--section-pad) 0' }}>
        <div className="container">
          <ScrollReveal style={{ marginBottom: 80 }}>
            <div className="kicker" style={{ marginBottom: 24 }}>Core Values</div>
            <h2 className="display-lg text-white" style={{ lineHeight: 1.1 }}>Principles That<br /><span style={{ color: 'var(--gold)' }}>Guide Everything</span></h2>
          </ScrollReveal>
          <div className="grid-3" style={{ gap: 48 }}>
            {[
              { label: 'Transparency', desc: 'Every match, every deal, every process in the open. No hidden fees, no opaque systems.' },
              { label: 'Accountability', desc: 'We hold ourselves to high standards in how we operate, how we serve founders, and how we engage investors.' },
              { label: 'Innovation', desc: 'We continuously improve our platform and processes to serve Africa\'s evolving startup ecosystem.' },
              { label: 'Inclusivity', desc: 'We serve founders across geographies, sectors, and backgrounds. We build for all of Africa.' },
              { label: 'Impact', desc: 'Success is measured not just in deals done, but in communities improved and jobs created.' },
              { label: 'Integrity', desc: 'We do what we say and say what we mean. Trust is the foundation of everything on this platform.' },
            ].map((v, i) => (
              <ScrollReveal key={v.label} delay={i * 70}>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24 }}>
                  <h3 className="heading-md text-white" style={{ marginBottom: 16 }}>{v.label}</h3>
                  <p className="body-md" style={{ color: 'rgba(255,255,255,0.5)' }}>{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--black)', padding: 'var(--section-pad) 0', textAlign: 'center' }}>
        <div className="container">
          <ScrollReveal>
            <h2 className="display-xl text-white" style={{ marginBottom: 24, lineHeight: 1.1 }}>
              Be Part of<br /><span style={{ color: 'var(--gold)' }}>Africa's Story.</span>
            </h2>
            <p className="body-lg" style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 500, margin: '0 auto 48px' }}>
              Whether you're a founder with a vision or an investor looking for the next great African company, SikaPitch is your platform.
            </p>
            <div className="flex gap-24 justify-center items-center" style={{ flexWrap: 'wrap' }}>
              <Link to="/register" className="btn btn-gold btn-lg" style={{ padding: '20px 48px' }}>Register as a Startup</Link>
              <Link to="/register?type=investor" className="btn-text-underline" style={{ color: 'var(--white)' }}>Register as an Investor &rarr;</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
