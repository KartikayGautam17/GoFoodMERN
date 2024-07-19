import express from "express";
import mongoose from "mongoose";
import ConnectDB from "./db.js";
import { Router as router_create_user } from "./Routes/create_user.js";
import { Router as router_login_user } from "./Routes/login_user.js";
import { Router as router_dish } from "./Routes/Dishes.js";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const App = express();
const port = 5000;

App.listen(port, () => {
  console.log("App listening on port " + port);
});
App.use((request, response, next) => {
  response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
App.use(bodyParser.json());

const VerifyToken = (request, response, next) => {
  const BearerToken = request.headers["authorization"];
  if (BearerToken) {
    request.token = BearerToken.split(" ")[1];
  } else {
    response.send("Token is not present");
  }
  next();
};

App.post("/profile/", VerifyToken, (request, response) => {
  jwt.verify(request.token, process.env.JWT_SECRET_KEY, (err, authorized) => {
    if (err) {
      response.json({ token: request.token, result: "Failed to verify" });
    } else {
      response.json({ message: authorized });
    }
  });
});
App.use("/Dishes/", router_dish);
App.use("/Create_User/", router_create_user);
App.use("/Login_User/", router_login_user);
App.get("/", (request, response) => {
  response.send("Hi There");
});

ConnectDB();
