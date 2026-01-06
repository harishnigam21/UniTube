import mongoose from "mongoose";
// This middleware simply checks the id is valid or not & id is there or not in params.
const Validate = (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Missing product ID" });
  }
  //mongoose.Types.ObjectId.isValid(id), provide by mongoose to validate id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid product ID format",
    });
  }
  next();
};
export default Validate;
