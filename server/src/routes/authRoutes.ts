import express from 'express';
import { logout, verifyEmailCode } from '../controllers/authController';

export const router = express.Router();

router.route('/logout').get(logout);
router.route('/verify-code').post(verifyEmailCode);
