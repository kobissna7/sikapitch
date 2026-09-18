export default function Terms() {
  return (
    <>
      <section className="page-hero-navy section">
        <div className="container">
          <div style={{ maxWidth: 700 }}>
            <h1 className="display-lg text-white mb-16">Terms and Conditions</h1>
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
              <h2 className="heading-lg mb-16">1. Introduction</h2>
              <p className="body-md text-secondary">
                Welcome to SikaPitch. These Terms and Conditions govern your use of the SikaPitch platform, 
                including our website, services, and any related applications. By accessing or using our platform, 
                you agree to be bound by these terms.
              </p>
            </div>
            
            <div>
              <h2 className="heading-lg mb-16">2. Platform Access and Registration</h2>
              <p className="body-md text-secondary mb-12">
                <strong>2.1 User Accounts:</strong> You must create an account to access certain features of the platform. 
                You are responsible for maintaining the confidentiality of your account credentials.
              </p>
              <p className="body-md text-secondary">
                <strong>2.2 Verification:</strong> SikaPitch reserves the right to verify the identity and details of startups, 
                SMEs, and investors registering on the platform. Providing false information may result in immediate account termination.
              </p>
            </div>

            <div>
              <h2 className="heading-lg mb-16">3. Startup and SME Obligations</h2>
              <p className="body-md text-secondary">
                Startups and SMEs using SikaPitch to seek investment must ensure that all information provided in their 
                business profiles, pitch applications, and uploaded documents is accurate, up-to-date, and not misleading.
              </p>
            </div>

            <div>
              <h2 className="heading-lg mb-16">4. Investor Obligations</h2>
              <p className="body-md text-secondary">
                Investors agree to use the platform solely for the purpose of exploring potential investment opportunities. 
                Information shared by startups is confidential and must not be distributed without explicit consent.
              </p>
            </div>

            <div>
              <h2 className="heading-lg mb-16">5. Limitation of Liability</h2>
              <p className="body-md text-secondary">
                SikaPitch acts as an aggregator and facilitator. We do not guarantee funding, investment returns, or the 
                success of any business listed on our platform. All investment decisions are made at the investor's own risk.
              </p>
            </div>
            
             <div>
              <h2 className="heading-lg mb-16">6. Changes to Terms</h2>
              <p className="body-md text-secondary">
                We may update these terms from time to time. We will notify you of any significant changes by posting the new terms on this page.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
