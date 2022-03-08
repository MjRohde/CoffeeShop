import React, { useState, useEffect } from "react";
import "./Login.css";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";

function Login({ isOpen, handleClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tlf, setTlf] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [isLogin, setLogin] = useState(true);
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

  const addUser = async () => {
    let user = {
      username: username,
      password: password,
      name: name,
      email: email,
      tlf: tlf,
      admin: 0,
    };
    password === confirmPass
      ? axios.post("http://localhost:8080/addUser", user).then(() => {
          handleClose(false);
          setLogin(true);
        })
      : alert("Passwords must match");
  };

  function closeLogin() {
    handleClose(false);
    setLogin(true);
  }

  return (
    <div className="LoginWrapper">
      {/** Login container*/}
      {isOpen ? (
        isLogin ? (
          <div className="loginContainer">
            <div className="relativeContainer">
              <CloseIcon
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  cursor: "pointer",
                }}
                fontSize="large"
                onClick={() => closeLogin()}
              />
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
              </span>
              <button className="btnLogin" onClick={() => login()}>
                Log in
              </button>
              <a className="register" onClick={() => setLogin(false)}>
                Register new user
              </a>
            </div>
          </div>
        ) : (
          <div className="loginContainer">
            <div className="relativeContainer">
              <CloseIcon
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  cursor: "pointer",
                }}
                fontSize="large"
                onClick={() => closeLogin()}
              />
              <h1>Register New User</h1>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                className="input username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="name">Full Name:</label>
              <input
                type="text"
                className="input name"
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                className="input email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="tlf">Tlf:</label>
              <input
                type="tlf"
                className="input tlf"
                onChange={(e) => setTlf(e.target.value)}
              />
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                className="input password"
                onChange={(e) => checkPasswordStrength(e.target.value)}
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
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                className="input confirmPassword"
                onChange={(e) => setConfirmPass(e.target.value)}
              />
              <button className="btnLogin" onClick={() => addUser()}>
                Add User
              </button>
            </div>
          </div>
        )
      ) : null}
    </div>
  );
}

export default Login;
