import express from "express";
import Orders from "../order_model.js";
const Router = express.Router();

Router.post("/", async (request, response) => {
  const order_data = request.body.OrderData;

  const _first_time = await Orders.findOne({ email: request.body.email });
  if (_first_time === null) {
    Orders.create({
      email: request.body.email,
      order_details: [order_data],
    }).then((resolve) => {
      response.json({ code: 200, msg: "First Time Order" });
    });
  } else {
    const ID = _first_time.id;
    Orders.findByIdAndUpdate(ID, {
      $push: { order_details: order_data },
    }).then(response.json({ code: 200, msg: "Order Completed" }));
  }
});

export { Router };
