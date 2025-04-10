import express from "express";
import {
  addChat,
  getChat,
  getChats,
  readChat,
} from "../controller/chat-controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/get-chats", verifyToken, getChats);
router.get("/get-chat/:id", verifyToken, getChat);
router.post("/add-chats", verifyToken, addChat);
router.put("/read-chat/:id", verifyToken, readChat);

export default router;
