import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;

export const connectDB = async () => {
  try {
    if (!MONGO_CONNECTION_STRING)
      throw new Error("MONGO_CONNECTION_STRING is not defined");
    await mongoose.connect(process.env.MONGO_CONNECTION_STRING as string);
  } catch (error) {
    console.log(`Error connecting to MongoDB Atlas: ${error}`);
    process.exit(1);
  }
};
