import express from "express";
import mongoose from "mongoose";
import ConnectDB from "./db.js";
const App = express();
const port = 5000;
App.listen(port, () => {
  console.log("App listening on port " + port);
});

App.get("/", (request, response) => {
  response.send("Hi There");
});

ConnectDB();
