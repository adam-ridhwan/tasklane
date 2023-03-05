import Todos from '../../models/todosModel.js';
import AppError from '../../utils/appError.js';
import catchAsync from '../../utils/catchAsync.js';

const updateTodo = catchAsync(async (req, res, next) => {
  const user = req.user;
  if (!user) return next(new AppError('User not found', 401));

  const { todoID, event } = req.body;
  if (!todoID || !event) return next(new AppError('Todos not found', 401));

  const filter = { userID: user.id, 'todos._id': todoID };
  const update = { $set: { 'todos.$.event': event } };
  const options = { new: true }; // return document after update

  await Todos.findOneAndUpdate(filter, update, options);

  res.sendStatus(204);
});

export default updateTodo;
