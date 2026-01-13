import mongoose from "mongoose";
import Comment from "../models/Comment.js";
import Like from "../models/CommentLike.js";
import Dislike from "../models/CommentDislike.js";
export const commentLike = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const findComment = await Comment.findById(req.params.id).session(session);
    if (!findComment) {
      await session.abortTransaction();
      console.error(`Comment does not exist`);
      return res.status(404).json({ message: "Comment does not exist" });
    }
    const checkLike = await Like.findOne({
      user_id: req.user.id,
      comment_id: findComment.id,
    }).session(session);
    if (!checkLike) {
      await Like.create(
        [{ user_id: req.user.id, comment_id: findComment.id }],
        {
          session,
        }
      );
      const updatedComment = await Comment.findByIdAndUpdate(
        findComment.id,
        { $inc: { likes: 1 } },
        { new: true, runValidators: true, session }
      );

      //deleting and updating record from dislike collection for same comment
      const deleteDisLike = await Dislike.findOneAndDelete({
        user_id: req.user.id,
        comment_id: req.params.id,
      }).session(session);
      if (deleteDisLike) {
        await Comment.updateOne(
          {
            _id: findComment.id,
            dislikes: { $gt: 0 },
          },
          { $inc: { dislikes: -1 } },
          { session }
        );
      }

      await session.commitTransaction();
      console.log(`${req.user.id} liked comment:${findComment.id}`);
      return res.status(201).json({
        message: "Successfully liked",
        likes: updatedComment.likes,
        status: true,
      });
    }
    await Like.deleteOne({ _id: checkLike.id }).session(session);
    const removeLike = await Comment.findOneAndUpdate(
      {
        _id: findComment.id,
        likes: { $gt: 0 },
      },
      { $inc: { likes: -1 } },
      { session, new: true, runValidators: true }
    );
    await session.commitTransaction();
    console.log(
      `${req.user.id} takes its like back from comment:${findComment.id}`
    );
    return res.status(200).json({
      message: "Like removed",
      likes: removeLike.likes,
      status: false,
    });
  } catch (error) {
    await session.abortTransaction();
    console.error("Error from CommentLike Controller : ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await session.endSession();
  }
};
export const commentDislike = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const findComment = await Comment.findById(req.params.id).session(session);
    if (!findComment) {
      await session.abortTransaction();
      console.error(`Comment does not exist`);
      return res.status(404).json({ message: "Comment does not exist" });
    }
    const checkDisLike = await Dislike.findOne({
      user_id: req.user.id,
      comment_id: findComment.id,
    }).session(session);
    if (!checkDisLike) {
      await Dislike.create(
        [{ user_id: req.user.id, comment_id: findComment.id }],
        {
          session,
        }
      );

      //deleting and updating record from like collection for same comment
      const deleteLike = await Like.findOneAndDelete({
        user_id: req.user.id,
        comment_id: req.params.id,
      }).session(session);
      if (deleteLike) {
        await Comment.updateOne(
          {
            _id: findComment.id,
            likes: { $gt: 0 },
          },
          { $inc: { likes: -1 } },
          { session }
        );
      }
      const updatedComment = await Comment.findByIdAndUpdate(
        findComment.id,
        { $inc: { dislikes: 1 } },
        { new: true, runValidators: true, session }
      );
      await session.commitTransaction();
      console.log(`${req.user.id} disliked comment:${findComment.id}`);
      return res.status(201).json({
        message: "Successfully disliked",
        likes: updatedComment.likes,
        status: true,
      });
    }
    await Dislike.deleteOne({ _id: checkDisLike.id }).session(session);
    await Comment.updateOne(
      {
        _id: findComment.id,
        dislikes: { $gt: 0 },
      },
      { $inc: { dislikes: -1 } },
      { session }
    );
    await session.commitTransaction();
    console.log(
      `${req.user.id} take back its dislike from comment:${findComment.id}`
    );
    return res.status(200).json({ message: "Dislike removed", status: false });
  } catch (error) {
    await session.abortTransaction();
    console.error("Error from commentDisLike Controller : ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await session.endSession();
  }
};
