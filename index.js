const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// public फोल्डर से static फाइल्स सर्व करें
app.use(express.static(path.join(__dirname, 'public')));

// ✅ /nse route (JSON response)
app.get('/nse', (req, res) => {
  res.json({ message: '✅ NSE API route is working!' });
});

// index.html भेजें जब कोई root path / खोले
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Server को start करें
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
