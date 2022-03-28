import React from "react";

const WinStatus = (props) => {
  return <span>{props.win ? "Winning" : "Losing"}</span>;
};

export default WinStatus;
