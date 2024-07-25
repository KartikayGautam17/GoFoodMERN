import express from "express";
import Orders from "../order_model.js";
const Router = express.Router();

Router.post("/", async (request, response) => {
  const target_email = request.body.email;
  const user_orders = await Orders.findOne({ email: target_email });
  if (user_orders) {
    response.json({
      success: true,
      orders: user_orders.order_details,
      time: user_orders.time,
    });
  } else {
    response.json({ success: false, orders: [] });
  }
});

export { Router };
