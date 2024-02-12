import mongoose from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import { catchAsyncError } from '../utils/catchAsyncErrors';
import { Message } from '../models/Message';
import { CustomError } from '../utils/emailTemplates/error';
import { Project } from '../models/Project';

//Create new chats
export const createChat = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    //Check that users are members of the project
    const project = await Project.findOne({
      _id: req.params.projectId,
    }).select('members admins');

    if (!project?.admins.includes(req.user._id))
      return next(new CustomError('Only admins can create chats.', 403));

    if (
      !req.body.members.every((member: mongoose.Types.ObjectId) =>
        project?.members.includes(member)
      )
    )
      return next(
        new CustomError('Some users are not a member of the project.', 400)
      );

    //Start session
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      //Create chat
      const chatObj: {
        name: string;
        members: string[];
      } = {
        name: req.body.name,
        members: [...req.body.members, req.user._id],
      };
      //Add chat to project
      await Project.updateOne(
        {
          _id: req.params.projectId,
        },
        {
          $push: { chats: chatObj },
        }
      );

      await session.commitTransaction();

      res
        .status(200)
        .json({ status: 'success', message: 'Chat created successfully.' });
    } catch (err) {
      await session.abortTransaction();
      next(new CustomError('Failed to create new chat.', 400));
    } finally {
      session.endSession();
    }
  }
);

export const deleteChat = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    let chatPromise;

    try {
      chatPromise = Project.updateOne(
        {
          _id: req.params.projectId,
          admins: { $in: [req.user._id] },
        },
        {
          $pull: { chats: { _id: req.params.chatId } },
        }
      );

      const messagesPromise = Message.deleteMany({ chatId: req.params.chatId });
      await Promise.all([chatPromise, messagesPromise]);

      await session.commitTransaction();

      res
        .status(200)
        .json({ status: 'success', message: 'Chat deleted successfully.' });
    } catch (err) {
      await session.abortTransaction();
      next(new CustomError('Failed to delete chat', 400));
    } finally {
      session.endSession();
    }
  }
);

export const addUsersToChat = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    //Check that user is a member of the project
    const project = await Project.findOne({
      _id: req.params.projectId,
    }).select('members admins');

    if (!project?.admins.includes(req.user._id))
      return next(new CustomError(`Only admins can add users to chats`, 403));

    if (
      !req.body.users.every((userId: mongoose.Types.ObjectId) =>
        project.members.includes(userId)
      )
    )
      return next(new CustomError('Some users are not members.', 400));

    //Add users to chat members array
    await Project.updateOne(
      { _id: req.params.projectId, 'chats._id': req.params.chatId },
      { $addToSet: { 'chats.$.members': req.body.users } }
    );

    res
      .status(200)
      .json({ status: 'success', message: 'Users added to chat successfully' });
  }
);

export const deleteUserFromChat = catchAsyncError(
  async (req: Request, res: Response) => {
    await Project.updateOne(
      { _id: req.params.projectId, 'chats._id': req.params.chatId },
      { $pull: { 'chats.$.members': req.body.userId } }
    );

    res.status(200).json({
      status: 'success',
      message: 'User removed from chat successfully.',
    });
  }
);

//Get messages not matter the type of chat
export const getMessages = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.params.chatId)
      return next(new CustomError('Missing chat id.', 400));

    //Pagination logic
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    //Retrieve messages from DB
    const messages = await Message.aggregate([
      {
        $match: {
          chatId: req.params.chatId,
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
      {
        $sort: {
          sendAt: -1,
        },
      },
    ]);

    res.status(200).json({ status: 'success', data: messages });
  }
);
