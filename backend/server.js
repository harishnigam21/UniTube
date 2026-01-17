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
app.use("/uploads", express.static("uploads")); //make upload folder static
app.use(credentials);//checking origin
app.use(express.json()); //parsing data and make fully used data available in body
app.use(express.urlencoded({ extended: true })); //parses incoming requests with URL-encoded payloads
app.use(cookieParser()); //parse the cookies that are attached to the request 
app.use(cors(corsOptions)); //enable CORS with various options

//App level Routes
// NOTE: In controller no validation of data has ben done, for validation separate middleware are created and used it before controller in route.
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
