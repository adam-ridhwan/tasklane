import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import User from '../../models/userModel.js';
import AppError from '../../utils/appError.js';
import catchAsync from '../../utils/catchAsync.js';
import sendResponse from '../../utils/sendResponse.js';

const refresh = catchAsync(async (req, res, next) => {
  const refreshToken = req.headers.cookie?.split('=')[1];
  if (!refreshToken) {
    return next(new AppError('You are not logged in!', 401));
  }

  const decoded = await promisify(jwt.verify)(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  if (!decoded)
    return next(
      new AppError('User belonging to this token no longer exists', 401)
    );

  // 2) Check if user exists
  const user = await User.findOne({ _id: decoded.id });
  if (!user) {
    return next(new AppError('User not found', 401));
  }

  const accessToken = jwt.sign(
    { id: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: 5 }
  );

  sendResponse(res, 200, accessToken);
});

export default refresh;
