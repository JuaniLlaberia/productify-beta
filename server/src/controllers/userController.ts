import sharp from 'sharp';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { bucket } from '../utils/bucket';
import type { NextFunction, Request, Response } from 'express';
import { User } from '../models/User';
import { catchAsyncError } from '../utils/catchAsyncErrors';
import { CustomError } from '../utils/emailTemplates/error';
import { createImage } from '../utils/userImgGenerator';

//Get auth user
export const getMe = (req: Request, res: Response) => {
  res.status(200).json({ status: 'success', data: req.user });
};

//Update user
export const updateMe = catchAsyncError(async (req: Request, res: Response) => {
  //Filter restricted fields
  const fields = { ...req.body };
  Object.keys(fields)
    .filter(
      key => key !== 'firstName' && key !== 'lastName' && key !== 'isNewUser'
    )
    .forEach(field => delete fields[field]);

  await User.updateOne({ _id: req.user._id }, fields, {
    runValidators: true,
  });

  res
    .status(200)
    .json({ status: 'success', message: 'User updated successfully.' });
});

export const updateUserImg = catchAsyncError(
  async (req: Request, res: Response) => {
    let newImgBuffer: Buffer | undefined = req.file?.buffer;

    //Check if its deleting or updating
    //Case 1: Deletion => Delete old image and create 'Letter img'
    if (!newImgBuffer) {
      newImgBuffer = await createImage(req.user.firstName.at(0));
    } else {
      //Case 2: New upload => Delete old image and upload new one
      //Optimize image
      newImgBuffer = await sharp(newImgBuffer)
        .resize(150, 150)
        .toFormat('webp')
        .webp({ quality: 85 })
        .toBuffer();
    }

    //Upload image
    const bucketRef = ref(bucket, `${req.user._id}.webp`);
    const image = await uploadBytes(bucketRef, newImgBuffer, {
      contentType: 'image/webp',
    });
    //Get image link
    const imageLink = await getDownloadURL(image.ref);

    //Update user in DB
    await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        profileImg: imageLink,
      }
    );

    res.status(200).json({
      status: 'success',
      message: 'Profile image updated successfully.',
      data: imageLink,
    });
  }
);

//Delete user
export const deleteMe = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const wasDeleted = await User.deleteOne({ _id: req.user._id });

    if (wasDeleted.acknowledged) {
      return res
        .status(200)
        .json({ status: 'success', message: 'User was deleted successfully.' });
    } else return next(new CustomError(`Failed to delete user.`, 400));
  }
);
