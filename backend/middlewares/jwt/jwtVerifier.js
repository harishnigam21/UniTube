import jwt from "jsonwebtoken";
const jwtVerifier = (req, res, next) => {
  const header = req.headers["authorization"];
  if (!header) {
    return res
      .status(401)
      .json({ message: "Looks Like you have not login yet" });
  }
  const token = header.split(" ")[1]; // bearer token...
  jwt.sign(token, process.env.ACCESS_TOKEN_KEY, (error, decoded) => {
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    req.user = decoded.email;
    console.log("Token Verified");
    next();
  });
};
export default jwtVerifier;
