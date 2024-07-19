import express from "express";

import ConnectDB from "./db.js";
import { Router as router_create_user } from "./Routes/create_user.js";
import { Router as router_login_user } from "./Routes/login_user.js";
import { Router as router_dish } from "./Routes/Dishes.js";
import { Router as router_auth_verify } from "./Routes/auth_verify.js";
import bodyParser from "body-parser";

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
    "Origin, X-Requested-With, Content-Type, Accept,Authorization"
  );
  next();
});
App.use(bodyParser.json());

App.use("/auth/", router_auth_verify);
App.use("/Dishes/", router_dish);
App.use("/Create_User/", router_create_user);
App.use("/Login_User/", router_login_user);
App.get("/", (request, response) => {
  response.send("Hi There");
});

ConnectDB();
