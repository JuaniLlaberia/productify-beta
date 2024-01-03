import mongoose from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import { catchAsyncError } from '../utils/catchAsyncErrors';
import { Message } from '../models/Message';
import { CustomError } from '../utils/emailTemplates/error';
import { Project } from '../models/Project';
import { Chat } from '../models/Chat';

//Create new chats
//If the chat belongs to a project we store it as an embedded doc inside the project doc
//Else if it is a 'regular' chat (not related to any project), it will be created as a new doc in the chats collection
export const createChat = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.params.projectId) {
      //If its individual chat & already exists don't allow to create new one
      if (req.body.members.length === 1) {
        //Check if chat already exists
        const alreadyExists = await Chat.exists({
          $and: [{ members: { $in: [...req.body.members, req.user._id] } }],
        });

        if (alreadyExists)
          return next(new CustomError('Chat already exists.', 400));
      }

      //Create regular chats (Not related to any project)
      await Chat.create({
        //Add the name field only if its a group chat
        name: req.body.members.length > 1 ? req.body.name : undefined,
        members: [...req.body.members, req.user._id],
        type: req.body.members.length > 1 ? 'group' : 'single',
      });

      return res
        .status(201)
        .json({ status: 'success', message: 'Chat created successfully.' });
    } else {
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
          type: 'group' | 'single';
        } = {
          name: req.body.name,
          members: [...req.body.members, req.user._id],
          type: req.body.members.length > 1 ? 'group' : 'single',
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
  }
);

//Retrieve 'regular' chats (Not related to project as this ones are embedded) & where auth user is a member
export const getChats = catchAsyncError(async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const chats = await Chat.aggregate([
    {
      $match: {
        members: { $in: [req.user._id] },
      },
    },
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },
    {
      $project: {
        __v: 0,
        type: 0,
      },
    },
  ]);

  res.status(200).json({ status: 'success', data: chats });
});

//Works for regular chats - Not for project chats
export const deleteChat = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    let chatPromise;

    //Delete chat logic for projects and regular chats
    try {
      if (req.params.projectId) {
        chatPromise = Project.updateOne(
          {
            _id: req.params.projectId,
            admins: { $in: [req.user._id] },
          },
          {
            $pull: { chats: { _id: req.params.chatId } },
          }
        );
      } else {
        chatPromise = Chat.deleteOne({
          _id: req.params.chatId,
          members: { $in: [req.user._id] },
        });
      }

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

export const addUserToChat = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.params.projectId) {
      //Check that user is a member of the project
      const project = await Project.findOne({
        _id: req.params.projectId,
      }).select('members admins');

      if (!project?.admins.includes(req.user._id))
        return next(
          new CustomError(
            `You can't add users to this chat, only admins can.`,
            403
          )
        );

      if (!project?.members.includes(req.body.userId))
        return next(
          new CustomError('This user is not a member of the project.', 400)
        );

      //Add user to chat members
      await Project.updateOne(
        { _id: req.params.projectId, 'chats._id': req.params.chatId },
        { $addToSet: { 'chats.$.members': req.body.userId } }
      );
    } else {
      const chat = await Chat.findOne({ _id: req.params.chatId });

      if (!chat?.members.includes(req.user._id))
        return next(new CustomError('You are not a member of this chat.', 403));

      //Check if the chat is a 1V1 => Can't add more users
      if (chat?.type === 'single')
        return next(
          new CustomError(
            `Individual chats can't have more than 2 memebers.`,
            400
          )
        );

      //Regular group chat => Can add anyone
      await Chat.updateOne(
        { _id: req.params.chatId, members: { $in: [req.user._id] } },
        { $addToSet: { members: { _id: req.body.userId } } }
      );
    }

    res
      .status(200)
      .json({ status: 'success', message: 'User added successfully' });
  }
);

export const deleteUserFromChat = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    //Delete user from chat
    if (req.params.projectId) {
      await Project.updateOne(
        { _id: req.params.projectId, 'chats._id': req.params.chatId },
        { $pull: { 'chats.$.members': req.body.userId } }
      );
    } else {
      const chat = await Chat.findOne({ _id: req.params.chatId }).select(
        'type members'
      );

      if (!chat?.members.includes(req.user._id))
        return next(new CustomError('You are not a member of this chat.', 403));

      if (chat?.type === 'single')
        return next(
          new CustomError(
            `Can't remove user from a single chat. You can delete the chat.`,
            400
          )
        );

      await Chat.updateOne(
        { _id: req.params.chatId },
        { $pull: { members: req.body.userId } }
      );
    }

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
