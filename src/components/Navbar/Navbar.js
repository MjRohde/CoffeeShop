import React, { useState, useEffect } from "react";
import "./Navbar.css";

function Navbar() {
  const [loc, setLoc] = useState(false);

  function checkLocation() {
    if (window.location.pathname.split("/")[1] === "") {
      setLoc(true);
    } else {
      setLoc(false);
    }
  }

  useEffect(() => {
    checkLocation();
  }, []);
  return (
    <div>
      <span className={loc ? "navbar" : "fullWidthNav"}>
        <a href="/">Home</a>
        <a href="/allCoffees">Products</a>
        <a href="/">Order</a>
      </span>
    </div>
  );
}

export default Navbar;
