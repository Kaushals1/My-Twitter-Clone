import React, { useContext } from "react";
import Box from "@material-ui/core/Box";
import Popover from "@material-ui/core/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import TwitterIcon from "@material-ui/icons/Twitter";
import { Avatar } from "@material-ui/core";
import { GlobalState } from "../App";
import Modal from "../Register/Modal";
import "./PopOver.css";
export default function PopoverPopupState() {
  const globalState = useContext(GlobalState);
  const logout = (e) => {
    e.preventDefault();
    globalState.dispatch({ type: "UPDATE_POPUP", payload: true });
  };
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <div
            className="flexend"
            variant="contained"
            color="primary"
            {...bindTrigger(popupState)}
          >
            <div className="sidebar__bottom">
              <div className="avatar">
                <Avatar src={globalState.state.user.avatar} />
              </div>
              <div className="bottom__info">
                <p className="first">{globalState.state.user.name}</p>
                <p className="second">@{globalState.state.user.username}</p>
              </div>
              <div className="end">
                <TwitterIcon />
              </div>
            </div>
          </div>

          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
          >
            <Box>
              <div className="popup__main">
                <div className="popup__head">
                  <div className="avatar">
                    <Avatar src={globalState.state.user.avatar} />
                  </div>
                  <div className="bottom__info__popup">
                    <p className="first">{globalState.state.user.name}</p>
                    <p className="second">@{globalState.state.user.username}</p>
                  </div>
                  <div className="end__popup">
                    <TwitterIcon />
                  </div>
                </div>
                <div onClick={logout} className="popup__logout">
                  <p>Log out</p>
                </div>
              </div>
              <Modal />
            </Box>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}
