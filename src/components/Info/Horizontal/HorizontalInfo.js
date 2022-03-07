import React from "react";
import "./HorizontalInfo.css";

function HorizontalInfo({ title, infoTitle, text }) {
  return (
    <span className="container" style={{ lineHeight: "2em" }}>
      <span className="titleHorizontal">
        <span style={{ fontSize: "20px" }}>{title}</span>

        <span style={{ fontSize: "40px" }} className="TitleInfo">
          {infoTitle}
        </span>
      </span>

      <span className="descText">
        <p>{text}</p>
      </span>
      <div className="button" style={{ marginTop: "50px" }}>
        <a className="buttonLink">Order Now</a>
      </div>
    </span>
  );
}

export default HorizontalInfo;
