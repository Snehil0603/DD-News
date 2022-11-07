const mongoose = require('mongoose');

const FavoriteSchema =new  mongoose.Schema({
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    newsId : {
        type: String
    },
    newsTitle: {
        type: String
    },
    newsPost: {
        type: String
    },
    

}, { timestamps: true })


module.exports=mongoose.model("Favorite",FavoriteSchema)