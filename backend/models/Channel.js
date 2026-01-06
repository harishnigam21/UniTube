import mongoose from "mongoose";
const channelSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  channelName: {
    type: String,
    required: true,
  },
  channelBanner: { type: String, require: true },
  channelPicture: { type: String, require: true },
  subscribers: {
    type: String,
    default: 0,
  },
});
export default mongoose.model("channels", channelSchema);
