import express from "express";
import User from "../user_model.js";
const Router = express.Router();

Router.post("/", async (request, response) => {
  try {
    const _email = request.body.email;
    const _pass = request.body.password;
    const Presence = await User.find({ email: _email, password: _pass });
    if (Presence.length < 1) {
      response.status(400);
      throw "Invalid Credentials";
    } else {
      response.status(200);

      response.json({ result: true, info: Presence[0] });
    }
  } catch (err) {
    response.statusMessage = err;
    response.json({ result: false });
  }
});

export { Router };
