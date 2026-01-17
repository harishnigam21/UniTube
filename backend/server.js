import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import corsOptions from "./config/cors.js";
import credentials from "./middlewares/credentials/credentials.js";
import connectDB from "./DB/DBConnection.js";
import Auth from "./routes/Auth.js";
import Channel from "./routes/Channel.js";
import Post from "./routes/Post.js";
import Comment from "./routes/Comment.js";
import PostInteraction from "./routes/PostInteraction.js";
import CommentInteraction from "./routes/CommentInteraction.js";
const PORT = process.env.PORT || 5003;
const app = express();
configDotenv();
connectDB();

//App level middlewares
app.use("/uploads", express.static("uploads"));
app.use(credentials);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));

//App level Routes
app.use("/", Auth);
app.use("/", Channel);
app.use("/", Post);
app.use("/", PostInteraction);
app.use("/", CommentInteraction);
app.use("/", Comment);

app.get("/", (req, res) =>
  res.status(200).json({ message: "UniTube Server is Running Perfect" })
);
app.listen(PORT, () => {
  console.log("Backend Server is running on : ", PORT);
});
