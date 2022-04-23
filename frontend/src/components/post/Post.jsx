import React, { useEffect, useState } from "react";
import { MoreVert } from "@material-ui/icons";
import "./post.css";
import axios from "axios";

const Post = ({ post }) => {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState({});

  const [user, setUser] = useState("");

  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`api/users/${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImg"
              src={user.profilePicture || "/public/person/noAvatar.png"}
              alt=""
            />
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{post.date}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src="/public/like.png"
              alt=""
              onClick={likeHandler}
            />
            <img
              className="likeIcon"
              src="/public/heart.png"
              alt=""
              onClick={likeHandler}
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
