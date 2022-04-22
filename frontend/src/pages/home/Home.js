import React from "react";
import "./home.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";

const Home = () => {
  return (
    <>
      <Topbar />
      <Sidebar />
    </>
  );
};

export default Home;
