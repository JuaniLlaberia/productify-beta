import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { app } from './app';

dotenv.config({ path: './config.env' });

mongoose
  .connect(process.env.MONGODB_URL!)
  .then(() => console.log('Connected to database.'));

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`App running in ${process.env.NODE_ENV}`);
});
