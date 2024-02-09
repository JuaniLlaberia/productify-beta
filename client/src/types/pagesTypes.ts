import { ColorsType } from './extraTypes';

export type PageColumnType = {
  _id?: string;
  label: string;
  color: ColorsType;
};

export type SubTaskType = {
  _id?: string;
  title: string;
  completed?: boolean;
};

export type PageTaskType = {
  _id?: string;
  title: string;
  description: string;
  subTasks?: SubTaskType[];
  status?: string;
  importance?: 'urgent' | 'important' | 'moderate';
  tag?:
    | 'feature'
    | 'fix'
    | 'refactor'
    | 'testing'
    | 'documentation'
    | 'integration'
    | 'deployment'
    | 'maintenance';
  createdBy?: string;
  participants?: [string];
};

export type PageType = {
  _id?: string;
  name: string;
  columns: {
    _id?: string;
    label: string;
    color: string;
  }[];
  tasks: PageTaskType[];
};
