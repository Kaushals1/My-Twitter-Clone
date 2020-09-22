import React, { useState, useContext, useEffect } from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PublishIcon from "@material-ui/icons/Publish";
import Axios from "axios";
import { GlobalState } from "../../App";

import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
const useStyles = makeStyles((theme) => ({
  croot: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2)
    },
  },
  progress: {
    marginTop: "50px",
    margin: "auto",
    width: "80px !important",
    height: "80px !important",
  },
}));
function Post({ displayName, username, verified, text, image, avatar }) {
  const classes = useStyles();
  const [array, setArray] = useState([]);
  const globalState = useContext(GlobalState);

  useEffect(() => {
    Axios.get("http://localhost:5000/users/tweets").then((response) => {
      setTimeout(() => {
        setArray(response.data);
      }, 100);
    });
  }, [globalState.state.t]);

  if (array.length === 0) {
    return (
      <div className={classes.croot}>
        <CircularProgress className={classes.progress} />
      </div>
    );
  } else {
    return (
      <div>
        {array.map((tweet, index) => {
          return (
            <div key={index} className="post">
              <div className="post__avatar">
                <Avatar src={tweet.avatar} />
              </div>
              <div className="post__body">
                <div className="post__header">
                  <div className="post__headerText">
                    <h3>
                      {tweet.name}
                      <span className="post__headerSpecial">
                        @ {tweet.username}
                      </span>
                    </h3>
                  </div>
                  <div className="post__headerDescription">
                    <p>{tweet.tweet}</p>
                  </div>
                </div>
                {/* <div className="tp">
                  <img src={require("./pic.jpg")} alt="" />
                </div> */}
                <div className="post__footer">
                  <ChatBubbleOutlineIcon fontSize="small" />
                  <RepeatIcon fontSize="small" />
                  <FavoriteBorderIcon fontSize="small" />
                  <PublishIcon fontSize="small" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Post;
