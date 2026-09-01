const moduleApp = document.querySelector('#app');

const moduleInventory = [
  ['Moss Study Mug', 'Home', '24', 'Healthy'],
  ['Orbit Table Lamp', 'Home', '4', 'Reorder soon'],
  ['Field Note Tote', 'Carry', '24', 'Healthy'],
  ['Daily Cap / Ochre', 'Wear', '7', 'Reorder soon'],
  ['Linen Throw / Chalk', 'Home', '24', 'Healthy']
];
const sessionKey = 'northstar-session';
const isAuthenticated = () => Boolean(localStorage.getItem(sessionKey));

function login() {
  return `<section class="auth-page"><div class="auth-panel"><span class="eyebrow">Northstar member space</span><h1>Welcome back.</h1><p>Sign in to view orders, delivery updates, and your saved collection.</p><form id="login-form"><div class="field"><label for="login-email">Email address</label><input id="login-email" type="email" required placeholder="alex@example.com"></div><div class="field"><label for="login-password">Password</label><input id="login-password" type="password" required placeholder="Your password"></div><div id="login-error" class="form-error" role="alert"></div><button class="primary-button full" type="submit">Sign in <span>→</span></button></form><p class="demo-note">Demo access: alex@example.com / northstar-demo</p></div><div class="auth-art"><span>MEMBER<br>ACCESS<br>/ 04</span></div></section>`;
}

function moduleAccount() {
  return `<section class="module-page"><div class="module-hero"><span class="eyebrow">Member space / Alex Morgan</span><h1>Your Northstar.</h1><p>Keep track of orders, saved pieces, and the objects you are considering next.</p></div><div class="module-grid"><article class="module-card accent-lime"><span class="eyebrow">Member since</span><strong>2024</strong><p>Atelier member / level 02</p></article><article class="module-card"><span class="eyebrow">Saved objects</span><strong>06</strong><p>Two pieces are low in stock.</p><a class="text-link" href="#shop">Browse collection →</a></article><article class="module-card wide"><div class="module-card-heading"><div><span class="eyebrow">Latest order</span><h2>#NS-1048 / In transit</h2></div><span class="status-pill">Arrives Friday</span></div><div class="progress-track"><span></span></div><div class="progress-labels"><span>Packed</span><span>In transit</span><span>Delivered</span></div></article></div><div class="module-section"><div class="section-heading"><div><span class="eyebrow">Your activity</span><h2>Recent orders</h2></div><a class="text-link" href="#orders">View all orders →</a></div>${orderTable()}</div></section>`;
}

function orderTable() {
  return `<div class="data-table"><div class="table-row table-head"><span>Order</span><span>Date</span><span>Items</span><span>Status</span></div><div class="table-row"><strong>#NS-1048</strong><span>12 Aug 2026</span><span>2 objects</span><span class="green-text">In transit</span></div><div class="table-row"><strong>#NS-0982</strong><span>28 Jun 2026</span><span>1 object</span><span>Delivered</span></div></div>`;
}

function moduleOrders() {
  return `<section class="module-page"><span class="eyebrow">Member space / order history</span><h1 class="module-title">Order history.</h1><div class="order-controls"><button class="filter-chip active">All orders</button><button class="filter-chip">In transit</button><button class="filter-chip">Delivered</button></div><div class="order-list"><article class="order-card"><div><span class="eyebrow">12 Aug 2026</span><h2>#NS-1048</h2><p>Orbit Table Lamp · Moss Study Mug</p></div><div><span class="status-pill">In transit</span><strong>$162.00</strong></div><button class="text-link">Track package →</button></article><article class="order-card"><div><span class="eyebrow">28 Jun 2026</span><h2>#NS-0982</h2><p>Field Note Tote</p></div><div><span class="status-pill delivered">Delivered</span><strong>$52.00</strong></div><button class="text-link">Buy again →</button></article><article class="order-card"><div><span class="eyebrow">04 Feb 2026</span><h2>#NS-0871</h2><p>Merino Scarf / Ink · Utility Notebook</p></div><div><span class="status-pill delivered">Delivered</span><strong>$92.00</strong></div><button class="text-link">View receipt →</button></article></div></section>`;
}

function moduleSupport() {
  return `<section class="module-page support-page"><div class="module-hero"><span class="eyebrow">Care desk / here to help</span><h1>How can we help?</h1><p>Answers, delivery updates, and a direct line to the people behind Northstar.</p><div class="search-help"><span>⌕</span><input id="help-search" placeholder="Search help articles"></div></div><div class="support-grid"><article class="support-card"><span class="support-icon">01</span><h2>Delivery & returns</h2><p>Track a parcel, change an address, or start a return within 30 days.</p><a class="text-link" href="#support">Read articles →</a></article><article class="support-card"><span class="support-icon">02</span><h2>Product care</h2><p>Keep stoneware, linen, canvas, and wool looking good for longer.</p><a class="text-link" href="#support">Care guides →</a></article><article class="support-card accent-coral"><span class="support-icon">03</span><h2>Talk to a human</h2><p>Our care team replies Monday–Friday, usually within one business day.</p><button class="primary-button" id="contact-support">Start a conversation <span>→</span></button></article></div></section>`;
}

function inventoryPanel() {
  return `<div class="data-table inventory-table"><div class="table-row table-head"><span>Object</span><span>Category</span><span>Available</span><span>Signal</span></div>${moduleInventory.map((item, index) => `<div class="table-row"><strong>${item[0]}</strong><span>${item[1]}</span><span>${item[2]}</span><span class="${index === 1 || index === 3 ? 'warning-text' : 'green-text'}">${item[3]}</span></div>`).join('')}</div>`;
}

function studioTabContent(tab) {
  if (tab === 'customers') return '<div class="insight-grid"><article><span class="eyebrow">Active members</span><strong>8,412</strong><p>+9.1% this month</p></article><article><span class="eyebrow">Repeat purchase rate</span><strong>32.8%</strong><p>Highest in Home</p></article><article><span class="eyebrow">Top region</span><strong>Pacific NW</strong><p>21% of total orders</p></article></div>';
  if (tab === 'fulfillment') return '<div class="queue-message"><span class="support-icon">✓</span><div><h2>Everything is moving.</h2><p>24 orders have been packed and 11 are waiting for carrier pickup.</p></div></div>';
  return inventoryPanel();
}

function moduleStudio() {
  return `<section class="studio-page"><div class="studio-header"><div><span class="eyebrow">Northstar Studio / internal</span><h1>Good work, in view.</h1><p>One calm command center for the collection, customers, and the week ahead.</p></div><span class="live-indicator"><i></i> Live data / 01 Sep 2026</span></div><div class="metric-grid"><article><span class="eyebrow">Gross sales / 30 days</span><strong>$48,290</strong><small class="positive">+18.4% vs last month</small></article><article><span class="eyebrow">Orders</span><strong>384</strong><small class="positive">+42 this week</small></article><article><span class="eyebrow">Conversion</span><strong>4.82%</strong><small>Across 12.6k sessions</small></article><article class="metric-highlight"><span class="eyebrow">Needs attention</span><strong>07</strong><small>Low-stock objects</small></article></div><div class="studio-layout"><section class="analytics-panel"><div class="panel-heading"><div><span class="eyebrow">Performance pulse</span><h2>Sales overview</h2></div><select class="select-control" aria-label="Sales range"><option>Last 30 days</option><option>Last 90 days</option></select></div><div class="chart" role="img" aria-label="Sales trend chart"><div class="chart-line"></div><div class="chart-labels"><span>03 Aug</span><span>10 Aug</span><span>17 Aug</span><span>24 Aug</span><span>31 Aug</span></div></div></section><section class="activity-panel"><div class="panel-heading"><div><span class="eyebrow">Live feed</span><h2>Studio activity</h2></div><span class="live-indicator"><i></i> Live</span></div><div class="activity-item"><span class="activity-dot coral"></span><p><strong>New order #NS-1054</strong><br><small>2 objects / 2 minutes ago</small></p></div><div class="activity-item"><span class="activity-dot lime"></span><p><strong>Inventory synced</strong><br><small>8 suppliers / 18 minutes ago</small></p></div><div class="activity-item"><span class="activity-dot blue"></span><p><strong>Journal published</strong><br><small>A slower morning / 1 hour ago</small></p></div></section></div><div class="studio-tabs" role="tablist"><button role="tab" aria-selected="true" class="studio-tab active" data-studio-tab="inventory">Inventory</button><button role="tab" aria-selected="false" class="studio-tab" data-studio-tab="customers">Customers</button><button role="tab" aria-selected="false" class="studio-tab" data-studio-tab="fulfillment">Fulfillment queue</button></div><div id="studio-tab-content" role="tabpanel">${inventoryPanel()}</div></section>`;
}

function renderModuleRoute() {
  const route = location.hash.slice(1);
  const views = {account: moduleAccount, orders: moduleOrders, support: moduleSupport, dashboard: moduleStudio};
  if (['account', 'orders', 'dashboard'].includes(route) && !isAuthenticated()) {
    moduleApp.innerHTML = login();
    document.querySelectorAll('[data-route]').forEach(link => link.classList.remove('active'));
    bindLogin();
    return;
  }
  if (route === 'login') {
    moduleApp.innerHTML = login();
    bindLogin();
    return;
  }
  if (!views[route]) return;
  moduleApp.innerHTML = views[route]();
  document.querySelectorAll('[data-route]').forEach(link => link.classList.toggle('active', link.dataset.route === route));
  window.scrollTo(0, 0);
  if (route === 'dashboard') bindStudioTabs();
  if (route === 'account') bindLogout();
  if (route === 'support') document.querySelector('#contact-support').addEventListener('click', () => { document.querySelector('#toast').textContent = 'A care specialist will be with you shortly'; document.querySelector('#toast').classList.add('show'); });
}

function bindLogin() {
  document.querySelector('#login-form').addEventListener('submit', async event => {
    event.preventDefault();
    const error = document.querySelector('#login-error');
    error.textContent = '';
    const response = await fetch('/api/auth/login', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ email: document.querySelector('#login-email').value, password: document.querySelector('#login-password').value }) });
    if (!response.ok) {
      error.textContent = 'The email or password is not recognised.';
      return;
    }
    localStorage.setItem(sessionKey, JSON.stringify(await response.json()));
    location.hash = 'account';
  });
}

function bindLogout() {
  const hero = document.querySelector('.module-hero');
  const logout = document.createElement('button');
  logout.className = 'text-link logout-button';
  logout.textContent = 'Sign out';
  logout.addEventListener('click', () => { localStorage.removeItem(sessionKey); location.hash = 'login'; });
  hero.append(logout);
}

function bindStudioTabs() {
  document.querySelectorAll('[data-studio-tab]').forEach(tab => tab.addEventListener('click', () => {
    document.querySelectorAll('.studio-tab').forEach(item => item.classList.remove('active'));
    tab.classList.add('active');
    document.querySelectorAll('[data-studio-tab]').forEach(item => item.setAttribute('aria-selected', item === tab ? 'true' : 'false'));
    document.querySelector('#studio-tab-content').innerHTML = studioTabContent(tab.dataset.studioTab);
  }));
}

window.addEventListener('hashchange', renderModuleRoute);
renderModuleRoute();