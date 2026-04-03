import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getContactPrefill } from '../utils/contactPrefill';
import { getResolvedAttribution } from '../utils/leadAttribution';

const serviceOptions = [
  { value: 'get-found', label: 'Get Found Online ($1,500+)' },
  { value: 'never-miss', label: 'Never Miss a Lead ($2,000-$3,500)' },
  { value: 'grow-autopilot', label: 'Grow on Autopilot ($4,000-$6,000)' },
  { value: 'not-sure', label: 'Not sure yet' },
];

const serviceLabels = {
  'get-found': 'Get Found Online',
  'never-miss': 'Never Miss a Lead',
  'grow-autopilot': 'Grow on Autopilot',
  'not-sure': 'Not sure yet',
};

const addonLabels = {
  pages: 'Additional Pages',
  content: 'Content Writing',
  google: 'Google Business Profile',
  social: 'Social Media Setup',
  maintenance: 'Monthly Maintenance',
};

function ContactPage() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.title = 'Get a Free Quote | Contractor Web Studio';
  }, []);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    business: '',
    service: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [prefillInfo, setPrefillInfo] = useState({ package: '', addons: [] });
  const attribution = useMemo(() => getResolvedAttribution(location), [location]);

  useEffect(() => {
    const packageMap = {
      'get-found-online': 'get-found',
      'never-miss-a-lead': 'never-miss',
      'grow-on-autopilot': 'grow-autopilot',
      'not-sure-yet': 'not-sure',
      'not-sure': 'not-sure',
    };
    const { package: packageParam, service: serviceParam, addons } = getContactPrefill(location.search);
    const nextService = packageParam || packageMap[serviceParam] || '';

    if (nextService) {
      setFormData((prev) => ({ ...prev, service: prev.service || nextService }));
    }
    setPrefillInfo({ package: nextService, addons });
  }, [location.search]);

  const hiddenFields = {
    addons: prefillInfo.addons.join(', '),
    lead_source: attribution.lead_source || attribution.utm_source || 'direct',
    campaign: attribution.campaign || attribution.utm_campaign || '',
    trade: attribution.trade || '',
    city: attribution.city || '',
    partner_name: attribution.partner_name || '',
    utm_source: attribution.utm_source || '',
    utm_medium: attribution.utm_medium || '',
    utm_campaign: attribution.utm_campaign || '',
    utm_content: attribution.utm_content || '',
    first_touch_path: attribution.first_touch_path || '',
    latest_path: attribution.latest_path || '',
    stage: 'Replied',
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (submitError) {
      setSubmitError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError('');

    const form = e.target;
    const data = new FormData(form);
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(data).toString(),
    })
      .then(() => {
        navigate('/thank-you', { state: { name: formData.name } });
      })
      .catch(() => {
        setSubmitError('Something went wrong. Please try again or contact me directly.');
        setIsSubmitting(false);
      });
  };

  return (
    <main>
      {/* Page Header */}
      <section className="section section--page-top">
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
                  <p className="contact-info__value">(317) 590-1373</p>
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
                  <p className="contact-info__value">aolson078@gmail.com</p>
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
              {prefillInfo.package && (
                <div
                  style={{
                    marginBottom: '1rem',
                    padding: '0.85rem 1rem',
                    borderRadius: '0.75rem',
                    background: 'rgba(232,124,62,0.08)',
                    border: '1px solid rgba(232,124,62,0.2)',
                    color: '#f5f1eb',
                  }}
                >
                  <p style={{ margin: '0 0 0.35rem', fontWeight: 600 }}>
                    Selected package: {serviceLabels[prefillInfo.package] || prefillInfo.package}
                  </p>
                  {prefillInfo.addons.length > 0 && (
                    <p style={{ margin: 0 }}>
                      Add-ons:{' '}
                      {prefillInfo.addons
                        .map((key) => addonLabels[key] || key)
                        .join(', ')}
                    </p>
                  )}
                </div>
              )}
              {submitError && (
                <div className="form-banner--error">
                  {submitError}
                </div>
              )}
                <form
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                >
                  <input type="hidden" name="form-name" value="contact" />
                  {Object.entries(hiddenFields).map(([name, value]) => (
                    <input key={name} type="hidden" name={name} value={value} />
                  ))}
                <p className="form-hidden" style={{ display: 'none' }}>
                  <label>
                    Don't fill this out if you're human:
                    <input name="bot-field" />
                  </label>
                </p>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={errors.name ? 'input--error' : ''}
                    />
                    {errors.name && <span className="form-error">{errors.name}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={errors.email ? 'input--error' : ''}
                    />
                    {errors.email && <span className="form-error">{errors.email}</span>}
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
                    {serviceOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    className={errors.message ? 'input--error' : ''}
                  />
                  {errors.message && <span className="form-error">{errors.message}</span>}
                </div>

                <button
                  type="submit"
                  className={`btn btn--primary${isSubmitting ? ' btn--loading' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Find Us on Google */}
      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="section__header section__header--center">
            <span className="section__eyebrow">GOOGLE</span>
            <h2 className="section__title">FIND US ON GOOGLE</h2>
            <p className="section__desc" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
              Happy with your experience? Leave us a review on Google. It helps
              other contractors find a web developer they can trust.
            </p>
          </div>
          <a
            href="https://g.page/contractor-web-studio/review"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary"
          >
            Leave a Google Review
          </a>
        </div>
      </section>

      {/* Book a Call Section */}
      <section className="section section--dark">
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="section__header section__header--center">
            <span className="section__eyebrow">SCHEDULE</span>
            <h2 className="section__title">BOOK A FREE 15-MIN CALL</h2>
            <p className="section__desc" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
              Prefer to talk it out? Pick a time that works for you and let's
              have a quick conversation about your project.
            </p>
          </div>
          <a
            href="https://cal.com/contractor-web-studio/15min"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary"
          >
            Pick a Time on Cal.com
          </a>
        </div>
      </section>
    </main>
  );
}

export default ContactPage;
