import React, { useState } from "react";
import AuctionItem from "./AuctionItem";
import { v4 as uuid } from "uuid";

const App = () => {
  // full list of auction items
  const [items, setItems] = useState([]);

  let addItem = () => {
    //creating unique keys for items
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
      index: items.length + 1,
    };

    //puts at end of list, so the list order changes each bid - fix this
    setItems(() => {
      return [...items, newItem];
    });
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

  // console.log(items);

  // const closeDate = new Date("29 March 2022 24:00:00 UTC-5").toLocaleDateString(
  //   "en-US",
  //   {
  //     day: "numeric",
  //     month: "long",
  //     year: "numeric",
  //     hour: "2-digit",
  //     minute: "2-digit",
  //   }
  // );

  //START DATETIME
  const closeDate = new Date(2022, 2, 30, 10, 30, 0).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [left, setleft] = useState();

  let currentDate = () => {
    setDate(
      new Date().toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    );
  };

  let updateTime = () => {
    setTime(new Date().toLocaleTimeString());
  };

  let timeLeft = () => {
    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    // const year = day * 365;

    let now = new Date().getTime();
    // console.log(now);
    let then = new Date(2022, 2, 30, 10, 30, 0).getTime();
    // console.log(then);
    let dif = then - now;
    let daysLeft = Math.floor(dif / day);
    let hoursLeft = Math.floor((dif / hour) % 24);
    let minutesLeft = Math.floor((dif / minute) % 60);
    let secondsLeft = Math.floor((dif / 1000) % 60);

    let timer = `${daysLeft} Days, ${hoursLeft}H:${minutesLeft}M:${secondsLeft}S`;
    // let timer2 = dif.toTimeString();
    setleft(timer);
  };

  setInterval(currentDate, 1000);
  setInterval(updateTime, 1000);
  setInterval(timeLeft, 1000);

  //END DATETIME

  return (
    <div>
      <button onClick={addItem}>Add item</button>

      <div className="container">
        <h1>Close Date: {closeDate}</h1>
        <h1>Today's Date: {date}</h1>
        <h1>Time only: {time}</h1>
        <h1>Time until Close: {left}</h1>
        {/* <h1>Local Time: {time}</h1> */}
        {/* <h1>{time.replace("AM", "").replace("PM", "")}</h1> */}
        {/* <h2>{date}</h2> */}
      </div>

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
          index={item.index}
          sendBid={sendBid}
        />
      ))}
    </div>
  );
};

export default App;
