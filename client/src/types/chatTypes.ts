export type MessageType = {
  _id?: string;
  content: string;
  sendBy: { _id: string; firstName: string };
  createdAt?: Date;
};
