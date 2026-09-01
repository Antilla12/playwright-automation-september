# Northstar Market

A multi-module ecommerce application for demonstrating Playwright automation. Northstar uses a lightweight Node.js server, an in-memory demo catalog, browser storage, and hash routing to present a realistic product, customer, and operations surface without external infrastructure.

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
npm install
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

Authentication is intentionally demo-only. The server uses a seeded credential and returns a static demo token; it is designed to showcase automation patterns, not to handle production identities or payment data.

## API and architecture

The project includes a small Node.js server in [server.js](server.js). It serves the static application and exposes demo endpoints:

- `GET /api/health` - service health and version
- `GET /api/products` - product catalog data
- `GET /api/inventory` - stock levels and reorder signals
- `GET /api/orders` - member order history
- `POST /api/auth/login` - demo credential verification and session payload

Playwright is organized into reusable fixtures and page objects under `tests/`, with separate API contract, authentication, accessibility, visual, page-object, and workflow specs. The visual baseline is stored beside [visual.spec.js](tests/visual.spec.js). The server is also the test web server, so browser and API checks run against the same process.

## Quality commands

```bash
npm run test:smoke       # tagged critical journeys and API health
npm run test:regression  # full workflow, API, accessibility, and visual checks
npm run test:a11y        # axe critical-violation gate
npm run test:headed      # watch browser automation locally
npm run test:report      # open the latest HTML report
```

GitHub Actions runs smoke and regression suites on pushes and pull requests to `main`, then uploads the HTML report and failure evidence as build artifacts. The test projects cover Chromium desktop and Pixel 5 mobile emulation; the desktop visual baseline is intentionally maintained separately from functional mobile checks.

## Project map

```text
server.js                 Node server, static files, and demo API
index.html                Application shell and global navigation
app.js                    Storefront, cart, checkout, and route behavior
modules.js                Account, support, orders, and studio modules
tests/fixtures.js         Reusable Playwright fixtures
tests/pages/              Page Object Model classes
tests/api.spec.js         API contract checks
tests/authentication.spec.js  Login and protected-route checks
tests/accessibility.spec.js   Axe critical-violation checks
tests/visual.spec.js      Screenshot regression check
.github/workflows/        CI workflow and report artifacts
```