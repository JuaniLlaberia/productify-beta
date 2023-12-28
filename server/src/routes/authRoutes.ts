import express from 'express';
import {
  authProtect,
  createPassword,
  loginWithPassword,
  logout,
  verifyEmailCode,
} from '../controllers/authController';

export const router = express.Router();

router.route('/verify-code').post(verifyEmailCode);
router.route('/login').post(loginWithPassword);

//Route protection
router.use(authProtect);

router.route('/logout').get(logout);
router.route('/create-password').post(createPassword);
