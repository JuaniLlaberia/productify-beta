import { PageType } from './pagesTypes';
import { UserPreviewType } from './userTypes';

export type NewProjectType = {
  name: string;
  projectImg: string;
};

export type ProjectPrevType = {
  status: string;
  count: number;
  data: {
    _id: string;
    name: string;
    createdBy: string;
    membersCount: number;
  }[];
};

export type EventType = {
  content: string;
  date: Date;
  style: 'green' | 'purple' | 'blue' | 'orange';
};

export type ChatType = {
  _id: string;
  name: string;
  members: string[];
};

export type ProjectInfoType = {
  _id: string;
  name: string;
  projectImg: string;
  members: UserPreviewType[];
  admins: string[];
  chats: ChatType[];
  events: EventType[];
  createdBy: string;
  createdAt: Date;
  pages: PageType[];
};
