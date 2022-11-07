const express=require("express")
const app=express()
const dotenv=require("dotenv")
const mongoose=require("mongoose")
const authUser=require("./routes/auth")
const userRoute=require("./routes/users")
const commentRoute=require("./routes/comment")
// const LikeRoute=require("./routes/like")
// const FavoriteRoute=require("./routes/favorite")
const cors = require("cors");

app.use(cors());
app.use(express.json())

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(console.log("Connected to mongoDB"))
.catch((err) => console.log(err))

app.use("/server/auth",authUser)
app.use("/server/users",userRoute)
// app.use('/server/comment',commentRoute);
// app.use('/server/like', LikeRoute);
// app.use('/server/favorite', FavoriteRoute);

app.listen("5000",()=>{
    console.log("Backend is running")
})