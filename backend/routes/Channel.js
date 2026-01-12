import express from "express";
import {
  createChannel,
  deleteChannel,
  getChannel,
  getChannels,
  subscriberToggle,
  updateChannel,
  validateHandler,
} from "../controllers/Channel.js";
import jwtVerifier from "../middlewares/jwt/jwtVerifier.js";
import Validate from "../middlewares/validators/mongooseIDValidation.js";
import channelValidation from "../middlewares/validators/channelValidation.js";
import channelUpdateValidation from "../middlewares/validators/channelUpdateValidation.js";
import handlerValidation from "../middlewares/validators/handlerValidation.js";
import { upload } from "../middlewares/multer/Upload.js";
const router = express.Router();

const uploadMultiple = upload.fields([
  { name: "channelPicture", maxCount: 1 },
  { name: "channelBanner", maxCount: 1 },
]);
router.route("/my_channels").get(jwtVerifier, getChannels);
router.route("/channel/:id").get(Validate, jwtVerifier, getChannel);
router
  .route("/create_channel")
  .post(jwtVerifier, uploadMultiple, channelValidation, createChannel);
router
  .route("/delete_channel/:id")
  .delete(Validate, jwtVerifier, deleteChannel);
router
  .route("/update_channel/:id")
  .patch(Validate, channelUpdateValidation, jwtVerifier, updateChannel); //TODO: Confirm that using 1 response from db or executing long code, which would be better
router
  .route("/new_subscriber/:id")
  .patch(Validate, jwtVerifier, subscriberToggle);
router
  .route("/validatehandler/:handler")
  .get(jwtVerifier, handlerValidation, validateHandler);
export default router;
