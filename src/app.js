const express = require("express");

const app = express();

const {adminAuth,userAuth} = require("./middlewares/auth");

app.use("/admin",adminAuth);

app.get("/user",userAuth,(req,res)=>{
    res.send("User data sent ")
})

app.get("/admin/getAllData",(req,res)=>{
    res.send("all data sent");
});
app.get("/admin/deleteUser",(req,res)=>{
    res.send("User deleted");
});
app.listen(7777,()=>{
    console.log("Server is succesfully listening on port 7777");
});