import React, { useState, useEffect } from "react";
import "./Navbar.css";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Login from "../Login/Login";
import LoginIcon from "@mui/icons-material/Login";

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const [login, setLogin] = useState(false);
  const [display, setDisplay] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  let pathname = window.location.pathname;

  //Handles the pop up of log in window
  function handlePopUp() {
    setOpen(!open);
  }
  //Ensures that a user does not have to login everytime they visit the site
  function checkLogin() {
    localStorage.length == 1 ? setLogin(true) : setLogin(false);
  }

  function setDimension() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    setActive(pathname);
    checkLogin();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", setDimension);

    return () => window.removeEventListener("resize", setDimension);
  }, [width]);

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
        {login ? (
          <div>
            <a className="user" onClick={() => setDisplay(!display)}>
              {localStorage.getItem("username")}
            </a>
            <div
              style={{
                display: display ? "flex" : "none",
                flexDirection: "column",
                textAlign: "start",
                color: "white",
                marginTop: "10px",
              }}
            >
              <a>Log out</a>
              <a>Delete User</a>
            </div>
          </div>
        ) : (
          <LoginIcon
            fontSize="large"
            onClick={() => handlePopUp()}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{ color: hover ? "#773e2b" : "white" }}
          />
        )}

        <Login isOpen={open} handleClose={setOpen} />
      </div>
    </div>
  );
}

export default Navbar;
