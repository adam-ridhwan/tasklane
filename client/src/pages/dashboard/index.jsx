import ClearTodos from '../../api/clearTodos.jsx';
import CreateTodo from '../../api/createTodo.jsx';
import DeleteTodo from '../../api/deleteTodo.jsx';
import GetTodos from '../../api/getTodos.jsx';
import UpdateTodo from '../../api/updateTodo.jsx';
import Logout from '../../components/logout/logout.jsx';

const Dashboard = () => {
  GetTodos();

  return (
    <div>
      <h1>Dashboard</h1>

      <CreateTodo />
      <DeleteTodo />
      <ClearTodos />
      <UpdateTodo />
      <DeleteTodo />

      <br />
      <br />
      <Logout />
    </div>
  );
};

export default Dashboard;
