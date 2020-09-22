import React, { useState, useContext } from "react";
import Snackbar from "./Snackbar";
import axios from "axios";
import { GlobalState } from "../../App";

import "./TweetBox.css";
import { Avatar, Button } from "@material-ui/core";
function TweetBox() {
  const globalState = useContext(GlobalState);
  const [toggle, setToggle] = useState(false);
  const [tweet, setTweet] = useState({
    user: globalState.state.user.id,
    tweetText: "",
  });
  let handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (value && value.length > 0) {
      setToggle(true);
    } else {
      setToggle(false);
    }
    let obj = tweet;
    obj[name] = value;
    setTweet(obj);
  };
  const checking = (e) => {
    axios
      .post("/users/post", tweet)
      .then((data) => {
        globalState.dispatch({
          type: "UPDATE_T",
          payload: !globalState.state.t,
        });
        setToggle(false);
        globalState.dispatch({ type: "UPDATE_SNACK", payload: true });
        document.getElementById("tweetText").value = "";
      })
      .catch((err) => {
        alert('Server error! Try again later!');
      });
  };
  return (
    <div className="tweetBox">
      <form action="">
        <div className="tweetBox__input">
          <Avatar src={globalState.state.user.avatar} />
          <input
            onChange={handleInputChange}
            autoComplete="off"
            placeholder="What's happening?"
            type="text"
            name="tweetText"
            id="tweetText"
          />
        </div>

        <Button
          disabled={!toggle}
          className={`tweetBox__tweetButton ${!toggle && "btn__dis"}`}
          onClick={checking}
        >
          Tweet
        </Button>
      </form>
      <Snackbar />
    </div>
  );
}

export default TweetBox;
