const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('/#home');
  await page.evaluate(() => {
    localStorage.clear();
    localStorage.setItem('northstar-session', JSON.stringify({ token: 'northstar-demo-session', user: { email: 'alex@example.com', name: 'Alex Morgan' } }));
  });
  await page.reload();
});

test('customer can filter, sort, and open a product detail page', async ({ page }) => {
  await page.goto('/#shop');
  await expect(page.getByRole('heading', { name: 'All objects' })).toBeVisible();
  await expect(page.locator('.product-card')).toHaveCount(8);

  await page.getByLabel('Under $60').check();
  await expect(page.locator('.product-card')).toHaveCount(5);
  await page.getByRole('combobox', { name: 'Sort products' }).selectOption('low');
  await expect(page.locator('.product-price').first()).toHaveText('$18.00');

  await page.locator('[data-product="utility-notebook"]').click();
  await expect(page).toHaveURL(/#product\/utility-notebook/);
  await expect(page.getByRole('heading', { name: 'Utility Notebook' })).toBeVisible();
  await expect(page.getByText('A ruled, lay-flat notebook')).toBeVisible();
});

test('search finds matching objects and handles an empty result', async ({ page }) => {
  await page.getByRole('button', { name: 'Open search' }).click();
  await page.getByPlaceholder('Try “linen”, “travel”...').fill('linen');
  await expect(page).toHaveURL(/#shop/);
  await expect(page.locator('.product-card')).toHaveCount(1);
  await expect(page.getByText('Linen Throw / Chalk')).toBeVisible();

  await page.getByPlaceholder('Try “linen”, “travel”...').fill('spaceship');
  await expect(page.getByText('No objects match your search.')).toBeVisible();
});

test('customer adjusts quantity and cart persists across navigation', async ({ page }) => {
  await page.goto('/#product/moss-mug');
  await page.getByRole('button', { name: 'Increase quantity' }).click();
  await page.getByRole('button', { name: 'Increase quantity' }).click();
  await expect(page.locator('#quantity')).toHaveText('3');
  await page.getByRole('button', { name: 'Add to bag' }).click();
  await expect(page.getByText('Shopping bag')).toBeVisible();
  await expect(page.locator('#cart-count')).toHaveText('3');
  await expect(page.getByText('3 × $34.00')).toBeVisible();
  await page.getByRole('button', { name: 'Close shopping bag' }).click();
  await page.goto('/#about');
  await expect(page.locator('#cart-count')).toHaveText('3');
});

test('invalid promo is rejected and valid checkout completes order', async ({ page }) => {
  await page.goto('/#product/field-tote');
  await page.getByRole('button', { name: 'Add to bag' }).click();
  await page.getByRole('button', { name: 'Continue to checkout' }).click();
  await expect(page).toHaveURL(/#checkout/);

  await page.getByLabel('Promo code').fill('NOPE');
  await page.getByRole('button', { name: 'Apply code' }).click();
  await expect(page.locator('#promo-message')).toHaveText('That code is not recognised');
  await page.getByLabel('Promo code').fill('NORTHSTAR10');
  await page.getByRole('button', { name: 'Apply code' }).click();
  await expect(page.locator('#promo-message')).toHaveText('Code applied: 10% off');

  await page.getByLabel('Email address').fill('alex@example.com');
  await page.getByLabel('First name').fill('Alex');
  await page.getByLabel('Last name').fill('Morgan');
  await page.getByLabel('Address', { exact: true }).fill('12 Market Street');
  await page.getByLabel('City').fill('Portland');
  await page.getByLabel('Postcode').fill('97205');
  await page.getByLabel('Card number').fill('4242424242424242');
  await page.getByRole('button', { name: 'Place order' }).click();
  await expect(page.getByRole('heading', { name: 'Thank you for choosing well.' })).toBeVisible();
  await expect(page.locator('#cart-count')).toHaveText('0');
});

test('mobile layout keeps navigation and cart usable', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Runs against the mobile project');
  await page.goto('/#home');
  await expect(page.getByRole('heading', { name: /Make room for/ })).toBeVisible();
  await expect(page.locator('.hero-art')).toBeVisible();
  await page.getByRole('button', { name: 'Open search' }).click();
  await expect(page.getByPlaceholder('Try “linen”, “travel”...')).toBeVisible();
});

test('member account connects to order history and keeps a delivery status', async ({ page }) => {
  await page.goto('/#account');
  await expect(page.getByRole('heading', { name: 'Your Northstar.' })).toBeVisible();
  await expect(page.getByText('#NS-1048 / In transit')).toBeVisible();
  await page.getByRole('link', { name: /View all orders/ }).click();
  await expect(page).toHaveURL(/#orders/);
  await expect(page.getByRole('heading', { name: 'Order history.' })).toBeVisible();
  await expect(page.getByText('#NS-0982')).toBeVisible();
});

test('studio dashboard exposes operational tabs and support contact feedback', async ({ page }) => {
  await page.goto('/#dashboard');
  await expect(page.getByRole('heading', { name: 'Good work, in view.' })).toBeVisible();
  await expect(page.getByText('$48,290')).toBeVisible();
  await page.getByRole('tab', { name: 'Customers' }).click();
  await expect(page.getByText('Repeat purchase rate')).toBeVisible();
  await page.getByRole('tab', { name: 'Fulfillment queue' }).click();
  await expect(page.getByText('Everything is moving.')).toBeVisible();

  await page.goto('/#support');
  await page.getByRole('button', { name: /Start a conversation/ }).click();
  await expect(page.getByRole('status')).toHaveText('A care specialist will be with you shortly');
});