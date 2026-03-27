import { useState, useEffect } from 'react';

const SERVICE_LABELS = {
  'get-found': 'Get Found Online',
  'never-miss': 'Never Miss a Lead',
  'grow-autopilot': 'Grow on Autopilot',
  'not-sure': 'Not Sure Yet',
};

const formatLabel = (value) => {
  if (!value) return '';
  return value
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const formatService = (value) => SERVICE_LABELS[value] || formatLabel(value);

const formatList = (value) =>
  value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => formatService(item))
    .join(', ');

function AdminPage() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sessionToken, setSessionToken] = useState('');
  const [tokenExpiry, setTokenExpiry] = useState(0);

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');

    try {
      const res = await fetch('/.netlify/functions/admin-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.authenticated) {
        setAuthenticated(true);
        setSessionToken(data.token || '');
        setTokenExpiry(data.expiresIn ? Date.now() + data.expiresIn * 1000 : 0);
        setPassword('');
      } else {
        setAuthError('Invalid password. Please try again.');
      }
    } catch {
      setAuthError('Connection error. Please try again.');
    }
  };

  useEffect(() => {
    if (!authenticated) return;

    const fetchLeads = async () => {
      setLoading(true);
      setError('');

      try {
        if (!sessionToken || (tokenExpiry && Date.now() > tokenExpiry)) {
          throw new Error('Session expired. Please re-authenticate.');
        }

        const res = await fetch('/.netlify/functions/get-leads', {
          headers: { Authorization: `Bearer ${sessionToken}` },
        });

        if (!res.ok) {
          if (res.status === 401) {
            throw new Error('Unauthorized');
          }
          throw new Error('Failed to fetch leads');
        }

        const data = await res.json();
        setLeads(data);
      } catch (err) {
        if (err.message === 'Unauthorized') {
          setAuthError('Session expired. Please log in again.');
          setAuthenticated(false);
          setSessionToken('');
          setTokenExpiry(0);
        }
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, [authenticated, sessionToken, tokenExpiry]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Login gate
  if (!authenticated) {
    return (
      <section className="section" style={{ paddingTop: '10rem', minHeight: '80vh' }}>
        <div className="container" style={{ maxWidth: '400px', margin: '0 auto' }}>
          <div className="contact-form">
            <h2 style={{ marginBottom: '0.5rem', textAlign: 'center' }}>Admin Dashboard</h2>
            <p style={{
              textAlign: 'center',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              marginBottom: '2rem',
            }}>
              Protected Access
            </p>

            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="admin-password">Password</label>
                <input
                  type="password"
                  id="admin-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                  autoFocus
                />
              </div>

              {authError && (
                <p style={{
                  color: '#e74c3c',
                  fontSize: '0.85rem',
                  marginBottom: '1rem',
                  textAlign: 'center',
                }}>
                  {authError}
                </p>
              )}

              <button type="submit" className="btn btn--primary" style={{ width: '100%', textAlign: 'center' }}>
                Sign In
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }

  // Dashboard
  return (
    <section className="section" style={{ paddingTop: '8rem' }}>
      <div className="container">
        <div className="section__header">
          <span className="section__eyebrow">Admin</span>
          <h1 className="section__title">Lead Dashboard</h1>
          <p className="section__desc">{leads.length} total lead{leads.length !== 1 ? 's' : ''}</p>
        </div>

        {loading && (
          <div style={{ textAlign: 'center', padding: '3rem 0' }}>
            <p style={{ color: 'var(--text-muted)' }}>Loading leads...</p>
          </div>
        )}

        {error && (
          <div style={{
            background: 'rgba(231, 76, 60, 0.1)',
            border: '1px solid rgba(231, 76, 60, 0.3)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem 1.5rem',
            marginBottom: '2rem',
          }}>
            <p style={{ color: '#e74c3c', margin: 0, fontSize: '0.9rem' }}>{error}</p>
          </div>
        )}

        {!loading && !error && leads.length === 0 && (
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            padding: '3rem',
            textAlign: 'center',
          }}>
            <p style={{ color: 'var(--text-muted)', margin: 0 }}>No leads yet. They'll appear here once the contact form receives submissions.</p>
          </div>
        )}

        {!loading && leads.length > 0 && (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Service</th>
                  <th>Source</th>
                  <th>Focus</th>
                  <th>Stage</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id}>
                    <td data-label="Name">
                      <span className="admin-table__name">{lead.name}</span>
                      {lead.business && (
                        <span className="admin-table__business">{lead.business}</span>
                      )}
                    </td>
                    <td data-label="Email">
                      {lead.email ? (
                        <a href={`mailto:${lead.email}`} style={{ color: 'var(--accent)', textDecoration: 'none' }}>
                          {lead.email}
                        </a>
                      ) : (
                        '--'
                      )}
                    </td>
                    <td data-label="Phone">{lead.phone || '--'}</td>
                    <td data-label="Service">
                      {lead.service ? (
                        <span className="admin-table__tag">{formatService(lead.service)}</span>
                      ) : (
                        '--'
                      )}
                      {lead.addons && (
                        <span className="admin-table__meta">Add-ons: {formatList(lead.addons)}</span>
                      )}
                    </td>
                    <td data-label="Source">
                      <span className="admin-table__tag">{formatLabel(lead.leadSource || 'direct')}</span>
                      {lead.campaign && (
                        <span className="admin-table__meta">Campaign: {formatLabel(lead.campaign)}</span>
                      )}
                      {lead.partnerName && (
                        <span className="admin-table__meta">Partner: {lead.partnerName}</span>
                      )}
                    </td>
                    <td data-label="Focus">
                      {lead.trade || lead.city ? (
                        <>
                          <div className="admin-table__stack">
                            {lead.trade && (
                              <span className="admin-table__tag">{formatLabel(lead.trade)}</span>
                            )}
                            {lead.city && (
                              <span className="admin-table__tag">{formatLabel(lead.city)}</span>
                            )}
                          </div>
                          {lead.firstTouchPath && (
                            <span className="admin-table__meta">Entry: {lead.firstTouchPath}</span>
                          )}
                        </>
                      ) : (
                        '--'
                      )}
                    </td>
                    <td data-label="Stage">
                      {lead.stage ? (
                        <span className="admin-table__tag">{formatLabel(lead.stage)}</span>
                      ) : (
                        '--'
                      )}
                    </td>
                    <td data-label="Date">{formatDate(lead.date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default AdminPage;
