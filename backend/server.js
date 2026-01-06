import express from "express";
import { configDotenv } from "dotenv";
const app = express();
configDotenv();
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) =>
  res.status(200).json({ message: "UniTube Server is Running Perfect" })
);
app.listen(PORT, () => {
  console.log("Backend Server is running on : ", PORT);
});
