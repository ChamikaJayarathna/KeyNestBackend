import Chat from "../schema/Chat.js";

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
