import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import { getNextDate } from "../utils/getDate.js";
import mongoose from "mongoose";
export const getComment = async (req, res) => {
  try {
    const allComment = await Comment.find({ post_id: req.params.id })
      .populate("user_id", "firstname lastname email")
      .sort({
        createdAt: -1,
      })
      .lean();
    const root = [];
    const map = {};
    allComment.forEach((c) => {
      c.replies = [];
      map[c._id] = c;
    });

    allComment.forEach((c) => {
      if (c.parent_id) {
        map[c.parent_id]?.replies.push(c);
      } else {
        root.push(c);
      }
    });
    console.log(`Successfully fetch all comments of post : ${req.params.id}`);
    return res
      .status(200)
      .json({ message: "Successfully fetched comments", data: root });
  } catch (error) {
    console.error("Error from getComment controller : ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const postComment = async (req, res) => {
  const { parent_id, commentText } = req.body;
  try {
    const postExist = await Post.findById(req.params.id);
    if (!postExist) {
      console.warn(
        `user : ${req.user.id} trying to comment the post : ${req.params.id} that does not exist`
      );
      return res.status(404).json({ message: "Post does not exists" });
    }
    if (parent_id) {
      const parentExist = await Comment.findOne({
        _id: parent_id,
        post_id: req.params.id,
      });
      if (!parentExist) {
        console.error(
          `User : ${req.user.id} is trying to reply on comment:${parent_id} that does not exist`
        );
        return res
          .status(404)
          .json({ message: "Parent Comment does not exist" });
      }
    }
    const commentCreated = await Comment.create({
      post_id: req.params.id,
      user_id: req.user.id,
      parent_id,
      commentText,
      postedAt: getNextDate(),
    });
    await commentCreated.populate("user_id", "firstname lastname email");
    console.log(
      parent_id
        ? "Successfully replied to comment"
        : `user : ${req.user.id} posted comment on Post:${req.params.id}`
    );
    return res.status(201).json({
      message: parent_id
        ? "Successfully replied to comment"
        : "Successfully posted comment",
      data: commentCreated,
    });
  } catch (error) {
    console.error("Error from postComment controller : ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const deleteComment = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deleteComment = await Comment.findOneAndDelete(
      {
        _id: req.params.id,
        user_id: req.user.id,
      },
      { session }
    );
    if (!deleteComment) {
      await session.abortTransaction();
      console.warn(
        `Comment no longer exist or User : ${req.user.id} is not authorized to delete Comment : ${req.params.id}`
      );
      return res.status(404).json({ message: "Comment no longer exist" });
    }
    await Comment.deleteMany({ parent_id: req.params.id }, { session });
    await session.commitTransaction();
    console.log("Successfully deleted comment");
    return res.status(200).json({
      message: "Successfully deleted comment",
    });
  } catch (error) {
    await session.abortTransaction();
    console.error("Error from deleteComment controller : ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await session.endSession();
  }
};
