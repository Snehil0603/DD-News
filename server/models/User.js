const mongoose=require("mongoose")

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required :true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    profilePic :{
        type:String,
        default:"",
        unique:false
    },
    newsChannel :{
        type: [String],
        unique:false,
        default: []
    },
    reported: {
        type: Number,
        default: 0,
        unique: false
    },
},
{timestamps:true}
);
module.exports=mongoose.model("User",UserSchema)
