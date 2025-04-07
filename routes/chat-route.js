import express from "express";
import { addChat, getChats } from "../controller/chat-controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/get-chats", verifyToken, getChats);
router.post("/add-chats", verifyToken, addChat);

export default router;
