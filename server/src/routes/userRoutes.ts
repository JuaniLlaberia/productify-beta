import mutler from 'multer';
import express from 'express';
import {
  deleteMe,
  getMe,
  updateMe,
  updateUserImg,
} from '../controllers/userController';
import { authProtect } from '../controllers/authController';

const storage = mutler.memoryStorage();
const update = mutler({ storage });

export const router = express.Router();

router.use(authProtect);

router.route('/me').get(getMe);
router.route('/update').patch(updateMe);
router.route('/update-img').patch(update.single('profileImg'), updateUserImg);
router.route('/delete').delete(deleteMe);
