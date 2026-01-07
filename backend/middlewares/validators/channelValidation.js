const channelValidation = (req, res, next) => {
  const { channelName, channelBanner, channelPicture, description } = req.body;
  const errors = [];

  if (
    !channelName ||
    typeof channelName !== "string" ||
    channelName.length < 4
  ) {
    errors.push("Missing Channel or it is not valid");
  }

  // channelBanner
  if (!channelBanner || !isValidURL(channelBanner)) {
    errors.push("Invalid channelBanner URL");
  }

  // channelPicture
  if (!channelPicture || !isValidURL(channelPicture)) {
    errors.push("Invalid channel Picture");
  }

  // description (optional)
  if (description && typeof description !== "string") {
    errors.push("Description must be a string");
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};
export default channelValidation;
