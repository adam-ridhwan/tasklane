import ClearTodos from '../../api/clearTodos.jsx';
import CreateTodo from '../../api/createTodo.jsx';
import DeleteTodo from '../../api/deleteTodo.jsx';
import GetTodos from '../../api/getTodos.jsx';
import UpdateTodo from '../../api/updateTodo.jsx';
import Logout from '../../components/logout/logout.jsx';
import TopBar from '../../layouts/topBar.jsx';

const Dashboard = () => {
  GetTodos();

  return (
    <>
      <TopBar />
    </>
  );
};

export default Dashboard;
