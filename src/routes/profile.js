const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");



profileRouter.get("/profile", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user.toObject()); // Send plain object to avoid circular structure
    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
});


module.exports = profileRouter;