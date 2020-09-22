import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./Home/Home";
import Register from "./Register/Register";
import Login from "./Login/Login";
import { PrivateRoute } from "./PrivateRoute";
function Routes() {
  return (
    <div>
      <Switch>
        <PrivateRoute exact path="/dashboard" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route render={() => <Redirect to={{ pathname: "/" }} />} />
      </Switch>
    </div>
  );
}

export default Routes;
