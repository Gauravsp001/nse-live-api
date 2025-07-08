const express = require('express');
const path = require('path');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// NSE Data fetch helper
async function fetchNSEIndex(symbol) {
  const url = `https://www.nseindia.com/api/equity-stockIndices?index=${encodeURIComponent(symbol)}`;

  try {
    const res = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Accept": "*/*",
        "Accept-Language": "en-US,en;q=0.9",
        "Referer": "https://www.nseindia.com/",
        "Connection": "keep-alive"
      }

    });

    const data = res.data.data[0];

    return {
      current: data.last,
      high: data.dayHigh,
      low: data.dayLow,
      change: data.perChange + '%'
    };
  } catch (err) {
    console.error(`Error fetching ${symbol}:`, err.message);
    return { current: '-', high: '-', low: '-', change: '-' };
  }
}

// ✅ Main API Route
app.get('/api', async (req, res) => {
  const [nifty, banknifty, sensex] = await Promise.all([
    fetchNSEIndex("NIFTY 50"),
    fetchNSEIndex("NIFTY BANK"),
    fetchNSEIndex("S&P BSE SENSEX"),
  ]);

  res.json({
    nifty,
    banknifty,
    sensex
  });
});

// Test Route
app.get('/nse', (req, res) => {
  res.json({ message: '✅ NSE API is working!' });
});

// Serve HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
