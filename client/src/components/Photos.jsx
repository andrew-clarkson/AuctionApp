import React from "react";

const Photos = (props) => {
  return (
    <div className="crop">
      <img
        src={props.img}
        alt={props.title}
        className=" rounded card-img-top "
      />
    </div>
  );
};

export default Photos;
