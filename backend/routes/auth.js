const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//register users
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({
        message: "user not found",
      });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.status(400).json({ message: "password incorrect" });
    }
    res.status(200).json({ message: user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "server error" });
  }
});

module.exports = router;
