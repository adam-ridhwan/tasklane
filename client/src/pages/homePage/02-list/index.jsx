import AddTaskButton from '/src/layouts/addTaskButton/index.jsx';
import Header from '/src/layouts/header/index.jsx';

const List = () => {
  return (
    <>
      <Header />
      <div style={{ paddingLeft: '24px', paddingRight: '24px' }}>
        <AddTaskButton />
      </div>
    </>
  );
};
export default List;
