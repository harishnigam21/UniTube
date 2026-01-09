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

  const errors = [];

  // channel_id
  if (!channel_id || !isValidObjectId(channel_id)) {
    errors.push("Invalid or missing channel_id");
  }

  // title
  if (!title || typeof title !== "string" || title.trim().length < 3) {
    errors.push("Title must be at least 3 characters");
  }

  // type
  const allowedTypes = ["video", "short", "audio", "news", "podcast"];
  if (!type || !allowedTypes.includes(type)) {
    errors.push("Invalid type");
  }

  // category
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
  if (!category || !allowedCategory.includes(category)) {
    errors.push("Invalid type");
  }
  if (tags && !tags.isArray()) {
    errors.push("Invalid tags");
  }
  if (!thumbnail || !isValidURL(thumbnail)) {
    // thumbnail
    errors.push("Invalid thumbnail URL");
  }

  // videoURL
  if (!videoURL || !isValidURL(videoURL)) {
    errors.push("Invalid video URL");
  }

  //TODO:duration and postedAt will be assign by backend code

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

export default postValidation;
