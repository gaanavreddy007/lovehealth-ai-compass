// Gemini API Proxy - Node.js Express
// Place this file in your project root. Start with: node gemini-proxy.cjs

const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5174;

app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

app.post('/api/gemini', async (req, res) => {
  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: 'Gemini API key not set.' });
  }
  try {
    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Gemini proxy server running on http://localhost:${PORT}`);
});
