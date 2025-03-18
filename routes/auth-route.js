import express from 'express';
import { getProfile, login, register } from '../controller/auth-controller.js';

const router = express.Router();

router.get('/profile/:id', getProfile); 
router.post('/register', register);
router.post('/login', login);

export default router;