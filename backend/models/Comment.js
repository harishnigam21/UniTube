import mongoose from "mongoose";
const commentSchema = mongoose.Schema({
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "posts",
    require: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    require: true,
  },
  commentText: {
    type: String,
    require: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
  level: {
    type: Number,
    require: true,
    default: 0,
  },
  postedAt: {
    type: String,
    require: true,
  },
});
export default mongoose.model("comments", commentSchema);
