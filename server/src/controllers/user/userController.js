import crypto from 'crypto';
import User from '../../models/userModel.js';
import catchAsync from '../../utils/catchAsync.js';

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: { users },
  });
});

const getUser = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: '',
  });
});
const createUser = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: '',
  });
});
const updateUser = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: '',
  });
});
const deleteUser = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: '',
  });
});

export default { getAllUsers, getUser, createUser, updateUser, deleteUser };
