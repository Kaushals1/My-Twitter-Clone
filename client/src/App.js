import React, { createContext, useReducer } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./Landing/Landing";
import Routes from "./Routes";
import jwt_decode from "jwt-decode";
import setAuthToken from "./setAuthToken";
export const GlobalState = createContext();
const tkn = localStorage.getItem("token");
let login = false;
let decoded = "";
if (tkn && tkn.length > 0) {
  decoded = jwt_decode(tkn);
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    login = false;
    localStorage.removeItem("token");
    setAuthToken(false);
  } else {
    login = true;
    setAuthToken(tkn);
  }
}
const initialState = {
  isLoggedIn: login,
  popup: false,
  user: decoded.user,
  feedHeader: "Home",
  t: false,
  snack: false,
  bdrop: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_LOGIN":
      return { ...state, isLoggedIn: action.payload };
    case "UPDATE_POPUP":
      return { ...state, popup: action.payload };
    case "UPDATE_USER":
      return { ...state, user: action.payload };
    case "UPDATE_FEEDHEADER":
      return { ...state, feedHeader: action.payload };
    case "UPDATE_T":
      return { ...state, t: action.payload };
    case "UPDATE_SNACK":
      return { ...state, snack: action.payload };
    case "UPDATE_BDROP":
      return { ...state, bdrop: action.payload };
    default:
      return 0;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <GlobalState.Provider value={{ state: state, dispatch: dispatch }}>
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route component={Routes} />
        </Switch>
      </Router>
    </GlobalState.Provider>
  );
}

export default App;
