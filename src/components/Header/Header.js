import React from "react";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <span className="headerLeft">
        <span className="headerLeftText">
          <h1>Start your day, and keep it going with Coffee</h1>
          <span>
            <h3>
              Locally Sourced <span>|</span> Roasted with passion
            </h3>
            <p>Order your morning routine to your doorstep and enjoy! </p>
          </span>
          <span className="headerLeftButton">
            <a href="/">Order Now</a>
            <a href="/">Check Products</a>
          </span>
        </span>
      </span>
      <span className="headerRight"></span>
    </header>
  );
}

export default Header;
