import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minLength: [3, 'The first name must contain at least 3 characters.'],
    maxLength: [40, 'The first name must less than 40 characters.'],
  },
  lastName: {
    type: String,
    minLength: [3, 'The last name must contain at least 3 characters.'],
    maxLength: [40, 'The last name must less than 40 characters.'],
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
  isNewUser: {
    type: Boolean,
    default: true,
  },
  profileImg: {
    type: String,
  },
  projectsLeft: {
    type: Number,
    default: 5,
  },
  password: String,
  confirmedPassword: String,
});

userSchema.index({ email: 1 }, { unique: true });

export const User = mongoose.model('User', userSchema);
