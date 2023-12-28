import { NextFunction, Request, Response } from 'express';
import { Project } from '../models/Project';

//Get projects where auth user is member (what about its own projects????)
export const getProjects = async (req: Request, res: Response) => {};

//Create new project
export const createProject = async (req: Request, res: Response) => {
  if (!req.body.name)
    return res
      .status(400)
      .json({ status: 'failed', message: `Provide neccesary information.` });

  await Project.create({
    name: req.body.name,
    members: [req.user._id],
    admins: [req.user._id],
  });

  res
    .status(201)
    .json({ status: 'success', message: 'Project created successfully.' });
};

//Delete project
export const deleteProject = async (req: Request, res: Response) => {
  const projectToDelete = await Project.deleteOne({
    _id: req.params.projectId,
  });

  if (projectToDelete.acknowledged) {
    return res.status(200).json({ message: 'Project deleted successfully.' });
  } else {
    return res.status(400).json({ message: 'Failed to delete project.' });
  }
};

//Update project info
export const updateProject = (req: Request, res: Response) => {
  //Filter members/admin/owner fields that can't be modified
  //Be able to modify name and...
};

//Invite user to project
export const inviteUser = (req: Request, res: Response) => {
  const usersToInvite = req.body.users;
  const project = req.params.projectId;
  console.log(usersToInvite);
  console.log(project);
  //How to invite people?
};

//Remove user from project
export const removeUser = async (req: Request, res: Response) => {
  const removeOp = await Project.updateOne(
    { _id: req.params.projectId },
    { $pull: { members: req.body.userId, admins: req.body.userId } }
  );

  if (removeOp.acknowledged) {
    return res
      .status(200)
      .json({ status: 'success', message: 'User removed successfully.' });
  } else
    return res.status(400).json({
      status: 'failed',
      message: 'Failed to remove user from project.',
    });
};

//Give or Revoke admin permits to user inside of a project
export const toggleAdmin = async (req: Request, res: Response) => {};

//Join projects with invitation link
export const joinProject = async (req: Request, res: Response) => {};

//Restrict just for admins
export const adminRestriction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const currentProject = await Project.findOne({
    _id: req.params.projectId,
  }).select('admins');

  if (!currentProject)
    return res
      .status(404)
      .json({ status: 'failed', message: `Project doesn't exist.` });

  if (currentProject.admins && !currentProject.admins.includes(req.user._id)) {
    return res.status(401).json({
      status: 'failed',
      message: `You don't have permission to do this action.`,
    });
  }

  next();
};
