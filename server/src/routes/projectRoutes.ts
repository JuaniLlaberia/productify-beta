import express from 'express';
import {
  createEvent,
  createProject,
  deleteEvent,
  deleteProject,
  getProjectById,
  getProjects,
  joinProject,
  leaveProject,
  removeUser,
  toggleAdmin,
  updateEvent,
  updateProject,
} from '../controllers/projectController';
import { adminRestriction, authProtect } from '../controllers/authController';
import {
  addUsersToChat,
  createChat,
  deleteChat,
  deleteUserFromChat,
} from '../controllers/chatsController';
import { validateBody } from '../middleware/validateBody';
import {
  eventSchema,
  projectSchema,
  userIdSchema,
  usersArrIdSchema,
} from '../utils/bodySchemas/joiSchemas';

export const router = express.Router({ mergeParams: true });

router.use(authProtect);

//Projects
router.route('/new').post(validateBody(projectSchema), createProject);
router.route('/').get(getProjects);

router.route('/:projectId').get(getProjectById);
router.route('/join/:invitationId').patch(joinProject);
router.route('/:projectId/leave').patch(leaveProject);

router.route('/update/:projectId').patch(adminRestriction, updateProject);
router.route('/delete/:projectId').delete(adminRestriction, deleteProject);

router
  .route('/toggle-admin/:projectId')
  .patch(adminRestriction, validateBody(userIdSchema), toggleAdmin);

router.route('/remove-user/:projectId').patch(adminRestriction, removeUser);

//Projects Events
router
  .route('/:projectId/event/new')
  .patch(validateBody(eventSchema), createEvent);
router
  .route('/:projectId/event/update/:eventId')
  .patch(validateBody(eventSchema), updateEvent);
router.route('/:projectId/event/delete/:eventId').patch(deleteEvent);

//ProjectsChats
router.route('/:projectId/chat/new').post(createChat);
router.route('/:projectId/chat/:chatId').delete(deleteChat);
router
  .route('/:projectId/chat/:chatId/add-users')
  .patch(validateBody(usersArrIdSchema), addUsersToChat);
router
  .route('/:projectId/chat/:chatId/remove-user')
  .patch(validateBody(userIdSchema), deleteUserFromChat);
