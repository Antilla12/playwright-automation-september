const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { URL } = require('node:url');

const port = Number(process.env.PORT || 4173);
const root = __dirname;
const products = [
  { id: 'moss-mug', name: 'Moss Study Mug', category: 'home', price: 34, stock: 24 },
  { id: 'orbit-lamp', name: 'Orbit Table Lamp', category: 'home', price: 128, stock: 4 },
  { id: 'field-tote', name: 'Field Note Tote', category: 'carry', price: 52, stock: 24 },
  { id: 'daily-cap', name: 'Daily Cap / Ochre', category: 'wear', price: 38, stock: 7 },
  { id: 'linen-throw', name: 'Linen Throw / Chalk', category: 'home', price: 96, stock: 24 },
  { id: 'utility-notebook', name: 'Utility Notebook', category: 'paper', price: 18, stock: 24 },
  { id: 'stone-tray', name: 'Stone Catchall', category: 'home', price: 42, stock: 24 },
  { id: 'merino-scarf', name: 'Merino Scarf / Ink', category: 'wear', price: 74, stock: 24 }
];
const orders = [
  { id: 'NS-1048', status: 'In transit', total: 162, items: 2 },
  { id: 'NS-0982', status: 'Delivered', total: 52, items: 1 },
  { id: 'NS-0871', status: 'Delivered', total: 92, items: 2 }
];
const demoUser = { email: 'alex@example.com', password: 'northstar-demo', name: 'Alex Morgan' };

function json(response, status, data) {
  response.writeHead(status, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
  response.end(JSON.stringify(data));
}

function serveStatic(response, pathname) {
  const requested = pathname === '/' ? '/index.html' : pathname;
  const filePath = path.join(root, requested);
  if (!filePath.startsWith(root) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) return json(response, 404, { error: 'Not found' });
  const extension = path.extname(filePath);
  const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json' };
  response.writeHead(200, { 'Content-Type': types[extension] || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(response);
}

const server = http.createServer((request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);
  if (request.method === 'POST' && url.pathname === '/api/auth/login') {
    let body = '';
    request.on('data', chunk => { body += chunk; });
    request.on('end', () => {
      try {
        const credentials = JSON.parse(body);
        if (credentials.email !== demoUser.email || credentials.password !== demoUser.password) return json(response, 401, { error: 'Invalid email or password' });
        return json(response, 200, { token: 'northstar-demo-session', user: { email: demoUser.email, name: demoUser.name } });
      } catch {
        return json(response, 400, { error: 'Invalid request body' });
      }
    });
    return;
  }
  if (request.method === 'GET' && url.pathname === '/api/health') return json(response, 200, { status: 'ok', service: 'northstar-api', version: '1.0.0' });
  if (request.method === 'GET' && url.pathname === '/api/products') return json(response, 200, { data: products, count: products.length });
  if (request.method === 'GET' && url.pathname === '/api/inventory') return json(response, 200, { data: products.map(({ id, name, category, stock }) => ({ id, name, category, stock, signal: stock < 10 ? 'reorder' : 'healthy' })) });
  if (request.method === 'GET' && url.pathname === '/api/orders') return json(response, 200, { data: orders, count: orders.length });
  if (request.method === 'GET') return serveStatic(response, url.pathname);
  return json(response, 405, { error: 'Method not allowed' });
});

server.listen(port, () => console.log(`Northstar API and app running at http://localhost:${port}`));