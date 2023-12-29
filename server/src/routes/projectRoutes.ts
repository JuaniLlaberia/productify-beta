import express from 'express';
import {
  adminRestriction,
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
  inviteUser,
  joinProject,
  removeUser,
  toggleAdmin,
  updateProject,
} from '../controllers/projectController';
import { authProtect } from '../controllers/authController';

export const router = express.Router();

router.use(authProtect);

router.route('/new').post(createProject);
router.route('/').get(getProjects);

router.route('/:projectId').get(getProjectById);
router.route('/join/:projectId').patch(joinProject);

router.use(adminRestriction);

router.route('/update/:projectId').patch(updateProject);
router.route('/delete/:projectId').delete(deleteProject);

router.route('/toggle-admin/:projectId').patch(toggleAdmin);
router.route('/invite-user/:projectId').post(inviteUser);
router.route('/remove-user/:projectId').patch(removeUser);
