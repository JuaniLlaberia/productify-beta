import { isSameDay } from 'date-fns';

import { MessageType } from '../types/chatTypes';

// Group by consecutive user messages with date separators
export const groupMessagesByDay = (messages: MessageType[]) => {
  const groupedMessages = [];
  let currentDateGroup = [];

  for (let i = 0; i < messages.length; i++) {
    if (
      i === 0 ||
      !isSameDay(
        new Date(messages[i].createdAt!),
        new Date(messages[i - 1].createdAt!)
      )
    ) {
      currentDateGroup = [messages[i]];
      groupedMessages.push(currentDateGroup);
    } else {
      currentDateGroup.push(messages[i]);
    }
  }

  return groupedMessages;
};
