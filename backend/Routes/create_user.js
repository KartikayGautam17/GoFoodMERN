import express from "express";
import User from "../user_model.js";
import { check, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
const Router = express.Router();

Router.post(
  "/",
  [
    check("email").isEmail(),
    check("name").isLength({ min: 5 }),
    check("password", "Incorrect Password Format").isLength({ min: 5 }),
  ],
  async (request, response) => {
    const pass_salt = await bcrypt.genSalt(10);
    const secured_password = await bcrypt.hash(
      request.body.password,
      pass_salt
    );
    try {
      const res = validationResult(request);
      if (!res.isEmpty()) {
        response.json(
          res.array().map((val, i, arr) => {
            return val.path + " : " + val.msg;
          })
        );
        return;
      }
      await User.create({
        name: request.body.name,
        password: secured_password,
        email: request.body.email,
        location: request.body.location,
      });
      response.status(200);
      response.json({ user_creation: true });
    } catch (err) {
      console.log(err);
      response.status(400);
      response.json({ user_creation: false });
    }
  }
);
export { Router };
