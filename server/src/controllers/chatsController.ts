import mongoose from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import { catchAsyncError } from '../utils/catchAsyncErrors';
import { Message } from '../models/Message';
import { CustomError } from '../utils/emailTemplates/error';
import { Project } from '../models/Project';
import { Chat } from '../models/Chat';

//===================== TO CHECK ========================

//HOW TO PROTECT THIS ENDPOINTS:
//-Project ones, actions like delete or create must be only for admins
//-Regular chats, actions must be available for all (unless we add admins to chats...?)

//Think if keep embedded for projects or do all separate docs. (I don'y think but maybe)

//Check the logic one more time to ensure efficiency and finish endpoints

//=======================================================

//Create new chats
//If the chat belongs to a project we store it as an embedded doc inside the project doc
//Else if it is a 'regular' chat (not related to any project), it will be created as a new doc in the chats collection
export const createChat = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.params.projectId) {
      //If its individual chat & already exists don't allow to create new one
      if (req.body.members.length === 2) {
        //Check if chat already exists
        const alreadyExists = await Chat.exists({
          $and: [{ members: { $in: req.body.members } }],
        });

        if (alreadyExists)
          return next(new CustomError('Chat already exists.', 400));
      }

      //Create regular chats (Not related to any project)
      await Chat.create({
        //Add the name field only if its a group chat
        ...(req.body.members.length > 2 ? { name: req.body.name } : {}),
        members: req.body.members,
      });

      return res
        .status(201)
        .json({ status: 'success', message: 'Chat created successfully.' });
    } else {
      //Start session
      const session = await mongoose.startSession();
      session.startTransaction();

      try {
        //Create chat
        const chatObj: { name: string; members: string[] } = {
          name: req.body.name,
          members: req.body.members,
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
        $and: [{ members: { $in: [req.user._id] } }],
      },
    },
    // {
    //   $sort: {}
    // },
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },
  ]);

  res.status(200).json({ status: 'success', data: chats });
});

//Works for regular chats - Not for project chats
export const deleteChat = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    //Delete chat => Deletes all messages

    try {
      await Chat.deleteOne({
        _id: req.params.chatId,
        members: { $in: [req.user._id] },
      });
      await Message.deleteMany({ chatId: req.params.chatId });

      await session.commitTransaction();

      res
        .status(200)
        .json({ status: 'success', message: 'Chat deletes successfully.' });
    } catch (err) {
      await session.abortTransaction();
      next(new CustomError('Failed to delete chat', 400));
    } finally {
      session.endSession();
    }
  }
);

//DELETE CHAT FROM PROJECT

export const addUserFromChat = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.userToAdd)
      return next(new CustomError('Missing user ID.', 400));

    if (req.params.projectId) {
      //Check that user is a member of the project
      //Add user to chat members
      // await Project.updateOne(
      //   { _id: req.params.projectId, 'chats._id': req.params.chatId },
      //   { $addToSet: { 'chats.$.members': req.body.userToDelete } }
      // );
    } else {
      //Check if the chat is a 1V1 => Can't add more users
      //Regular group chat => Can add anyone
      // await Chat.updateOne(
      //   { _id: req.params.chatId },
      //   { $pull: { members: { _id: req.body.userToDelete } } }
      // );
    }
  }
);

export const deleteUserFromChat = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.userToDelete)
      return next(new CustomError('Missing user ID.', 400));

    //Delete user from chat
    if (req.params.projectId) {
      await Project.updateOne(
        { _id: req.params.projectId, 'chats._id': req.params.chatId },
        { $pull: { 'chats.$.members': req.body.userToDelete } }
      );
    } else {
      await Chat.updateOne(
        { _id: req.params.chatId },
        { $pull: { members: { _id: req.body.userToDelete } } }
      );
    }

    res.status(200).json({
      status: 'success',
      message: 'User removes from chat successfully.',
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
        $sort: {
          sendAt: -1,
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
    ]);

    res.status(200).json({ status: 'success', data: messages });
  }
);
