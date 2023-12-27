import mongoose from 'mongoose';

const verificationSchema = new mongoose.Schema({
  email: String,
  code: String,
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 5000,
  },
});

export const Verification = mongoose.model('Verification', verificationSchema);
