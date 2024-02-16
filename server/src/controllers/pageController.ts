import mongoose from 'mongoose';
import type { Request, Response, NextFunction } from 'express';
import { catchAsyncError } from '../utils/catchAsyncErrors';
import { Page } from '../models/Pages';
import { Project } from '../models/Project';
import { CustomError } from '../utils/emailTemplates/error';

//Create a new page -> Admins only
export const createPage = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const { _id, name, tasksCount } = await Page.create({
        ...req.body,
        members: [req.user._id],
      });
      await Project.updateOne(
        { _id: req.params.projectId },
        { $addToSet: { pages: _id } }
      );

      await session.commitTransaction();
      res.status(201).json({
        status: 'success',
        message: 'Page created successfully.',
        data: { _id, name, tasksCount },
      });
    } catch (err) {
      await session.abortTransaction();
      next(new CustomError('Failed to create new page.', 400));
    } finally {
      session.endSession();
    }
  }
);

//Get current page and its data
export const getPage = catchAsyncError(async (req: Request, res: Response) => {
  const page = await Page.findOne({ _id: req.params.pageId })
    .select('-__v')
    .lean();

  res.status(200).json({ status: 'success', data: page });
});

export const deletePage = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const pageId = req.params.pageId;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const pagePromise = Page.deleteOne({ _id: pageId });
      const projectPromise = Project.updateOne(
        { _id: req.params.projectId },
        { $pull: { pages: pageId } }
      );

      await Promise.all([pagePromise, projectPromise]);

      await session.commitTransaction();
      res
        .status(200)
        .json({ status: 'success', message: 'Page was deleted successfully.' });
    } catch (err) {
      next(new CustomError('Failed to delete page.', 400));
      await session.abortTransaction();
    } finally {
      session.endSession();
    }
  }
);

//Add custom columns to the boards => Returns added column
export const addColumn = catchAsyncError(
  async (req: Request, res: Response) => {
    const updatedPage = await Page.findByIdAndUpdate(
      req.params.pageId,
      { $push: { columns: { ...req.body } } },
      { new: true }
    );

    res.status(201).json({
      status: 'success',
      data: updatedPage?.columns[updatedPage?.columns.length - 1],
    });
  }
);

export const deleteColumn = catchAsyncError(
  async (req: Request, res: Response) => {
    await Page.updateOne(
      {
        _id: req.params.pageId,
      },
      {
        $pull: { columns: { _id: req.params.columnId } },
      }
    );

    res
      .status(200)
      .json({ status: 'success', message: 'Column deleted successfully.' });
  }
);

//Add task => Returns added task
export const addTask = catchAsyncError(async (req: Request, res: Response) => {
  const updatedPage = await Page.findByIdAndUpdate(
    req.params.pageId,
    {
      $push: {
        tasks: {
          ...req.body,
          participants: [req.user._id],
          createdBy: req.user._id,
        },
      },
      $inc: { tasksCount: 1 },
    },
    { new: true }
  );

  res.status(201).json({
    status: 'success',
    data: updatedPage?.tasks[updatedPage?.tasks.length - 1],
  });
});

//Check if task belong to user doing the request
export const belongsToUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const page = await Page.findOne(
      {
        _id: req.params.pageId,
        'tasks._id': req.params.taskId,
      },
      { 'tasks.$': 1, _id: 0 }
    );

    const taskAuthor = page?.tasks[0].createdBy!;

    //Comparing the author with the auth user
    if (
      taskAuthor.valueOf().toString() !==
      new mongoose.Types.ObjectId(req.user._id).toString()
    )
      return next(new CustomError(`This doesn't belong to you.`, 403));

    next();
  }
);

export const updateTask = catchAsyncError(
  async (req: Request, res: Response) => {
    //Filter fields
    const filteredBody = { ...req.body };
    ['_id', 'createdBy'].forEach(field => delete filteredBody[field]);

    //Find and update data
    await Page.updateOne(
      {
        _id: req.params.pageId,
        'tasks._id': req.params.taskId,
      },
      {
        $set: {
          'tasks.$': {
            ...filteredBody,
            createdBy: req.user._id,
            _id: req.params.taskId,
          },
        },
      },
      {
        runValidators: true,
      }
    );

    res.status(200).json({
      status: 'success',
      message: 'Task updated successfully.',
    });
  }
);

//More direct endpoint just to update the status of the tasks
export const changeStatusTask = catchAsyncError(
  async (req: Request, res: Response) => {
    const status = req.body.status;

    //Find and update data
    await Page.updateOne(
      {
        _id: req.params.pageId, //Match the page
        'tasks._id': req.params.taskId, //Match the embedded document
      },
      {
        $set: {
          'tasks.$.status': status,
        },
      }
    );

    res.status(200).json({
      status: 'success',
      message: 'Task status updated successfully.',
    });
  }
);

export const deleteTask = catchAsyncError(
  async (req: Request, res: Response) => {
    await Page.updateOne(
      {
        _id: req.params.pageId,
      },
      {
        $pull: { tasks: { _id: req.params.taskId } },
        $inc: { tasksCount: -1 },
      }
    );

    res
      .status(200)
      .json({ status: 'success', message: 'Task deleted successfully.' });
  }
);

export const addUsersToBoard = catchAsyncError(
  async (req: Request, res: Response) => {
    await Page.updateOne(
      { _id: req.params.pageId },
      {
        $addToSet: { members: req.body.users },
      }
    );

    res.status(200).json({
      status: 'success',
      message: 'Users added to board successfully',
    });
  }
);

export const deleteUserFromBoard = catchAsyncError(
  async (req: Request, res: Response) => {
    await Page.updateOne(
      { _id: req.params.pageId },
      { $pull: { members: req.body.userId } }
    );

    res.status(200).json({
      status: 'success',
      message: 'User removed from board successfully.',
    });
  }
);
