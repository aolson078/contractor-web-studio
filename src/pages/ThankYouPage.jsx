import { Link, useLocation } from 'react-router-dom';

function ThankYouPage() {
  const location = useLocation();
  const name = location.state?.name || '';

  return (
    <>
      <section className="section" style={{ paddingTop: '10rem' }}>
        <div className="container">
          <div className="section__header section__header--center">
            <span className="section__eyebrow">MESSAGE RECEIVED</span>
            <h1 className="section__title">
              {name ? `THANKS, ${name.toUpperCase()}!` : 'THANKS!'}
            </h1>
            <p className="section__desc" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
              Your message has been sent successfully. I'll review your inquiry and
              get back to you within 24 hours, usually sooner.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <div className="section__header section__header--center">
            <span className="section__eyebrow">WHAT HAPPENS NEXT</span>
            <h2 className="section__title">NEXT STEPS</h2>
          </div>

          <div className="process-grid" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="process-step">
              <div className="process-step__number">01</div>
              <h3>I REVIEW YOUR INFO</h3>
              <p>I'll look over everything you sent and start thinking about the best approach for your project.</p>
            </div>
            <div className="process-step">
              <div className="process-step__number">02</div>
              <h3>WE CONNECT</h3>
              <p>I'll reach out via email or phone to schedule a free consultation at a time that works for you.</p>
            </div>
            <div className="process-step">
              <div className="process-step__number">03</div>
              <h3>WE BUILD YOUR PLAN</h3>
              <p>Together we'll map out exactly what your website needs to start bringing in leads.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="section__header section__header--center">
            <span className="section__eyebrow">SCHEDULE A CALL</span>
            <h2 className="section__title">DON'T WANT TO WAIT?</h2>
            <p className="section__desc" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
              Book a free 15-minute call and let's get the conversation started right now.
            </p>
          </div>
          <div className="cta-btns">
            <a
              href="https://cal.com/contractor-web-studio/15min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary"
            >
              Book a Call Now
            </a>
            <Link to="/portfolio" className="btn btn--outline">
              View My Work
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default ThankYouPage;
