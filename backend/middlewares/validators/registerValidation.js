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
  const errors = [];
  //firstname,lastname
  !firstname || firstname.length < 2
    ? errors.push("Missing First Name")
    : !lastname || lastname.length < 2
    ? errors.push("Missing Last Name")
    : !dob || dob.length < 8
    ? errors.push("Missing DOB")
    : null;
  const validateInput = (type, value) => {
    const patterns = {
      password:
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|~`-])[^\s]{8,}$/,
      name: /^[a-z]+$/,
      email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      dob: /^\d{2}-\d{2}-\d{4}$/,
      mobile: /^\d{10}$/,
    };

    switch (type) {
      case "password":
        if (!value) errors.push("Password is required.");
        if (/\s/.test(value)) errors.push("Password cannot contain spaces.");
        if (!/(?=.*[A-Z])/.test(value))
          errors.push("Password needs at least one capital letter.");
        if (!/(?=.*\d)/.test(value))
          errors.push("Password needs at least one number.");
        if (!/(?=.*[!@#$%^&*()_+])/.test(value))
          errors.push("Password needs at least one symbol.");
        if (value.length < 8)
          errors.push("Password must be at least 8 characters long.");
        return null;

      case "name":
        if (!value) errors.push("Name is required.");
        if (/[A-Z]/.test(value))
          errors.push("Name must be all lowercase (no camelCase).");
        if (/\s/.test(value)) errors.push("Name cannot contain spaces.");
        if (!patterns.name.test(value))
          errors.push("Name can only contain letters.");
        return null;

      case "email":
        if (!value) errors.push("Email is required.");
        if (!patterns.email.test(value))
          errors.push("Please enter a valid email address.");
        return null;

      case "gender":
        const accept = ["male", "female", "other"];
        if (!accept.includes(value)) {
          errors.push("Invalid gender");
        }
        return null;

      case "dob":
        if (!patterns.dob.test(value)) {
          errors.push(
            "Invalid format. Please use DD-MM-YYYY (e.g., 18-02-2001)."
          );
        }
        const [day, month, year] = value.split("-").map(Number);
        if (month < 1 || month > 12)
          errors.push("Invalid month (must be 01-12).");
        if (day < 1 || day > 31) errors.push("Invalid day (must be 01-31).");
        const currentYear = new Date().getFullYear();
        if (year > currentYear) errors.push("Year cannot be in the future.");
        if (year < 1800) errors.push("Year is too far in the past.");
        return null;

      case "mobile":
        const str = String(value);
        if (!str || str.trim().length === 0) {
          errors.push("Mobile number cannot be empty.");
        }
        if (str.length !== 10) {
          errors.push(
            `Mobile number must be exactly 10 digits. (Current length: ${str.length})`
          );
        }
        const onlyDigits = /^[0-9]+$/;
        if (!onlyDigits.test(str)) {
          errors.push(
            "Mobile number must only contain digits from 0-9 (no spaces or symbols)."
          );
        }
        return null;

      default:
        return null;
    }
  };
  validateInput("email", email);
  validateInput("password", password);
  validateInput("password", cnfPassword);
  validateInput("gender", gender);
  validateInput("dob", dob);
  validateInput("mobile", mobileno);

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  next();
};
