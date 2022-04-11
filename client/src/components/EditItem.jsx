import React, { useState } from "react";

const EditItem = (props) => {
  const [item, setItem] = useState({
    title: props.title,
    img: props.img,
    id: props.id,
  });

  //   console.log(item);

  const changeHandler = (event) => {
    let { name, value } = event.target;
    setItem((prevItem) => {
      return {
        ...prevItem,
        [name]: value,
      };
    });
  };
  //   console.log(item);
  const editUserItem = () => {
    // let data = {
    //   title: item.title,
    //   img: item.img,
    // };
    fetch("/edit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  return (
    <div
      className="modal fade"
      id="editModal"
      tabIndex="-1"
      aria-labelledby="editModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h6 className="modal-title fw-bold" id="editModalLabel">
              Edit Item
            </h6>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            <h3>Edit Item</h3>
            <div className="form-group">
              <form onSubmit={editUserItem}>
                <input
                  className="form-control"
                  name="title"
                  placeholder="Item Name"
                  onChange={changeHandler}
                  value={item.title}
                />

                <div>
                  <input
                    className="form-control"
                    name="img"
                    placeholder="ImageURL"
                    onChange={changeHandler}
                    value={item.img}
                  />
                  {/* <textarea
                    className="form-control"
                    name="desc"
                    placeholder="Description"
                    rows="3"
                    onChange={changeHandler}
                    value={item.title}
                  /> */}
                  <button className="btn btn-primary">Edit Item</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditItem;
