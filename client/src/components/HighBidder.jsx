import React from "react";

const HighBidder = (props) => {
  return (
    <div className="d-flex justify-content-between align-items-center my-0">
      <h6 className="">High Bidder: {props.name}</h6>
    </div>
  );
};

export default HighBidder;
