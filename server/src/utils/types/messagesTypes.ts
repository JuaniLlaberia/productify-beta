export type messageDataType = {
  content: string;
  chatId: string;
  sendBy: {
    _id: string;
    firstName: string;
    profileImg: string;
  };
  createdAt: Date;
  recipients: string[];
};
