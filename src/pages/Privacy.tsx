export default function Privacy() {
  return (
    <>
      <section className="page-hero-navy section">
        <div className="container">
          <div style={{ maxWidth: 700 }}>
            <h1 className="display-lg text-white mb-16">Privacy Policy</h1>
            <p className="body-lg" style={{ color: 'rgba(255,255,255,0.75)' }}>
              Last updated: September 9, 2026
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 800 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <div>
              <h2 className="heading-lg mb-16">1. Information We Collect</h2>
              <p className="body-md text-secondary mb-12">
                We collect information that you provide directly to us when registering for an account, 
                submitting a pitch application, or communicating with us. This may include:
              </p>
              <ul style={{ listStyle: 'disc', paddingLeft: 24 }} className="body-md text-secondary">
                <li>Contact information (name, email, phone number)</li>
                <li>Business details (company name, registration documents, financials)</li>
                <li>Professional profiles (LinkedIn URLs, team backgrounds)</li>
                <li>Investment mandates (for investors)</li>
              </ul>
            </div>
            
            <div>
              <h2 className="heading-lg mb-16">2. How We Use Your Information</h2>
              <p className="body-md text-secondary">
                We use the information we collect to operate the SikaPitch platform, facilitate matchmaking 
                between startups and investors, process event registrations, and communicate with you about 
                relevant opportunities.
              </p>
            </div>

            <div>
              <h2 className="heading-lg mb-16">3. Information Sharing</h2>
              <p className="body-md text-secondary">
                Your business profile and submitted documents will be shared with verified investors on our 
                platform in accordance with the matchmaking process. We do not sell your personal data to third parties.
              </p>
            </div>

            <div>
              <h2 className="heading-lg mb-16">4. Data Security</h2>
              <p className="body-md text-secondary">
                We implement appropriate technical and organizational measures to protect your personal and 
                business data against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </div>

            <div>
              <h2 className="heading-lg mb-16">5. Your Rights</h2>
              <p className="body-md text-secondary">
                You have the right to access, update, or delete your personal information at any time through 
                your account settings or by contacting our support team.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
