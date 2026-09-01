class StorefrontPage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.getByPlaceholder('Try “linen”, “travel”...');
    this.cartCount = page.locator('#cart-count');
  }

  async reset() {
    await this.page.goto('/#home');
    await this.page.evaluate(() => localStorage.clear());
    await this.page.reload();
  }

  async openShop() {
    await this.page.goto('/#shop');
  }

  async openProduct(id) {
    await this.page.goto(`/#product/${id}`);
  }

  async search(term) {
    await this.page.getByRole('button', { name: 'Open search' }).click();
    await this.searchInput.fill(term);
  }

  async addCurrentProduct(quantity = 1) {
    for (let index = 1; index < quantity; index += 1) await this.page.getByRole('button', { name: 'Increase quantity' }).click();
    await this.page.getByRole('button', { name: 'Add to bag' }).click();
  }
}

module.exports = { StorefrontPage };
