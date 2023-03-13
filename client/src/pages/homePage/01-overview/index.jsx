import GetTodos from '../hooks/getTodos';
import Header from '/src/layouts/header/index.jsx';

const Overview = () => {
  GetTodos();
  return (
    <>
      <Header />
    </>
  );
};
export default Overview;
