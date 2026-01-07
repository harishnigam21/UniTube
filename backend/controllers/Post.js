import { getVideoDurationInSeconds } from "get-video-duration";
import Post from "../models/Post.js";
import Channel from "../models/Channel.js";
import { getNextDate } from "../utils/getDate";
import formatDuration from "../utils/getTime.js";
export const getPost = async (req, res) => {};
export const createPost = async (req, res) => {
  const { channel_id, title, type, thumbnail, videoURL, description, details } =
    req.body;
  try {
    const channel = await Channel.findOne({
      _id: channel_id,
      user_id: req.user.id,
    });
    if (!channel) {
      console.warn(`${req.user.email} is trying to access unknown user`);
      return res
        .status(403)
        .json({ message: "You are not authorized to post to this channel" });
    }
    let durationInSeconds;
    try {
      durationInSeconds = Math.floor(await getVideoDurationInSeconds(videoURL));
    } catch {
      console.warn("Unable to fetch video duration");
      return res.status(400).json({
        message: "Unable to fetch video duration",
      });
    }
    const createPost = await Post.create({
      user_id: req.user.id,
      channel_id,
      title,
      type,
      thumbnail,
      videoURL,
      postedAt: getNextDate(),
      duration: formatDuration(durationInSeconds),
      description,
      details,
    });
    console.log(`${req.user.email} created new post`);
    return res
      .status(201)
      .json({ message: "Successfully created new post", data: createPost });
  } catch (error) {
    console.error("Error from createPost controller : ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const updatePost = async (req, res) => {};
export const deletePost = async (req, res) => {
  try {
    const dltPost = await Post.findOneAndDelete({
      _id: req.params.id,
      user_id: req.user.id,
    });
    if (!dltPost) {
      console.warn(
        `${req.user.email} trying to delete post that doesn't exist or don't belong to him`
      );
      return res.status(404).json({ message: "Post no longer exists" });
    }
    console.log(
      `${req.user.email} has successfully deleted post : ${req.params.id}`
    );
    return res.status(200).json({ message: "Successfully deleted Post" });
  } catch (error) {
    console.error("Error from deletePost controller : ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
