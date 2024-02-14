import mongoose from 'mongoose';

const invitationSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Project',
    required: [true, 'An invitation must belong to a project.'],
  },
});

invitationSchema.index({ projectId: 1 });

export const Invitation = mongoose.model('Invitation', invitationSchema);
