import express from 'express';
import { cacheService, cache } from './cache.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static(join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));

// SSE endpoint for real-time operations monitoring
app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const sendOperation = (operation) => {
    res.write(`data: ${JSON.stringify(operation)}\n\n`);
  };

  const keepAlive = setInterval(() => {
    res.write(': keepalive\n\n');
  }, 30000);

  req.on('close', () => {
    clearInterval(keepAlive);
  });

  req.app.set('sendOperation', sendOperation);
});

// Get all cache items
app.get('/items', (req, res) => {
  const keys = cache.keys();
  const items = keys.map(key => ({
    key,
    value: cache.get(key),
    ttl: cache.getTtl(key)
  }));
  res.json(items);
});

// React app route
app.get('/react', (req, res) => {
  res.render('react');
});

// Original dashboard route
app.get('/', (req, res) => {
  const stats = cacheService.stats();
  const items = Object.entries(cache.mget(cache.keys())).map(([key, value]) => ({
    key,
    value: JSON.stringify(value),
    ttl: cache.getTtl(key)
  }));
  res.render('index', { stats, items });
});

// Helper to broadcast operations
const broadcastOperation = (req, operation) => {
  const sendOperation = req.app.get('sendOperation');
  if (sendOperation) {
    sendOperation(operation);
  }
};

// API routes
app.post('/cache/:key', (req, res) => {
  const { key } = req.params;
  const { value, ttl } = req.body;
  const success = cacheService.set(key, value, ttl);
  
  broadcastOperation(req, {
    type: 'SET',
    key,
    value,
    success
  });
  
  res.json({ success, key, value });
});

app.put('/cache/:key', (req, res) => {
  const { key } = req.params;
  const { value, ttl } = req.body;
  const success = cacheService.set(key, value, ttl);
  
  broadcastOperation(req, {
    type: 'UPDATE',
    key,
    value,
    success
  });
  
  res.json({ success, key, value });
});

app.get('/cache/:key', (req, res) => {
  const { key } = req.params;
  const value = cacheService.get(key);
  const success = value !== undefined;
  
  broadcastOperation(req, {
    type: 'GET',
    key,
    value,
    success
  });
  
  if (!success) {
    res.status(404).json({ error: 'Key not found' });
  } else {
    res.json({ key, value });
  }
});

app.delete('/cache/:key', (req, res) => {
  const { key } = req.params;
  const deleted = cacheService.delete(key);
  const success = deleted === 1;
  
  broadcastOperation(req, {
    type: 'DELETE',
    key,
    success
  });
  
  res.json({ success, key });
});

app.delete('/cache', (req, res) => {
  cacheService.flush();
  
  broadcastOperation(req, {
    type: 'FLUSH',
    success: true
  });
  
  res.json({ success: true, message: 'Cache cleared' });
});

app.get('/stats', (req, res) => {
  res.json(cacheService.stats());
});

const port = 3000;
app.listen(port, () => {
  console.log(`Cache server running on port ${port}`);
  console.log('\nReact interface: http://localhost:3000/react');
  console.log('Original dashboard: http://localhost:3000');
});