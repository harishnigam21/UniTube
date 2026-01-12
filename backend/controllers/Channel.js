import Channel from "../models/Channel.js";
import mongoose from "mongoose";
import User from "../models/User.js";
import Post from "../models/Post.js";
// require all mandatory fields
export const createChannel = async (req, res) => {
  const { channelName, channelHandler, channelDescription } = req.body;
  const bannerPath = req.files?.channelBanner
    ? req.files.channelBanner[0].path.replace(/\\/g, "/")
    : null;
  const picturePath = req.files?.channelPicture
    ? req.files.channelPicture[0].path.replace(/\\/g, "/")
    : null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const handlerExist = await Channel.findOne({ channelHandler });
    if (handlerExist) {
      console.warn(
        `${req.user.id} checks for handler ${channelHandler}, but it already exist`
      );
      return res
        .status(409)
        .json({ message: "Handler already exist", status: false });
    }
    const [createChannel] = await Channel.create(
      [
        {
          user_id: req.user.id,
          channelName,
          channelHandler,
          channelBanner: bannerPath,
          channelPicture: picturePath,
          description: channelDescription,
        },
      ],
      { session }
    );
    await User.updateOne(
      { _id: req.user.id },
      { $addToSet: { channels: createChannel._id } },
      { session }
    );
    await session.commitTransaction();
    console.log(
      `Successfully Created Channel for ${req.user.email}`,
      createChannel
    );
    return res.status(201).json({
      message: `Successfully Created Channel`,
      data: createChannel._id,
    });
  } catch (error) {
    await session.abortTransaction();
    console.error("Error from createChannel controller : ", error);
    return res.status(500).json({ message: "Internal Serer Error" });
  } finally {
    await session.endSession();
  }
};
//require id
export const deleteChannel = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const deleteChannel = await Channel.findOneAndDelete(
      {
        _id: req.params.id,
        user_id: req.user.id,
      },
      { session }
    );
    if (!deleteChannel) {
      await session.abortTransaction();
      console.error(
        `User : ${req.user.email} trying to delete channel : ${req.params.id} that does not exist or might user is not authorized`
      );
      return res.status(404).json({
        message: "Channel no longer exists",
      });
    }

    await User.updateOne(
      { _id: req.user.id },
      { $pull: { channels: deleteChannel._id } },
      { session }
    );

    await Post.deleteMany(
      { user_id: req.user.id, channel_id: deleteChannel._id },
      { session }
    );

    await session.commitTransaction();
    console.log(`Channel ${deleteChannel._id} deleted by user ${req.user.id}`);
    return res
      .status(200)
      .json({ message: "Successfully Channel has been deleted" });
  } catch (error) {
    await session.abortTransaction();
    console.error("Error from deleteChannel controller : ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  } finally {
    session.endSession();
  }
};
//require id and update data info, using PATCH here instead of PUT
//available only for channel creator
export const updateChannel = async (req, res) => {
  try {
    //remove unwanted payloads
    const acceptedKey = [
      "channelName",
      "channelBanner",
      "channelPicture",
      "description",
    ];
    const updatedPayLoad = {};
    for (const key of acceptedKey) {
      if (req.body[key] !== undefined) {
        updatedPayLoad[key] = req.body[key];
      }
      if (req.files && req.files.channelBanner) {
        updatedPayLoad[channelBanner] = req.files.channelBanner[0].path.replace(
          /\\/g,
          "/"
        );
      }
      if (req.files && req.files.channelPicture) {
        updatedPayLoad[channelPicture] =
          req.files.channelPicture[0].path.replace(/\\/g, "/");
      }
    }
    const updateChannel = await Channel.findOneAndUpdate(
      {
        _id: req.params.id,
        user_id: req.user.id,
      },
      { $set: updatedPayLoad },
      { new: true, runValidators: true }
    );
    if (!updateChannel) {
      console.error(
        `User : ${req.user.email} trying to update channel : ${req.params.id} that does not exist or might user is not authorized`
      );
      return res.status(404).json({
        message: "Channel no longer exists",
      });
    }
    console.log("Successfully Channel has been updated", updateChannel);
    return res.status(200).json({
      message: "Successfully Channel has been updated",
      data: updateChannel,
    });
  } catch (error) {
    console.error("Error from updateChannel Controller : ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//require id of subscriber, update subscriber array in Channel
export const subscriberToggle = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const channel = await Channel.findById(req.params.id).session(session);
    if (!channel) {
      await session.abortTransaction();
      console.error(`No such channel found`);
      return res.status(404).json({ message: "No such channel found" });
    }
    if (channel.subscribers.some((id) => id.toString() === req.user.id)) {
      const subscriber = await Channel.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { subscribers: req.user.id } },
        { session, new: true }
      );
      await User.updateOne(
        { _id: req.user.id },
        { $pull: { subscription: req.params.id } },
        { session }
      );
      await session.commitTransaction();
      console.log(
        `User : ${req.user.id}, unsubscribed to channel-${req.params.id}`
      );
      return res.status(200).json({
        message: "Successfully unsubscribed",
        subscriber: subscriber.subscribers.length,
        status: false,
      });
    }
    const subscriber = await Channel.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { subscribers: req.user.id } },
      { session, new: true }
    );
    await User.updateOne(
      { _id: req.user.id },
      { $addToSet: { subscription: req.params.id } },
      { session }
    );
    await session.commitTransaction();
    console.log(
      `User : ${req.user.id}, subscribed to channel-${req.params.id}`
    );
    return res.status(200).json({
      message: "Successfully subscribed",
      subscriber: subscriber.subscribers.length,
      status: true,
    });
  } catch (error) {
    await session.abortTransaction();
    console.error("Error from subscriberToggle Controller : ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await session.endSession();
  }
};

export const validateHandler = async (req, res) => {
  try {
    const handlerExist = await Channel.findOne({
      channelHandler: req.params.handler,
    });
    if (handlerExist) {
      console.warn(
        `${req.user.id} checks for handler ${req.params.handler}, but it already exist`
      );
      return res
        .status(409)
        .json({ message: "Handler already exist", status: false });
    }
    console.log("Handler does not exist");
    return res.status(200).json({ message: "Handler Available", status: true });
  } catch (error) {
    console.error("Error from validateHandler Controller : ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
