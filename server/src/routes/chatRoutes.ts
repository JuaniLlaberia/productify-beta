import express from 'express';
import { authProtect } from '../controllers/authController';
import {
  addUserToChat,
  createChat,
  deleteChat,
  deleteUserFromChat,
  getChats,
  getMessages,
} from '../controllers/chatsController';

export const router = express.Router();

router.use(authProtect);

//Chats
router.route('/').get(getChats);
router.route('/new').post(createChat);
router.route('/delete/:chatId').delete(deleteChat);
router.route('/:chatId/add-user').patch(addUserToChat);
router.route('/:chatId/remove-user').patch(deleteUserFromChat);

//Messages
router.route('/:chatId/messages').get(getMessages);
