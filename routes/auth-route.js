import express from "express";
import {
  getProfile,
  getUserCount,
  login,
  register,
} from "../controller/auth-controller.js";

const router = express.Router();

router.get("/profile/:id", getProfile);
router.get("/get-user-count", getUserCount);
router.post("/register", register);
router.post("/login", login);

export default router;
