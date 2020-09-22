import React, { useContext } from "react";
import TweetBox from "./TweetBox/TweetBox";
import Post from "./Post/Post";
import Widgets from "../Widgets/Widgets";
import { GlobalState } from "../App";

import "./Feed.css";
function Feed() {
  const globalState = useContext(GlobalState);

  return (
    <div className="feed__main">
      <div className="feed">
        <div className="feed__header">
          <h2>{globalState.state.feedHeader}</h2>
        </div>
        <div className="feed__scroll">
          <div className="tweetbox">
            <TweetBox />
          </div>
          <div className="posts">
            <Post />
          </div>
        </div>
      </div>
      <div className="widgets__main">
        <Widgets />
      </div>
    </div>
  );
}

export default Feed;
