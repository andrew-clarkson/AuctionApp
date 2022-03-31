import React from "react";

const Button = (props) => {
  const onClick = (event) => {
    props.handleClick();
    event.preventDefault();
  };

  return (
    <div className="px-2 mt-3">
      <button className="btn btn-success px-3" onClick={onClick}>
        {props.name}
      </button>
    </div>
  );
};

export default Button;
