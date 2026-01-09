import mongoose from "mongoose";
import Post from "../models/Post.js";
import Like from "../models/PostLike.js";
import Dislike from "../models/PostDislike.js";
export const postLike = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const findPost = await Post.findById(req.params.id).session(session);
    if (!findPost) {
      await session.abortTransaction();
      console.error(`Post does not exist`);
      return res.status(404).json({ message: "Post does not exist" });
    }
    const checkLike = await Like.findOne({
      user_id: req.user.id,
      post_id: findPost.id,
    }).session(session);
    if (!checkLike) {
      await Like.create([{ user_id: req.user.id, post_id: findPost.id }], {
        session,
      });
      const updatedPost = await Post.findByIdAndUpdate(
        findPost.id,
        { $inc: { likes: 1 } },
        { new: true, runValidators: true, session }
      );

      //deleting and updating record from dislike collection for same post
      const deleteDisLike = await DislikeLike.findOneAndDelete({
        user_id: req.user.id,
        post_id: req.params.id,
      }).session(session);
      if (deleteDisLike) {
        await Post.updateOne(
          {
            _id: findPost.id,
            dislikes: { $gt: 0 },
          },
          { $inc: { dislikes: -1 } },
          { session }
        );
      }

      await session.commitTransaction();
      console.log(`${req.user.id} liked post:${findPost.id}`);
      return res
        .status(201)
        .json({ message: "Successfully liked", likes: updatedPost.likes });
    }
    await Like.deleteOne({ _id: checkLike.id }).session(session);
    await Post.updateOne(
      {
        _id: findPost.id,
        likes: { $gt: 0 },
      },
      { $inc: { likes: -1 } },
      { session }
    );
    await session.commitTransaction();
    console.log(`${req.user.id} takes its like back from post:${findPost.id}`);
    return res.status(200).json({ message: "Like removed" });
  } catch (error) {
    await session.abortTransaction();
    console.error("Error from videoLike Controller : ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await session.endSession();
  }
};
export const postDislike = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const findPost = await Post.findById(req.params.id).session(session);
    if (!findPost) {
      await session.abortTransaction();
      console.error(`Post does not exist`);
      return res.status(404).json({ message: "Post does not exist" });
    }
    const checkDisLike = await Dislike.findOne({
      user_id: req.user.id,
      post_id: findPost.id,
    }).session(session);
    if (!checkDisLike) {
      await Dislike.create([{ user_id: req.user.id, post_id: findPost.id }], {
        session,
      });

      //deleting and updating record from like collection for same post
      const deleteLike = await Like.findOneAndDelete({
        user_id: req.user.id,
        post_id: req.params.id,
      }).session(session);
      if (deleteLike) {
        await Post.updateOne(
          {
            _id: findPost.id,
            likes: { $gt: 0 },
          },
          { $inc: { likes: -1 } },
          { session }
        );
      }
      const updatedPost = await Post.findByIdAndUpdate(
        findPost.id,
        { $inc: { dislikes: 1 } },
        { new: true, runValidators: true, session }
      );
      await session.commitTransaction();
      console.log(`${req.user.id} disliked post:${findPost.id}`);
      return res
        .status(201)
        .json({ message: "Successfully disliked", likes: updatedPost.likes });
    }
    await Dislike.deleteOne({ _id: checkDisLike.id }).session(session);
    await Post.updateOne(
      {
        _id: findPost.id,
        dislikes: { $gt: 0 },
      },
      { $inc: { dislikes: -1 } },
      { session }
    );
    await session.commitTransaction();
    console.log(
      `${req.user.id} take back its dislike from post:${findPost.id}`
    );
    return res.status(200).json({ message: "Dislike removed" });
  } catch (error) {
    await session.abortTransaction();
    console.error("Error from videoDisLike Controller : ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await session.endSession();
  }
};
