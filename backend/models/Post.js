import mongoose from "mongoose";
const postSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    require: true,
  },
  channel_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "channels",
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  type: {
    //video,short,audio,news,podcast
    type: String,
    require: true,
  },
  thumbnail: {
    type: String,
    require: true,
  },
  videoURL: {
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
  postedAt: {
    type: String,
    require: true,
  },
  duration: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  details: {
    type: Object,
    require: true,
  },
});
export default mongoose.model("posts", postSchema);
