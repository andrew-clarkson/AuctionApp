import React, { useState } from "react";
import Photos from "./Photos";
import BidCount from "./BidCount";
import CurrentBid from "./CurrentBid";
import TimeLeft from "./TimeLeft";
import Button from "./Button";
import HighBidder from "./HighBidder";
import Seller from "./Seller";
import Title from "./Title";
import EditButton from "./EditButton";

const Item = (props) => {
  const [left, setleft] = useState();

  let sendBid = () => {
    props.sendBid(props.id);
  };

  let deleteItem = () => {
    props.deleteItem(props.id);
  };

  let difference = 0;

  let timeLeft = () => {
    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;

    let now = new Date().getTime();
    let then = props.closeDate.getTime();
    difference = then - now;
    let dif = difference + 20 * 1000 * props.index;
    let daysLeft = Math.floor(dif / day);
    let hoursLeft = Math.floor((dif / hour) % 24);
    let minutesLeft = Math.floor((dif / minute) % 60);
    let secondsLeft = Math.floor((dif / 1000) % 60);

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

    setleft(timer);
  };

  setInterval(timeLeft, 1000);

  //END DATETIME

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
      </div>
    </div>
  );
};

export default Item;
