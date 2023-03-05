import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.jsx';
import { TodosContext } from '../../context/TodosContext.jsx';
import VerifyJWTExpiration from '../auth/VerifyJWTExpiration.jsx';

const UpdateTodo = () => {
  const navigate = useNavigate();
  const { accessToken, setAccessToken } = useContext(AuthContext);
  const { todos, setTodos } = useContext(TodosContext);

  const updateTodoHandler = async (todoID, event) => {
    const token = await VerifyJWTExpiration(accessToken, setAccessToken);
    if (!token) return navigate('/login');

    await fetch('http://localhost:8000/api/v1/todos/', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        todoID,
        event,
      }),
    });

    const updatedTodos = todos.map(todo => {
      if (todo._id === todoID) {
        todo.event = event;
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  return (
    <>
      <button
        onClick={() => updateTodoHandler('63efd34dae5eecf27e172100', 'updated')}
      >
        Update Todo
      </button>
    </>
  );
};

export default UpdateTodo;
