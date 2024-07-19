import express from "express";
import jwt from "jsonwebtoken";
const Router = express.Router();

const VerifyToken = (request, response, next) => {
  const BearerToken = request.headers["authorization"];
  if (BearerToken) {
    request.token = BearerToken.split(" ")[1];
  } else {
    response.send("Token is not present");
  }
  next();
};

Router.post("/", VerifyToken, (request, response) => {
  jwt.verify(request.token, process.env.JWT_SECRET_KEY, (err, authorized) => {
    if (err) {
      response.json({
        token: request.token,
        result: "Failed to verify",
        code: 400,
      });
    } else {
      response.json({ message: authorized, code: 200 });
    }
  });
});

export { Router };
