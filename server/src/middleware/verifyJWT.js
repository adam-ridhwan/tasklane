import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';

dotenv.config({ path: './config.env' });

const verifyJWT = catchAsync(async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) return next(new AppError('No authorization header', 401));

  const accessToken = authorization.split(' ')[1];
  if (!accessToken) return next(new AppError('Access token not found.', 401));

  const decoded = await promisify(jwt.verify)(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET
  );

  if (!decoded)
    return next(
      new AppError('User belonging to this token no longer exists', 401)
    );

  req.user = decoded;
  next();
});

export default verifyJWT;
