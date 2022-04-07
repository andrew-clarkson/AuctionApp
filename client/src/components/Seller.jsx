import React from "react";

const Seller = (props) => {
  return (
    <div className="d-flex justify-content-between align-items-center my-0">
      <h6 className="">Seller: {props.name}</h6>
    </div>
  );
};

export default Seller;
