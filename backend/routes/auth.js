const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

/* 
Register new user
METHOD: POST
API-URL: /api/auth/register
@params req.body
*/
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

/* 
User login
METHOD: POST
API-URL: /api/auth/login
@params: email, password
*/

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res
        .status(400)
        .json({ success: false, message: "password incorrect" });
    }
    res.status(200).json({ success: true, message: user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "server error" });
  }
});

module.exports = router;
