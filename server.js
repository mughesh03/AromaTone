import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const NOVITA_API_KEY = process.env.VITE_NOVITA_API_KEY;
const NOVITA_BASE_URL = 'https://api.novita.ai/v3';

// Proxy endpoint for chat completions
app.post('/api/chat/completions', async (req, res) => {
  try {
    const response = await fetch(`${NOVITA_BASE_URL}/openai/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOVITA_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error proxying chat completion request:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }
});

// Proxy endpoint for text-to-speech
app.post('/api/txt2speech', async (req, res) => {
  try {
    const response = await fetch(`${NOVITA_BASE_URL}/async/txt2speech`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOVITA_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error proxying text-to-speech request:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});