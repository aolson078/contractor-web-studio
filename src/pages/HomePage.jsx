import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import MockupBrowser from '../components/MockupBrowser';
import testimonials from '../data/testimonials';
import { buildTrackedContactPath } from '../utils/leadAttribution';

function HomePage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const heroQuoteHref = buildTrackedContactPath({
    lead_source: 'homepage',
    campaign: 'home_hero_quote',
  });
  const footerQuoteHref = buildTrackedContactPath({
    lead_source: 'homepage',
    campaign: 'home_footer_quote',
  });

  const nextTestimonial = useCallback(() => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    document.title = 'Contractor Websites Starting at $1,500 | Contractor Web Studio';
  }, []);

  // Auto-rotate testimonials every 6 seconds (skip if only 1)
  useEffect(() => {
    if (testimonials.length <= 1) return;
    const interval = setInterval(nextTestimonial, 6000);
    return () => clearInterval(interval);
  }, [nextTestimonial]);

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
      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero__bg" />
        <div className="container hero__grid">
          <div className="hero__text">
            <span className="hero__eyebrow">CONTRACTOR WEBSITE SPECIALIST</span>
            <h1 className="hero__title">
              YOUR COMPETITORS ARE GETTING FOUND ONLINE. <span>ARE YOU?</span>
            </h1>
            <p className="hero__subtitle">
              75% of customers check online before hiring a contractor. If you
              don't have a website, or yours looks like it was built in 2005,
              you're handing jobs to the competition.
            </p>
            <div className="hero__cta">
              <Link to={heroQuoteHref} className="btn btn--primary">Get a Free Quote</Link>
              <Link to="/portfolio" className="btn btn--outline">See My Work</Link>
            </div>
            <p className="hero__proof">1 client launched. Custom-coded, fully owned, zero platform fees.</p>
          </div>

          <div className="hero__visual">
            <div className="hero__mockup">
              <MockupBrowser variant="contractor" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats + Trust Band ── */}
      <section className="stats-band">
        <div className="container stats-band__inner">
          <div className="stats-band__row">
            <div className="stat">
              <div className="stat__number">100%</div>
              <div className="stat__label">Mobile Responsive</div>
            </div>
            <div className="stat">
              <div className="stat__number">2-3 Weeks</div>
              <div className="stat__label">Average Delivery</div>
            </div>
            <div className="stat">
              <div className="stat__number">$1,500+</div>
              <div className="stat__label">Starting Price</div>
            </div>
            <div className="stat">
              <div className="stat__number">24/7</div>
              <div className="stat__label">Your Site Works For You</div>
            </div>
          </div>
          <div className="stats-band__row stats-band__row--trust">
            <div className="stat stat--trust">
              <div className="stat__trust-label">Custom Code Only</div>
            </div>
            <div className="stat stat--trust">
              <div className="stat__trust-label">You Own Everything</div>
            </div>
            <div className="stat stat--trust">
              <div className="stat__trust-label">No Platform Fees</div>
            </div>
            <div className="stat stat--trust">
              <div className="stat__trust-label">30-Day Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Problem Section ── */}
      <section className="section section--dark">
        <div className="container">
          <div className="section__header reveal-up">
            <span className="section__eyebrow">THE PROBLEM</span>
            <h2 className="section__title">MOST CONTRACTORS ARE INVISIBLE ONLINE</h2>
          </div>
          <div className="reveal-up" style={{ maxWidth: 640 }}>
            <p>
              75% of people search online before hiring a contractor. If you're not
              showing up, they're calling someone who is.
            </p>
            <p>
              No website means you're losing jobs every single week to competitors
              who took 30 minutes to get listed. Word of mouth is great, but it
              doesn't scale.
            </p>
            <p>
              And a bad website? That's worse than none at all. A slow, outdated
              site tells potential customers you don't care about your business,
              so why would they trust you with theirs?
            </p>
          </div>
        </div>
      </section>

      {/* ── Services Preview ── */}
      <section className="section">
        <div className="container">
          <div className="section__header section__header--center reveal-up">
            <span className="section__eyebrow">WHAT I BUILD</span>
            <h2 className="section__title">WEBSITES THAT WORK AS HARD AS YOU DO</h2>
          </div>

          <div className="svc-grid">
            {/* Card 1 */}
            <div className="svc-card reveal-up stagger-1">
              <div className="svc-card__icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <h3>Get Found Online</h3>
              <p className="svc-card__desc">
                $1,500+ &middot; A clean 3-page site with a contact form and
                basic SEO so customers can actually find you on Google.
              </p>
            </div>

            {/* Card 2 */}
              <div className="svc-card reveal-up stagger-2">
                <div className="svc-card__icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <h3>Never Miss a Lead</h3>
              <p className="svc-card__desc">
                $2,000 - $3,500 &middot; 4-5 pages with instant email and Slack/Discord
                alerts on every inquiry and a review-request checklist you can follow.
              </p>
            </div>

            {/* Card 3 */}
            <div className="svc-card reveal-up stagger-3">
              <div className="svc-card__icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              </div>
              <h3>Grow on Autopilot</h3>
              <p className="svc-card__desc">
                $4,000 - $6,000 &middot; 6+ pages with a documented follow-up roadmap,
                competitive analysis, and a full lead-capture pipeline.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Case Study Preview ── */}
      <section className="section section--dark">
        <div className="container">
          <div className="case-study">
            <div className="reveal-up">
              <img
                src="/portfolio/wolf-lake/Landing Page.png"
                alt="Wolf Lake Masonry Inc. website"
                className="case-study__image"
                loading="lazy"
              />
            </div>

            <div className="case-study__content reveal-up">
              <p className="case-study__tag">FEATURED PROJECT</p>
              <h2 className="case-study__title">WOLF LAKE MASONRY INC.</h2>
              <p className="case-study__desc">
                A fully custom React website with a "Timberstone" design system
                for a family-owned masonry &amp; hardscaping company in
                Winston-Salem, NC. Now their primary source of new project inquiries.
              </p>
              <div className="case-study__stats">
                <div>
                  <div className="case-study__stat-number">4</div>
                  <div className="case-study__stat-label">Pages</div>
                </div>
                <div>
                  <div className="case-study__stat-number">7</div>
                  <div className="case-study__stat-label">Projects</div>
                </div>
                <div>
                  <div className="case-study__stat-number">A+</div>
                  <div className="case-study__stat-label">BBB Rating</div>
                </div>
              </div>
              <Link to="/portfolio" className="btn btn--primary">View Project</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="section">
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

      {/* ── Testimonials Carousel ── */}
      <section className="testi-section">
        <div className="container reveal-up">
          <div className="testi-featured">
            <blockquote className="testi-featured__quote">
              Wolf Lake Masonry's website became their primary source of new project inquiries within 30 days of launch.
            </blockquote>
            <p className="testi-featured__attr">Wolf Lake Masonry Inc. &middot; Winston-Salem, NC</p>
          </div>
          <div className="testi-carousel">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`testi-carousel__slide ${i === activeTestimonial ? 'testi-carousel__slide--active' : ''}`}
              >
                <span className="testi__mark">"</span>
                <blockquote className="testi-quote">{t.quote}</blockquote>
                <div className="testi__rule" />
                <p className="testi-attr">
                  {t.name} - {t.location}
                </p>
              </div>
            ))}
          </div>
          {testimonials.length > 1 && (
            <div className="testi-carousel__dots">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`testi-carousel__dot ${i === activeTestimonial ? 'testi-carousel__dot--active' : ''}`}
                  onClick={() => setActiveTestimonial(i)}
                  aria-label={`View testimonial ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="cta-section">
        <div className="container reveal-up">
          <h2 className="cta-section__title">READY TO GET FOUND ONLINE?</h2>
          <p className="cta-section__desc">
            Let's talk about what a professional website can do for your
            contracting business. No pressure, no jargon. Just a straight
            conversation.
          </p>
          <div className="cta-btns">
            <Link to={footerQuoteHref} className="btn btn--primary">Get a Free Quote</Link>
            <a href="tel:+13175901373" className="btn btn--outline">Call Me Directly</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
