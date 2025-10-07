import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const PORT = 5000;

app.use(cors());

app.get("/reddit", async (req, res) => {
  try {
    const redditRes = await fetch(
      "https://www.reddit.com/r/reactjs.json?raw_json=1"
    );
    const data = await redditRes.json();
    res.json(data);
  } catch (err) { 
    res.status(500).json({ error: "Failed to fetch Reddit posts" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
