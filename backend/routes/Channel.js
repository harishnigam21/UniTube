import express from "express";
import {
  createChannel,
  deleteChannel,
  subscriberToggle,
  updateChannel,
} from "../controllers/Channel";
import jwtVerifier from "../middlewares/jwt/jwtVerifier";
import Validate from "../middlewares/validators/mongooseIDValidation";
import channelValidation from "../middlewares/validators/channelValidation";
import channelUpdateValidation from "../middlewares/validators/channelUpdateValidation";
const router = express.Router();
router
  .route("/create_channel")
  .post(jwtVerifier, channelValidation, createChannel);
router
  .route("/delete_channel/:id")
  .delete(Validate, jwtVerifier, deleteChannel);
router
  .route("/update_channel/:id")
  .patch(Validate, channelUpdateValidation, jwtVerifier, updateChannel); //TODO: Confirm that using 1 response from db or executing long code, which would be better
router
  .route("/new_subscriber/:id")
  .patch(Validate, jwtVerifier, subscriberToggle);
export default router;
