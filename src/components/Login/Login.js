import React, { useState, useEffect } from "react";
import "./Login.css";
import CryptoJS from "crypto-js";
import axios from "axios";

function Login({ isOpen, handleClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);

  /* Function to check the strength of the password based on the length og the password entered*/
  function checkPasswordStrength(password) {
    if (password.length < 4) {
      setPasswordStrength(1);
    } else if (password.length < 8) {
      setPasswordStrength(2);
    } else {
      setPasswordStrength(3);
    }
    setPassword(password);
  }

  //Sends username and password to backend, and backend returns with the user matching the username and password.
  //localStorage used to keep user logged in between sessions. Window is reloaded to ensure the needed change in the navbar
  const login = async () => {
    const requestOptions = {
      method: "POST",
      data: {
        Username: username,
        Password: password,
      },
    };
    axios("http://localhost:8080/login", requestOptions).then((resp) => {
      handleClose(false);
      localStorage.setItem("username", resp.data[0].username);
      window.location.reload();
    });
  };

  return (
    <div className="LoginWrapper">
      {isOpen ? (
        <div className="loginContainer">
          <h1>Login</h1>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="input username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <span>
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => checkPasswordStrength(e.target.value)}
              type="password"
              className="input password"
            />
            {/* The passwordSbar will display the strength of the password entered, Right now it only checks the password
             based on length, but could easily be scaled to check for capital letters and/or symbols*/}
            <div className="passwordSbar">
              <div
                className="bad"
                style={{
                  backgroundColor:
                    passwordStrength != 0
                      ? passwordStrength == 1
                        ? "red"
                        : passwordStrength == 2
                        ? "yellow"
                        : passwordStrength == 3
                        ? "green"
                        : "grey"
                      : "grey",
                }}
              ></div>
              <div
                className="medium"
                style={{
                  backgroundColor:
                    passwordStrength != 0
                      ? passwordStrength == 1
                        ? "red"
                        : passwordStrength == 2
                        ? "yellow"
                        : passwordStrength == 3
                        ? "green"
                        : "grey"
                      : "grey",
                }}
              ></div>
              <div
                className="good"
                style={{
                  backgroundColor:
                    passwordStrength != 0
                      ? passwordStrength == 1
                        ? "red"
                        : passwordStrength == 2
                        ? "yellow"
                        : passwordStrength == 3
                        ? "green"
                        : "grey"
                      : "grey",
                }}
              ></div>
            </div>
          </span>
          <a onClick={() => login()}>Log in</a>
        </div>
      ) : null}
    </div>
  );
}

export default Login;
