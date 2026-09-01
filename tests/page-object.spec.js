const { test, expect } = require('./fixtures');

test('@smoke page object can drive catalog discovery', async ({ storefront }) => {
  await storefront.reset();
  await storefront.openShop();
  await expect(storefront.page.getByRole('heading', { name: 'All objects' })).toBeVisible();
  await storefront.search('linen');
  await expect(storefront.page.getByText('Linen Throw / Chalk')).toBeVisible();
});

test('@regression page object supports repeatable cart setup', async ({ storefront }) => {
  await storefront.reset();
  await storefront.openProduct('utility-notebook');
  await storefront.addCurrentProduct(2);
  await expect(storefront.cartCount).toHaveText('2');
});
