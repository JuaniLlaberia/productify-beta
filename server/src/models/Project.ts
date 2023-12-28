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
});

export const Project = mongoose.model('Project', projectSchema);

//PRE save, save owner as member and admin
// projectSchema.pre('save', function (next) {
//   this.members = [];
// });
