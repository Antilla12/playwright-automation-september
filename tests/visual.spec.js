const { test, expect } = require('@playwright/test');

test('@regression home page visual checkpoint', async ({ page, isMobile }) => {
  test.skip(isMobile, 'The visual baseline is maintained for desktop Chrome');
  await page.goto('/#home');
  await expect(page).toHaveScreenshot('northstar-home.png', { fullPage: true, animations: 'disabled' });
});
