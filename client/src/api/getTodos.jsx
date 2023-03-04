import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext.jsx';
import verifyJWTExpiration from '../utils/verifyJWTExp.jsx';

const getTodos = () => {
  const navigate = useNavigate();

  const { accessToken, setAccessToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchTodos = async () => {
      const token = await verifyJWTExpiration(accessToken, setAccessToken);
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
    fetchTodos();
  }, []);

  return (
    <>
      <div></div>
    </>
  );
};
export default getTodos;
