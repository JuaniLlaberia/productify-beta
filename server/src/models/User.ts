import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'Please provide your email.'],
    validate: {
      validator: (val: string) =>
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          val
        ),
      message: 'The email is not valid',
    },
  },
  profileImg: {
    type: String,
  },
  membership: {
    type: String,
    enum: ['regular', 'premium'],
    default: 'regular',
  },
  password: String,
  confirmedPassword: String,
});

export const User = mongoose.model('User', userSchema);
