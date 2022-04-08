import React, { useState } from "react";
import { v4 as uuid } from "uuid";

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

  // // const submitHandler = (event) => {
  // //   props.addItem(item);
  // //   setItem("");
  // //   //need a refresh here to add new item immediately
  // //   // event.preventDefault();
  // // };

  // const clickHandler = (event) => {
  //   // console.log("click");
  //   // isExpanded ? setIsExpanded(false) : setIsExpanded(true);
  //   setIsExpanded(true);
  // };

  const addUserItem = () => {
    //creating unique keys for items
    const newKey = uuid();

    let data = {
      key: newKey,
      id: newKey,
      title: item.title,
      bids: 0,
      price: 0, //store in cents
      highBidder: "0",
      highBidderId: "",
      seller: props.loggedIn.username,
      sellerId: props.loggedIn.id,
      img: item.img,
    };

    console.log("client: ", data);

    fetch("/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });

    //puts at end of list, so the list order changes each bid - fix this in order of closing
    // setItems(() => {
    //   return [...items, data];
    // });
  };

  return (
    <div
      className="modal fade"
      id="addModal"
      tabIndex="-1"
      aria-labelledby="addModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h6 className="modal-title fw-bold" id="addModalLabel">
              Add Item To The Auction
            </h6>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            {/* <h3>Add an Item</h3> */}
            <div className="form-group">
              <form onSubmit={addUserItem}>
                <label htmlFor="title">Item Title</label>
                <input
                  className="form-control"
                  name="title"
                  placeholder=""
                  onChange={changeHandler}
                  value={item.title || ""}
                />

                <div className="mt-2">
                  <label htmlFor="img">Image URL</label>
                  <input
                    className="form-control"
                    name="img"
                    placeholder=""
                    onChange={changeHandler}
                    value={item.img || ""}
                  />
                  {/* <textarea
                    className="form-control"
                    name="desc"
                    placeholder="Description"
                    rows="3"
                    onChange={changeHandler}
                    value={item.desc || ""}
                  /> */}
                  <button className="btn btn-primary mt-4">Add Item</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    // <div className="form-group">
    //   <form onSubmit={submitHandler}>
    //     <input
    //       className="form-control"
    //       name="title"
    //       placeholder="Item Name"
    //       onChange={changeHandler}
    //       onClick={clickHandler}
    //       value={item.title || ""}
    //     />

    //     {isExpanded === true ? (
    //       <div>
    //         <input
    //           className="form-control"
    //           name="img"
    //           placeholder="ImageURL"
    //           onChange={changeHandler}
    //           value={item.img || ""}
    //         />
    //         <textarea
    //           className="form-control"
    //           name="desc"
    //           placeholder="Description"
    //           rows="3"
    //           onChange={changeHandler}
    //           value={item.desc || ""}
    //         />
    //         <button className="btn btn-primary">Add Item</button>
    //       </div>
    //     ) : null}
    //   </form>
    // </div>
  );
};

export default AddItem;
