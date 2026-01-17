import express from "express";
import {
  deleteComment,
  getComment,
  postComment,
  updateComment,
} from "../controllers/Comment.js";
import jwtVerifier from "../middlewares/jwt/jwtVerifier.js";
import commentValidation from "../middlewares/validators/commentValidation.js";
import Validate from "../middlewares/validators/mongooseIDValidation.js";
const router = express.Router();
//TODO : In future remove jwtVErifier from get request so that guest user can read comment, rest keep as it is
router
  .route("/comment/:id")
  .get(Validate, jwtVerifier, getComment)
  .post(Validate, commentValidation, jwtVerifier, postComment)
  .patch(Validate, jwtVerifier, updateComment)
  .delete(Validate, jwtVerifier, deleteComment);
export default router;
