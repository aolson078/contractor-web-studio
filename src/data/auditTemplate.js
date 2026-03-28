/**
 * Teardown / Lead Conversion Audit Template
 *
 * This data structure drives the AuditPage component. To create a new
 * audit for a prospect, copy the sample entry below and fill in the
 * prospect-specific fields. Each audit is accessed at /audit/:slug.
 *
 * Fields marked (required) must be filled for every audit.
 * Fields marked (auto) are populated or defaulted by the component.
 */

const auditTemplate = {
  // ── Prospect Context ──
  slug: '',                        // (required) URL-safe identifier, e.g. "acme-masonry-apr-2026"
  companyName: '',                 // (required) prospect business name
  contactName: '',                 // first name of the prospect
  trade: '',                       // masonry-hardscaping | deck-fence | concrete | other
  city: '',                        // winston-salem | greensboro | high-point
  website: '',                     // current website URL
  dateCreated: '',                 // ISO date string

  // ── Findings ──
  // List 3-5 specific, observable conversion blockers.
  // Each finding has a title, description, and severity (high | medium | low).
  findings: [
    // { title: '', description: '', severity: 'high' },
  ],

  // ── Screenshots ──
  // Optional paths to screenshots stored in /public/audits/<slug>/
  screenshots: [
    // { src: '', alt: '', caption: '' },
  ],

  // ── Recommendations ──
  // Prioritized list of fixes. Keep to 3-5 items.
  recommendations: [
    // { title: '', description: '', priority: 1 },
  ],

  // ── CTA ──
  // The audit always ends with a CTA into a call or quote.
  ctaHeadline: 'Want to talk through these fixes?',
  ctaDescription: 'I can walk you through exactly what I would change and why. No pressure, no jargon.',
};

// ── Sample Audit ──
// This is a working example you can use for demos and outbound.
const sampleAudit = {
  slug: 'sample-teardown',
  companyName: 'Sample Contractor Co.',
  contactName: 'Owner',
  trade: 'masonry-hardscaping',
  city: 'winston-salem',
  website: 'https://example.com',
  dateCreated: '2026-03-28',

  findings: [
    {
      title: 'No clear call-to-action above the fold',
      description:
        'The homepage loads with a stock photo and company history. A visitor has to scroll past 3 sections before finding a phone number or contact form. Most mobile visitors leave within 5 seconds if they do not see an obvious next step.',
      severity: 'high',
    },
    {
      title: 'Missing or generic service pages',
      description:
        'All services are listed on a single page with one sentence each. When someone searches "masonry repair Winston-Salem" and lands here, they cannot confirm this business handles their specific job. This hurts both trust and local SEO.',
      severity: 'high',
    },
    {
      title: 'No project photos or proof of work',
      description:
        'The site has no gallery, no project showcases, and no before/after images. For a trade where visual proof is the strongest trust signal, this is the biggest gap between how the business looks online and how it performs in person.',
      severity: 'high',
    },
    {
      title: 'Poor mobile experience',
      description:
        'The navigation breaks on smaller screens, text is hard to read without zooming, and the contact form requires horizontal scrolling. Over 60% of local searches happen on mobile.',
      severity: 'medium',
    },
    {
      title: 'No Google Business Profile link or reviews',
      description:
        'There is no connection between the website and the Google Business Profile. Reviews and star ratings are not displayed on the site, missing an easy trust signal that reassures visitors.',
      severity: 'medium',
    },
  ],

  screenshots: [],

  recommendations: [
    {
      title: 'Add a clear CTA above the fold',
      description:
        'Put "Get a Free Quote" and a phone number in the hero section. Make it impossible to miss on mobile. This single change can dramatically improve contact rates.',
      priority: 1,
    },
    {
      title: 'Build dedicated service pages',
      description:
        'Create separate pages for each core service (e.g. patios, retaining walls, masonry repair). Each page should have its own CTA, relevant photos, and city-specific language for local SEO.',
      priority: 2,
    },
    {
      title: 'Add project showcases with photos',
      description:
        'Show 5-10 completed projects with before/after photos, brief descriptions, and location. This is the strongest trust builder for trades businesses.',
      priority: 3,
    },
  ],

  ctaHeadline: 'Want to talk through these fixes?',
  ctaDescription:
    'I can walk you through exactly what I would change and why. 15 minutes, no pressure, no jargon.',
};

/**
 * Audits registry. Add new audits here as they are created.
 * The AuditPage component looks up audits by slug.
 */
const audits = [sampleAudit];

export const auditsBySlug = Object.fromEntries(
  audits.map((audit) => [audit.slug, audit])
);

export { auditTemplate };
export default audits;
