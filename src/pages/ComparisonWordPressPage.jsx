import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { buildTrackedContactPath } from '../utils/leadAttribution';

function ComparisonWordPressPage() {
  useEffect(() => {
    document.title = 'Custom-Coded Contractor Websites vs WordPress | Contractor Web Studio';
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('revealed');
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-scale').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const quoteHref = buildTrackedContactPath({
    lead_source: 'organic_search',
    campaign: 'wordpress_comparison_page',
  });

  return (
    <>
      <section className="section" style={{ paddingTop: '10rem' }}>
        <div className="container">
          <div className="section__header section__header--center reveal-up">
            <span className="section__eyebrow">COMPARISON</span>
            <h1 className="section__title">CUSTOM-CODED CONTRACTOR WEBSITES VS WORDPRESS</h1>
            <p className="section__desc">
              WordPress powers a huge chunk of the internet. But for a local
              contractor who needs speed, security, and leads — is it actually
              the best choice?
            </p>
          </div>
        </div>
      </section>

      {/* Quick verdict */}
      <section className="section section--dark">
        <div className="container">
          <div className="section__header reveal-up">
            <span className="section__eyebrow">THE SHORT VERSION</span>
            <h2 className="section__title">WORDPRESS HAS POWER. CUSTOM CODE HAS FOCUS.</h2>
          </div>
          <div className="reveal-up" style={{ maxWidth: 680 }}>
            <p>
              WordPress is a powerful platform if you need a blog engine, an
              e-commerce store, or a site with 500 pages. But most contractor
              websites need 3-6 pages, a fast contact form, and strong local SEO.
              For that scope, WordPress adds complexity and overhead you don't need.
            </p>
            <p>
              A custom-coded site strips away the plugin bloat, the security patches,
              the database, and the hosting costs — and gives you a faster, simpler
              site that does exactly what a contractor website should do.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison grid */}
      <section className="section">
        <div className="container">
          <div className="section__header section__header--center reveal-up">
            <span className="section__eyebrow">HEAD TO HEAD</span>
            <h2 className="section__title">WHERE EACH ONE WINS</h2>
          </div>

          <div className="comparison-table reveal-up" style={{ maxWidth: 720, margin: '0 auto' }}>
            {[
              { factor: 'Page Load Speed', wp: '3-8 seconds typical', custom: 'Under 2 seconds', winner: 'custom' },
              { factor: 'Security', wp: 'Requires constant updates', custom: 'No database, no attack surface', winner: 'custom' },
              { factor: 'Hosting Cost', wp: '$10-$50/mo for good hosting', custom: '$0/mo (Netlify free tier)', winner: 'custom' },
              { factor: 'Upfront Cost', wp: '$2,000-$8,000 (custom theme)', custom: '$800-$6,000', winner: 'custom' },
              { factor: 'Plugin Ecosystem', wp: '60,000+ plugins', custom: 'Built exactly to spec', winner: 'wp' },
              { factor: 'Content Editing', wp: 'Visual editor, easy updates', custom: 'Developer updates or guides', winner: 'wp' },
              { factor: 'SEO Control', wp: 'Good with plugins (Yoast, etc.)', custom: 'Full control, no plugin overhead', winner: 'custom' },
              { factor: 'Maintenance', wp: 'Core + plugin + theme updates', custom: 'Nearly zero ongoing maintenance', winner: 'custom' },
              { factor: 'Scalability', wp: 'Scales to any size', custom: 'Perfect for 3-15 page sites', winner: 'wp' },
            ].map((row, i) => (
              <div key={i} className="comparison-row">
                <div className="comparison-row__factor">{row.factor}</div>
                <div className={`comparison-row__cell ${row.winner === 'wp' ? 'comparison-row__cell--win' : ''}`}>
                  {row.wp}
                </div>
                <div className={`comparison-row__cell ${row.winner === 'custom' ? 'comparison-row__cell--win' : ''}`}>
                  {row.custom}
                </div>
              </div>
            ))}
            <div className="comparison-row comparison-row--header">
              <div className="comparison-row__factor"></div>
              <div className="comparison-row__cell">WordPress</div>
              <div className="comparison-row__cell">Custom Code</div>
            </div>
          </div>
        </div>
      </section>

      {/* The real problem with WordPress for contractors */}
      <section className="section section--dark">
        <div className="container">
          <div className="section__header reveal-up">
            <span className="section__eyebrow">THE REAL ISSUE</span>
            <h2 className="section__title">WORDPRESS IS BUILT FOR PUBLISHERS, NOT CONTRACTORS</h2>
          </div>
          <div className="reveal-up" style={{ maxWidth: 680 }}>
            <p>
              WordPress was designed as a blogging platform. It evolved into a
              general-purpose CMS. That flexibility is its strength — and its
              weakness. For a contractor website, you end up paying for features
              you'll never use while fighting with ones that should be simple.
            </p>
            <p>
              <strong>The plugin problem.</strong> Need a contact form? Install a plugin.
              Need SEO? Another plugin. Need speed? A caching plugin. Need security?
              A firewall plugin. Each one adds weight, complexity, and potential
              conflicts. A custom site has exactly the features you need, baked in
              from day one.
            </p>
            <p>
              <strong>The update treadmill.</strong> WordPress core, themes, and plugins
              all need regular updates. Skip them and you risk security vulnerabilities.
              Apply them and you risk breaking something. A static custom site has no
              database, no server-side code to exploit, and nothing that needs patching.
            </p>
            <p>
              <strong>The hosting tax.</strong> WordPress needs a PHP server and a MySQL
              database. Good hosting starts at $10-$30/month. Cheap hosting means slow
              load times. A custom-coded static site deploys for free on Netlify's CDN,
              serving pages from the edge, closer to your visitors.
            </p>
          </div>
        </div>
      </section>

      {/* When WordPress makes sense */}
      <section className="section">
        <div className="container">
          <div className="section__header reveal-up">
            <span className="section__eyebrow">BEING HONEST</span>
            <h2 className="section__title">WHEN WORDPRESS ACTUALLY MAKES SENSE</h2>
          </div>
          <div className="svc-grid">
            <div className="svc-card reveal-up stagger-1">
              <h3>You Need a Big Blog</h3>
              <p className="svc-card__desc">
                If content marketing is central to your strategy and you'll be
                publishing weekly articles, WordPress's editing experience is
                hard to beat.
              </p>
            </div>
            <div className="svc-card reveal-up stagger-2">
              <h3>You Want to Edit Everything Yourself</h3>
              <p className="svc-card__desc">
                WordPress's visual editor means you can change text, swap images,
                and add pages without touching code. If that independence matters
                more than speed, it's a fair trade-off.
              </p>
            </div>
            <div className="svc-card reveal-up stagger-3">
              <h3>You Need Complex Functionality</h3>
              <p className="svc-card__desc">
                E-commerce, membership areas, client portals, booking systems —
                if you need heavy backend features, WordPress has plugins for
                everything. Custom would cost much more to build.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Proof */}
      <section className="section section--dark">
        <div className="container">
          <div className="case-study">
            <div className="reveal-up">
              <img
                src="/portfolio/wolf-lake/Landing Page.png"
                alt="Wolf Lake Masonry custom website"
                className="case-study__image"
                loading="lazy"
              />
            </div>
            <div className="case-study__content reveal-up">
              <p className="case-study__tag">CUSTOM CODE IN ACTION</p>
              <h2 className="case-study__title">WOLF LAKE MASONRY</h2>
              <p className="case-study__desc">
                No WordPress, no plugins, no monthly hosting bills. Just a fast,
                custom React site built specifically for a masonry contractor.
                Sub-2-second loads, instant lead alerts, and a design that matches
                the trade. This is what lean, purpose-built looks like.
              </p>
              <Link to="/portfolio" className="btn btn--primary">See My Work</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container reveal-up">
          <h2 className="cta-section__title">WANT A SITE THAT JUST WORKS?</h2>
          <p className="cta-section__desc">
            No plugins to update, no hosting fees, no security patches. Just a fast
            site that gets you found and makes the phone ring.
          </p>
          <div className="cta-btns">
            <Link to={quoteHref} className="btn btn--primary">Get a Free Quote</Link>
            <a href="https://cal.com/contractor-web-studio/15min" target="_blank" rel="noopener noreferrer" className="btn btn--outline">
              Book a 15-Min Call
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default ComparisonWordPressPage;
