import { NavLink, Route, Routes, useLocation, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import PortfolioPage from './pages/PortfolioPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';

// Floating Action Button Component
const FloatingActionButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Don't show FAB on contact page
  if (location.pathname === '/contact') {
    return null;
  }

  return (
    <Link
      to="/contact"
      className="fab"
      style={{
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
      aria-label="Get a Free Quote"
    >
      <span className="fab-tooltip">Get a Free Quote</span>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    </Link>
  );
};

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Handle header scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Close menu and scroll to top on route change
  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Initialize scroll reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-scale').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  return (
    <div className="site-shell">
      <header className={`top-bar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container top-bar__inner">
          <NavLink to="/" className="brand">
            <div className="brand__icon">A</div>
            <div className="brand__text">
              <p className="brand__name">Alex Olson</p>
              <p className="brand__tag">Contractor Websites</p>
            </div>
          </NavLink>
          <button
            className={`hamburger ${menuOpen ? 'is-active' : ''}`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className="hamburger__line" />
            <span className="hamburger__line" />
            <span className="hamburger__line" />
          </button>
          <nav aria-label="Main navigation" className={`main-nav ${menuOpen ? 'is-open' : ''}`}>
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/services">Services</NavLink>
            <NavLink to="/portfolio">Portfolio</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </nav>
        </div>
      </header>

      <main className="page-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={
            <section className="section" style={{ paddingTop: '10rem', textAlign: 'center' }}>
              <div className="container">
                <h1 style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', marginBottom: '1.5rem' }}>Page Not Found</h1>
                <p className="section__desc" style={{ margin: '0 auto 2rem' }}>The page you're looking for doesn't exist.</p>
                <Link to="/" className="btn btn--primary">Back to Home</Link>
              </div>
            </section>
          } />
        </Routes>
      </main>

      <FloatingActionButton />

      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer__brand">
              <h4 className="footer__brand-name">Alex Olson</h4>
              <p className="footer__brand-desc">
                Building fast, professional websites for contractors and
                construction companies. Your online presence should work as
                hard as you do.
              </p>
            </div>
            <div className="footer__column">
              <h4 className="footer__column-title">Pages</h4>
              <ul className="footer__links">
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/services">Services</NavLink></li>
                <li><NavLink to="/portfolio">Portfolio</NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
                <li><NavLink to="/contact">Contact</NavLink></li>
                <li><NavLink to="/privacy">Privacy</NavLink></li>
                <li><NavLink to="/terms">Terms</NavLink></li>
              </ul>
            </div>
            <div className="footer__column">
              <h4 className="footer__column-title">Contact</h4>
              <ul className="footer__links">
                <li>(555) 123-4567</li>
                <li>alex@contractorwebsites.com</li>
                <li>Minneapolis, MN</li>
              </ul>
            </div>
          </div>
          <div className="footer__bottom">
            <p className="footer__copyright">
              &copy; {new Date().getFullYear()} Alex Olson &middot; All rights reserved.
              {' · '}
              <NavLink to="/privacy" style={{ color: 'inherit', textDecoration: 'underline' }}>
                Privacy Policy
              </NavLink>
              {' · '}
              <NavLink to="/terms" style={{ color: 'inherit', textDecoration: 'underline' }}>
                Terms of Service
              </NavLink>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
