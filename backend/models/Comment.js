import mongoose from "mongoose";
const commentSchema = mongoose.Schema({
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "posts",
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  commentText: {
    type: String,
    required: true,
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
    required: true,
    default: 0,
  },
  postedAt: {
    type: String,
    required: true,
  },
});
export default mongoose.model("comments", commentSchema);
