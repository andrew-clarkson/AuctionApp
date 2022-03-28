import React from "react";

const Item = () => {
  return (
    <div className="container mt-5 mb-5 d-flex justify-content-center align-items-center">
      <div className="card">
        <div className="inner-card">
          {/* {" "} */}
          <img
            src="https://www.liveabout.com/thmb/SWvawPWfkNVUpCyuclJ269S745w=/3548x2661/smart/filters:no_upscale()/old-clocks-670829828-5aea5f5aff1b780036cb9cce.jpg"
            className="img-fluid rounded"
          />
          <div className="d-flex justify-content-between align-items-center mt-2 px-2">
            <h5>Title of Item For Sale</h5>{" "}
            <span>
              <p>32 Bids</p>
            </span>
          </div>
          <div className="d-flex justify-content-between align-items-center px-2">
            <h3>$500</h3>
            <span>Winning/Losing</span>
          </div>

          <div className="d-flex justify-content-between align-items-center px-2">
            <h5>3d 12h 34s left</h5>
          </div>

          {/* <div className="mt-2 px-2">
            {" "}
            <small>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium
            </small>{" "}
          </div> */}

          <div className="px-2 mt-3">
            {" "}
            <button className="btn btn-success px-3">PLACE A BID</button>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
