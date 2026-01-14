import Users from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const LogIn = async (req, res) => {
  const { email } = req.body;
  try {
    const ExistingUser = await Users.findOne({ email })
      .select("+password +_id")
      .lean();
    if (!ExistingUser) {
      console.error("Non-Registered User trying to login : ", email);
      return res.status(404).json({ message: "You are not registered yet !" });
    }
    const comparePassword = await bcrypt.compare(
      req.body.password,
      ExistingUser.password
    );
    if (!comparePassword) {
      console.error("Incorrect password received from : ", ExistingUser.email);
      return res
        .status(401)
        .json({ message: "Incorrect Password, Please try again" });
    }
    const access_token = jwt.sign(
      { id: ExistingUser._id },
      process.env.ACCESS_TOKEN_KEY,
      { expiresIn: "2h" }
    );
    const refresh_token = jwt.sign(
      { id: ExistingUser._id },
      process.env.REFRESH_TOKEN_KEY,
      { expiresIn: "1d" }
    );
    const updateRefreshToken = await Users.findByIdAndUpdate(
      ExistingUser._id,
      {
        $set: { refreshToken: refresh_token },
      },
      { new: true, runValidators: true }
    );
    res.cookie("jwt", refresh_token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    }); //TODO: add secure:true at production level
    const { password, refreshToken, ...other } = ExistingUser;
    console.log("Successfully Verified User : ", ExistingUser.email);
    return res.status(200).json({
      message: "Successfully Verified User",
      actk: access_token,
      user: other,
    });
  } catch (error) {
    console.error("Error from LogIn controller : ", error);
    return res.status(500).json({ message: error.message });
  }
};
export const Register = async (req, res) => {
  try {
    const {
      firstname,
      middlename,
      lastname,
      gender,
      dob,
      email,
      mobileno,
      password,
    } = req.body;
    const userExist = await Users.findOne({ email });

    if (userExist) {
      console.error(
        "Registered User trying to register again : ",
        userExist.email
      );
      return res.status(403).json({ message: "Email ID already exist" });
    }
    const encryptedPassword = await bcrypt.hash(password, 5);
    const newUser = {
      firstname,
      middlename: middlename || "",
      lastname,
      gender,
      dob,
      email,
      mobileno,
      password: encryptedPassword,
    };
    const createUser = await Users.create(newUser);
    if (!createUser) {
      console.error("Failed to create new User");
      return res.status(503).json({ message: "Failed to create new User" });
    }
    console.log("Successfully Created User : ", email);
    return res
      .status(201)
      .json({ message: "User has been registered Successfully " });
  } catch (error) {
    console.error("Error occurred at Register Controller : ", error);
    return res.status(500).json({ message: error.message });
  }
};
export const ForgotPassword = async (req, res) => {};
export const handleRefresh = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const findUser = await Users.findOne({ refreshToken: cookies.jwt })
      .select("+refreshToken +_id")
      .lean();
    const { refreshToken, ...other } = findUser;
    if (!findUser) return res.sendStatus(403);
    jwt.verify(
      findUser.refreshToken,
      process.env.REFRESH_TOKEN_KEY,
      (err, decoded) => {
        if (err || findUser._id != decoded.id) return res.sendStatus(403);
        const access_token = jwt.sign(
          { id: decoded.id },
          process.env.ACCESS_TOKEN_KEY,
          { expiresIn: "2h" }
        );
        return res.status(200).json({ acTk: access_token, userInfo: other });
      }
    );
  } catch (error) {
    console.error("Error from getUser controller : ", error);
    return res.status(500).json({ message: error.message });
  }
};
