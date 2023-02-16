import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext.jsx';
import Logout from '../controllers/auth/Logout.jsx';
import verifyJWTExpiration from '../controllers/auth/VerifyJWTExpiration.jsx';
import getTodos from '../controllers/todos/getTodos.jsx';

const Dashboard = () => {
  const { accessToken, setAccessToken } = useContext(AuthContext);
  getTodos();
  const navigate = useNavigate();

  const [newTodo, setNewTodo] = useState('lyka sombody');

  const createTodoHandler = async todo => {
    const token = await verifyJWTExpiration(accessToken, setAccessToken);
    if (!token) return navigate('/login');

    await fetch('http://localhost:8000/api/v1/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        event: todo,
        finished: false,
      }),
    });
  };

  const updateTodoHandler = async () => {
    const token = await verifyJWTExpiration(accessToken, setAccessToken);
    if (!token) return navigate('/login');

    await fetch('http://localhost:8000/api/v1/todos/', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        todoID: '63ed4a35342a19165e458bfc',
        event: 'lyka sombody',
      }),
    });
  };

  const deleteTodoHandler = async () => {
    const token = await verifyJWTExpiration(accessToken, setAccessToken);
    if (!token) return navigate('/login');

    await fetch('http://localhost:8000/api/v1/todos/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        todoID: '63ed2bd05da1e79518163b66',
      }),
    });
  };

  return (
    <div>
      <h1>Dashboard</h1>

      <button onClick={() => createTodoHandler(newTodo)}>Create Todo</button>
      <button onClick={updateTodoHandler}>Update Todo</button>
      <button onClick={deleteTodoHandler}>Delete Todo</button>
      <br />
      <br />
      <Logout />
    </div>
  );
};

export default Dashboard;
