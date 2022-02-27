import React, { useState, useEffect } from "react";
import "./Navbar.css";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [active, setActive] = useState("");

  let pathname = window.location.pathname;

  const width = window.innerWidth;

  useEffect(() => {
    setActive(pathname);
  }, []);

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

      <div
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
        <a href="/" className={active === "/" ? "active" : null}>
          Home
        </a>
        <a
          href="/allCoffees"
          className={active === "/allCoffees" ? "active" : null}
        >
          Products
        </a>
        <a href="/" className={active === "/order" ? "active" : null}>
          Order
        </a>
      </div>
    </div>
  );
}

export default Navbar;
