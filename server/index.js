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

const uri =
  "mongodb+srv://user1:" +
  pass +
  "@tallsoup.428jc.mongodb.net/AuctionDB?retryWrites=true&w=majority";

//connect to Mongo
mongoose
  .connect(uri)
  .then(() => console.log("Now connected to MongoDB!"))
  .catch((err) => console.error("Something went wrong", err));

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/add", (req, res) => {});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
