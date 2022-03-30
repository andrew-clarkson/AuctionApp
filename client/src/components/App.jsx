import React, { useState, useEffect } from "react";
import AuctionItem from "./AuctionItem";
import { v4 as uuid } from "uuid";
import AddItem from "./AddItem";

const App = () => {
  //tutorial stuff================================
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);
  //end tutorial stuff============================

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
      index: items.length + 1,
      img: "https://picsum.photos/400/300",
    };

    //puts at end of list, so the list order changes each bid - fix this
    setItems(() => {
      return [...items, newItem];
    });
  };

  const addUserItem = (item) => {
    // console.log(item);
    //creating unique keys for items
    const newKey = uuid();

    let newItem = {
      key: newKey,
      id: newKey,
      title: item.title,
      bids: 0,
      price: 0,
      win: false,
      timer: "time",
      index: items.length + 1,
      img: item.img,
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
  const closeDate = new Date(2022, 3, 2, 10, 30, 0);

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
    let then = closeDate.getTime();
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
    <div className="container-fluid">
      <button onClick={addItem}>Add item</button>

      <AddItem addItem={addUserItem} />

      <div className="container">
        <p>{!data ? "Loading..." : data}</p>
        <h1>
          Close Date:{" "}
          {closeDate.toLocaleString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </h1>
        <h1>Today's Date: {date}</h1>
        <h1>Time only: {time}</h1>
        <h1>Time until soft close begins: {left}</h1>
        {/* <h1>Local Time: {time}</h1> */}
        {/* <h1>{time.replace("AM", "").replace("PM", "")}</h1> */}
        {/* <h2>{date}</h2> */}
      </div>
      <div className="row">
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
    </div>
  );
};

export default App;
