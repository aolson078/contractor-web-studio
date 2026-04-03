import { Link } from 'react-router-dom';

function PaymentSuccessPage() {
  return (
    <>
      <section className="section section--page-top">
        <div className="container">
          <div className="section__header section__header--center">
            <span className="section__eyebrow">PAYMENT CONFIRMED</span>
            <h1 className="section__title">PAYMENT RECEIVED!</h1>
            <p className="section__desc" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
              Thank you for your purchase! Your payment has been processed successfully.
              I'll be reaching out within 24 hours to get your project started.
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

          <div className="process-grid" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="process-step">
              <div className="process-step__number">01</div>
              <h3>CONFIRMATION EMAIL</h3>
              <p>Check your inbox for a confirmation email with your receipt and project details.</p>
            </div>
            <div className="process-step">
              <div className="process-step__number">02</div>
              <h3>KICKOFF CALL</h3>
              <p>I'll reach out within 24 hours to schedule our kickoff call and gather your requirements.</p>
            </div>
            <div className="process-step">
              <div className="process-step__number">03</div>
              <h3>CONTENT GATHERING</h3>
              <p>We'll collect your photos, copy, branding, and everything needed for your site.</p>
            </div>
            <div className="process-step">
              <div className="process-step__number">04</div>
              <h3>BUILD & LAUNCH</h3>
              <p>I'll build your site with regular check-ins, then we review, revise, and go live!</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="section__header section__header--center">
            <span className="section__eyebrow">GET STARTED</span>
            <h2 className="section__title">READY TO KICK THINGS OFF?</h2>
            <p className="section__desc" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
              Book your kickoff call now so we can hit the ground running.
            </p>
          </div>
          <div className="cta-btns">
            <a
              href="https://cal.com/contractor-web-studio/15min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary"
            >
              Schedule Kickoff Call
            </a>
            <Link to="/" className="btn btn--outline">
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default PaymentSuccessPage;
