const commentValidation = (req, res, next) => {
  const { parent_id, commentText } = req.body;
  const errors = [];

  // parent_id
  if (!isValidObjectId(parent_id)) {
    errors.push("Invalid or missing parent_id");
  }

  // commentText
  if (!commentText || typeof commentText !== "string") {
    errors.push("commentText is not valid");
  }
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  next();
};
export default commentValidation;
