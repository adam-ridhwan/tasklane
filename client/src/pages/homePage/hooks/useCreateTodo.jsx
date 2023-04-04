import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '/src/context/authContext.jsx';
import { TodosContext } from '/src/context/todoContext.jsx';
import verifyJWTExp from '/src/utils/verifyJWTExp.jsx';

const useCreateTodo = () => {
  const navigate = useNavigate();

  const { accessToken, setAccessToken } = useContext(AuthContext);
  const { todos, setTodos } = useContext(TodosContext);

  const createTodo = async () => {
    const token = await verifyJWTExp(accessToken, setAccessToken);
    if (!token) return navigate('/login');

    const response = await fetch('http://localhost:8000/api/v1/todos', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        event: 'test',
      }),
    });

    const { newTodo } = await response.json();
    setTodos([...todos, newTodo[0]]);
  };

  return createTodo;
};

export default useCreateTodo;
