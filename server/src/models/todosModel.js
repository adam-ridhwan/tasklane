import mongoose from 'mongoose';
import slugify from 'slugify';

const todosSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'A todo must belong to a user'],
  },
  todos: [
    {
      event: String,
      finished: { type: Boolean, default: false },
    },
  ],
});

const Todos = mongoose.model('Todos', todosSchema);

export default Todos;
