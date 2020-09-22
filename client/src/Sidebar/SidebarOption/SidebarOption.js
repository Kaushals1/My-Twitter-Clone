import React, { useContext } from "react";
import "./SidebarOption.css";
import { GlobalState } from "../../App";

function SidebarOption({ active, text, Icon }) {
  const globalState = useContext(GlobalState);
  return (
    <div
      onClick={() => {
        text.length > 1
          ? globalState.dispatch({ type: "UPDATE_FEEDHEADER", payload: text })
          : globalState.dispatch({
              type: "UPDATE_FEEDHEADER",
              payload: "Home",
            });
      }}
      className={`sidebarOption ${active && "sidebarOption--active"}`}
    >
      <Icon />
      <h2>{text}</h2>
    </div>
  );
}

export default SidebarOption;
