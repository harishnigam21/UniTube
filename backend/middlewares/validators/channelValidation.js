import fs from "fs";

const channelValidation = (req, res, next) => {
  const { channelName, channelHandler, description } = req.body;
  const files = req.files; // Multer puts files here, not in req.body

  // Helper to delete files if validation fails (prevents server clutter)
  const cleanupAndError = (error) => {
    if (req.files) {
      Object.values(req.files)
        .flat()
        .forEach((file) => {
          if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
        });
    }
    return res.status(422).json({ success: false, message: error });
  };

  // 1. Channel Name Check
  if (!channelName || channelName.trim().length < 4) {
    return cleanupAndError("Channel name must be at least 4 characters long.");
  }

  // 2. Channel Banner Check (Checking if file exists in req.files)
  if (!files || !files.channelBanner) {
    return cleanupAndError("Channel banner image is required.");
  }

  // 3. Channel Picture Check
  if (!files || !files.channelPicture) {
    return cleanupAndError("Channel profile picture is required.");
  }

  // 4. Description Check
  if (description && description.length > 500) {
    return cleanupAndError("Description is too long (max 500 characters).");
  }

  // 5. Channel Handler Check
  const HANDLER_REGEX = /^@[a-z0-9._-]{3,30}$/;
  if (!channelHandler || !channelHandler.startsWith("@")) {
    return cleanupAndError("Handler must start with @");
  }
  if (!HANDLER_REGEX.test(channelHandler)) {
    return cleanupAndError("Handler contains invalid characters.");
  }

  console.log("Channel Validation Successful");
  next(); // Move to Controller
};

export default channelValidation;
