import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/reddit', async (req, res) => {
  try {
    const redditRes = await fetch(
      'https://api.allorigins.win/get?url=' +
        encodeURIComponent('https://www.reddit.com/r/reactjs.json')
    );

    const textData = await redditRes.json();
    const data = JSON.parse(textData.contents);
    res.json(data);

    if (!redditRes.ok) {
      throw new Error(`Reddit fetch failed with status: ${redditRes.status}`);
    }

    const data = await redditRes.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch Reddit posts' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
