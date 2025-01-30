import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/db.js";
//import apiKeyAuth from "./models/middleware/authMiddleware.js"; unComment and use
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: "all is ok" });
});

// 🔹 Apply Middleware Globally (all API Calls  Protected)
//app.use(apiKeyAuth); crrently disable middelware when production then enable globale authhader unComment and use

app.use("/auth", authRoutes);
connectDB();

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
