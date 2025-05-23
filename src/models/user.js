const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");




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
        enum:{
            values:["male", "female", "others"],
            message:`{VAlUE} is invalid gender type `
        },
        // validate(value) {
        //     const allowedGenders = ["male", "female", "others"];
        //     if (!allowedGenders.includes(value)) {
        //         throw new Error("Gender data is not valid");
        //     }
        // },
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
userSchema.methods.getJWT = async function() {

    const user = this;
    const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790", {expiresIn:"1d"});

    return token;
};

userSchema.methods.validatePassword = async function(passwordInputByUser) {

    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);


    return isPasswordValid;  
};

module.exports = mongoose.model("User",userSchema);
