const channelUpdateValidation = (req, res, next) => {
  const { channelName, channelBanner, channelPicture, description } = req.body;
  const errors = [];

  // Improved Name Check: Check for existence OR length
  if (channelName !== undefined) {
    if (typeof channelName !== "string" || channelName.trim().length < 4) {
      errors.push(
        "Channel name must be a string and at least 4 characters long"
      );
    }
  }

  // URL Checks
  if (channelBanner && !isValidURL(channelBanner))
    errors.push("Invalid channelBanner URL");
  if (channelPicture && !isValidURL(channelPicture))
    errors.push("Invalid channel Picture");

  // Description Check
  if (description !== undefined && typeof description !== "string") {
    errors.push("Description must be a string");
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  next();
};
export default channelUpdateValidation;
