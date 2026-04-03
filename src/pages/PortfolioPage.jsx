import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import MockupBrowser from '../components/MockupBrowser';
import portfolioData from '../data/portfolioData';

function PortfolioPage() {
  useEffect(() => {
    document.title = 'Portfolio & Case Studies | Contractor Web Studio';
  }, []);

  return (
    <>
      {/* ── Page Header ── */}
      <section className="section section--page-top">
        <div className="container">
          <div className="section__header section__header--center reveal-up">
            <span className="section__eyebrow">PORTFOLIO</span>
            <h1 className="section__title">PROOF THAT IT WORKS</h1>
            <p className="section__desc">
              Real projects, real results. Here's what I've built for contractors
              who wanted to stop losing leads to competitors with better websites.
            </p>
          </div>
        </div>
      </section>

      {/* ── Wolf Lake Masonry Case Study ── */}
      <section className="section section--dark">
        <div className="container">
          <div className="case-study">
            <div className="reveal-up">
              <img
                src="/portfolio/wolf-lake/Landing Page.png"
                alt="Wolf Lake Masonry Inc. website - homepage"
                className="case-study__image"
                loading="lazy"
              />
            </div>

            <div className="case-study__content reveal-up stagger-1">
              <p className="case-study__tag">
                MASONRY & HARDSCAPING &bull; WINSTON-SALEM, NC
              </p>
              <h2 className="case-study__title">WOLF LAKE MASONRY INC.</h2>
              <p className="case-study__desc">
                Wolf Lake Masonry Inc. is a family-owned masonry and hardscaping
                business serving Winston-Salem since 1992. They needed a modern
                web presence to showcase their craftsmanship and generate quote
                requests. I designed and built the site from scratch using React
                with a custom "Timberstone" CSS design system, a dark
                forest/gold/stone palette that reinforces their rugged
                reliability. Since launch, it has become their primary source of
                new project inquiries.
              </p>

              <h3
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--accent)',
                  marginBottom: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                }}
              >
                What was built
              </h3>
              <ul
                style={{
                  listStyle: 'none',
                  marginBottom: '2rem',
                  padding: 0,
                }}
              >
                {[
                  '4-page React website (Home, Projects, Contact, Privacy)',
                  'Custom "Timberstone" design system with forest/gold/stone palette',
                  'Scroll-triggered animated counters (experience, BBB rating, projects)',
                  'Auto-rotating testimonial carousel with crossfade transitions',
                  'Netlify Forms with honeypot spam filtering',
                  'Image optimization pipeline (Sharp + WebP/AVIF)',
                  'SEO essentials (Open Graph, Twitter Cards, sitemap, semantic HTML)',
                ].map((item, i) => (
                  <li
                    key={i}
                    style={{
                      padding: '0.4rem 0',
                      fontSize: '0.9rem',
                      color: 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.5rem',
                    }}
                  >
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        background: 'var(--accent)',
                        borderRadius: '50%',
                        flexShrink: 0,
                        marginTop: '0.55rem',
                      }}
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="case-study__stats">
                <div>
                  <p className="case-study__stat-number">4</p>
                  <p className="case-study__stat-label">Pages</p>
                </div>
                <div>
                  <p className="case-study__stat-number">7</p>
                  <p className="case-study__stat-label">Project Showcases</p>
                </div>
                <div>
                  <p className="case-study__stat-number">A+</p>
                  <p className="case-study__stat-label">BBB Rating</p>
                </div>
                <div>
                  <p className="case-study__stat-number">1992</p>
                  <p className="case-study__stat-label">Est.</p>
                </div>
              </div>

              <h3
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--accent)',
                  marginBottom: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                }}
              >
                Results
              </h3>
              <div className="case-study__stats" style={{ marginBottom: '2rem' }}>
                <div>
                  <p className="case-study__stat-number">7</p>
                  <p className="case-study__stat-label">Days to First Lead</p>
                </div>
                <div>
                  <p className="case-study__stat-number">&lt;2s</p>
                  <p className="case-study__stat-label">Page Load</p>
                </div>
                <div>
                  <p className="case-study__stat-number">5-Star</p>
                  <p className="case-study__stat-label">Google Reviews in Month 1</p>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  marginBottom: '1.5rem',
                }}
              >
                {['React 18', 'Vite 5', 'Netlify Forms', 'Sharp', 'GA4'].map(
                  (tech, i) => (
                    <span
                      key={i}
                      style={{
                        display: 'inline-block',
                        padding: '0.3rem 0.85rem',
                        fontSize: '0.7rem',
                        fontFamily: 'var(--font-mono)',
                        letterSpacing: '0.04em',
                        color: 'var(--accent)',
                        background: 'var(--accent-glow)',
                        border: '1px solid var(--accent-border)',
                        borderRadius: 'var(--radius-sm)',
                        textTransform: 'uppercase',
                      }}
                    >
                      {tech}
                    </span>
                  )
                )}
              </div>

              <a
                href="https://www.wolflakemasonryinc.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary"
              >
                Visit Live Site
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Wolf Lake Screenshots ── */}
      <section className="section">
        <div className="container">
          <div className="section__header section__header--center reveal-up">
            <span className="section__eyebrow">SCREENSHOTS</span>
            <h2 className="section__title">WOLF LAKE MASONRY IN ACTION</h2>
          </div>
          <div className="screenshot-grid screenshot-grid--wide">
            <div className="screenshot-card reveal-up stagger-1">
              <img
                src="/portfolio/wolf-lake/HomePage2.png"
                alt="Wolf Lake Masonry - Stats counters and services"
                loading="lazy"
              />
              <p className="screenshot-card__label">Stats & Services</p>
            </div>
            <div className="screenshot-card reveal-up stagger-2">
              <img
                src="/portfolio/wolf-lake/HomePage3.png"
                alt="Wolf Lake Masonry - Testimonial carousel"
                loading="lazy"
              />
              <p className="screenshot-card__label">Testimonials & CTA</p>
            </div>
            <div className="screenshot-card reveal-up stagger-1">
              <img
                src="/portfolio/wolf-lake/ProjectPage1.png"
                alt="Wolf Lake Masonry - Projects gallery"
                loading="lazy"
              />
              <p className="screenshot-card__label">Projects Gallery</p>
            </div>
            <div className="screenshot-card reveal-up stagger-2">
              <img
                src="/portfolio/wolf-lake/ProjectPage2.png"
                alt="Wolf Lake Masonry - More projects"
                loading="lazy"
              />
              <p className="screenshot-card__label">Project Showcase</p>
            </div>
            <div className="screenshot-card reveal-up stagger-1">
              <img
                src="/portfolio/wolf-lake/ContactPage.png"
                alt="Wolf Lake Masonry - Contact form"
                loading="lazy"
              />
              <p className="screenshot-card__label">Contact Page</p>
            </div>
            <div className="screenshot-card reveal-up stagger-2">
              <img
                src="/portfolio/wolf-lake/HomePage4.png"
                alt="Wolf Lake Masonry - Footer"
                loading="lazy"
              />
              <p className="screenshot-card__label">Footer</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonial ── */}
      <section className="testi-section">
        <div className="container reveal-up">
          <span className="testi__mark">"</span>
          <blockquote className="testi-quote">
            Alex built us a site that actually looks like our work. Solid, clean,
            and professional. We started getting calls the first week it went live.
          </blockquote>
          <div className="testi__rule" />
          <p className="testi-attr">Wolf Lake Masonry</p>
        </div>
      </section>

      {/* ── More Projects ── */}
      <section className="section">
        <div className="container">
          <div className="section__header section__header--center reveal-up">
            <span className="section__eyebrow">MORE PROJECTS</span>
            <h2 className="section__title">RECENT BUILDS</h2>
            <p className="section__desc">
              Every project is custom-built for the trade. Here are a few more
              contractors I've helped get online.
            </p>
          </div>

          <div className="portfolio-grid">
            {portfolioData
              .filter((p) => p.slug !== 'wolf-lake-masonry')
              .map((project, i) => (
                <div
                  key={project.slug}
                  className={`portfolio-card reveal-up stagger-${(i % 3) + 1}`}
                >
                  <div className="portfolio-card__mockup">
                    {project.cardImage ? (
                      <img
                        src={project.cardImage}
                        alt={project.cardImageAlt || `${project.name} website preview`}
                        className="portfolio-card__image"
                        loading="lazy"
                      />
                    ) : (
                      <MockupBrowser variant={project.mockupVariant} />
                    )}
                  </div>
                  <div className="portfolio-card__body">
                    <p className="portfolio-card__trade">
                      {project.trade.toUpperCase()} &bull; {project.location.toUpperCase()}
                    </p>
                    <h3 className="portfolio-card__name">{project.name}</h3>
                    <p className="portfolio-card__desc">{project.description}</p>
                    <div className="portfolio-card__tags">
                      {project.techTags.map((tag, j) => (
                        <span key={j} className="portfolio-card__tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* ── What Clients Get ── */}
      <section className="section">
        <div className="container">
          <div className="section__header section__header--center reveal-up">
            <span className="section__eyebrow">DELIVERABLES</span>
            <h2 className="section__title">WHAT EVERY CLIENT GETS</h2>
            <p className="section__desc">
              No surprise invoices, no missing pieces. Every project ships with
              the full package.
            </p>
          </div>

          <div className="svc-grid">
            {[
              {
                title: 'Professional Website',
                desc: 'A fast, modern React site custom-designed for your trade. Built to load fast and look sharp on every device.',
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                ),
              },
              {
                title: 'Contact Form with Instant Alerts',
                desc: 'Every lead hits your inbox and Slack/Discord the moment it comes in. Email and webhook notifications so you never miss a job.',
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                ),
              },
              {
                title: 'SEO Optimization',
                desc: 'LocalBusiness schema, meta tags, fast load times, and mobile-first design so Google knows you exist.',
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                ),
              },
              {
                title: 'Mobile-Responsive Design',
                desc: 'Your site looks and works perfectly on phones, tablets, and desktops. Most of your customers will find you on mobile first.',
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                    <line x1="12" y1="18" x2="12.01" y2="18" />
                  </svg>
                ),
              },
              {
                title: 'Client Documentation Package',
                desc: 'Plain-English guides that show you how to update content, manage your site, and understand your hosting. No tech degree required.',
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                ),
              },
              {
                title: 'Ongoing Support',
                desc: 'Questions after launch? I\'m a phone call away. You get a real person who built your site, not a support ticket queue.',
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`svc-card reveal-up stagger-${(i % 3) + 1}`}
              >
                <div className="svc-card__icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p className="svc-card__desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="container reveal-up">
          <h2 className="cta-section__title">READY TO SEE YOUR NAME HERE?</h2>
          <p className="cta-section__desc">
            Let's talk about what a professional website can do for your
            contracting business. Free consultation, no pressure.
          </p>
          <div className="cta-btns">
            <Link to="/contact" className="btn btn--primary">
              Get a Free Quote
            </Link>
            <Link to="/services" className="btn btn--outline">
              View Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default PortfolioPage;
