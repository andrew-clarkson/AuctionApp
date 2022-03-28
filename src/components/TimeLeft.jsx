import React from "react";

const TimeLeft = (props) => {
  return (
    <div className="d-flex justify-content-between align-items-center px-2">
      <h5>{props.time} left</h5>
    </div>
  );
};

export default TimeLeft;
