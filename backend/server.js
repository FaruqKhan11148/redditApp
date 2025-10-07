import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/reddit', async (req, res) => {
  try {
    // Use AllOrigins proxy to bypass Reddit 403
    const redditRes = await fetch(
      'https://api.allorigins.win/get?url=' +
        encodeURIComponent('https://www.reddit.com/r/reactjs.json'),
      {
        headers: {
          'User-Agent': 'MyRedditApp/1.0', // Required header
        },
      }
    );

    if (!redditRes.ok) throw new Error(`Reddit fetch failed: ${redditRes.status}`);

    const textData = await redditRes.json();
    const data = JSON.parse(textData.contents); // AllOrigins wraps in 'contents'

    res.json(data);
  } catch (err) {
    console.error('Reddit fetch error:', err.message);
    res.status(500).json({ error: 'Failed to fetch Reddit posts' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
