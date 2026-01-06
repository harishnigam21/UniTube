import express from "express";
import {
  createChannel,
  deleteChannel,
  newSubscriber,
  updateChannel,
} from "../controllers/Channel";
import jwtVerifier from "../middlewares/jwt/jwtVerifier";
import Validate from "../middlewares/validators/mongooseIDValidation";
const router = express.Router();
router.route("/create_channel").post(jwtVerifier, createChannel);
router
  .route("/delete_channel/:id")
  .delete(Validate, jwtVerifier, deleteChannel);
router.route("/update_channel/:id").patch(Validate, jwtVerifier, updateChannel); //TODO: Confirm that using 1 response from db or executing long code, which would be better
router.route("/new_subscriber/:id").patch(Validate, jwtVerifier, newSubscriber);
export default router;
