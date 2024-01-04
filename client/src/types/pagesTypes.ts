type PageContentType = {
  title: string;
  content: string;
  createdBy: string;
  status?: 'pending' | 'progress' | 'finished';
  dueData?: Date;
  style?: string;
};

export type PageType = {
  name: string;
  icon?: string;
  pageType: 'task' | 'notes';
  content: PageContentType[];
};
