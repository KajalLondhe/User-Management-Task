import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();

// Database connection
export const dbconnection = mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit process with failure code
  });
