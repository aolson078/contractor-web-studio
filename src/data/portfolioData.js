const portfolioData = [
  {
    slug: 'wolf-lake-masonry',
    name: 'Wolf Lake Masonry Inc.',
    trade: 'Masonry & Hardscaping',
    location: 'Winston-Salem, NC',
    liveUrl: 'https://www.wolflakemasonryinc.com',
    description:
      'Wolf Lake Masonry Inc. is a family-owned masonry and hardscaping business serving Winston-Salem since 1992. They needed a modern web presence to showcase their craftsmanship and generate quote requests. I designed and built the site from scratch using React with a custom "Timberstone" CSS design system, a dark forest/gold/stone palette that reinforces their rugged reliability. The site features scroll-triggered animated counters, an auto-rotating testimonial carousel, and Netlify Forms for lead capture. Since launch, it has become their primary source of new project inquiries.',
    features: [
      '4-page React website (Home, Projects, Contact, Privacy)',
      'Custom "Timberstone" design system with forest/gold/stone palette',
      'Scroll-triggered animated counters (experience, BBB rating, projects)',
      'Auto-rotating testimonial carousel with crossfade transitions',
      'Netlify Forms with honeypot spam filtering',
      'Image optimization pipeline (Sharp + WebP/AVIF output)',
      'SEO essentials (Open Graph, Twitter Cards, sitemap, semantic HTML)',
      'Security headers via Netlify config',
    ],
    stats: [
      { number: '4', label: 'Pages' },
      { number: '7', label: 'Project Showcases' },
      { number: 'A+', label: 'BBB Rating' },
      { number: '1992', label: 'Est.' },
    ],
    techTags: ['React 18', 'Vite 5', 'Netlify Forms', 'Sharp', 'GA4'],
    testimonial: {
      quote:
        'Alex built us a site that actually looks like our work. Solid, clean, and professional. We started getting calls the first week it went live.',
      attribution: 'Wolf Lake Masonry',
    },
    mockupVariant: 'masonry',
    screenshots: {
      landing: '/portfolio/wolf-lake/Landing Page.png',
      home2: '/portfolio/wolf-lake/HomePage2.png',
      home3: '/portfolio/wolf-lake/HomePage3.png',
      home4: '/portfolio/wolf-lake/HomePage4.png',
      projects1: '/portfolio/wolf-lake/ProjectPage1.png',
      projects2: '/portfolio/wolf-lake/ProjectPage2.png',
      contact: '/portfolio/wolf-lake/ContactPage.png',
    },
  },
  {
    slug: 'studio-interiors',
    name: 'Studio Interiors',
    trade: 'Interior Design Studio',
    location: 'Winston-Salem, NC',
    description:
      'Studio Interiors needed a polished website and client portal that could showcase portfolio work, book consultations, and keep active design projects organized in one place. I designed and built the site with a warm editorial look, streamlined inquiry flows, and private client-facing project updates.',
    features: [
      'Next.js website with services, portfolio, reviews, and contact pages',
      'Consultation booking flow with Calendly integration',
      'Magic-link client portal for milestones, approvals, and status updates',
      'Admin dashboard for inquiries, bookings, blog posts, and projects',
      'Multi-step lead form with email confirmations',
      'Responsive mobile-first layout with custom branding',
    ],
    stats: [
      { number: '10+', label: 'Public Pages' },
      { number: '8', label: 'Admin Views' },
      { number: '3', label: 'Portal Pages' },
      { number: '10', label: 'API Routes' },
    ],
    techTags: ['Next.js 15', 'React 19', 'Tailwind CSS', 'Prisma', 'PostgreSQL'],
    cardImage: '/portfolio/studio-interiors/Home.png',
    cardImageAlt: 'Studio Interiors website homepage',
  },
  {
    slug: 'precision-deck-fence',
    name: 'Precision Deck & Fence',
    trade: 'Deck Builder',
    location: 'Greensboro, NC',
    description:
      'Precision Deck & Fence was relying entirely on word of mouth and a Facebook page to generate leads. I built them a 4-page site with a project gallery, service area pages, and an instant-notification contact form that sends leads straight to their inbox and Slack/Discord.',
    features: [
      '4-page React website (Home, Services, Gallery, Contact)',
      'Project photo gallery with lightbox',
      'Instant email + Slack/Discord lead alerts',
      'Service area pages for local SEO',
      'Google Business Profile optimization',
      'Mobile-first responsive design',
    ],
    stats: [
      { number: '4', label: 'Pages' },
      { number: '3 WK', label: 'Build Time' },
      { number: '100%', label: 'Mobile-First' },
      { number: 'Netlify', label: 'Hosting' },
    ],
    techTags: ['React', 'Vite', 'Netlify', 'Google Business'],
    testimonial: {
      quote:
        'We went from zero online presence to getting 3-4 quote requests a week. The site pays for itself every single month.',
      attribution: 'Precision Deck & Fence',
    },
    mockupVariant: 'decking',
  },
  {
    slug: 'summit-roofing-co',
    name: 'Summit Roofing Co.',
    trade: 'Roofing Contractor',
    location: 'High Point, NC',
    description:
      'Summit Roofing needed a site that could handle storm season surges and convert emergency searches into booked jobs. I built a 5-page site with service-specific landing pages, an emergency contact banner, and guided follow-up sequences to close more leads.',
    features: [
      '5-page React website with service landing pages',
      'Emergency contact banner with click-to-call',
      'Guided follow-up email sequences',
      'Before/after project showcase',
      'Review request reminders',
      'LocalBusiness schema + city landing pages',
    ],
    stats: [
      { number: '5', label: 'Pages' },
      { number: '4 WK', label: 'Build Time' },
      { number: '100%', label: 'Mobile-First' },
      { number: 'Netlify', label: 'Hosting' },
    ],
    techTags: ['React', 'Vite', 'Netlify', 'Mailchimp'],
    testimonial: {
      quote:
        'After a big storm, our phone was ringing off the hook. The website handled the traffic perfectly and we booked more jobs that week than the whole previous month.',
      attribution: 'Summit Roofing Co.',
    },
    mockupVariant: 'roofing',
  },
];

export default portfolioData;
