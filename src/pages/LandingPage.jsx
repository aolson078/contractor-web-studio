import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import landingPages, { landingPagesBySlug } from '../data/landingPages';
import { buildTrackedContactPath } from '../utils/leadAttribution';

function LandingPage({ slug }) {
  const [openFaq, setOpenFaq] = useState(null);
  const page = landingPagesBySlug[slug];

  const relatedPages = useMemo(
    () => landingPages.filter((item) => page?.relatedSlugs?.includes(item.slug)),
    [page]
  );

  useEffect(() => {
    if (!page) return;

    document.title = page.metaTitle;

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
  }, [page]);

  if (!page) {
    return null;
  }

  const quoteHref = buildTrackedContactPath({
    lead_source: page.leadSource,
    campaign: page.campaign,
    trade: page.trade,
    city: page.city,
  });

  const callHref = buildTrackedContactPath({
    lead_source: page.leadSource,
    campaign: `${page.campaign}_call`,
    trade: page.trade,
    city: page.city,
  });

  return (
    <>
      <section className="section" style={{ paddingTop: '10rem' }}>
        <div className="container">
          <div className="section__header section__header--center reveal-up">
            <span className="section__eyebrow">{page.eyebrow}</span>
            <h1 className="section__title">{page.title}</h1>
            <p className="section__desc">{page.subtitle}</p>
          </div>
          <div className="cta-btns reveal-up">
            <Link to={quoteHref} className="btn btn--primary">
              Get a Free Quote
            </Link>
            <Link to="/portfolio" className="btn btn--outline">
              See My Work
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <div className="section__header reveal-up">
            <span className="section__eyebrow">THE PROBLEM</span>
            <h2 className="section__title">{page.problemTitle}</h2>
            <p className="section__desc">{page.problemCopy}</p>
          </div>
          <div className="svc-grid">
            {page.issues.map((issue, index) => (
              <div key={issue} className={`svc-card reveal-up stagger-${(index % 3) + 1}`}>
                <h3>Issue {index + 1}</h3>
                <p className="svc-card__desc">{issue}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__header section__header--center reveal-up">
            <span className="section__eyebrow">WHAT A BETTER SITE DOES</span>
            <h2 className="section__title">{page.promiseTitle}</h2>
          </div>
          <div className="svc-grid">
            {page.deliverables.map((item, index) => (
              <div key={item} className={`svc-card reveal-up stagger-${(index % 3) + 1}`}>
                <h3>Priority {index + 1}</h3>
                <p className="svc-card__desc">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <div className="case-study">
            <div className="reveal-up">
              <img
                src="/portfolio/wolf-lake/Landing Page.png"
                alt="Wolf Lake Masonry website preview"
                className="case-study__image"
                loading="lazy"
              />
            </div>

            <div className="case-study__content reveal-up">
              <p className="case-study__tag">{page.proofTag}</p>
              <h2 className="case-study__title">{page.proofTitle}</h2>
              <p className="case-study__desc">{page.proofDescription}</p>
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
              </div>
              <Link to="/portfolio" className="btn btn--primary">
                See My Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--dark faq-section">
        <div className="container">
          <div className="section__header section__header--center reveal-up">
            <span className="section__eyebrow">FAQ</span>
            <h2 className="section__title">COMMON QUESTIONS</h2>
          </div>

          <div className="faq-list reveal-up" style={{ maxWidth: 720, margin: '0 auto' }}>
            {page.faqs.map((faq, index) => (
              <div
                key={faq.question}
                className={`faq-item ${openFaq === index ? 'faq-item--open' : ''}`}
              >
                <button
                  className="faq-item__question"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  aria-expanded={openFaq === index}
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

      <section className="section">
        <div className="container">
          <div className="section__header section__header--center reveal-up">
            <span className="section__eyebrow">RELATED PAGES</span>
            <h2 className="section__title">KEEP EXPLORING</h2>
          </div>
          <div className="svc-grid">
            {relatedPages.map((relatedPage, index) => (
              <Link
                key={relatedPage.slug}
                to={relatedPage.route}
                className={`svc-card reveal-up stagger-${(index % 3) + 1}`}
              >
                <h3>{relatedPage.title}</h3>
                <p className="svc-card__desc">{relatedPage.subtitle}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container reveal-up">
          <h2 className="cta-section__title">READY TO FIX THE WEBSITE GAPS?</h2>
          <p className="cta-section__desc">
            If the website is making the business look weaker than it really is, start with
            a quick conversation and a clearer plan.
          </p>
          <div className="cta-btns">
            <Link to={quoteHref} className="btn btn--primary">
              Get a Free Quote
            </Link>
            <Link to={callHref} className="btn btn--outline">
              Book a 15-Min Call
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default LandingPage;
