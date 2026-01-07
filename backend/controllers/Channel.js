import Channel from "../models/Channel.js";
import mongoose from "mongoose";
import User from "../models/User.js";
// require all mandatory fields
export const createChannel = async (req, res) => {
  const { channelName, channelBanner, channelPicture, description } = req.body;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const createChannel = await Channel.create(
      {
        user_id: req.user.id,
        channelName,
        channelBanner,
        channelPicture,
        description,
      },
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
    return res
      .status(201)
      .json({ message: `Successfully Created Channel for ${req.user.email}` });
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
      console.error(
        `User : ${req.user.email} trying to delete channel : ${req.params.id} that does not exist or might user is not authorized`
      );
      return res.status(404).json({
        message: "Channel no longer exists or you are not authorized",
      });
    }

    await User.updateOne(
      { _id: req.user.id },
      { $pull: { channels: deleteChannel._id } },
      { session }
    );
    await session.commitTransaction();
    console.log("Successfully Channel has been deleted", deleteChannel);
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
        updateData[key] = req.body[key];
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
      await Channel.updateOne(
        { _id: req.params.id },
        { $pull: { subscribers: req.user.id } },
        { session }
      );
      const unsubscribe = await User.updateOne(
        { _id: req.user.id },
        { $pull: { subscription: req.params.id } },
        { session }
      );
      await session.commitTransaction();
      console.log(
        `User : ${req.user.id}, unsubscribed to channel-${req.params.id}`
      );
      return res
        .status(200)
        .json({ message: "Successfully unsubscribed", data: unsubscribe });
    }
    await Channel.updateOne(
      { _id: req.params.id },
      { $addToSet: { subscribers: req.user.id } },
      { session }
    );
    const subscription = await User.updateOne(
      { _id: req.user.id },
      { $addToSet: { subscription: req.params.id } },
      { session }
    );
    await session.commitTransaction();
    console.log(
      `User : ${req.user.id}, subscribed to channel-${req.params.id}`
    );
    return res
      .status(200)
      .json({ message: "Successfully subscribed", data: subscription });
  } catch (error) {
    await session.abortTransaction();
    console.error("Error from subscriberToggle Controller : ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await session.endSession();
  }
};
