import React, { useState } from "react";
import AuctionItem from "./AuctionItem";
import { v4 as uuid } from "uuid";

const App = () => {
  const [items, setItems] = useState([]);

  let addItem = () => {
    const newKey = uuid();

    let newItem = {
      key: newKey,
      id: newKey,
      title: "Clocks",
      bids: 0,
      price: 0,
      win: false,
      timer: "time",
      img: "https://picsum.photos/400/300",
    };

    setItems(() => {
      return [...items, newItem];
    });
  };

  const sendBid = (id) => {
    // console.log(id);
    let newBid = items.filter((items) => items.id === id);
    console.log(newBid);

    // setItems(() => {

    // })
  };

  console.log(items);

  return (
    <div>
      <button onClick={addItem}>Add item</button>
      {items.map((item) => (
        <AuctionItem
          key={item.key}
          id={item.id}
          title={item.title}
          bids={item.bids}
          price={item.price}
          win={item.win}
          timer={item.timer}
          img={item.img}
          sendBid={sendBid}
        />
      ))}
    </div>
  );
};

export default App;
