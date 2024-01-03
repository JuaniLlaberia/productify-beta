import mongoose from 'mongoose';
import { isAfter } from 'date-fns';

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'Messages must have a content'],
    minLength: [1, 'Messages must have at least 1 character.'],
    maxLength: [200, `Messages can't have more than 200 characters.`],
  },
  chatId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Chat',
    required: [true, 'Messages must belong to a chat.'],
  },
  sendBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Messages must have a sender.'],
  },
  sendAt: {
    type: Date,
    default: Date.now(),
    validate: {
      validator: (val: Date) => isAfter(val, new Date()),
      message: `Messages date can't be in the past.`,
    },
  },
});

messageSchema.index({ chatId: 1, sendAt: -1 });

export const Message = mongoose.model('Message', messageSchema);
