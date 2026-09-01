const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('/#home');
  await page.evaluate(() => localStorage.clear());
});

test('@smoke protected member routes redirect signed-out users', async ({ page }) => {
  await page.goto('/#account');
  await expect(page.getByRole('heading', { name: 'Welcome back.' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible();
  await page.goto('/#dashboard');
  await expect(page.getByRole('heading', { name: 'Welcome back.' })).toBeVisible();
});

test('@regression invalid credentials show an accessible error', async ({ page }) => {
  await page.goto('/#login');
  await page.getByLabel('Email address').fill('wrong@example.com');
  await page.getByLabel('Password').fill('incorrect');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.getByRole('alert')).toHaveText('The email or password is not recognised.');
  await expect(page).toHaveURL(/#login/);
});

test('@smoke valid credentials persist a session and support logout', async ({ page }) => {
  await page.goto('/#login');
  await page.getByLabel('Email address').fill('alex@example.com');
  await page.getByLabel('Password').fill('northstar-demo');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page).toHaveURL(/#account/);
  await expect(page.getByRole('heading', { name: 'Your Northstar.' })).toBeVisible();
  await page.goto('/#orders');
  await expect(page.getByRole('heading', { name: 'Order history.' })).toBeVisible();
  await page.goto('/#account');
  await page.getByRole('button', { name: 'Sign out' }).click();
  await expect(page).toHaveURL(/#login/);
  await expect(page.getByRole('heading', { name: 'Welcome back.' })).toBeVisible();
});
