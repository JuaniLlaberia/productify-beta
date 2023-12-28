import jwt, { Secret } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import type { NextFunction, Request, Response } from 'express';
import { getGoogleAuthToken } from '../utils/getGoogleAuthToken';
import { getGithubAuthToken } from '../utils/getGithubAuthToken';
import { Email } from '../utils/emails';
import { Token } from '../models/Token';
import { User } from '../models/User';

//Types
type JwtPayload = {
  email: string;
};

//Create & send JWT Token
const sendJWT = (id: any, res: Response) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES,
  });

  res.cookie('jwt', token, {
    expires: new Date(Date.now() + 6 * 24 * 60 * 1000),
    path: '/',
    httpOnly: true,
    // secure: true,
    sameSite: 'lax',
  });
};

//Login or sign up users
const authorizeUser = async (email: string, res: Response) => {
  const userId = await User.exists({ email: email });
  const isNewUser = !Boolean(userId);

  if (isNewUser) {
    const newUser = await User.create({
      email: email,
    });

    sendJWT(newUser._id.valueOf(), res);
    return res.status(201).redirect('http://localhost:5173/');
  }

  sendJWT(userId?._id.valueOf(), res);
  res.status(200).redirect('http://localhost:5173/');
};

//Login with email & password
export const loginWithPassword = async (req: Request, res: Response) => {
  // const password = req.body.password;
  const user = await User.findOne({ email: req.body.email }).select('password');

  if (
    !user ||
    !user.password ||
    !req.body.password ||
    !(await bcrypt.compare(req.body.password, user.password))
  ) {
    return res
      .status(404)
      .json({ status: 'failed', message: 'Email or password incorrect.' });
  }

  sendJWT(user?._id.valueOf(), res);
  res
    .status(200)
    .json({ status: 'success', message: 'Logged in successfully.' });
};

//Authorize user using email
export const emailAuthHandler = async (req: Request, res: Response) => {
  const userEmail = req.body.email;

  if (!userEmail)
    return res
      .status(400)
      .json({ status: 'failed', message: 'Please provide your email' });

  //Create encrypted code
  const code = crypto.randomBytes(6).toString('hex');
  const hashedCode = await bcrypt.hash(code, 12);

  //Send code via email
  new Email({ email: userEmail }).verificationCode(code);

  //Store code in database
  await Token.create({
    email: userEmail,
    code: hashedCode,
  });

  res
    .status(200)
    .json({ status: 'success', message: 'Code sent successfully' });
};

//Verify code sent to the email
export const verifyEmailCode = async (req: Request, res: Response) => {
  //Receive code + email
  const email = req.body.email;
  const code = req.body.code;

  const token = await Token.findOne({ email });

  if (!token || !token.code)
    return res
      .status(404)
      .json({ status: 'failed', message: 'Invalid or expired token.' });

  //Check that code + email matches
  const isValidCode = await bcrypt.compare(code, token.code);

  //Verify user
  if (isValidCode) {
    authorizeUser(email, res);
  } else {
    return res
      .status(401)
      .json({ status: 'failed', message: 'Invalid or expired token.' });
  }
};

//Authorize user using Google OAuth2.0
export const googleAuthHandler = async (req: Request, res: Response) => {
  const code = req.query.code as string;

  const googleId = await getGoogleAuthToken(code);
  if (googleId instanceof Error) {
    return res
      .status(401)
      .json({ status: 'failed', message: 'Failed to auth using Google.' });
  }

  const userData = jwt.decode(googleId) as JwtPayload;

  if (userData && userData.email) {
    authorizeUser(userData.email, res);
  }
};

//Authorize user using Github OAuth2.0
export const githubAuthHandler = async (req: Request, res: Response) => {
  const code = req.query.code as string;

  const accessToken = await getGithubAuthToken(code);
  if (accessToken instanceof Error) {
    return res
      .status(401)
      .json({ status: 'failed', message: 'Failed to auth using Github.' });
  }

  try {
    const userResponse = await fetch('https://api.github.com/user', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const userData = await userResponse.json();

    if (userData && userData.email) {
      authorizeUser(userData.email, res);
    }
  } catch (err) {
    console.log(err);
  }
};

//Create/update permanent password as an alternative of email/code auth
export const createPassword = async (req: Request, res: Response) => {
  const userData = req.user;

  //Check password
  if (!req.body.password || !req.body.confirmedPassword)
    return res.status(400).json({
      status: 'failed',
      message: 'Please provide a password and confirmed password.',
    });

  if (req.body.password !== req.body.confirmedPassword)
    return res
      .status(400)
      .json({ status: 'failed', message: `Passwords don't match.` });

  //Hash password
  const hashedPassword = await bcrypt.hash(req.body.password, 12);

  const updateObj = await User.updateOne(
    { _id: userData?._id },
    { password: hashedPassword }
  );

  if (updateObj.acknowledged) {
    return res
      .status(200)
      .json({ status: 'success', message: 'Password created successfully' });
  } else {
    return res
      .status(400)
      .json({ status: 'failed', message: 'Failed to create password.' });
  }
};

export const logout = (req: Request, res: Response) => {
  res.cookie('jwt', '', {
    expires: new Date(Date.now() - 100),
  });

  res.status(200).json({ status: 'success', message: 'Logout successfully.' });
};

//Protect routes from unauthorized users
export const authProtect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //Extract token
  let jwtToken = '';

  //Option 1: Token is stored in the headers (POSTMAN)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    //Extract the token
    jwtToken = req.headers.authorization.split(' ')[1];
    //Option 2: Token is stored in the cookies
  } else if (req.cookies.jwt) jwtToken = req.cookies.jwt;

  if (!jwtToken)
    return res
      .status(401)
      .json({ status: 'failed', message: 'You are not logged in.' });

  const userId = jwt.verify(jwtToken, process.env.JWT_SECRET as Secret) as {
    id?: string;
  };

  const user = await User.findById(userId.id);

  if (!user)
    return res
      .status(404)
      .json({ status: 404, message: `User doesn't exist anymore.` });

  req.user = user;

  next();
};
