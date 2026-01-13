import express from "express";
import Validate from "../middlewares/validators/mongooseIDValidation.js";
import {
  commentDislike,
  commentLike,
} from "../controllers/CommentInteraction.js";
import jwtVerifier from "../middlewares/jwt/jwtVerifier.js";
const router = express.Router();
router.route("/clike/:id").patch(jwtVerifier, Validate, commentLike);
router.route("/cdislike/:id").patch(jwtVerifier, Validate, commentDislike);
export default router;
