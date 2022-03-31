import React, { useState, useEffect } from "react";
import AuctionItem from "./AuctionItem";
import { v4 as uuid } from "uuid";
import AddItem from "./AddItem";
import Navbar from "./Navbar";
import Footer from "./Footer";

const App = () => {
  const [items, setItems] = useState([]);
  //tutorial stuff================================
  // const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/all")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  //end tutorial stuff============================

  // const getAll = () => {
  //   fetch("/all")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message));
  // };

  // getAll();
  // console.log(data);

  // full list of auction items

  // let addItem = () => {
  //   //creating unique keys for items
  //   const newKey = uuid();

  //   let newItem = {
  //     key: newKey,
  //     id: newKey,
  //     title: "Clocks",
  //     bids: 0,
  //     price: 0,
  //     highBidder: "Andrew",
  //     index: items.length + 1,
  //     img: "https://picsum.photos/400/300",
  //   };

  //   // console.log(newItem);

  //   //puts at end of list, so the list order changes each bid - fix this
  //   setItems(() => {
  //     return [...items, newItem];
  //   });
  // };

  const addUserItem = (item) => {
    // console.log("add clicked");
    //creating unique keys for items
    const newKey = uuid();

    let data = {
      key: newKey,
      id: newKey,
      title: item.title,
      bids: 0,
      price: 0, //store in cents
      highBidder: "Bobby",
      seller: "seller name",
      index: items.length + 1,
      img: item.img,
    };

    console.log(data);

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

  const sendBid = (id) => {
    // pull out item that has been bid on
    let newBid = items.filter((items) => items.id === id);
    // console.log(newBid[0].bids);
    // deconstruct items to update
    const { bids, price } = newBid[0];

    // create array with all other items
    let curentBids = items.filter((items) => items.id !== id);

    setItems(() => {
      return [
        ...curentBids,
        {
          ...newBid[0],
          bids: bids + 1,
          price: price + 1,
        },
      ];
    });

    // setItems(() => {

    // })
  };

  const deleteItem = (id) => {
    // console.log(id);
    fetch("/delete", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: id,
    })
      .then((response) => response)
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  //
  const closeDate = new Date(2022, 3, 2, 10, 30, 0);
  //

  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        {/* <button onClick={addItem}>Add item</button> */}

        <div className="container">
          {/* <p>{!data ? "Loading..." : data}</p> */}
          <h4>
            Soft Close Begins at:{" "}
            {closeDate.toLocaleString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </h4>
          {/* <h4>Today's Date: {date}</h4> */}
          {/* <h4>Time only: {time}</h4> */}
          {/* <h4>Time until soft close begins: {left}</h4> */}
          {/* <h1>Local Time: {time}</h1> */}
          {/* <h1>{time.replace("AM", "").replace("PM", "")}</h1> */}
          {/* <h2>{date}</h2> */}
        </div>
        <AddItem addItem={addUserItem} />
        <div className="row">
          {items
            .map((item) => (
              <AuctionItem
                key={item.key}
                id={item.id}
                title={item.title}
                bids={item.bids}
                price={item.price}
                highBidder={item.highBidder}
                closeDate={closeDate}
                img={item.img}
                index={item.index}
                sendBid={sendBid}
                deleteItem={deleteItem}
              />
            ))
            .sort()}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
