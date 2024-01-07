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
  name: string;
  members: string[];
  type: 'single' | 'group';
};

export type ProjectInfoType = {
  _id: string;
  name: string;
  projectImg: string;
  members: string[];
  admins: string[];
  chats: ChatType[];
  events: EventType[];
  createdBy: string;
  createdAt: Date;
};