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
      return res.status(403).json({ message: "Invalid token format" });
    }
    console.log("1.1 Verifying Token...");
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    console.log("1.2 Token Verified Successfully");
    console.log("2.1 Checking User Existence...");
    const UserExist = await User.findById(decoded.id);
    if (!UserExist) {
      console.error("2.2 User no longer exists");
      return res.status(404).json({ message: "User no longer exists" });
    }
    console.log("2.2 User Existence passed");
    req.user = UserExist;
    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return res
        .status(401)
        .send({ error: "Auth token expired. Please refresh." });
    }
    if (err instanceof jwt.JsonWebTokenError) {
      if (err.message === "invalid signature") {
        return res
          .status(403)
          .send({ error: "Security alert: Invalid signature." });
      }
      return res.status(400).send({ error: "Token is malformed or invalid." });
    }
    if (err instanceof jwt.NotBeforeError) {
      return res
        .status(403)
        .send({ error: "Token not active yet. Check your system clock." });
    }
    console.error("Verifier Side Error : ", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export default jwtVerifier;
