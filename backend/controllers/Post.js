import { getVideoDurationInSeconds } from "get-video-duration";
import Post from "../models/Post.js";
import Like from "../models/PostLike.js";
import DisLike from "../models/PostDislike.js";
import Channel from "../models/Channel.js";
import { getNextDate } from "../utils/getDate.js";
import formatDuration from "../utils/getTime.js";
//TODO: Add views functionality and video public, private property, for this you have to update model and then in controller
export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .select(
        "user_id channel_id title type category tags videoURL likes views description details thumbnail views postedAt duration"
      )
      .populate("channel_id", "channelPicture channelName subscribers")
      .populate("user_id", "firstname lastname")
      .lean();
    if (!post) {
      console.error(`${req.user.id} Post not found`);
      return res.status(404).json({ message: "Post not found" });
    }
    const isLiked = await Like.findOne({
      post_id: req.params.id,
      user_id: req.user.id,
    });
    const isDisLiked = await DisLike.findOne({
      post_id: req.params.id,
      user_id: req.user.id,
    });
    console.log("Successfully fetched post");
    return res.status(200).json({
      message: "Successfully fetched post",
      data: {
        ...post,
        channel_id: {
          ...post.channel_id,
          subscribers: post.channel_id.subscribers.length,
          isSubscribed: post.channel_id.subscribers.some((subs) =>
            subs.equals(req.user.id)
          ),
        },
        isliked: isLiked ? true : false,
        isDisLiked: isDisLiked ? true : false,
      },
    });
  } catch (error) {
    console.error("Error Occurred at getPost controller : ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getMorePost = async (req, res) => {
  const { cursor } = req.query;
  const parsedLimit = Math.min(parseInt(req.query.limit) || 10, 20);
  try {
    const query = {};
    if (cursor) {
      query.createdAt = { $lt: new Date(cursor) };
    }
    const posts = await Post.find(query)
      .select("user_id channel_id title thumbnail views postedAt duration")
      .populate("channel_id", "channelPicture channelName")
      .populate("user_id", "firstname lastname")
      .sort({
        createdAt: -1,
      })
      .limit(parsedLimit + 1)
      .lean();
    let nextCursor = null;
    if (posts.length > parsedLimit) {
      const lastPost = posts.pop();
      nextCursor = lastPost.createdAt.toISOString();
    }
    console.log("Successfully fetch Post");
    return res
      .status(200)
      .json({ message: "Successfully fetched Post", data: posts, nextCursor });
  } catch (error) {
    console.error("Error from getMorePost Controller : ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const createPost = async (req, res) => {
  const {
    channel_id,
    title,
    type,
    category,
    tags,
    thumbnail,
    videoURL,
    description,
    details,
  } = req.body;
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
      category,
      tags,
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
export const updatePost = async (req, res) => {
  try {
    //remove unwanted payloads
    const acceptedKey = [
      "thumbnail",
      "description",
      "details",
      "category",
      "tags",
    ];
    const updatedPayLoad = {};
    for (const key of acceptedKey) {
      if (req.body[key] !== undefined) {
        updatedPayLoad[key] = req.body[key];
      }
    }
    const updatePost = await Post.findOneAndUpdate(
      {
        _id: req.params.id,
        user_id: req.user.id,
      },
      { $set: updatedPayLoad },
      { new: true, runValidators: true }
    );
    if (!updatePost) {
      console.error(
        `User : ${req.user.email} trying to update Post : ${req.params.id} that does not exist or might user is not authorized`
      );
      return res.status(404).json({
        message: "Post no longer exists",
      });
    }
    console.log("Successfully Post has been updated", updatePost);
    return res.status(200).json({
      message: "Successfully Post has been updated",
      data: updatePost,
    });
  } catch (error) {
    console.error("Error from updatePost controller : ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
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
