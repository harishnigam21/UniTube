const postUpdateValidation = () => {
  const { thumbnail, description, details } = req.body;
  const errors = [];
  // thumbnail
  if (!thumbnail || !isValidURL(thumbnail)) {
    errors.push("Invalid thumbnail URL");
  }
  // description (optional)
  if (description && typeof description !== "string") {
    errors.push("Description must be a string");
  }
  // details (optional)
  if (details && typeof details !== "object") {
    errors.push("Details must be an object");
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};
export default postUpdateValidation;
