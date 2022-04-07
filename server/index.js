//jshint esversion:6
//https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/
require("dotenv").config();
const path = require("path");
const express = require("express");
// import bodyParser from "body-parser";
// const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// import mongoose from "mongoose";
// import "dotenv/config";
const PORT = process.env.PORT || 3001;
const app = express();
const pass = process.env.DBPASSWORD;
// import { v4 as uuid } from "uuid";
const { v4: uuid } = require("uuid");
// const bodyParser = require("body-parser");

// for passport.js:
const session = require("express-session");
const passport = require("passport");
//passport-local installed, do not have to set
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");

// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );

//config session for express
app.use(
  session({
    secret: process.env.EXPRESS_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// need this to parse the json with the req
app.use(express.json());
app.use(express.text());

const uri =
  "mongodb+srv://user1:" +
  pass +
  "@tallsoup.428jc.mongodb.net/AuctionDB?retryWrites=true&w=majority";

//connect to Mongo
mongoose
  .connect(uri)
  .then(() => console.log("Now connected to MongoDB!"))
  .catch((err) => console.error("Something went wrong", err));

//Schema
const itemSchema = new mongoose.Schema({
  key: String,
  id: String,
  title: String,
  bids: Number,
  price: Number, //will be stored in cents?
  highBidder: String,
  seller: String,
  img: String,
});

const userSchema = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
  googleId: String,
  watchList: String,
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

//Model
const Item = mongoose.model("Item", itemSchema);
const User = new mongoose.model("User", userSchema);

// CHANGE: USE "createStrategy" INSTEAD OF "authenticate" This is the "simplified" version that creates the locate strat
passport.use(User.createStrategy());

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username, name: user.displayName });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

let userDetails = {};

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3001/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
      User.findOrCreate(
        { googleId: profile.id, username: profile.displayName },
        function (err, user) {
          userDetails = profile;
          return cb(err, user);
        }
      );
    }
  )
);

const createItem = () => {
  //creating unique keys for items
  const newKey = uuid();
  const item = new Item({
    key: newKey,
    id: newKey,
    title: "Sample Item",
    bids: 0,
    price: 0,
    highBidder: "Jack",
    seller: "Andrew",
    index: 4, //fix
    img: "https://picsum.photos/400/300",
  });
  return item;
};

const sendItem = () => {
  let item = createItem();
  item.save();
  console.log(item);
  // try {
  //   res.redirect("/");
  // } catch (error) {
  //   console.log(error);
  // }
};

// sendItem();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));

const loggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    console.log("not logged in");
    // res.redirect('/login');
  }
};

//ROUTES

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:3000" }), //add a failure to login notification
  function (req, res) {
    // Successful authentication, redirect to secrets
    res.redirect("http://localhost:3000");
  }
);

// app.post("/login", (req, res) => {
//   let { username, password } = req.body;
//   const user = new User({
//     username: username,
//     password: password,
//   });

//   req.login(user, function (err) {
//     if (err) {
//       console.log(err);
//     } else {
//       passport.authenticate("local")(req, res, function () {
//         res.redirect("/secrets");
//         console.log(req.user);
//       });
//     }
//   });
// });

// app.post("/register", (req, res) => {
//   let { username, password } = req.body;

//   User.register({ username: username }, password, function (err, user) {
//     if (err) {
//       console.log(err);
//       res.redirect("/register");
//     } else {
//       passport.authenticate("local")(req, res, function () {
//         res.redirect("/secrets");
//       });
//     }
//   });
// });

app.get("/logout", function (req, res) {
  userDetails = {};
  req.logOut();
  res.redirect("http://localhost:3000/");
});

app.post("/add", (req, res) => {
  const item = new Item(req.body);
  console.log(item);
  item.save();
  //add response here, check others
});

app.post("/delete", loggedIn, (req, res, next) => {
  const itemToDeleteID = req.body;
  console.log(itemToDeleteID);
  Item.findOneAndDelete({ id: itemToDeleteID }, (err, deletedItem) => {
    if (!err) {
      console.log("deleted: ", deletedItem);
      res.status(200).json({ success: true });
    } else {
      console.log("Error: ", err);
    }
  });
});

app.post("/bid", loggedIn, (req, res, next) => {
  let { id, bids, price } = req.body;
  // console.log(req.user.username);
  //CHANGE THIS TO CHECK ID NOT NAME
  Item.find({ id: id }, (err, foundItem) => {
    if (!err) {
      console.log("Found: ", foundItem[0].highBidder);
      if (foundItem[0].highBidder != req.user.username) {
        console.log(foundItem.highBidder, req.user.username);
        Item.findOneAndUpdate(
          { id: id },
          { bids: bids, price: price, highBidder: req.user.username },
          (err, foundItem) => {
            if (!err) {
              console.log("Updated: ", foundItem.title);
              //need to send a response else the fetch hangs up
              res.status(200).json({ success: true });
            } else {
              console.log("Error: ", err);
            }
          }
        );
      } else {
        res.status(200).json({ success: true });
      }
    } else {
      console.log("Error: ", err);
    }
  });
});

app.get("/all", (req, res) => {
  // console.log(loggedIn);
  Item.find({}, (err, foundItems) => {
    if (!err) {
      // console.log(foundItems);
      res.send(foundItems);
    } else {
      console.log(err);
    }
  });
});

app.get("/loggedin", loggedIn, (req, res, next) => {
  res.send(req.user);
});

app.get("/getuser", (req, res) => {
  // console.log(userDetails);
  res.send(userDetails);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
