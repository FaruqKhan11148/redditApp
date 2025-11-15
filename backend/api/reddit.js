// fetching data from given url
import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    const redditRes = await fetch(
      'https://www.reddit.com/r/reactjs.json'
    );

    if (!redditRes.ok) {
      throw new Error(`Reddit fetch failed with status: ${redditRes.status}`);
    }

    const data = await redditRes.json();
    

  } catch (err) {
    console.error('Reddit fetch error:', err.message);
    res.status(500).json({ error: 'Failed to fetch Reddit posts' });
  }
}
