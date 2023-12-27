import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { getGoogleAuthToken } from '../utils/getGoogleAuthToken';
import { getGithubAuthToken } from '../utils/getGithubAuthToken';
import { Email } from '../utils/emails';
//Types
type JwtPayload = {
  email: string;
};

//Create JWT token
const signJWT = () => {};

//Send JWT Token
const sendJWT = () => {};

//Login or sign up users
const authorizeUser = async (email: string, res: Response) => {
  console.log(email);
};

//Authorize user using email
export const emailAuthHandler = async (req: Request, res: Response) => {
  const userEmail = req.body.email;

  if (!userEmail)
    res
      .status(400)
      .json({ status: 'failed', message: 'Please provide your email' });

  //Create encrypted code

  //Send code via email
  new Email({ email: userEmail }, '').verificationCode();

  //Store code in database

  res
    .status(200)
    .json({ status: 'success', message: 'Code sent successfully' });
};

//Verify code sent to the email
export const verifyEmailCode = async (req: Request, res: Response) => {
  //Receive code + email
  const email = '';
  const code = '';
  //Check that code + email matches

  //Verify user
  authorizeUser(email, res);
};

//Authorize user using Google OAuth2.0
export const googleAuthHandler = async (req: Request, res: Response) => {
  const code = req.query.code as string;

  const googleId = await getGoogleAuthToken(code);
  if (googleId instanceof Error) {
    //Handle error
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
    //Handle error
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
