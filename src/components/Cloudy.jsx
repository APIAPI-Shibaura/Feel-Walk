import React from "react";
import "../App.css";
import cloud from "../images/cloud.png";
import head from "../images/head.png";
import rightarm from "../images/right-arm.png";
import leftarm from "../images/left-arm.png";
import rightleg from "../images/right-leg.png";
import leftleg from "../images/left-leg.png";

const Cloudy = () => {
  return (
    <div>
      <h1>cloudy</h1>
      <img src={cloud} className="cloud" />
      <div className="character">
        <img src={head} className="head" />
        <img src={rightarm} className="right-arm" />
        <img src={leftarm} className="left-arm" />
        <img src={rightleg} className="right-leg" />
        <img src={leftleg} className="left-leg" />
      </div>
    </div>
  );
};

export default Cloudy;
