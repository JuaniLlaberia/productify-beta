import mongoose from 'mongoose';

export const chatSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [6, 'Chat name must have at least 6 characters.'],
    maxLength: [40, `Chat name can't have more than 40 characters.`],
  },
  members: {
    required: [true, 'Chats must have members array.'],
    type: [mongoose.Schema.ObjectId],
    ref: 'User',
    minItems: [1, 'Must have at least 1 member in addition to you.'],
    maxItems: [15, `Can't have more than 15 members.`],
  },
  type: {
    type: String,
    enum: ['single', 'group'],
  },
});

chatSchema.index({ members: 1 });

export const Chat = mongoose.model('Chat', chatSchema);
