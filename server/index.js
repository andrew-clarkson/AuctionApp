//jshint esversion:6

require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
// for passport.js:
const session = require("express-session");
const cookieSession = require("cookie-session");
const passport = require("passport");
//passport-local installed, do not have to set
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");

const uri = process.env.MONGO_URI;
const PORT = process.env.PORT || 3001;
// let userDetails = {};

// //config session for express
// app.use(
//   session({
//     secret: process.env.EXPRESS_SECRET,
//     resave: false,
//     saveUninitialized: true,
//   })
// );

//use this instead of above
app.use(
  cookieSession({
    name: "session",
    secret: process.env.EXPRESS_SECRET,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// need this to parse the json with the req
app.use(express.json());
app.use(express.text());

//connect to Mongo
mongoose
  .connect(uri)
  .then(() => console.log("Now connected to MongoDB!"))
  .catch((err) => console.error("Something went wrong", err));

//Schemas
const itemSchema = new mongoose.Schema({
  key: String,
  id: String,
  title: String,
  bids: Number,
  price: Number, //will be stored in cents?
  highBidder: String,
  highBidderId: String,
  seller: String,
  sellerId: String,
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

//Models
const Item = mongoose.model("Item", itemSchema);
const User = new mongoose.model("User", userSchema);

// Simplified version to create the local strategy
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

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        "https://react-auction-app.herokuapp.com/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate(
        { googleId: profile.id, username: profile.displayName },
        function (err, user) {
          // userDetails = profile;
          return cb(err, user);
        }
      );
    }
  )
);

// Have Node serve the files for React app
app.use(express.static(path.resolve(__dirname, "../client/build")));

// check if logged in
const loggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
  }
};

//ROUTES

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "https://react-auction-app.herokuapp.com/",
  }),
  function (req, res) {
    res.redirect("https://react-auction-app.herokuapp.com/");
  }
);

app.post("/add", (req, res) => {
  const item = new Item(req.body);
  item.save();
  //add response here, check others ******************************************************************
});

app.get("/all", (req, res) => {
  Item.find({}, (err, foundItems) => {
    if (!err) {
      res.send(foundItems);
    } else {
      console.log(err);
    }
  });
});

app.post("/bid", loggedIn, (req, res, next) => {
  let { id, bids, price } = req.body;
  Item.find({ id: id }, (err, foundItem) => {
    if (!err) {
      if (foundItem[0].highBidderId != req.user.id) {
        Item.findOneAndUpdate(
          { id: id },
          {
            bids: bids,
            price: price,
            highBidder: req.user.username,
            highBidderId: req.user.id,
          },
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

app.post("/delete", loggedIn, (req, res, next) => {
  const itemToDeleteID = req.body;
  console.log(itemToDeleteID);
  Item.find({ id: itemToDeleteID }, (err, foundItem) => {
    if (!err) {
      console.log(foundItem);
      if (foundItem[0].sellerId === req.user.id) {
        Item.findOneAndDelete({ id: itemToDeleteID }, (err, deletedItem) => {
          if (!err) {
            console.log("deleted: ", deletedItem);
            res.status(200).json({ success: true });
          } else {
            console.log("Error: ", err);
          }
        });
      }
    } else {
      console.log("Error: ", err);
    }
  });
});

app.post("/edit", loggedIn, (req, res, next) => {
  let { id, title, img } = req.body;
  console.log(id);
  Item.find({ id: id }, (err, foundItem) => {
    if (!err) {
      console.log(foundItem);
      let newData = { title: title, img: img };
      Item.findOneAndUpdate({ id: id }, newData, (err, itemToUpdate) => {
        if (!err) {
          console.log("Updated ", itemToUpdate);
        } else {
          console.log(err);
        }
      });
    } else {
      console.log(err);
    }
  });
});

app.get("/loggedin", loggedIn, (req, res, next) => {
  res.send(req.user);
});

app.post("/login", (req, res) => {
  console.log(req.body);
  let { username, password } = req.body;

  const user = new User({
    username: username,
    password: password,
  });

  req.login(user, function (err) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function () {
        res.redirect("https://react-auction-app.herokuapp.com/");
      });
    }
  });
});

app.post("/logout", function (req, res) {
  // userDetails = {};
  req.logOut();
  res.redirect("https://react-auction-app.herokuapp.com/");
});

app.post("/register", (req, res) => {
  console.log(req.body);
  let { username, password } = req.body;

  User.register({ username: username }, password, function (err, user) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function () {
        res.redirect("https://react-auction-app.herokuapp.com/");
      });
    }
  });
});

// catchall route
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
