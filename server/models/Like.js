const mongoose = require('mongoose');


const LikeSchema =new mongoose.Schema({
   userId: {
       type: String,
       ref: 'User',
       require:true,
   },
   newsId: {
       type: String,
       required:false,
   },
   commentId: {
       type: String,
       required: false,
   },
   

}, { timestamps: true })


module.exports=mongoose.model("Like",LikeSchema)