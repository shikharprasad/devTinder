const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData, validatePasswordChange } = require("../utils/validation");
const bcrypt = require("bcrypt");



profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user.toObject()); // Send plain object to avoid circular structure
    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) =>{

    try {
        if(!validateEditProfileData(req)) {
            throw new Error("Invalid Edit Request");
        }

        const loggedInuser = req.user;
        console.log(loggedInuser);
        Object.keys(req.body).forEach((key)=> (loggedInuser[key] = req.body[key]));
        await loggedInuser.save();
        console.log(loggedInuser);

        res.json({message:`${loggedInuser.firstName},your profile updated successfully`, data: loggedInuser});
        
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }

});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        // Validate input fields
        validatePasswordChange(oldPassword, newPassword);

        const user = req.user;

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            throw new Error("Old password is incorrect");
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
        await user.save();

        res.send("Password updated successfully");
    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
});


module.exports = profileRouter;