import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  //Common for all contents
  title: String,
  content: String,
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  //For tasks only
  status: {
    type: String,
    enum: ['pending', 'progress', 'finished'],
  },
  tag: {
    type: String,
    enum: ['urgent', 'important', 'moderate'],
  },
  importance: {
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
  //For notes only
  style: String,
});

const pagesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Pages must have a name.'],
  },
  pageType: {
    type: String,
    enum: ['task', 'notes'],
    required: [true, 'Pages must have a type.'],
  },
  content: {
    type: [contentSchema],
  },
});

pagesSchema.index({ 'content._id': 1 });

export const Page = mongoose.model('Page', pagesSchema);
