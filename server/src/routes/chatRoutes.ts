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
import { validateBody } from '../middleware/validateBody';
import { chatSchema, userIdSchema } from '../utils/bodySchemas/joiSchemas';

export const router = express.Router();

router.use(authProtect);

//Chats
router.route('/').get(getChats);
router.route('/new').post(validateBody(chatSchema), createChat);
router.route('/delete/:chatId').delete(deleteChat);
router
  .route('/:chatId/add-user')
  .patch(validateBody(userIdSchema), addUserToChat);
router
  .route('/:chatId/remove-user')
  .patch(validateBody(userIdSchema), deleteUserFromChat);

//Messages
router.route('/:chatId/messages').get(getMessages);
