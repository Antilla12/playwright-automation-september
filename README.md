# Northstar Market

A multi-module ecommerce application for demonstrating Playwright automation. Northstar is intentionally self-contained and uses hash routing, local storage, and an in-memory catalog so it can run without a backend while still presenting a realistic product, customer, and operations surface.

## Application modules

- **Storefront:** editorial home page, product catalog, category and price filters, sorting, live search, product detail, quantity controls, cart drawer, and responsive layouts.
- **Commerce:** promo-code validation, checkout form validation, order confirmation, persistent cart state, and member order history.
- **Customer space:** account overview, delivery progress, saved-object summary, and recent activity.
- **Authentication:** API-backed demo login, protected account/orders/studio routes, persistent browser session, invalid-credential feedback, and logout.
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

The suite covers product filtering and sorting, search with empty states, product details and quantity changes, persistent cart state, promo-code validation, checkout completion, responsive mobile behavior, account-to-orders navigation, dashboard tab state, support feedback, API contracts, authentication redirects, invalid credentials, session persistence, and logout. The HTML report is generated in `playwright-report/` and can be opened with `npm run test:report`.

## Showcase routes

- `/#home` - customer landing experience
- `/#shop` - catalog and discovery controls
- `/#product/orbit-lamp` - product detail workflow
- `/#account` - member dashboard
- `/#orders` - order history
- `/#support` - care desk
- `/#dashboard` - internal operations studio
- `/#login` - authentication flow

Demo credentials: `alex@example.com` / `northstar-demo`.

## API and architecture

The project includes a small Node.js server in [server.js](server.js). It serves the static application and exposes demo endpoints:

- `GET /api/health` - service health and version
- `GET /api/products` - product catalog data
- `GET /api/inventory` - stock levels and reorder signals
- `GET /api/orders` - member order history
- `POST /api/auth/login` - demo credential verification and session payload

Playwright is organized into reusable fixtures and page objects under `tests/`, with separate API contract, accessibility, visual, and workflow specs. The visual baseline is stored beside [visual.spec.js](tests/visual.spec.js).

## Quality commands

```bash
npm run test:smoke       # tagged critical journeys and API health
npm run test:regression  # full workflow, API, accessibility, and visual checks
npm run test:a11y        # axe critical-violation gate
npm run test:headed      # watch browser automation locally
```

GitHub Actions runs smoke and regression suites on pushes and pull requests to `main`, then uploads the HTML report and failure evidence as build artifacts.