import { Link } from 'react-router-dom';

function AboutPage() {
  return (
    <>
      {/* ── Page Header ── */}
      <section className="section" style={{ paddingTop: '10rem' }}>
        <div className="container">
          <div className="section__header section__header--center reveal-up">
            <span className="section__eyebrow">ABOUT</span>
            <h1 className="section__title">WHY I BUILD WEBSITES FOR CONTRACTORS</h1>
            <p className="section__desc">
              Because great work deserves to be found.
            </p>
          </div>
        </div>
      </section>

      {/* ── Story Section ── */}
      <section className="section section--dark">
        <div className="container">
          <div className="case-study">
            <div className="case-study__content reveal-up">
              <p className="case-study__tag">MY STORY</p>
              <h2 className="case-study__title">THE SHORT VERSION</h2>
              <p className="case-study__desc">
                I got into web development because I saw a gap. Contractors do
                incredible work, but most of them are invisible online. Their
                competitors, the ones showing up on Google, aren't necessarily
                better. They just have a website.
              </p>
              <p className="case-study__desc">
                I'm based in Winston-Salem, NC, and I specialize in one thing:
                building websites that help contractors get found, capture leads,
                and grow their business. I keep my prices fair because I know
                what it's like starting out. And I use a proven system that lets
                me deliver fast without cutting corners.
              </p>
            </div>

            <div className="reveal-up stagger-1">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '360px',
                  background: 'var(--surface-raised)',
                  border: '1px solid var(--border-strong)',
                  borderRadius: 'var(--radius-lg)',
                  color: 'var(--text-muted)',
                  fontSize: '0.9rem',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.04em',
                  textAlign: 'center',
                  padding: '2rem',
                }}
              >
                Photo of Alex
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Contractors ── */}
      <section className="section">
        <div className="container">
          <div className="section__header section__header--center reveal-up">
            <span className="section__eyebrow">WHY ME</span>
            <h2 className="section__title">BUILT FOR CONTRACTORS</h2>
            <p className="section__desc">
              I don't build websites for everyone. I build them for people who
              work with their hands and need an online presence that works as
              hard as they do.
            </p>
          </div>

          <div className="svc-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {[
              {
                title: 'I Speak Your Language',
                desc: 'No tech jargon. No confusing proposals. I explain everything in plain English and make sure you understand exactly what you\'re getting before we start.',
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                ),
              },
              {
                title: 'Turnkey Delivery',
                desc: 'You get everything: the website, the hosting setup, the contact form, the documentation. I even write plain-English guides so you can manage it yourself.',
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                ),
              },
              {
                title: 'Local and Personal',
                desc: 'I\'m based in Winston-Salem, NC. You can pick up the phone and talk to the person who actually built your site. No offshore teams, no support tickets.',
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`svc-card reveal-up stagger-${i + 1}`}
              >
                <div className="svc-card__icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p className="svc-card__desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── My Process ── */}
      <section className="section section--dark">
        <div className="container">
          <div className="section__header section__header--center reveal-up">
            <span className="section__eyebrow">PROCESS</span>
            <h2 className="section__title">HOW IT WORKS</h2>
            <p className="section__desc">
              Four simple steps from first call to live website. No drawn-out
              timelines, no scope creep.
            </p>
          </div>

          <div className="process-grid">
            {[
              {
                num: '01',
                title: 'DISCOVERY CALL',
                desc: 'We talk about your business, your goals, and what you need. I learn your trade so I can build a site that actually represents what you do.',
              },
              {
                num: '02',
                title: 'DESIGN & BUILD',
                desc: 'I design and develop your site using a proven system. You see progress along the way and give feedback before anything goes live.',
              },
              {
                num: '03',
                title: 'REVIEW & LAUNCH',
                desc: 'We go through everything together. Once you\'re happy, I handle the deployment, hosting setup, and DNS configuration.',
              },
              {
                num: '04',
                title: 'HANDOVER & SUPPORT',
                desc: 'You get documentation, guides, and my phone number. I stick around to make sure everything runs smoothly.',
              },
            ].map((step, i) => (
              <div
                key={i}
                className={`process-step reveal-up stagger-${i + 1}`}
              >
                <p className="process-step__number">{step.num}</p>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="container reveal-up">
          <h2 className="cta-section__title">LET'S BUILD SOMETHING</h2>
          <p className="cta-section__desc">
            If you're a contractor who needs a website that actually works, I'd
            like to hear from you. Free consultation, no strings attached.
          </p>
          <div className="cta-btns">
            <Link to="/contact" className="btn btn--primary">
              Get a Free Quote
            </Link>
            <Link to="/portfolio" className="btn btn--outline">
              See My Work
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutPage;
