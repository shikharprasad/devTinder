const express = require("express");

const app = express();


app.get("/user",(req,res)=>{
    res.send({firstname:"shikhar" , lastname:"Prasad"});
});

app.post("/user",(req,res)=>{
    // console.log("dave data to the database ");
    res.send("Data successfully saved in  the database");
});

app.delete("/user",(req,res)=>{
    res.send("deleted successfully ");

});
app.use("/test",(req,res)=>{
    res.send("hello from the server");
});



app.listen(3000,()=>{
    console.log("listening");
});
