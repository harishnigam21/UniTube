const handlerValidation = (req, res, next) => {
  const channelHandler = req.params.handler;

  // Helper to send response and stop execution immediately
  const sendError = (error) => {
    return res.status(422).json({ success: false, error });
  };
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
  console.log("handler Validation Successful");
  next();
};

export default handlerValidation;
