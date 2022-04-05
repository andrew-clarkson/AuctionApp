import React, { useState, useEffect, createContext } from "react";
import AuctionItem from "./AuctionItem";
import { v4 as uuid } from "uuid";
import AddItem from "./AddItem";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LoginForm from "./LoginForm";
// const UserContext = createContext();

const App = () => {
  const [items, setItems] = useState([]);
  const [isShowLogin, setIsShowLogin] = useState(false);
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState();

  const getAll = () => {
    fetch("/all")
      .then((res) => res.json())
      .then((data) => setItems(data));
  };

  // const getUser = () => {
  //   fetch("/getuser")
  //     .then((res) => res.json())
  //     .then((data) => setUser(data));
  // };

  const isLoggedIn = () => {
    fetch("/loggedin")
      .then((res) => res.json())
      .then((data) => setLoggedIn(data));
  };

  useEffect(() => {
    getAll();
    // getUser();
    isLoggedIn();
  }, []);

  console.log(loggedIn);
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
      index: items.length + 1, //fix this, no good
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
    // deconstruct items to update
    const { bids, price } = newBid[0];
    // console.log(bids, price);
    let increase = 0;

    switch (true) {
      case price < 10:
        increase = 1;
        break;
      case price < 50:
        increase = 2.5;
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
      id: id,
    };

    fetch("/bid", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBid),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data); //not showing? I think because promise isnt being handled correctly
      })
      .catch((error) => {
        console.log("Error:", error);
      });

    // // create array with all other items
    // let currentBids = items.filter((items) => items.id !== id);
    // setItems(() => {
    //   return [
    //     ...currentBids,
    //     {
    //       ...newBid[0],
    //       updatedBid,
    //     },
    //   ];
    // });

    getAll();
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
    getAll();
  };

  //
  const closeDate = new Date(2022, 3, 1, 14, 20, 0);
  //

  const handleLoginClick = () => {
    setIsShowLogin(!isShowLogin);
    console.log(isShowLogin);
  };

  return (
    <div>
      <Navbar user={loggedIn} handleLoginClick={handleLoginClick} />
      {isShowLogin ? (
        <LoginForm isShowLogin={isShowLogin} closeHandler={handleLoginClick} />
      ) : null}
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
                seller={item.seller}
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
