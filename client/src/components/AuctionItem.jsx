import React, { useState } from "react";
import Photos from "./Photos";
import BidCount from "./BidCount";
import CurrentBid from "./CurrentBid";
import TimeLeft from "./TimeLeft";
// import WinStatus from "./WinStatus";
import Button from "./Button";
import HighBidder from "./HighBidder";
import Seller from "./Seller";
import Title from "./Title";
import EditItem from "./EditItem";
import EditButton from "./EditButton";

const Item = (props) => {
  const [left, setleft] = useState();

  let sendBid = () => {
    props.sendBid(props.id);
  };

  let deleteItem = () => {
    props.deleteItem(props.id);
  };

  //START DATETIME
  // const closeDate = new Date(2022, 3, 2, 10, 30, 0);

  // const [date, setDate] = useState();
  // const [time, setTime] = useState();

  // let currentDate = () => {
  //   setDate(
  //     new Date().toLocaleDateString("en-US", {
  //       day: "numeric",
  //       month: "long",
  //       year: "numeric",
  //       hour: "2-digit",
  //       minute: "2-digit",
  //       second: "2-digit",
  //     })
  //   );
  // };

  // let updateTime = () => {
  //   setTime(new Date().toLocaleTimeString());
  // };
  let difference = 0;

  let timeLeft = () => {
    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    // const year = day * 365;

    let now = new Date().getTime();
    // console.log(now);
    let then = props.closeDate.getTime();
    // console.log(then);
    difference = then - now;
    let dif = difference + 20 * 1000 * props.index;
    let daysLeft = Math.floor(dif / day);
    let hoursLeft = Math.floor((dif / hour) % 24);
    let minutesLeft = Math.floor((dif / minute) % 60);
    let secondsLeft = Math.floor((dif / 1000) % 60);

    // let timer =
    //   daysLeft === 0
    //     ? `${hoursLeft}H:${minutesLeft}M:${secondsLeft}S`
    //     : `${daysLeft}D:${hoursLeft}H:${minutesLeft}M:${secondsLeft}S`;
    let timer = 0;
    switch (true) {
      case daysLeft > 0:
        timer = `${daysLeft}D ${hoursLeft}H ${minutesLeft}M ${secondsLeft}S left`;
        break;
      case hoursLeft > 0:
        timer = `${hoursLeft}H ${minutesLeft}M ${secondsLeft}S left`;
        break;
      case minutesLeft > 0:
        timer = `${minutesLeft}M ${secondsLeft}S left`;
        break;
      case secondsLeft > 0:
        timer = `${secondsLeft}S left`;
        break;
      default:
        timer = `Bidding Closed`;
    }

    // let timer = `${daysLeft}D:${hoursLeft}H:${minutesLeft}M:${secondsLeft}S`;
    // let timer2 = dif.toTimeString();
    setleft(timer);
  };

  // setInterval(currentDate, 1000);
  // setInterval(updateTime, 1000);
  setInterval(timeLeft, 1000);

  //END DATETIME

  // if (props.user) {
  //   console.log(props.user.id, props.highBidderId);
  // }

  let newBid = () => {
    let price = props.price;
    let increase = 0;

    switch (true) {
      case price < 10:
        increase = 1;
        break;
      case price < 50:
        increase = 2;
        break;
      case price < 100:
        increase = 5;
        break;
      case price < 500:
        increase = 10;
        break;
      case price < 1000:
        increase = 25;
        break;
      case price < 10000:
        increase = 100;
        break;
      default:
        increase = 500;
    }
    return props.price + increase;
  };
  // console.log(newBid());

  let biddingClosed = () => {
    alert("Bidding has closed for this item.");
  };

  return (
    <div className="container my-0 px-0 d-flex justify-content-center align-items-center col-sm-6 col-lg-4 col-xl-3">
      <div className="card border-0">
        <Photos img={props.img} title={props.title} />
        <div className="btn-group d-flex justify-content-between align-items-center">
          {props.user ? (
            <Button
              handleClick={left !== "Bidding Closed" ? sendBid : biddingClosed}
              name={
                props.user.id !== props.highBidderId
                  ? `BID $${newBid()}`
                  : "WINNING"
              }
              color={
                props.user.id !== props.highBidderId ? "primary" : "success"
              }
            />
          ) : (
            <h6 className="mx-auto">**Please log in to bid**</h6>
          )}

          {props.user && props.user.id === props.sellerId ? (
            <EditButton title={props.title} img={props.img} id={props.id} />
          ) : null}

          {/* <EditButton title={props.title} img={props.img} /> */}

          {props.user && props.user.id === props.sellerId ? (
            <Button handleClick={deleteItem} name="DELETE" color="danger" />
          ) : null}
        </div>
        <div className="d-flex justify-content-between align-items-center my-0 ">
          <Title title={props.title} />
          <BidCount bids={props.bids} />
        </div>
        <div className="d-flex justify-content-between align-items-center my-0">
          <CurrentBid price={props.price} />
          <TimeLeft time={left} difference={difference} />
        </div>

        <div>
          <HighBidder name={props.user ? props.highBidder : "******"} />
          <Seller name={props.user ? props.seller : "******"} />
        </div>

        {/* {props.user ? (
          <div>
            <HighBidder name={props.highBidder} />
            <Seller name={props.seller} />
          </div>
        ) : (
          <h6>Log in to see Winning Bid / Seller</h6>
        )} */}
      </div>
      {/* <EditItem title={props.title} img={props.img} /> */}
    </div>
  );
};

export default Item;
