const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

test('@regression home page has no critical accessibility violations', async ({ page }) => {
  await page.goto('/#home');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.filter(violation => violation.impact === 'critical')).toEqual([]);
});

test('@regression studio dashboard has no critical accessibility violations', async ({ page }) => {
  await page.goto('/#dashboard');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.filter(violation => violation.impact === 'critical')).toEqual([]);
});
