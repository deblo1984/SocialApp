import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(
        "api/posts/timeline/62607daf5769b5d75d976a39"
      );
      setPosts(res.data);
    };
    fetchPosts();
  }, []);
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((item) => (
          <Post key={item._id} post={item} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
