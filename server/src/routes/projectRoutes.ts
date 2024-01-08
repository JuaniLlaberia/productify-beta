import express from 'express';
import {
  adminRestriction,
  createEvent,
  createProject,
  deleteEvent,
  deleteProject,
  getProjectById,
  getProjects,
  inviteUser,
  joinProject,
  leaveProject,
  removeUser,
  toggleAdmin,
  updateEvent,
  updateProject,
} from '../controllers/projectController';
import { authProtect } from '../controllers/authController';
import {
  addUserToChat,
  createChat,
  deleteChat,
  deleteUserFromChat,
} from '../controllers/chatsController';
import { validateBody } from '../middleware/validateBody';
import {
  eventSchema,
  projectSchema,
  userIdSchema,
} from '../utils/bodySchemas/joiSchemas';

export const router = express.Router({ mergeParams: true });

router.use(authProtect);

router.route('/new').post(validateBody(projectSchema), createProject);
router.route('/').get(getProjects);

router.route('/:projectId').get(getProjectById);
router.route('/:projectId/join').patch(joinProject);
router.route('/:projectId/leave').patch(leaveProject);

router
  .route('/:projectId/event/new')
  .patch(validateBody(eventSchema), createEvent);
router
  .route('/:projectId/event/update/:eventId')
  .patch(validateBody(eventSchema), updateEvent);
router.route('/:projectId/event/delete/:eventId').patch(deleteEvent);

router.route('/:projectId/chat/new').patch(createChat);
router.route('/:projectId/chat/:chatId/delete').patch(deleteChat);
router
  .route('/:projectId/chat/:chatId/add-user')
  .patch(validateBody(userIdSchema), addUserToChat);
router
  .route('/:projectId/chat/:chatId/remove-user')
  .patch(validateBody(userIdSchema), deleteUserFromChat);

router.route('/update/:projectId').patch(adminRestriction, updateProject);
router.route('/delete/:projectId').delete(adminRestriction, deleteProject);

router
  .route('/toggle-admin/:projectId')
  .patch(adminRestriction, validateBody(userIdSchema), toggleAdmin);
router.route('/invite-user/:projectId').post(adminRestriction, inviteUser);
router.route('/remove-user/:projectId').patch(adminRestriction, removeUser);
