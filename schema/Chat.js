import mongoose, { Schema } from "mongoose";

const chatSchema = new Schema({
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  }],
  userIDs: [{
    type: mongoose.Schema.Types.ObjectId,
  }],
  seenBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }],
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'message'
  }],
  lastMessage: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("chat", chatSchema);
