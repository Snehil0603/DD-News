const router=require("express").Router();
const User=require("../models/User")
// const Post=require("../models/Post")
const bcrypt=require("bcrypt")

// Update
router.put("/:id",async(req,res)=>{
    if(req.body.userId===req.params.id){

        if(req.body.password){
            const salt =await bcrypt.genSalt(10)
            req.body.password=await bcrypt.hash(req.body.password,salt)
        }
        try{

       const updateUser=await User.findByIdAndUpdate(
        req.params.id,
        {
        $set:req.body,
       },
       {new:true}
       );
       res.status(200).json(updateUser)
        }
        catch(err){
            res.status(500).json(err);
        }
    }
    else{
        res.status(401).json("You can update only your account")
    }
   
})


// Delete
router.delete("/:id",async(req,res)=>{
    if(req.body.userId===req.params.id){

           try{
                const user=await User.findById(req.params.id)

            try{
                await Post.deleteMany({username:user.username})
                await User.findByIdAndDelete(req.params.id)
                res.status(200).json("User has been deleted...")
            }
            catch(err){
                res.status(500).json(err);
            }
           } catch(err){
               res.status(404).json("User not found")
           } 
        }
        else{
            res.status(401).json("You can delete only your account")
        }
       
    })

    // get user
    router.get("/:id",async (req,res) =>{
        try{
            const user=await User.findById(req.params.id)
            const {password,...others} = user._doc;
            res.status(200).json(others)
        }
        catch(err){
            res.status(500).json(err)
        }
   
})

// Update user's news channels
router.patch("/:id/updateChannels", async (req, res) => {
    try {
      const userId = req.params.id;
      const { selectedChannels } = req.body;
  
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { newsChannel: selectedChannels },
        { new: true }
      );
  
      if (updatedUser) {
        res.status(200).json(updatedUser);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to update channels", error });
    }
  });


module.exports = router