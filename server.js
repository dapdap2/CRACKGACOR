
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const config = require('./config.json');

app.use(bodyParser.json());

app.post('/create-qris', async (req, res) => {
  const { amount } = req.body;

  try {
    const response = await axios.post(
      'https://api.xendit.co/qr_codes',
      {
        external_id: 'invoice-' + Date.now(),
        type: 'DYNAMIC',
        amount: amount,
      },
      {
        auth: {
          username: config.apiKey,
          password: '',
        },
      }
    );

    res.json({ qr_url: response.data.qr_url });
  } catch (error) {
    console.error('Gagal membuat QR:', error.response?.data || error.message);
    res.status(500).json({ error: 'Gagal membuat QR' });
  }
});

app.listen(3000, () => {
  console.log('Davin QRIS Server running on http://localhost:3000');
});
