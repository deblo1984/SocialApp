const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

//update user
router.put("/:id", async (req, res) => {
  try {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        const user = await User.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        });
        return res
          .status(200)
          .json({ message: "Account password has been updated", data: user });
      }
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json({ message: "Account has been updated", data: user });
    } else {
      return res
        .status(403)
        .json({ message: "You can update only your account!" });
    }
  } catch (err) {
    console.log(err);
  }
});

//delete user
router.delete("/:id", async (req, res) => {
  try {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      const user = await User.findByIdAndDelete(req.params.id);

      res.status(200).json({ message: "account has been deleted", data: user });
    } else {
      return res
        .status(403)
        .json({ message: "you can only delete your account" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "server error" });
  }
});
//get a user
//follow a user

module.exports = router;
