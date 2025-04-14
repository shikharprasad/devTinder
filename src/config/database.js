const mongoose = require("mongoose");

const connectDB = async ()=> {
    await mongoose.connect("mongodb+srv://shkp2002:bFpY3Yda4k0TJMRl@namastenode.qpbccqs.mongodb.net/devTinder");

};


module.exports = connectDB;