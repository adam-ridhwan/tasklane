import Todos from '../../models/todosModel.js';
import AppError from '../../utils/appError.js';
import catchAsync from '../../utils/catchAsync.js';

const deleteTodo = catchAsync(async (req, res, next) => {
  const user = req.user;
  const { todoID } = req.body;

  if (!user) return next(new AppError('User not found', 401));
  if (!todoID) return next(new AppError('Todo ID not provided', 401));

  const todos = await Todos.findOne({ userID: user.id });
  todos.todos = todos.todos.filter(todo => todo._id.toString() !== todoID);
  await todos.save();

  res.sendStatus(204);
});

export default deleteTodo;
