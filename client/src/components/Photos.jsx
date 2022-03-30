import React from "react";

const Photos = (props) => {
  return (
    <img src={props.img} alt={props.title} className="img-fluid rounded" />
  );
};

export default Photos;
