import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext.jsx';
import { TodosContext } from '../context/todoContext.jsx';
import verifyJWTExp from '../utils/verifyJWTExp.jsx';

const CreateTodo = () => {
  const navigate = useNavigate();

  const { accessToken, setAccessToken } = useContext(AuthContext);
  const { todos, setTodos } = useContext(TodosContext);

  const createTodoHandler = async () => {
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

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  return (
    <>
      <button onClick={() => createTodoHandler()}>Create Todo</button>
    </>
  );
};

export default CreateTodo;
