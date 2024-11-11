const mongoose = require('mongoose');

const FavoriteSchema = new mongoose.Schema({
    userFrom: {
        type: String,
        // ref: 'User',  // Reference to User model, make sure the User model is defined correctly elsewhere
        required: true
    },
    newsId: {  // Ensure the field matches the key in your routes
        type: String,
        required: false,
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    urlToImage:{
        type:String,
        required: false,
    },
    publishedAt:{
        type:String,
        required:true,
    },
    url:{
        type:String,
        required:false,
    }
}, 
{ timestamps: true }
);
module.exports = mongoose.model("Favorite", FavoriteSchema);
