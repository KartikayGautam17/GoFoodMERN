import mongoose from "mongoose";

const ConnectDB = async () => {
  const uri =
    "mongodb+srv://GoFood:GoFoodMern%4024617@gofood.nctc8o5.mongodb.net/?retryWrites=true&w=majority&appName=GoFood";
  try {
    await mongoose.connect(uri);
    console.log("Connection ok");
  } catch {
    console.log("No Connection");
  }
};

export default ConnectDB;
