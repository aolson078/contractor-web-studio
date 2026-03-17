import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function ServicesPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-scale').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="page-content">
      {/* ── Page Header ── */}
      <section className="section" style={{ paddingTop: '10rem' }}>
        <div className="container">
          <div className="section__header section__header--center reveal-up">
            <span className="section__eyebrow">SERVICES</span>
            <h1 className="section__title">WEBSITES BUILT FOR CONTRACTORS</h1>
            <p className="section__desc">
              Turn-key website solutions designed specifically for contractors and
              construction companies. Every package includes a fast, mobile-friendly
              site that gets you found on Google and turns visitors into paying customers.
            </p>
          </div>
        </div>
      </section>

      {/* ── Pricing Tiers ── */}
      <section className="section section--dark">
        <div className="container">
          <div className="pricing-grid">
            {/* Tier 1 */}
            <div className="pricing-card reveal-up stagger-1">
              <h3 className="pricing-card__name">Get Found Online</h3>
              <div className="pricing-card__price">$800 – $1,500</div>
              <p className="pricing-card__price-note">2–3 week delivery</p>
              <ul className="pricing-card__features">
                <li>3 pages (Home, Projects, Contact)</li>
                <li>Contact form with email notification</li>
                <li>Basic SEO (meta tags, sitemap)</li>
                <li>Mobile-responsive design</li>
                <li>User guide + content update guide</li>
                <li>1 round of design revisions</li>
                <li>30 days support</li>
              </ul>
              <Link to="/contact" className="btn btn--outline">Get Started</Link>
            </div>

            {/* Tier 2 - Featured */}
            <div className="pricing-card pricing-card--featured reveal-up stagger-2">
              <span className="pricing-card__badge">MOST POPULAR</span>
              <h3 className="pricing-card__name">Never Miss a Lead</h3>
              <div className="pricing-card__price">$2,000 – $3,500</div>
              <p className="pricing-card__price-note">3–4 week delivery</p>
              <ul className="pricing-card__features">
                <li>4–5 pages (+ Services or About)</li>
                <li>Instant SMS + email alerts on form submission</li>
                <li>CRM integration (lead tracking)</li>
                <li>Review request system</li>
                <li>Google Business Profile setup</li>
                <li>Business strategy docs</li>
                <li>2 rounds of design revisions</li>
                <li>60 days support</li>
              </ul>
              <Link to="/contact" className="btn btn--primary">Get Started</Link>
            </div>

            {/* Tier 3 */}
            <div className="pricing-card reveal-up stagger-3">
              <h3 className="pricing-card__name">Grow on Autopilot</h3>
              <div className="pricing-card__price">$4,000 – $6,000</div>
              <p className="pricing-card__price-note">4–6 week delivery</p>
              <ul className="pricing-card__features">
                <li>6+ pages with service-specific landing pages</li>
                <li>Automated follow-up sequences</li>
                <li>Automated review reminders</li>
                <li>LocalBusiness schema + landing pages</li>
                <li>All docs + competitive analysis</li>
                <li>2 rounds + copy assistance</li>
                <li>90 days support + 1-hour training</li>
              </ul>
              <Link to="/contact" className="btn btn--outline">Get Started</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Add-Ons ── */}
      <section className="section">
        <div className="container">
          <div className="section__header section__header--center reveal-up">
            <span className="section__eyebrow">ADD-ONS</span>
            <h2 className="section__title">NEED SOMETHING EXTRA?</h2>
            <p className="section__desc">
              Every project is different. These add-ons can be paired with any
              package to give you exactly what your business needs.
            </p>
          </div>

          <div className="svc-grid reveal-up">
            <div className="svc-card">
              <h3>Additional Pages</h3>
              <p className="svc-card__desc">$150 – $300 per page</p>
            </div>
            <div className="svc-card">
              <h3>Content Writing</h3>
              <p className="svc-card__desc">$150 – $300</p>
            </div>
            <div className="svc-card">
              <h3>Google Business Profile</h3>
              <p className="svc-card__desc">$200 – $350</p>
            </div>
            <div className="svc-card">
              <h3>Social Media Setup</h3>
              <p className="svc-card__desc">$150 – $250</p>
            </div>
            <div className="svc-card">
              <h3>Monthly Maintenance</h3>
              <p className="svc-card__desc">$100 – $200 / mo</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="section section--dark">
        <div className="container">
          <div className="section__header section__header--center reveal-up">
            <span className="section__eyebrow">HOW IT WORKS</span>
            <h2 className="section__title">FROM HANDSHAKE TO LAUNCH IN WEEKS</h2>
          </div>

          <div className="process-grid">
            <div className="process-step reveal-up stagger-1">
              <div className="process-step__number">01</div>
              <h3>DISCOVERY</h3>
              <p>We talk about your business, your customers, and what you need your site to do.</p>
            </div>
            <div className="process-step reveal-up stagger-2">
              <div className="process-step__number">02</div>
              <h3>DESIGN</h3>
              <p>I build your custom site. Fast, mobile-friendly, and designed to get you leads.</p>
            </div>
            <div className="process-step reveal-up stagger-3">
              <div className="process-step__number">03</div>
              <h3>LAUNCH</h3>
              <p>Your site goes live, shows up on Google, and starts working for you 24/7.</p>
            </div>
            <div className="process-step reveal-up stagger-4">
              <div className="process-step__number">04</div>
              <h3>GROW</h3>
              <p>Leads start coming in. You focus on the work. Your website handles the rest.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="container reveal-up">
          <h2 className="cta-section__title">LET'S BUILD YOUR LEAD MACHINE</h2>
          <p className="cta-section__desc">
            Pick a package, ask a question, or just say hey. No pressure, no jargon
            Just a straight conversation about what your business needs.
          </p>
          <div className="cta-btns">
            <Link to="/contact" className="btn btn--primary">Get a Free Quote</Link>
            <Link to="/contact" className="btn btn--outline">Ask a Question</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ServicesPage;
