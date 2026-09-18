import React, { useState } from 'react'
import toast from 'react-hot-toast'

export default function Contact() {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate API call
    await new Promise(r => setTimeout(r, 1000))
    
    setLoading(false)
    toast.success('Message sent successfully! We will get back to you soon.')
    ;(e.target as HTMLFormElement).reset()
  }

  return (
    <>
      <section className="page-hero-navy section">
        <div className="container">
          <div style={{ maxWidth: 700 }}>
            <div className="label text-gold mb-16">Contact Us</div>
            <h1 className="display-lg text-white mb-24">
              Get in Touch
            </h1>
            <p className="body-lg" style={{ color: 'rgba(255,255,255,0.75)', maxWidth: 560 }}>
              Have questions about registering, attending an event, or becoming a sponsor? 
              Our team is ready to help you navigate the SikaPitch platform.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ gap: 64 }}>
            
            {/* Contact Details */}
            <div>
              <div className="gold-line" />
              <h2 className="display-md mb-24">We'd Love to Hear From You</h2>
              <p className="body-lg text-secondary mb-32">
                Whether you're a founder looking for guidance or an investor seeking specific deal flow, 
                reach out to us using the form or through our direct channels below.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div>
                  <h3 className="heading-md mb-8">General Enquiries</h3>
                  <p className="body-md text-secondary">hello@sikapitch.com</p>
                </div>
                <div>
                  <h3 className="heading-md mb-8">Partnerships & Sponsorship</h3>
                  <p className="body-md text-secondary">partners@sikapitch.com</p>
                </div>
                <div>
                  <h3 className="heading-md mb-8">Office Location</h3>
                  <p className="body-md text-secondary">
                    SikaPitch Hub<br />
                    Accra, Ghana
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="card">
              <h3 className="heading-lg mb-24">Send a Message</h3>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div className="grid-2" style={{ gap: 20 }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName" className="form-input" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" className="form-input" required />
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email Address</label>
                  <input type="email" id="email" className="form-input" required />
                </div>
                
                <div className="form-group">
                  <label className="form-label" htmlFor="enquiryType">Enquiry Type</label>
                  <select id="enquiryType" className="form-select" required>
                    <option value="">Select an option</option>
                    <option value="startup">Startup Registration</option>
                    <option value="investor">Investor Access</option>
                    <option value="sponsorship">Sponsorship & Partnership</option>
                    <option value="press">Press & Media</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label className="form-label" htmlFor="message">Message</label>
                  <textarea id="message" className="form-textarea" required></textarea>
                </div>
                
                <button type="submit" className="btn btn-navy" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
            
          </div>
        </div>
      </section>
    </>
  )
}
