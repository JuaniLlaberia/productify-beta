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
  removeUser,
  toggleAdmin,
  updateEvent,
  updateProject,
} from '../controllers/projectController';
import { authProtect } from '../controllers/authController';

export const router = express.Router({ mergeParams: true });

router.use(authProtect);

router.route('/new').post(createProject);
router.route('/').get(getProjects);

router.route('/:projectId').get(getProjectById);
router.route('/join/:projectId').patch(joinProject);

router.route('/:projectId/event/new').patch(createEvent);
router.route('/:projectId/event/update/:eventId').patch(updateEvent);
router.route('/:projectId/event/delete/:eventId').patch(deleteEvent);

router.route('/update/:projectId').patch(adminRestriction, updateProject);
router.route('/delete/:projectId').delete(adminRestriction, deleteProject);

router.route('/toggle-admin/:projectId').patch(adminRestriction, toggleAdmin);
router.route('/invite-user/:projectId').post(adminRestriction, inviteUser);
router.route('/remove-user/:projectId').patch(adminRestriction, removeUser);
