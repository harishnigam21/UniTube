import mongoose from "mongoose";
const channelSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    channelName: {
      type: String,
      required: true,
    },
    channelBanner: { type: String, required: true },
    channelPicture: { type: String, required: true },
    description: { type: String, default: "Description not provided" },
    subscribers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
  },
  { timestamps: true }
);
export default mongoose.model("channels", channelSchema);
