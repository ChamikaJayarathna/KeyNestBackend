import express from 'express';
import { addProperty, getAllProperties } from '../controller/property-controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/get-all-property', verifyToken, getAllProperties);
router.post('/create-property', verifyToken, addProperty);

export default router;