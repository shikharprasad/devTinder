const express = require("express");

const app = express();


app.get("/user/:userId/:name/:password",(req,res)=>{
    console.log(req.params);
    res.send({firstname:"shikhar" , lastname:"Prasad"});
});



app.listen(3000,()=>{
    console.log("listening");
});
