import express from 'express';

import { authProtect } from '../controllers/authController';
import { adminRestriction } from '../controllers/projectController';
import {
  addTask,
  belongsToUser,
  changeStatusTask,
  createPage,
  deleteTask,
  deletePage,
  getPage,
  updateTask,
  addColumn,
  deleteColumn,
} from '../controllers/pageController';

import { validateBody } from '../middleware/validateBody';
import {
  taskSchema,
  contentTypeSchema,
  pageSchema,
  columnSchema,
} from '../utils/bodySchemas/joiSchemas';

export const router = express.Router();

router.use(authProtect);

//Pages actions
router.route('/:pageId').get(getPage);
router
  .route('/:projectId/new-page')
  .post(adminRestriction, validateBody(pageSchema), createPage);
router.route('/:projectId/delete/:pageId').delete(adminRestriction, deletePage);

//Columns actions
router
  .route('/:pageId/column/new')
  .patch(validateBody(columnSchema), addColumn);
router
  .route('/:pageId/column/delete/:columnId')
  .delete(adminRestriction, deleteColumn);

//Tasks actions
router.route('/:pageId/task/new').patch(validateBody(taskSchema), addTask);
router.route('/:pageId/task/update/:taskId').patch(belongsToUser, updateTask);
router
  .route('/:pageId/task/update-status/:taskId')
  .patch(validateBody(contentTypeSchema), changeStatusTask);
router.route('/:pageId/task/delete/:taskId').delete(belongsToUser, deleteTask);
