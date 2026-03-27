import { describe, expect, it } from 'vitest';
import { ADDON_PRICING, buildEstimateForPackage, PACKAGE_PRICING } from './create-checkout.js';

describe('buildEstimateForPackage', () => {
  it('calculates the base package total and 50 percent deposit', () => {
    const estimate = buildEstimateForPackage('get-found', []);

    expect(estimate.total).toBe(PACKAGE_PRICING['get-found'].price);
    expect(estimate.depositCents).toBe(Math.round(estimate.total * 0.5 * 100));
    expect(estimate.addons).toEqual([]);
  });

  it('includes known add-ons and ignores unknown ones', () => {
    const estimate = buildEstimateForPackage('never-miss', ['pages', 'content', 'unknown']);
    const expectedAddonTotal = ADDON_PRICING.pages.price + ADDON_PRICING.content.price;

    expect(estimate.total).toBe(PACKAGE_PRICING['never-miss'].price + expectedAddonTotal);
    expect(estimate.addons.map((addon) => addon.key)).toEqual(['pages', 'content']);
  });

  it('throws for unknown package keys', () => {
    expect(() => buildEstimateForPackage('not-a-package', [])).toThrow(/Unknown package/);
  });
});
