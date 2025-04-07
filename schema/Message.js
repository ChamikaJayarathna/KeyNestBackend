import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "chat",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("message", messageSchema);
