import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';

dotenv.config({ path: './config.env' });

const verifyJWT = catchAsync(async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    console.log('authorization error catcher');
    return next(new AppError('No authorization header', 401));
  }

  const accessToken = authorization.split(' ')[1];
  // console.log('accesstoken', accessToken);
  if (accessToken === 'null') {
    return next(new AppError('Access token not found.', 401));
  }

  let decoded;
  try {
    decoded = await promisify(jwt.verify)(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
  } catch (err) {
    if (err.message === 'jwt expired') {
      console.log('jwt expired error catcher');
      return next(new AppError('Access token expired', 401));
    }
  }

  req.user = decoded;

  next();
});

export default verifyJWT;
