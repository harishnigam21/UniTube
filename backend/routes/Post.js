import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  updatePost,
  getMorePost,
} from "../controllers/Post.js";
import Validate from "../middlewares/validators/mongooseIDValidation.js";
import jwtVerifier from "../middlewares/jwt/jwtVerifier.js";
import postValidation from "../middlewares/validators/postValidation.js";
import postUpdateValidation from "../middlewares/validators/postUpdateValidation.js";
import { upload } from "../middlewares/multer/Upload.js";
const uploadMultiple = upload.fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "videoURL", maxCount: 1 },
]);
const router = express.Router();
router
  .route("/post/:id")
  .get(Validate, jwtVerifier, getPost)
  .delete(Validate, jwtVerifier, deletePost)
  .patch(Validate, jwtVerifier, postUpdateValidation, updatePost);
router.route("/posts").get(jwtVerifier, getMorePost);
router
  .route("/create_post")
  .post(jwtVerifier, uploadMultiple, postValidation, createPost);
export default router;
