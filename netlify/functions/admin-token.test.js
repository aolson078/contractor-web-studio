import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  createAdminSessionToken,
  getAdminTokenTtlSeconds,
  verifyAdminSessionToken,
} from './admin-token.js';

const ORIGINAL_ENV = { ...process.env };

describe('admin session tokens', () => {
  beforeEach(() => {
    process.env.ADMIN_PASSWORD = 'top-secret';
    delete process.env.ADMIN_TOKEN_SECRET;
    delete process.env.ADMIN_TOKEN_TTL_SECONDS;
  });

  afterEach(() => {
    vi.restoreAllMocks();
    process.env = { ...ORIGINAL_ENV };
  });

  it('creates tokens that verify with the configured secret', () => {
    vi.spyOn(Date, 'now').mockReturnValue(1_700_000_000_000);

    const token = createAdminSessionToken();

    expect(verifyAdminSessionToken(token)).toBe(true);
  });

  it('rejects tampered tokens', () => {
    vi.spyOn(Date, 'now').mockReturnValue(1_700_000_000_000);

    const token = createAdminSessionToken();
    const [timestamp] = token.split('.');
    const tampered = `${timestamp}.deadbeef`;

    expect(verifyAdminSessionToken(tampered)).toBe(false);
  });

  it('rejects expired tokens', () => {
    process.env.ADMIN_TOKEN_TTL_SECONDS = '1';
    vi.spyOn(Date, 'now')
      .mockReturnValueOnce(1_700_000_000_000)
      .mockReturnValueOnce(1_700_000_002_000);

    const token = createAdminSessionToken();

    expect(verifyAdminSessionToken(token)).toBe(false);
    expect(getAdminTokenTtlSeconds()).toBe(1);
  });
});
