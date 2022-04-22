import React from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { Posts } from "../../dummyData";

const Feed = () => {
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {Posts.map((item) => (
          <Post key={item.id} post={item} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
