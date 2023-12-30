import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    minLength: [3, 'The name must contain at least 3 characters.'],
    maxLength: [40, 'The name must less than 40 characters.'],
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
  notes: {
    type: [
      {
        content: String,
      },
    ],
    minItems: 0,
    maxItems: 50,
  },
  projectsLeft: Number,
  password: String,
  confirmedPassword: String,
});

export const User = mongoose.model('User', userSchema);