const variants = {
  contractor: {
    hero: 'linear-gradient(135deg, var(--accent) 0%, #c0612e 100%)',
    nav: 'var(--surface)',
    body: 'var(--bg-base)',
    sidebar: 'var(--surface-raised)',
    accent: 'var(--accent)',
  },
  masonry: {
    hero: 'linear-gradient(135deg, #8B7355 0%, #6B5B45 100%)',
    nav: '#3D3226',
    body: '#2A241E',
    sidebar: '#3D3226',
    accent: '#C4A574',
  },
  decking: {
    hero: 'linear-gradient(135deg, #6B8F71 0%, #4A6B4F 100%)',
    nav: '#2D3E2F',
    body: '#1E2B1F',
    sidebar: '#2D3E2F',
    accent: '#8FBF96',
  },
  roofing: {
    hero: 'linear-gradient(135deg, #5B7FA5 0%, #3D5A7A 100%)',
    nav: '#2A3A4D',
    body: '#1C2835',
    sidebar: '#2A3A4D',
    accent: '#7FAED4',
  },
  plumbing: {
    hero: 'linear-gradient(135deg, #4A90A4 0%, #2E6B7F 100%)',
    nav: '#1E3A45',
    body: '#162D35',
    sidebar: '#1E3A45',
    accent: '#5BC0DE',
  },
};

function MockupBrowser({ variant = 'contractor' }) {
  const theme = variants[variant] || variants.contractor;

  return (
    <div className="mockup-browser">
      {/* Chrome bar */}
      <div className="mockup-browser__chrome">
        <div className="mockup-browser__dots">
          <span /><span /><span />
        </div>
        <div className="mockup-browser__url" />
      </div>

      {/* Site content */}
      <div className="mockup-browser__content">
        {/* Nav bar */}
        <div
          className="mockup-browser__nav"
          style={{ background: theme.nav }}
        >
          <div className="mockup-browser__nav-logo" style={{ background: theme.accent }} />
          <div className="mockup-browser__nav-links">
            <span /><span /><span />
          </div>
        </div>

        {/* Hero band */}
        <div
          className="mockup-browser__hero"
          style={{ background: theme.hero }}
        >
          <div className="mockup-browser__hero-title" />
          <div className="mockup-browser__hero-subtitle" />
          <div className="mockup-browser__hero-btn" style={{ background: theme.accent }} />
        </div>

        {/* Body content */}
        <div
          className="mockup-browser__body"
          style={{ background: theme.body }}
        >
          <div className="mockup-browser__cards">
            <div className="mockup-browser__card" style={{ borderTopColor: theme.accent }} />
            <div className="mockup-browser__card" style={{ borderTopColor: theme.accent }} />
            <div className="mockup-browser__card" style={{ borderTopColor: theme.accent }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MockupBrowser;
