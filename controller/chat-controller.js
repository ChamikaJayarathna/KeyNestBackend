import Chat from "../schema/Chat.js";
import User from "../schema/User.js";

export const getChats = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const chats = await Chat.find({
      userIDs: tokenUserId,
    })
      .populate({
        path: "users",
        select: "_id username profile_img",
      })
      .populate({
        path: "messages",
        options: { sort: { createdAt: -1 }, limit: 1 },
      })
      .lean();

    const modifiedChats = chats.map((chat) => {
      const receiver = chat.users.find(
        (user) => user._id.toString() !== tokenUserId
      );

      return {
        ...chat,
        receiver,
      };
    });

    res.status(200).json(modifiedChats);
  } catch (err) {
    console.error("Error getting chats:", err);
    res.status(500).json({ message: "Failed to get chats!" });
  }
};

export const addChat = async (req, res) => {
  const tokenUserId = req.userId;
  const receiverId = req.body.receiverId;

  try {
    const existingChat = await Chat.findOne({
      userIDs: { $all: [tokenUserId, receiverId] },
      userIDs: { $size: 2 },
    });

    if (existingChat) {
      return res.status(200).json(existingChat);
    }

    const newChat = new Chat({
      users: [tokenUserId, receiverId],
      userIDs: [tokenUserId, receiverId],
    });

    await newChat.save();

    await User.updateMany(
      { _id: { $in: [tokenUserId, receiverId] } },
      { $push: { chats: newChat._id, chatIDs: newChat._id } }
    );

    res.status(200).json(newChat);
  } catch (err) {
    console.error("Error adding chat:", err);
    res.status(500).json({ message: "Failed to add chat!" });
  }
};
