import mongoose from 'mongoose';

export const chatSchema = new mongoose.Schema({
  name: {
    //Name is only required when chat is part of a project OR if it is a group chat
    required: function () {
      return this.projectId.length >= 1 || this.members.length > 2;
    },
    type: String,
    minLength: [6, 'Chat name must have at least 6 characters.'],
    maxLength: [40, `Chat name can't have more than 40 characters.`],
    trim: true,
  },
  members: {
    required: [true, 'Chats must have members array.'],
    type: [mongoose.Schema.ObjectId],
    ref: 'User',
    minItems: [2, 'Must have at least 2 members.'],
    maxItems: [15, `Can't have more than 15 members.`],
  },
});

chatSchema.index({ members: 1 });

export const Chat = mongoose.model('Chat', chatSchema);
