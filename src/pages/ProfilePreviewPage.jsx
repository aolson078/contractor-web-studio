const Design1 = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%">
    <defs>
      <linearGradient id="bg1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#1B2A4A"/>
        <stop offset="100%" stopColor="#0F1623"/>
      </linearGradient>
      <linearGradient id="accent1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#F09A64"/>
        <stop offset="100%" stopColor="#E87C3E"/>
      </linearGradient>
    </defs>
    <circle cx="256" cy="256" r="256" fill="url(#bg1)"/>
    <g stroke="#223357" strokeWidth="0.5" opacity="0.4">
      <line x1="128" y1="80" x2="128" y2="432"/>
      <line x1="256" y1="80" x2="256" y2="432"/>
      <line x1="384" y1="80" x2="384" y2="432"/>
      <line x1="80" y1="176" x2="432" y2="176"/>
      <line x1="80" y1="296" x2="432" y2="296"/>
    </g>
    <polygon points="256,110 370,210 142,210" fill="url(#accent1)"/>
    <rect x="320" y="130" width="24" height="60" rx="2" fill="#E87C3E"/>
    <rect x="162" y="210" width="196" height="150" rx="4" fill="#F5F1EB"/>
    <rect x="185" y="232" width="50" height="40" rx="3" fill="#1B2A4A"/>
    <rect x="285" y="232" width="50" height="40" rx="3" fill="#1B2A4A"/>
    <line x1="210" y1="232" x2="210" y2="272" stroke="#223357" strokeWidth="2"/>
    <line x1="185" y1="252" x2="235" y2="252" stroke="#223357" strokeWidth="2"/>
    <line x1="310" y1="232" x2="310" y2="272" stroke="#223357" strokeWidth="2"/>
    <line x1="285" y1="252" x2="335" y2="252" stroke="#223357" strokeWidth="2"/>
    <rect x="234" y="300" width="52" height="60" rx="3" fill="#E87C3E"/>
    <circle cx="276" cy="333" r="4" fill="#1B2A4A"/>
    <text x="256" y="440" textAnchor="middle" fontFamily="Arial Black, Impact, sans-serif" fontSize="56" fontWeight="900" fill="#E87C3E" letterSpacing="6">BZ</text>
    <circle cx="256" cy="256" r="248" fill="none" stroke="#E87C3E" strokeWidth="2" opacity="0.3"/>
  </svg>
);

const Design2 = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%">
    <defs>
      <linearGradient id="bg2" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#0F1623"/>
        <stop offset="100%" stopColor="#1B2A4A"/>
      </linearGradient>
      <linearGradient id="orangeGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#E87C3E"/>
        <stop offset="100%" stopColor="#F09A64"/>
      </linearGradient>
    </defs>
    <rect width="512" height="512" rx="80" fill="url(#bg2)"/>
    <g stroke="#223357" strokeWidth="0.5" opacity="0.25">
      <line x1="0" y1="128" x2="512" y2="128"/>
      <line x1="0" y1="256" x2="512" y2="256"/>
      <line x1="0" y1="384" x2="512" y2="384"/>
      <line x1="128" y1="0" x2="128" y2="512"/>
      <line x1="256" y1="0" x2="256" y2="512"/>
      <line x1="384" y1="0" x2="384" y2="512"/>
    </g>
    <rect x="140" y="100" width="56" height="312" rx="4" fill="#F5F1EB"/>
    <rect x="196" y="100" width="100" height="56" rx="4" fill="#F5F1EB"/>
    <rect x="270" y="100" width="56" height="136" rx="4" fill="#F5F1EB"/>
    <rect x="196" y="208" width="100" height="28" rx="4" fill="#F5F1EB"/>
    <rect x="196" y="244" width="120" height="56" rx="4" fill="url(#orangeGrad)"/>
    <rect x="290" y="244" width="56" height="168" rx="4" fill="url(#orangeGrad)"/>
    <rect x="196" y="356" width="120" height="56" rx="4" fill="url(#orangeGrad)"/>
    <g transform="translate(390, 90) rotate(45)" opacity="0.6">
      <rect x="0" y="0" width="8" height="50" rx="4" fill="#E87C3E"/>
      <circle cx="4" cy="0" r="12" fill="none" stroke="#E87C3E" strokeWidth="4"/>
    </g>
    <text x="256" y="478" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontSize="28" fontWeight="400" fill="#A0A8B8" letterSpacing="12">STUDIO</text>
    <rect x="8" y="8" width="496" height="496" rx="74" fill="none" stroke="#E87C3E" strokeWidth="2" opacity="0.2"/>
  </svg>
);

const Design3 = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%">
    <defs>
      <linearGradient id="bg3" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1B2A4A"/>
        <stop offset="100%" stopColor="#0F1623"/>
      </linearGradient>
    </defs>
    <circle cx="256" cy="256" r="256" fill="url(#bg3)"/>
    <circle cx="256" cy="240" r="160" fill="none" stroke="#E87C3E" strokeWidth="6" strokeDasharray="920 80" strokeLinecap="round" opacity="0.8"/>
    <rect x="232" y="130" width="48" height="180" rx="2" fill="#F5F1EB"/>
    <rect x="172" y="190" width="60" height="120" rx="2" fill="#F5F1EB" opacity="0.85"/>
    <rect x="280" y="170" width="60" height="140" rx="2" fill="#F5F1EB" opacity="0.85"/>
    <rect x="244" y="148" width="24" height="18" rx="2" fill="#1B2A4A"/>
    <rect x="244" y="178" width="24" height="18" rx="2" fill="#1B2A4A"/>
    <rect x="244" y="208" width="24" height="18" rx="2" fill="#1B2A4A"/>
    <rect x="186" y="208" width="18" height="14" rx="1" fill="#1B2A4A"/>
    <rect x="214" y="208" width="18" height="14" rx="1" fill="#1B2A4A"/>
    <rect x="186" y="238" width="18" height="14" rx="1" fill="#1B2A4A"/>
    <rect x="214" y="238" width="18" height="14" rx="1" fill="#1B2A4A"/>
    <rect x="294" y="192" width="18" height="14" rx="1" fill="#1B2A4A"/>
    <rect x="322" y="192" width="18" height="14" rx="1" fill="#1B2A4A"/>
    <rect x="294" y="222" width="18" height="14" rx="1" fill="#1B2A4A"/>
    <rect x="322" y="222" width="18" height="14" rx="1" fill="#1B2A4A"/>
    <line x1="140" y1="310" x2="372" y2="310" stroke="#E87C3E" strokeWidth="3" strokeLinecap="round"/>
    <text x="256" y="380" textAnchor="middle" fontFamily="Arial Black, Impact, sans-serif" fontSize="40" fontWeight="900" fill="#F5F1EB" letterSpacing="4">BUILDZEN</text>
    <text x="256" y="412" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontSize="22" fontWeight="300" fill="#E87C3E" letterSpacing="10">STUDIO</text>
    <circle cx="256" cy="256" r="250" fill="none" stroke="#F5F1EB" strokeWidth="1" opacity="0.1"/>
  </svg>
);

export default function ProfilePreviewPage() {
  return (
    <section style={{ padding: '8rem 1rem 4rem', maxWidth: '500px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', fontSize: '1.5rem', color: '#E87C3E', marginBottom: '0.5rem' }}>
        BuildZen Studio
      </h1>
      <p style={{ textAlign: 'center', color: '#A0A8B8', fontSize: '0.9rem', marginBottom: '2.5rem' }}>
        Profile Picture Designs
      </p>

      {[
        { Component: Design1, title: 'Design 1', desc: 'House Icon + "BZ" Monogram' },
        { Component: Design2, title: 'Design 2', desc: 'Block Letter "B"' },
        { Component: Design3, title: 'Design 3', desc: 'Zen Circle + Skyline' },
      ].map(({ Component, title, desc }) => (
        <div key={title} style={{
          background: '#1B2A4A',
          borderRadius: '12px',
          padding: '20px',
          textAlign: 'center',
          marginBottom: '2rem',
        }}>
          <Component />
          <h2 style={{ marginTop: '14px', fontSize: '1.1rem', color: '#F5F1EB' }}>{title}</h2>
          <span style={{ display: 'block', marginTop: '6px', fontSize: '0.8rem', color: '#A0A8B8' }}>{desc}</span>
        </div>
      ))}
    </section>
  );
}
