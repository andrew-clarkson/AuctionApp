import React, { useState, useEffect, createContext } from "react";
import AuctionItem from "./AuctionItem";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LoginForm from "./RegisterForm";
// const UserContext = createContext();

const App = () => {
  //
  const closeDate = new Date(2022, 3, 14, 14, 20, 0);
  //

  const [items, setItems] = useState([]);
  const [loggedIn, setLoggedIn] = useState();

  const getAll = () => {
    fetch("/all")
      .then((res) => res.json())
      .then((data) => setItems(data));
  };

  //candidate for useEffect?
  const isLoggedIn = () => {
    fetch("/loggedin")
      .then((res) => res.json())
      .then((data) => setLoggedIn(data));
  };

  useEffect(() => {
    getAll();
    isLoggedIn();
  }, []);

  const sendBid = (itemID) => {
    let newBid = items.filter((items) => items.id === itemID);
    const { bids, price } = newBid[0];
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

    let updatedBid = {
      bids: bids + 1,
      price: price + increase,
      id: itemID,
      highBidderID: loggedIn.id,
    };

    fetch("/bid", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBid),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        getAll(); //this makes it refresh immediately - ok tho?
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  const deleteItem = (id) => {
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
    getAll();
  };

  return (
    <div>
      <Navbar user={loggedIn} />
      <div className="container ">
        <div className="container">
          <h4 className="text-center">Auction Close begins at:</h4>
          <h5 className="text-center">
            {closeDate.toLocaleString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "numeric",
              minute: "2-digit",
            })}
          </h5>
        </div>

        <div className="row ">
          {items
            .map((item, index) => (
              <AuctionItem
                key={item.key}
                id={item.id}
                title={item.title}
                bids={item.bids}
                price={item.price}
                highBidder={item.highBidder}
                highBidderId={item.highBidderId}
                seller={item.seller}
                sellerId={item.sellerId}
                closeDate={closeDate}
                img={item.img}
                index={index}
                sendBid={sendBid}
                deleteItem={deleteItem}
                user={loggedIn}
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
