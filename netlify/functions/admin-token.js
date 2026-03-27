import crypto from 'node:crypto';

const DEFAULT_TTL_SECONDS = 600;

function getSecret() {
  const secret = process.env.ADMIN_TOKEN_SECRET || process.env.ADMIN_PASSWORD;
  if (!secret) {
    throw new Error('Admin token secret not configured');
  }
  return secret;
}

function getTtlMs() {
  const raw = Number(process.env.ADMIN_TOKEN_TTL_SECONDS ?? DEFAULT_TTL_SECONDS);
  return Number.isFinite(raw) && raw > 0 ? raw * 1000 : DEFAULT_TTL_SECONDS * 1000;
}

function formatSignature(timestamp, secret) {
  return crypto.createHmac('sha256', secret).update(String(timestamp)).digest('hex');
}

export function createAdminSessionToken() {
  const secret = getSecret();
  const timestamp = Date.now();
  return `${timestamp}.${formatSignature(timestamp, secret)}`;
}

export function verifyAdminSessionToken(token) {
  if (typeof token !== 'string') {
    return false;
  }

  const [timestampPart, signature] = token.split('.');
  if (!timestampPart || !signature) {
    return false;
  }

  const timestamp = Number(timestampPart);
  if (!Number.isFinite(timestamp)) {
    return false;
  }

  const ttlMs = getTtlMs();
  if (Date.now() - timestamp > ttlMs) {
    return false;
  }

  try {
    const expected = formatSignature(timestamp, getSecret());
    const incoming = Buffer.from(signature, 'hex');
    const expectedBuf = Buffer.from(expected, 'hex');
    if (incoming.length !== expectedBuf.length) {
      return false;
    }
    return crypto.timingSafeEqual(incoming, expectedBuf);
  } catch (err) {
    return false;
  }
}

export function getAdminTokenTtlSeconds() {
  return Math.round(getTtlMs() / 1000);
}
