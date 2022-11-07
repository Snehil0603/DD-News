const mongoose = require('mongoose');


const LikeSchema =new mongoose.Schema({
   userId: {
       type: Schema.Types.ObjectId,
       ref: 'User'
   },
   commentId: {
       type: Schema.Types.ObjectId,
       ref: 'Comment'
   },
   

}, { timestamps: true })


module.exports=mongoose.model("Like",LikeSchema)