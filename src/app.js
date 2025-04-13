const express = require("express");

const app = express();

app.use("/",(err,req,res,next)=>{

    if(err){
        res.status(500).send("something is wrong");
    }
});


app.get("/getUserData",(req,res)=>{

    // try{
    //     throw new Error("dnbjasdg");

        res.send("User data sent")

    // } catch (err){
    //     res.status(500).send("some error");
    // }

});
app.use("/",(err,req,res,next)=>{

    if(err){
        res.status(500).send("something is wrong");
    }
});


app.listen(7777,()=>{
    console.log("Server is succesfully listening on port 7777");
});