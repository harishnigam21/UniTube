import express from "express";
import { deleteComment, getComment, postComment } from "../controllers/Comment";
import jwtVerifier from "../middlewares/jwt/jwtVerifier";
import commentValidation from "../middlewares/validators/commentValidation";
import Validate from "../middlewares/validators/mongooseIDValidation";
const router = express.Router();
router
  .route("/comment/:id")
  .get(Validate, getComment)
  .post(Validate, commentValidation, jwtVerifier, postComment)
  .delete(Validate, jwtVerifier, deleteComment);
export default router;
