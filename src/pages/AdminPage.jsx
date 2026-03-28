import { useState, useEffect, useMemo } from 'react';

const SERVICE_LABELS = {
  'get-found': 'Get Found Online',
  'never-miss': 'Never Miss a Lead',
  'grow-autopilot': 'Grow on Autopilot',
  'not-sure': 'Not Sure Yet',
};

const PIPELINE_STAGES = [
  'Prospect',
  'Contacted',
  'Replied',
  'Qualified',
  'Audit Sent',
  'Call Booked',
  'Proposal',
  'Closed Won',
  'Closed Lost',
  'Nurture',
];

const SOURCE_TAXONOMY = [
  'organic_search',
  'gbp',
  'blog',
  'linkedin',
  'cold_email',
  'partner_referral',
  'direct',
  'portfolio',
];

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

/* ── Metrics Panel ── */
function MetricsPanel({ leads }) {
  const metrics = useMemo(() => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const thisWeek = leads.filter((l) => new Date(l.date) >= weekAgo);

    const bySource = {};
    const byStage = {};
    const byTrade = {};
    const byCity = {};

    leads.forEach((l) => {
      const src = l.leadSource || 'direct';
      bySource[src] = (bySource[src] || 0) + 1;

      const stage = l.stage || 'Replied';
      byStage[stage] = (byStage[stage] || 0) + 1;

      if (l.trade) byTrade[l.trade] = (byTrade[l.trade] || 0) + 1;
      if (l.city) byCity[l.city] = (byCity[l.city] || 0) + 1;
    });

    const withAttribution = leads.filter(
      (l) => l.leadSource && l.leadSource !== 'direct' && l.stage
    ).length;
    const attributionRate = leads.length
      ? Math.round((withAttribution / leads.length) * 100)
      : 0;

    return { thisWeek, bySource, byStage, byTrade, byCity, attributionRate };
  }, [leads]);

  return (
    <div className="admin-metrics">
      {/* Summary cards */}
      <div className="admin-metrics__cards">
        <div className="admin-metrics__card">
          <span className="admin-metrics__value">{leads.length}</span>
          <span className="admin-metrics__label">Total Leads</span>
        </div>
        <div className="admin-metrics__card">
          <span className="admin-metrics__value">{metrics.thisWeek.length}</span>
          <span className="admin-metrics__label">This Week</span>
        </div>
        <div className="admin-metrics__card">
          <span className="admin-metrics__value">{metrics.attributionRate}%</span>
          <span className="admin-metrics__label">Attributed</span>
        </div>
        <div className="admin-metrics__card">
          <span className="admin-metrics__value">
            {metrics.byStage['Call Booked'] || 0}
          </span>
          <span className="admin-metrics__label">Calls Booked</span>
        </div>
        <div className="admin-metrics__card">
          <span className="admin-metrics__value">
            {metrics.byStage['Closed Won'] || 0}
          </span>
          <span className="admin-metrics__label">Closed Won</span>
        </div>
      </div>

      {/* Breakdown rows */}
      <div className="admin-metrics__breakdowns">
        <BreakdownList title="By Source" data={metrics.bySource} />
        <BreakdownList title="By Stage" data={metrics.byStage} />
        <BreakdownList title="By Trade" data={metrics.byTrade} />
        <BreakdownList title="By City" data={metrics.byCity} />
      </div>
    </div>
  );
}

function BreakdownList({ title, data }) {
  const entries = Object.entries(data).sort((a, b) => b[1] - a[1]);
  if (entries.length === 0) return null;

  return (
    <div className="admin-breakdown">
      <h3 className="admin-breakdown__title">{title}</h3>
      <div className="admin-breakdown__list">
        {entries.map(([key, count]) => (
          <div key={key} className="admin-breakdown__row">
            <span className="admin-breakdown__key">{formatLabel(key)}</span>
            <span className="admin-breakdown__count">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Filters ── */
function LeadFilters({ leads, filters, setFilters }) {
  const options = useMemo(() => {
    const sources = new Set();
    const stages = new Set();
    const trades = new Set();
    const cities = new Set();

    leads.forEach((l) => {
      if (l.leadSource) sources.add(l.leadSource);
      if (l.stage) stages.add(l.stage);
      if (l.trade) trades.add(l.trade);
      if (l.city) cities.add(l.city);
    });

    return {
      sources: [...sources].sort(),
      stages: PIPELINE_STAGES.filter((s) => stages.has(s)),
      trades: [...trades].sort(),
      cities: [...cities].sort(),
    };
  }, [leads]);

  const activeCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="admin-filters">
      <div className="admin-filters__row">
        <FilterSelect
          label="Stage"
          value={filters.stage}
          options={options.stages}
          onChange={(v) => setFilters((f) => ({ ...f, stage: v }))}
        />
        <FilterSelect
          label="Source"
          value={filters.source}
          options={options.sources}
          onChange={(v) => setFilters((f) => ({ ...f, source: v }))}
        />
        <FilterSelect
          label="Trade"
          value={filters.trade}
          options={options.trades}
          onChange={(v) => setFilters((f) => ({ ...f, trade: v }))}
        />
        <FilterSelect
          label="City"
          value={filters.city}
          options={options.cities}
          onChange={(v) => setFilters((f) => ({ ...f, city: v }))}
        />
        {activeCount > 0 && (
          <button
            className="admin-filters__clear"
            onClick={() => setFilters({ stage: '', source: '', trade: '', city: '' })}
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}

function FilterSelect({ label, value, options, onChange }) {
  return (
    <div className="admin-filter">
      <select
        className="admin-filter__select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={`Filter by ${label}`}
      >
        <option value="">All {label}s</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {formatLabel(opt)}
          </option>
        ))}
      </select>
    </div>
  );
}

/* ── CSV Export ── */
function exportLeadsCSV(leads) {
  const columns = [
    'created_at', 'company_name', 'contact_name', 'city', 'trade',
    'website', 'phone', 'email', 'lead_source', 'campaign',
    'partner_name', 'score', 'key_issue', 'notes', 'stage',
    'owner', 'last_contact_at', 'next_action_at', 'quote_value_estimate', 'outcome',
  ];

  const escapeCSV = (val) => {
    const str = String(val ?? '');
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const rows = leads.map((l) => [
    l.date || '',
    l.business || '',
    l.name || '',
    l.city || '',
    l.trade || '',
    '',  // website — not captured in form
    l.phone || '',
    l.email || '',
    l.leadSource || 'direct',
    l.campaign || '',
    l.partnerName || '',
    '',  // score — assigned during research
    '',  // key_issue — assigned during research
    l.message || '',
    l.stage || 'Replied',
    '',  // owner — assigned manually
    '',  // last_contact_at — updated manually
    '',  // next_action_at — updated manually
    '',  // quote_value_estimate — assigned during qualification
    '',  // outcome — updated manually
  ]);

  const csv = [columns.join(','), ...rows.map((r) => r.map(escapeCSV).join(','))].join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `leads-export-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

/* ── Main Page ── */
function AdminPage() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sessionToken, setSessionToken] = useState('');
  const [tokenExpiry, setTokenExpiry] = useState(0);
  const [showMetrics, setShowMetrics] = useState(true);
  const [filters, setFilters] = useState({ stage: '', source: '', trade: '', city: '' });

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

  const filteredLeads = useMemo(() => {
    return leads.filter((l) => {
      if (filters.stage && (l.stage || 'Replied') !== filters.stage) return false;
      if (filters.source && (l.leadSource || 'direct') !== filters.source) return false;
      if (filters.trade && l.trade !== filters.trade) return false;
      if (filters.city && l.city !== filters.city) return false;
      return true;
    });
  }, [leads, filters]);

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

        {/* Toolbar */}
        {!loading && leads.length > 0 && (
          <div className="admin-toolbar">
            <button
              className={`admin-toolbar__btn ${showMetrics ? 'admin-toolbar__btn--active' : ''}`}
              onClick={() => setShowMetrics((v) => !v)}
            >
              {showMetrics ? 'Hide Metrics' : 'Show Metrics'}
            </button>
            <button
              className="admin-toolbar__btn"
              onClick={() => exportLeadsCSV(filteredLeads)}
            >
              Export CSV
            </button>
          </div>
        )}

        {/* Metrics Panel */}
        {!loading && leads.length > 0 && showMetrics && (
          <MetricsPanel leads={leads} />
        )}

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

        {/* Filters + Table */}
        {!loading && leads.length > 0 && (
          <>
            <LeadFilters leads={leads} filters={filters} setFilters={setFilters} />

            {filteredLeads.length === 0 ? (
              <div style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: '2rem',
                textAlign: 'center',
                marginTop: '1rem',
              }}>
                <p style={{ color: 'var(--text-muted)', margin: 0 }}>
                  No leads match the current filters.
                </p>
              </div>
            ) : (
              <>
                {filteredLeads.length !== leads.length && (
                  <p style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.8rem',
                    marginBottom: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                  }}>
                    Showing {filteredLeads.length} of {leads.length} leads
                  </p>
                )}
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
                      {filteredLeads.map((lead) => (
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
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default AdminPage;
