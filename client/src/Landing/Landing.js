import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { GlobalState } from "../App";
import "./Landing.css";
function Landing() {
  const globalState = useContext(GlobalState);

  if (globalState.state.isLoggedIn) {
    return <Redirect to="/dashboard" />;
  } else {
    return (
     
      <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="x-large">
              My <span className="t__span"> Twitter</span> Clone
            </h1>
            <p className="lead">
              To get started, either sign up as a new user or login by clicking
              below!
            </p>
            <div className="buttons">
              <Link className='parent__link' to="/register">
                <div className="landing__register">
                  <Link  to="/register" className="landing__register__link">Sign Up</Link>
                </div>
              </Link>
              <Link className='parent__link' to="/login" >
                <div className="landing__login">
                  <Link  to="/login"  className="landing__login__link">
                    Login
                  </Link>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Landing;
