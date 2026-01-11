const postUpdateValidation = (req, res, next) => {
  const { thumbnail, description, details, tags, category } = req.body;

  // Helper to send response and stop execution immediately
  const sendError = (error) => {
    return res.status(422).json({ success: false, error });
  };

  // 1. Thumbnail URL check (only if provided)
  if (thumbnail) {
    const urlRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i;
    if (!urlRegex.test(thumbnail)) {
      return sendError("Invalid thumbnail URL format.");
    }
  }

  // 2. Category check (only if provided)
  if (category) {
    const allowedCategory = [
      "Music",
      "Education",
      "Travel",
      "Food",
      "Fitness",
      "Gaming",
      "News",
      "Comedy",
    ];
    if (!allowedCategory.includes(category)) {
      return sendError(
        `Invalid category. Must be one of: ${allowedCategory.join(", ")}`
      );
    }
  }

  // 3. Tags check (must be an array if provided)
  if (tags) {
    if (!Array.isArray(tags)) {
      return sendError("Tags must be an array of strings.");
    }
  }

  // 4. Description check (must be a string if provided)
  if (description !== undefined) {
    if (typeof description !== "string") {
      return sendError("Description must be a string.");
    }
  }

  // 5. Details check (must be an object and NOT an array)
  if (details !== undefined) {
    if (
      typeof details !== "object" ||
      Array.isArray(details) ||
      details === null
    ) {
      return sendError("Details must be a valid object.");
    }
  }

  // Success
  console.log("Post Update Validation Passed");
  next();
};

export default postUpdateValidation;
