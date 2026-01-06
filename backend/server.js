import express from "express";
import { configDotenv } from "dotenv";
import connectDB from "./DB/DBConnection.js";
const app = express();
configDotenv();
connectDB();
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) =>
  res.status(200).json({ message: "UniTube Server is Running Perfect" })
);
app.listen(PORT, () => {
  console.log("Backend Server is running on : ", PORT);
});
