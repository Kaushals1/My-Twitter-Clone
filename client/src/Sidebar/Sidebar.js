import React from "react";
import SidebarOption from "./SidebarOption/SidebarOption";
import TwitterIcon from "@material-ui/icons/Twitter";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Button } from "@material-ui/core";
import PopOver from "./PopOver";
import "./Sidebar.css";
function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__main">
        <div className="sidebar__icons">
          <SidebarOption active Icon={TwitterIcon} text="" />
          <SidebarOption active Icon={HomeIcon} text="Home" />
          <SidebarOption Icon={SearchIcon} text="Explore" />
          <SidebarOption Icon={NotificationsNoneIcon} text="Notifications" />
          <SidebarOption Icon={MailOutlineIcon} text="Messages" />
          <SidebarOption Icon={BookmarkBorderIcon} text="Bookmarks" />
          <SidebarOption Icon={ListAltIcon} text="Lists" />
          <SidebarOption Icon={PermIdentityIcon} text="Profile" />
          <SidebarOption Icon={MoreHorizIcon} text="More" />
        </div>
        <div className="sidebar__tweetButton">
          <Button variant="outlined" className="sidebar__btn">
            Tweet
          </Button>
          <div className="re">
            <TwitterIcon />
          </div>
        </div>
        <PopOver className="flexend" />
      </div>
    </div>
  );
}

export default Sidebar;
