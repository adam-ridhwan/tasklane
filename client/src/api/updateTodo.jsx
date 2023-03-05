import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { TodosContext } from '../context/todoContext';
import verifyJWTExp from '../utils/verifyJWTExp';

const UpdateTodo = () => {
  const navigate = useNavigate();
  const { accessToken, setAccessToken } = useContext(AuthContext);
  const { todos, setTodos } = useContext(TodosContext);

  const updateTodoHandler = async (todoID, event) => {
    const token = await verifyJWTExp(accessToken, setAccessToken);
    if (!token) return navigate('/login');

    await fetch('http://localhost:8000/api/v1/todos/', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ todoID, event }),
    });

    const updatedTodos = todos.map(todo => {
      todo._id === todoID && (todo.event = event);
      return todo;
    });

    setTodos(updatedTodos);
  };

  return (
    <>
      <button
        onClick={() =>
          updateTodoHandler('64048bd7298147d3e5e4a187', 'updated yeet')
        }
      >
        Update Todo
      </button>
    </>
  );
};

export default UpdateTodo;
