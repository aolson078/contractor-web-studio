import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { buildTrackedContactPath } from '../utils/leadAttribution';

function PricingGuidePage() {
  useEffect(() => {
    document.title = 'Website Pricing for Contractors | What It Actually Costs in 2026';
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
    campaign: 'pricing_guide_page',
  });

  return (
    <>
      <section className="section" style={{ paddingTop: '10rem' }}>
        <div className="container">
          <div className="section__header section__header--center reveal-up">
            <span className="section__eyebrow">PRICING GUIDE</span>
            <h1 className="section__title">WEBSITE PRICING FOR CONTRACTORS</h1>
            <p className="section__desc">
              What a contractor website actually costs in 2026, what you get at
              each price point, and how to tell if you're overpaying or underbuying.
            </p>
          </div>
        </div>
      </section>

      {/* Quick answer */}
      <section className="section section--dark">
        <div className="container">
          <div className="section__header reveal-up">
            <span className="section__eyebrow">THE SHORT ANSWER</span>
            <h2 className="section__title">$800 TO $6,000 FOR MOST CONTRACTOR SITES</h2>
          </div>
          <div className="reveal-up" style={{ maxWidth: 680 }}>
            <p>
              A basic 3-page site that gets you found on Google starts around $800.
              A full lead-generation system with alerts, local SEO, and follow-up
              automations runs $4,000-$6,000. Most contractors land somewhere in the
              middle at $2,000-$3,500.
            </p>
            <p>
              The price depends on three things: how many pages you need, how much
              automation you want behind the scenes, and whether you need content
              written for you. Everything else is noise.
            </p>
          </div>
        </div>
      </section>

      {/* Price breakdown */}
      <section className="section">
        <div className="container">
          <div className="section__header section__header--center reveal-up">
            <span className="section__eyebrow">WHAT YOU GET</span>
            <h2 className="section__title">PRICE BREAKDOWN BY PACKAGE</h2>
          </div>

          <div className="svc-grid">
            <div className="svc-card reveal-up stagger-1">
              <h3>$800 - $1,500</h3>
              <p className="svc-card__desc" style={{ fontWeight: 600, color: 'var(--accent)', marginBottom: '0.5rem' }}>
                Get Found Online
              </p>
              <p className="svc-card__desc">
                3 pages. Contact form with email alerts. Basic SEO. Mobile-responsive.
                Best for contractors who just need to exist online and start getting calls.
              </p>
            </div>
            <div className="svc-card reveal-up stagger-2">
              <h3>$2,000 - $3,500</h3>
              <p className="svc-card__desc" style={{ fontWeight: 600, color: 'var(--accent)', marginBottom: '0.5rem' }}>
                Never Miss a Lead
              </p>
              <p className="svc-card__desc">
                4-5 pages. Instant Slack/email alerts. Mailchimp tagging. Google Business Profile setup.
                Review request guidance. Best for contractors already getting traffic but losing conversions.
              </p>
            </div>
            <div className="svc-card reveal-up stagger-3">
              <h3>$4,000 - $6,000</h3>
              <p className="svc-card__desc" style={{ fontWeight: 600, color: 'var(--accent)', marginBottom: '0.5rem' }}>
                Grow on Autopilot
              </p>
              <p className="svc-card__desc">
                6+ pages. Service-specific landing pages. Follow-up automation roadmap.
                Competitive analysis. LocalBusiness schema. Best for contractors ready
                to own their local market.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What affects price */}
      <section className="section section--dark">
        <div className="container">
          <div className="section__header reveal-up">
            <span className="section__eyebrow">COST FACTORS</span>
            <h2 className="section__title">WHAT ACTUALLY DRIVES THE PRICE</h2>
          </div>
          <div className="svc-grid">
            {[
              {
                title: 'Number of Pages',
                desc: 'A 3-page site is simpler than a 10-page site with service-specific landing pages. More pages means more content, more design, and more SEO work.',
              },
              {
                title: 'Content Writing',
                desc: 'If you have your own photos and know what you want to say, the price stays lower. If I write the copy and source stock imagery, it adds $150-$500 depending on scope.',
              },
              {
                title: 'Automation & Integrations',
                desc: 'Basic email alerts are included. Slack/Discord webhooks, Mailchimp tagging, review request systems, and follow-up automation add complexity and cost.',
              },
              {
                title: 'Google Business Profile',
                desc: 'Setting up or optimizing your GBP listing, connecting it to the site, and adding schema markup is a separate line item ($200-$350) but makes a real difference for local search.',
              },
              {
                title: 'Ongoing Maintenance',
                desc: 'Monthly maintenance ($100-$200/mo) covers updates, backups, monitoring, and priority support. Optional but recommended if you want someone else handling it.',
              },
              {
                title: 'Revisions',
                desc: 'Every package includes 1-2 rounds of design revisions. Additional rounds or major scope changes beyond the original agreement add time and cost.',
              },
            ].map((item, i) => (
              <div key={i} className={`svc-card reveal-up stagger-${(i % 3) + 1}`}>
                <h3>{item.title}</h3>
                <p className="svc-card__desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hidden costs */}
      <section className="section">
        <div className="container">
          <div className="section__header reveal-up">
            <span className="section__eyebrow">WATCH OUT</span>
            <h2 className="section__title">HIDDEN COSTS OTHER BUILDERS DON'T MENTION</h2>
          </div>
          <div className="reveal-up" style={{ maxWidth: 680 }}>
            <p>
              <strong>Monthly platform fees.</strong> Wix charges $17-$159/month. Squarespace
              charges $16-$49/month. Over 3 years, you could spend $600-$5,700 just to
              keep a template site online. My sites deploy on Netlify's free tier with
              no monthly hosting fees for most contractor sites.
            </p>
            <p>
              <strong>Locked-in code.</strong> If you build on Wix, you can't take your
              site with you. With custom code, you own everything: the code, the design,
              the content, the domain. No lock-in.
            </p>
            <p>
              <strong>"SEO packages" that do nothing.</strong> Some agencies charge
              $500-$2,000/month for SEO that amounts to running an automated report.
              Real SEO starts with a well-structured site, fast load times, and pages
              that match what people are actually searching for.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison to alternatives */}
      <section className="section section--dark">
        <div className="container">
          <div className="section__header section__header--center reveal-up">
            <span className="section__eyebrow">COMPARE</span>
            <h2 className="section__title">HOW THIS COMPARES</h2>
          </div>
          <div className="svc-grid">
            <div className="svc-card reveal-up stagger-1">
              <h3>DIY (Wix / Squarespace)</h3>
              <p className="svc-card__desc">
                $0-$300 upfront + $17-$49/month. Looks generic, loads slow, limited
                SEO. Fine for a hobby, but not enough for a business that needs to
                compete locally.
              </p>
            </div>
            <div className="svc-card reveal-up stagger-2">
              <h3>Freelancer (Custom)</h3>
              <p className="svc-card__desc">
                $800-$6,000 one-time. You own the code, the site is fast, the design
                is custom. Best value for contractors who want a professional site
                without agency overhead.
              </p>
            </div>
            <div className="svc-card reveal-up stagger-3">
              <h3>Agency</h3>
              <p className="svc-card__desc">
                $5,000-$25,000+. Often overbuilt for what a local contractor needs.
                You get a project manager and a team, but you also get a longer
                timeline and a bigger invoice.
              </p>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }} className="reveal-up">
            <Link to="/contractor-websites-vs-wix" className="btn btn--outline" style={{ marginRight: '0.75rem' }}>
              Custom vs Wix
            </Link>
            <Link to="/contractor-websites-vs-wordpress" className="btn btn--outline">
              Custom vs WordPress
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container">
          <div className="section__header section__header--center reveal-up">
            <span className="section__eyebrow">FAQ</span>
            <h2 className="section__title">PRICING QUESTIONS</h2>
          </div>
          <div className="reveal-up" style={{ maxWidth: 680 }}>
            <p>
              <strong>Is a $800 site actually any good?</strong><br />
              Yes. It's a clean, fast, mobile-friendly 3-page site with a contact form
              and basic SEO. It won't have every bell and whistle, but it's enough to
              get found on Google and start generating calls. Most contractors who've
              never had a website should start here.
            </p>
            <p>
              <strong>Why not just use Wix?</strong><br />
              Wix is fine if you want to build it yourself and you're okay with
              slower load times, less SEO control, and monthly fees that add up.
              A custom-coded site loads 3-4x faster, ranks better, and costs nothing
              per month to host. <Link to="/contractor-websites-vs-wix" style={{ color: 'var(--accent)' }}>Full comparison here.</Link>
            </p>
            <p>
              <strong>What's the payment schedule?</strong><br />
              50% deposit to start, 50% on completion. You don't pay the second half
              until you've reviewed the site and you're happy with it. For larger
              projects, we can split it into three payments.
            </p>
            <p>
              <strong>Do I own the website?</strong><br />
              100%. The code, the design, the content, the domain — it's all yours.
              No lock-in, no proprietary platforms.
            </p>
            <p>
              <strong>What if I need more pages later?</strong><br />
              Easy. Most clients start with a smaller package and add pages as the
              business grows. Additional pages run $150-$300 each.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container reveal-up">
          <h2 className="cta-section__title">READY TO SEE WHAT YOUR SITE WOULD COST?</h2>
          <p className="cta-section__desc">
            Tell me about your business and I'll put together a straight estimate.
            No pressure, no jargon. Just a number and a plan.
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

export default PricingGuidePage;
