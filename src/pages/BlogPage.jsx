import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import blogPosts from '../data/blogPosts';

function BlogPage() {
  useEffect(() => {
    document.title = 'Blog | Contractor Web Studio';
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

  const formatDate = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      {/* Page Header */}
      <section className="section section--page-top">
        <div className="container">
          <div className="section__header section__header--center reveal-up">
            <span className="section__eyebrow">BLOG</span>
            <h1 className="section__title">INSIGHTS FOR CONTRACTORS</h1>
            <p className="section__desc">
              Practical advice on websites, online marketing, and growing your
              contracting business. No fluff, no jargon.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="section section--dark">
        <div className="container">
          <div className="blog-grid">
            {blogPosts.map((post, i) => (
              <article
                key={post.slug}
                className={`blog-card reveal-up stagger-${(i % 3) + 1}`}
              >
                <div className="blog-card__meta">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </div>
                <h2 className="blog-card__title">{post.title}</h2>
                <p className="blog-card__excerpt">{post.excerpt}</p>
                <Link to={`/blog/${post.slug}`} className="blog-card__link">
                  Read More
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container reveal-up">
          <h2 className="cta-section__title">READY TO GET STARTED?</h2>
          <p className="cta-section__desc">
            Stop losing jobs to competitors with better websites. Let's build
            yours.
          </p>
          <div className="cta-btns">
            <Link to="/contact" className="btn btn--primary">
              Get a Free Quote
            </Link>
            <Link to="/services" className="btn btn--outline">
              View Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default BlogPage;
