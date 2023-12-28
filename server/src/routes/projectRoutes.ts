import express from 'express';
import {
  adminRestriction,
  createProject,
  deleteProject,
  inviteUser,
  removeUser,
} from '../controllers/projectController';
import { authProtect } from '../controllers/authController';

export const router = express.Router();

router.use(authProtect);

router.route('/new').post(createProject);
router.route('/delete/:projectId').delete(adminRestriction, deleteProject);
router.route('/invite-user/:projectId').post(adminRestriction, inviteUser);
router.route('/remove-user/:projectId').patch(adminRestriction, removeUser);
