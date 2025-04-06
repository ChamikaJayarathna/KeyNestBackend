import express from "express";
import {
  editUserDetails,
  getProfile,
  getUserCount,
  login,
  register,
} from "../controller/auth-controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/profile/:id", getProfile);
router.get("/get-user-count", getUserCount);
router.post("/register", register);
router.post("/login", login);
router.put("/edit-user/:id", verifyToken, editUserDetails);

export default router;
