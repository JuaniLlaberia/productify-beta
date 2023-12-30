// const express = require('express');
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import {
  emailAuthHandler,
  githubAuthHandler,
  googleAuthHandler,
} from './controllers/authController';

import { router as authRouter } from './routes/authRoutes';
import { router as projectRouter } from './routes/projectRoutes';
import { router as userRouter } from './routes/userRoutes';
import { errorHandler } from './controllers/errorController';
import { CustomError } from './utils/emailTemplates/error';

export const app = express();

//Development console help
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

//Security
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.set('trust proxy', 1);
app.use(helmet());
app.use(express.json({ limit: '10kb' }));
app.use(mongoSanitize());
app.use(compression());

//Auth routes
app.get('/api/v1/oauth/google', googleAuthHandler);
app.get('/api/v1/oauth/github', githubAuthHandler);
app.post('/api/v1/auth/email', emailAuthHandler);

//App routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/project', projectRouter);
app.use('/api/v1/user', userRouter);

//Wrong routes
app.use('*', (req, res, next) => {
  next(new CustomError('Endpoint not found', 404));
});

//Error handling
app.use(errorHandler);
