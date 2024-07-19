import express from "express";

const Router = express.Router();

Router.post("/", (request, response) => {
  try {
    response.json({
      Dishes: global.Dishes,
      Dish_Types: global.Dish_Types,
    });
  } catch (err) {
    console.log(err);
    response.send(err);
  }
});

export { Router };
