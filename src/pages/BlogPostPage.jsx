import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import blogPosts from '../data/blogPosts';
import { buildTrackedContactPath } from '../utils/leadAttribution';

function BlogPostPage() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

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
  }, [slug]);

  if (!post) {
    return (
      <section className="section" style={{ paddingTop: '10rem', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', marginBottom: '1.5rem' }}>
            Post Not Found
          </h1>
          <p className="section__desc" style={{ margin: '0 auto 2rem' }}>
            The blog post you're looking for doesn't exist.
          </p>
          <Link to="/blog" className="btn btn--primary">
            Back to Blog
          </Link>
        </div>
      </section>
    );
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Split content into paragraphs
  const paragraphs = post.content.split('\n\n').filter((p) => p.trim());

  return (
    <>
      {/* Post Header */}
      <section className="section" style={{ paddingTop: '10rem' }}>
        <div className="container container--narrow">
          <div className="reveal-up">
            <Link to="/blog" className="blog-post__back">
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
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Back to Blog
            </Link>
            <time className="blog-post__date" dateTime={post.date}>
              {formatDate(post.date)}
            </time>
            <h1 className="blog-post__title">{post.title}</h1>
          </div>
        </div>
      </section>

      {/* Post Content */}
      <section className="section section--dark" style={{ paddingTop: 0 }}>
        <div className="container container--narrow">
          <article className="blog-post reveal-up">
            {paragraphs.map((para, i) => {
              const trimmed = para.trim();
              // Check if it looks like a heading (short line, no period at end)
              if (
                trimmed.length < 80 &&
                !trimmed.endsWith('.') &&
                !trimmed.endsWith('"') &&
                !trimmed.startsWith('"')
              ) {
                return (
                  <h2 key={i} className="blog-post__subheading">
                    {trimmed}
                  </h2>
                );
              }
              return <p key={i}>{trimmed}</p>;
            })}
          </article>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container reveal-up">
          <h2 className="cta-section__title">READY TO GET YOUR WEBSITE BUILT?</h2>
          <p className="cta-section__desc">
            Let's talk about what a professional website can do for your
            contracting business.
          </p>
          <div className="cta-btns">
            <Link to={buildTrackedContactPath({ lead_source: 'blog', campaign: `blog_${slug}` })} className="btn btn--primary">
              Get a Free Quote
            </Link>
            <a href="https://cal.com/contractor-web-studio/15min" target="_blank" rel="noopener noreferrer" className="btn btn--outline">
              Book a 15-Min Call
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default BlogPostPage;
