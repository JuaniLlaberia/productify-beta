export type MessageType = {
  _id?: string;
  content: string;
  chatId: string;
  sendBy: { _id: string; firstName: string; profileImg: string };
  createdAt?: Date;
};
