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
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const { password, updatedAt, createdAt, ...other } = user._doc;
    res.status(200).json({ message: "success", data: other });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
});

//follow a user
router.put("/:id/follow", async (req, res) => {
  try {
    if (req.body.userId !== req.params.id) {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({
          $push: { followings: req.params.id },
        });
        return res.status(200).json({ message: "user has been follow" });
      } else {
        return res
          .status(403)
          .json({ message: "you already following this person" });
      }
    } else {
      return res.status(403).json({ message: "you cant follow yourself" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "server error" });
  }
});

//unfollow a user
router.put("/:id/unfollow", async (req, res) => {
  try {
    if (req.body.userId !== req.params.id) {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        return res.status(200).json({ message: "user has been unfollow" });
      } else {
        return res.status(403).json({ message: "you dont follow this person" });
      }
    } else {
      return res.status(403).json({ message: "you cant unfollow yourself" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "server error" });
  }
});

module.exports = router;
