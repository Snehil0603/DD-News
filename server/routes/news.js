const express = require('express');
const axios = require('axios');
const router = express.Router();

// Define a route that proxies requests to the News API
router.get('/news', async (req, res) => {
  try {
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        country: 'us', // Specify any parameters needed
        apiKey: process.env.NEWS_API_KEY, // Use the API key from environment variables
      },
    });
    res.json(response.data); // Send the data back to the frontend
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ message: 'Error fetching news', error });
  }
});

module.exports = router;
