import express from 'express';
import { addPost } from '../controller/property-controller.js';

const router = express.Router();

router.post('/create-property', addPost);

export default router;