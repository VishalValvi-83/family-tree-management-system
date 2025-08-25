import express from 'express';
const router = express.Router();
import { postlogin, postSignup } from '../controller/User.js';

router.post('/signup', postSignup);
router.post('/login', postlogin);

export default router;
