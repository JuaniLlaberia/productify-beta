import Joi from 'joi';

export const userIdSchema = Joi.object<{ userId: string }>({
  userId: Joi.string().required(),
});

export const emailSchema = Joi.object<{ email: string }>({
  email: Joi.string().email().required(),
});

export const invitationsSchema = Joi.object<{
  emails: string[];
  projectName: string;
}>({
  emails: Joi.array().items(Joi.string().email()).required(),
  projectName: Joi.string().required(),
});

export const passwordSchema = Joi.object<{
  password: string;
  confirmedPassword: string;
}>({
  password: Joi.string().required(),
  confirmedPassword: Joi.string().required(),
});

export const chatSchema = Joi.object<{ members: string[]; name: string }>({
  members: Joi.array().min(1).required(),
  name: Joi.when('members', {
    is: Joi.array().min(2),
    then: Joi.string().required(),
    otherwise: Joi.forbidden(),
  }),
});

export const projectSchema = Joi.object<{
  name: string;
}>({
  name: Joi.string().min(4).max(20).required(),
});

export const eventSchema = Joi.object<{
  date: Date;
  content: string;
  style: string;
}>({
  content: Joi.string().min(4).max(150).required(),
  date: Joi.date().required(),
  style: Joi.string(),
});

export const pageSchema = Joi.object<{
  pageType: 'task' | 'notes';
  name: string;
}>({
  name: Joi.string().min(4).max(20).required(),
  pageType: Joi.string().valid('task', 'notes').required(),
});

export const taskSchema = Joi.object<{
  title: string;
  description: string;
  participants: string[];
  status: string;
  createdBy: string;
  createdAt: Date;
  importance: 'urgent' | 'important' | 'moderate';
  subTasks: [];
  tag:
    | 'feature'
    | 'fix'
    | 'refactor'
    | 'testing'
    | 'documentation'
    | 'integration'
    | 'deployment'
    | 'maintenance';
}>({
  title: Joi.string().min(4).max(40).required(),
  description: Joi.string().required(),
  status: Joi.string(),
  importance: Joi.string().valid('urgent', 'important', 'moderate'),
  tag: Joi.string().valid(
    'feature',
    'fix',
    'refactor',
    'testing',
    'documentation',
    'integration',
    'deployment',
    'maintenance'
  ),
  participants: Joi.array(),
  createdBy: Joi.string(),
  createdAt: Joi.date(),
  subTasks: Joi.array(),
});

export const columnSchema = Joi.object<{
  label: string;
  color: 'red' | 'blue' | 'green' | 'purple' | 'yellow' | 'gray' | 'orange';
}>({
  label: Joi.string().required(),
  color: Joi.string().valid(
    'red',
    'blue',
    'green',
    'purple',
    'yellow',
    'gray',
    'orange'
  ),
});

export const contentTypeSchema = Joi.object<{
  status: string;
}>({
  status: Joi.string().required(),
});
