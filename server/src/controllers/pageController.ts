import mongoose from 'mongoose';
import type { Request, Response, NextFunction } from 'express';
import { catchAsyncError } from '../utils/catchAsyncErrors';
import { Page } from '../models/Pages';
import { Project } from '../models/Project';
import { CustomError } from '../utils/emailTemplates/error';

//Create a new page -> Admins only
export const createPage = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.type || !req.body.name)
      return next(
        new CustomError('Misssing neccessary fields (name & type).', 400)
      );

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const { _id } = await Page.create(req.body);
      await Project.updateOne(
        { _id: req.params.projectId },
        { $addToSet: { pages: _id } }
      );

      await session.commitTransaction();
      res
        .status(201)
        .json({ status: 'success', message: 'Page created successfully.' });
    } catch (err) {
      await session.abortTransaction();
      next(new CustomError('Failed to create new page.', 400));
    } finally {
      session.endSession();
    }
  }
);

//Delete a page
export const deletePage = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const pageId = req.params.pageId;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      await Page.deleteOne({ _id: pageId });
      await Project.updateOne(
        { _id: req.params.projectId },
        { $pull: { pages: pageId } }
      );

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

//Add content => Returns updated document
export const addContent = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.title || !req.body.content)
      return next(
        new CustomError(
          'Missing neccessary information (title & content).',
          400
        )
      );

    const updatedPage = await Page.findByIdAndUpdate(
      req.params.pageId,
      { $push: { content: { ...req.body, createdBy: req.user._id } } },
      { new: true }
    );

    res.status(201).json({ status: 'success', data: updatedPage });
  }
);

//Check if content belong to user doing the request
export const belongsToUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const content = await Page.findOne(
      {
        _id: req.params.pageId,
        'content._id': req.params.contentId,
      },
      { 'content.$': 1, _id: 0 }
    );

    if (content?.content[0].createdBy !== req.user._id)
      return next(new CustomError(`This doesn't belong to you.`, 403));

    next();
  }
);

//Update content
export const updateContent = catchAsyncError(
  async (req: Request, res: Response) => {
    //Filter fields
    const filteredBody = { ...req.body };
    ['_id', 'createdBy'].forEach(field => delete filteredBody[field]);

    //Find and update data
    await Page.updateOne(
      {
        _id: req.params.pageId, //Match the page
        'content._id': req.params.contentId, //Match the embedded document
      },
      {
        $set: {
          'content.$': {
            ...filteredBody,
            _id: req.params.contentId,
          },
        },
      },
      { runValidators: true }
    );

    res
      .status(200)
      .json({ status: 'success', message: 'Content updated successfully.' });
  }
);

//More direct endpoint just to update the status of the tasks
export const changeStatusContent = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const status = req.body.status;

    if (!status) return next(new CustomError('Missing status type.', 400));

    if (status !== 'pending' || status !== 'progress' || status !== 'done')
      return next(new CustomError('Wrong status type.', 400));

    //Find and update data
    await Page.updateOne(
      {
        _id: req.params.pageId, //Match the page
        'content._id': req.params.contentId, //Match the embedded document
      },
      {
        $set: {
          'content.$.status': status,
        },
      }
    );

    res.status(200).json({
      status: 'success',
      message: 'Content status updated successfully.',
    });
  }
);

//Delete content
export const deleteContent = catchAsyncError(
  async (req: Request, res: Response) => {
    await Page.updateOne(
      {
        _id: req.params.pageId,
      },
      {
        $pull: { content: { _id: req.params.contentId } },
      }
    );

    res
      .status(200)
      .json({ status: 'success', message: 'Content deleted successfully.' });
  }
);
