import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      
    });
    console.log("MongoDB Connected Successfully!");
  } catch (error) {
    console.error("MongoDB Connection Fasiled:", error);
    process.exit(1); // Exit on failure
  }
};

export default connectDB;
