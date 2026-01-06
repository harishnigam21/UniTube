import mongoose from "mongoose";
const userSchema = mongoose.Schema({
  firstname: {
    type: String,
    require: true,
  },
  middlename: {
    type: String,
  },
  lastname: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    require: true,
  },
  dob: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    unique: true,
  },
  refreshToken: {
    type: String,
    require: true,
    default: "Newly Registered User",
  },
});
export default mongoose.model("users", userSchema);
