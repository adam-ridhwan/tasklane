import jwt from 'jsonwebtoken';
import Todos from '../../models/todosModel.js';
import User from '../../models/userModel.js';
import AppError from '../../utils/appError.js';
import catchAsync from '../../utils/catchAsync.js';
import sendResponse from '../../utils/sendResponse.js';
import setCookie from '../../utils/setCookie.js';

const register = catchAsync(async (req, res) => {
  const { firstName, lastName, email, password, passwordConfirm } = req.body;

  const user = await User.create({
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

  // 3) If everything ok, send tokens to client and cookie
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

  setCookie(refreshToken, res);
  sendResponse(res, 200, accessToken);
});

export default register;
