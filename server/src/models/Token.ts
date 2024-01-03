import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema({
  email: String,
  code: String,
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 5000,
  },
});

tokenSchema.index({ email: 1 });

export const Token = mongoose.model('Token', tokenSchema);
