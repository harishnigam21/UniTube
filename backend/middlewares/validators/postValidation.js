const postValidation = (req, res, next) => {
  const {
    channel_id,
    title,
    type,
    category,
    tags,
    thumbnail,
    videoURL,
    description,
    details,
  } = req.body;

  // Helper to send response and stop execution immediately
  const sendError = (error) => {
    return res.status(417).json({ success: false, error });
  };

  // 1. Channel ID (MongoDB ObjectId format)
  const objectIdRegex = /^[0-9a-fA-F]{24}$/;
  if (!channel_id || !objectIdRegex.test(channel_id)) {
    return sendError("Invalid or missing channel_id");
  }

  // 2. Title
  if (!title || typeof title !== "string" || title.trim().length < 3) {
    return sendError("Title is required and must be at least 3 characters");
  }

  // 3. Type
  const allowedTypes = ["video", "short", "audio", "news", "podcast"];
  if (!type || !allowedTypes.includes(type.toLowerCase())) {
    return sendError(`Invalid type. Allowed types: ${allowedTypes.join(", ")}`);
  }

  // 4. Category
  const allowedCategory = [
    "music",
    "education",
    "travel",
    "food",
    "fitness",
    "gaming",
    "news",
    "comedy",
  ];
  if (!category || !allowedCategory.includes(category.toLowerCase())) {
    return sendError(
      `Invalid category selected. Allowed category : ${allowedCategory.join(
        ", "
      )}`
    );
  }

  // 5. Tags (Checking if it's an array using the method we discussed)
  if (tags && !Array.isArray(tags)) {
    return sendError("Tags must be provided as an array");
  }

  // 6. Thumbnail and Video URL
  const urlRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|mp4|mp3|mkv|mov))$/i;

  if (!thumbnail || !urlRegex.test(thumbnail)) {
    return sendError("A valid thumbnail image URL is required");
  }

  if (!videoURL || !urlRegex.test(videoURL)) {
    return sendError("A valid video or media URL is required");
  }

  // 7. Description (optional)
  if (description !== undefined && typeof description !== "string") {
    return sendError("Description must be a string");
  }

  // 8. Details (optional object for extra metadata)
  if (
    details !== undefined &&
    (typeof details !== "object" || Array.isArray(details))
  ) {
    return sendError("Details must be a valid object");
  }

  // If it reaches here, everything is valid
  console.log("Post Validation Successful");
  next();
};

export default postValidation;
