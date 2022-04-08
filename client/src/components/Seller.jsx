import React from "react";

const Seller = (props) => {
  let displayName = "user";
  if (props.name.includes("@")) {
    displayName = props.name.split("@")[0];
  } else {
    displayName = props.name.split(" ")[0];
  }
  return (
    <div className="d-flex justify-content-between align-items-center my-0">
      <h6 className="">Seller: {displayName}</h6>
    </div>
  );
};

export default Seller;
