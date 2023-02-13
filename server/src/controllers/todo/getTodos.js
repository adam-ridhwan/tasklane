import Todos from '../../models/todosModel.js';
import AppError from '../../utils/appError.js';
import catchAsync from '../../utils/catchAsync.js';

const getTodos = catchAsync(async (req, res, next) => {
  const user = req.user;
  if (!user) return next(new AppError('User not found', 401));

  const { todos } = await Todos.findOne({ userID: user.id });
  if (!todos) return next(new AppError('Todos not found', 401));

  res.status(200).json({ todos });
});

export default getTodos;
