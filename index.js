const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // ✅ CORS FIX
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ✅ Your API route
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

app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
