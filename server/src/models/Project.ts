import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
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
  invitations: {
    type: [mongoose.Schema.ObjectId],
    ref: 'User',
  },
  createdBy: {
    type: String,
    required: [true, 'Projects must have an owner.'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

projectSchema.index({ members: 1 });

export const Project = mongoose.model('Project', projectSchema);

//PRE save, save owner as member and admin
// projectSchema.pre('save', function (next) {
//   this.members = [];
// });
