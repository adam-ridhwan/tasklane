import jwt from 'jsonwebtoken';
import Todos from '../../models/todosModel.js';
import User from '../../models/userModel.js';
import AppError from '../../utils/appError.js';
import catchAsync from '../../utils/catchAsync.js';
import sendResponse from '../../utils/sendResponse.js';
import setCookie from '../../utils/setCookie.js';

const register = catchAsync(async (req, res, next) => {
  const { firstName, lastName, email, password, passwordConfirm } = req.body;

  let user;

  user = await User.findOne({ email });

  if (user) {
    return next(
      new AppError('A user has already registered with this email address', 401)
    );
  }

  user = await User.create({
    firstName,
    lastName,
    email,
    password,
    passwordConfirm,
  });

  // Save user token to model
  await user.save({ validateBeforeSave: false });

  // Create todos for user
  await Todos.create({ userID: user._id });

  // If everything ok, send tokens to client and cookie
  const accessToken = jwt.sign(
    { id: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: 900 }
  );

  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '1d' }
  );

  setCookie(res, refreshToken);
  sendResponse(res, 200, accessToken);
});

export default register;
