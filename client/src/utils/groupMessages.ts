import { isSameHour } from 'date-fns';

import { MessageType } from '../types/chatTypes';

export const groupConsecutiveMessages = (messages: MessageType[]) => {
  const groupedMessages = [];
  let currentGroup = [];

  for (let i = 0; i < messages.length; i++) {
    if (
      i === 0 ||
      messages[i].sendBy._id !== messages[i - 1].sendBy._id ||
      !isSameHour(
        new Date(messages[i].createdAt!),
        new Date(messages[i - 1].createdAt!)
      )
    ) {
      currentGroup = [messages[i]];
      groupedMessages.push(currentGroup);
    } else {
      currentGroup.push(messages[i]);
    }
  }

  return groupedMessages;
};
