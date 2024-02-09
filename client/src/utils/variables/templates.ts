import { ColorsType } from '../../types/extraTypes';

export type columnTemplateType = {
  label: string;
  color: ColorsType;
}[];

export const tasksTemplate: columnTemplateType = [
  {
    label: 'To Do',
    color: 'red',
  },
  {
    label: 'Progress',
    color: 'blue',
  },
  {
    label: 'Finished',
    color: 'green',
  },
];

export const productionTemplate: columnTemplateType = [
  {
    label: 'Design',
    color: 'yellow',
  },
  {
    label: 'Code',
    color: 'blue',
  },
  {
    label: 'Code Review',
    color: 'red',
  },
  {
    label: 'Testing',
    color: 'green',
  },
  {
    label: 'Deployment',
    color: 'purple',
  },
];
