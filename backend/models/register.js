import mongoose from "mongoose";

//  Define User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Email should be unique
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true }); // Automatically adds createdAt & updatedAt

// Create User Model
const User = mongoose.model("User", userSchema);

export default User;
