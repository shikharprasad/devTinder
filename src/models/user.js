const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50,
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        lowercase: true,
        required: true,
        unique:true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address: "+ value);
            }

        }
    },
    password: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a strong password: "+ value);
            }

        },
    },
    age:{
        type: Number,
        min: 18,
        
    },
    gender: {
        type: String,
        validate(value) {
            const allowedGenders = ["male", "female", "others"];
            if (!allowedGenders.includes(value)) {
                throw new Error("Gender data is not valid");
            }
        },
    },
    photoUrl:{
        type: String,
        default : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm-TruksPXPI5imDL_kfzEfFiAZwg5AzHtWg&s",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid photoUrl: "+ value);
            }

        },
    },
    about:{
        type : String,
        default : "This si the default about of users",
    },
    skills: {
        type: [String]

    },

},
{
    timestamps: true,
});

module.exports = mongoose.model("User",userSchema);
