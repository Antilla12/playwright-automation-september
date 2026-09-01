const { test, expect } = require('@playwright/test');

test.describe('Northstar API contract', () => {
  test('@smoke health endpoint reports a live service', async ({ request }) => {
    const response = await request.get('/api/health');
    expect(response.ok()).toBeTruthy();
    await expect(response).toBeOK();
    await expect(response.json()).resolves.toMatchObject({ status: 'ok', service: 'northstar-api' });
  });

  test('@regression products and inventory expose stable operational data', async ({ request }) => {
    const products = await request.get('/api/products');
    const inventory = await request.get('/api/inventory');
    expect(products.ok()).toBeTruthy();
    expect(inventory.ok()).toBeTruthy();
    const productPayload = await products.json();
    const inventoryPayload = await inventory.json();
    expect(productPayload.count).toBe(8);
    expect(productPayload.data).toEqual(expect.arrayContaining([expect.objectContaining({ id: 'orbit-lamp', price: 128 })]));
    expect(inventoryPayload.data).toEqual(expect.arrayContaining([expect.objectContaining({ id: 'orbit-lamp', signal: 'reorder' })]));
  });
});
