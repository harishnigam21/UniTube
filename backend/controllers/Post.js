import { getVideoDurationInSeconds } from "get-video-duration";
import Post from "../models/Post.js";
import mongoose from "mongoose";
import Channel from "../models/Channel.js";
import { getNextDate } from "../utils/getDate.js";
import formatDuration from "../utils/getTime.js";
//TODO: Add views functionality and video public, private property, for this you have to update model and then in controller
export const getPost = async (req, res) => {
  const postId = new mongoose.Types.ObjectId(req.params.id);
  const userId = new mongoose.Types.ObjectId(req.user.id);
  try {
    const result = await Post.aggregate([
      { $match: { _id: postId } },
      {
        $lookup: {
          from: "channels",
          localField: "channel_id",
          foreignField: "_id",
          as: "channel_id",
        },
      },
      { $unwind: "$channel_id" },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user_id",
        },
      },
      { $unwind: "$user_id" },
      {
        $lookup: {
          from: "likes",
          let: { pId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$post_id", "$$pId"] },
                    { $eq: ["$user_id", userId] },
                  ],
                },
              },
            },
          ],
          as: "likeStatus",
        },
      },
      {
        $lookup: {
          from: "dislikes",
          let: { pId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$post_id", "$$pId"] },
                    { $eq: ["$user_id", userId] },
                  ],
                },
              },
            },
          ],
          as: "dislikeStatus",
        },
      },
      {
        $project: {
          title: 1,
          type: 1,
          category: 1,
          tags: 1,
          videoURL: 1,
          likes: 1,
          views: 1,
          description: 1,
          details: 1,
          thumbnail: 1,
          postedAt: 1,
          duration: 1,
          user_id: { firstname: 1, lastname: 1 },
          channel_id: {
            channelPicture: 1,
            channelName: 1,
            channelHandler: 1,
            subscribers: { $size: "$channel_id.subscribers" },
            isSubscribed: { $in: [userId, "$channel_id.subscribers"] },
          },
          isliked: { $gt: [{ $size: "$likeStatus" }, 0] },
          isDisLiked: { $gt: [{ $size: "$dislikeStatus" }, 0] },
        },
      },
    ]);
    const post = result[0];
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    console.log("Successfully fetched post");
    return res.status(200).json({
      message: "Successfully fetched post",
      data: post,
    });
  } catch (error) {
    console.error("Error Occurred at getPost controller : ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getMorePost = async (req, res) => {
  const { cursor, category } = req.query;
  const parsedLimit = Math.min(parseInt(req.query.limit) || 5, 10);
  try {
    const result = await Post.aggregate([
      {
        $facet: {
          posts: [
            {
              $match: {
                ...(cursor && { createdAt: { $lt: new Date(cursor) } }),
                ...(category && category !== "All" && { category: category }),
              },
            },
            { $sort: { createdAt: -1 } },
            { $limit: parsedLimit + 1 },
            {
              $lookup: {
                from: "channels",
                localField: "channel_id",
                foreignField: "_id",
                as: "channel_id",
              },
            },
            {
              $unwind: {
                path: "$channel_id",
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $lookup: {
                from: "users",
                localField: "user_id",
                foreignField: "_id",
                as: "user_id",
              },
            },
            { $unwind: { path: "$user_id", preserveNullAndEmptyArrays: true } },
            {
              $project: {
                title: 1,
                thumbnail: 1,
                category: 1,
                views: 1,
                postedAt: 1,
                duration: 1,
                createdAt: 1,
                "channel_id.channelPicture": 1,
                "channel_id.channelName": 1,
                "user_id.firstname": 1,
                "user_id.lastname": 1,
              },
            },
          ],
          allCategories: [
            { $group: { _id: "$category" } },
            { $match: { _id: { $ne: null } } },
            { $sort: { _id: 1 } },
            { $group: { _id: null, categories: { $push: "$_id" } } },
          ],
        },
      },
    ]);

    const facetResult = result[0];
    let posts = facetResult.posts || [];
    const categories = facetResult.allCategories[0]?.categories || [];

    let nextCursor = null;
    if (posts.length > parsedLimit) {
      const lastPost = posts.pop();
      nextCursor = lastPost.createdAt.toISOString();
    }

    return res.status(200).json({
      message: "Successfully fetched Post",
      data: posts,
      nextCursor,
      categories,
    });
  } catch (error) {
    console.error("Error from getMorePost Controller : ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const createPost = async (req, res) => {
  const { channel_id, title, type, category, tags, description, details } =
    req.body;
  const thumbnail = req.files?.thumbnail
    ? req.files.thumbnail[0].path.replace(/\\/g, "/")
    : null;
  const videoURL = req.files?.videoURL
    ? req.files.videoURL[0].path.replace(/\\/g, "/")
    : null;
  try {
    const channel = await Channel.findOne({
      _id: channel_id,
      user_id: req.user.id,
    });
    if (!channel) {
      console.warn(
        `${req.user.id} is trying to create post on unknown channel`
      );
      return res.status(404).json({ message: "Channel not Found" });
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
      tags: tags.split(","),
      thumbnail,
      videoURL,
      postedAt: getNextDate(),
      duration: formatDuration(durationInSeconds),
      description,
      details: JSON.parse(details),
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
    //TODO:also delete comment, likes and dislikes of this post, priority-low
    return res.status(200).json({ message: "Successfully deleted Post" });
  } catch (error) {
    console.error("Error from deletePost controller : ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
