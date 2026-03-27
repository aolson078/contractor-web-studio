import { describe, expect, it } from 'vitest';
import { getContactPrefill } from '../utils/contactPrefill';

describe('getContactPrefill', () => {
  it('returns default values when there are no params', () => {
    expect(getContactPrefill('')).toEqual({ package: '', addons: [] });
  });

  it('parses package and addons correctly', () => {
    const result = getContactPrefill('?package=get-found&addons=pages,content');
    expect(result).toEqual({
      package: 'get-found',
      addons: ['pages', 'content'],
    });
  });

  it('filters empty addon entries', () => {
    const result = getContactPrefill('?package=never-miss&addons=pages,,google, ');
    expect(result).toEqual({
      package: 'never-miss',
      addons: ['pages', 'google'],
    });
  });
});
