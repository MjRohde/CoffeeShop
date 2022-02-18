import React, { useState, useEffect } from "react";
import "./Navbar.css";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);

  const width = window.innerWidth;
  console.log(window.innerWidth);

  return (
    <div>
      {width < 1000 ? (
        <MenuIcon
          onClick={() => setShowMenu(true)}
          style={{
            position: "absolute",
            top: "3%",
            left: "5%",
            color: "white",
            zIndex: 1000,
          }}
          fontSize="large"
        />
      ) : null}

      <span
        className={width < 1000 ? "navbar-mobile" : "navbar"}
        style={{
          width: width < 1000 ? (showMenu ? "100vw" : 0) : "50%",
          zIndex: 1000,
        }}
      >
        {width < 1000 ? (
          <CloseIcon
            onClick={() => setShowMenu(false)}
            style={{ position: "absolute", top: "1%", right: "5%" }}
            fontSize="large"
          />
        ) : null}
        <a href="/">Home</a>
        <a href="/allCoffees">Products</a>
        <a href="/">Order</a>
      </span>
    </div>
  );
}

export default Navbar;
