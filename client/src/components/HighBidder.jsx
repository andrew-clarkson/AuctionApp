import React from "react";

const HighBidder = (props) => {
  return (
    <p className="d-flex justify-content-between align-items-center px-2">
      High Bidder: {props.name}
    </p>
  );
};

export default HighBidder;
