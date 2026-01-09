import express from "express";
import { deleteComment, getComment, postComment } from "../controllers/Comment.js";
import jwtVerifier from "../middlewares/jwt/jwtVerifier.js";
import commentValidation from "../middlewares/validators/commentValidation.js";
import Validate from "../middlewares/validators/mongooseIDValidation.js";
const router = express.Router();
router
  .route("/comment/:id")
  .get(Validate, getComment)
  .post(Validate, commentValidation, jwtVerifier, postComment)
  .delete(Validate, jwtVerifier, deleteComment);
export default router;
