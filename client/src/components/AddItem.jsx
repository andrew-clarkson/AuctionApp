import React, { useState } from "react";

const AddItem = (props) => {
  const [item, setItem] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const changeHandler = (event) => {
    let { name, value } = event.target;
    setItem((prevItem) => {
      return {
        ...prevItem,
        [name]: value,
      };
    });
    // console.log(item);
  };

  const submitHandler = (event) => {
    props.addItem(item);
    setItem("");
    //need a refresh here to add new item immediately
    // event.preventDefault();
  };

  const clickHandler = (event) => {
    // console.log("click");
    // isExpanded ? setIsExpanded(false) : setIsExpanded(true);
    setIsExpanded(true);
  };

  return (
    <div className="form-group">
      <form onSubmit={submitHandler}>
        <input
          className="form-control"
          name="title"
          placeholder="Item Name"
          onChange={changeHandler}
          onClick={clickHandler}
          value={item.title || ""}
        />

        {isExpanded === true ? (
          <div>
            <input
              className="form-control"
              name="img"
              placeholder="ImageURL"
              onChange={changeHandler}
              value={item.img || ""}
            />
            <textarea
              className="form-control"
              name="desc"
              placeholder="Description"
              rows="3"
              onChange={changeHandler}
              value={item.desc || ""}
            />
            <button className="btn btn-primary">Add Item</button>
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default AddItem;
