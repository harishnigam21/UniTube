import mongoose from "mongoose";
const userSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  middlename: {
    type: String,
  },
  lastname: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  refreshToken: {
    type: String,
    required: true,
    default: "Newly Registered User",
  },
  subscription: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "channels",
    },
  ],
  channels: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "channels",
      default: [],
    },
  ],
  timestamps: true,
});
export default mongoose.model("users", userSchema);
