import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { buildTrackedContactPath } from '../utils/leadAttribution';

function ComparisonWixPage() {
  useEffect(() => {
    document.title = 'Custom-Coded Contractor Websites vs Wix | Contractor Web Studio';
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
    campaign: 'wix_comparison_page',
  });

  return (
    <>
      <section className="section" style={{ paddingTop: '10rem' }}>
        <div className="container">
          <div className="section__header section__header--center reveal-up">
            <span className="section__eyebrow">COMPARISON</span>
            <h1 className="section__title">CUSTOM-CODED CONTRACTOR WEBSITES VS WIX</h1>
            <p className="section__desc">
              An honest breakdown of when Wix makes sense, when it doesn't, and
              why most contractors who've tried both end up switching to custom code.
            </p>
          </div>
        </div>
      </section>

      {/* Quick verdict */}
      <section className="section section--dark">
        <div className="container">
          <div className="section__header reveal-up">
            <span className="section__eyebrow">THE SHORT VERSION</span>
            <h2 className="section__title">WIX GETS YOU ONLINE. CUSTOM CODE GETS YOU CALLS.</h2>
          </div>
          <div className="reveal-up" style={{ maxWidth: 680 }}>
            <p>
              Wix is a fine tool if you want to build a quick site yourself and you
              don't mind the trade-offs. But if you're a contractor competing for
              local business and you need your site to actually generate leads,
              custom code wins on every metric that matters: speed, SEO, design
              flexibility, and long-term cost.
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
              { factor: 'Page Load Speed', wix: '4-8 seconds typical', custom: 'Under 2 seconds', winner: 'custom' },
              { factor: 'Monthly Cost', wix: '$17-$159/mo forever', custom: '$0/mo (Netlify free tier)', winner: 'custom' },
              { factor: 'Upfront Cost', wix: '$0-$300', custom: '$800-$6,000', winner: 'wix' },
              { factor: 'SEO Control', wix: 'Limited, template-bound', custom: 'Full control over everything', winner: 'custom' },
              { factor: 'Mobile Experience', wix: 'Separate mobile editor', custom: 'True responsive, one codebase', winner: 'custom' },
              { factor: 'Design Flexibility', wix: 'Drag-and-drop templates', custom: 'Unlimited, pixel-perfect', winner: 'custom' },
              { factor: 'Code Ownership', wix: 'Locked to Wix platform', custom: 'You own all code and files', winner: 'custom' },
              { factor: 'Ease of Setup', wix: 'Build it yourself today', custom: '2-3 weeks with a developer', winner: 'wix' },
              { factor: '3-Year Total Cost', wix: '$612 - $5,724', custom: '$800 - $6,000 (one-time)', winner: 'custom' },
            ].map((row, i) => (
              <div key={i} className="comparison-row">
                <div className="comparison-row__factor">{row.factor}</div>
                <div className={`comparison-row__cell ${row.winner === 'wix' ? 'comparison-row__cell--win' : ''}`}>
                  {row.wix}
                </div>
                <div className={`comparison-row__cell ${row.winner === 'custom' ? 'comparison-row__cell--win' : ''}`}>
                  {row.custom}
                </div>
              </div>
            ))}
            <div className="comparison-row comparison-row--header">
              <div className="comparison-row__factor"></div>
              <div className="comparison-row__cell">Wix</div>
              <div className="comparison-row__cell">Custom Code</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why speed matters */}
      <section className="section section--dark">
        <div className="container">
          <div className="section__header reveal-up">
            <span className="section__eyebrow">WHY IT MATTERS</span>
            <h2 className="section__title">SPEED IS NOT A VANITY METRIC</h2>
          </div>
          <div className="reveal-up" style={{ maxWidth: 680 }}>
            <p>
              Every extra second your site takes to load costs you roughly 7% of
              visitors. A Wix site that loads in 6 seconds has already lost a third
              of its potential customers before they see anything. On mobile, where
              most local searches happen, this gap gets worse.
            </p>
            <p>
              Google also uses page speed as a ranking factor. A faster site doesn't
              just keep visitors — it shows up higher in search results. For a
              contractor competing in a local market, that difference can mean showing
              up on page 1 versus page 3.
            </p>
          </div>
        </div>
      </section>

      {/* When Wix is fine */}
      <section className="section">
        <div className="container">
          <div className="section__header reveal-up">
            <span className="section__eyebrow">BEING HONEST</span>
            <h2 className="section__title">WHEN WIX IS ACTUALLY FINE</h2>
          </div>
          <div className="svc-grid">
            <div className="svc-card reveal-up stagger-1">
              <h3>You Just Need a Placeholder</h3>
              <p className="svc-card__desc">
                If you just need something online while you figure out the business,
                Wix works. It's fast to set up and cheap to start.
              </p>
            </div>
            <div className="svc-card reveal-up stagger-2">
              <h3>You Enjoy Building It</h3>
              <p className="svc-card__desc">
                Some people like the process. If you have the time and you find
                drag-and-drop editing fun, Wix is a perfectly fine hobby tool.
              </p>
            </div>
            <div className="svc-card reveal-up stagger-3">
              <h3>You Don't Compete Locally</h3>
              <p className="svc-card__desc">
                If you're not trying to rank on Google against other contractors in
                your area, the SEO and speed disadvantages matter less.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* When custom wins */}
      <section className="section section--dark">
        <div className="container">
          <div className="section__header reveal-up">
            <span className="section__eyebrow">THE REAL DIFFERENCE</span>
            <h2 className="section__title">WHEN CUSTOM CODE IS WORTH IT</h2>
          </div>
          <div className="svc-grid">
            <div className="svc-card reveal-up stagger-1">
              <h3>You Need Local Leads</h3>
              <p className="svc-card__desc">
                If your business depends on showing up when someone searches your
                trade + your city, custom code gives you the SEO control and page
                speed that Wix can't match.
              </p>
            </div>
            <div className="svc-card reveal-up stagger-2">
              <h3>You Want to Look Professional</h3>
              <p className="svc-card__desc">
                Wix sites look like Wix sites. When a homeowner is comparing you
                to three other contractors, a custom-designed site signals that
                you take your business seriously.
              </p>
            </div>
            <div className="svc-card reveal-up stagger-3">
              <h3>You're Tired of Monthly Fees</h3>
              <p className="svc-card__desc">
                $17-$159/month adds up. Over 3 years you could spend thousands
                on a platform you don't own. A custom site is a one-time investment
                with free hosting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Proof */}
      <section className="section">
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
                This is what a custom-coded contractor site looks like. Sub-2-second
                load times, a design that matches the trade, and a contact path that
                doesn't make people hunt. Built with React — no templates, no monthly
                fees, no platform lock-in.
              </p>
              <Link to="/portfolio" className="btn btn--primary">See My Work</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container reveal-up">
          <h2 className="cta-section__title">READY TO DITCH THE TEMPLATE?</h2>
          <p className="cta-section__desc">
            If your Wix site isn't generating the calls it should, let's talk about
            what a custom-coded site could do for your business.
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

export default ComparisonWixPage;
