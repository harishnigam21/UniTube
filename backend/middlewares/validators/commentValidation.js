const commentValidation = (req, res, next) => {
  const { parent_id, commentText } = req.body;

  // Helper to send response and stop execution immediately
  const sendError = (error) => {
    return res.status(422).json({ success: false, message:error });
  };
  //1. parent_id check
  const objectIdRegex = /^[0-9a-fA-F]{24}$/;
  if (parent_id && !objectIdRegex.test(parent_id)) {
    return sendError("Invalid or missing parent_id");
  }
  // 2. commentText check
  if (!commentText || typeof commentText !== "string") {
    return sendError("Comment text must be a string");
  }

  // Added a check to ensure the comment isn't just whitespace or too short
  if (commentText.trim().length === 0) {
    return sendError("Comment text cannot be empty");
  }

  if (commentText.trim().length > 1000) {
    return sendError("Comment is too long (maximum 1000 characters)");
  }

  // If all checks pass
  console.log("Comment Validation Successful");
  next();
};

export default commentValidation;
