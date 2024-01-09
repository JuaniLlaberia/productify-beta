type PageContentType = {
  title: string;
  content: string;
  createdBy: string;
  status?: 'pending' | 'progress' | 'finished';
  dueData?: Date;
  style?: string;
};

export type PageType = {
  _id?: string;
  name: string;
  pageType: 'task' | 'notes';
  content?: PageContentType[];
};
