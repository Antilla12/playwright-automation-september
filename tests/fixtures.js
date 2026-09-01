const base = require('@playwright/test');
const { StorefrontPage } = require('./pages/storefront.page');

exports.test = base.test.extend({
  storefront: async ({ page }, use) => use(new StorefrontPage(page))
});
exports.expect = base.expect;
