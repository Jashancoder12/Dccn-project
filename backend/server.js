// server.js (Backend)

const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// Enable CORS for cross-origin requests
app.use(cors({ origin: '*' }));

// Allow large raw requests (for upload)
app.use(express.raw({ limit: '10mb', type: '*/*' }));

// -------------------- Serve Frontend --------------------
// Frontend folder is outside backend folder
// Folder structure:
// NetMonitor Project/
// ├─ backend/server.js
// └─ frontend/index.html, script.js, style.css

app.use(express.static(path.join(__dirname, '../frontend')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// -------------------- Backend Endpoints --------------------

// Ping test
app.get('/ping', (req, res) => {
  res.json({ serverTime: Date.now() });
});

// Download test (sends 2 MB of random data)
app.get('/download', (req, res) => {
  const size = 2 * 1024 * 1024; // 2 MB
  const buffer = Buffer.alloc(size, 'a'); // fill with 'a'
  res.set('Content-Type', 'application/octet-stream');
  res.send(buffer);
});

// Upload test (receives data from frontend)
app.post('/upload', (req, res) => {
  const receivedBytes = req.body ? req.body.length : 0;
  res.json({
    receivedBytes,
    serverTime: Date.now()
  });
});


// -------------------- Start Server --------------------

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
