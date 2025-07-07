const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve the index.html at root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ✅ This is your new API route
app.get('/api/indices', (req, res) => {
  res.json({
    nifty: {
      current: 23750,
      high: 23900,
      low: 23600,
      change: "+0.65%"
    },
    banknifty: {
      current: 51200,
      high: 51450,
      low: 50900,
      change: "+0.40%"
    },
    sensex: {
      current: 79200,
      high: 79550,
      low: 78800,
      change: "+0.35%"
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
