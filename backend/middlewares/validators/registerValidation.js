const registerValidation = (req, res, next) => {
  const {
    firstname,
    middlename,
    lastname,
    gender,
    dob,
    email,
    mobileno,
    password,
    cnfPassword,
  } = req.body;
  const nameRegex = /^[a-zA-Z]+$/;

  const sendError = (error) => {
    console.error(error);
    return res.status(417).json({ success: false, error });
  };

  if (password !== cnfPassword) {
    return sendError("Passwords do not match");
  }

  if (!firstname || firstname.length < 2 || !nameRegex.test(firstname)) {
    return sendError("Invalid First Name (Min 2 chars, alphabets only)");
  }
  if (middlename && (middlename.length < 2 || !nameRegex.test(middlename))) {
    return sendError("Invalid Middle Name (Min 2 chars, alphabets only)");
  }
  if (!lastname || lastname.length < 2 || !nameRegex.test(lastname)) {
    return sendError("Invalid Last Name (Min 2 chars, alphabets only)");
  }

  const validateInput = (type, value) => {
    const patterns = {
      password:
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|~`-])[^\s]{8,}$/,
      name: /^[a-zA-Z]+$/,
      email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      dob: /^\d{2}-\d{2}-\d{4}$/,
      mobile: /^\d{10}$/,
    };

    switch (type) {
      case "password":
        if (!value) return sendError("Password is required.");
        if (/\s/.test(value))
          return sendError("Password cannot contain spaces.");
        if (!/(?=.*[A-Z])/.test(value))
          return sendError("Password needs at least one capital letter.");
        if (!/(?=.*\d)/.test(value))
          return sendError("Password needs at least one number.");
        if (!/(?=.*[!@#$%^&*()_+])/.test(value))
          return sendError("Password needs at least one symbol.");
        if (value.length < 8)
          return sendError("Password must be at least 8 characters long.");
        break;

      case "email":
        if (!value) return sendError("Email is required.");
        if (!patterns.email.test(value))
          return sendError("Please enter a valid email address.");
        break;

      case "gender":
        const accept = ["male", "female", "other"];
        if (!value || !accept.includes(value.toLowerCase()))
          return sendError("Invalid gender");
        break;

      case "dob":
        if (!value || !patterns.dob.test(value))
          return sendError("Invalid format. Use DD-MM-YYYY.");
        const [day, month, year] = value.split("-").map(Number);
        if (month < 1 || month > 12) return sendError("Invalid month (01-12).");
        if (day < 1 || day > 31) return sendError("Invalid day (01-31).");
        const currentYear = new Date().getFullYear();
        if (year > currentYear)
          return sendError("Year cannot be in the future.");
        if (year < 1800) return sendError("Year is too far in the past.");
        break;

      case "mobile":
        const str = String(value || "");
        if (str.length !== 10 || !/^[0-9]+$/.test(str))
          return sendError("Mobile number must be exactly 10 digits.");
        break;
    }
    return null;
  };

  if (validateInput("email", email)) return;
  if (validateInput("password", password)) return;
  if (validateInput("gender", gender)) return;
  if (validateInput("dob", dob)) return;
  if (validateInput("mobile", mobileno)) return;

  console.log("Registration Input Validation done");
  next();
};

export default registerValidation;
