const express = require("express");
const authRouter = express.Router();

const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");





authRouter.post("/signup", async (req, res) => {
    try {
        // Validate data
        validateSignUpData(req);

        const { firstName, lastName, emailId, password } = req.body;

        // Encrypt the password
        const passwordHash = await bcrypt.hash(password, 10);

        // Create a new instance of User model
        const user = new User({ firstName, lastName, emailId, password: passwordHash });
        await user.save();

        res.send("User added successfully");
    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
});

authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId });

        if (!user) {
            throw new Error("Invalid credentials");
        }
        const isPasswordValid = await user.validatePassword(password);

        if (isPasswordValid) {


            const token = await user.getJWT();

            
            res.cookie("token", token,{expires: new Date(Date.now() + 8 * 3600000)});
            res.send("Login Successful!!");
        } else {
            throw new Error("Password is not correct");
        }
    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
});

module.exports = authRouter;