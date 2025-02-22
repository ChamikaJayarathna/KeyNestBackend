import express from 'express';
import { addProperty, getAllProperties, getSingleProperty, updateProperty } from '../controller/property-controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/get-all-property', verifyToken, getAllProperties);
router.get('/get-single-property/:id', verifyToken, getSingleProperty);
router.post('/create-property', verifyToken, addProperty);
router.post('/update-property/:id', verifyToken, updateProperty);

export default router;