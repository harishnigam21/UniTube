import express from "express";
import { configDotenv } from "dotenv";
import connectDB from "./DB/DBConnection.js";
import Auth from "./routes/Auth.js";
import Channel from "./routes/Channel.js";

const PORT = process.env.PORT || 5000;
const app = express();
configDotenv();
connectDB();

//App level middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//App level Routes
app.use("/", Auth);
app.use("/", Channel);

app.get("/", (req, res) =>
  res.status(200).json({ message: "UniTube Server is Running Perfect" })
);
app.listen(PORT, () => {
  console.log("Backend Server is running on : ", PORT);
});
