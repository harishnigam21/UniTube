import express from "express";
import Validate from "../middlewares/validators/mongooseIDValidation.js";
import { postDislike, postLike } from "../controllers/PostInteraction.js";
const router = express.Router();
router.route("/like/:id").patch(Validate, postLike);
router.route("/dislike/:id").patch(Validate, postDislike);
export default router;