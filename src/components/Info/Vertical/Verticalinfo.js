import React from "react";
import "./Verticalinfo.css";

function Verticalinfo({ title, infoTitle, text }) {
  return (
    <span className="containerVertical">
      <span style={{ lineHeight: "1.5em", textAlign: "start" }}>
        <span style={{ fontSize: "20px", fontStyle: "oblique" }}>{title}</span>
        <br />
        <span style={{ fontSize: "30px", fontWeight: "bold" }}>
          {infoTitle}
        </span>
      </span>
      <span>
        <p style={{ marginTop: "20px", fontSize: "18px" }}>{text}</p>
      </span>
      <div className="buttonVertical">
        <a className="buttonVerticalLink">Order Now</a>
      </div>
    </span>
  );
}

export default Verticalinfo;
