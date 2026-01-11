const channelValidation = (req, res, next) => {
  const {
    channelName,
    channelHandler,
    channelBanner,
    channelPicture,
    description,
  } = req.body;

  // Helper to send response and stop execution immediately
  const sendError = (error) => {
    return res.status(422).json({ success: false, error });
  };

  // 1. Channel Name Check (Required)
  if (
    !channelName ||
    typeof channelName !== "string" ||
    channelName.trim().length < 4
  ) {
    return sendError(
      "Channel name is required and must be at least 4 characters long."
    );
  }

  // URL Regex for Banner and Picture
  const urlRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i;

  // 2. Channel Banner Check (Required)
  if (!channelBanner || !urlRegex.test(channelBanner)) {
    return sendError("A valid channel banner image URL is required.");
  }

  // 3. Channel Picture Check (Required)
  if (!channelPicture || !urlRegex.test(channelPicture)) {
    return sendError("A valid channel profile picture URL is required.");
  }

  // 4. Description Check (Optional)
  if (description !== undefined) {
    if (typeof description !== "string") {
      return sendError("Description must be a string.");
    }
    if (description.length > 500) {
      return sendError("Description is too long (maximum 500 characters).");
    }
  }
  //5. channelHandler Check
  const validateHandler = (name) => {
    if (!name.startsWith("@")) return sendError("Handler must start with @");
    if (name.length < 4) return sendError("Too short (min 3 chars after @)");
    if (name.length > 31) return sendError("Too long (max 30 chars after @)");
    if (!HANDLER_REGEX.test(name))
      return "Only letters, numbers, dots, hyphens, and underscores allowed";
    return null; // No error
  };
  validateHandler(channelHandler);
  // If all checks pass
  console.log("Channel Validation Successful");
  next();
};

export default channelValidation;
