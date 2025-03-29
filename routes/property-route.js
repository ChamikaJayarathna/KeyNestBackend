import express from "express";
import {
  addProperty,
  deleteProperty,
  getAllProperties,
  getSingleProperty,
  getUserProperties,
  searchProperty,
  updateProperty,
} from "../controller/property-controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/get-all-property", getAllProperties);
router.get("/get-single-property/:id", getSingleProperty);
router.get("/get-user-properties", verifyToken, getUserProperties);
router.post("/create-property", verifyToken, addProperty);
router.post("/search-property", searchProperty);
router.put("/update-property/:id", verifyToken, updateProperty);
router.delete("/delete-property/:id", verifyToken, deleteProperty);

export default router;
