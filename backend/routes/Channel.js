import express from "express";
import {
  createChannel,
  deleteChannel,
  newSubscriber,
  updateChannel,
} from "../controllers/Channel";
import jwtVerifier from "../middlewares/jwt/jwtVerifier";
const router = express.Router();
router.route("/create_channel").post(jwtVerifier, createChannel);
router.route("/delete_channel").delete(jwtVerifier, deleteChannel);
router.route("/update_channel").patch(jwtVerifier, updateChannel);
router.route("/new_subscriber").patch(jwtVerifier, newSubscriber);
export default router;
