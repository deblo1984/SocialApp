const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

/* 
Update user
METHOD: PUT
API-URL: /api/users/:id
@params: :id
*/
router.put("/:id", async (req, res) => {
  try {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        const user = await User.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        });
        return res.status(200).json({
          success: true,
          message: "Account password has been updated",
          data: user,
        });
      }
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json({
        success: true,
        message: "Account has been updated",
        data: user,
      });
    } else {
      return res
        .status(403)
        .json({ success: false, message: "You can update only your account!" });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: "server error" });
  }
});

/* 
Delete user
METHOD: POST
API-URL: /api/users/:id
@params: :id
*/
router.delete("/:id", async (req, res) => {
  try {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      const user = await User.findByIdAndDelete(req.params.id);

      res.status(200).json({
        success: true,
        message: "account has been deleted",
        data: user,
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "you can only delete your account",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "server error",
    });
  }
});

/* 
GET Single User
METHOD: GET
API-URL: /api/users/:id
@params: :id
*/
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    const { password, updatedAt, createdAt, ...other } = user._doc;
    res.status(200).json({
      success: false,
      data: other,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "server error",
    });
  }
});

/* 
following user
METHOD: PUT
API-URL: /api/users/:id/follow
@params: :id
*/
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
        return res.status(200).json({
          success: true,
          message: "user has been follow",
        });
      } else {
        return res.status(403).json({
          success: false,
          message: "you already following this person",
        });
      }
    } else {
      return res.status(403).json({
        success: false,
        message: "you cant follow yourself",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "server error",
    });
  }
});

/* 
unfollow user
METHOD: PUT
API-URL: /api/users/:id/unfollow
@params: :id
*/
router.put("/:id/unfollow", async (req, res) => {
  try {
    if (req.body.userId !== req.params.id) {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        return res.status(200).json({
          success: true,
          message: "user has been unfollow",
        });
      } else {
        return res.status(403).json({
          success: false,
          message: "you dont follow this person",
        });
      }
    } else {
      return res.status(403).json({
        success: false,
        message: "you cant unfollow yourself",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "server error",
    });
  }
});

module.exports = router;
