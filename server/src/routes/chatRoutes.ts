import express from 'express';
import { authProtect } from '../controllers/authController';
import { getMessages } from '../controllers/chatsController';

export const router = express.Router();

router.use(authProtect);

//Messages
router.route('/:chatId/messages').get(getMessages);
