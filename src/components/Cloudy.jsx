import React from "react";
import background from "../images/background.png";
import cloud from "../images/cloud.png";

const Cloudy = () => {
  return (
    <div>
      <h1>cloudy</h1>
      <img src={cloud} className="cloud" />
      <img src={background} className="home" />
    </div>
  );
};

export default Cloudy;
