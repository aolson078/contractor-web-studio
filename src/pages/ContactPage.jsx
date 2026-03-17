import { useState } from 'react';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    business: '',
    service: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(data).toString(),
    })
      .then(() => {
        alert('Thanks! Your message has been sent.');
        setFormData({ name: '', email: '', phone: '', business: '', service: '', message: '' });
      })
      .catch(() => alert('Something went wrong. Please try again.'));
  };

  return (
    <main>
      {/* Page Header */}
      <section className="section" style={{ paddingTop: '10rem' }}>
        <div className="container">
          <div className="section__header section__header--center">
            <span className="section__eyebrow">Contact</span>
            <h1 className="section__title">Let's Talk About Your Project</h1>
          </div>
        </div>
      </section>

      {/* Contact Layout */}
      <section className="section--dark section" style={{ paddingTop: '0' }}>
        <div className="container">
          <div className="contact-layout">
            {/* Left - Info */}
            <div className="contact-info">
              <h2 className="contact-info__title">Get In Touch</h2>
              <p className="contact-info__subtitle">Free Consultation</p>

              <div className="contact-info__item">
                <div className="contact-info__icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </div>
                <div>
                  <p className="contact-info__label">Phone</p>
                  <p className="contact-info__value">(336) 555-0123</p>
                </div>
              </div>

              <div className="contact-info__item">
                <div className="contact-info__icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <p className="contact-info__label">Email</p>
                  <p className="contact-info__value">alex@contractorwebstudio.com</p>
                </div>
              </div>

              <div className="contact-info__item">
                <div className="contact-info__icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <p className="contact-info__label">Location</p>
                  <p className="contact-info__value">Winston-Salem, NC</p>
                </div>
              </div>

              <div className="contact-info__item">
                <div className="contact-info__icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <p className="contact-info__label">Response Time</p>
                  <p className="contact-info__value">I respond within 24 hours</p>
                </div>
              </div>
            </div>

            {/* Right - Form */}
            <div className="contact-form">
              <form
                name="contact"
                method="POST"
                data-netlify="true"
                onSubmit={handleSubmit}
              >
                <input type="hidden" name="form-name" value="contact" />

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(555) 555-5555"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="business">Business Name</label>
                    <input
                      type="text"
                      id="business"
                      name="business"
                      value={formData.business}
                      onChange={handleChange}
                      placeholder="Your company"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="service">Service Interest</label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                  >
                    <option value="">Choose a service...</option>
                    <option value="get-found-online">Get Found Online ($800-$1,500)</option>
                    <option value="never-miss-a-lead">Never Miss a Lead ($2,000-$3,500)</option>
                    <option value="grow-on-autopilot">Grow on Autopilot ($4,000-$6,000)</option>
                    <option value="not-sure">Not sure yet</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button type="submit" className="btn btn--primary">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ContactPage;
