import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext.jsx';
import { TodosContext } from '../context/todoContext.jsx';
import verifyJWTExp from '../utils/verifyJWTExp.jsx';

const DeleteTodo = () => {
  const navigate = useNavigate();
  const { accessToken, setAccessToken } = useContext(AuthContext);
  const { todos, setTodos } = useContext(TodosContext);

  const deleteTodoHandler = async todoID => {
    const token = await verifyJWTExp(accessToken, setAccessToken);
    if (!token) return navigate('/login');

    await fetch('http://localhost:8000/api/v1/todos/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ todoID }),
    });

    const newTodos = todos.filter(todo => todo._id !== todoID);
    setTodos(newTodos);
  };

  return (
    <>
      <button onClick={() => deleteTodoHandler('6403b729d878d9673319b2d0')}>
        Delete Todo
      </button>
    </>
  );
};

export default DeleteTodo;
