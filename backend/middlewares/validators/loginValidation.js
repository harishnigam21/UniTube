const loginValidation = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];
  //no extra checks with password, just check is there empty string with small buffer of 2 character
  !password ||
    (password.length < 2 &&
      errors.push("Password is not entered or not valid"));
  const validateInput = (type, value) => {
    const patterns = {
      email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    };
    switch (type) {
      case "email":
        if (!value) errors.push("Email is required.");
        if (!patterns.email.test(value))
          errors.push("Please enter a valid email address.");
        return null;

      default:
        return null;
    }
  };
  validateInput("email", email);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  console.log("Login Input Validation done");
  next();
};
export default loginValidation;
