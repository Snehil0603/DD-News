const express = require('express');
const router = express.Router();
const  Favorite = require("../models/Favorite");
const { auth } = require("./auth");  // Assuming this is for user authentication middleware

// Route to get the count of favorites for a specific news item
router.post("/favoriteNumber", (req, res) => {
    Favorite.find({ "newsId": req.body.newsId })  // Match by newsId
        .exec((err, subscribe) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, subscribeNumber: subscribe.length });
        });
});

// Route to check if a specific user has favorited a specific news item
router.post("/favorited", (req, res) => {
    Favorite.find({ "newsId": req.body.newsId, "userFrom": req.body.userFrom })  // Match by newsId and userFrom
        .exec((err, subscribe) => {
            if (err) return res.status(400).send(err);

            let result = false;
            if (subscribe.length !== 0) {
                result = true;
            }

            res.status(200).json({ success: true, subscribed: result });
        });
});

// Route to add a news item to the user's favorites
router.post("/addToFavorite", async (req, res) => {
    try {
        // Destructure fields from req.body
        const { userFrom, newsId, title, description, urlToImage, publishedAt } = req.body;
        console.log(req.body);
        // Validate that all required fields are provided
        if (!userFrom || !title || !description) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        // Create a new Favorite instance
        const favorite = new Favorite({
            userFrom: req.body.userFrom,
            newsId: req.body.newsId,
            title: req.body.title,
            description: req.body.description,
            urlToImage:urlToImage,
            publishedAt:publishedAt,
        });

        // Save the  document
        const savedFavorite = await favorite.save();

        return res.status(200).json({ success: true, favorite: savedFavorite });
    } catch (error) {
        console.error("Error saving favorite:", error);
        return res.status(500).json({ success: false, error: error.message });
    }
});
// Route to remove a news item from the user's favorites
router.post("/removeFromFavorite", (req, res) => {
    Favorite.findOneAndDelete({ newsId: req.body.newsId, userFrom: req.body.userFrom })  // Match by newsId and userFrom
        .exec((err, doc) => {
            if (err) return res.status(400).json({ success: false, err });
            res.status(200).json({ success: true, doc });
        });
});

// Route to get all the user's favorited news items
router.post("/getFavoredNews", (req, res) => {
    Favorite.find({ 'userFrom': req.body.userFrom })
        .exec((err, favorites) => {
            if (err) return res.status(400).send(err);
            return res.status(200).json({ success: true, favorites });
        });
});

module.exports = router;
