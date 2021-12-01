const router = require("express").Router();
const User = require("../models/User")
const bcrypt = require("bcrypt")

// Register user

router.post("/register", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });
        const user = await newUser.save();
        res.status(200).json(user)
    } catch (err) {
        res.status(500).send(err);
    }
})

// Login user

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(404).json("User not found")

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(404).json("incorrect password")

        res.status(200).json(user)

    } catch (err) {
        res.status(500).send(err);
    }
})

module.exports = router