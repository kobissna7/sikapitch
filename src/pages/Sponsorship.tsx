import { Link } from 'react-router-dom'

const SPONSORSHIP_TIERS = [
  {
    name: 'Headline Partner',
    desc: 'Position your brand as a champion of African innovation with top-tier visibility across all SikaPitch events and platforms.',
    features: [
      'Logo on all SikaPitch marketing materials',
      'Speaking slot at flagship events',
      'Dedicated branding at pitch events',
      'Access to full startup database',
      'Featured in quarterly newsletters',
    ],
  },
  {
    name: 'Sector Sponsor',
    desc: 'Align your corporate strategy with specific industries (e.g., AgriTech, FinTech) by sponsoring targeted pitch events and roundtables.',
    features: [
      'Naming rights to a sector pitch event',
      'Judging panel seat at sponsored event',
      'Direct introductions to top sector startups',
      'Logo on event-specific materials',
      'Access to sector-specific data insights',
    ],
  },
  {
    name: 'Ecosystem Supporter',
    desc: 'Support the growth of the African startup ecosystem through general sponsorship and capacity-building initiatives.',
    features: [
      'Logo on SikaPitch website',
      'Mentorship opportunities for your executives',
      'Invitations to VIP networking sessions',
      'Branding in founder resource materials',
    ],
  },
]

export default function Sponsorship() {
  return (
    <>
      <section className="page-hero-navy section">
        <div className="container">
          <div style={{ maxWidth: 700 }}>
            <div className="label text-gold mb-16">Sponsorship</div>
            <h1 className="display-lg text-white mb-24">
              Partner With SikaPitch to Fuel African Innovation
            </h1>
            <p className="body-lg" style={{ color: 'rgba(255,255,255,0.75)', maxWidth: 560 }}>
              Position your brand at the center of Africa's fastest-growing startup ecosystem. 
              SikaPitch offers strategic partnership opportunities for corporations, development organizations, 
              and financial institutions seeking to engage with high-potential founders.
            </p>
          </div>
        </div>
      </section>

      {/* WHY PARTNER */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-48">
            <div className="gold-line-center" />
            <h2 className="display-md">Why Sponsor SikaPitch?</h2>
          </div>
          <div className="grid-3">
            {[
              { title: 'Ecosystem Access', body: 'Gain direct access to a curated pipeline of verified African startups and SMEs across various sectors and growth stages.' },
              { title: 'Brand Positioning', body: 'Align your brand with innovation, impact, and economic growth in Africa. Show your commitment to supporting the next generation of founders.' },
              { title: 'Strategic Deal Flow', body: 'Identify potential investment opportunities, corporate venture targets, or strategic partnerships before they hit the broader market.' },
            ].map((item) => (
              <div key={item.title} className="card">
                <div style={{ width: 10, height: 10, background: 'var(--gold)', borderRadius: '50%', marginBottom: 20 }} />
                <h3 className="heading-md mb-12">{item.title}</h3>
                <p className="body-sm text-secondary">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIERS */}
      <section className="section section-off-white">
        <div className="container">
          <div className="text-center mb-48">
            <div className="gold-line-center" />
            <h2 className="display-md">Sponsorship Opportunities</h2>
            <p className="body-lg text-secondary mt-16" style={{ maxWidth: 600, margin: '16px auto 0' }}>
              We offer flexible partnership models to align with your corporate objectives and CSR goals.
            </p>
          </div>
          <div className="grid-3">
            {SPONSORSHIP_TIERS.map((tier) => (
              <div key={tier.name} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                <h3 className="heading-lg mb-12">{tier.name}</h3>
                <p className="body-md text-secondary mb-24">{tier.desc}</p>
                <div style={{ borderTop: '1px solid var(--grey-200)', margin: '0 -32px 24px' }} />
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
                  {tier.features.map((feature, i) => (
                    <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                      <span className="body-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section-navy">
        <div className="container text-center">
          <h2 className="display-md text-white mb-16">Become a Partner Today</h2>
          <p className="body-lg mb-32" style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 500, margin: '16px auto 32px' }}>
            Let's discuss how we can tailor a sponsorship package to meet your organization's goals.
          </p>
          <Link to="/contact" className="btn btn-primary btn-lg">Contact Our Partnerships Team</Link>
        </div>
      </section>
    </>
  )
}
