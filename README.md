# Northstar Market

A multi-module ecommerce application for demonstrating Playwright automation. Northstar is intentionally self-contained and uses hash routing, local storage, and an in-memory catalog so it can run without a backend while still presenting a realistic product, customer, and operations surface.

## Application modules

- **Storefront:** editorial home page, product catalog, category and price filters, sorting, live search, product detail, quantity controls, cart drawer, and responsive layouts.
- **Commerce:** promo-code validation, checkout form validation, order confirmation, persistent cart state, and member order history.
- **Customer space:** account overview, delivery progress, saved-object summary, and recent activity.
- **Care desk:** help entry point, returns and product-care content, and support contact feedback.
- **Northstar Studio:** operations dashboard with sales metrics, chart visualization, live activity feed, inventory health table, customer insights, and fulfillment queue.

## Run the website

```bash
npm install
npm start
```

Open http://localhost:4173.

## Run the automation

```bash
npx playwright install chromium
npx playwright test
```

The suite covers product filtering and sorting, search with empty states, product details and quantity changes, persistent cart state, promo-code validation, checkout completion, responsive mobile behavior, account-to-orders navigation, dashboard tab state, and support feedback. The HTML report is generated in `playwright-report/` and can be opened with `npm run test:report`.

## Showcase routes

- `/#home` - customer landing experience
- `/#shop` - catalog and discovery controls
- `/#product/orbit-lamp` - product detail workflow
- `/#account` - member dashboard
- `/#orders` - order history
- `/#support` - care desk
- `/#dashboard` - internal operations studio