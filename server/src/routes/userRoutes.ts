import express from 'express';
import {
  deleteMe,
  getMe,
  updateMe,
  userSearch,
} from '../controllers/userController';
import { authProtect } from '../controllers/authController';

export const router = express.Router();

router.use(authProtect);

router.route('/me').get(getMe);
router.route('/search').get(userSearch);
router.route('/update').patch(updateMe);
router.route('/delete').delete(deleteMe);
