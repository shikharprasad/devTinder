const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup",async(req,res)=>{
    

    const user = new User(req.body);
    try{
        await user.save();
        res.send("user added successfully");
    }catch(err){
        res.status(400).send("Error saving the user:" + err.message);
    }

});

//get user by email
app.get("/user",async (req,res)=>{
    const userEmail = req.body.emailId;
    console.log(userEmail);

    try{
        const users = await User.findOne({emailId: userEmail});
        if(users.length === 0){
            res.status(404).send("User not found");
        }
        else{
            res.send(users);
        }
        
    }catch(err){
        res.status(400).send("Something went wrong");
    }
    

    // try{
    //     const users = await User.find({emailId: userEmail});
    //     if(users.length === 0){
    //         res.status(404).send("User not found");
    //     }
    //     else{
    //         res.send(users);
    //     }
        
    // }catch(err){
    //     res.status(400).send("Something went wrong");
    // }
});
//Feed Api - Get/feed - get all users from the Database

app.get("/feed",async (req,res)=>{



    try {
        const users = await User.find({});
        res.send(users);
        
    } catch (err) {
        res.status(400).send("Something went wrong");
    }

});

 //Delete user from the database
app.delete("/user" ,async (req,res)=>{
    const userId =req.body.userId;

    try {
        const user =await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");
        
    } catch (err) {
        res.status(400).send("Something went wrong");

    }

});

//update data of the user
app.patch("/user/:userId", async (req, res) => {
    const userId = req.params.userId;
    const data = req.body;

    try {
        const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
        const isUpdateAllowed = Object.keys(data).every((k) =>
            ALLOWED_UPDATES.includes(k)
        );

        if (!isUpdateAllowed) {
            throw new Error("Update not allowed");
        }

        if (data.skills && data.skills.length > 10) {
            throw new Error("Skills cannot be more than 10");
        }

        const user = await User.findByIdAndUpdate(
            userId,
            data,
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).send("User not found");
        }

        res.send("User updated successfully");
    } catch (err) {
        console.error(err);
        res.status(400).send(err.message || "Something went wrong");
    }
});

connectDB().then(()=>{
    console.log("Database connection established......");
    app.listen(7777,()=>{
        console.log("Server is succesfully listening on port 7777");
    });
}).catch(err=>{
    console.error("Database cannot be connected ");
});
