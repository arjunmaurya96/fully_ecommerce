import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/register.js";
dotenv.config();


//  Function to Generate JWT Token
const generateToken = (newUser) => {
    return jwt.sign({ id: newUser.id, email: newUser.email }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

//  Auth Controller
export const authController = {
    register: async (req, res) => {
        const { name, email, password, confirmPassword } = req.body;

        //  Validation: Check if fields are empty
        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Validation: Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        try {

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: "Email already registered" });
            }
            //  Hash Password
            const hashedPassword = await bcrypt.hash(password, 10); //10 round hash karega

            //   //  Store User (Replace with Database Later)
            //   const user = { id: users.length + 1, name, email, password: hashedPassword };

            //   users.push(user);
            const newUser = new User({
                name,
                email,
                password: hashedPassword,
            });

            // ✅ Save User to MongoDB
            await newUser.save();
            //  Generate JWT Token
            const token = generateToken(newUser);
            //console.log("Generated Token:", token);
            //console.log(user);

            return res.status(201).json({ message: "User registered successfully!", token });
        } catch (error) {
            console.error("Error:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    },


    login: async (req, res) => {
        const { email, password } = req.body;

        // Validation: Check if fields are empty
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        try {

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({ error: "Invalid credentials" });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ error: "Invalid credentials" });
            }
            const token = generateToken(user);
            console.log(token)
            return res.status(200).json({ message: "Login successful!", token });

        } catch (error) {
            console.error("Error:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }



    },

    // this is ok but i am not able to test using postman
    //after login 
    // protectedRoute: async (req, res) => {

    //     const token = req.headers.authorization && req.headers.authorization.split(" ")[1];

    //     console.log(token)
    //     if (!token) {
    //         return res.status(401).json({ message: "Unauthorized, no token provided" });
    //     }

    //     try {
    //         const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //         res.status(200).json({ message: "Protected data accessed", user: decoded });
    //     } catch (error) {
    //         res.status(401).json({ message: "Invalid token" });
    //     }
    // }
};
