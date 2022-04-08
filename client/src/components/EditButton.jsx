import React from "react";
import EditItem from "./EditItem";

const EditButton = (props) => {
  return (
    <div className="my-1">
      <button
        className="btn btn-sm btn-outline-dark px-3"
        data-bs-toggle="modal"
        data-bs-target="#editModal"
      >
        EDIT
      </button>
      <EditItem title={props.title} img={props.img} id={props.id} />
    </div>
  );
};

export default EditButton;
