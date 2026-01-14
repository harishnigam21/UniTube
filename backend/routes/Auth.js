import express from "express";
import {
  ForgotPassword,
  handleRefresh,
  LogIn,
  Register,
} from "../controllers/Auth.js";
import registerValidation from "../middlewares/validators/registerValidation.js";
import loginValidation from "../middlewares/validators/loginValidation.js";
const router = express.Router();
router.route("/register").post(registerValidation, Register);
router.route("/login").post(loginValidation, LogIn);
router.route("/forgot_password").post(ForgotPassword);
router.route("/refresh").get(handleRefresh);
export default router;
