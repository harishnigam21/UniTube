import User from "../../models/User.js";
import jwt from "jsonwebtoken";
const jwtVerifier = async (req, res, next) => {
  try {
    const header = req.headers["authorization"];
    if (!header) {
      return res
        .status(401)
        .json({ message: "Looks Like you have not login yet" });
    }
    const token = header.split(" ")[1]; // bearer token...
    if (!token) {
      return res.status(401).json({ message: "Invalid token format" });
    }
    console.log("1.1 Verifying Token...");
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    console.log("1.2 Token Verified Successfully");
    console.log("2.1 Checking User Existence...");
    const UserExist = await User.findById(decoded.id);
    if (!UserExist) {
      console.error("2.2 User no longer exists");
      return res.status(401).json({ message: "User no longer exists" });
    }
    console.log("2.2 User Existence passed");
    req.user = UserExist;
    next();
  } catch (error) {
    console.error("Verifier Side Error : ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export default jwtVerifier;
