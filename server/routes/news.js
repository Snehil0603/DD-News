// backend/routes/news.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/news', async (req, res) => {
  try {
    const { category, keyword, endpoint } = req.query;
    const apiKey = process.env.NEWS_API_KEY;

    let url = `https://newsapi.org/v2/${endpoint}`;
    const params = {
      apiKey,
      country: 'us', // Default country for 'top-headlines'
    };

    if (endpoint === 'everything') {
      params.q = keyword || 'latest';
    } else if (endpoint === 'top-headlines') {
      if (category) params.category = category;
      if (keyword) params.q = keyword;
    }

    const response = await axios.get(url, { params });
    
    // Filter articles on the backend
    const filteredArticles = response.data.articles.filter(article => {
      return article.title !== '[Removed]' && article.description && article.urlToImage;
    });

    res.json({ articles: filteredArticles }); // Send only filtered articles to the frontend
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ message: 'Error fetching news', error });
  }
});

module.exports = router;
