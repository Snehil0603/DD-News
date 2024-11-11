const mongoose = require('mongoose');

// Define the schema for comments
const commentSchema = mongoose.Schema({
    writer: {
        type: String,
        required: true,
        // You can refer to a User model if you want to associate the writer with a user
        // ref: 'User' 
    },
    newsId: {
        type: String,
        required: true,
        // Optionally, you can link this to a News model to associate the comment with a specific news article
        // ref: 'News'
    },
    content: {
        type: String,
        required: true,
    },
    reported: { // Add this field for the main comment
        type: Number,
        default: 0,
    },
    replies: [
        {
            content: String,
            writer: String,
            createdAt: Date,
            parentId:String,
            reported: { type: Number, default: 0 },
        }
    ],
}, { timestamps: true });

// Create a model from the schema
const Comment = mongoose.model('Comment', commentSchema);

// Export the model
module.exports = { Comment };
