import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const GUEST_DB_NAME = process.env.GUEST_DB_NAME;
const GUEST_DB_PASSWORD = process.env.GUEST_DB_PASSWORD;
const MONGO_CLUSTER = process.env.MONGO_CLUSTER;

export const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${GUEST_DB_NAME}:${GUEST_DB_PASSWORD}${MONGO_CLUSTER}`
    );
  } catch (error) {
    console.log(`Error connecting to MongoDB Atlas: ${error}`);
    process.exit(1);
  }
};
