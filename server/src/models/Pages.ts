import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  //Common for all contents
  title: String,
  content: String,
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  //For tasks only
  status: {
    type: String,
    enum: ['pending', 'progress', 'finished'],
    default: 'pending',
  },
  dueDate: Date,
  //For notes only
  style: String,
});

const pagesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Pages must have a name.'],
  },
  icon: {
    type: String,
  },
  type: {
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
