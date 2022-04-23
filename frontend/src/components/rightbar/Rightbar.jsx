import React from "react";
import "./rightbar.css";
import Online from "../online/Online";
import { Users } from "../../dummyData";

const Rightbar = ({ profile }) => {
  const HomeRightBar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="public/gift.png" alt="" />
          <span className="birthdayText">
            <b>Asep</b> and <b>3 others friend</b> have a birthday today
          </span>
        </div>
        <img className="rightbarAd" src="public/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightBar = () => {
    return (
      <>
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoKey">New York</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoKey">Madrid</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoKey">Single</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          <div className="rightbarFollowing">
            <img
              className="rightbarFollowingImg"
              src="/public/person/2.jpeg"
              alt=""
            />
            <span className="rightbarFollowingName">Asep Udin</span>
          </div>
          <div className="rightbarFollowing">
            <img
              className="rightbarFollowingImg"
              src="/public/person/3.jpeg"
              alt=""
            />
            <span className="rightbarFollowingName">Lala</span>
          </div>
          <div className="rightbarFollowing">
            <img
              className="rightbarFollowingImg"
              src="/public/person/4.jpeg"
              alt=""
            />
            <span className="rightbarFollowingName">ujang</span>
          </div>
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {profile ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  );
};

export default Rightbar;
