const validator = require("validator");
const validateSignUpData = (req) => {
    const {firstName , lastName , emailId , password} = req.body;

    if(!firstName || !lastName) {
        throw new Error("Name is not valid!");
    }
    else if(!validator.isEmail(emailId))
    {
        throw new Error("Invalid email address: ");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Enter a strong password: ");
    } 

    

};

const validateEditProfileData = (req)=>{
    const allowedEditFields = ["firstName","lastName","emailId","photoUrl","gender","age","about","skills"];

    const isEditAllowed = Object.keys(req.body).every(field => allowedEditFields.includes(field));

    return isEditAllowed;
};

const validatePasswordChange = (oldPassword, newPassword) => {
    if (!oldPassword || !newPassword) {
        throw new Error("Old password and new password are required");
    }

    if (oldPassword === newPassword) {
        throw new Error("New password cannot be the same as the old password");
    }

    if (!validator.isStrongPassword(newPassword)) {
        throw new Error("New password must be strong (minLength: 8, mix of characters)");
    }
};

module.exports = {validateSignUpData,validateEditProfileData,validatePasswordChange};