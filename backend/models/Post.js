import mongoose from "mongoose";
const postSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  channel_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "channels",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  type: {
    //video,short,audio,news,podcast
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  videoURL: {
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
  postedAt: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  details: {
    type: Object,
  },
});
export default mongoose.model("posts", postSchema);
