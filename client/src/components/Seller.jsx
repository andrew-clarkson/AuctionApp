import React from "react";

const Seller = (props) => {
  return (
    <p className="d-flex justify-content-between align-items-center px-2">
      Seller: {props.name}
    </p>
  );
};

export default Seller;
