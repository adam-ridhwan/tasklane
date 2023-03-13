import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext.jsx';
import { TodosContext } from '../context/todoContext.jsx';
import verifyJWTExp from '../utils/verifyJWTExp.jsx';

const ClearTodos = () => {
  const navigate = useNavigate();

  const { setTodos } = useContext(TodosContext);
  const { accessToken, setAccessToken } = useContext(AuthContext);

  const clearTodoHandler = async () => {
    const token = await verifyJWTExp(accessToken, setAccessToken);
    if (!token) return navigate('/login');

    await fetch('http://localhost:8000/api/v1/todos', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    setTodos([]);
  };

  return (
    <>
      <button onClick={() => clearTodoHandler()}>Clear Todo</button>
    </>
  );
};
export default ClearTodos;
