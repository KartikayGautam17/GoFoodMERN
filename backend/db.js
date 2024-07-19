import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const ConnectDB = async () => {
  const URI = process.env.DB_URI; //Your DB_URI in env file
  try {
    await mongoose.connect(URI);
    console.log("Connection ok");
    const Food_Items = mongoose.connection.db.collection("food_items");
    const Dishes = await Food_Items.find({}).toArray();
    global.Dishes = Dishes;
    const Food_Categories =
      mongoose.connection.db.collection("food_categories");
    const Dish_Types = await Food_Categories.find({}).toArray();
    global.Dish_Types = Dish_Types;
  } catch (Exception) {
    console.log(Exception);
  }
};

export default ConnectDB;
