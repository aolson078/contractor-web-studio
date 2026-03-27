import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import landingPages from '../data/landingPages';
import { buildTrackedContactPath } from '../utils/leadAttribution';

const PAGE_TITLE = 'Pricing & Packages | Contractor Web Studio';
const firstWaveLandingOrder = [
  'masonry-hardscaping-website-design',
  'deck-fence-website-design',
  'concrete-contractor-website-design',
  'contractor-website-designer-winston-salem',
  'contractor-website-designer-greensboro',
];

const firstWaveLandingPages = firstWaveLandingOrder
  .map((slug) => landingPages.find((page) => page.slug === slug))
  .filter(Boolean);

const faqData = [
  {
    question: 'How long does it take to build my website?',
    answer:
      'Most projects take 2-3 weeks from start to launch. More complex builds with extra pages, automations, and content writing can take 4-6 weeks. I\'ll give you a clear timeline during our initial conversation so you know exactly what to expect.',
  },
  {
    question: 'Do I need to provide content or photos?',
    answer:
      'It helps, but I can work with what you have. If you have job site photos, even from your phone, those work great. For written content, I can handle the copywriting as an add-on, or I\'ll guide you through exactly what to write with simple templates.',
  },
  {
    question: 'What if I already have a website?',
    answer:
      'We can rebuild it from scratch or modernize what you have. Most contractors who come to me have an outdated site that isn\'t generating leads. I\'ll look at what you\'ve got and recommend the best path forward. Sometimes it\'s a full rebuild, sometimes it\'s targeted improvements.',
  },
  {
    question: 'Do you offer hosting?',
    answer:
      'I set up hosting on Netlify, which has a generous free tier that works perfectly for most contractor websites. No monthly hosting fees for basic sites. If your needs grow beyond the free tier, hosting typically costs $19/month, which I\'ll help you set up.',
  },
  {
    question: 'Can I update the site myself?',
    answer:
      'I provide documentation with every project, but most clients prefer to send me the updates and I handle it. Small text or photo changes are usually quick and I\'m happy to help. For clients on a maintenance plan, updates are included.',
  },
  {
    question: 'What happens after the support period?',
    answer:
      'I offer ongoing maintenance plans starting at $100-200/month that cover updates, backups, performance monitoring, and priority support. But even without a plan, I\'m always available for one-off requests. I don\'t disappear after launch.',
  },
  {
    question: 'Do I own the code?',
    answer:
      'Absolutely. You own everything: the code, the design, the content, the domain. It\'s your website. I\'ll hand over all files and credentials when the project is complete. No lock-in, no proprietary platforms.',
  },
  {
    question: 'What\'s the payment schedule?',
    answer:
      '50% deposit to start, 50% on completion. I don\'t charge the final payment until you\'ve reviewed the site and are happy with it. For larger projects, we can discuss a three-payment structure.',
  },
  {
    question: 'Can I add features later?',
    answer:
      'Yes! Most of my clients start with a basic package and add features as their business grows. Want to add a blog, a gallery, or automated follow-ups down the road? Easy. Your site is built to grow with you.',
  },
  {
    question: 'What makes your sites different from Wix/Squarespace?',
    answer:
      'Custom code means better performance, SEO, and no monthly platform fees. Template builders are fine for hobby sites, but they\'re slow, limited, and look generic. My sites load 3-4x faster, rank better on Google, and are built specifically for your trade, not a one-size-fits-all template.',
  },
];

function ServicesPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState('get-found');
  const [depositEmail, setDepositEmail] = useState('');
  const [depositError, setDepositError] = useState('');
  const [isPaying, setIsPaying] = useState(false);

  useEffect(() => {
    document.title = PAGE_TITLE;
  }, []);
  const [addons, setAddons] = useState({
    pages: false,
    content: false,
    google: false,
    social: false,
    maintenance: false,
  });

  const packages = {
    'get-found': { name: 'Get Found Online', price: 800 },
    'never-miss': { name: 'Never Miss a Lead', price: 2000 },
    'grow-autopilot': { name: 'Grow on Autopilot', price: 4000 },
  };

  const addonItems = [
    { key: 'pages', name: 'Additional Pages', price: 200, suffix: '' },
    { key: 'content', name: 'Content Writing', price: 500, suffix: '' },
    { key: 'google', name: 'Google Business Profile', price: 300, suffix: '' },
    { key: 'social', name: 'Social Media Setup', price: 400, suffix: '' },
    { key: 'maintenance', name: 'Monthly Maintenance', price: 150, suffix: '/mo' },
  ];

  const basePrice = packages[selectedPackage].price;
  const addonsTotal = addonItems.reduce(
    (sum, item) => sum + (addons[item.key] ? item.price : 0),
    0
  );
  const total = basePrice + addonsTotal;
  const maintenanceSelected = addons.maintenance;
  const depositAmount = +(total * 0.5).toFixed(2);
  const selectedAddonKeys = addonItems
    .filter((item) => addons[item.key])
    .map((item) => item.key);
  const packageQuoteLinks = {
    'get-found': buildTrackedContactPath({
      package: 'get-found',
      lead_source: 'services_page',
      campaign: 'get_found_package',
    }),
    'never-miss': buildTrackedContactPath({
      package: 'never-miss',
      lead_source: 'services_page',
      campaign: 'never_miss_package',
    }),
    'grow-autopilot': buildTrackedContactPath({
      package: 'grow-autopilot',
      lead_source: 'services_page',
      campaign: 'grow_autopilot_package',
    }),
  };
  const midPageQuoteHref = buildTrackedContactPath({
    lead_source: 'services_page',
    campaign: 'services_midpage_cta',
  });
  const footerQuoteHref = buildTrackedContactPath({
    lead_source: 'services_page',
    campaign: 'services_footer_quote',
  });
  const footerQuestionHref = buildTrackedContactPath({
    lead_source: 'services_page',
    campaign: 'services_footer_question',
  });
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isDepositEmailValid = emailRegex.test(depositEmail.trim());

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const toggleAddon = (key) => {
    setAddons((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleDeposit = async () => {
    const sanitizedEmail = depositEmail.trim();
    if (!emailRegex.test(sanitizedEmail)) {
      setDepositError('Please enter a valid email so we can send the receipt.');
      return;
    }

    setDepositError('');
    setIsPaying(true);

    try {
      const response = await fetch('/.netlify/functions/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          package: selectedPackage,
          addons: selectedAddonKeys,
          customerEmail: sanitizedEmail,
          customerName: '',
        }),
      });

      if (!response.ok) {
        throw new Error('Checkout initiation failed.');
      }

      const { url } = await response.json();
      if (!url) {
        throw new Error('Checkout URL missing from response.');
      }

      window.location.href = url;
    } catch (err) {
      console.error('Deposit checkout failed', err);
      setDepositError('Unable to start the payment. Please try again in a few minutes.');
    } finally {
      setIsPaying(false);
    }
  };

  const buildQuoteUrl = () => {
    const selectedAddons = addonItems
      .filter((item) => addons[item.key])
      .map((item) => item.key)
      .join(',');
    return buildTrackedContactPath({
      package: selectedPackage,
      addons: selectedAddons,
      lead_source: 'services_page',
      campaign: 'pricing_calculator_quote',
    });
  };

  // Inject FAQ structured data
  useEffect(() => {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqData.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(faqSchema);
    script.id = 'faq-schema';
    document.head.appendChild(script);

    return () => {
      const existing = document.getElementById('faq-schema');
      if (existing) existing.remove();
    };
  }, []);

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
              <div className="pricing-card__price">$800 - $1,500</div>
              <p className="pricing-card__price-note">2-3 week delivery</p>
              <ul className="pricing-card__features">
                <li>3 pages (Home, Projects, Contact)</li>
                <li>Contact form with email notification</li>
                <li>Basic SEO (meta tags, sitemap)</li>
                <li>Mobile-responsive design</li>
                <li>User guide + content update guide</li>
                <li>1 round of design revisions</li>
                <li>30 days support</li>
              </ul>
              <Link to={packageQuoteLinks['get-found']} className="btn btn--outline">Get Started</Link>
            </div>

            {/* Tier 2 - Featured */}
            <div className="pricing-card pricing-card--featured reveal-up stagger-2">
              <span className="pricing-card__badge">MOST POPULAR</span>
              <h3 className="pricing-card__name">Never Miss a Lead</h3>
              <div className="pricing-card__price">$2,000 - $3,500</div>
              <p className="pricing-card__price-note">3-4 week delivery</p>
              <ul className="pricing-card__features">
                <li>4-5 pages (+ Services or About)</li>
                <li>Instant email + Slack alerts via Netlify functions</li>
                <li>Mailchimp tagging for nurture follow-ups</li>
                <li>Review request guidance and templates</li>
                <li>Google Business Profile setup</li>
                <li>Business strategy docs</li>
                <li>2 rounds of design revisions</li>
                <li>60 days support</li>
              </ul>
              <Link to={packageQuoteLinks['never-miss']} className="btn btn--primary">Get Started</Link>
            </div>

            {/* Tier 3 */}
            <div className="pricing-card reveal-up stagger-3">
              <h3 className="pricing-card__name">Grow on Autopilot</h3>
              <div className="pricing-card__price">$4,000 - $6,000</div>
              <p className="pricing-card__price-note">4-6 week delivery</p>
              <ul className="pricing-card__features">
                <li>6+ pages with service-specific landing pages</li>
                <li>Mailchimp tagging that feeds your own follow-up automations</li>
                <li>Review reminder templates and handoff checklist</li>
                <li>LocalBusiness schema + landing pages</li>
                <li>All docs + competitive analysis</li>
                <li>2 rounds + copy assistance</li>
                <li>90 days support + 1-hour training</li>
              </ul>
              <Link to={packageQuoteLinks['grow-autopilot']} className="btn btn--outline">Get Started</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mid-Page CTA ── */}
      <section className="section" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="section__header section__header--center">
            <span className="section__eyebrow">NOT SURE?</span>
            <h2 className="section__title">NOT SURE WHICH PACKAGE IS RIGHT?</h2>
            <p className="section__desc" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
              Let's figure it out together. A quick conversation is all it takes
              to find the best fit for your business.
            </p>
          </div>
          <Link to={midPageQuoteHref} className="btn btn--primary">Let's Talk</Link>
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
              <p className="svc-card__desc">$150 - $300 per page</p>
            </div>
            <div className="svc-card">
              <h3>Content Writing</h3>
              <p className="svc-card__desc">$150 - $300</p>
            </div>
            <div className="svc-card">
              <h3>Google Business Profile</h3>
              <p className="svc-card__desc">$200 - $350</p>
            </div>
            <div className="svc-card">
              <h3>Social Media Setup</h3>
              <p className="svc-card__desc">$150 - $250</p>
            </div>
            <div className="svc-card">
              <h3>Monthly Maintenance</h3>
              <p className="svc-card__desc">$100 - $200 / mo</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <div className="section__header section__header--center reveal-up">
            <span className="section__eyebrow">NC TRIAD FOCUS</span>
            <h2 className="section__title">START WITH THE TRADE OR CITY THAT FITS</h2>
            <p className="section__desc">
              These are the first local landing pages built for the initial SEO and
              outreach push. They give each trade and city a clearer entry point.
            </p>
          </div>

          <div className="svc-grid">
            {firstWaveLandingPages.map((page, index) => (
              <Link
                key={page.slug}
                to={page.route}
                className={`svc-card reveal-up stagger-${(index % 3) + 1}`}
              >
                <h3>{page.title}</h3>
                <p className="svc-card__desc">{page.subtitle}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section section--dark faq-section">
        <div className="container">
          <div className="section__header section__header--center reveal-up">
            <span className="section__eyebrow">FAQ</span>
            <h2 className="section__title">COMMON QUESTIONS</h2>
            <p className="section__desc">
              Straight answers to the questions I hear most from contractors.
            </p>
          </div>

          <div className="faq-list reveal-up" style={{ maxWidth: 720, margin: '0 auto' }}>
            {faqData.map((faq, i) => (
              <div
                key={i}
                className={`faq-item ${openFaq === i ? 'faq-item--open' : ''}`}
              >
                <button
                  className="faq-item__question"
                  onClick={() => toggleFaq(i)}
                  aria-expanded={openFaq === i}
                >
                  <span>{faq.question}</span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="faq-item__icon"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <div className="faq-item__answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing Calculator ── */}
      <section className="section">
        <div className="container">
          <div className="section__header section__header--center reveal-up">
            <span className="section__eyebrow">ESTIMATE</span>
            <h2 className="section__title">BUILD YOUR ESTIMATE</h2>
            <p className="section__desc">
              Pick a base package, add what you need, and see your estimated
              investment instantly.
            </p>
          </div>

          <div className="calculator reveal-up" style={{ maxWidth: 640, margin: '0 auto' }}>
            <h3 className="calculator__heading">Base Package</h3>
            <div className="calculator__packages">
              {Object.entries(packages).map(([key, pkg]) => (
                <label
                  key={key}
                  className={`calculator__option ${selectedPackage === key ? 'calculator__option--selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="package"
                    value={key}
                    checked={selectedPackage === key}
                    onChange={() => setSelectedPackage(key)}
                  />
                  <span className="calculator__option-name">{pkg.name}</span>
                  <span className="calculator__option-price">
                    ${pkg.price.toLocaleString()}
                  </span>
                </label>
              ))}
            </div>

            <h3 className="calculator__heading">Add-Ons</h3>
            <div className="calculator__addons">
              {addonItems.map((item) => (
                <label
                  key={item.key}
                  className={`calculator__option ${addons[item.key] ? 'calculator__option--selected' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={addons[item.key]}
                    onChange={() => toggleAddon(item.key)}
                  />
                  <span className="calculator__option-name">{item.name}</span>
                  <span className="calculator__option-price">
                    +${item.price.toLocaleString()}{item.suffix}
                  </span>
                </label>
              ))}
            </div>

            <div className="calculator__total">
              <div className="calculator__total-label">Estimated Total</div>
              <div className="calculator__total-price">
                ${total.toLocaleString()}
                {maintenanceSelected && <span className="calculator__total-note"> + $150/mo</span>}
              </div>
            </div>

            <div className="calculator__deposit-note" style={{ marginBottom: '1rem' }}>
              Deposits cover 50% of the estimate. Pay now and I'll follow up to lock your kickoff slot.
            </div>
            <div className="calculator__deposit-input" style={{ marginBottom: '0.75rem' }}>
              <label htmlFor="deposit-email" style={{ display: 'block', marginBottom: '0.35rem' }}>
                Email for payment receipt
              </label>
              <input
                id="deposit-email"
                type="email"
                value={depositEmail}
                onChange={(e) => setDepositEmail(e.target.value)}
                placeholder="you@example.com"
                className="calculator__input"
                style={{ width: '100%' }}
              />
            </div>
            {depositError && (
              <p className="form-error" style={{ marginBottom: '0.75rem' }}>
                {depositError}
              </p>
            )}
            <div className="calculator__ctas">
              <Link to={buildQuoteUrl()} className="btn btn--primary">
                Get Custom Quote
              </Link>
              <button
                type="button"
                className="btn btn--outline"
                onClick={handleDeposit}
                disabled={isPaying || !isDepositEmailValid}
              >
                {isPaying ? 'Redirecting...' : `Pay $${depositAmount.toLocaleString()} Deposit Now`}
              </button>
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
            <Link to={footerQuoteHref} className="btn btn--primary">Get a Free Quote</Link>
            <Link to={footerQuestionHref} className="btn btn--outline">Ask a Question</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ServicesPage;
