import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext.jsx';
import refresh from '../controllers/auth/refresh.jsx';

const Dashboard = () => {
  const navigate = useNavigate();

  const { accessToken, setAccessToken } = useContext(AuthContext);

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

  const getTodosHandler = async e => {
    e.preventDefault();

    let token = accessToken;

    if (!token) {
      token = await refresh();
      setAccessToken(token);
      console.log('newAccessToken at /Dashboard', token);
    }

    const response = await fetch('http://localhost:8000/api/v1/todos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    console.log('todos', data);
  };

  useEffect(() => {
    // console.log('accessToken at /Dashboard', accessToken);
  }, [accessToken]);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Dashboard</p>
      <button onClick={e => logoutHandler(e)}>Logout</button>
      <button onClick={e => getTodosHandler(e)}>Get Todos</button>
    </div>
  );
};

export default Dashboard;
