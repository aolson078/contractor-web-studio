function PrivacyPage() {
  return (
    <main className="legal-content">
      <div className="container container--narrow section">
        <h1>Privacy Policy</h1>
        <p>Last updated: March 2026</p>

        <h2>Information We Collect</h2>
        <p>
          When you submit a form on our website, we collect the following
          information:
        </p>
        <ul>
          <li>Name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Business name</li>
          <li>Message content</li>
        </ul>
        <p>
          We only collect information that you voluntarily provide through our
          contact form. We do not collect data automatically beyond standard web
          server logs.
        </p>

        <h2>How We Use Your Information</h2>
        <p>The information you provide is used to:</p>
        <ul>
          <li>Respond to your inquiries and consultation requests</li>
          <li>Provide website development services you have requested</li>
          <li>Communicate with you about your project</li>
          <li>Send follow-up information relevant to your inquiry</li>
        </ul>
        <p>
          We do not sell, rent, or share your personal information with third
          parties for marketing purposes.
        </p>

        <h2>Data Protection</h2>
        <p>
          This website is hosted on Netlify. All form submissions are encrypted
          in transit using HTTPS/TLS. Your data is stored securely on Netlify's
          servers. We take reasonable precautions to protect your personal
          information from unauthorized access, use, or disclosure.
        </p>

        <h2>Third-Party Services</h2>
        <p>Our website may use the following third-party services:</p>
        <ul>
          <li>
            <strong>Netlify</strong> - Website hosting and form submission
            processing. Netlify's privacy policy applies to data processed
            through their platform.
          </li>
          <li>
            <strong>Plausible Analytics</strong> - We use Plausible Analytics, a
            privacy-friendly, cookie-free analytics tool, to understand how
            visitors interact with our website. Plausible does not use cookies,
            does not collect personal data, and is fully compliant with GDPR,
            CCPA, and PECR. All data is aggregated and no individual visitors
            can be identified.
          </li>
        </ul>

        <h2>Your Rights</h2>
        <p>
          You have the right to request access to, correction of, or deletion
          of your personal information. To exercise these rights, please contact
          us using the information below.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this privacy policy from time to time. Any changes will
          be posted on this page with an updated revision date.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have questions about this privacy policy or how your data is
          handled, please contact us at{' '}
          <a href="mailto:aolson078@gmail.com" style={{ color: 'var(--accent)' }}>
            aolson078@gmail.com
          </a>.
        </p>
      </div>
    </main>
  );
}

export default PrivacyPage;
