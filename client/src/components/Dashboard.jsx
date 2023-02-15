import jwt_decode from 'jwt-decode';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext.jsx';
import refreshToken from '../controllers/auth/refresh.jsx';

const Dashboard = () => {
  const navigate = useNavigate();

  const { accessToken, setAccessToken } = useContext(AuthContext);

  const [newTodo, setNewTodo] = useState('lyka sombody');

  const verifyJWTExpiration = async accessToken => {
    let token = accessToken;

    const currentDate = new Date();
    const decodedToken = token ? jwt_decode(token) : null;

    if (!decodedToken || decodedToken.exp * 1000 < currentDate.getTime()) {
      token = await refreshToken();
      setAccessToken(token);
    }

    return token;
  };

  const logoutHandler = async e => {
    e.preventDefault();
    // cookies only allowed on localhost
    const response = await fetch('http://localhost:8000/api/v1/users/logout', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    setAccessToken(null);
    navigate('/');
  };

  useEffect(() => {
    const getTodos = async () => {
      const token = await verifyJWTExpiration(accessToken);

      if (!token) return navigate('/login');

      const response = await fetch('http://localhost:8000/api/v1/todos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const { todos } = await response.json();
      console.log('todos', todos);
    };
    getTodos();
  }, []);

  const createTodoHandler = async todo => {
    const token = await verifyJWTExpiration(accessToken);

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
    const token = await verifyJWTExpiration(accessToken);

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
    const token = await verifyJWTExpiration(accessToken);

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
      <button onClick={e => logoutHandler(e)}>Logout</button>
      <button onClick={() => createTodoHandler(newTodo)}>Create Todo</button>
      <button onClick={updateTodoHandler}>Update Todo</button>
      <button onClick={deleteTodoHandler}>Delete Todo</button>
    </div>
  );
};

export default Dashboard;
