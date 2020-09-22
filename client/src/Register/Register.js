import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import TwitterIcon from "@material-ui/icons/Twitter";
import { Button } from "@material-ui/core";
import { GlobalState } from "../App";
import "./Register.css";
import Modal from "./Modal";
import Backdrop from "../Backdrop";
function Register() {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    dob: "",
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
      .post("http://localhost:5000/users/register", form)
      .then((data) => {
        setErrorMessage("");
        globalState.dispatch({ type: "UPDATE_POPUP", payload: true });
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

          setErrorMessage(err.response.data.errors[0].msg);
        }
      });
  };
  if (globalState.state.isLoggedIn) {
    return <Redirect to="/dashboard" />;
  } else {
    return (
      <div className="register">
        <Backdrop />
        <div className="register__background"></div>
        <div className="register__child">
          <div className="register__heading">
            <TwitterIcon />
            <h1>Create an account!</h1>
          </div>
          <div className={`register__error`}>{errorMessage}</div>

          <form onSubmit={submitSignIn} className="register__form">
            <div className="register__inputs">
              <div className="register__container">
                <input
                  autoComplete="off"
                  id="name"
                  name="name"
                  onChange={handleInputChange}
                  placeholder="name"
                  type="text"
                  required
                />
              </div>
              <div className="register__container">
                <input
                  autoComplete="off"
                  id="username"
                  name="username"
                  onChange={handleInputChange}
                  placeholder="username"
                  type="text"
                  required
                />
              </div>
              <div className="register__container">
                <input
                  autoComplete="off"
                  id="email"
                  name="email"
                  onChange={handleInputChange}
                  placeholder="emailid"
                  type="email"
                  required
                />
              </div>
              <div className="register__container">
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
              <div className="register__container">
                <input
                  autoComplete="off"
                  id="date"
                  name="dob"
                  onChange={handleInputChange}
                  placeholder="date"
                  type="date"
                  required
                />
              </div>
              <div className="register__btn">
                <Button
                  type="submit"
                  variant="outlined"
                  className="register__button"
                >
                  Sign Up
                </Button>
                <div className="login__link__div">
                  <Link to="/login" exact={"true"} className="login__link">
                    Already have an account? Click here to login
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
        <Modal register />
      </div>
    );
  }
}

export default Register;
