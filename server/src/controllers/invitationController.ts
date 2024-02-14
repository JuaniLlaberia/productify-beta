import { NextFunction, Request, Response } from 'express';
import { catchAsyncError } from '../utils/catchAsyncErrors';
import { Invitation } from '../models/Invitation';
import { CustomError } from '../utils/emailTemplates/error';

export const getProjectInvitationCode = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const invitationCode = await Invitation.findOne({
      projectId: req.params.projectId,
    });

    if (!invitationCode)
      return next(
        new CustomError(`This project doesn't have an invitation code.`, 404)
      );

    res.status(200).json({ status: 'success', code: invitationCode._id });
  }
);

export const resetInvitationCode = catchAsyncError(
  async (req: Request, res: Response) => {
    const createPromise = Invitation.create({
      projectId: req.params.projectId,
    });
    const deletePromise = Invitation.deleteOne({
      _id: req.params.invitationId,
    });

    const [newInvitation] = await Promise.all([createPromise, deletePromise]);

    res.status(200).json({ status: 'success', code: newInvitation._id });
  }
);
