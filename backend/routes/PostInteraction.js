import express from "express";
import Validate from "../middlewares/validators/mongooseIDValidation.js";
import { postDislike, postLike } from "../controllers/PostInteraction.js";
import jwtVerifier from "../middlewares/jwt/jwtVerifier.js";
const router = express.Router();
router.route("/like/:id").patch(jwtVerifier,Validate, postLike);
router.route("/dislike/:id").patch(jwtVerifier,Validate, postDislike);
export default router;