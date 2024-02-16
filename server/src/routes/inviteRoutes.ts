import express from 'express';
import { adminRestriction, authProtect } from '../controllers/authController';
import {
  getProjectInvitationCode,
  resetInvitationCode,
} from '../controllers/invitationController';

export const router = express.Router({ mergeParams: true });

router.use(authProtect);

router.route('/:projectId').get(adminRestriction, getProjectInvitationCode);
router
  .route('/reset/:invitationId/:projectId')
  .post(adminRestriction, resetInvitationCode);
