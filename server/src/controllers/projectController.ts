import mongoose from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import { Project } from '../models/Project';
import { Email } from '../utils/emails';
import { User } from '../models/User';
import { catchAsyncError } from '../utils/catchAsyncErrors';
import { CustomError } from '../utils/emailTemplates/error';
import { Invitation } from '../models/Invitation';

export const getProjectById = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const project = await Project.findById(req.params.projectId)
      .select('-__v -invitations')
      .populate('pages', 'name tasksCount')
      .populate('members', 'firstName lastName email profileImg');

    if (
      !project?.members.some(
        member =>
          member._id.valueOf().toString() ===
          new mongoose.Types.ObjectId(req.user._id).toString()
      )
    ) {
      return next(
        new CustomError(
          'You are not part of this project. Information is only for members.',
          401
        )
      );
    }

    res.status(200).json({ status: 'success', data: project });
  }
);

//Get projects where auth user is member
export const getProjects = catchAsyncError(
  async (req: Request, res: Response) => {
    let projectsQuery = Project.find({ members: { $in: [req.user._id] } });

    //Pagination
    if (req.query.page) {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 5;
      const skip = (page - 1) * limit;

      projectsQuery.skip(skip).limit(limit);
    }

    const projects = await projectsQuery
      .sort({ createdBy: 1 })
      .select('name createdBy members');

    res
      .status(200)
      .json({ status: 'success', count: projects.length, data: projects });
  }
);

//Create new project
export const createProject = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const userData = req.user;
    //Check if user has projects to create or has reached the limit
    if (userData.projectsLeft === 0)
      return next(
        new CustomError('You have reach the max. amount of projects.', 400)
      );

    const projectPromise = Project.create({
      name: req.body.name,
      members: [userData._id],
      admins: [userData._id],
      createdBy: userData._id,
    });

    const userPromise = User.updateOne(
      { _id: req.user._id },
      { $inc: { projectsLeft: -1 } }
    );

    const [newProject] = await Promise.all([projectPromise, userPromise]);

    //Creating invitation doc for this project
    await Invitation.create({ projectId: newProject._id });

    res.status(201).json({
      status: 'success',
      message: 'Project created successfully.',
      data: { projectId: newProject._id },
    });
  }
);

//Delete project
export const deleteProject = catchAsyncError(
  async (req: Request, res: Response) => {
    const projectPromise = Project.deleteOne({
      _id: req.params.projectId,
    });

    const userPromise = User.updateOne(
      { _id: req.user._id },
      { $inc: { projectsLeft: 1 } }
    );

    await Promise.all([projectPromise, userPromise]);

    return res.status(200).json({ message: 'Project deleted successfully.' });
  }
);

//Update project info
export const updateProject = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    //Filter body
    const fields = { ...req.body };
    Object.keys(fields)
      .filter(key => key !== 'name' && key !== 'projectImg')
      .forEach(field => delete fields[field]);

    const successUpdate = await Project.updateOne(
      { _id: req.params.projectId },
      fields
    );

    if (successUpdate) {
      return res
        .status(204)
        .json({ status: 'success', message: 'Project updated successfully.' });
    } else return next(new CustomError(`Failed to update project.`, 400));
  }
);

//Remove user from project
export const removeUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.userId === req.user._id.toString())
      return next(new CustomError(`You can't delete your self.`, 400));

    const removeOp = await Project.updateOne(
      { _id: req.params.projectId },
      { $pull: { members: req.body.userId, admins: req.body.userId } }
    );

    if (removeOp.acknowledged) {
      return res
        .status(200)
        .json({ status: 'success', message: 'User removed successfully.' });
    } else
      return next(new CustomError(`Failed to remove user from project.`, 400));
  }
);

//Give or Revoke admin permits to user inside of a project
export const toggleAdmin = catchAsyncError(
  async (req: Request, res: Response) => {
    const userId: string = req.body.userId;

    if (req.projectAdmins.includes(userId)) {
      await Project.updateOne(
        { _id: req.params.projectId },
        { $pull: { admins: userId } }
      );
    } else {
      await Project.updateOne(
        { _id: req.params.projectId },
        { $addToSet: { admins: userId } }
      );
    }

    return res
      .status(200)
      .json({ status: 'success', message: 'Admins updated successfully.' });
  }
);

//Join projects with invitation link
export const joinProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //Find if the invitation code exists
  const invitationLink = await Invitation.findById(req.params.invitationId);

  //Check if code is valid
  if (!invitationLink)
    return next(
      new CustomError(`The invitation code is invalid or has expired.`, 404)
    );

  //Add user to project
  await Project.updateOne(
    { _id: invitationLink.projectId },
    {
      $addToSet: { members: req.user._id },
    }
  );

  res.status(200).json({
    status: 'success',
    message: 'You have joined the project successfully.',
    data: { projectId: invitationLink.projectId },
  });
};

export const leaveProject = catchAsyncError(
  async (req: Request, res: Response) => {
    await Project.updateOne(
      { _id: req.params.projectId },
      {
        $pull: { members: req.user._id },
      }
    );

    res.status(200).json({
      status: 'success',
      message: 'You left the project successfully.',
    });
  }
);

//Create project event
export const createEvent = catchAsyncError(
  async (req: Request, res: Response) => {
    await Project.updateOne(
      { _id: req.params.projectId },
      { $push: { events: req.body } },
      { runValidators: true }
    );

    res
      .status(200)
      .json({ status: 'success', message: 'Event added successfully.' });
  }
);

//Update project event
export const updateEvent = catchAsyncError(
  async (req: Request, res: Response) => {
    await Project.updateOne(
      {
        _id: req.params.projectId,
        'events._id': req.params.eventId,
      },
      {
        $set: {
          'events.$.date': req.body.date,
          'events.$.content': req.body.content,
          'events.$.style': req.body.style,
        },
      },
      {
        runValidators: true,
      }
    );

    res
      .status(200)
      .json({ status: 'success', message: 'Event updated successfully.' });
  }
);

//Delete project event
export const deleteEvent = catchAsyncError(
  async (req: Request, res: Response) => {
    await Project.updateOne(
      {
        _id: req.params.projectId,
      },
      {
        $pull: { events: { _id: req.params.eventId } },
      }
    );

    res
      .status(200)
      .json({ status: 'success', message: 'Event deleted successfully.' });
  }
);
