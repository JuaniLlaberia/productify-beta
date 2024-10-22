import mongoose from 'mongoose';
import { chatSchema } from './Chat';

const eventsSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, 'Events must have a date.'],
  },
  content: {
    type: String,
    required: [true, 'Events must have a content'],
  },
  style: {
    type: String,
    enum: ['green', 'purple', 'blue', 'orange'],
    default: 'purple',
  },
});

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Projects must have a name'],
    },
    projectImg: String,
    members: {
      type: [mongoose.Schema.ObjectId],
      ref: 'User',
    },
    admins: {
      type: [mongoose.Schema.ObjectId],
      ref: 'User',
    },
    pages: {
      type: [mongoose.Schema.ObjectId],
      ref: 'Page',
    },
    chats: {
      type: [chatSchema],
    },
    events: {
      type: [eventsSchema],
    },
    createdBy: {
      type: String,
      required: [true, 'Projects must have an owner.'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

projectSchema.index({ members: 1 });
projectSchema.index({ 'events._id': 1 });
projectSchema.index({ 'chats._id': 1, 'chats.members': 1 });

projectSchema.virtual('membersCount').get(function () {
  return this.members.length;
});

export const Project = mongoose.model('Project', projectSchema);
