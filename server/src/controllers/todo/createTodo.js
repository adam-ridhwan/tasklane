import Todos from '../../models/todosModel.js';
import AppError from '../../utils/appError.js';
import catchAsync from '../../utils/catchAsync.js';

const createTodo = catchAsync(async (req, res) => {
  const user = req.user;
  const newTodo = req.body;

  if (!user) return next(new AppError('User not found', 401));
  if (!newTodo) return next(new AppError('Todos not found', 401));

  const filter = { userID: user.id };
  const update = { $push: { todos: newTodo } };
  const options = { new: true }; // return document after update

  await Todos.findOneAndUpdate(filter, update, options);

  res.sendStatus(204);
});

export default createTodo;
