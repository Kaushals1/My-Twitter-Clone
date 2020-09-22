import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { GlobalState } from "./App";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const globalState = useContext(GlobalState);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (globalState.state.isLoggedIn) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/" />;
        }
      }}
    />
  );
};
