import express from "express";
import {
  addProperty,
  deleteProperty,
  filterByPropertyType,
  filterProperties,
  getAllProperties,
  getPropertyTypeCount,
  getSingleProperty,
  getTotalPropertyListingCount,
  getUserProperties,
  getUserTotalPropertyListingCount,
  searchProperty,
  updateProperty,
} from "../controller/property-controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/get-all-property", getAllProperties);
router.get("/get-single-property/:id", getSingleProperty);
router.get("/get-user-properties", verifyToken, getUserProperties);
router.get("/get-total-property-count", getTotalPropertyListingCount);
router.get("/get-user-total-property-count", verifyToken, getUserTotalPropertyListingCount);
router.get("/get-property-type-count", getPropertyTypeCount);
router.post("/filter-property", filterProperties);
router.post("/create-property", verifyToken, addProperty);
router.post("/search-property", searchProperty);
router.post("/filter-property-type", filterByPropertyType);
router.put("/update-property/:id", verifyToken, updateProperty);
router.delete("/delete-property/:id", verifyToken, deleteProperty);

export default router;
