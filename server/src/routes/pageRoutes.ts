import express from 'express';
import { authProtect } from '../controllers/authController';
import { adminRestriction } from '../controllers/projectController';
import {
  addContent,
  belongsToUser,
  changeStatusContent,
  createPage,
  deleteContent,
  deletePage,
  updateContent,
} from '../controllers/pageController';

export const router = express.Router();

router.use(authProtect);

//Pages actions
router.route('/new/:projectId').post(adminRestriction, createPage);
router.route('/delete/:pageId/:projectId').delete(adminRestriction, deletePage);

//Content actions
router.route('/:pageId/content/new').patch(addContent);
router
  .route('/:pageId/content/update/:contentId')
  .patch(belongsToUser, updateContent);
router
  .route('/:pageId/content/update-status/:contentId')
  .patch(changeStatusContent);
router
  .route('/:pageId/content/delete/:contentId')
  .patch(belongsToUser, deleteContent);
