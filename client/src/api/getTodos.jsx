import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext.jsx';
import { TodosContext } from '../context/todoContext.jsx';
import verifyJWTExpiration from '../utils/verifyJWTExp.jsx';

const GetTodos = () => {
  const navigate = useNavigate();

  const { accessToken, setAccessToken } = useContext(AuthContext);
  const { setTodos } = useContext(TodosContext);

  useEffect(() => {
    const fetchTodoHandler = async () => {
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
      setTodos(todos);
    };
    fetchTodoHandler();
  }, []);
};
export default GetTodos;
