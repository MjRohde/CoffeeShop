import React, { useState, useEffect } from "react";
import "./Navbar.css";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Login from "../Login/Login";
import LoginIcon from "@mui/icons-material/Login";
import axios from "axios";

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const [login, setLogin] = useState(false);
  const [display, setDisplay] = useState(false);
  const [orderLength, setOrderLength] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);

  let pathname = window.location.pathname;

  //Handles the pop up of log in window
  function handlePopUp() {
    setOpen(!open);
  }
  //Ensures that a user does not have to login everytime they visit the site
  function checkLogin() {
    localStorage.getItem("username") !== null
      ? setLogin(true)
      : setLogin(false);
  }

  function setDimension() {
    setWidth(window.innerWidth);
  }

  function logout() {
    localStorage.removeItem("username");
    window.location.reload();
  }

  const deleteUser = async () => {
    axios
      .post("http://localhost:8080/deleteUser", {
        username: localStorage.getItem("username"),
      })
      .then((resp) => {
        resp.data == true
          ? localStorage.removeItem("username") && window.location.reload()
          : alert("User could not be deleted, sorry");
      });
  };

  useEffect(() => {
    setActive(pathname);
    checkLogin();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", setDimension);

    return () => window.removeEventListener("resize", setDimension);
  }, [width]);

  useEffect(() => {
    if (localStorage.getItem("cart") !== null) {
      let length = JSON.parse(localStorage.getItem("cart")).length;
      setOrderLength(length);
    }
  }, [orderLength]);

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
        <a href="/orders" className={active === "/order" ? "active" : null}>
          Order {"(" + orderLength + ")"}
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
              <a onClick={() => logout()}>Log out</a>
              <a onClick={() => deleteUser()}>Delete</a>
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
