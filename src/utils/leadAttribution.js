const STORAGE_KEY = 'contractor-web-studio-lead-attribution';

const TRACKED_QUERY_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'lead_source',
  'campaign',
  'trade',
  'city',
  'partner_name',
  'service',
  'addons',
];

const canUseStorage = () => typeof window !== 'undefined' && typeof window.sessionStorage !== 'undefined';

const cleanEntries = (entries) =>
  Object.fromEntries(entries.filter(([, value]) => typeof value === 'string' && value.trim()));

export const parseAttributionParams = (search = '') => {
  const params = new URLSearchParams(search);

  return cleanEntries(
    TRACKED_QUERY_KEYS.map((key) => [key, params.get(key) || ''])
  );
};

export const readStoredAttribution = () => {
  if (!canUseStorage()) return {};

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const writeStoredAttribution = (value) => {
  if (!canUseStorage()) return;

  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value));
};

export const captureLeadAttribution = ({ pathname, search }) => {
  if (!canUseStorage()) return;

  const existing = readStoredAttribution();
  const queryAttribution = parseAttributionParams(search);
  const now = new Date().toISOString();

  const merged = {
    ...existing,
    ...queryAttribution,
    first_touch_path: existing.first_touch_path || pathname,
    first_touch_at: existing.first_touch_at || now,
    latest_path: pathname,
    latest_at: now,
  };

  writeStoredAttribution(cleanEntries(Object.entries(merged)));
};

export const getResolvedAttribution = ({ pathname, search }) => {
  const stored = readStoredAttribution();
  const query = parseAttributionParams(search);

  return {
    ...stored,
    ...query,
    first_touch_path: stored.first_touch_path || pathname,
    latest_path: pathname,
  };
};

export const buildTrackedContactPath = (params = {}) => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (typeof value === 'string' && value.trim()) {
      query.set(key, value);
    }
  });

  const queryString = query.toString();
  return queryString ? `/contact?${queryString}` : '/contact';
};
