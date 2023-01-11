import React from "react";
import "./SideNav.css";

export default function SideNav() {
  return (
    <div className="side-nav">
      <div className="nav-btn">
        <img src={"/images/home-run.svg"} alt="Home" className="side-nav-img" />
      </div>
      <div className="nav-btn">
        <img src={"/images/more.svg"} alt="Add More" className="side-nav-img" />
      </div>
      <div className="nav-btn selected">
        <img
          src={"/images/list.svg"}
          alt="List Orders"
          className="side-nav-img"
        />
      </div>
    </div>
  );
}
