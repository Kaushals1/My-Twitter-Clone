import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { Button } from "@material-ui/core";
import { GlobalState } from "../App";
import jwt_decode from "jwt-decode";
import Backdrop from "../Backdrop";
import "./Login.css";
import setAuthToken from "../setAuthToken";
function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const globalState = useContext(GlobalState);

  let handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    let obj = form;
    obj[name] = value;
    setForm(obj);
  };

  const submitSignIn = (e) => {
    e.preventDefault();
    globalState.dispatch({ type: "UPDATE_BDROP", payload: true });

    axios
      .post("/users/login", form)
      .then((data) => {
        let decoded = jwt_decode(data.data.token);
        setAuthToken(data.data.token);
        globalState.dispatch({ type: "UPDATE_USER", payload: decoded.user });
        globalState.dispatch({ type: "UPDATE_LOGIN", payload: true });

        localStorage.setItem("token", data.data.token);
      })
      .catch((err) => {
        if (err.message === "Network Error") {
          if (window.confirm("Server down! Try again later.")) {
            globalState.dispatch({ type: "UPDATE_BDROP", payload: false });
          } else {
            globalState.dispatch({ type: "UPDATE_BDROP", payload: false });
          }
        } else {
          globalState.dispatch({ type: "UPDATE_BDROP", payload: false });
          setErrorMessage("Invalid Credentials");
        }
      });
  };
  if (globalState.state.isLoggedIn) {
    globalState.dispatch({ type: "UPDATE_BDROP", payload: false });

    return <Redirect to="/dashboard" />;
  } else {
    return (
      <div className="login">
        <Backdrop />
        <div className="login__picture">
          <img src={require("./t.png")} alt="" />
        </div>
        <div className="login__right">
          <div className={`login__error`}>{errorMessage}</div>
          <form onSubmit={submitSignIn} className="login__form">
            <div className="login__inputs">
              <div className="login__container">
                <input
                  autoComplete="off"
                  id="email"
                  name="email"
                  onChange={handleInputChange}
                  placeholder="emailid"
                  type="text"
                  required
                />
              </div>
              <div className="login__container">
                <input
                  autoComplete="off"
                  name="password"
                  type="password"
                  onChange={handleInputChange}
                  id="password"
                  placeholder="password"
                  required
                />
              </div>
              <div className="login__btn">
                <Button
                  type="submit"
                  variant="outlined"
                  className="login__button"
                >
                  Log In
                </Button>
              </div>
            </div>
          </form>
          <div className="login__text">
            <div className="login__text__heading">
              <h1>See what's happening in the world right now!</h1>
            </div>
            <div className="login__register__div">
              <Link to="/register" exact={"true"} className="login__register">
                New to Twitter? Create an account!
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
