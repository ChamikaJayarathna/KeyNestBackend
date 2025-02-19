import express from 'express';
import { addProperty } from '../controller/property-controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/create-property', verifyToken, addProperty);

export default router;