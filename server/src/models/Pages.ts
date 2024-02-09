import mongoose from 'mongoose';

const subTasks = new mongoose.Schema({
  title: String,
  completed: {
    type: Boolean,
    default: false,
  },
});

const taskSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    status: String,
    subTasks: {
      type: [subTasks],
    },
    importance: {
      type: String,
      enum: ['urgent', 'important', 'moderate'],
    },
    tag: {
      type: String,
      enum: [
        'feature',
        'fix',
        'refactor',
        'testing',
        'documentation',
        'integration',
        'deployment',
        'maintenance',
      ],
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    participants: {
      type: [mongoose.Schema.ObjectId],
      ref: 'User',
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const pagesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Pages must have a name.'],
  },
  columns: [
    {
      label: String,
      color: String,
    },
  ],
  tasks: {
    type: [taskSchema],
  },
});

pagesSchema.index({ 'tasks._id': 1 });

export const Page = mongoose.model('Page', pagesSchema);
