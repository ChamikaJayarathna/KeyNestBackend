import express from "express";
import {
  addProperty,
  deleteProperty,
  getAllProperties,
  getSingleProperty,
  searchProperty,
  updateProperty,
} from "../controller/property-controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/get-all-property", getAllProperties);
router.get("/get-single-property/:id", verifyToken, getSingleProperty);
router.post("/create-property", verifyToken, addProperty);
router.post("/update-property/:id", verifyToken, updateProperty);
router.post("/search-property", searchProperty);
router.delete("/delete-property/:id", verifyToken, deleteProperty);

export default router;
