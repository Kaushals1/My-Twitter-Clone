import React from "react";
import "./Widgets.css";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import { TwitterTweetEmbed } from "react-twitter-embed";
function Widgets() {
  return (
    <div className="widgets">
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlinedIcon />
          <input placeholder="Search Twitter" type="text" />
        </div>
      </div>
      <div className="one">
        <p className="same1">What's Happening?</p>
        <TwitterTweetEmbed
          className="mytweet"
          tweetId={"1308296863632601090"}
        />
        <p className="same2">Show More</p>
      </div>
    </div>
  );
}

export default Widgets;
