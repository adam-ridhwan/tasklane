import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import User from '../../models/userModel.js';
import AppError from '../../utils/appError.js';
import catchAsync from '../../utils/catchAsync.js';
import sendResponse from '../../utils/sendResponse.js';

const refresh = catchAsync(async (req, res, next) => {
  // https://stackoverflow.com/questions/3393854/get-and-set-a-single-cookie-with-node-js-http-server

  // 1) Get refresh token from cookie
  const cookieList = {};

  const cookieHeader = req.headers?.cookie;
  if (!cookieHeader) return cookieList;

  // 2) Parse and store all cookie in cookieList object
  cookieHeader.split(';').forEach(cookie => {
    let [name, ...rest] = cookie.split(`=`);
    name = name?.trim();
    if (!name) return;
    const value = rest.join(`=`).trim();
    if (!value) return;
    cookieList[name] = decodeURIComponent(value);
  });

  // 3) Check if refresh token exists
  if (!cookieList.jwt) {
    return next(new AppError('You are not logged in!', 401));
  }

  // 4) Verify refresh token
  const decoded = await promisify(jwt.verify)(
    cookieList.jwt,
    process.env.REFRESH_TOKEN_SECRET
  );

  // 5) Check if user still exists
  if (!decoded)
    return next(
      new AppError('User belonging to this token no longer exists', 401)
    );

  // 6) Check if user is in database
  const user = await User.findOne({ _id: decoded.id });
  if (!user) {
    return next(new AppError('User not found', 401));
  }

  // 7) Sign new access token
  const accessToken = jwt.sign(
    { id: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: 5 }
  );

  // 8) Send new access token to client
  sendResponse(res, 200, accessToken);
});

export default refresh;
