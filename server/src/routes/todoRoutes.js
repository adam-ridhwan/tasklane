import express from 'express';
import createTodo from '../controllers/todo/createTodo.js';
import deleteTodo from '../controllers/todo/deleteTodo.js';
import getTodos from '../controllers/todo/getTodos.js';
import updateTodo from '../controllers/todo/updateTodo.js';

const router = express.Router();

router
  .route('/')
  .get(getTodos)
  .post(createTodo)
  .patch(updateTodo)
  .delete(deleteTodo);

export default router;
