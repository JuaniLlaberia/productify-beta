import { MessageType } from '../types/chatTypes';

export const groupConsecutiveMessages = (messages: MessageType[]) => {
  const groupedMessages = [];
  let currentGroup = [];

  for (let i = 0; i < messages.length; i++) {
    if (i === 0 || messages[i].sendBy._id !== messages[i - 1].sendBy._id) {
      currentGroup = [messages[i]];
      groupedMessages.push(currentGroup);
    } else {
      currentGroup.push(messages[i]);
    }
  }

  return groupedMessages;
};
