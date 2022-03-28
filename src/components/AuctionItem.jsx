import React from "react";
import Photos from "./Photos";
import BidCount from "./BidCount";
import CurrentBid from "../CurrentBid";
import TimeLeft from "./TimeLeft";
import WinStatus from "./WinStatus";
import Button from "./Button";

const Item = (props) => {
  let sendBid = () => {
    props.sendBid(props.id);
  };

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
          <TimeLeft time="3d 12h 34s" />
          <Button handleClick={sendBid} />
        </div>
      </div>
    </div>
  );
};

export default Item;
