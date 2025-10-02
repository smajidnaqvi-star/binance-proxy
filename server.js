const express = require('express');
const crypto = require('crypto');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

const API_KEY = "Q7pWxkxMYgHPMEhr92rryZ94Jyk86MYNkOJEgNfwYG905CEsBrXhnWyPCHT7iNir";
const SECRET_KEY = "GRK4iDpIn5fl7FvWZZX0tTNphBhRLPoJaFgvJHtiFDSsPqzF6AvJHH09RXsV8Umj";

app.post('/portfolio', async (req, res) => {
  const timestamp = Date.now();
  const query = `timestamp=${timestamp}`;
  const signature = crypto
    .createHmac('sha256', SECRET_KEY)
    .update(query)
    .digest('hex');

  const url = `https://api.binance.com/api/v3/account?${query}&signature=${signature}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-MBX-APIKEY': API_KEY
      }
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('Proxy running'));
