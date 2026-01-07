import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  updatePost,
} from "../controllers/Post";
import Validate from "../middlewares/validators/mongooseIDValidation";
import jwtVerifier from "../middlewares/jwt/jwtVerifier";
import postValidation from "../middlewares/validators/postValidation";
const router = express.Router();
router
  .route("/post/:id")
  .get(Validate, getPost)
  .delete(Validate, jwtVerifier, deletePost)
  .patch(Validate, jwtVerifier, updatePost);
router.route("/create_post").post(jwtVerifier, postValidation, createPost);
export default router;
