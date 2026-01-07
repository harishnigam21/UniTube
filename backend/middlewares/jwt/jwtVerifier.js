import User from "../../models/User";
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
      return res.status(400), json({ message: "Invalid token format" });
    }
    const decoded = jwt.sign(token, process.env.ACCESS_TOKEN_KEY);
    const UserExist = await User.findById(decoded.id);
    if (!UserExist) {
      return res.status(401).json({ message: "User no longer exists" });
    }
    req.user = UserExist;
    next();
  } catch (error) {
    console.log("Verifier Side Error : ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export default jwtVerifier;
