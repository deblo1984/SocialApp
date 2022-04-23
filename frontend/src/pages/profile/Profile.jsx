import React from "react";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./profile.css";

const Profile = () => {
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src="/public/post/3.jpeg"
                alt=""
              />
              <img
                className="profileUserImg"
                src="/public/person/7.jpeg"
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">Safak kocaoglu</h4>
              <span className="profileInfoDesc">This is my description</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed />
            <Rightbar profile />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
