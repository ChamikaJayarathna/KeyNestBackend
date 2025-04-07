import express from "express";
import { getChats } from "../controller/chat-controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/get-chats", verifyToken, getChats);

export default router;