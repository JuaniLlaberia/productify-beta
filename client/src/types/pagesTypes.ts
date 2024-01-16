export type PageContentType = {
  _id?: string;
  title: string;
  content: string;
  createdBy?: string;
  status?: 'pending' | 'progress' | 'finished';
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
  style?: string;
};

export type PageType = {
  _id?: string;
  name: string;
  pageType: 'task' | 'notes';
  content?: PageContentType[];
};
