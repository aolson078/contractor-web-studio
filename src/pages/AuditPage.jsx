import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auditsBySlug } from '../data/auditTemplate';
import { buildTrackedContactPath } from '../utils/leadAttribution';

const SEVERITY_LABELS = {
  high: 'High Impact',
  medium: 'Medium Impact',
  low: 'Low Impact',
};

const formatLabel = (value) => {
  if (!value) return '';
  return value
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
};

function AuditPage({ slug }) {
  const audit = auditsBySlug[slug];

  useEffect(() => {
    if (!audit) return;
    document.title = `Website Teardown: ${audit.companyName} | Contractor Web Studio`;
  }, [audit]);

  if (!audit) {
    return (
      <section className="section" style={{ paddingTop: '10rem', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', marginBottom: '1.5rem' }}>
            Audit Not Found
          </h1>
          <p className="section__desc" style={{ margin: '0 auto 2rem' }}>
            This teardown does not exist or may have been removed.
          </p>
          <Link to="/" className="btn btn--primary">Back to Home</Link>
        </div>
      </section>
    );
  }

  const quoteHref = buildTrackedContactPath({
    lead_source: 'audit',
    campaign: `teardown_${audit.slug}`,
    trade: audit.trade,
    city: audit.city,
  });

  const highCount = audit.findings.filter((f) => f.severity === 'high').length;
  const mediumCount = audit.findings.filter((f) => f.severity === 'medium').length;

  return (
    <>
      {/* ── Header ── */}
      <section className="section" style={{ paddingTop: '10rem' }}>
        <div className="container">
          <div className="section__header section__header--center reveal-up">
            <span className="section__eyebrow">WEBSITE TEARDOWN</span>
            <h1 className="section__title">{audit.companyName}</h1>
            <p className="section__desc">
              {audit.contactName ? `${audit.contactName}, here` : 'Here'} are the
              conversion blockers I found on your current site, and the fixes I
              would make first.
            </p>
          </div>

          {/* Context tags */}
          <div className="cta-btns reveal-up" style={{ justifyContent: 'center', gap: '0.75rem' }}>
            {audit.trade && (
              <span className="admin-table__tag">{formatLabel(audit.trade)}</span>
            )}
            {audit.city && (
              <span className="admin-table__tag">{formatLabel(audit.city)}</span>
            )}
            {audit.website && (
              <a
                href={audit.website}
                target="_blank"
                rel="noopener noreferrer"
                className="admin-table__tag"
                style={{ textDecoration: 'none' }}
              >
                {audit.website.replace(/^https?:\/\//, '')}
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ── Severity Summary ── */}
      <section className="section section--dark" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <div className="container">
          <div className="audit-summary reveal-up">
            <div className="audit-summary__card">
              <span className="audit-summary__number">{audit.findings.length}</span>
              <span className="audit-summary__label">Issues Found</span>
            </div>
            <div className="audit-summary__card">
              <span className="audit-summary__number audit-summary__number--high">{highCount}</span>
              <span className="audit-summary__label">High Impact</span>
            </div>
            <div className="audit-summary__card">
              <span className="audit-summary__number">{mediumCount}</span>
              <span className="audit-summary__label">Medium Impact</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Findings ── */}
      <section className="section">
        <div className="container">
          <div className="section__header reveal-up">
            <span className="section__eyebrow">FINDINGS</span>
            <h2 className="section__title">WHAT I FOUND ON YOUR SITE</h2>
          </div>

          <div className="audit-findings">
            {audit.findings.map((finding, i) => (
              <div key={i} className={`audit-finding reveal-up stagger-${(i % 3) + 1}`}>
                <div className="audit-finding__header">
                  <span className="audit-finding__number">{String(i + 1).padStart(2, '0')}</span>
                  <span className={`audit-finding__severity audit-finding__severity--${finding.severity}`}>
                    {SEVERITY_LABELS[finding.severity]}
                  </span>
                </div>
                <h3 className="audit-finding__title">{finding.title}</h3>
                <p className="audit-finding__desc">{finding.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Screenshots ── */}
      {audit.screenshots.length > 0 && (
        <section className="section section--dark">
          <div className="container">
            <div className="section__header section__header--center reveal-up">
              <span className="section__eyebrow">EVIDENCE</span>
              <h2 className="section__title">SCREENSHOTS</h2>
            </div>
            <div className="screenshot-grid screenshot-grid--wide">
              {audit.screenshots.map((shot, i) => (
                <div key={i} className={`screenshot-card reveal-up stagger-${(i % 2) + 1}`}>
                  <img src={shot.src} alt={shot.alt} loading="lazy" />
                  {shot.caption && (
                    <p className="screenshot-card__label">{shot.caption}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Recommendations ── */}
      <section className="section section--dark">
        <div className="container">
          <div className="section__header reveal-up">
            <span className="section__eyebrow">RECOMMENDATIONS</span>
            <h2 className="section__title">WHAT I WOULD FIX FIRST</h2>
          </div>

          <div className="process-grid">
            {audit.recommendations.map((rec) => (
              <div key={rec.priority} className={`process-step reveal-up stagger-${rec.priority}`}>
                <div className="process-step__number">{String(rec.priority).padStart(2, '0')}</div>
                <h3>{rec.title.toUpperCase()}</h3>
                <p>{rec.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="container reveal-up">
          <h2 className="cta-section__title">{audit.ctaHeadline.toUpperCase()}</h2>
          <p className="cta-section__desc">{audit.ctaDescription}</p>
          <div className="cta-btns">
            <Link to={quoteHref} className="btn btn--primary">
              Get a Free Quote
            </Link>
            <a
              href="https://cal.com/contractor-web-studio/15min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--outline"
            >
              Book a 15-Min Call
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default AuditPage;
