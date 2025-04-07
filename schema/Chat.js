import mongoose, { Schema } from "mongoose";

const chatSchema = new Schema({
  users: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  userIDs: {
    type: mongoose.Schema.Types.ObjectId,
  },
  seenBy: {
    type: mongoose.Schema.Types.ObjectId,
  },
  messages: {
    type: mongoose.Schema.Types.ObjectId,
  },
  lastMessage: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("chat", chatSchema);
