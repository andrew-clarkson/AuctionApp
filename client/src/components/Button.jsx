import React from "react";

const Button = (props) => {
  const clickHandler = () => {
    props.handleClick();
    // event.preventDefault();
  };

  return (
    <div className="my-1">
      <button
        className={`btn btn-sm btn-outline-${props.color} px-3`}
        onClick={clickHandler}
      >
        {props.name}
      </button>
    </div>
  );
};

export default Button;
