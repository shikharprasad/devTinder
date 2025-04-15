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

app.get("/user",async (req,res)=>{
    const userEmail = req.body.emailId;

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

app.get("/feed",async (req,res)=>{



    try {
        const users = await User.find({});
        res.send(users);
        
    } catch (err) {
        res.status(400).send("Something went wrong");
    }

})

connectDB().then(()=>{
    console.log("Database connection established......");
    app.listen(7777,()=>{
        console.log("Server is succesfully listening on port 7777");
    });
}).catch(err=>{
    console.error("Database cannot be connected ");
});
