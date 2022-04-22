const router = require("express").Router();
const { restart } = require("nodemon");
const Post = require("../models/Post");
const User = require("../models/User");

/* 
Create new post
METHOD: POST
API-URL: /api/posts
@params req.body
*/
router.post("/", async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const result = await newPost.save();
    if (!result) {
      return res.status(500).json({
        success: false,
        message: "oops there is something wrong",
      });
    }
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "server error",
    });
  }
});

/* 
Update Post
METHOD: PUT
API-URL: /api/posts/:id
@params :id
*/
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    /*
    if post was not found
    throw warning
    */

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "post not found",
      });
    }

    /* 
    if user try to update post not belongs to him
    throw warning 
    */
    if (post.userId !== req.body.userId) {
      return res.status(403).json({
        success: false,
        message: "You can only update your post",
      });
    }
    await post.updateOne({ $set: req.body });
    return res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "server error",
    });
  }
});

/* 
Delete post 
METHOD: DELETE
API-URL: /api/posts/:id
@params :id
*/
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    /*
    if post was not found
    throw warning
    */

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "post not found",
      });
    }

    /* 
    if user try to update post not belongs to him
    throw warning 
    */
    if (post.userId !== req.body.userId) {
      return res.status(403).json({
        success: false,
        message: "Not allowed",
      });
    }
    await post.deleteOne();
    return res.status(200).json({
      success: true,
      message: "the post has been deleted",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

/* 
@function : user like another user post
@METHOD: PUT
@API-URL: /api/posts/:id/like 
@params :id, :userId
*/
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //if post not found
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "post not found",
      });
    }

    //user like the post
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      return res.status(200).json({
        success: true,
        message: "you like this post",
      });
    }

    //user unlike the post
    if (post.likes.includes(req.body.userId)) {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      return res.status(200).json({
        success: true,
        message: "you unlike this post ",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "server error",
    });
  }
});

/*
Get single post 
@METHOD: GET
@API-URL: /api/posts/:id
@params :id
*/
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "post not found",
      });
    }
    return res.status(201).json({
      success: true,
      message: "post was found",
      data: post,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "server error",
    });
  }
});
/*
Get timeline post 
@METHOD: GET
@API-URL: /api/posts/timeline/all
*/

router.get("/timeline/all", async (req, res) => {
  try {
    const currentUser = await User.findById(req.body.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    return res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "server error",
    });
  }
});

module.exports = router;
