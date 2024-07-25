import express from "express";
import User from "../user_model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
const Router = express.Router();
dotenv.config();
const _jwt_secret_key = process.env.JWT_SECRET_KEY; //Your jwt secret key

Router.post("/", async (request, response) => {
  try {
    const _email = request.body.email;
    const _pass = request.body.password;
    const Presence = await User.find({ email: _email });
    let res = false;

    try {
      res = await bcrypt.compare(_pass, Presence[0].password);
    } catch (err) {}
    if (Presence.length === 0 || !res) {
      response.status(400);
      throw "Invalid Credentials";
    } else {
      const user_data = Presence[0];
      const { name, location } = user_data;
      response.status(200);
      const data = {
        id: user_data.id,
        email: _email,
        name,
        location,
      };
      const AuthToken = jwt.sign(data, _jwt_secret_key);
      response.json({ result: true, info: user_data, AuthToken: AuthToken });
    }
  } catch (err) {
    response.statusMessage = err;
    response.json({ result: false });
  }
});

export { Router };
