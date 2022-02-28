import React, { useState, useEffect } from "react";
import "./Login.css";
import CryptoJS from "crypto-js";
import axios from "axios";

function Login({ isOpen, handleClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);

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
    });
  };

  useEffect(() => {}, []);

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
