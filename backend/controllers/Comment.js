import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import { getNextDate } from "../utils/getDate.js";
import mongoose from "mongoose";

// This fetch the all comments of that post,  using aggregation for some joining anf mapping fields we need some from user, commentdislikes and commentlikes to get number of likes and dislikes and status that which comment this user is liked and disliked.
//Algorithm to map nested comment, we simply creating root and map, where root will be having who's parent_id is null and map to map all comments with new field in object of replies.
//After it finishes root is sended as response and furthur is done at frontend side to map it.
export const getComment = async (req, res) => {
  try {
    const allComment = await Comment.aggregate([
      {
        $match: {
          post_id: new mongoose.Types.ObjectId(req.params.id),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $lookup: {
          from: "commentlikes",
          let: { commentId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$comment_id", "$$commentId"] },
                    {
                      $eq: [
                        "$user_id",
                        new mongoose.Types.ObjectId(req.user.id),
                      ],
                    },
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
          from: "commentdislikes",
          let: { commentId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$comment_id", "$$commentId"] },
                    {
                      $eq: [
                        "$user_id",
                        new mongoose.Types.ObjectId(req.user.id),
                      ],
                    },
                  ],
                },
              },
            },
          ],
          as: "dislikeStatus",
        },
      },
      {
        $addFields: {
          isLiked: { $gt: [{ $size: "$likeStatus" }, 0] },
          isDisliked: { $gt: [{ $size: "$dislikeStatus" }, 0] },
          user_id: {
            firstname: "$user.firstname",
            lastname: "$user.lastname",
            email: "$user.email",
          },
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $project: {
          likeStatus: 0,
          dislikeStatus: 0,
          user: 0,
        },
      },
    ]);
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
//We have separate collection for comment, so it is simple creating comment, by taking parent_id and commentText from body and user_id from req.user.id
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

//This handles the deletion of comment, transaction is used to delete comment for that id is provided and delete all replies of that comment.
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

//This handler just updates the comment by taking txt from body
export const updateComment = async (req, res) => {
  const { txt } = req.body;
  try {
    if (!txt || !txt.trim()) {
      console.warn(
        `Invalid update is done by ${req.user.id} to comment ${req.params.id} `
      );
      return res.status(422).json({ message: "Not valid comment" });
    }
    const updateComment = await Comment.findOneAndUpdate(
      {
        _id: req.params.id,
        user_id: req.user.id,
      },
      { $set: { commentText: txt.trim() } },
      { new: true }
    );
    if (!updateComment) {
      console.warn("Comment not found or unauthorized");
      return res.status(404).json({ message: "No such comment exist" });
    }
    console.log("Successfully updated comment");
    return res.status(200).json({
      message: "Successfully updated comment",
      txt: updateComment.commentText,
    });
  } catch (error) {
    console.error("Error from updateComment controller : ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
