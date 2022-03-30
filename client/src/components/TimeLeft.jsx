import React from "react";

const TimeLeft = (props) => {
  return (
    <div className="d-flex justify-content-between align-items-center px-2">
      <p>{props.time} left</p>
    </div>
  );
};

export default TimeLeft;
