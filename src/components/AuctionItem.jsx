import React, { useState } from "react";
import Photos from "./Photos";
import BidCount from "./BidCount";
import CurrentBid from "./CurrentBid";
import TimeLeft from "./TimeLeft";
import WinStatus from "./WinStatus";
import Button from "./Button";

const Item = (props) => {
  let sendBid = () => {
    props.sendBid(props.id);
  };

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
    let dif = then - now + 20 * 1000 * props.index;
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
    <div className="container mt-5 mb-5 d-flex justify-content-center align-items-center">
      <div className="card">
        <div className="inner-card">
          <Photos img={props.img} title={props.title} />
          <div className="d-flex justify-content-between align-items-center mt-2 px-2">
            <h5>{props.title}</h5>
            <span>
              <BidCount bids={props.bids} />
            </span>
          </div>
          <div className="d-flex justify-content-between align-items-center px-2">
            <CurrentBid price={props.price} />
            <WinStatus win={props.win} />
          </div>
          <TimeLeft time={left} />
          <Button handleClick={sendBid} />
        </div>
      </div>
    </div>
  );
};

export default Item;
