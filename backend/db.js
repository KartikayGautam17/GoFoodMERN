import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const ConnectDB = async () => {
  const URI = process.env.DB_URI; //Your DB_URI in env file
  try {
    await mongoose.connect(URI);
    console.log("Connection ok");
  } catch (Exception) {
    console.log(Exception);
  }
};

export default ConnectDB;
